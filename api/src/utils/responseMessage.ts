import ResponseMessage from "../interfaces/utility_interfaces/responseMessage";


const successfulResponse =(message: string, data?: object):ResponseMessage =>{

    const res: ResponseMessage ={
        status: true,
        message: message,
        data: data
    }
    return res;
}


const failedResponse =(error: string):ResponseMessage =>{

    const res: ResponseMessage ={
        status: false,
        error: error,
    }
    return res;
}

export {successfulResponse, failedResponse};
