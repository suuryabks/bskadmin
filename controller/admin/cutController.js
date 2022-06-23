/**
 * cutController.js
 * @description : exports action methods for cut.
 */

const Cut = require('../../model/cut');
const cutSchemaKey = require('../../utils/validation/cutValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Cut in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Cut. {status, message, data}
 */ 
const addCut = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      cutSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Cut(dataToCreate);
    let createdCut = await dbService.create(Cut,dataToCreate);
    return res.success({ data : createdCut });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Cut in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Cuts. {status, message, data}
 */
const bulkInsertCut = async (req,res)=>{
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
    let createdCuts = await dbService.create(Cut,dataToCreate);
    createdCuts = { count: createdCuts ? createdCuts.length : 0 };
    return res.success({ data:{ count:createdCuts.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Cut from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Cut(s). {status, message, data}
 */
const findAllCut = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      cutSchemaKey.findFilterKeys,
      Cut.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Cut, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundCuts = await dbService.paginate( Cut,query,options);
    if (!foundCuts || !foundCuts.data || !foundCuts.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundCuts });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Cut from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Cut. {status, message, data}
 */
const getCut = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundCut = await dbService.findOne(Cut,query, options);
    if (!foundCut){
      return res.recordNotFound();
    }
    return res.success({ data :foundCut });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Cut.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getCutCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      cutSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedCut = await dbService.count(Cut,where);
    return res.success({ data : { count: countedCut } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Cut with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Cut.
 * @return {Object} : updated Cut. {status, message, data}
 */
const updateCut = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      cutSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedCut = await dbService.updateOne(Cut,query,dataToUpdate);
    if (!updatedCut){
      return res.recordNotFound();
    }
    return res.success({ data :updatedCut });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Cut with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Cuts.
 * @return {Object} : updated Cuts. {status, message, data}
 */
const bulkUpdateCut = async (req,res)=>{
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
    let updatedCut = await dbService.updateMany(Cut,filter,dataToUpdate);
    if (!updatedCut){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedCut } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Cut with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Cut.
 * @return {obj} : updated Cut. {status, message, data}
 */
const partialUpdateCut = async (req,res) => {
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
      cutSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedCut = await dbService.updateOne(Cut, query, dataToUpdate);
    if (!updatedCut) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedCut });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Cut from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Cut.
 * @return {Object} : deactivated Cut. {status, message, data}
 */
const softDeleteCut = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedCut = await dbService.updateOne(Cut, query, updateBody);
    if (!updatedCut){
      return res.recordNotFound();
    }
    return res.success({ data:updatedCut });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Cut from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Cut. {status, message, data}
 */
const deleteCut = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedCut = await dbService.deleteOne(Cut, query);
    if (!deletedCut){
      return res.recordNotFound();
    }
    return res.success({ data :deletedCut });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Cut in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyCut = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedCut = await dbService.deleteMany(Cut,query);
    if (!deletedCut){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedCut } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Cut from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Cut.
 * @return {Object} : number of deactivated documents of Cut. {status, message, data}
 */
const softDeleteManyCut = async (req,res) => {
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
    let updatedCut = await dbService.updateMany(Cut,query, updateBody);
    if (!updatedCut) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedCut } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addCut,
  bulkInsertCut,
  findAllCut,
  getCut,
  getCutCount,
  updateCut,
  bulkUpdateCut,
  partialUpdateCut,
  softDeleteCut,
  deleteCut,
  deleteManyCut,
  softDeleteManyCut    
};