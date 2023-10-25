export interface ImageResponse {
  id?: number;
  url: string
}

export interface FieldImage extends Item<ImageResponse> {}

export interface Error {
  status: number;
  name: string;
  message: string;
  details: any;
}

export interface RootResponse<TypeResponse = Item<unknown>[]> {
  data: TypeResponse
  meta?: Meta
  error?: Error
}

export interface Item<Entity, DateType = string> {
  id: number;
  attributes: Entity & {
    createdAt: DateType;
    updatedAt: DateType;
    publishedAt?: DateType;
  };
}

export interface Meta {
  pagination: Pagination | {}
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}


export declare namespace API {
  export type BaseResponse = RootResponse<any>;
  export type TestResponse = { value: string };
}
