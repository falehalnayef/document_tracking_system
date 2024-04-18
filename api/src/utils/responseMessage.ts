import ResponseMessage from "../interfaces/utility_interfaces/responseMessage.js";


const successfulResponse =(message: string, data?: object):ResponseMessage =>{

    return {
        status: true,
        message: message,
        data: data
    };
}


const failedResponse =(error: string):ResponseMessage =>{

    return {
        status: false,
        error: error,
    }
}

export {successfulResponse, failedResponse};
