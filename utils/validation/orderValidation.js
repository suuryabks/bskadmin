/**
 * orderValidation.js
 * @description :: validate each post and put request as per order model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');
const { convertObjectToEnum } = require('../common');  
const orderDefault = require('../../constants/order');    

/** validation keys and properties of order */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  cart: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  transaction: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  GoldBankApplied: joi.boolean(),
  deliveryAgent: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  status: joi.string().default(orderDefault.STATUS['placed']).allow(null).allow('')
}).unknown(true);

/** validation keys and properties of order for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  cart: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  transaction: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  GoldBankApplied: joi.boolean(),
  deliveryAgent: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  status: joi.string().default(orderDefault.STATUS['placed']).allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of order for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      cart: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      transaction: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      GoldBankApplied: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      deliveryAgent: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
