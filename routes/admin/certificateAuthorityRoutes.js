/**
 * certificateAuthorityRoutes.js
 * @description :: CRUD API routes for certificateAuthority
 */

const express = require('express');
const router = express.Router();
const certificateAuthorityController = require('../../controller/admin/certificateAuthorityController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/certificateauthority/create').post(auth(PLATFORM.ADMIN),checkRolePermission,certificateAuthorityController.addCertificateAuthority);
router.route('/admin/certificateauthority/list').post(auth(PLATFORM.ADMIN),checkRolePermission,certificateAuthorityController.findAllCertificateAuthority);
router.route('/admin/certificateauthority/count').post(auth(PLATFORM.ADMIN),checkRolePermission,certificateAuthorityController.getCertificateAuthorityCount);
router.route('/admin/certificateauthority/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,certificateAuthorityController.softDeleteManyCertificateAuthority);
router.route('/admin/certificateauthority/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,certificateAuthorityController.bulkInsertCertificateAuthority);
router.route('/admin/certificateauthority/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,certificateAuthorityController.bulkUpdateCertificateAuthority);
router.route('/admin/certificateauthority/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,certificateAuthorityController.deleteManyCertificateAuthority);
router.route('/admin/certificateauthority/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,certificateAuthorityController.softDeleteCertificateAuthority);
router.route('/admin/certificateauthority/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,certificateAuthorityController.partialUpdateCertificateAuthority);
router.route('/admin/certificateauthority/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,certificateAuthorityController.updateCertificateAuthority);    
router.route('/admin/certificateauthority/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,certificateAuthorityController.getCertificateAuthority);
router.route('/admin/certificateauthority/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,certificateAuthorityController.deleteCertificateAuthority);

module.exports = router;
