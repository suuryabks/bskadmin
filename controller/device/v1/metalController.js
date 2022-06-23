/**
 * metalController.js
 * @description : exports action methods for metal.
 */

const Metal = require('../../../model/metal');
const metalSchemaKey = require('../../../utils/validation/metalValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Metal in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Metal. {status, message, data}
 */ 
const addMetal = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      metalSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Metal(dataToCreate);
    let createdMetal = await dbService.create(Metal,dataToCreate);
    return res.success({ data : createdMetal });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Metal in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Metals. {status, message, data}
 */
const bulkInsertMetal = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...dataToCreate[i],
        addedBy: req.user.id
      };
    }
    let createdMetals = await dbService.create(Metal,dataToCreate);
    createdMetals = { count: createdMetals ? createdMetals.length : 0 };
    return res.success({ data:{ count:createdMetals.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Metal from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Metal(s). {status, message, data}
 */
const findAllMetal = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      metalSchemaKey.findFilterKeys,
      Metal.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Metal, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundMetals = await dbService.paginate( Metal,query,options);
    if (!foundMetals || !foundMetals.data || !foundMetals.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundMetals });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Metal from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Metal. {status, message, data}
 */
const getMetal = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundMetal = await dbService.findOne(Metal,query, options);
    if (!foundMetal){
      return res.recordNotFound();
    }
    return res.success({ data :foundMetal });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Metal.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getMetalCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      metalSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedMetal = await dbService.count(Metal,where);
    return res.success({ data : { count: countedMetal } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Metal with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Metal.
 * @return {Object} : updated Metal. {status, message, data}
 */
const updateMetal = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      metalSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedMetal = await dbService.updateOne(Metal,query,dataToUpdate);
    if (!updatedMetal){
      return res.recordNotFound();
    }
    return res.success({ data :updatedMetal });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Metal with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Metals.
 * @return {Object} : updated Metals. {status, message, data}
 */
const bulkUpdateMetal = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    delete dataToUpdate['addedBy'];
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { 
        ...req.body.data,
        updatedBy : req.user.id
      };
    }
    let updatedMetal = await dbService.updateMany(Metal,filter,dataToUpdate);
    if (!updatedMetal){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedMetal } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Metal with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Metal.
 * @return {obj} : updated Metal. {status, message, data}
 */
const partialUpdateMetal = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    delete req.body['addedBy'];
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      metalSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedMetal = await dbService.updateOne(Metal, query, dataToUpdate);
    if (!updatedMetal) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedMetal });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Metal from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Metal.
 * @return {Object} : deactivated Metal. {status, message, data}
 */
const softDeleteMetal = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedMetal = await deleteDependentService.softDeleteMetal(query, updateBody);
    if (!updatedMetal){
      return res.recordNotFound();
    }
    return res.success({ data:updatedMetal });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Metal from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Metal. {status, message, data}
 */
const deleteMetal = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedMetal;
    if (req.body.isWarning) { 
      deletedMetal = await deleteDependentService.countMetal(query);
    } else {
      deletedMetal = await deleteDependentService.deleteMetal(query);
    }
    if (!deletedMetal){
      return res.recordNotFound();
    }
    return res.success({ data :deletedMetal });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Metal in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyMetal = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedMetal;
    if (req.body.isWarning) {
      deletedMetal = await deleteDependentService.countMetal(query);
    }
    else {
      deletedMetal = await deleteDependentService.deleteMetal(query);
    }
    if (!deletedMetal){
      return res.recordNotFound();
    }
    return res.success({ data :deletedMetal });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Metal from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Metal.
 * @return {Object} : number of deactivated documents of Metal. {status, message, data}
 */
const softDeleteManyMetal = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedMetal = await deleteDependentService.softDeleteMetal(query, updateBody);
    if (!updatedMetal) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedMetal });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addMetal,
  bulkInsertMetal,
  findAllMetal,
  getMetal,
  getMetalCount,
  updateMetal,
  bulkUpdateMetal,
  partialUpdateMetal,
  softDeleteMetal,
  deleteMetal,
  deleteManyMetal,
  softDeleteManyMetal    
};