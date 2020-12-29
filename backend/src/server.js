const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const operationsRoutes = require('./routes/operations_routes');
const sessionRoutes = require('./routes/session_routes');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const auth = require('./auth');
const fileUpload = require('express-fileupload');
const registerRoutes = require('./routes/register_routes');
const categoriesRoutes = require('./routes/categories_routes');
const typeRoutes = require('./routes/type_routes');
const balanceRoutes = require('./routes/balance_routes');

const app = express();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type']
}))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(fileUpload());

app.use(session({
    store: new FileStore,
    secret: '123456',
    resave: false,
    saveUninitialized: true,
    name: 'mr.admin'
}))

app.use('/auth', sessionRoutes);
app.use('/operations', operationsRoutes);
app.use('/register', registerRoutes);
app.use('/categories', categoriesRoutes);
app.use('/type', typeRoutes);
app.use('/balance', balanceRoutes);

app.listen(8888, ()=>{console.log('escuchando...')})