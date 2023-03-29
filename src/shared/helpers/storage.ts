export class Storage {
  static getItem(key: string) {
    const itemAsString = localStorage.getItem(key);

    const item = itemAsString ? JSON.parse(itemAsString) : null;
    return item;
  }

  static setItem(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static deleteItem(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}
