const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Song Model
const Song = require("../../models/Song");
const User = require("../../models/User");

/**
 * @api {get} songs/:id Получить данные песни по ID
 * @apiName GetSongByID
 * @apiGroup Песня
 *
 * @apiUse RequiresAuth
 *
 * @apiParam (Параметры запроса) {String} id ID песни, данные которой требуется получить.
 *
 * @apiSuccess (Тело ответа) {String} _id ID песни
 * @apiSuccess (Тело ответа) {String} user ID пользователя
 * @apiSuccess (Тело ответа) {Object} genre Жанр песни
 * @apiSuccess (Тело ответа) {String} genre._id ID жанра
 * @apiSuccess (Тело ответа) {String} genre.text Название жанра
 * @apiSuccess (Тело ответа) {String} name Название песни
 * @apiSuccess (Тело ответа) {String} artistName Имя исполнителя
 * @apiSuccess (Тело ответа) {Number} reviewPoints Баланс песни
 * @apiSuccess (Тело ответа) {String} filename Ссылка на аудиофайл
 * @apiSuccess (Тело ответа) {String} artwork Ссылка на обложку
 * @apiSuccess (Тело ответа) {String} waveform Ссылка на waveform JSON
 * @apiSuccess (Тело ответа) {Date} date Дата загрузки
 *
 * @apiSuccessExample 200 OK:
 * 	HTTP/1.1 200 OK
 * 	{
 * 		"_id": "507f1f77bcf86cd799439011",
 * 		"user": "507f1f77bcf86cd799439011",
 * 		"genre":
 * 		{
 * 			"_id": "507f1f77bcf86cd799439011",
 * 			"text": "Rock"
 * 		},
 * 		"name": "Mind Mischief",
 * 		"artistName": "Tame Impala",
 *		"reviewPoints": "5",
 *		"filename": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.mp3",
 *		"artwork": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg",
 * 		"waveform": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.json",
 * 		"date": "2012-04-23T18:25:43.511Z"
 * 	}
 *
 * @apiDescription Получает данные песни по ID.
 */
router.get("/id/:id", auth, (req, res) => {
	Song.findById(req.params.id)
		.populate("genre")
		.then((song) => res.json(song));
});

/**
 * @api {get} songs/user Получить список песен для пользователя
 * @apiName GetSongListForUser
 * @apiGroup Песня
 *
 * @apiUse RequiresAuth
 *
 * @apiSuccess (Тело ответа) {Object[]} songs Список песен для пользователя.
 * @apiSuccess (Тело ответа) {String} songs._id ID песни
 * @apiSuccess (Тело ответа) {String} songs.user ID пользователя
 * @apiSuccess (Тело ответа) {Object} songs.genre Жанр песни
 * @apiSuccess (Тело ответа) {String} songs.genre._id ID жанра
 * @apiSuccess (Тело ответа) {String} songs.genre.text Название жанра
 * @apiSuccess (Тело ответа) {String} songs.name Название песни
 * @apiSuccess (Тело ответа) {String} songs.artistName Имя исполнителя
 * @apiSuccess (Тело ответа) {Number} songs.reviewPoints Баланс песни
 * @apiSuccess (Тело ответа) {String} songs.filename Ссылка на аудиофайл
 * @apiSuccess (Тело ответа) {String} songs.artwork Ссылка на обложку
 * @apiSuccess (Тело ответа) {String} songs.waveform Ссылка на waveform JSON
 * @apiSuccess (Тело ответа) {Date} date Дата загрузки
 *
 * @apiSuccessExample 200 OK:
 * 	HTTP/1.1 200 OK
 * 	{
 * 		[
 * 			{
 * 				"_id": "507f1f77bcf86cd799439011",
 * 				"user": "507f1f77bcf86cd799439011",
 * 				"genre":
 * 				{
 * 					"_id": "507f1f77bcf86cd799439011",
 * 					"text": "Rock"
 * 				},
 * 				"name": "Mind Mischief",
 * 				"artistName": "Tame Impala",
 *				"reviewPoints": "5",
 *				"filename": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.mp3",
 *				"artwork": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg",
 * 				"waveform": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.json",
 * 				"date": "2012-04-23T18:25:43.511Z"
 * 			},
 *  		{
 * 				"_id": "507f1f77bcf86cd799439011",
 * 				"user": "507f1f77bcf86cd799439011",
 * 				"genre":
 * 				{
 * 					"_id": "507f1f77bcf86cd799439011",
 * 					"text": "Rock"
 * 				},
 * 				"name": "Desire Be Desire Go",
 * 				"artistName": "Tame Impala",
 *				"reviewPoints": "5",
 *				"filename": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.mp3",
 *				"artwork": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg",
 * 				"waveform": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.json",
 * 				"date": "2012-04-23T18:25:43.511Z"
 * 			}
 * 		]
 * 	}
 *
 * @apiDescription Получает список песен для пользователя.
 */
router.get("/user", auth, (req, res) => {
	Song.find({ user: req.user.id })
		.populate("genre")
		.then((result) => res.json(result));
});

/**
 * @api {get} songs/review/:id Получить песню для оценивания
 * @apiName GetSongForReview
 * @apiGroup Песня
 *
 * @apiUse RequiresAuth
 *
 * @apiParam (Параметры запроса) {String} id ID жанра, в котором будет происходить поиск песни
 *
 * @apiSuccess (Тело ответа) {String} _id ID песни
 * @apiSuccess (Тело ответа) {String} user ID пользователя
 * @apiSuccess (Тело ответа) {Object} genre Жанр песни
 * @apiSuccess (Тело ответа) {String} genre._id ID жанра
 * @apiSuccess (Тело ответа) {String} genre.text Название жанра
 * @apiSuccess (Тело ответа) {String} name Название песни
 * @apiSuccess (Тело ответа) {String} artistName Имя исполнителя
 * @apiSuccess (Тело ответа) {Number} reviewPoints Баланс песни
 * @apiSuccess (Тело ответа) {String} filename Ссылка на аудиофайл
 * @apiSuccess (Тело ответа) {String} artwork Ссылка на обложку
 * @apiSuccess (Тело ответа) {String} waveform Ссылка на waveform JSON
 * @apiSuccess (Тело ответа) {Date} date Дата загрузки
 *
 * @apiSuccessExample 200 OK:
 * 	HTTP/1.1 200 OK
 * 	{
 * 		"_id": "507f1f77bcf86cd799439011",
 * 		"user": "507f1f77bcf86cd799439011",
 * 		"genre":
 * 		{
 * 			"_id": "507f1f77bcf86cd799439011",
 * 			"text": "Rock"
 * 		},
 * 		"name": "Mind Mischief",
 * 		"artistName": "Tame Impala",
 *		"reviewPoints": "5",
 *		"filename": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.mp3",
 *		"artwork": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg",
 * 		"waveform": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.json",
 * 		"date": "2012-04-23T18:25:43.511Z"
 * 	}
 *
 * @apiError (Исключения) NoSongs Нет доступных песен для оценивания в выбранном жанре.
 *
 * @apiErrorExample NoSongs
 * 	HTTP/1.1 200 OK
 * 	{
 * 		"msg": "no songs"
 * 	}
 *
 * @apiDescription Получает песню для оценивания: случайная песня из числа тех, что соответствуют выбранному жанру, имеют ненулевой баланс и не загружены текущим пользователем.
 */
router.get("/review/:genre_id", auth, (req, res) => {
	// query: GET ONE RANDOM WHERE genre id = song genre AND song.reviewPoints > 0 AND not current user
	// TODO: AND NOT REVIEWED BY USER YET (DONE)
	Review.find({ user: req.user.id }).then((result) => {
		let reviewedSongs = result.map((item) => item.song);

		Song.countDocuments({
			_id: { $nin: reviewedSongs },
			genre: req.params.genre_id,
			reviewPoints: { $gt: 0 },
			user: { $ne: req.user.id },
		}).then((count) => {
			var random = Math.floor(Math.random() * count);

			Song.findOne({
				_id: { $nin: reviewedSongs },
				genre: req.params.genre_id,
				reviewPoints: { $gt: 0 },
				user: { $ne: req.user.id },
			})
				.skip(random)
				.populate("user", "-password")
				.then((result) => {
					if (!result) {
						res.json({ msg: "no songs" });
					} else {
						res.json(result);
					}
				});
		});
	});
});

/**
 * @api {post} songs/ Добавить песню
 * @apiName PostSong
 * @apiGroup Песня
 *
 * @apiUse RequiresAuth
 * @apiPermission Только авторизованные пользователи
 *
 * @apiParam (Тело запроса) {String} genre ID жанра песни
 * @apiParam (Тело запроса) {String} name Название песни
 * @apiParam (Тело запроса) {String} artistName Имя исполнителя
 * @apiParam (Тело запроса) {String} filename Ссылка на аудиофайл
 * @apiParam (Тело запроса) {String} artwork Ссылка на обложку
 * @apiParam (Тело запроса) {String} waveform Ссылка на waveform JSON
 *
 * @apiSuccess (Тело ответа) {String} _id ID песни
 * @apiSuccess (Тело ответа) {String} user ID пользователя
 * @apiSuccess (Тело ответа) {Object} genre Жанр песни
 * @apiSuccess (Тело ответа) {String} genre._id ID жанра
 * @apiSuccess (Тело ответа) {String} genre.text Название жанра
 * @apiSuccess (Тело ответа) {String} name Название песни
 * @apiSuccess (Тело ответа) {String} artistName Имя исполнителя
 * @apiSuccess (Тело ответа) {Number} reviewPoints Баланс песни
 * @apiSuccess (Тело ответа) {String} filename Ссылка на аудиофайл
 * @apiSuccess (Тело ответа) {String} artwork Ссылка на обложку
 * @apiSuccess (Тело ответа) {String} waveform Ссылка на waveform JSON
 * @apiSuccess (Тело ответа) {Date} date Дата загрузки
 *
 * @apiSuccessExample 200 OK:
 * 	HTTP/1.1 200 OK
 * 	{
 * 		"_id": "507f1f77bcf86cd799439011",
 * 		"user": "507f1f77bcf86cd799439011",
 * 		"genre":
 * 		{
 * 			"_id": "507f1f77bcf86cd799439011",
 * 			"text": "Rock"
 * 		},
 * 		"name": "Mind Mischief",
 * 		"artistName": "Tame Impala",
 *		"reviewPoints": "5",
 *		"filename": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.mp3",
 *		"artwork": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg",
 * 		"waveform": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.json",
 * 		"date": "2012-04-23T18:25:43.511Z"
 * 	}
 *
 * @apiDescription Добавляет новую песню.
 */
router.post("/", auth, (req, res) => {
	const newSong = new Song({
		user: req.user.id,
		name: req.body.name,
		genre: req.body.genre,
		artistName: req.body.artistName,
		filename: req.body.filename,
		artwork: req.body.artwork,
		waveform: req.body.waveform,
	});

	newSong.save().then((song) => res.json(song));
});

/**
 * @api {post} songs/update/:id Обновить данные песни
 * @apiName UpdateSong
 * @apiGroup Песня
 *
 * @apiUse RequiresAuth
 * @apiPermission Только авторизованные пользователи
 *
 * @apiParam (Параметры запроса) {String} id ID песни, данные которой требуется обновить
 *
 * @apiParam (Тело запроса) {Object} updatedSong Обновленные данные песни
 * @apiParam (Тело запроса) {String} [updatedSong.genre] ID жанра песни
 * @apiParam (Тело запроса) {String} [updatedSong.name] Название песни
 * @apiParam (Тело запроса) {String} [updatedSong.artistName] Имя исполнителя
 * @apiParam (Тело запроса) {String} [updatedSong.filename] Ссылка на аудиофайл
 * @apiParam (Тело запроса) {String} [updatedSong.artwork] Ссылка на обложку
 * @apiParam (Тело запроса) {String} [updatedSong.waveform] Ссылка на waveform JSON
 *
 * @apiSuccess (Тело ответа) {String} _id ID песни
 * @apiSuccess (Тело ответа) {String} user ID пользователя
 * @apiSuccess (Тело ответа) {Object} genre Жанр песни
 * @apiSuccess (Тело ответа) {String} genre._id ID жанра
 * @apiSuccess (Тело ответа) {String} genre.text Название жанра
 * @apiSuccess (Тело ответа) {String} name Название песни
 * @apiSuccess (Тело ответа) {String} artistName Имя исполнителя
 * @apiSuccess (Тело ответа) {Number} reviewPoints Баланс песни
 * @apiSuccess (Тело ответа) {String} filename Ссылка на аудиофайл
 * @apiSuccess (Тело ответа) {String} artwork Ссылка на обложку
 * @apiSuccess (Тело ответа) {String} waveform Ссылка на waveform JSON
 * @apiSuccess (Тело ответа) {Date} date Дата загрузки
 *
 * @apiSuccessExample 200 OK:
 * 	HTTP/1.1 200 OK
 * 	{
 * 		"_id": "507f1f77bcf86cd799439011",
 * 		"user": "507f1f77bcf86cd799439011",
 * 		"genre":
 * 		{
 * 			"_id": "507f1f77bcf86cd799439011",
 * 			"text": "Rock"
 * 		},
 * 		"name": "Mind Mischief",
 * 		"artistName": "Tame Impala",
 *		"reviewPoints": "5",
 *		"filename": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.mp3",
 *		"artwork": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg",
 * 		"waveform": "https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.json",
 * 		"date": "2012-04-23T18:25:43.511Z"
 * 	}
 *
 * @apiError SongDoesNotExist Песни не существует.
 *
 * @apiErrorExample SongDoesNotExist
 * 	HTTP/1.1 400 Bad Request
 * 	{
 * 		"msg": "Song does not exist."
 * 	}
 *
 * @apiDescription Обновляет данные песни в соответствии с теми, которые указаны в теле запроса.
 */
router.post("/update/:id", auth, (req, res) => {
	Song.exists({ _id: req.params.id }).then((exists) => {
		if (!exists) {
			return res.status(400).json({ msg: "Song does not exist." });
		}
	});

	Song.findByIdAndUpdate(req.params.id, req.body.updatedSong, {
		new: true,
	}).then((updSong) => res.json(updSong));
});

/**
 * @api {post} songs/addpoints/:id Пополнить баланс песни
 * @apiName SongAddPoints
 * @apiGroup Песня
 *
 * @apiUse RequiresAuth
 * @apiPermission Только авторизованные пользователи
 *
 * @apiParam (Параметры запроса) {String} id ID песни
 *
 * @apiParam (Тело запроса) {Number} points Количество перемещаемых поинтов
 *
 * @apiSuccess (Тело ответа) {String} msg Результат транзакции
 *
 * @apiSuccessExample 200 OK:
 * 	HTTP/1.1 200 OK
 * 	{
 * 		"msg": "ok"
 * 	}
 *
 * @apiError PermissionDenied Указанная песня не принадлежит текущему пользователю
 *
 * @apiErrorExample PermissionDenied
 * 	HTTP/1.1 403 Forbidden
 * 	{
 * 		"msg": "Can't transfer points to another user's song"
 * 	}
 *
 * @apiError NotEnoughPoints Поинтов на балансе пользователя недостаточно
 *
 * @apiErrorExample NotEnoughPoints
 * 	HTTP/1.1 403 Forbidden
 * 	{
 * 		"msg": "User doesn't have enough points"
 * 	}
 *
 * @apiDescription Перемещает указанное число поинтов с баланса пользователя на баланс песни.
 */
router.post("/addpoints/:id", auth, (req, res) => {
	Song.findById(req.params.id).then((song) => {
		if (song.user != req.user.id) {
			return res
				.status(403)
				.json({ msg: "Can't transfer points to another user's song" });
		}

		const points = req.body.points - song.reviewPoints;

		User.findById(song.user).then((user) => {
			if (user.points < points) {
				return res
					.status(403)
					.json({ msg: "User doesn't have enough points" });
			}
		});

		User.findByIdAndUpdate(
			song.user,
			{ $inc: { points: -points } },
			{ new: true }
		).then((newUser) => console.log("New user balance: " + newUser.points));
		song.reviewPoints += points;
		song.save().then(() => {
			console.log("New song balance: " + song.reviewPoints);
			return res.status(200).json({ msg: "ok" });
		});
	});
});

module.exports = router;
