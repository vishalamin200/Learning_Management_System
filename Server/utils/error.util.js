
const errorUtilityFunc = (req,res,next)=>{
    res.sendError = (statusCode=400, message="Something Went Wrong", error="")=>{
        return res.status(statusCode).json({
            Success:false,
            Message:message,
            Error:error
        })
    }

    next()
}

export default errorUtilityFunc