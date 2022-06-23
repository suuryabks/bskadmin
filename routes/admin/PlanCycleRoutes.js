/**
 * PlanCycleRoutes.js
 * @description :: CRUD API routes for PlanCycle
 */

const express = require('express');
const router = express.Router();
const PlanCycleController = require('../../controller/admin/PlanCycleController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/plancycle/create').post(auth(PLATFORM.ADMIN),checkRolePermission,PlanCycleController.addPlanCycle);
router.route('/admin/plancycle/list').post(auth(PLATFORM.ADMIN),checkRolePermission,PlanCycleController.findAllPlanCycle);
router.route('/admin/plancycle/count').post(auth(PLATFORM.ADMIN),checkRolePermission,PlanCycleController.getPlanCycleCount);
router.route('/admin/plancycle/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,PlanCycleController.softDeleteManyPlanCycle);
router.route('/admin/plancycle/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,PlanCycleController.bulkInsertPlanCycle);
router.route('/admin/plancycle/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,PlanCycleController.bulkUpdatePlanCycle);
router.route('/admin/plancycle/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,PlanCycleController.deleteManyPlanCycle);
router.route('/admin/plancycle/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,PlanCycleController.softDeletePlanCycle);
router.route('/admin/plancycle/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,PlanCycleController.partialUpdatePlanCycle);
router.route('/admin/plancycle/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,PlanCycleController.updatePlanCycle);    
router.route('/admin/plancycle/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,PlanCycleController.getPlanCycle);
router.route('/admin/plancycle/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,PlanCycleController.deletePlanCycle);

module.exports = router;
