const userModel = require('../../model/user.model');
const {userValidate} = require('../../utils/validate');
const { validationError } = require('../../utils/customError');
module.exports ={ 
    createUsers:  (data) =>{
        try {
            const { error ,value} = userValidate.validate(data)
            if(error){
                throw new validationError(error.details[0].message,422)
            }
            const user =  userModel.create(value)
            return user;
        } catch (error) {
            throw error
        }
    },
    getUsers: async () => {
        try {
            const users = await userModel.findAll()
            return users
        } catch (error) {
            throw error
        }
    }   
}