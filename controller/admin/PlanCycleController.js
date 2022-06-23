/**
 * PlanCycleController.js
 * @description : exports action methods for PlanCycle.
 */

const PlanCycle = require('../../model/PlanCycle');
const PlanCycleSchemaKey = require('../../utils/validation/PlanCycleValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of PlanCycle in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created PlanCycle. {status, message, data}
 */ 
const addPlanCycle = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      PlanCycleSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new PlanCycle(dataToCreate);
    let createdPlanCycle = await dbService.create(PlanCycle,dataToCreate);
    return res.success({ data : createdPlanCycle });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of PlanCycle in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created PlanCycles. {status, message, data}
 */
const bulkInsertPlanCycle = async (req,res)=>{
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
    let createdPlanCycles = await dbService.create(PlanCycle,dataToCreate);
    createdPlanCycles = { count: createdPlanCycles ? createdPlanCycles.length : 0 };
    return res.success({ data:{ count:createdPlanCycles.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of PlanCycle from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found PlanCycle(s). {status, message, data}
 */
const findAllPlanCycle = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      PlanCycleSchemaKey.findFilterKeys,
      PlanCycle.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(PlanCycle, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundPlanCycles = await dbService.paginate( PlanCycle,query,options);
    if (!foundPlanCycles || !foundPlanCycles.data || !foundPlanCycles.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundPlanCycles });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of PlanCycle from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found PlanCycle. {status, message, data}
 */
const getPlanCycle = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundPlanCycle = await dbService.findOne(PlanCycle,query, options);
    if (!foundPlanCycle){
      return res.recordNotFound();
    }
    return res.success({ data :foundPlanCycle });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of PlanCycle.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getPlanCycleCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      PlanCycleSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedPlanCycle = await dbService.count(PlanCycle,where);
    return res.success({ data : { count: countedPlanCycle } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of PlanCycle with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated PlanCycle.
 * @return {Object} : updated PlanCycle. {status, message, data}
 */
const updatePlanCycle = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      PlanCycleSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedPlanCycle = await dbService.updateOne(PlanCycle,query,dataToUpdate);
    if (!updatedPlanCycle){
      return res.recordNotFound();
    }
    return res.success({ data :updatedPlanCycle });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of PlanCycle with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated PlanCycles.
 * @return {Object} : updated PlanCycles. {status, message, data}
 */
const bulkUpdatePlanCycle = async (req,res)=>{
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
    let updatedPlanCycle = await dbService.updateMany(PlanCycle,filter,dataToUpdate);
    if (!updatedPlanCycle){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedPlanCycle } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of PlanCycle with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated PlanCycle.
 * @return {obj} : updated PlanCycle. {status, message, data}
 */
const partialUpdatePlanCycle = async (req,res) => {
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
      PlanCycleSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedPlanCycle = await dbService.updateOne(PlanCycle, query, dataToUpdate);
    if (!updatedPlanCycle) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedPlanCycle });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of PlanCycle from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of PlanCycle.
 * @return {Object} : deactivated PlanCycle. {status, message, data}
 */
const softDeletePlanCycle = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedPlanCycle = await dbService.updateOne(PlanCycle, query, updateBody);
    if (!updatedPlanCycle){
      return res.recordNotFound();
    }
    return res.success({ data:updatedPlanCycle });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of PlanCycle from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted PlanCycle. {status, message, data}
 */
const deletePlanCycle = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedPlanCycle = await dbService.deleteOne(PlanCycle, query);
    if (!deletedPlanCycle){
      return res.recordNotFound();
    }
    return res.success({ data :deletedPlanCycle });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of PlanCycle in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyPlanCycle = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedPlanCycle = await dbService.deleteMany(PlanCycle,query);
    if (!deletedPlanCycle){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedPlanCycle } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of PlanCycle from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of PlanCycle.
 * @return {Object} : number of deactivated documents of PlanCycle. {status, message, data}
 */
const softDeleteManyPlanCycle = async (req,res) => {
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
    let updatedPlanCycle = await dbService.updateMany(PlanCycle,query, updateBody);
    if (!updatedPlanCycle) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedPlanCycle } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addPlanCycle,
  bulkInsertPlanCycle,
  findAllPlanCycle,
  getPlanCycle,
  getPlanCycleCount,
  updatePlanCycle,
  bulkUpdatePlanCycle,
  partialUpdatePlanCycle,
  softDeletePlanCycle,
  deletePlanCycle,
  deleteManyPlanCycle,
  softDeleteManyPlanCycle    
};