const Joi = require("joi")
const Response = require("../services/Response");
const Helper = require("../services/Helper");

module.exports = {
    taskValidation : (req ,res , cb) => {
        const taskSchema = Joi.object({
            title : Joi.string().required(),
            description : Joi.string().required(),
            priority: Joi.string().valid('high', 'medium', 'low').required(),
            dueDate : Joi.string().regex(/^\d{2}-\d{2}-\d{4}$/).required()
        });

        const {error} = taskSchema.validate(req);
        if(error) {
            return Response.validationErrorResponseData(
                res,
                res.__(Helper.validationMessageKey('taskValidation',error))
            )
        } 
        return cb(true);
    },
    updateTaskValidation : (req ,res , cb) => {
        const taskSchema = Joi.object({
            title: Joi.string().allow('').optional(),
            description: Joi.string().allow('').optional(),
            priority: Joi.string().valid('high', 'medium', 'low').optional(),
            dueDate: Joi.string().regex(/^\d{2}-\d{2}-\d{4}$/).optional(),
            status: Joi.string().valid('completed', 'in progress').optional()
        });
    

        const {error} = taskSchema.validate(req);
        if(error) {
            return Response.validationErrorResponseData(
                res,
                res.__(Helper.validationMessageKey('taskValidation',error))
            )
        } 
        return cb(true);
    },
    changeStatus : (req ,res , cb) => {
        const taskSchema = Joi.object({
            id: Joi.number().integer().required(), // Ensures id is a required integer
            status: Joi.string().valid('completed', 'in progress').required()
        });
    

        const {error} = taskSchema.validate(req);
        if(error) {
            return Response.validationErrorResponseData(
                res,
                res.__(Helper.validationMessageKey('taskValidation',error))
            )
        } 
        return cb(true);
    }
}