/**
 * supplierController.js
 * @description : exports action methods for supplier.
 */

const Supplier = require('../../model/supplier');
const supplierSchemaKey = require('../../utils/validation/supplierValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Supplier in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Supplier. {status, message, data}
 */ 
const addSupplier = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      supplierSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Supplier(dataToCreate);
    let createdSupplier = await dbService.create(Supplier,dataToCreate);
    return res.success({ data : createdSupplier });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Supplier in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Suppliers. {status, message, data}
 */
const bulkInsertSupplier = async (req,res)=>{
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
    let createdSuppliers = await dbService.create(Supplier,dataToCreate);
    createdSuppliers = { count: createdSuppliers ? createdSuppliers.length : 0 };
    return res.success({ data:{ count:createdSuppliers.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Supplier from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Supplier(s). {status, message, data}
 */
const findAllSupplier = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      supplierSchemaKey.findFilterKeys,
      Supplier.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Supplier, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundSuppliers = await dbService.paginate( Supplier,query,options);
    if (!foundSuppliers || !foundSuppliers.data || !foundSuppliers.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundSuppliers });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Supplier from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Supplier. {status, message, data}
 */
const getSupplier = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundSupplier = await dbService.findOne(Supplier,query, options);
    if (!foundSupplier){
      return res.recordNotFound();
    }
    return res.success({ data :foundSupplier });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Supplier.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getSupplierCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      supplierSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedSupplier = await dbService.count(Supplier,where);
    return res.success({ data : { count: countedSupplier } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Supplier with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Supplier.
 * @return {Object} : updated Supplier. {status, message, data}
 */
const updateSupplier = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      supplierSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedSupplier = await dbService.updateOne(Supplier,query,dataToUpdate);
    if (!updatedSupplier){
      return res.recordNotFound();
    }
    return res.success({ data :updatedSupplier });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Supplier with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Suppliers.
 * @return {Object} : updated Suppliers. {status, message, data}
 */
const bulkUpdateSupplier = async (req,res)=>{
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
    let updatedSupplier = await dbService.updateMany(Supplier,filter,dataToUpdate);
    if (!updatedSupplier){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedSupplier } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Supplier with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Supplier.
 * @return {obj} : updated Supplier. {status, message, data}
 */
const partialUpdateSupplier = async (req,res) => {
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
      supplierSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedSupplier = await dbService.updateOne(Supplier, query, dataToUpdate);
    if (!updatedSupplier) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedSupplier });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Supplier from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Supplier.
 * @return {Object} : deactivated Supplier. {status, message, data}
 */
const softDeleteSupplier = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedSupplier = await deleteDependentService.softDeleteSupplier(query, updateBody);
    if (!updatedSupplier){
      return res.recordNotFound();
    }
    return res.success({ data:updatedSupplier });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Supplier from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Supplier. {status, message, data}
 */
const deleteSupplier = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedSupplier;
    if (req.body.isWarning) { 
      deletedSupplier = await deleteDependentService.countSupplier(query);
    } else {
      deletedSupplier = await deleteDependentService.deleteSupplier(query);
    }
    if (!deletedSupplier){
      return res.recordNotFound();
    }
    return res.success({ data :deletedSupplier });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Supplier in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManySupplier = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedSupplier;
    if (req.body.isWarning) {
      deletedSupplier = await deleteDependentService.countSupplier(query);
    }
    else {
      deletedSupplier = await deleteDependentService.deleteSupplier(query);
    }
    if (!deletedSupplier){
      return res.recordNotFound();
    }
    return res.success({ data :deletedSupplier });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Supplier from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Supplier.
 * @return {Object} : number of deactivated documents of Supplier. {status, message, data}
 */
const softDeleteManySupplier = async (req,res) => {
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
    let updatedSupplier = await deleteDependentService.softDeleteSupplier(query, updateBody);
    if (!updatedSupplier) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedSupplier });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addSupplier,
  bulkInsertSupplier,
  findAllSupplier,
  getSupplier,
  getSupplierCount,
  updateSupplier,
  bulkUpdateSupplier,
  partialUpdateSupplier,
  softDeleteSupplier,
  deleteSupplier,
  deleteManySupplier,
  softDeleteManySupplier    
};