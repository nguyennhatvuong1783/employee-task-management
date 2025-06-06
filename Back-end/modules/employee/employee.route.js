const express = require('express')
const router = express.Router()
const employeeController = require('./employee.controller')
const prefix = '/employee'

router.get(prefix, employeeController.getAllEmployees)
router.get(`${prefix}/:employeeId`, employeeController.getEmployee)
router.post(prefix, employeeController.createEmployee)
router.delete(`${prefix}/:employeeId`, employeeController.deleteEmployee)

module.exports = router
