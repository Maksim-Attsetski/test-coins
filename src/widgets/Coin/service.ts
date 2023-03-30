import { AxiosInstance } from 'axios';
import { IQuery, getCoinApi, dateHelper } from 'shared';
import { ICoinApiRes, ICoinHistory } from './types';

class CoinService {
  api: AxiosInstance;

  constructor() {
    this.api = getCoinApi();
  }

  async getCoins(params?: IQuery): Promise<ICoinApiRes> {
    try {
      const res = await this.api.get('assets', { params });

      console.log('Successfully get coins list', res);

      return { data: res.data?.data, max: res.headers['content-length'] };
    } catch (error) {
      console.log('Fail to get coins list', error);
      throw error;
    }
  }
  async getOneCoin(id: string) {
    try {
      const res = await this.api.get('assets/' + id);

      console.log('Successfully get coin', res);

      return res.data;
    } catch (error) {
      console.log('Fail to get coin', error);
      throw error;
    }
  }
  async getOneCoinHistory(
    id: string,
    params?: IQuery
  ): Promise<ICoinHistory[]> {
    try {
      const res = await this.api.get(`assets/${id}/history`, { params });

      console.log('Successfully get coin history', res);

      return res.data.data;
    } catch (error) {
      console.log('Fail to get history', error);
      throw error;
    }
  }
}

export default new CoinService();
