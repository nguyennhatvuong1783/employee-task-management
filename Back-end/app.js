require('dotenv').config()
const express = require('express')
const cors = require('cors');
const app = express()
const port = 8000
const authRoute = require('./modules/auth/auth.route')
const employeeRoute = require('./modules/employee/employee.route')

app.use(cors());
app.use(express.json())
app.use('/', authRoute)
app.use('/', employeeRoute)

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`)
})
