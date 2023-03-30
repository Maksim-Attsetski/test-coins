export interface IQuery {
  limit?: number;
  offset?: number;
  ids?: string;
  interval?: 'd1' | 'h1';
  start?: number;
  end?: number;
}

export type TIntervalsText = 'month' | 'day';
