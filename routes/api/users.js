const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

var secret;
if (process.env.NODE_ENV === "production") {
	secret = process.env.secretJWT;
} else {
	secret = require("../../config/keys").secretJWT;
}

// Song Model
const User = require("../../models/User");

/**
 * @api {post} users/ Зарегистрировать пользователя
 * @apiName RegisterUser
 * @apiGroup Пользователь
 * @apiPermission Для всех
 *
 * @apiParam (Тело запроса) {String} name Имя пользователя.
 * @apiParam (Тело запроса) {String} email E-Mail пользователя.
 * @apiParam (Тело запроса) {String} password Пароль пользователя.
 * @apiParam (Тело запроса) {String} [bandcampLink] Ссылка на Bandcamp-страницу пользователя.
 * @apiParam (Тело запроса) {String} [spotifyLink] Ссылка на Spotify-страницу пользователя.
 * @apiParam (Тело запроса) {String} [facebookLink] Ссылка на Facebook-страницу пользователя.
 * @apiParam (Тело запроса) {String} [twitterLink] Сссылка на Twitter-страницу пользователя.
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
 * 			"_id": "507f1f77bcf86cd799439011",
 * 			"name": "John Doe",
 * 			"avatar": "",
 * 			"email": "johndoe@gmail.com",
 * 			"points": "0",
 * 			"bandcampLink": "https://johndoe.bandcamp.com/",
 * 			"spotifyLink": "https://open.spotify.com/artist/6x8L59xNfuXIM7UfzoSe7g?si=IF09HKfsSk-oG9M9W7we6w",
 * 			"facebookLink": "https://www.facebook.com/johndoe/",
 * 			"twitterLink": "https://www.twitter.com/johndoe/"
 * 		}
 * 	}
 *
 * @apiError UserAlreadyExists Пользователь с таким e-mail уже зарегистрирован.
 *
 * @apiErrorExample UserAlreadyExists
 * 	HTTP/1.1 400 Bad Request
 * 	{
 * 		"msg": "User already exists"
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
 * @apiDescription Регистрирует пользователя с учетными данными, указанными в теле запроса.
 */
router.post("/", (req, res) => {
	const {
		name,
		email,
		password,
		bandcampLink,
		spotifyLink,
		facebookLink,
		twitterLink,
	} = req.body;

	// Simple validation
	if (!name || !email || !password) {
		return res.status(400).json({ msg: "Please enter all fields" });
	}
	const avatar = "";
	// Check for existing user
	User.findOne({ email }).then((user) => {
		if (user) return res.status(400).json({ msg: "User already exists" });

		const newUser = new User({
			name,
			avatar,
			email,
			password,
			bandcampLink,
			spotifyLink,
			facebookLink,
			twitterLink,
		});

		// Create salt & hash
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser.save().then((user) => {
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
	});
});

/**
 * @api {get} users/:id Получить данные пользователя по ID
 * @apiName GetUserByID
 * @apiGroup Пользователь
 *
 * @apiUse RequiresAuth
 * @apiPermission Только авторизованные пользователи
 *
 * @apiParam (Параметры запроса) {String} id ID пользователя, данные которого требуется получить.
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
router.get("/:id", auth, (req, res) => {
	User.findById(req.params.id).then((user) => res.json(user));
});

/**
 * @api {post} users/update Обновить данные пользователя
 * @apiName UpdateUser
 * @apiGroup Пользователь
 *
 * @apiUse RequiresAuth
 * @apiPermission Только авторизованные пользователи
 *
 * @apiParam (Тело запроса) {Object} updatedUser Объект, содержащий обновленные данные пользователя.
 * @apiParam (Тело запроса) {String} [updatedUser.name] Имя пользователя.
 * @apiParam (Тело запроса) {String} [updatedUser.email] E-Mail пользователя.
 * @apiParam (Тело запроса) {String} [updatedUser.password] Пароль пользователя.
 * @apiParam (Тело запроса) {String} [updatedUser.avatar] Ссылка на аватар пользователя.
 * @apiParam (Тело запроса) {String} [updatedUser.bandcampLink] Ссылка на Bandcamp-страницу пользователя.
 * @apiParam (Тело запроса) {String} [updatedUser.spotifyLink] Ссылка на Spotify-страницу пользователя.
 * @apiParam (Тело запроса) {String} [updatedUser.facebookLink] Ссылка на Facebook-страницу пользователя.
 * @apiParam (Тело запроса) {String} [updatedUser.twitterLink] Сссылка на Twitter-страницу пользователя.
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
 * @apiError UserDoesNotExist Пользователя не существует.
 *
 * @apiErrorExample UserDoesNotExist
 * 	HTTP/1.1 400 Bad Request
 * 	{
 * 		"msg": "User does not exist."
 * 	}
 *
 * @apiDescription Обновляет данные пользователя в соответствии с данными, указанными в запросе.
 */
router.post("/update/", auth, (req, res) => {
	// if user doesn't exist
	User.exists({ _id: req.user.id }).then((exists) => {
		if (!exists) {
			return res.status(400).json({ msg: "User does not exist." });
		}
	});

	User.findByIdAndUpdate(req.user.id, req.body.updatedUser, { new: true })
		.select("-password")
		.then((updUser) => res.json(updUser));
});

module.exports = router;
