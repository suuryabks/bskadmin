/**
 * ItemListController.js
 * @description : exports action methods for ItemList.
 */

const ItemList = require('../../model/ItemList');
const ItemListSchemaKey = require('../../utils/validation/ItemListValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of ItemList in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created ItemList. {status, message, data}
 */ 
const addItemList = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      ItemListSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new ItemList(dataToCreate);
    let createdItemList = await dbService.create(ItemList,dataToCreate);
    return res.success({ data : createdItemList });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of ItemList in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created ItemLists. {status, message, data}
 */
const bulkInsertItemList = async (req,res)=>{
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
    let createdItemLists = await dbService.create(ItemList,dataToCreate);
    createdItemLists = { count: createdItemLists ? createdItemLists.length : 0 };
    return res.success({ data:{ count:createdItemLists.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of ItemList from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found ItemList(s). {status, message, data}
 */
const findAllItemList = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      ItemListSchemaKey.findFilterKeys,
      ItemList.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(ItemList, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundItemLists = await dbService.paginate( ItemList,query,options);
    if (!foundItemLists || !foundItemLists.data || !foundItemLists.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundItemLists });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of ItemList from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found ItemList. {status, message, data}
 */
const getItemList = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundItemList = await dbService.findOne(ItemList,query, options);
    if (!foundItemList){
      return res.recordNotFound();
    }
    return res.success({ data :foundItemList });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of ItemList.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getItemListCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      ItemListSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedItemList = await dbService.count(ItemList,where);
    return res.success({ data : { count: countedItemList } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of ItemList with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated ItemList.
 * @return {Object} : updated ItemList. {status, message, data}
 */
const updateItemList = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ItemListSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedItemList = await dbService.updateOne(ItemList,query,dataToUpdate);
    if (!updatedItemList){
      return res.recordNotFound();
    }
    return res.success({ data :updatedItemList });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of ItemList with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated ItemLists.
 * @return {Object} : updated ItemLists. {status, message, data}
 */
const bulkUpdateItemList = async (req,res)=>{
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
    let updatedItemList = await dbService.updateMany(ItemList,filter,dataToUpdate);
    if (!updatedItemList){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedItemList } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of ItemList with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated ItemList.
 * @return {obj} : updated ItemList. {status, message, data}
 */
const partialUpdateItemList = async (req,res) => {
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
      ItemListSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedItemList = await dbService.updateOne(ItemList, query, dataToUpdate);
    if (!updatedItemList) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedItemList });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of ItemList from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of ItemList.
 * @return {Object} : deactivated ItemList. {status, message, data}
 */
const softDeleteItemList = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedItemList = await deleteDependentService.softDeleteItemList(query, updateBody);
    if (!updatedItemList){
      return res.recordNotFound();
    }
    return res.success({ data:updatedItemList });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of ItemList from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted ItemList. {status, message, data}
 */
const deleteItemList = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedItemList;
    if (req.body.isWarning) { 
      deletedItemList = await deleteDependentService.countItemList(query);
    } else {
      deletedItemList = await deleteDependentService.deleteItemList(query);
    }
    if (!deletedItemList){
      return res.recordNotFound();
    }
    return res.success({ data :deletedItemList });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of ItemList in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyItemList = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedItemList;
    if (req.body.isWarning) {
      deletedItemList = await deleteDependentService.countItemList(query);
    }
    else {
      deletedItemList = await deleteDependentService.deleteItemList(query);
    }
    if (!deletedItemList){
      return res.recordNotFound();
    }
    return res.success({ data :deletedItemList });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of ItemList from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of ItemList.
 * @return {Object} : number of deactivated documents of ItemList. {status, message, data}
 */
const softDeleteManyItemList = async (req,res) => {
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
    let updatedItemList = await deleteDependentService.softDeleteItemList(query, updateBody);
    if (!updatedItemList) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedItemList });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addItemList,
  bulkInsertItemList,
  findAllItemList,
  getItemList,
  getItemListCount,
  updateItemList,
  bulkUpdateItemList,
  partialUpdateItemList,
  softDeleteItemList,
  deleteItemList,
  deleteManyItemList,
  softDeleteManyItemList    
};