const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Models
const Review = require("../../models/Review");
const User = require("../../models/User");
const Song = require("../../models/Song");

/**
 * @api {get} reviews/id/:id Получить рецензию по ID
 * @apiName GetReviewByID
 * @apiGroup Рецензия
 *
 * @apiUse RequiresAuth
 *
 * @apiParam (Параметры запроса) {String} id ID рецензии, данные которой требуется получить.
 *
 * @apiSuccess (Тело ответа) {String} _id ID рецензии
 * @apiSuccess (Тело ответа) {Object} song Песня, на которую написана рецензия
 * @apiSuccess (Тело ответа) {String} song._id ID песни
 * @apiSuccess (Тело ответа) {Object} song.user Данные о пользователе, загрузившем песню.
 * @apiSuccess (Тело ответа) {String} song.user._id ID пользователя.
 * @apiSuccess (Тело ответа) {String} song.user.name Имя пользователя.
 * @apiSuccess (Тело ответа) {String} song.user.avatar Ссылка на аватар пользователя.
 * @apiSuccess (Тело ответа) {String} song.user.email E-Mail адрес пользователя.
 * @apiSuccess (Тело ответа) {Number} song.user.points Баланс пользователя.
 * @apiSuccess (Тело ответа) {String} song.user.bandcampLink Ссылка на Bandcamp-страницу пользователя.
 * @apiSuccess (Тело ответа) {String} song.user.spotifyLink Ссылка на Spotify-страницу пользователя.
 * @apiSuccess (Тело ответа) {String} song.user.facebookLink Ссылка на Facebook-страницу пользователя.
 * @apiSuccess (Тело ответа) {String} song.user.twitterLink Сссылка на Twitter-страницу пользователя.
 * @apiSuccess (Тело ответа) {String} song.genre ID жанра
 * @apiSuccess (Тело ответа) {String} song.name Название песни
 * @apiSuccess (Тело ответа) {String} song.artistName Имя исполнителя
 * @apiSuccess (Тело ответа) {Number} song.reviewPoints Баланс песни
 * @apiSuccess (Тело ответа) {String} song.filename Ссылка на аудиофайл
 * @apiSuccess (Тело ответа) {String} song.artwork Ссылка на обложку
 * @apiSuccess (Тело ответа) {String} song.waveform Ссылка на waveform JSON
 * @apiSuccess (Тело ответа) {Date}   song.date Дата загрузки
 * @apiSuccess (Тело ответа) {String} user ID пользователя, оставившего рецензию
 * @apiSuccess (Тело ответа) {String} text Текст рецензии
 * @apiSuccess (Тело ответа) {Boolean} rating Оценка песни (True - понравилась, False - не понравилась)
 * @apiSuccess (Тело ответа) {Boolean} isRead Флаг, говорящий о том, просмотрена ли рецензия автором песни.
 * @apiSuccess (Тело ответа) {Date}   date Дата рецензии
 *
 * @apiSuccessExample 200 OK:
 * 	HTTP/1.1 200 OK
 * 	{
 * 		"_id": "507f1f77bcf86cd799439011",
 * 		"song":
 * 		{
 * 			"_id": "507f1f77bcf86cd799439011",
 * 			"user":
 * 			{
 * 				"_id": "507f1f77bcf86cd799439011",
 * 				"name": "John Doe",
 * 				"avatar": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg",
 * 				"email": "johndoe@gmail.com",
 * 				"points": "0",
 * 				"bandcampLink": "https://johndoe.bandcamp.com/",
 * 				"spotifyLink": "https://open.spotify.com/artist/6x8L59xNfuXIM7UfzoSe7g?si=IF09HKfsSk-oG9M9W7we6w",
 * 				"facebookLink": "https://www.facebook.com/johndoe/",
 * 				"twitterLink": "https://www.twitter.com/johndoe/"
 * 			},
 * 			"genre": "507f1f77bcf86cd799439011",
 * 			"name": "Mind Mischief",
 * 			"artistName": "Tame Impala",
 *			"reviewPoints": "5",
 *			"filename": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.mp3",
 *			"artwork": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg",
 * 			"waveform": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.json",
 * 			"date": "2012-04-23T18:25:43.511Z"
 * 		},
 * 		"user": "507f1f77bcf86cd799439011",
 * 		"text": "it's fine",
 * 		"rating": True,
 * 		"isRead": False,
 * 		"date": "2012-04-23T18:25:43.511Z"
 * 	}
 *
 * @apiDescription Получает рецензию по ID.
 */
router.get("/id/:id", auth, (req, res) => {
	Review.findById(req.params.id)
		.populate({
			path: "song",
			populate: {
				path: "user",
				model: "user",
			},
		})
		.then((review) => res.json(review));
});

/**
 * @api {get} reviews/is_reviewed/:id Получить статус прочтенности рецензии по ID
 * @apiName isReviewRead
 * @apiGroup Рецензия
 *
 * @apiUse RequiresAuth
 *
 * @apiParam (Параметры запроса) {String} id ID рецензии, статус которой требуется получить.
 *
 * @apiSuccess (Тело ответа) {Boolean} isRead Статус прочтенности рецензии
 *
 * @apiSuccessExample 200 OK:
 * HTTP/1.1 200 OK
 * {
 * 	"isRead": False
 * }
 *
 * @apiDescription Получает статус прочтенности рецензии по ID.
 */
router.get("/is_reviewed/:id", auth, (req, res) => {
	Review.exists({ user: req.user.id, song: req.params.id }, (err, result) => {
		if (err) {
			res.send(err);
		} else {
			res.send(result);
		}
	});
});

/**
 * @api {get} reviews/song/:id Получить список рецензии для песни
 * @apiName GetReviewListForSong
 * @apiGroup Рецензия
 *
 * @apiUse RequiresAuth
 *
 * @apiParam (Параметры запроса) {String} id ID песни, для которой требуется получить список рецензий
 *
 * @apiSuccess (Тело ответа) {Object[]} reviews Список рецензий для песни
 * @apiSuccess (Тело ответа) {String} reviews._id ID рецензии
 * @apiSuccess (Тело ответа) {String} reviews.song ID песни, на которую написана рецензия
 * @apiSuccess (Тело ответа) {Object} reviews.user Данные о пользователе, оставившем рецензию
 * @apiSuccess (Тело ответа) {String} reviews.user._id ID пользователя.
 * @apiSuccess (Тело ответа) {String} reviews.user.name Имя пользователя.
 * @apiSuccess (Тело ответа) {String} reviews.user.avatar Ссылка на аватар пользователя.
 * @apiSuccess (Тело ответа) {String} reviews.user.email E-Mail адрес пользователя.
 * @apiSuccess (Тело ответа) {Number} reviews.user.points Баланс пользователя.
 * @apiSuccess (Тело ответа) {String} reviews.user.bandcampLink Ссылка на Bandcamp-страницу пользователя.
 * @apiSuccess (Тело ответа) {String} reviews.user.spotifyLink Ссылка на Spotify-страницу пользователя.
 * @apiSuccess (Тело ответа) {String} reviews.user.facebookLink Ссылка на Facebook-страницу пользователя.
 * @apiSuccess (Тело ответа) {String} reviews.user.twitterLink Сссылка на Twitter-страницу пользователя.
 * @apiSuccess (Тело ответа) {String} reviews.text Текст рецензии
 * @apiSuccess (Тело ответа) {Boolean} reviews.rating Оценка песни (True - понравилась, False - не понравилась)
 * @apiSuccess (Тело ответа) {Boolean} reviews.isRead Флаг, говорящий о том, просмотрена ли рецензия автором песни.
 * @apiSuccess (Тело ответа) {Date}   reviews.date Дата рецензии
 *
 * @apiSuccessExample 200 OK:
 * 	HTTP/1.1 200 OK
 * 	{
 * 		[
 * 			{
 * 				"_id": "507f1f77bcf86cd799439011",
 * 				"song": "507f1f77bcf86cd799439011",
 * 				"user":
 * 				{
 * 					"_id": "507f1f77bcf86cd799439011",
 * 					"name": "John Doe",
 * 					"avatar": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg",
 * 					"email": "johndoe@gmail.com",
 * 					"points": "0",
 * 					"bandcampLink": "https://johndoe.bandcamp.com/",
 * 					"spotifyLink": "https://open.spotify.com/artist/6x8L59xNfuXIM7UfzoSe7g?si=IF09HKfsSk-oG9M9W7we6w",
 * 					"facebookLink": "https://www.facebook.com/johndoe/",
 * 					"twitterLink": "https://www.twitter.com/johndoe/"
 * 				},
 * 				"text": "it's fine",
 * 				"rating": True,
 * 				"isRead": False,
 * 				"date": "2012-04-23T18:25:43.511Z"
 * 			},
 * 			{
 * 				"_id": "507f1f77bcf86cd799439011",
 * 				"song": "507f1f77bcf86cd799439011",
 * 				"user":
 * 				{
 * 					"_id": "507f1f77bcf86cd799439011",
 * 					"name": "Jack Doe",
 * 					"avatar": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg",
 * 					"email": "jackdoe@gmail.com",
 * 					"points": "0",
 * 					"bandcampLink": "https://johndoe.bandcamp.com/",
 * 					"spotifyLink": "https://open.spotify.com/artist/6x8L59xNfuXIM7UfzoSe7g?si=IF09HKfsSk-oG9M9W7we6w",
 * 					"facebookLink": "https://www.facebook.com/johndoe/",
 * 					"twitterLink": "https://www.twitter.com/johndoe/"
 * 				},
 * 				"text": "it's bad",
 * 				"rating": False,
 * 				"isRead": True,
 * 				"date": "2012-04-23T18:25:43.511Z"
 * 			}
 * 		]
 * 	}
 *
 * @apiDescription Получает список рецензий для песни
 */
router.get("/song/:id", auth, (req, res) => {
	Review.find({ song: req.params.id })
		.populate("user")
		.then((reviews) => res.json(reviews));
});

/**
 * @api {get} reviews/unread/user Получить список непрочитанных рецензий для пользователя
 * @apiName GetUnreadReviewListForUser
 * @apiGroup Рецензия
 *
 * @apiUse RequiresAuth
 *
 * @apiSuccess (Тело ответа) {Object[]} reviews Список рецензий для песни
 * @apiSuccess (Тело ответа) {String} reviews._id ID рецензии
 * @apiSuccess (Тело ответа) {String} reviews.song ID песни, на которую написана рецензия
 * @apiSuccess (Тело ответа) {String} reviews.user ID пользователя, оставившего рецензию.
 * @apiSuccess (Тело ответа) {String} reviews.text Текст рецензии
 * @apiSuccess (Тело ответа) {Boolean} reviews.rating Оценка песни (True - понравилась, False - не понравилась)
 * @apiSuccess (Тело ответа) {Boolean} reviews.isRead Флаг, говорящий о том, просмотрена ли рецензия автором песни.
 * @apiSuccess (Тело ответа) {Date}   reviews.date Дата рецензии
 *
 * @apiSuccessExample 200 OK:
 * 	HTTP/1.1 200 OK
 * 	{
 * 		[
 * 			{
 * 				"_id": "507f1f77bcf86cd799439011",
 * 				"song": "507f1f77bcf86cd799439011",
 * 				"user": "507f1f77bcf86cd799439011",
 * 				"text": "it's fine",
 * 				"rating": True,
 * 				"isRead": False,
 * 				"date": "2012-04-23T18:25:43.511Z"
 * 			},
 * 			{
 * 				"_id": "507f1f77bcf86cd799439011",
 * 				"song": "507f1f77bcf86cd799439011",
 * 				"user": "507f1f77bcf86cd799439011",
 * 				"text": "it's bad",
 * 				"rating": False,
 * 				"isRead": False,
 * 				"date": "2012-04-23T18:25:43.511Z"
 * 			}
 * 		]
 * 	}
 *
 * @apiDescription Получает список непрочитанных рецензий для пользователя
 */
router.get("/unread/", auth, (req, res) => {
	Review.find({ user: req.user.id, isRead: false }).then((reviews) =>
		res.json(reviews)
	);
});

/**
 * @api {get} reviews/history Получить историю рецензий для пользователя
 * @apiName GetReviewListHistory
 * @apiGroup Рецензия
 *
 * @apiUse RequiresAuth
 *
 * @apiSuccess (Тело ответа) {Object[]} reviews Список рецензий для песни, оставленных пользователем
 * @apiSuccess (Тело ответа) {String} reviews._id ID рецензии
 * @apiSuccess (Тело ответа) {Object} reviews.song Песня, на которую написана рецензия
 * @apiSuccess (Тело ответа) {String} reviews.song._id ID песни
 * @apiSuccess (Тело ответа) {String} reviews.song.user ID пользователя, загрузившего песню.
 * @apiSuccess (Тело ответа) {String} reviews.song.genre ID жанра
 * @apiSuccess (Тело ответа) {String} reviews.song.name Название песни
 * @apiSuccess (Тело ответа) {String} reviews.song.artistName Имя исполнителя
 * @apiSuccess (Тело ответа) {Number} reviews.song.reviewPoints Баланс песни
 * @apiSuccess (Тело ответа) {String} reviews.song.filename Ссылка на аудиофайл
 * @apiSuccess (Тело ответа) {String} reviews.song.artwork Ссылка на обложку
 * @apiSuccess (Тело ответа) {String} reviews.song.waveform Ссылка на waveform JSON
 * @apiSuccess (Тело ответа) {Date}   reviews.song.date Дата загрузки
 * @apiSuccess (Тело ответа) {String} reviews.user ID пользователя, оставившего рецензию.
 * @apiSuccess (Тело ответа) {String} reviews.text Текст рецензии
 * @apiSuccess (Тело ответа) {Boolean} reviews.rating Оценка песни (True - понравилась, False - не понравилась)
 * @apiSuccess (Тело ответа) {Boolean} reviews.isRead Флаг, говорящий о том, просмотрена ли рецензия автором песни.
 * @apiSuccess (Тело ответа) {Date}   reviews.date Дата рецензии
 *
 * @apiSuccessExample 200 OK:
 * 	HTTP/1.1 200 OK
 * 	{
 * 		[
 * 			{
 * 				"_id": "507f1f77bcf86cd799439011",
 * 				"song":
 * 				{
 * 					"_id": "507f1f77bcf86cd799439011",
 * 					"user": "507f1f77bcf86cd799439011",
 * 					"genre": "507f1f77bcf86cd799439011",
 * 					"name": "Mind Mischief",
 * 					"artistName": "Tame Impala",
 *					"reviewPoints": "5",
 *					"filename": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.mp3",
 *					"artwork": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg",
 * 					"waveform": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.json",
 * 					"date": "2012-04-23T18:25:43.511Z"
 * 				},
 * 				"user": "507f1f77bcf86cd799439011",
 * 				"text": "it's fine",
 * 				"rating": True,
 * 				"isRead": False,
 * 				"date": "2012-04-23T18:25:43.511Z"
 * 			},
 * 			{
 * 				"_id": "507f1f77bcf86cd799439011",
 * 				"song":
 * 				{
 * 					"_id": "507f1f77bcf86cd799439011",
 * 					"user": "507f1f77bcf86cd799439011",
 * 					"genre": "507f1f77bcf86cd799439011",
 * 					"name": "Mind Mischief",
 * 					"artistName": "Tame Impala",
 *					"reviewPoints": "5",
 *					"filename": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.mp3",
 *					"artwork": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg",
 * 					"waveform": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.json",
 * 					"date": "2012-04-23T18:25:43.511Z"
 * 				},
 * 				"user": "507f1f77bcf86cd799439011",
 * 				"text": "it's bad",
 * 				"rating": False,
 * 				"isRead": False,
 * 				"date": "2012-04-23T18:25:43.511Z"
 * 			}
 * 		]
 * 	}
 *
 * @apiDescription Получает историю рецензий для пользователя
 */
router.get("/history/", auth, (req, res) => {
	Review.find({ user: req.user.id })
		.sort("-date")
		.populate("song")
		.then((reviews) => res.json(reviews));
});

/**
 * @api {get} reviews/history Получить положительные рецензии для пользователя
 * @apiName GetReviewListFavorite
 * @apiGroup Рецензия
 *
 * @apiUse RequiresAuth
 *
 * @apiSuccess (Тело ответа) {Object[]} reviews Список положительных рецензий для песни, оставленных пользователем
 * @apiSuccess (Тело ответа) {String} reviews._id ID рецензии
 * @apiSuccess (Тело ответа) {Object} reviews.song Песня, на которую написана рецензия
 * @apiSuccess (Тело ответа) {String} reviews.song._id ID песни
 * @apiSuccess (Тело ответа) {String} reviews.song.user ID пользователя, загрузившего песню.
 * @apiSuccess (Тело ответа) {String} reviews.song.genre ID жанра
 * @apiSuccess (Тело ответа) {String} reviews.song.name Название песни
 * @apiSuccess (Тело ответа) {String} reviews.song.artistName Имя исполнителя
 * @apiSuccess (Тело ответа) {Number} reviews.song.reviewPoints Баланс песни
 * @apiSuccess (Тело ответа) {String} reviews.song.filename Ссылка на аудиофайл
 * @apiSuccess (Тело ответа) {String} reviews.song.artwork Ссылка на обложку
 * @apiSuccess (Тело ответа) {String} reviews.song.waveform Ссылка на waveform JSON
 * @apiSuccess (Тело ответа) {Date}   reviews.song.date Дата загрузки
 * @apiSuccess (Тело ответа) {String} reviews.user ID пользователя, оставившего рецензию.
 * @apiSuccess (Тело ответа) {String} reviews.text Текст рецензии
 * @apiSuccess (Тело ответа) {Boolean} reviews.rating Оценка песни (True - понравилась, False - не понравилась)
 * @apiSuccess (Тело ответа) {Boolean} reviews.isRead Флаг, говорящий о том, просмотрена ли рецензия автором песни.
 * @apiSuccess (Тело ответа) {Date}   reviews.date Дата рецензии
 *
 * @apiSuccessExample 200 OK:
 * 	HTTP/1.1 200 OK
 * 	{
 * 		[
 * 			{
 * 				"_id": "507f1f77bcf86cd799439011",
 * 				"song":
 * 				{
 * 					"_id": "507f1f77bcf86cd799439011",
 * 					"user": "507f1f77bcf86cd799439011",
 * 					"genre": "507f1f77bcf86cd799439011",
 * 					"name": "Mind Mischief",
 * 					"artistName": "Tame Impala",
 *					"reviewPoints": "5",
 *					"filename": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.mp3",
 *					"artwork": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg",
 * 					"waveform": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.json",
 * 					"date": "2012-04-23T18:25:43.511Z"
 * 				},
 * 				"user": "507f1f77bcf86cd799439011",
 * 				"text": "it's fine",
 * 				"rating": True,
 * 				"isRead": False,
 * 				"date": "2012-04-23T18:25:43.511Z"
 * 			},
 * 			{
 * 				"_id": "507f1f77bcf86cd799439011",
 * 				"song":
 * 				{
 * 					"_id": "507f1f77bcf86cd799439011",
 * 					"user": "507f1f77bcf86cd799439011",
 * 					"genre": "507f1f77bcf86cd799439011",
 * 					"name": "Mind Mischief",
 * 					"artistName": "Tame Impala",
 *					"reviewPoints": "5",
 *					"filename": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.mp3",
 *					"artwork": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg",
 * 					"waveform": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.json",
 * 					"date": "2012-04-23T18:25:43.511Z"
 * 				},
 * 				"user": "507f1f77bcf86cd799439011",
 * 				"text": "it's bad",
 * 				"rating": True,
 * 				"isRead": False,
 * 				"date": "2012-04-23T18:25:43.511Z"
 * 			}
 * 		]
 * 	}
 *
 * @apiDescription Получает список положительных рецензий для пользователя
 */
router.get("/favorite/", auth, (req, res) => {
	Review.find({ user: req.user.id, rating: true })
		.sort("-date")
		.populate("song")
		.then((reviews) => res.json(reviews));
});

/**
 * @api {post} review/ Добавить рецензию
 * @apiName PostReview
 * @apiGroup Рецензия
 *
 * @apiUse RequiresAuth
 * @apiPermission Только авторизованные пользователи
 *
 * @apiParam (Тело запроса) {String} song ID песни, на которую написана рецензия
 * @apiParam (Тело запроса) {String} user ID пользователя, оставившего рецензию
 * @apiParam (Тело запроса) {String} text Текст рецензии
 * @apiParam (Тело запроса) {Boolean} rating Оценка песни (True - понравилась, False - не понравилась)

 * @apiSuccess (Тело ответа) {String} _id ID рецензии
 * @apiSuccess (Тело ответа) {String} song ID песни, на которую написана рецензия
 * @apiSuccess (Тело ответа) {String} user ID пользователя, оставившего рецензию.
 * @apiSuccess (Тело ответа) {String} text Текст рецензии
 * @apiSuccess (Тело ответа) {Boolean} rating Оценка песни (True - понравилась, False - не понравилась)
 * @apiSuccess (Тело ответа) {Boolean} isRead Флаг, говорящий о том, просмотрена ли рецензия автором песни.
 * @apiSuccess (Тело ответа) {Date}   date Дата рецензии
 *
 * @apiSuccessExample 200 OK:
 * 	HTTP/1.1 200 OK
 * 	{
 * 		"_id": "507f1f77bcf86cd799439011",
 * 		"song": "507f1f77bcf86cd799439011",
 * 		"user": "507f1f77bcf86cd799439011",
 * 		"text": "it's fine",
 * 		"rating": True,
 * 		"isRead": False,
 * 		"date": "2012-04-23T18:25:43.511Z"
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
 * @apiDescription Добавляет новую рецензию.
 */
router.post("/", auth, (req, res) => {
	const { song, user, text, rating } = req.body;

	console.log(req.body);

	if (!song || !user || rating === null) {
		return res.status(400).json({ msg: "Please enter all fields." });
	}

	const newReview = new Review({
		song,
		user,
		text,
		rating,
	});

	newReview.save().then((review) => {
		User.findByIdAndUpdate(
			user,
			{ $inc: { points: 1 } },
			{ new: true }
		).then((newUser) => console.log("New user balance: " + newUser.points));
		Song.findByIdAndUpdate(
			song,
			{ $inc: { reviewPoints: -1 } },
			{ new: true }
		).then((newSong) => console.log("New song balance: " + newSong.points));
		res.json(review);
	});
});

module.exports = router;
