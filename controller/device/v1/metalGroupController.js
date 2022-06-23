/**
 * metalGroupController.js
 * @description : exports action methods for metalGroup.
 */

const MetalGroup = require('../../../model/metalGroup');
const metalGroupSchemaKey = require('../../../utils/validation/metalGroupValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
   
/**
 * @description : create document of MetalGroup in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created MetalGroup. {status, message, data}
 */ 
const addMetalGroup = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      metalGroupSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new MetalGroup(dataToCreate);
    let createdMetalGroup = await dbService.create(MetalGroup,dataToCreate);
    return res.success({ data : createdMetalGroup });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of MetalGroup in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created MetalGroups. {status, message, data}
 */
const bulkInsertMetalGroup = async (req,res)=>{
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
    let createdMetalGroups = await dbService.create(MetalGroup,dataToCreate);
    createdMetalGroups = { count: createdMetalGroups ? createdMetalGroups.length : 0 };
    return res.success({ data:{ count:createdMetalGroups.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of MetalGroup from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found MetalGroup(s). {status, message, data}
 */
const findAllMetalGroup = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      metalGroupSchemaKey.findFilterKeys,
      MetalGroup.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(MetalGroup, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundMetalGroups = await dbService.paginate( MetalGroup,query,options);
    if (!foundMetalGroups || !foundMetalGroups.data || !foundMetalGroups.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundMetalGroups });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of MetalGroup from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found MetalGroup. {status, message, data}
 */
const getMetalGroup = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundMetalGroup = await dbService.findOne(MetalGroup,query, options);
    if (!foundMetalGroup){
      return res.recordNotFound();
    }
    return res.success({ data :foundMetalGroup });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of MetalGroup.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getMetalGroupCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      metalGroupSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedMetalGroup = await dbService.count(MetalGroup,where);
    return res.success({ data : { count: countedMetalGroup } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of MetalGroup with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated MetalGroup.
 * @return {Object} : updated MetalGroup. {status, message, data}
 */
const updateMetalGroup = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      metalGroupSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedMetalGroup = await dbService.updateOne(MetalGroup,query,dataToUpdate);
    if (!updatedMetalGroup){
      return res.recordNotFound();
    }
    return res.success({ data :updatedMetalGroup });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of MetalGroup with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated MetalGroups.
 * @return {Object} : updated MetalGroups. {status, message, data}
 */
const bulkUpdateMetalGroup = async (req,res)=>{
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
    let updatedMetalGroup = await dbService.updateMany(MetalGroup,filter,dataToUpdate);
    if (!updatedMetalGroup){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedMetalGroup } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of MetalGroup with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated MetalGroup.
 * @return {obj} : updated MetalGroup. {status, message, data}
 */
const partialUpdateMetalGroup = async (req,res) => {
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
      metalGroupSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedMetalGroup = await dbService.updateOne(MetalGroup, query, dataToUpdate);
    if (!updatedMetalGroup) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedMetalGroup });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of MetalGroup from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of MetalGroup.
 * @return {Object} : deactivated MetalGroup. {status, message, data}
 */
const softDeleteMetalGroup = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedMetalGroup = await deleteDependentService.softDeleteMetalGroup(query, updateBody);
    if (!updatedMetalGroup){
      return res.recordNotFound();
    }
    return res.success({ data:updatedMetalGroup });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of MetalGroup from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted MetalGroup. {status, message, data}
 */
const deleteMetalGroup = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedMetalGroup;
    if (req.body.isWarning) { 
      deletedMetalGroup = await deleteDependentService.countMetalGroup(query);
    } else {
      deletedMetalGroup = await deleteDependentService.deleteMetalGroup(query);
    }
    if (!deletedMetalGroup){
      return res.recordNotFound();
    }
    return res.success({ data :deletedMetalGroup });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of MetalGroup in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyMetalGroup = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedMetalGroup;
    if (req.body.isWarning) {
      deletedMetalGroup = await deleteDependentService.countMetalGroup(query);
    }
    else {
      deletedMetalGroup = await deleteDependentService.deleteMetalGroup(query);
    }
    if (!deletedMetalGroup){
      return res.recordNotFound();
    }
    return res.success({ data :deletedMetalGroup });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of MetalGroup from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of MetalGroup.
 * @return {Object} : number of deactivated documents of MetalGroup. {status, message, data}
 */
const softDeleteManyMetalGroup = async (req,res) => {
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
    let updatedMetalGroup = await deleteDependentService.softDeleteMetalGroup(query, updateBody);
    if (!updatedMetalGroup) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedMetalGroup });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addMetalGroup,
  bulkInsertMetalGroup,
  findAllMetalGroup,
  getMetalGroup,
  getMetalGroupCount,
  updateMetalGroup,
  bulkUpdateMetalGroup,
  partialUpdateMetalGroup,
  softDeleteMetalGroup,
  deleteMetalGroup,
  deleteManyMetalGroup,
  softDeleteManyMetalGroup    
};