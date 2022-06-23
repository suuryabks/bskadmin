/**
 * userValidation.js
 * @description :: validate each post and put request as per user model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');
const authConstantDefault = require('../../constants/authConstant');    
const { USER_TYPES } = require('../../constants/authConstant');
const { convertObjectToEnum } = require('../common');   

/** validation keys and properties of user */
exports.schemaKeys = joi.object({
  email: joi.string().email().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  userType: joi.number().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  PAN: joi.string().allow(null).allow(''),
  ReferedBy: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  ReferalID: joi.string().allow(null).allow(''),
  phone: joi.number().integer().allow(0),
  image: joi.string().allow(null).allow(''),
  isWhatsapp: joi.boolean().default(true),
  mobileNo: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  username: joi.string().allow(null).allow(''),
  resetPasswordLink: joi.object({
    code:joi.string(),
    expireTime:joi.date().options({ convert: true })
  })
}).unknown(true);

/** validation keys and properties of user for updation */
exports.updateSchemaKeys = joi.object({
  email: joi.string().email().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  userType: joi.number().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  PAN: joi.string().allow(null).allow(''),
  ReferedBy: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  ReferalID: joi.string().allow(null).allow(''),
  phone: joi.number().integer().allow(0),
  image: joi.string().allow(null).allow(''),
  isWhatsapp: joi.boolean().default(true),
  mobileNo: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  username: joi.string().allow(null).allow(''),
  resetPasswordLink: joi.object({
    code:joi.string(),
    expireTime:joi.date().options({ convert: true })
  }),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of user for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      email: joi.alternatives().try(joi.array().items(),joi.string().email(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      PAN: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      ReferedBy: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      ReferalID: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      phone: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      image: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isWhatsapp: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      mobileNo: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      password: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      username: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
