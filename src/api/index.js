import RequestBase from './base'
import {
  GET_BANKS,
  GET_USER_INFO,
  UPDATE_USER_INFO
} from './rpath'

class ReqestIndex extends RequestBase {
    
  async getBanks(params) {
    return await this.get(GET_BANKS, params);
  }

  async getUserInfo(params) {
    return await this.get(GET_USER_INFO, params);
  }

  async updateUserInfo(params) {
    return await this.post(UPDATE_USER_INFO, params);
  }


}

export default new ReqestIndex()