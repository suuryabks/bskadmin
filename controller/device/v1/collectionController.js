/**
 * collectionController.js
 * @description : exports action methods for collection.
 */

const Collection = require('../../../model/collection');
const collectionSchemaKey = require('../../../utils/validation/collectionValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Collection in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Collection. {status, message, data}
 */ 
const addCollection = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      collectionSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Collection(dataToCreate);
    let createdCollection = await dbService.create(Collection,dataToCreate);
    return res.success({ data : createdCollection });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Collection in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Collections. {status, message, data}
 */
const bulkInsertCollection = async (req,res)=>{
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
    let createdCollections = await dbService.create(Collection,dataToCreate);
    createdCollections = { count: createdCollections ? createdCollections.length : 0 };
    return res.success({ data:{ count:createdCollections.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Collection from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Collection(s). {status, message, data}
 */
const findAllCollection = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      collectionSchemaKey.findFilterKeys,
      Collection.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Collection, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundCollections = await dbService.paginate( Collection,query,options);
    if (!foundCollections || !foundCollections.data || !foundCollections.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundCollections });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Collection from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Collection. {status, message, data}
 */
const getCollection = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundCollection = await dbService.findOne(Collection,query, options);
    if (!foundCollection){
      return res.recordNotFound();
    }
    return res.success({ data :foundCollection });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Collection.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getCollectionCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      collectionSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedCollection = await dbService.count(Collection,where);
    return res.success({ data : { count: countedCollection } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Collection with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Collection.
 * @return {Object} : updated Collection. {status, message, data}
 */
const updateCollection = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      collectionSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedCollection = await dbService.updateOne(Collection,query,dataToUpdate);
    if (!updatedCollection){
      return res.recordNotFound();
    }
    return res.success({ data :updatedCollection });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Collection with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Collections.
 * @return {Object} : updated Collections. {status, message, data}
 */
const bulkUpdateCollection = async (req,res)=>{
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
    let updatedCollection = await dbService.updateMany(Collection,filter,dataToUpdate);
    if (!updatedCollection){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedCollection } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Collection with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Collection.
 * @return {obj} : updated Collection. {status, message, data}
 */
const partialUpdateCollection = async (req,res) => {
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
      collectionSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedCollection = await dbService.updateOne(Collection, query, dataToUpdate);
    if (!updatedCollection) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedCollection });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Collection from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Collection.
 * @return {Object} : deactivated Collection. {status, message, data}
 */
const softDeleteCollection = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedCollection = await deleteDependentService.softDeleteCollection(query, updateBody);
    if (!updatedCollection){
      return res.recordNotFound();
    }
    return res.success({ data:updatedCollection });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Collection from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Collection. {status, message, data}
 */
const deleteCollection = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedCollection;
    if (req.body.isWarning) { 
      deletedCollection = await deleteDependentService.countCollection(query);
    } else {
      deletedCollection = await deleteDependentService.deleteCollection(query);
    }
    if (!deletedCollection){
      return res.recordNotFound();
    }
    return res.success({ data :deletedCollection });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Collection in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyCollection = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedCollection;
    if (req.body.isWarning) {
      deletedCollection = await deleteDependentService.countCollection(query);
    }
    else {
      deletedCollection = await deleteDependentService.deleteCollection(query);
    }
    if (!deletedCollection){
      return res.recordNotFound();
    }
    return res.success({ data :deletedCollection });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Collection from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Collection.
 * @return {Object} : number of deactivated documents of Collection. {status, message, data}
 */
const softDeleteManyCollection = async (req,res) => {
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
    let updatedCollection = await deleteDependentService.softDeleteCollection(query, updateBody);
    if (!updatedCollection) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedCollection });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addCollection,
  bulkInsertCollection,
  findAllCollection,
  getCollection,
  getCollectionCount,
  updateCollection,
  bulkUpdateCollection,
  partialUpdateCollection,
  softDeleteCollection,
  deleteCollection,
  deleteManyCollection,
  softDeleteManyCollection    
};