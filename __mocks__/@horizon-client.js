export default class Horizon {
  constructor() {
    this.data = [{ id: 1 }];
    return jest.fn(() => this);
  }

  find() {
    this.data = { id: 1 };
    return this;
  }

  fetch() {
    return this;
  }

  toPromise() {
    return Promise.resolve(this.data);
  }
}
