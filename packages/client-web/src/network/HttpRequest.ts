/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 21st December 2019 11:21 am                       *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 21st December 2019 11:21 am                      *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import HostMap from './hostMap';

export default class HttpRequest {
  client = axios.create({
    timeout: 3000,
  });

  baseURL = HostMap.Default;

  get name(): string {
    const cstrName = this.constructor.name;
    const uriPrefix = cstrName.slice(0, -7).toLocaleLowerCase();
    return uriPrefix;
  }

  get url(): string {
    return `${this.baseURL}/${this.name}`;
  }

  get<T>(config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get(this.url, config);
  }

  post<T>(data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post(this.url, data, config);
  }
}
