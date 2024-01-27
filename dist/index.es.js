var W = (i, t, n) => {
  if (!t.has(i))
    throw TypeError("Cannot " + n);
};
var w = (i, t, n) => (W(i, t, "read from private field"), n ? n.call(i) : t.get(i)), A = (i, t, n) => {
  if (t.has(i))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(i) : t.set(i, n);
};
var z = (
  /** @class */
  /* @__PURE__ */ function() {
    function i(t) {
      this.groups = [], this.each = !1, this.context = void 0, this.type = t.type, this.name = t.name, this.target = t.target, this.propertyName = t.propertyName, this.constraints = t == null ? void 0 : t.constraints, this.constraintCls = t.constraintCls, this.validationTypeOptions = t.validationTypeOptions, t.validationOptions && (this.message = t.validationOptions.message, this.groups = t.validationOptions.groups, this.always = t.validationOptions.always, this.each = t.validationOptions.each, this.context = t.validationOptions.context);
    }
    return i;
  }()
), H = (
  /** @class */
  function() {
    function i() {
    }
    return i.prototype.transform = function(t) {
      var n = [];
      return Object.keys(t.properties).forEach(function(r) {
        t.properties[r].forEach(function(o) {
          var e = {
            message: o.message,
            groups: o.groups,
            always: o.always,
            each: o.each
          }, a = {
            type: o.type,
            name: o.name,
            target: t.name,
            propertyName: r,
            constraints: o.constraints,
            validationTypeOptions: o.options,
            validationOptions: e
          };
          n.push(new z(a));
        });
      }), n;
    }, i;
  }()
);
function q(i) {
  return i instanceof Map ? Array.from(i.values()) : Array.isArray(i) ? i : Array.from(i);
}
function J() {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof global < "u")
    return global;
  if (typeof window < "u")
    return window;
  if (typeof self < "u")
    return self;
}
function P(i) {
  return i !== null && typeof i == "object" && typeof i.then == "function";
}
var Y = function(i) {
  var t = typeof Symbol == "function" && Symbol.iterator, n = t && i[t], r = 0;
  if (n)
    return n.call(i);
  if (i && typeof i.length == "number")
    return {
      next: function() {
        return i && r >= i.length && (i = void 0), { value: i && i[r++], done: !i };
      }
    };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}, j = function(i, t) {
  var n = typeof Symbol == "function" && i[Symbol.iterator];
  if (!n)
    return i;
  var r = n.call(i), o, e = [], a;
  try {
    for (; (t === void 0 || t-- > 0) && !(o = r.next()).done; )
      e.push(o.value);
  } catch (f) {
    a = { error: f };
  } finally {
    try {
      o && !o.done && (n = r.return) && n.call(r);
    } finally {
      if (a)
        throw a.error;
    }
  }
  return e;
}, K = function(i, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, o = t.length, e; r < o; r++)
      (e || !(r in t)) && (e || (e = Array.prototype.slice.call(t, 0, r)), e[r] = t[r]);
  return i.concat(e || Array.prototype.slice.call(t));
}, Q = (
  /** @class */
  function() {
    function i() {
      this.validationMetadatas = /* @__PURE__ */ new Map(), this.constraintMetadatas = /* @__PURE__ */ new Map();
    }
    return Object.defineProperty(i.prototype, "hasValidationMetaData", {
      get: function() {
        return !!this.validationMetadatas.size;
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.addValidationSchema = function(t) {
      var n = this, r = new H().transform(t);
      r.forEach(function(o) {
        return n.addValidationMetadata(o);
      });
    }, i.prototype.addValidationMetadata = function(t) {
      var n = this.validationMetadatas.get(t.target);
      n ? n.push(t) : this.validationMetadatas.set(t.target, [t]);
    }, i.prototype.addConstraintMetadata = function(t) {
      var n = this.constraintMetadatas.get(t.target);
      n ? n.push(t) : this.constraintMetadatas.set(t.target, [t]);
    }, i.prototype.groupByPropertyName = function(t) {
      var n = {};
      return t.forEach(function(r) {
        n[r.propertyName] || (n[r.propertyName] = []), n[r.propertyName].push(r);
      }), n;
    }, i.prototype.getTargetValidationMetadatas = function(t, n, r, o, e) {
      var a, f, l = function(u) {
        return typeof u.always < "u" ? u.always : u.groups && u.groups.length ? !1 : r;
      }, s = function(u) {
        return !!(o && (!e || !e.length) && u.groups && u.groups.length);
      }, c = this.validationMetadatas.get(t) || [], p = c.filter(function(u) {
        return u.target !== t && u.target !== n ? !1 : l(u) ? !0 : s(u) ? !1 : e && e.length > 0 ? u.groups && !!u.groups.find(function(h) {
          return e.indexOf(h) !== -1;
        }) : !0;
      }), d = [];
      try {
        for (var y = Y(this.validationMetadatas.entries()), v = y.next(); !v.done; v = y.next()) {
          var E = j(v.value, 2), S = E[0], V = E[1];
          t.prototype instanceof S && d.push.apply(d, K([], j(V), !1));
        }
      } catch (u) {
        a = { error: u };
      } finally {
        try {
          v && !v.done && (f = y.return) && f.call(y);
        } finally {
          if (a)
            throw a.error;
        }
      }
      var g = d.filter(function(u) {
        return typeof u.target == "string" || u.target === t || u.target instanceof Function && !(t.prototype instanceof u.target) ? !1 : l(u) ? !0 : s(u) ? !1 : e && e.length > 0 ? u.groups && !!u.groups.find(function(h) {
          return e.indexOf(h) !== -1;
        }) : !0;
      }), k = g.filter(function(u) {
        return !p.find(function(h) {
          return h.propertyName === u.propertyName && h.type === u.type;
        });
      });
      return p.concat(k);
    }, i.prototype.getTargetValidatorConstraints = function(t) {
      return this.constraintMetadatas.get(t) || [];
    }, i;
  }()
);
function R() {
  var i = J();
  return i.classValidatorMetadataStorage || (i.classValidatorMetadataStorage = new Q()), i.classValidatorMetadataStorage;
}
var L = (
  /** @class */
  function() {
    function i() {
    }
    return i.prototype.toString = function(t, n, r, o) {
      var e = this;
      t === void 0 && (t = !1), n === void 0 && (n = !1), r === void 0 && (r = ""), o === void 0 && (o = !1);
      var a = t ? "\x1B[1m" : "", f = t ? "\x1B[22m" : "", l = function() {
        var p;
        return (o ? Object.values : Object.keys)((p = e.constraints) !== null && p !== void 0 ? p : {}).join(", ");
      }, s = function(p) {
        return " - property ".concat(a).concat(r).concat(p).concat(f, " has failed the following constraints: ").concat(a).concat(l()).concat(f, ` 
`);
      };
      if (n) {
        var c = Number.isInteger(+this.property) ? "[".concat(this.property, "]") : "".concat(r ? "." : "").concat(this.property);
        return this.constraints ? s(c) : this.children ? this.children.map(function(p) {
          return p.toString(t, !0, "".concat(r).concat(c), o);
        }).join("") : "";
      } else
        return "An instance of ".concat(a).concat(this.target ? this.target.constructor.name : "an object").concat(f, ` has failed the validation:
`) + (this.constraints ? s(this.property) : "") + (this.children ? this.children.map(function(p) {
          return p.toString(t, !0, e.property, o);
        }).join("") : "");
    }, i;
  }()
), O = (
  /** @class */
  function() {
    function i() {
    }
    return i.isValid = function(t) {
      var n = this;
      return t !== "isValid" && t !== "getMessage" && Object.keys(this).map(function(r) {
        return n[r];
      }).indexOf(t) !== -1;
    }, i.CUSTOM_VALIDATION = "customValidation", i.NESTED_VALIDATION = "nestedValidation", i.PROMISE_VALIDATION = "promiseValidation", i.CONDITIONAL_VALIDATION = "conditionalValidation", i.WHITELIST = "whitelistValidation", i.IS_DEFINED = "isDefined", i;
  }()
);
function X(i) {
  return Array.isArray(i) ? i.join(", ") : (typeof i == "symbol" && (i = i.description), "".concat(i));
}
var Z = (
  /** @class */
  function() {
    function i() {
    }
    return i.replaceMessageSpecialTokens = function(t, n) {
      var r;
      return t instanceof Function ? r = t(n) : typeof t == "string" && (r = t), r && Array.isArray(n.constraints) && n.constraints.forEach(function(o, e) {
        r = r.replace(new RegExp("\\$constraint".concat(e + 1), "g"), X(o));
      }), r && n.value !== void 0 && n.value !== null && ["string", "boolean", "number"].includes(typeof n.value) && (r = r.replace(/\$value/g, n.value)), r && (r = r.replace(/\$property/g, n.property)), r && (r = r.replace(/\$target/g, n.targetName)), r;
    }, i;
  }()
), M = function(i, t) {
  var n = typeof Symbol == "function" && i[Symbol.iterator];
  if (!n)
    return i;
  var r = n.call(i), o, e = [], a;
  try {
    for (; (t === void 0 || t-- > 0) && !(o = r.next()).done; )
      e.push(o.value);
  } catch (f) {
    a = { error: f };
  } finally {
    try {
      o && !o.done && (n = r.return) && n.call(r);
    } finally {
      if (a)
        throw a.error;
    }
  }
  return e;
}, F = (
  /** @class */
  function() {
    function i(t, n) {
      this.validator = t, this.validatorOptions = n, this.awaitingPromises = [], this.ignoreAsyncValidations = !1, this.metadataStorage = R();
    }
    return i.prototype.execute = function(t, n, r) {
      var o = this, e, a;
      !this.metadataStorage.hasValidationMetaData && ((e = this.validatorOptions) === null || e === void 0 ? void 0 : e.enableDebugMessages) === !0 && console.warn(`No validation metadata found. No validation will be  performed. There are multiple possible reasons:
  - There may be multiple class-validator versions installed. You will need to flatten your dependencies to fix the issue.
  - This validation runs before any file with validation decorator was parsed by NodeJS.`);
      var f = this.validatorOptions ? this.validatorOptions.groups : void 0, l = this.validatorOptions && this.validatorOptions.strictGroups || !1, s = this.validatorOptions && this.validatorOptions.always || !1, c = ((a = this.validatorOptions) === null || a === void 0 ? void 0 : a.forbidUnknownValues) === void 0 || this.validatorOptions.forbidUnknownValues !== !1, p = this.metadataStorage.getTargetValidationMetadatas(t.constructor, n, s, l, f), d = this.metadataStorage.groupByPropertyName(p);
      if (this.validatorOptions && c && !p.length) {
        var y = new L();
        (!this.validatorOptions || !this.validatorOptions.validationError || this.validatorOptions.validationError.target === void 0 || this.validatorOptions.validationError.target === !0) && (y.target = t), y.value = void 0, y.property = void 0, y.children = [], y.constraints = { unknownValue: "an unknown value was passed to the validate function" }, r.push(y);
        return;
      }
      this.validatorOptions && this.validatorOptions.whitelist && this.whitelist(t, d, r), Object.keys(d).forEach(function(v) {
        var E = t[v], S = d[v].filter(function(g) {
          return g.type === O.IS_DEFINED;
        }), V = d[v].filter(function(g) {
          return g.type !== O.IS_DEFINED && g.type !== O.WHITELIST;
        });
        E instanceof Promise && V.find(function(g) {
          return g.type === O.PROMISE_VALIDATION;
        }) ? o.awaitingPromises.push(E.then(function(g) {
          o.performValidations(t, g, v, S, V, r);
        })) : o.performValidations(t, E, v, S, V, r);
      });
    }, i.prototype.whitelist = function(t, n, r) {
      var o = this, e = [];
      Object.keys(t).forEach(function(a) {
        (!n[a] || n[a].length === 0) && e.push(a);
      }), e.length > 0 && (this.validatorOptions && this.validatorOptions.forbidNonWhitelisted ? e.forEach(function(a) {
        var f, l = o.generateValidationError(t, t[a], a);
        l.constraints = (f = {}, f[O.WHITELIST] = "property ".concat(a, " should not exist"), f), l.children = void 0, r.push(l);
      }) : e.forEach(function(a) {
        return delete t[a];
      }));
    }, i.prototype.stripEmptyErrors = function(t) {
      var n = this;
      return t.filter(function(r) {
        if (r.children && (r.children = n.stripEmptyErrors(r.children)), Object.keys(r.constraints).length === 0) {
          if (r.children.length === 0)
            return !1;
          delete r.constraints;
        }
        return !0;
      });
    }, i.prototype.performValidations = function(t, n, r, o, e, a) {
      var f = e.filter(function(d) {
        return d.type === O.CUSTOM_VALIDATION;
      }), l = e.filter(function(d) {
        return d.type === O.NESTED_VALIDATION;
      }), s = e.filter(function(d) {
        return d.type === O.CONDITIONAL_VALIDATION;
      }), c = this.generateValidationError(t, n, r);
      a.push(c);
      var p = this.conditionalValidations(t, n, s);
      p && (this.customValidations(t, n, o, c), this.mapContexts(t, n, o, c), !(n === void 0 && this.validatorOptions && this.validatorOptions.skipUndefinedProperties === !0) && (n === null && this.validatorOptions && this.validatorOptions.skipNullProperties === !0 || n == null && this.validatorOptions && this.validatorOptions.skipMissingProperties === !0 || (this.customValidations(t, n, f, c), this.nestedValidations(n, l, c), this.mapContexts(t, n, e, c), this.mapContexts(t, n, f, c))));
    }, i.prototype.generateValidationError = function(t, n, r) {
      var o = new L();
      return (!this.validatorOptions || !this.validatorOptions.validationError || this.validatorOptions.validationError.target === void 0 || this.validatorOptions.validationError.target === !0) && (o.target = t), (!this.validatorOptions || !this.validatorOptions.validationError || this.validatorOptions.validationError.value === void 0 || this.validatorOptions.validationError.value === !0) && (o.value = n), o.property = r, o.children = [], o.constraints = {}, o;
    }, i.prototype.conditionalValidations = function(t, n, r) {
      return r.map(function(o) {
        return o.constraints[0](t, n);
      }).reduce(function(o, e) {
        return o && e;
      }, !0);
    }, i.prototype.customValidations = function(t, n, r, o) {
      var e = this;
      r.forEach(function(a) {
        e.metadataStorage.getTargetValidatorConstraints(a.constraintCls).forEach(function(f) {
          if (!(f.async && e.ignoreAsyncValidations) && !(e.validatorOptions && e.validatorOptions.stopAtFirstError && Object.keys(o.constraints || {}).length > 0)) {
            var l = {
              targetName: t.constructor ? t.constructor.name : void 0,
              property: a.propertyName,
              object: t,
              value: n,
              constraints: a.constraints
            };
            if (!a.each || !(Array.isArray(n) || n instanceof Set || n instanceof Map)) {
              var s = f.instance.validate(n, l);
              if (P(s)) {
                var c = s.then(function(h) {
                  if (!h) {
                    var m = M(e.createValidationError(t, n, a, f), 2), T = m[0], b = m[1];
                    o.constraints[T] = b, a.context && (o.contexts || (o.contexts = {}), o.contexts[T] = Object.assign(o.contexts[T] || {}, a.context));
                  }
                });
                e.awaitingPromises.push(c);
              } else if (!s) {
                var p = M(e.createValidationError(t, n, a, f), 2), d = p[0], y = p[1];
                o.constraints[d] = y;
              }
              return;
            }
            var v = q(n), E = v.map(function(h) {
              return f.instance.validate(h, l);
            }), S = E.some(function(h) {
              return P(h);
            });
            if (S) {
              var V = E.map(function(h) {
                return P(h) ? h : Promise.resolve(h);
              }), g = Promise.all(V).then(function(h) {
                var m = h.every(function(G) {
                  return G;
                });
                if (!m) {
                  var T = M(e.createValidationError(t, n, a, f), 2), b = T[0], B = T[1];
                  o.constraints[b] = B, a.context && (o.contexts || (o.contexts = {}), o.contexts[b] = Object.assign(o.contexts[b] || {}, a.context));
                }
              });
              e.awaitingPromises.push(g);
              return;
            }
            var k = E.every(function(h) {
              return h;
            });
            if (!k) {
              var u = M(e.createValidationError(t, n, a, f), 2), d = u[0], y = u[1];
              o.constraints[d] = y;
            }
          }
        });
      });
    }, i.prototype.nestedValidations = function(t, n, r) {
      var o = this;
      t !== void 0 && n.forEach(function(e) {
        if (!(e.type !== O.NESTED_VALIDATION && e.type !== O.PROMISE_VALIDATION) && !(o.validatorOptions && o.validatorOptions.stopAtFirstError && Object.keys(r.constraints || {}).length > 0))
          if (Array.isArray(t) || t instanceof Set || t instanceof Map) {
            var a = t instanceof Set ? Array.from(t) : t;
            a.forEach(function(p, d) {
              o.performValidations(t, p, d.toString(), [], n, r.children);
            });
          } else if (t instanceof Object) {
            var f = typeof e.target == "string" ? e.target : e.target.name;
            o.execute(t, f, r.children);
          } else {
            var l = M(o.createValidationError(e.target, t, e), 2), s = l[0], c = l[1];
            r.constraints[s] = c;
          }
      });
    }, i.prototype.mapContexts = function(t, n, r, o) {
      var e = this;
      return r.forEach(function(a) {
        if (a.context) {
          var f = void 0;
          if (a.type === O.CUSTOM_VALIDATION) {
            var l = e.metadataStorage.getTargetValidatorConstraints(a.constraintCls);
            f = l[0];
          }
          var s = e.getConstraintType(a, f);
          o.constraints[s] && (o.contexts || (o.contexts = {}), o.contexts[s] = Object.assign(o.contexts[s] || {}, a.context));
        }
      });
    }, i.prototype.createValidationError = function(t, n, r, o) {
      var e = t.constructor ? t.constructor.name : void 0, a = this.getConstraintType(r, o), f = {
        targetName: e,
        property: r.propertyName,
        object: t,
        value: n,
        constraints: r.constraints
      }, l = r.message || "";
      !r.message && (!this.validatorOptions || this.validatorOptions && !this.validatorOptions.dismissDefaultMessages) && o && o.instance.defaultMessage instanceof Function && (l = o.instance.defaultMessage(f));
      var s = Z.replaceMessageSpecialTokens(l, f);
      return [a, s];
    }, i.prototype.getConstraintType = function(t, n) {
      var r = n && n.name ? n.name : t.type;
      return r;
    }, i;
  }()
), tt = function(i, t, n, r) {
  function o(e) {
    return e instanceof n ? e : new n(function(a) {
      a(e);
    });
  }
  return new (n || (n = Promise))(function(e, a) {
    function f(c) {
      try {
        s(r.next(c));
      } catch (p) {
        a(p);
      }
    }
    function l(c) {
      try {
        s(r.throw(c));
      } catch (p) {
        a(p);
      }
    }
    function s(c) {
      c.done ? e(c.value) : o(c.value).then(f, l);
    }
    s((r = r.apply(i, t || [])).next());
  });
}, nt = function(i, t) {
  var n = { label: 0, sent: function() {
    if (e[0] & 1)
      throw e[1];
    return e[1];
  }, trys: [], ops: [] }, r, o, e, a;
  return a = { next: f(0), throw: f(1), return: f(2) }, typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function f(s) {
    return function(c) {
      return l([s, c]);
    };
  }
  function l(s) {
    if (r)
      throw new TypeError("Generator is already executing.");
    for (; a && (a = 0, s[0] && (n = 0)), n; )
      try {
        if (r = 1, o && (e = s[0] & 2 ? o.return : s[0] ? o.throw || ((e = o.return) && e.call(o), 0) : o.next) && !(e = e.call(o, s[1])).done)
          return e;
        switch (o = 0, e && (s = [s[0] & 2, e.value]), s[0]) {
          case 0:
          case 1:
            e = s;
            break;
          case 4:
            return n.label++, { value: s[1], done: !1 };
          case 5:
            n.label++, o = s[1], s = [0];
            continue;
          case 7:
            s = n.ops.pop(), n.trys.pop();
            continue;
          default:
            if (e = n.trys, !(e = e.length > 0 && e[e.length - 1]) && (s[0] === 6 || s[0] === 2)) {
              n = 0;
              continue;
            }
            if (s[0] === 3 && (!e || s[1] > e[0] && s[1] < e[3])) {
              n.label = s[1];
              break;
            }
            if (s[0] === 6 && n.label < e[1]) {
              n.label = e[1], e = s;
              break;
            }
            if (e && n.label < e[2]) {
              n.label = e[2], n.ops.push(s);
              break;
            }
            e[2] && n.ops.pop(), n.trys.pop();
            continue;
        }
        s = t.call(i, n);
      } catch (c) {
        s = [6, c], o = 0;
      } finally {
        r = e = 0;
      }
    if (s[0] & 5)
      throw s[1];
    return { value: s[0] ? s[1] : void 0, done: !0 };
  }
}, U = (
  /** @class */
  function() {
    function i() {
    }
    return i.prototype.validate = function(t, n, r) {
      return this.coreValidate(t, n, r);
    }, i.prototype.validateOrReject = function(t, n, r) {
      return tt(this, void 0, void 0, function() {
        var o;
        return nt(this, function(e) {
          switch (e.label) {
            case 0:
              return [4, this.coreValidate(t, n, r)];
            case 1:
              return o = e.sent(), o.length ? [2, Promise.reject(o)] : [
                2
                /*return*/
              ];
          }
        });
      });
    }, i.prototype.validateSync = function(t, n, r) {
      var o = typeof t == "string" ? n : t, e = typeof t == "string" ? r : n, a = typeof t == "string" ? t : void 0, f = new F(this, e);
      f.ignoreAsyncValidations = !0;
      var l = [];
      return f.execute(o, a, l), f.stripEmptyErrors(l);
    }, i.prototype.coreValidate = function(t, n, r) {
      var o = typeof t == "string" ? n : t, e = typeof t == "string" ? r : n, a = typeof t == "string" ? t : void 0, f = new F(this, e), l = [];
      return f.execute(o, a, l), Promise.all(f.awaitingPromises).then(function() {
        return f.stripEmptyErrors(l);
      });
    }, i;
  }()
), it = new /** @class */
(function() {
  function i() {
    this.instances = [];
  }
  return i.prototype.get = function(t) {
    var n = this.instances.find(function(r) {
      return r.type === t;
    });
    return n || (n = { type: t, object: new t() }, this.instances.push(n)), n.object;
  }, i;
}())();
function C(i) {
  return it.get(i);
}
function rt(i, t, n) {
  return typeof i == "string" ? C(U).validateSync(i, t, n) : C(U).validateSync(i, t);
}
const et = (i) => {
  let t, n = !1;
  const r = i.propertyName;
  if (i.name === "isInstance")
    t = i.constraints[0];
  else if (i.name === "isInterface")
    t = i.constraints[0];
  else if (i.name === "isString")
    t = String, n = !0;
  else if (i.name === "isBoolean")
    t = Boolean, n = !0;
  else if (i.name === "isObject")
    t = Object, n = !0;
  else if (i.name === "isEnum")
    t = i.constraints[0], n = !0;
  else
    throw new Error(
      `Not Implemented ${i.name} type map for property ${r}`
    );
  return [r, { propType: t, isPrimitive: n }];
}, ot = (i) => Object.fromEntries(
  i.filter((t) => t.each === !0).map(et)
), at = (i) => Object.fromEntries(
  i.filter((t) => t.name === "isEnum").map((t) => [t.propertyName, t.constraints[0]])
);
var x, N, I, _;
const D = class D {
  constructor(t) {
    A(this, x, R().getTargetValidationMetadatas(
      this.constructor,
      "",
      !1,
      !1,
      []
    ));
    A(this, N, ot(w(this, x)));
    A(this, I, at(w(this, x)));
    A(this, _, new Set(
      w(this, x).map((t) => t.propertyName)
    ));
    if (t === void 0) {
      Object.freeze();
      return;
    }
    for (const n of w(this, _)) {
      const r = t[n];
      r != null && (this[n] = this.fromPlain(n, r)), Object.freeze(this[n]);
    }
    Object.freeze(this), this.validate();
  }
  toPlain() {
    const t = {};
    for (const n of w(this, _))
      this[n] !== void 0 && this[n] !== null && (t[n] = this.fieldToPlain(this[n], n));
    return t;
  }
  fromPlain(t, n) {
    const r = Reflect.getMetadata("design:type", this, t);
    if (r.prototype instanceof D && !(n instanceof r))
      return new r(n);
    if (r === Date)
      return new r(n);
    if (r === Array) {
      const { propType: o, isPrimitive: e } = w(this, N)[t];
      return n.map((a) => e || a instanceof o ? a : new o(a));
    } else
      return this.isEnum(t) ? this.toEnumString(n, t) : n;
  }
  fieldToPlain(t, n) {
    return t instanceof D ? t.toPlain() : this.isArray(t) ? t.map((r) => this.fieldToPlain(r, n)) : this.isEnum(n) ? this.toEnumString(t, n) : t;
  }
  validate() {
    const t = rt(this, {
      whitelist: !0,
      forbidNonWhitelisted: !0
    });
    if (t.length > 0)
      throw t;
  }
  isEnum(t) {
    return t in w(this, I);
  }
  toEnumString(t, n) {
    if (this.isString(t))
      return t;
    if (Number.isInteger(t))
      return w(this, I)[n][t];
    if (this.isObject(t))
      return t.toString();
    throw new L(
      `Unexpected type ${t} found in enum ${n}`
    );
  }
  isString(t) {
    return Object.prototype.toString.call(t) === "[object String]";
  }
  isObject(t) {
    return Object.prototype.toString.call(t) === "[object Object]";
  }
  isArray(t) {
    return Object.prototype.toString.call(t) === "[object Array]";
  }
};
x = new WeakMap(), N = new WeakMap(), I = new WeakMap(), _ = new WeakMap();
let $ = D;
export {
  $ as default,
  ot as reflectArrayClasses,
  at as reflectEnums
};
