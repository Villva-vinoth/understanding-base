const errorHandling = (error,req,res,next)=>{

    if(error){
        console.log('error  dfg:',error)
        if(error.name === 'SequelizeForeignKeyConstraintError'){
            res.status(error.statusCode || 500).json({
                success:false,
                message:'Foreign Key Constraint Error'
            })
        }
        
        res.status(error.statusCode || 500).json({
            success:false,
            message:error.message || 'Internal Server Error'
        })
    }
    next();
}
module.exports = { errorHandling  }