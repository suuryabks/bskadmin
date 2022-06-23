/**
 * bidsController.js
 * @description : exports action methods for bids.
 */

const Bids = require('../../../model/bids');
const bidsSchemaKey = require('../../../utils/validation/bidsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Bids in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Bids. {status, message, data}
 */ 
const addBids = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      bidsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Bids(dataToCreate);
    let createdBids = await dbService.create(Bids,dataToCreate);
    return res.success({ data : createdBids });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Bids in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Bidss. {status, message, data}
 */
const bulkInsertBids = async (req,res)=>{
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
    let createdBidss = await dbService.create(Bids,dataToCreate);
    createdBidss = { count: createdBidss ? createdBidss.length : 0 };
    return res.success({ data:{ count:createdBidss.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Bids from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Bids(s). {status, message, data}
 */
const findAllBids = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      bidsSchemaKey.findFilterKeys,
      Bids.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Bids, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundBidss = await dbService.paginate( Bids,query,options);
    if (!foundBidss || !foundBidss.data || !foundBidss.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundBidss });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Bids from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Bids. {status, message, data}
 */
const getBids = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundBids = await dbService.findOne(Bids,query, options);
    if (!foundBids){
      return res.recordNotFound();
    }
    return res.success({ data :foundBids });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Bids.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getBidsCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      bidsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedBids = await dbService.count(Bids,where);
    return res.success({ data : { count: countedBids } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Bids with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Bids.
 * @return {Object} : updated Bids. {status, message, data}
 */
const updateBids = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      bidsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedBids = await dbService.updateOne(Bids,query,dataToUpdate);
    if (!updatedBids){
      return res.recordNotFound();
    }
    return res.success({ data :updatedBids });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Bids with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Bidss.
 * @return {Object} : updated Bidss. {status, message, data}
 */
const bulkUpdateBids = async (req,res)=>{
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
    let updatedBids = await dbService.updateMany(Bids,filter,dataToUpdate);
    if (!updatedBids){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedBids } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Bids with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Bids.
 * @return {obj} : updated Bids. {status, message, data}
 */
const partialUpdateBids = async (req,res) => {
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
      bidsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedBids = await dbService.updateOne(Bids, query, dataToUpdate);
    if (!updatedBids) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedBids });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Bids from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Bids.
 * @return {Object} : deactivated Bids. {status, message, data}
 */
const softDeleteBids = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedBids = await dbService.updateOne(Bids, query, updateBody);
    if (!updatedBids){
      return res.recordNotFound();
    }
    return res.success({ data:updatedBids });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Bids from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Bids. {status, message, data}
 */
const deleteBids = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedBids = await dbService.deleteOne(Bids, query);
    if (!deletedBids){
      return res.recordNotFound();
    }
    return res.success({ data :deletedBids });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Bids in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyBids = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedBids = await dbService.deleteMany(Bids,query);
    if (!deletedBids){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedBids } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Bids from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Bids.
 * @return {Object} : number of deactivated documents of Bids. {status, message, data}
 */
const softDeleteManyBids = async (req,res) => {
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
    let updatedBids = await dbService.updateMany(Bids,query, updateBody);
    if (!updatedBids) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedBids } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addBids,
  bulkInsertBids,
  findAllBids,
  getBids,
  getBidsCount,
  updateBids,
  bulkUpdateBids,
  partialUpdateBids,
  softDeleteBids,
  deleteBids,
  deleteManyBids,
  softDeleteManyBids    
};