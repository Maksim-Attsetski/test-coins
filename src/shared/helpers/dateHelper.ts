type TGetTimeString = (date: Date | number, language?: string) => string;

const oneHour = 3.6e6;
const oneMonth = 2.628e9;
const badHours = Date.now() - new Date().getHours() * oneHour;
const getDate = (add: number) => new Date(badHours + add).getTime();

class DateHelper {
  dates: {
    ago: number;
    now: number;
    someLater: number; // one hour later
    today: number;
    tomorrow: number;
    week: number;
    month: number;
  };

  constructor() {
    this.dates = {
      ago: -Infinity,
      now: Date.now(),
      someLater: Date.now() + oneHour, // one hour later
      today: getDate(0),
      tomorrow: getDate(8.64e7),
      week: getDate(6.048e8),
      month: getDate(oneMonth),
    };
  }

  getMinutes(min: number): string {
    const hours = Math.floor(min / 60);
    const minutes = Math.round(min % 60) + ' мин.';

    return hours === 0 ? minutes : `${hours} ч. ${minutes}`;
  }

  getBeautifulDate(now: number, divider: string = '/'): string {
    const date = new Date(now);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}${divider}${month}${divider}${day}`;
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
