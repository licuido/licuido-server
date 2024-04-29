/**
 * Sends a POST request to the authentication API to login.
 *
 * @return {Promise<ResponseType>} The response data from the API.
 */

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface AxiosConfig {
  url: string;
  config: {
    method: string;
    headers?: {
      authorization?: string;
    };
  };
}

// Common axios call
export async function makeNetworkRequest<ResponseType, PayLoadInterface>(
  axiosConfig: AxiosConfig,
  payload?: PayLoadInterface,
  params?: any
): Promise<ResponseType> {
  try {
    const url: string = params
      ? `${axiosConfig?.url}/${params}`
      : axiosConfig?.url;
    const requestConfig: AxiosRequestConfig = {
      ...(axiosConfig?.config || {}),
      url,
    };
    if (payload) {
      requestConfig.data = payload;
    }
    const response: AxiosResponse = await axios(requestConfig);
    return response.data;
  } catch (error) {
    throw error;
  }
}
