/**
 * certificateAuthorityController.js
 * @description : exports action methods for certificateAuthority.
 */

const CertificateAuthority = require('../../../model/certificateAuthority');
const certificateAuthoritySchemaKey = require('../../../utils/validation/certificateAuthorityValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of CertificateAuthority in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created CertificateAuthority. {status, message, data}
 */ 
const addCertificateAuthority = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      certificateAuthoritySchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new CertificateAuthority(dataToCreate);
    let createdCertificateAuthority = await dbService.create(CertificateAuthority,dataToCreate);
    return res.success({ data : createdCertificateAuthority });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of CertificateAuthority in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created CertificateAuthoritys. {status, message, data}
 */
const bulkInsertCertificateAuthority = async (req,res)=>{
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
    let createdCertificateAuthoritys = await dbService.create(CertificateAuthority,dataToCreate);
    createdCertificateAuthoritys = { count: createdCertificateAuthoritys ? createdCertificateAuthoritys.length : 0 };
    return res.success({ data:{ count:createdCertificateAuthoritys.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of CertificateAuthority from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found CertificateAuthority(s). {status, message, data}
 */
const findAllCertificateAuthority = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      certificateAuthoritySchemaKey.findFilterKeys,
      CertificateAuthority.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(CertificateAuthority, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundCertificateAuthoritys = await dbService.paginate( CertificateAuthority,query,options);
    if (!foundCertificateAuthoritys || !foundCertificateAuthoritys.data || !foundCertificateAuthoritys.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundCertificateAuthoritys });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of CertificateAuthority from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found CertificateAuthority. {status, message, data}
 */
const getCertificateAuthority = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundCertificateAuthority = await dbService.findOne(CertificateAuthority,query, options);
    if (!foundCertificateAuthority){
      return res.recordNotFound();
    }
    return res.success({ data :foundCertificateAuthority });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of CertificateAuthority.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getCertificateAuthorityCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      certificateAuthoritySchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedCertificateAuthority = await dbService.count(CertificateAuthority,where);
    return res.success({ data : { count: countedCertificateAuthority } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of CertificateAuthority with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated CertificateAuthority.
 * @return {Object} : updated CertificateAuthority. {status, message, data}
 */
const updateCertificateAuthority = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      certificateAuthoritySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedCertificateAuthority = await dbService.updateOne(CertificateAuthority,query,dataToUpdate);
    if (!updatedCertificateAuthority){
      return res.recordNotFound();
    }
    return res.success({ data :updatedCertificateAuthority });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of CertificateAuthority with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated CertificateAuthoritys.
 * @return {Object} : updated CertificateAuthoritys. {status, message, data}
 */
const bulkUpdateCertificateAuthority = async (req,res)=>{
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
    let updatedCertificateAuthority = await dbService.updateMany(CertificateAuthority,filter,dataToUpdate);
    if (!updatedCertificateAuthority){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedCertificateAuthority } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of CertificateAuthority with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated CertificateAuthority.
 * @return {obj} : updated CertificateAuthority. {status, message, data}
 */
const partialUpdateCertificateAuthority = async (req,res) => {
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
      certificateAuthoritySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedCertificateAuthority = await dbService.updateOne(CertificateAuthority, query, dataToUpdate);
    if (!updatedCertificateAuthority) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedCertificateAuthority });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of CertificateAuthority from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of CertificateAuthority.
 * @return {Object} : deactivated CertificateAuthority. {status, message, data}
 */
const softDeleteCertificateAuthority = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedCertificateAuthority = await dbService.updateOne(CertificateAuthority, query, updateBody);
    if (!updatedCertificateAuthority){
      return res.recordNotFound();
    }
    return res.success({ data:updatedCertificateAuthority });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of CertificateAuthority from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted CertificateAuthority. {status, message, data}
 */
const deleteCertificateAuthority = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedCertificateAuthority = await dbService.deleteOne(CertificateAuthority, query);
    if (!deletedCertificateAuthority){
      return res.recordNotFound();
    }
    return res.success({ data :deletedCertificateAuthority });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of CertificateAuthority in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyCertificateAuthority = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedCertificateAuthority = await dbService.deleteMany(CertificateAuthority,query);
    if (!deletedCertificateAuthority){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedCertificateAuthority } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of CertificateAuthority from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of CertificateAuthority.
 * @return {Object} : number of deactivated documents of CertificateAuthority. {status, message, data}
 */
const softDeleteManyCertificateAuthority = async (req,res) => {
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
    let updatedCertificateAuthority = await dbService.updateMany(CertificateAuthority,query, updateBody);
    if (!updatedCertificateAuthority) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedCertificateAuthority } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addCertificateAuthority,
  bulkInsertCertificateAuthority,
  findAllCertificateAuthority,
  getCertificateAuthority,
  getCertificateAuthorityCount,
  updateCertificateAuthority,
  bulkUpdateCertificateAuthority,
  partialUpdateCertificateAuthority,
  softDeleteCertificateAuthority,
  deleteCertificateAuthority,
  deleteManyCertificateAuthority,
  softDeleteManyCertificateAuthority    
};