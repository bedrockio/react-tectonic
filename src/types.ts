import { ElementType } from "react";
export interface ITimeRange {
  from: Date | string;
  to: Date | string;
  label?: string;
}

export interface IStatus {
  loading?: boolean;
  success?: boolean;
  error?: {
    message: string;
  };
}

export interface IStats {
  from: Date;
  to: Date;
  count: Number;
}

export interface IAggregateFilterType {
  from?: number;
  size?: number;
  terms: any[];
  range?: any;
  notExists?: string;
  exists?: string;
  minTimestamp?: number;
  q?: string;
}

export interface IOption {
  label: string;
  icon?: ElementType;
  value: string;
}
