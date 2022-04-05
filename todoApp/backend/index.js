const express = require('express');
const mongoose = require('mongoose');
const jwt = require('express-jwt');
const morgan = require('morgan');
const router = require('./router/router');
const bodyParser = require('body-parser');
const logger = require('tracer').console();
const config = require('./config');
const authRouter = require('./auth/authRouter');
const port = config.get('PORT');
const mongoUri = config.get('MONGO_URI');
const secretJwt = config.get('JWT_SECRET');
const cors = require('cors');
const path = require('path');

const start = async () => {
    try {
        console.log('connecting to db');
        await mongoose.connect(`${mongoUri}`);
        console.log('connected to db');
        const app = express();
        app.use(morgan('combined'));
        app.use(bodyParser.json());
        app.use(cors({
            origin: '*'
        }));
        app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
        app.use('/login', authRouter);
        app.use('/api/todo', jwt({ secret: secretJwt, algorithms: ['HS256'] }), router);
        app.listen(port, logger.log(`started on port: ${port}`));
        logger.log('success');
    } catch (error) {
        logger.log(error);
        throw error;
    }
};

start().then(() => logger.log('started'));
