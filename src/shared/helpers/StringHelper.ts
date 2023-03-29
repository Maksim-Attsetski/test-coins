export class StringHelper {
  static getCurrency(value: number, currency?: string): string {
    if (!value) return '';

    const numberWithSymbols = Number(value).toLocaleString(navigator.language, {
      style: 'currency',
      currency: currency ?? 'USD',
    });

    return numberWithSymbols;
  }
}
