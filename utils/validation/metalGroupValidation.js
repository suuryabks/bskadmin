/**
 * metalGroupValidation.js
 * @description :: validate each post and put request as per metalGroup model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of metalGroup */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  metal: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  properties: joi.object({
    karatage:joi.string().default(null),
    fineness:joi.string(),
    referenceID:joi.number().integer()
  }).allow(0),
  shortName: joi.string().allow(null).allow('')
}).unknown(true);

/** validation keys and properties of metalGroup for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  metal: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  properties: joi.object({
    karatage:joi.string().default(null),
    fineness:joi.string(),
    referenceID:joi.number().integer()
  }).allow(0),
  shortName: joi.string().allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of metalGroup for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      metal: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      properties: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      shortName: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
