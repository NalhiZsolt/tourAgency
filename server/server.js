const express = require('express');
const app = express();
const logger = require('./config/logger');
const cors = require('cors')
const morgan = require('morgan');

const authenticate = require('./auth/authenticate').dataQuery
const authenticationByJWT = require('./auth/authenticate').auth
const authHandler = require('./auth/authHandler');
const adminCheck = require('./auth/adminOnly')

const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const openapiDocument = YAML.load('./doc/openapi.yaml')

app.use(morgan('combined', { stream: logger.stream }))

app.use(express.json());

// app.use(cors({origin: 'https://utazasi-iroda.web.app'})) 
// app.use(cors({origin: 'http://localhost:4200'}))
app.use(cors())

app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/login', authHandler.login)
app.post('/refresh', authHandler.refresh)
app.post('/logout', authHandler.logout)
app.use('/auth', authenticate)

app.use('/tours', require('./controller/tours/tours.routes'))
app.use('/guides', require('./controller/guides/guides.routes')) //authenticationByJWT, adminCheck,
app.use('/travellers', require('./controller/travellers/travellers.routes'))
app.use('/descriptions', require('./controller/descriptions/descriptions.routes'))
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(openapiDocument))

app.use((err, req, res, next) => {
  console.error(`ERROR ${err.statusCode}: ${err.message}`);
  res.status(err.statusCode);
  res.json({
      hasError: true,
      message: err.message
  })
})
module.exports = app
