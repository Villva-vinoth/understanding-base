const {createUsers, getUsers} = require('../service/user.service')
module.exports={
    createUsers:async ( req, res,next)=>{
        try {
            const data = req.body;
            const user = await createUsers(data)
            return res.status(200).json({message:'Created SuccessFully !',user})
        } catch (error) {
            next(error)
        }
    },
    getUsers:async ( req, res,next)=>{
        try {
            const users = await getUsers();
            return res.status(200).json({message:'Records Fetched SuccessFully !',data: users})
        } catch (error) {
            next(error)
        }
    }
}