/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import queryString from 'query-string';

export class HttpService {
  getTimeOutDuration() {
    // all api calls will be timeout
    // if server didn't responsed in 15 seconds
    const timeOutDuration = 15000;
    return timeOutDuration;
  }

  async get(
    url: string,
    queryParams: Record<string, string> | null = null,
    timeOut?: number
  ): Promise<any> {
    const headers: Record<string, string> = {}
    return axios.get(url, {
      params: queryParams,
      paramsSerializer: function (params) {
        return queryString.stringify(params);
      },
      headers,
      timeout: timeOut ? timeOut : this.getTimeOutDuration(),
    });
  }

  async post(
    url: string,
    postData: unknown,
    timeOut?: number
  ): Promise<unknown> {
    const headers: Record<string, string> = {}
    return axios.post(url, postData, {
      headers,
      timeout: timeOut ? timeOut : this.getTimeOutDuration(),
    });
  }

  async put(
    url: string,
    postData: unknown,
    queryParams: Record<string, any> | null = null,
    timeOut?: number
  ): Promise<unknown> {
    const headers: Record<string, string> = {}

    return axios.put(url, postData, {
      params: queryParams,
      paramsSerializer: function (params) {
        return queryString.stringify(params);
      },
      headers,
      timeout: timeOut ? timeOut : this.getTimeOutDuration(),
    });
  }

  async patch(
    url: string,
    postData: unknown,
    timeOut?: number
  ): Promise<unknown> {
    const headers: Record<string, string> = {}

    return axios.patch(url, postData, {
      headers,
      timeout: timeOut ? timeOut : this.getTimeOutDuration(),
    });
  }

  async delete(
    url: string,
    timeOut?: number
  ): Promise<unknown> {
    const headers: Record<string, string> = {}

    return axios.delete(url, {
      headers,
      timeout: timeOut ? timeOut : this.getTimeOutDuration(),
    });
  }
}
