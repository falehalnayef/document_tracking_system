interface ResponseMessage {
    status: true | false;
    data?: object;
    message?: string;
    error?: string;
  }


export default ResponseMessage;