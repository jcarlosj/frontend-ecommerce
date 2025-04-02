/** interface generica */
export interface ResponseApi<T> {
  ok: boolean;
  data?: T;
  msg?: string;
  errors?: object;
  token?: string;
}
