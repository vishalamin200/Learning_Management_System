// notes  ...roles is a rest parameters,   roles is an array of role provided as an argument

function authorizedRoles(...roles) {

    return (req, res, next) => {
        const currentUserRole = req?.user?.role
       
         if(!currentUserRole){
            return res.sendError(401,"User Is Not Logged In")
        }

        if (roles.includes(currentUserRole)) {
            next()
        } else {
            return res.sendError(401, "Access Denied", "You Do Not have Required Permission to Perform This Operation")
        }
    }
}

const isSubscribed = (req,res,next)=>{

    try {
        const role = req.user.role
        const subStatus = req.user.subscription.status
    
        if(role === 'ADMIN' || role === 'INSTRUCTOR' || subStatus ==='active'){
            next()
        }else{
            return res.sendError(401,"Access Denied", "You Do Not have Required Permissino to Access this Resources",req.user)
        }
        
    } catch (error) {
        return res.sendError(400,"Error in isSubscribed Middleware",error.message)
    }
}

export{authorizedRoles,isSubscribed} 