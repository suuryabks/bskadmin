/**
 * TransactionsValidation.js
 * @description :: validate each post and put request as per Transactions model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');
const { convertObjectToEnum } = require('../common');  
const TransactionsDefault = require('../../constants/Transactions');    

/** validation keys and properties of Transactions */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  paymentID: joi.string().allow(null).allow(''),
  Type: joi.string().allow(null).allow(''),
  Condition: joi.string().allow(null).allow(''),
  amount: joi.number().integer().default(null).allow(0),
  weight: joi.number().integer().default(null).allow(0),
  buyRate: joi.number().integer().default(null).allow(0),
  ssellRate: joi.number().integer().default(null).allow(0)
}).unknown(true);

/** validation keys and properties of Transactions for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  paymentID: joi.string().allow(null).allow(''),
  Type: joi.string().allow(null).allow(''),
  Condition: joi.string().allow(null).allow(''),
  amount: joi.number().integer().default(null).allow(0),
  weight: joi.number().integer().default(null).allow(0),
  buyRate: joi.number().integer().default(null).allow(0),
  ssellRate: joi.number().integer().default(null).allow(0),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Transactions for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      paymentID: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      amount: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      weight: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      buyRate: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      ssellRate: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
