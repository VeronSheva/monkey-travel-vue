export default class Unauthorized extends Error {
  constructor(...params) {
    super(...params);
    this.name = 'Unauthorized';
  }
}
