/**
 * bidsValidation.js
 * @description :: validate each post and put request as per bids model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');
const { convertObjectToEnum } = require('../common');  
const bidsDefault = require('../../constants/bids');    

/** validation keys and properties of bids */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  type: joi.string().allow(null).allow(''),
  weight: joi.number().integer().allow(0),
  rate: joi.number().integer().allow(0),
  status: joi.string().allow(null).allow('')
}).unknown(true);

/** validation keys and properties of bids for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  type: joi.string().allow(null).allow(''),
  weight: joi.number().integer().allow(0),
  rate: joi.number().integer().allow(0),
  status: joi.string().allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of bids for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      weight: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      rate: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
