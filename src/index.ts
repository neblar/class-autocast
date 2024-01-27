/* eslint-disable @typescript-eslint/ban-ts-comment */
/*  eslint-disable @typescript-eslint/ban-types */
// @ts-nocheck
import {
  validateSync,
  getMetadataStorage,
  ValidationError,
} from 'class-validator';
import { ValidationMetadata } from 'class-validator/types/metadata/ValidationMetadata';
type PassthroughTypes = Date;
type AllowedPlainProp<T> = T extends PassthroughTypes ? T : PlainType<T>;
type PlainProp<T> = T extends Array<infer I>
  ? AllowedPlainProp<I>[]
  : AllowedPlainProp<T>;
type OptionalProps<T> = {
  [key in keyof T as T[key] extends undefined ? key : never]?: PlainProp<
    T[key]
  >;
};
type RequiredProps<T> = {
  [key in keyof T as T[key] extends Function | undefined
    ? never
    : key]: PlainProp<T[key]>;
};
type Mutable<T> = { -readonly [key in keyof T]: T[key] };
export type PlainType<T> = Mutable<OptionalProps<T> & RequiredProps<T>>;

const reflectArrayClass = (meta: ValidationMetadata): [string, Type] => {
  let propType: Type;
  let isPrimitive = false;
  const propName = meta.propertyName;
  if (meta.name === 'isInstance') {
    propType = meta.constraints[0];
  } else if (meta.name === 'isInterface') {
    propType = meta.constraints[0];
  } else if (meta.name === 'isString') {
    propType = String;
    isPrimitive = true;
  } else if (meta.name === 'isBoolean') {
    propType = Boolean;
    isPrimitive = true;
  } else if (meta.name === 'isObject') {
    propType = Object;
    isPrimitive = true;
  } else if (meta.name === 'isEnum') {
    propType = meta.constraints[0];
    isPrimitive = true;
  } else {
    throw new Error(
      `Not Implemented ${meta.name} type map for property ${propName}`,
    );
  }
  return [propName, { propType, isPrimitive }];
};

export const reflectArrayClasses = (validationFields: ValidationMetadata[]) =>
  Object.fromEntries(
    validationFields.filter((f) => f.each === true).map(reflectArrayClass),
  );

export const reflectEnums = (validationFields: ValidationMetadata[]) =>
  Object.fromEntries(
    validationFields
      .filter((f) => f.name === 'isEnum')
      .map((meta) => [meta.propertyName, meta.constraints[0]]),
  );

export default abstract class AutoBase<T> {
  private readonly #validationFields =
    getMetadataStorage().getTargetValidationMetadatas(
      this.constructor,
      '',
      false,
      false,
      [],
    );

  private readonly #arrayClasses = reflectArrayClasses(this.#validationFields);
  private readonly #enumMaps = reflectEnums(this.#validationFields);

  private readonly #registeredFields = new Set(
    this.#validationFields.map((metadata) => metadata.propertyName),
  );

  constructor(plain: PlainType<T>) {
    if (plain === undefined) {
      // called like new()
      Object.freeze();
      return;
    }
    for (const fieldName of this.#registeredFields) {
      const plainField = plain[fieldName];
      if (plainField !== undefined && plainField !== null) {
        this[fieldName] = this.fromPlain(fieldName, plainField);
      }
      Object.freeze(this[fieldName]);
    }
    Object.freeze(this);
    this.validate();
  }

  public toPlain(): PlainType<T> {
    const plain = {};
    for (const fieldName of this.#registeredFields) {
      if (this[fieldName] !== undefined && this[fieldName] !== null) {
        plain[fieldName] = this.fieldToPlain(this[fieldName], fieldName);
      }
    }
    return plain as PlainType<T>;
  }

  private fromPlain(fieldName: string, plainField: PlainType<T>): T {
    const prop = Reflect.getMetadata('design:type', this, fieldName);
    if (prop.prototype instanceof AutoBase && !(plainField instanceof prop)) {
      return new prop(plainField);
    } else if (prop === Date) {
      return new prop(plainField);
    } else if (prop === Array) {
      const { propType: classType, isPrimitive } =
        this.#arrayClasses[fieldName];

      return plainField.map((arrayItem) => {
        if (isPrimitive) {
          return arrayItem;
        }
        return arrayItem instanceof classType
          ? arrayItem
          : new classType(arrayItem);
      });
    } else if (this.isEnum(fieldName)) {
      return this.toEnumString(plainField, fieldName);
    } else {
      return plainField;
    }
  }

  private fieldToPlain(field: T, fieldName: string): PlainType<T> {
    if (field instanceof AutoBase) {
      return field.toPlain();
    } else if (this.isArray(field)) {
      return field.map((f) => this.fieldToPlain(f, fieldName));
    } else if (this.isEnum(fieldName)) {
      return this.toEnumString(field, fieldName);
    } else {
      return field;
    }
  }

  private validate(): void {
    const errors = validateSync(this, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    if (errors.length > 0) {
      throw errors;
    }
  }

  private isEnum(propertyName: string): bool {
    return propertyName in this.#enumMaps;
  }

  private toEnumString(value: T, fieldName: string): string {
    if (this.isString(value)) {
      return value;
    } else if (Number.isInteger(value)) {
      const enumMaps = this.#enumMaps;
      return enumMaps[fieldName][value];
    } else if (this.isObject(value)) {
      return value.toString();
    } else {
      throw new ValidationError(
        `Unexpected type ${value} found in enum ${fieldName}`,
      );
    }
  }

  private isString(x: T): boolean {
    return Object.prototype.toString.call(x) === '[object String]';
  }

  private isObject(x: T): boolean {
    return Object.prototype.toString.call(x) === '[object Object]';
  }

  private isArray(x: T): boolean {
    return Object.prototype.toString.call(x) === '[object Array]';
  }
}
