interface ResponseMessage {
  status: boolean;
  data?: object;
  message?: string;
  error?: string;
}

export default ResponseMessage;
