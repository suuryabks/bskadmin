/**
 * itemController.js
 * @description : exports action methods for item.
 */

const Item = require('../../model/item');
const itemSchemaKey = require('../../utils/validation/itemValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Item in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Item. {status, message, data}
 */ 
const addItem = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      itemSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Item(dataToCreate);
    let createdItem = await dbService.create(Item,dataToCreate);
    return res.success({ data : createdItem });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Item in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Items. {status, message, data}
 */
const bulkInsertItem = async (req,res)=>{
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
    let createdItems = await dbService.create(Item,dataToCreate);
    createdItems = { count: createdItems ? createdItems.length : 0 };
    return res.success({ data:{ count:createdItems.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Item from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Item(s). {status, message, data}
 */
const findAllItem = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      itemSchemaKey.findFilterKeys,
      Item.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Item, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundItems = await dbService.paginate( Item,query,options);
    if (!foundItems || !foundItems.data || !foundItems.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundItems });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Item from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Item. {status, message, data}
 */
const getItem = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundItem = await dbService.findOne(Item,query, options);
    if (!foundItem){
      return res.recordNotFound();
    }
    return res.success({ data :foundItem });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Item.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getItemCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      itemSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedItem = await dbService.count(Item,where);
    return res.success({ data : { count: countedItem } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Item with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Item.
 * @return {Object} : updated Item. {status, message, data}
 */
const updateItem = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      itemSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedItem = await dbService.updateOne(Item,query,dataToUpdate);
    if (!updatedItem){
      return res.recordNotFound();
    }
    return res.success({ data :updatedItem });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Item with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Items.
 * @return {Object} : updated Items. {status, message, data}
 */
const bulkUpdateItem = async (req,res)=>{
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
    let updatedItem = await dbService.updateMany(Item,filter,dataToUpdate);
    if (!updatedItem){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedItem } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Item with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Item.
 * @return {obj} : updated Item. {status, message, data}
 */
const partialUpdateItem = async (req,res) => {
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
      itemSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedItem = await dbService.updateOne(Item, query, dataToUpdate);
    if (!updatedItem) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedItem });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Item from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Item.
 * @return {Object} : deactivated Item. {status, message, data}
 */
const softDeleteItem = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedItem = await deleteDependentService.softDeleteItem(query, updateBody);
    if (!updatedItem){
      return res.recordNotFound();
    }
    return res.success({ data:updatedItem });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Item from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Item. {status, message, data}
 */
const deleteItem = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedItem;
    if (req.body.isWarning) { 
      deletedItem = await deleteDependentService.countItem(query);
    } else {
      deletedItem = await deleteDependentService.deleteItem(query);
    }
    if (!deletedItem){
      return res.recordNotFound();
    }
    return res.success({ data :deletedItem });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Item in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyItem = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedItem;
    if (req.body.isWarning) {
      deletedItem = await deleteDependentService.countItem(query);
    }
    else {
      deletedItem = await deleteDependentService.deleteItem(query);
    }
    if (!deletedItem){
      return res.recordNotFound();
    }
    return res.success({ data :deletedItem });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Item from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Item.
 * @return {Object} : number of deactivated documents of Item. {status, message, data}
 */
const softDeleteManyItem = async (req,res) => {
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
    let updatedItem = await deleteDependentService.softDeleteItem(query, updateBody);
    if (!updatedItem) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedItem });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addItem,
  bulkInsertItem,
  findAllItem,
  getItem,
  getItemCount,
  updateItem,
  bulkUpdateItem,
  partialUpdateItem,
  softDeleteItem,
  deleteItem,
  deleteManyItem,
  softDeleteManyItem    
};