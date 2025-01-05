import { DataAuthUser } from "./user.model";

export interface ResponseApi {
  ok: boolean,
  data?: DataAuthUser,
  msg?: string;
  errors?: object;
  token?: string;
}
