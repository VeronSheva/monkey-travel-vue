export default class InvalidData extends Error {
  constructor(errorFields, ...params) {
    super(...params);
    this.name = 'InvalidData';
    this.errorFields = errorFields
  }
}
