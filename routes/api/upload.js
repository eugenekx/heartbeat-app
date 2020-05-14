const express = require("express");
const router = express.Router();

const upload = require("../../scripts/file-upload");

const avatarUpload = upload.single("avatar");
const artworkUpload = upload.single("artwork");
const audioUpload = upload.single("audio");

/**
 * @api {post} upload/avatar Загрузить аватар
 * @apiName UploadAvatar
 * @apiGroup Загрузка файлов
 *
 * @apiUse RequiresAuth
 * @apiPermission Только авторизованные пользователи
 *
 * @apiParam (Тело запроса) {File} avatar Файл, содержащий аватар
 *
 * @apiSuccess (Тело ответа) {String} location URL загруженного файла
 *
 * @apiSuccessExample 200 OK:
 * 	HTTP/1.1 200 OK
 * 	"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg"
 *
 * @apiError UploadError Загрузка файла не удалась.
 *
 * @apiErrorExample UploadError
 * 	HTTP/1.1 400 Bad Request
 * 	{
 * 		"err": "File is too big"
 * 	}
 *
 * @apiDescription Загружает аватар на Amazon S3.
 */
router.post("/avatar", function (req, res) {
	avatarUpload(req, res, function (err) {
		if (err) return res.json({ err: err });
		return res.send(req.file.location);
	});
});

/**
 * @api {post} upload/avatar Загрузить обложку песни
 * @apiName UploadArtwork
 * @apiGroup Загрузка файлов
 *
 * @apiUse RequiresAuth
 * @apiPermission Только авторизованные пользователи
 *
 * @apiParam (Тело запроса) {File} artwork Файл, содержащий обложку песни
 *
 * @apiSuccess (Тело ответа) {String} location URL загруженного файла
 *
 * @apiSuccessExample 200 OK:
 * 	HTTP/1.1 200 OK
 * 	"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.jpg"
 *
 * @apiError UploadError Загрузка файла не удалась.
 *
 * @apiErrorExample UploadError
 * 	HTTP/1.1 400 Bad Request
 * 	{
 * 		"err": "File is too big"
 * 	}
 *
 * @apiDescription Загружает обложку песни на Amazon S3.
 */
router.post("/artwork", function (req, res) {
	artworkUpload(req, res, function (err) {
		if (err) return res.json({ err: err });
		return res.send(req.file.location);
	});
});

/**
 * @api {post} upload/avatar Загрузить аудиофайл
 * @apiName UploadAudio
 * @apiGroup Загрузка файлов
 *
 * @apiUse RequiresAuth
 * @apiPermission Только авторизованные пользователи
 *
 * @apiParam (Тело запроса) {File} audio Аудиофайл
 *
 * @apiSuccess (Тело ответа) {String} location URL загруженного файла
 *
 * @apiSuccessExample 200 OK:
 * 	HTTP/1.1 200 OK
 * 	"https://heartbeat-review.s3.eu-central-1.amazonaws.com/f94d4d7689e1cfe06043ad7b5a529a30.mp3"
 *
 * @apiError UploadError Загрузка файла не удалась.
 *
 * @apiErrorExample UploadError
 * 	HTTP/1.1 400 Bad Request
 * 	{
 * 		"err": "File is too big"
 * 	}
 *
 * @apiDescription Загружает аудиофайл на Amazon S3.
 */
router.post("/audio", function (req, res) {
	audioUpload(req, res, function (err) {
		if (err) return res.json({ err: err });
		return res.send(req.file.location);
	});
});

module.exports = router;
