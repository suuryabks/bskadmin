/**
 * styleController.js
 * @description : exports action methods for style.
 */

const Style = require('../../../model/style');
const styleSchemaKey = require('../../../utils/validation/styleValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Style in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Style. {status, message, data}
 */ 
const addStyle = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      styleSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Style(dataToCreate);
    let createdStyle = await dbService.create(Style,dataToCreate);
    return res.success({ data : createdStyle });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Style in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Styles. {status, message, data}
 */
const bulkInsertStyle = async (req,res)=>{
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
    let createdStyles = await dbService.create(Style,dataToCreate);
    createdStyles = { count: createdStyles ? createdStyles.length : 0 };
    return res.success({ data:{ count:createdStyles.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Style from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Style(s). {status, message, data}
 */
const findAllStyle = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      styleSchemaKey.findFilterKeys,
      Style.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Style, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundStyles = await dbService.paginate( Style,query,options);
    if (!foundStyles || !foundStyles.data || !foundStyles.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundStyles });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Style from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Style. {status, message, data}
 */
const getStyle = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundStyle = await dbService.findOne(Style,query, options);
    if (!foundStyle){
      return res.recordNotFound();
    }
    return res.success({ data :foundStyle });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Style.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getStyleCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      styleSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedStyle = await dbService.count(Style,where);
    return res.success({ data : { count: countedStyle } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Style with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Style.
 * @return {Object} : updated Style. {status, message, data}
 */
const updateStyle = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      styleSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedStyle = await dbService.updateOne(Style,query,dataToUpdate);
    if (!updatedStyle){
      return res.recordNotFound();
    }
    return res.success({ data :updatedStyle });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Style with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Styles.
 * @return {Object} : updated Styles. {status, message, data}
 */
const bulkUpdateStyle = async (req,res)=>{
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
    let updatedStyle = await dbService.updateMany(Style,filter,dataToUpdate);
    if (!updatedStyle){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedStyle } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Style with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Style.
 * @return {obj} : updated Style. {status, message, data}
 */
const partialUpdateStyle = async (req,res) => {
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
      styleSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedStyle = await dbService.updateOne(Style, query, dataToUpdate);
    if (!updatedStyle) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedStyle });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Style from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Style.
 * @return {Object} : deactivated Style. {status, message, data}
 */
const softDeleteStyle = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedStyle = await dbService.updateOne(Style, query, updateBody);
    if (!updatedStyle){
      return res.recordNotFound();
    }
    return res.success({ data:updatedStyle });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Style from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Style. {status, message, data}
 */
const deleteStyle = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedStyle = await dbService.deleteOne(Style, query);
    if (!deletedStyle){
      return res.recordNotFound();
    }
    return res.success({ data :deletedStyle });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Style in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyStyle = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedStyle = await dbService.deleteMany(Style,query);
    if (!deletedStyle){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedStyle } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Style from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Style.
 * @return {Object} : number of deactivated documents of Style. {status, message, data}
 */
const softDeleteManyStyle = async (req,res) => {
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
    let updatedStyle = await dbService.updateMany(Style,query, updateBody);
    if (!updatedStyle) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedStyle } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addStyle,
  bulkInsertStyle,
  findAllStyle,
  getStyle,
  getStyleCount,
  updateStyle,
  bulkUpdateStyle,
  partialUpdateStyle,
  softDeleteStyle,
  deleteStyle,
  deleteManyStyle,
  softDeleteManyStyle    
};