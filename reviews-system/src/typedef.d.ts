export interface MessageEnvelope {
  version: number;
  record?: boolean;
  statusCode: number;
  statusMessage: string;
  event: string;
  payload: any;
  sendtime: string;
  recvtime?: string;
  transaction?: string;
  transactionType?: number;
  userAgent?: {
    electron?: boolean;
  };
}
