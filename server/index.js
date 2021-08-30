require('dotenv').config()
const config = require('config');
const logger = require('./config/logger');
const app = require('./server')


// const port = 'https://utazas.herokuapp.com';
// const port = process.env.PORT || 3000
const port = `${config.get('port')}`  || 3000
// const cors = require('cors')

if (!config.has('database')) {
  logger.error("No database config found.");
  process.exit();
}
const {dbType, username, password, host} = config.get('database');

const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
// const connectionString = `mongodb://localhost:27017/tour-agency`
// const connectionString = `mongodb://mongo:27017/tour-agency`

// const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`
const connectionString = `${dbType}${username}:${password}@${host}`
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  logger.info('mongodb connection successful')
}).catch(err => {
  logger.error(err)
  process.exit()
})



app.listen(port, () => console.log(`server connected to http://127.0.0.1:3000`));
