export interface AnyObject {
  [key: string]: unknown;
}

export interface Options {
  value: unknown;
  label: string;
}

export interface NodeOptions extends Options {
  children?: NodeOptions[];
}

export interface GetParams {
  body: null;
  type: string;
  url: string;
}

export interface PostData {
  body: string;
  type: string;
  url: string;
}

export interface Pagination {
  current: number;
  pageSize: number;
  total?: number;
}

export type TimeRanger = [string, string];

export interface GeneralChart {
  xAxis: string[];
  data: Array<{ name: string; value: number[] }>;
}

export interface HttpResult<T> {
  data: T;
  code: number;
  msg: string;
}

export interface MemberModel {
  id: string;
  userName: string;
  userPhone: string;
}

declare global {
  interface Window {
    globalData: {
      memberCacheMap: Record<string, MemberModel>;
      deptCacheMap: Record<string, any>;
      [key: string]: any;
    };
  }
}
