const express = require('express');
const Router = express.Router;
const wrapper = require('express-async-handler');
const { update, create, getAll, remove } = require('../requests/actions');

const router = new Router();

router.get('/', wrapper(getAll()));
router.put('/:id', wrapper(update()));
router.post('/', wrapper(create()));
router.delete('/:id', wrapper(remove()));

module.exports = router;
