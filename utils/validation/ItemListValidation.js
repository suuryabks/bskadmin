/**
 * ItemListValidation.js
 * @description :: validate each post and put request as per ItemList model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');
const { convertObjectToEnum } = require('../common');  

/** validation keys and properties of ItemList */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  item: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  product: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  category: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  collection: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  variety: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  SKU: joi.string().allow(null).allow(''),
  Description: joi.string().allow(null).allow(''),
  karatage: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  composition: joi.any(),
  HUID: joi.string().allow(null).allow(''),
  makingCharge: joi.number().min(0).max(100).allow(0),
  grossWeight: joi.number().integer().allow(0),
  ringsize: joi.string().allow(null).allow(''),
  DesignNumber: joi.string().allow(null).allow(''),
  SupllierName: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  images: joi.array().items(joi.object()),
  video: joi.string().allow(null).allow('')
}).unknown(true);

/** validation keys and properties of ItemList for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  item: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  product: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  category: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  collection: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  variety: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  SKU: joi.string().allow(null).allow(''),
  Description: joi.string().allow(null).allow(''),
  karatage: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  composition: joi.any(),
  HUID: joi.string().allow(null).allow(''),
  makingCharge: joi.number().min(0).max(100).allow(0),
  grossWeight: joi.number().integer().allow(0),
  ringsize: joi.string().allow(null).allow(''),
  DesignNumber: joi.string().allow(null).allow(''),
  SupllierName: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  images: joi.array().items(joi.object()),
  video: joi.string().allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of ItemList for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      item: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      product: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      category: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      collection: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      variety: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      SKU: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      karatage: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      HUID: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      makingCharge: joi.alternatives().try(joi.array().items(),joi.number().min(0).max(100),joi.object()),
      grossWeight: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      ringsize: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      DesignNumber: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      SupllierName: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      video: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
