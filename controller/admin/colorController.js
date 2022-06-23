/**
 * colorController.js
 * @description : exports action methods for color.
 */

const Color = require('../../model/color');
const colorSchemaKey = require('../../utils/validation/colorValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Color in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Color. {status, message, data}
 */ 
const addColor = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      colorSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Color(dataToCreate);
    let createdColor = await dbService.create(Color,dataToCreate);
    return res.success({ data : createdColor });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Color in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Colors. {status, message, data}
 */
const bulkInsertColor = async (req,res)=>{
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
    let createdColors = await dbService.create(Color,dataToCreate);
    createdColors = { count: createdColors ? createdColors.length : 0 };
    return res.success({ data:{ count:createdColors.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Color from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Color(s). {status, message, data}
 */
const findAllColor = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      colorSchemaKey.findFilterKeys,
      Color.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Color, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundColors = await dbService.paginate( Color,query,options);
    if (!foundColors || !foundColors.data || !foundColors.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundColors });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Color from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Color. {status, message, data}
 */
const getColor = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundColor = await dbService.findOne(Color,query, options);
    if (!foundColor){
      return res.recordNotFound();
    }
    return res.success({ data :foundColor });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Color.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getColorCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      colorSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedColor = await dbService.count(Color,where);
    return res.success({ data : { count: countedColor } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Color with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Color.
 * @return {Object} : updated Color. {status, message, data}
 */
const updateColor = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      colorSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedColor = await dbService.updateOne(Color,query,dataToUpdate);
    if (!updatedColor){
      return res.recordNotFound();
    }
    return res.success({ data :updatedColor });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Color with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Colors.
 * @return {Object} : updated Colors. {status, message, data}
 */
const bulkUpdateColor = async (req,res)=>{
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
    let updatedColor = await dbService.updateMany(Color,filter,dataToUpdate);
    if (!updatedColor){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedColor } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Color with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Color.
 * @return {obj} : updated Color. {status, message, data}
 */
const partialUpdateColor = async (req,res) => {
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
      colorSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedColor = await dbService.updateOne(Color, query, dataToUpdate);
    if (!updatedColor) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedColor });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Color from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Color.
 * @return {Object} : deactivated Color. {status, message, data}
 */
const softDeleteColor = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedColor = await dbService.updateOne(Color, query, updateBody);
    if (!updatedColor){
      return res.recordNotFound();
    }
    return res.success({ data:updatedColor });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Color from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Color. {status, message, data}
 */
const deleteColor = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedColor = await dbService.deleteOne(Color, query);
    if (!deletedColor){
      return res.recordNotFound();
    }
    return res.success({ data :deletedColor });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Color in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyColor = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedColor = await dbService.deleteMany(Color,query);
    if (!deletedColor){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedColor } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Color from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Color.
 * @return {Object} : number of deactivated documents of Color. {status, message, data}
 */
const softDeleteManyColor = async (req,res) => {
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
    let updatedColor = await dbService.updateMany(Color,query, updateBody);
    if (!updatedColor) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedColor } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addColor,
  bulkInsertColor,
  findAllColor,
  getColor,
  getColorCount,
  updateColor,
  bulkUpdateColor,
  partialUpdateColor,
  softDeleteColor,
  deleteColor,
  deleteManyColor,
  softDeleteManyColor    
};