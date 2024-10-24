import { URL } from './../../common/constants';
import { TData, TCustomStoreRequest } from './../../common/interfaces';

export const customStoreRequest: TCustomStoreRequest = async <T>(urlPath: string, method = 'GET', data: TData = {}): Promise<T> => {
  try {
    const request: RequestInit = {
      method, credentials: 'include',
    };

    if (['DELETE', 'POST', 'PUT'].includes(method)) {
      request.body = JSON.stringify(data);
      request.headers = { 'Content-Type': 'application/json' };
    }

    const response = await fetch(`${URL}/${urlPath}`, request);

    const isJson = response.headers.get('content-type')?.includes('application/json');
    const result = isJson ? await response.json() : {};

    if (!response.ok) {
      throw result.Message;
    }

    return method === 'GET' ? result : ({} as T);

  } catch (e) {
    return Promise.reject(e);
  }
}