export interface ApiData {
  endpoint?: string;
  method?: string;
  status?: number;
  requestBody?: any;
  responseBody?: any;
  ip?: string;
  headers?: any;
  createdAt?: Date;
  stopRequest?: boolean;
  error?: string;
}

export interface ApiDataDB {
  endpoint: string;
  method: string;
  status: number;
  requestBody?: any;
  responseBody?: any;
  ip?: string;
  headers?: any;
  createdAt?: Date;
  stopRequest?: boolean;
  error?: string;
}
