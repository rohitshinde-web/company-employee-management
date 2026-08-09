import { IPaginationMeta } from './pagination.interface';

export interface IAPIResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  pagination?: IPaginationMeta;
  timestamp: string;
}
