/**
 * varietyController.js
 * @description : exports action methods for variety.
 */

const Variety = require('../../model/variety');
const varietySchemaKey = require('../../utils/validation/varietyValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Variety in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Variety. {status, message, data}
 */ 
const addVariety = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      varietySchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Variety(dataToCreate);
    let createdVariety = await dbService.create(Variety,dataToCreate);
    return res.success({ data : createdVariety });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Variety in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Varietys. {status, message, data}
 */
const bulkInsertVariety = async (req,res)=>{
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
    let createdVarietys = await dbService.create(Variety,dataToCreate);
    createdVarietys = { count: createdVarietys ? createdVarietys.length : 0 };
    return res.success({ data:{ count:createdVarietys.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Variety from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Variety(s). {status, message, data}
 */
const findAllVariety = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      varietySchemaKey.findFilterKeys,
      Variety.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Variety, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundVarietys = await dbService.paginate( Variety,query,options);
    if (!foundVarietys || !foundVarietys.data || !foundVarietys.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundVarietys });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Variety from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Variety. {status, message, data}
 */
const getVariety = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundVariety = await dbService.findOne(Variety,query, options);
    if (!foundVariety){
      return res.recordNotFound();
    }
    return res.success({ data :foundVariety });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Variety.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getVarietyCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      varietySchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedVariety = await dbService.count(Variety,where);
    return res.success({ data : { count: countedVariety } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Variety with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Variety.
 * @return {Object} : updated Variety. {status, message, data}
 */
const updateVariety = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      varietySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedVariety = await dbService.updateOne(Variety,query,dataToUpdate);
    if (!updatedVariety){
      return res.recordNotFound();
    }
    return res.success({ data :updatedVariety });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Variety with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Varietys.
 * @return {Object} : updated Varietys. {status, message, data}
 */
const bulkUpdateVariety = async (req,res)=>{
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
    let updatedVariety = await dbService.updateMany(Variety,filter,dataToUpdate);
    if (!updatedVariety){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedVariety } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Variety with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Variety.
 * @return {obj} : updated Variety. {status, message, data}
 */
const partialUpdateVariety = async (req,res) => {
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
      varietySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedVariety = await dbService.updateOne(Variety, query, dataToUpdate);
    if (!updatedVariety) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedVariety });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Variety from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Variety.
 * @return {Object} : deactivated Variety. {status, message, data}
 */
const softDeleteVariety = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedVariety = await deleteDependentService.softDeleteVariety(query, updateBody);
    if (!updatedVariety){
      return res.recordNotFound();
    }
    return res.success({ data:updatedVariety });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Variety from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Variety. {status, message, data}
 */
const deleteVariety = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedVariety;
    if (req.body.isWarning) { 
      deletedVariety = await deleteDependentService.countVariety(query);
    } else {
      deletedVariety = await deleteDependentService.deleteVariety(query);
    }
    if (!deletedVariety){
      return res.recordNotFound();
    }
    return res.success({ data :deletedVariety });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Variety in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyVariety = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedVariety;
    if (req.body.isWarning) {
      deletedVariety = await deleteDependentService.countVariety(query);
    }
    else {
      deletedVariety = await deleteDependentService.deleteVariety(query);
    }
    if (!deletedVariety){
      return res.recordNotFound();
    }
    return res.success({ data :deletedVariety });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Variety from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Variety.
 * @return {Object} : number of deactivated documents of Variety. {status, message, data}
 */
const softDeleteManyVariety = async (req,res) => {
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
    let updatedVariety = await deleteDependentService.softDeleteVariety(query, updateBody);
    if (!updatedVariety) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedVariety });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addVariety,
  bulkInsertVariety,
  findAllVariety,
  getVariety,
  getVarietyCount,
  updateVariety,
  bulkUpdateVariety,
  partialUpdateVariety,
  softDeleteVariety,
  deleteVariety,
  deleteManyVariety,
  softDeleteManyVariety    
};