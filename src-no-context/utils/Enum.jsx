/* eslint-disable no-unused-vars */
/* eslint-disable no-prototype-builtins */
export default function Enum(baseEnum) {
  return new Proxy(baseEnum, {
    get(target, name) {
      if (!baseEnum.hasOwnProperty(name)) {
        throw new Error(`${name} value does not exist in this enum`);
      }

      return Reflect.get(...arguments);
    },
    set(target, name, value) {
      throw new Error(`Cannot add a new value to the enum`);
    },
  });
}
