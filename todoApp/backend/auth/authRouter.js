const express = require('express');
const Router = express.Router;
const logger = require('tracer').console();
const wrapper = require('express-async-handler');
const config = require('../config');
const jwt = require('jsonwebtoken');
const JWT_SECRET = config.get('JWT_SECRET');

const autRouter = new Router();

const login = () =>
    async (req, res) => {
        try {
            const userName = req.body.userName;
            logger.log(JWT_SECRET);
            const token = await jwt.sign({ userName }, JWT_SECRET, { algorithm: 'HS256' });
            res.json({ token: token });
        } catch (error) {
            logger.log(error);
            throw error;
        }
    };

autRouter.post('/', wrapper(login()));

module.exports = autRouter;
