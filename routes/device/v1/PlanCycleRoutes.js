/**
 * PlanCycleRoutes.js
 * @description :: CRUD API routes for PlanCycle
 */

const express = require('express');
const router = express.Router();
const PlanCycleController = require('../../../controller/device/v1/PlanCycleController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/plancycle/create').post(auth(PLATFORM.DEVICE),checkRolePermission,PlanCycleController.addPlanCycle);
router.route('/device/api/v1/plancycle/list').post(auth(PLATFORM.DEVICE),checkRolePermission,PlanCycleController.findAllPlanCycle);
router.route('/device/api/v1/plancycle/count').post(auth(PLATFORM.DEVICE),checkRolePermission,PlanCycleController.getPlanCycleCount);
router.route('/device/api/v1/plancycle/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,PlanCycleController.softDeleteManyPlanCycle);
router.route('/device/api/v1/plancycle/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,PlanCycleController.bulkInsertPlanCycle);
router.route('/device/api/v1/plancycle/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,PlanCycleController.bulkUpdatePlanCycle);
router.route('/device/api/v1/plancycle/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,PlanCycleController.deleteManyPlanCycle);
router.route('/device/api/v1/plancycle/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,PlanCycleController.softDeletePlanCycle);
router.route('/device/api/v1/plancycle/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,PlanCycleController.partialUpdatePlanCycle);
router.route('/device/api/v1/plancycle/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,PlanCycleController.updatePlanCycle);    
router.route('/device/api/v1/plancycle/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,PlanCycleController.getPlanCycle);
router.route('/device/api/v1/plancycle/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,PlanCycleController.deletePlanCycle);

module.exports = router;
