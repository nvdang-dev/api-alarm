const express = require('express');
const helmet = require('helmet');
const { ErrorResponseObject } = require('./common/http');
const routes = require('./routes');
var cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(helmet());
app.use('/', routes);

// default catch all handler
app.all('*', (req, res) => res.status(404).json(new ErrorResponseObject('route not defined')));

module.exports = app;
// app.listen(3000, () => {
//     console.log(`Example app listening on port 3000`)
//   })
