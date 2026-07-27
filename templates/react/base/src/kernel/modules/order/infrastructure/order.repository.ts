import type { IHttp } from '@shared_kernel/contracts';

import type { IOrderRepository } from '../domain';
import type { OrderEndpoints } from './order.endpoints';

export class OrderRepository implements IOrderRepository {
  constructor(private readonly http: IHttp<typeof OrderEndpoints>) {}

  public create: IOrderRepository['create'] = async ({ body }) => {
    return this.http.request({
      endpoint: 'CREATE_ORDER',
      method: 'POST',
      body,
    });
  };

  public updateStatus: IOrderRepository['updateStatus'] = async ({ pathParams, body }) => {
    return this.http.request({
      endpoint: 'UPDATE_ORDER_STATUS',
      method: 'PATCH',
      pathParams,
      body,
    });
  };

  public findByCustomerId: IOrderRepository['findByCustomerId'] = async ({ pathParams }) => {
    return this.http.request({
      endpoint: 'GET_ORDERS_BY_CUSTOMER',
      method: 'GET',
      pathParams,
    });
  };

  public findByStatus: IOrderRepository['findByStatus'] = async ({ pathParams }) => {
    return this.http.request({
      endpoint: 'GET_ORDERS_BY_STATUS',
      method: 'GET',
      pathParams,
    });
  };

  public findById: IOrderRepository['findById'] = async ({ pathParams }) => {
    return this.http.request({
      endpoint: 'GET_ORDER',
      method: 'GET',
      pathParams,
    });
  };

  public delete: IOrderRepository['delete'] = async ({ pathParams }) => {
    return this.http.request({
      endpoint: 'DELETE_ORDER',
      method: 'DELETE',
      pathParams,
    });
  };

  public findAll: IOrderRepository['findAll'] = async () => {
    return this.http.request({
      endpoint: 'GET_ORDERS',
      method: 'GET',
    });
  };
}
