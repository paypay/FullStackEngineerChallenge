const Router = require("restify-router").Router;
const router = new Router();
const validateToken = require("../../helpers/validateToken");
const AuthController = require("./authController");

router.post("signin", AuthController.signin);

router.get("refresh_token", validateToken, AuthController.refreshtoken);

module.exports = router;
