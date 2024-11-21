export interface IPostgresError {
  detail?: string;
  code: number;
}

export interface IErrorResponse {
  message: string;
  detail?: string;
  code?: number;
}
