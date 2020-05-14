const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// Song Model
const User = require("../../models/User");

var secret;
if (process.env.NODE_ENV === "production") {
	secret = process.env.secretJWT;
} else {
	secret = require("../../config/keys").secretJWT;
}

/**
 * @apiDefine RequiresAuth
 *
 * @apiHeader (Заголовок запроса) {String} x-token-auth Токен авторизации пользователя.
 *
 * @apiError (Ошибки авторизации) NoToken Пользователь не авторизован.
 *
 * @apiErrorExample NoToken
 * 	HTTP/1.1 401 Unauthorized
 * 	{
 * 		"msg": "No token"
 * 	}
 *
 * @apiError (Ошибки авторизации) TokenNotValid Передан неверный/истекший токен.
 *
 * @apiErrorExample TokenNotValid
 * 	HTTP/1.1 400 Bad Request
 * 	{
 * 		"msg": "token is not valid"
 * 	}
 */

/**
 * @api {post} auth/ Авторизовать пользователя
 * @apiName AuthUser
 * @apiGroup Пользователь
 * @apiPermission Для всех
 *
 * @apiParam (Тело запроса) {String} email E-Mail пользователя.
 * @apiParam (Тело запроса) {String} password Пароль пользователя.
 *
 * @apiSuccess (Тело ответа) {String} token Токен авторизации.
 * @apiSuccess (Тело ответа) {Object} user Данные о пользователе.
 * @apiSuccess (Тело ответа) {String} user._id ID пользователя.
 * @apiSuccess (Тело ответа) {String} user.name Имя пользователя.
 * @apiSuccess (Тело ответа) {String} user.avatar Ссылка на аватар пользователя.
 * @apiSuccess (Тело ответа) {String} user.email E-Mail адрес пользователя.
 * @apiSuccess (Тело ответа) {Number} user.points Баланс пользователя.
 * @apiSuccess (Тело ответа) {String} user.bandcampLink Ссылка на Bandcamp-страницу пользователя.
 * @apiSuccess (Тело ответа) {String} user.spotifyLink Ссылка на Spotify-страницу пользователя.
 * @apiSuccess (Тело ответа) {String} user.facebookLink Ссылка на Facebook-страницу пользователя.
 * @apiSuccess (Тело ответа) {String} user.twitterLink Сссылка на Twitter-страницу пользователя.
 *
 * @apiSuccessExample 200 OK:
 * 	HTTP/1.1 200 OK
 * 	{
 * 		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
 * 		"user":
 * 		{
 *			"_id": "507f1f77bcf86cd799439011",
 * 			"name": "John Doe",
 * 			"avatar": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg",
 * 			"email": "johndoe@gmail.com",
 * 			"points": "0",
 * 			"bandcampLink": "https://johndoe.bandcamp.com/",
 * 			"spotifyLink": "https://open.spotify.com/artist/6x8L59xNfuXIM7UfzoSe7g?si=IF09HKfsSk-oG9M9W7we6w",
 * 			"facebookLink": "https://www.facebook.com/johndoe/",
 * 			"twitterLink": "https://www.twitter.com/johndoe/"
 * 		}
 * 	}
 *
 * @apiError UserNotFound Пользователь не найден.
 *
 * @apiErrorExample UserNotFound
 * 	HTTP/1.1 400 Bad Request
 * 	{
 * 		"msg": "User does not exist"
 * 	}
 *
 * @apiError InvalidCredentials E-mail и/или пароль неверны.
 *
 * @apiErrorExample InvalidCredentials
 * 	HTTP/1.1 400 Bad Request
 * 	{
 * 		"msg": "Invalid credentials"
 * 	}
 *
 * @apiError EnterAllFields Заполнены не все поля.
 *
 * @apiErrorExample EnterAllFields
 * 	HTTP/1.1 400 Bad Request
 * 	{
 * 		"msg": "Please enter all fields"
 * 	}
 *
 * @apiDescription Авторизует пользователя с учетными данными, указанными в теле запроса.
 */
router.post("/", (req, res) => {
	const { email, password } = req.body;

	// Simple validation
	if (!email || !password) {
		return res.status(400).json({ msg: "Please enter all fields" });
	}

	// Check for existing user
	User.findOne({ email }).then((user) => {
		if (!user) return res.status(400).json({ msg: "User does not exist" });

		// Validate password
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (!isMatch)
				return res.status(400).json({ msg: "Invalid credentials" });

			jwt.sign(
				{ id: user.id },
				secret,
				{ expiresIn: 3600 },
				(err, token) => {
					if (err) throw err;
					res.json({
						token,
						user,
					});
				}
			);
		});
	});
});

/**
 * @api {get} auth/user/ Получить данные пользователя
 * @apiName GetUser
 * @apiGroup Пользователь
 *
 * @apiUse RequiresAuth
 * @apiPermission Только авторизованные пользователи
 *
 * @apiSuccess (Тело ответа) {String} _id ID пользователя.
 * @apiSuccess (Тело ответа) {String} name Имя пользователя.
 * @apiSuccess (Тело ответа) {String} avatar Ссылка на аватар пользователя.
 * @apiSuccess (Тело ответа) {String} email E-Mail адрес пользователя.
 * @apiSuccess (Тело ответа) {Number} points Баланс пользователя.
 * @apiSuccess (Тело ответа) {String} bandcampLink Ссылка на Bandcamp-страницу пользователя.
 * @apiSuccess (Тело ответа) {String} spotifyLink Ссылка на Spotify-страницу пользователя.
 * @apiSuccess (Тело ответа) {String} facebookLink Ссылка на Facebook-страницу пользователя.
 * @apiSuccess (Тело ответа) {String} twitterLink Сссылка на Twitter-страницу пользователя.
 *
 * @apiSuccessExample 200 OK:
 * 	HTTP/1.1 200 OK
 * 	{
 * 		"_id": "507f1f77bcf86cd799439011",
 * 		"name": "John Doe",
 * 		"avatar": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg",
 * 		"email": "johndoe@gmail.com",
 * 		"points": "0",
 * 		"bandcampLink": "https://johndoe.bandcamp.com/",
 * 		"spotifyLink": "https://open.spotify.com/artist/6x8L59xNfuXIM7UfzoSe7g?si=IF09HKfsSk-oG9M9W7we6w",
 * 		"facebookLink": "https://www.facebook.com/johndoe/",
 * 		"twitterLink": "https://www.twitter.com/johndoe/"
 * 	}
 *
 * @apiDescription Получает данные авторизованного пользователя.
 */
router.get("/user", auth, (req, res) => {
	User.findById(req.user.id)
		.select("-password")
		.then((user) => {
			//console.log(user);
			res.json(user);
		});
});

module.exports = router;
