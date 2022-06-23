/**
 * clarityController.js
 * @description : exports action methods for clarity.
 */

const Clarity = require('../../model/clarity');
const claritySchemaKey = require('../../utils/validation/clarityValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Clarity in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Clarity. {status, message, data}
 */ 
const addClarity = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      claritySchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Clarity(dataToCreate);
    let createdClarity = await dbService.create(Clarity,dataToCreate);
    return res.success({ data : createdClarity });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Clarity in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Claritys. {status, message, data}
 */
const bulkInsertClarity = async (req,res)=>{
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
    let createdClaritys = await dbService.create(Clarity,dataToCreate);
    createdClaritys = { count: createdClaritys ? createdClaritys.length : 0 };
    return res.success({ data:{ count:createdClaritys.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Clarity from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Clarity(s). {status, message, data}
 */
const findAllClarity = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      claritySchemaKey.findFilterKeys,
      Clarity.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Clarity, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundClaritys = await dbService.paginate( Clarity,query,options);
    if (!foundClaritys || !foundClaritys.data || !foundClaritys.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundClaritys });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Clarity from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Clarity. {status, message, data}
 */
const getClarity = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundClarity = await dbService.findOne(Clarity,query, options);
    if (!foundClarity){
      return res.recordNotFound();
    }
    return res.success({ data :foundClarity });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Clarity.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getClarityCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      claritySchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedClarity = await dbService.count(Clarity,where);
    return res.success({ data : { count: countedClarity } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Clarity with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Clarity.
 * @return {Object} : updated Clarity. {status, message, data}
 */
const updateClarity = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      claritySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedClarity = await dbService.updateOne(Clarity,query,dataToUpdate);
    if (!updatedClarity){
      return res.recordNotFound();
    }
    return res.success({ data :updatedClarity });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Clarity with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Claritys.
 * @return {Object} : updated Claritys. {status, message, data}
 */
const bulkUpdateClarity = async (req,res)=>{
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
    let updatedClarity = await dbService.updateMany(Clarity,filter,dataToUpdate);
    if (!updatedClarity){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedClarity } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Clarity with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Clarity.
 * @return {obj} : updated Clarity. {status, message, data}
 */
const partialUpdateClarity = async (req,res) => {
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
      claritySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedClarity = await dbService.updateOne(Clarity, query, dataToUpdate);
    if (!updatedClarity) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedClarity });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Clarity from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Clarity.
 * @return {Object} : deactivated Clarity. {status, message, data}
 */
const softDeleteClarity = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedClarity = await dbService.updateOne(Clarity, query, updateBody);
    if (!updatedClarity){
      return res.recordNotFound();
    }
    return res.success({ data:updatedClarity });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Clarity from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Clarity. {status, message, data}
 */
const deleteClarity = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedClarity = await dbService.deleteOne(Clarity, query);
    if (!deletedClarity){
      return res.recordNotFound();
    }
    return res.success({ data :deletedClarity });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Clarity in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyClarity = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedClarity = await dbService.deleteMany(Clarity,query);
    if (!deletedClarity){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedClarity } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Clarity from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Clarity.
 * @return {Object} : number of deactivated documents of Clarity. {status, message, data}
 */
const softDeleteManyClarity = async (req,res) => {
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
    let updatedClarity = await dbService.updateMany(Clarity,query, updateBody);
    if (!updatedClarity) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedClarity } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addClarity,
  bulkInsertClarity,
  findAllClarity,
  getClarity,
  getClarityCount,
  updateClarity,
  bulkUpdateClarity,
  partialUpdateClarity,
  softDeleteClarity,
  deleteClarity,
  deleteManyClarity,
  softDeleteManyClarity    
};