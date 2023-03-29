import { AxiosInstance } from 'axios';
import { IQuery, getCoinApi } from 'shared';

class CoinService {
  api: AxiosInstance;

  constructor() {
    this.api = getCoinApi();
  }

  async getCoins(params?: IQuery) {
    try {
      const res = await this.api.get('assets', { params });

      console.log('Successfully get coins list', res);

      return res.data;
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
