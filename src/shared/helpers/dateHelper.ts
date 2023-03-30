type TGetTimeString = (date: Date | number, language?: string) => string;

const oneDay = 8.64e7;
const oneMonth = 2.628e9;

class DateHelper {
  dates: {
    ago: number;
    now: number;
    before1d: number;
    before1month: number;
    after1d: number;
    after1month: number;
    after: number;
  };

  constructor() {
    this.dates = {
      ago: -Infinity,
      before1d: Date.now() - oneDay,
      before1month: Date.now() - oneMonth,
      now: Date.now(),
      after1d: Date.now() + oneDay,
      after1month: Date.now() + oneMonth,
      after: Date.now() + 60000,
    };
  }

  getBeautifulDate(oldDate: number): string {
    const date = new Date(oldDate);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  getTimeString: TGetTimeString = (
    date,
    language = navigator.language
  ): string => {
    if (!date) return '';
    const timeMs = typeof date === 'number' ? date : date.getTime();
    const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

    const datesInSeconds: number[] = [
      60,
      3600,
      86400,
      86400 * 7,
      86400 * 30,
      86400 * 365,
      Infinity,
    ];

    const units: Intl.RelativeTimeFormatUnit[] = [
      'second',
      'minute',
      'hour',
      'day',
      'week',
      'month',
      'year',
    ];

    const index = datesInSeconds.findIndex((el) => el > Math.abs(deltaSeconds));
    const divisor = index ? datesInSeconds[index - 1] : 1;

    const rtf = new Intl.RelativeTimeFormat(language, { numeric: 'auto' });

    return rtf.format(Math.floor(deltaSeconds / divisor), units[index]);
  };
}

export default new DateHelper();
