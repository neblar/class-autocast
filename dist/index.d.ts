import { ValidationMetadata } from 'class-validator/types/metadata/ValidationMetadata';
type PassthroughTypes = Date;
type AllowedPlainProp<T> = T extends PassthroughTypes ? T : PlainType<T>;
type PlainProp<T> = T extends Array<infer I> ? AllowedPlainProp<I>[] : AllowedPlainProp<T>;
type OptionalProps<T> = {
    [key in keyof T as T[key] extends undefined ? key : never]?: PlainProp<T[key]>;
};
type RequiredProps<T> = {
    [key in keyof T as T[key] extends Function | undefined ? never : key]: PlainProp<T[key]>;
};
type Mutable<T> = {
    -readonly [key in keyof T]: T[key];
};
export type PlainType<T> = Mutable<OptionalProps<T> & RequiredProps<T>>;
export declare const reflectArrayClasses: (validationFields: ValidationMetadata[]) => {
    [k: string]: Type;
};
export declare const reflectEnums: (validationFields: ValidationMetadata[]) => {
    [k: string]: any;
};
export default abstract class AutoBase<T> {
    #private;
    constructor(plain: PlainType<T>);
    toPlain(): PlainType<T>;
    private fromPlain;
    private fieldToPlain;
    private validate;
    private isEnum;
    private toEnumString;
    private isString;
    private isObject;
    private isArray;
}
export {};
