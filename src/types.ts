export interface ITimeRange {
  from: Date | string,
  to: Date | string,
  label?: string
}

export interface IStatus {
  loading?: boolean,
  success?: boolean,
  error?: {
    message: string,
  }
}

export interface IAggregateFilterType {
  from?: number,
  size?: number,
  terms: any[],
  range?: any,
  notExists?: string,
  exists?: string,
  minTimestamp?: number,
  q?: string,
}


