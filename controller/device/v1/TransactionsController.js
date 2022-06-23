/**
 * TransactionsController.js
 * @description : exports action methods for Transactions.
 */

const Transactions = require('../../../model/Transactions');
const TransactionsSchemaKey = require('../../../utils/validation/TransactionsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Transactions in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Transactions. {status, message, data}
 */ 
const addTransactions = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      TransactionsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Transactions(dataToCreate);
    let createdTransactions = await dbService.create(Transactions,dataToCreate);
    return res.success({ data : createdTransactions });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Transactions in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Transactionss. {status, message, data}
 */
const bulkInsertTransactions = async (req,res)=>{
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
    let createdTransactionss = await dbService.create(Transactions,dataToCreate);
    createdTransactionss = { count: createdTransactionss ? createdTransactionss.length : 0 };
    return res.success({ data:{ count:createdTransactionss.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Transactions from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Transactions(s). {status, message, data}
 */
const findAllTransactions = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      TransactionsSchemaKey.findFilterKeys,
      Transactions.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Transactions, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundTransactionss = await dbService.paginate( Transactions,query,options);
    if (!foundTransactionss || !foundTransactionss.data || !foundTransactionss.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundTransactionss });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Transactions from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Transactions. {status, message, data}
 */
const getTransactions = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundTransactions = await dbService.findOne(Transactions,query, options);
    if (!foundTransactions){
      return res.recordNotFound();
    }
    return res.success({ data :foundTransactions });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Transactions.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getTransactionsCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      TransactionsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedTransactions = await dbService.count(Transactions,where);
    return res.success({ data : { count: countedTransactions } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Transactions with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Transactions.
 * @return {Object} : updated Transactions. {status, message, data}
 */
const updateTransactions = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      TransactionsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedTransactions = await dbService.updateOne(Transactions,query,dataToUpdate);
    if (!updatedTransactions){
      return res.recordNotFound();
    }
    return res.success({ data :updatedTransactions });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Transactions with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Transactionss.
 * @return {Object} : updated Transactionss. {status, message, data}
 */
const bulkUpdateTransactions = async (req,res)=>{
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
    let updatedTransactions = await dbService.updateMany(Transactions,filter,dataToUpdate);
    if (!updatedTransactions){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedTransactions } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Transactions with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Transactions.
 * @return {obj} : updated Transactions. {status, message, data}
 */
const partialUpdateTransactions = async (req,res) => {
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
      TransactionsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedTransactions = await dbService.updateOne(Transactions, query, dataToUpdate);
    if (!updatedTransactions) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedTransactions });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Transactions from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Transactions.
 * @return {Object} : deactivated Transactions. {status, message, data}
 */
const softDeleteTransactions = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedTransactions = await deleteDependentService.softDeleteTransactions(query, updateBody);
    if (!updatedTransactions){
      return res.recordNotFound();
    }
    return res.success({ data:updatedTransactions });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Transactions from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Transactions. {status, message, data}
 */
const deleteTransactions = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedTransactions;
    if (req.body.isWarning) { 
      deletedTransactions = await deleteDependentService.countTransactions(query);
    } else {
      deletedTransactions = await deleteDependentService.deleteTransactions(query);
    }
    if (!deletedTransactions){
      return res.recordNotFound();
    }
    return res.success({ data :deletedTransactions });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Transactions in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyTransactions = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedTransactions;
    if (req.body.isWarning) {
      deletedTransactions = await deleteDependentService.countTransactions(query);
    }
    else {
      deletedTransactions = await deleteDependentService.deleteTransactions(query);
    }
    if (!deletedTransactions){
      return res.recordNotFound();
    }
    return res.success({ data :deletedTransactions });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Transactions from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Transactions.
 * @return {Object} : number of deactivated documents of Transactions. {status, message, data}
 */
const softDeleteManyTransactions = async (req,res) => {
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
    let updatedTransactions = await deleteDependentService.softDeleteTransactions(query, updateBody);
    if (!updatedTransactions) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedTransactions });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addTransactions,
  bulkInsertTransactions,
  findAllTransactions,
  getTransactions,
  getTransactionsCount,
  updateTransactions,
  bulkUpdateTransactions,
  partialUpdateTransactions,
  softDeleteTransactions,
  deleteTransactions,
  deleteManyTransactions,
  softDeleteManyTransactions    
};