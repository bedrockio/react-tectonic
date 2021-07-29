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