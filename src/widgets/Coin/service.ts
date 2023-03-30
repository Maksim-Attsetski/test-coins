import { AxiosInstance } from 'axios';
import { IQuery, getCoinApi } from 'shared';
import { ICoinApiRes } from './types';

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
}

export default new CoinService();
