
const successUtilityFunc = (req,res,next)=>{
    res.success = (statusCode=200, message="Operation Successful", data={})=>{
        return res.status(statusCode).json({
            Success:true,
            Message:message,
            Data:data
        })
    }

    next()
}

export default successUtilityFunc