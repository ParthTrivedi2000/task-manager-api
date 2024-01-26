class CustomeAPIError extends Error{
constructor(message,statusCode){
    super(message)
    this.statusCode = statusCode
}
}

const createCustomError = (msg,statusCode) => {
    return CustomeAPIError(msg,statusCode)
} 

module.exports = {CustomeAPIError,createCustomError}