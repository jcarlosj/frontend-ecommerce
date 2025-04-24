export interface DataProduct {
  reference: string;
  name: string;
  description?: string;
  price?: number;
  quantity?: number;
  category?: {
    name: string;
    description?: string;
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
    __v: number;
  };
  urlImage?: string;
  state?: boolean;
  userId?: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  __v: number;
}
