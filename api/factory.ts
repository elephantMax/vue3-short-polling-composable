import type { $Fetch, NitroFetchOptions } from 'nitropack';

interface ApiSuccessResponse<Body> {
  status: 'success',
  data: Body,
  statusCode?: number
}

interface ApiErrorResponse {
  status: 'error',
  data: {},
  message: string,
  statusCode?: number
}

type SuccessResultType<T> = {
  data: T;
  success: true;
};

type ErrorResultType = {
  error: Record<any, any>;
  success: false;
  status?: number;
};

export type ValidatedResultType<T> = SuccessResultType<T> | ErrorResultType;

class HttpFactory {
  private $fetch: $Fetch;

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher;
  }

  protected async get<T>(url: string, options?: NitroFetchOptions<string>): Promise<ApiSuccessResponse<T> | ApiErrorResponse> {
    return this.$fetch<T>(url, {
      method: 'get',
      ...options,
    })
      .catch(error => error);
  }

  protected async post<T>(url: string, options?: NitroFetchOptions<string>): Promise<ApiSuccessResponse<T> | ApiErrorResponse> {
    return this.$fetch<T>(url, {
      method: 'post',
      ...options,
    })
      .catch(error => error);
  }

  protected async put<T>(url: string, options?: NitroFetchOptions<string>): Promise<ApiSuccessResponse<T> | ApiErrorResponse> {
    return this.$fetch<T>(url, {
      method: 'put',
      ...options,
    })
      .catch(error => error);
  }

  protected async delete<T>(url: string, options?:NitroFetchOptions<string>): Promise<ApiSuccessResponse<T> | ApiErrorResponse> {
    return this.$fetch<T>(url, {
      method: 'delete',
      ...options,
    })
      .catch(error => error);
  }
}

export default HttpFactory;
