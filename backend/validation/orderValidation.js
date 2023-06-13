const joi = require('joi');

const orderSchema = joi.object({

    quantity: joi.number()
        .min(1),

    orderAddress: joi.string()
        .required(true),

    orderStatus: joi.string()
        .required(true)
        .valid('Pending', 'Inprocess', 'Being delivered', 'Completed', 'Cancelled')
        .default('Pending'),

    paymentDate: joi.date(),

    paymentStatus: joi.string()
        .required(true)
        .valid('Unpaid', 'Paid')
        .default('Unpaid'),
    
    paymentMethod: joi.string()
        .valid('', 'COD', 'Esewa', 'Khalti', 'Phone pay')

});

const orderValidation = (req, res, next) => {
    const orderObject = req.body
    const {err} = orderSchema.validate(orderObject)
    if(!err){
        next()
    }
    else{
        res.json(err.message)
    }
};


module.exports = orderValidation;