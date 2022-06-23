/**
 * PlanCycleValidation.js
 * @description :: validate each post and put request as per PlanCycle model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of PlanCycle */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  name: joi.string().allow(null).allow(''),
  gracePeriodinHours: joi.number().integer().allow(0),
  minValue: joi.number().integer().allow(0),
  minWeight: joi.number().integer().allow(0),
  cycleInDays: joi.number().integer().allow(0)
}).unknown(true);

/** validation keys and properties of PlanCycle for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  name: joi.string().allow(null).allow(''),
  gracePeriodinHours: joi.number().integer().allow(0),
  minValue: joi.number().integer().allow(0),
  minWeight: joi.number().integer().allow(0),
  cycleInDays: joi.number().integer().allow(0),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of PlanCycle for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      gracePeriodinHours: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      minValue: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      minWeight: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      cycleInDays: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
