export interface ApiResponse<T> {
  // status: number;
  // message: string;
  // data: T;
  // date: Date

  statusCode: number;
  message: string;
  content: T;
  dateTime: Date;
  messageConstants?: null;
}
