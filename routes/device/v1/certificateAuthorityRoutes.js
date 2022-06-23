/**
 * certificateAuthorityRoutes.js
 * @description :: CRUD API routes for certificateAuthority
 */

const express = require('express');
const router = express.Router();
const certificateAuthorityController = require('../../../controller/device/v1/certificateAuthorityController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/certificateauthority/create').post(auth(PLATFORM.DEVICE),checkRolePermission,certificateAuthorityController.addCertificateAuthority);
router.route('/device/api/v1/certificateauthority/list').post(auth(PLATFORM.DEVICE),checkRolePermission,certificateAuthorityController.findAllCertificateAuthority);
router.route('/device/api/v1/certificateauthority/count').post(auth(PLATFORM.DEVICE),checkRolePermission,certificateAuthorityController.getCertificateAuthorityCount);
router.route('/device/api/v1/certificateauthority/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,certificateAuthorityController.softDeleteManyCertificateAuthority);
router.route('/device/api/v1/certificateauthority/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,certificateAuthorityController.bulkInsertCertificateAuthority);
router.route('/device/api/v1/certificateauthority/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,certificateAuthorityController.bulkUpdateCertificateAuthority);
router.route('/device/api/v1/certificateauthority/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,certificateAuthorityController.deleteManyCertificateAuthority);
router.route('/device/api/v1/certificateauthority/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,certificateAuthorityController.softDeleteCertificateAuthority);
router.route('/device/api/v1/certificateauthority/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,certificateAuthorityController.partialUpdateCertificateAuthority);
router.route('/device/api/v1/certificateauthority/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,certificateAuthorityController.updateCertificateAuthority);    
router.route('/device/api/v1/certificateauthority/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,certificateAuthorityController.getCertificateAuthority);
router.route('/device/api/v1/certificateauthority/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,certificateAuthorityController.deleteCertificateAuthority);

module.exports = router;
