const express = require("express");
const router = express.Router();

const { postRegister, postLogin } = require("../controllers/auth");

router.post('/register', postRegister);
router.post("/login", postLogin);


module.exports = router;