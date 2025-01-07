const joi = require('joi')

const userValidate = joi.object({
    first_name: joi.string().min(5).max(100).required().messages({
        "string.empty": "first name field cannot be empty!",
        'string.min': 'First name must be at least {#limit} characters',
        'string.max': 'First name must be at most {#limit} characters',
        'any.required': 'First name is required',
    }),
    last_name: joi.string().min(5).max(100).required().messages({
        "string.empty": "last_name field cannot be empty!",
        'string.min':'last name must be at least {#limit} characters',
        'string.max':'last name must be at most {#limit} Characters',
        'any.required':'last name is Required'
    }),
})

const orderValidate = joi.object({
    user_id: joi.number().required().messages({
        'any.required':"user_id is required!"
    }),
    amount:joi.number().required().messages({
        'any.required':"amount is required!"
    }),
    items:joi.array().items(joi.object({
        product_id:joi.string().required().messages({'any.required':'product_id is required!'}),
        quantity:joi.number().required().messages({'any.required':'quantity is required!'}),
    })),
    ordered_address:joi.string().required().messages({
        'any.required':'Order Address is Required!',
        'string.empty':"ordered address field cannot be empty!"
    })
}).with('amount','items').with('user_id','ordered_address')

const bookingValidate = joi.object({
    name:joi.string().required().min(5).messages({
        'any.required':'name is required!',
        'string.empty':'name field cannot be empty!'
    }),
    phone_number:joi.string().required().messages({
        'any.required':'phone_number is required!',
        'string.empty':'phone_number field cannot be empty!',
        'string.valid':'phone_number is not valid!'
    })
})

module.exports = { userValidate, orderValidate ,bookingValidate }