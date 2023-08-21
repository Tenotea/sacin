/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosInstance,
  AxiosResponse,
  CreateAxiosDefaults,
} from "axios";

export type ApiResponse<T> = { statusCode: 200; message: string; data: T };
type HttpServiceConstructorParams = CreateAxiosDefaults<any>;

type HttpServiceParams<DTO, DQO> = {
  path: string;
  method: "post" | "get" | "delete" | "put" | "patch";
  body?: DTO;
  query?: DQO;
  options?: {
    handleError?: boolean;
  };
};
export type HttpServiceResolverError = {
  message: string;
  statusCode: number;
};

type HttpServiceResolverDTO<T> = Promise<{
  data: ApiResponse<T> | null;
  error: HttpServiceResolverError | null;
}>;

export default class HttpService {
  private axiosInstance: AxiosInstance;
  constructor(private params: HttpServiceConstructorParams) {
    this.axiosInstance = axios.create(this.params);
  }

  private async resolver<T>(
    fn: Promise<AxiosResponse>
  ): HttpServiceResolverDTO<T> {
    let data: ApiResponse<T> | null = null;
    let error: null | HttpServiceResolverError = null;
    try {
      const { data: apiResponse } = await fn;
      data = apiResponse;
    } catch (_error: any) {
      error = _error.response?.data || {
        message: _error.message,
        statusCode: 400,
      };
    }
    return { data, error };
  }

  protected async SendRequest<
    DAO,
    DTO = Record<any, any>,
    DQO = Record<any, any>
  >(params: HttpServiceParams<DTO, DQO>) {
    return this.resolver<DAO>(
      this.axiosInstance[params.method](
        params.path,
        params.body ? params.body : ({ params: params.query || {} } as any),
        params.body && params.query ? { params: params.query } : {}
      )
    );
  }
}
