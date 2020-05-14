const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Genre Model
const Genre = require("../../models/Genre");

/**
 * @api {get} genres/:id Получить данные жанра по ID
 * @apiName GetGenreByID
 * @apiGroup Жанр
 *
 * @apiUse RequiresAuth
 *
 * @apiParam (Параметры запроса) {String} id ID жанра, данные которого требуется получить.
 *
 * @apiSuccess (Тело ответа) {String} _id ID жанра
 * @apiSuccess (Тело ответа) {String} text Название жанра
 *
 * @apiSuccessExample 200 OK:
 * 	HTTP/1.1 200 OK
 * 	{
 * 		"_id": "507f1f77bcf86cd799439011",
 * 		"text": "Electronica / Downtempo"
 * 	}
 *
 * @apiDescription Получает данные жанра по ID.
 */
router.get("/:id", auth, (req, res) => {
	Genre.findOne({ _id: req.params.id }).then((genre) => res.json(genre));
});

/**
 * @api {get} genres/ Получить список всех жанров
 * @apiName GetGenreList
 * @apiGroup Жанр
 *
 * @apiUse RequiresAuth
 * @apiPermission Только авторизованные пользователи
 *
 * @apiSuccess (Тело ответа) {Object[]} genres Список жанров
 * @apiSuccess (Тело ответа) {String} genres._id ID жанра
 * @apiSuccess (Тело ответа) {String} genres.text Название жанра
 *
 * @apiSuccessExample 200 OK:
 * 	HTTP/1.1 200 OK
 * 	{
 * 		[
 * 			{
 * 				"_id": "507f1f77bcf86cd799439011",
 * 				"text": "Electronica / Downtempo"
 * 			},
 * 			{
 * 				"_id": "5f7f1e77bcf86cdd99f86cdd",
 * 				"text": "Rock"
 * 			}
 * 		]
 * 	}
 *
 * @apiDescription Получает список всех жанров.
 */
router.get("/", auth, (req, res) => {
	Genre.find({}).then((genres) => res.json(genres));
});

/**
 * @api {post} genres/ Добавить жанр
 * @apiName PostGenre
 * @apiGroup Жанр
 *
 * @apiUse RequiresAuth
 * @apiPermission Только авторизованные пользователи
 *
 * @apiParam (Тело запроса) {String} text Название жанра.
 *
 * @apiSuccess (Тело ответа) {String} _id ID жанра.
 * @apiSuccess (Тело ответа) {String} text Название жанра.
 *
 * @apiSuccessExample 200 OK:
 * 	HTTP/1.1 200 OK
 * 	{
 * 		"_id": "507f1f77bcf86cd799439011",
 * 		"text": "Electronica / Downtempo"
 * 	}
 *
 * @apiDescription Добавляет новый жанр.
 */
router.post("/", auth, (req, res) => {
	const newGenre = new Genre({
		text: req.body.text,
	});

	newGenre.save().then((genre) => res.json(genre));
});

module.exports = router;
