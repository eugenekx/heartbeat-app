const express = require('express');
const router = express.Router();

const upload = require('../../scripts/file-upload');

const avatarUpload = upload.single('avatar')
const artworkUpload = upload.single('artwork')
const audioUpload = upload.single('audio')

router.post('/avatar', function (req, res) {
    avatarUpload(req, res, function(err) {
        if (err) return res.json({'err': err });
        return res.send(req.file.location);
    });
});

router.post('/artwork', function (req, res) {
    artworkUpload(req, res, function(err) {
        if (err) return res.json({'err': err });
        return res.send(req.file.location);
    });
});

router.post('/audio', function (req, res) {
    audioUpload(req, res, function(err) {
        if (err) return res.json({'err': err });
        return res.send(req.file.location);
    });
});

module.exports = router;