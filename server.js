const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

const { getWaveformJSON } = require('./scripts/waveform');

const mime = require('mime');
const app = express();

// Bodyparser Middleware
app.use(express.json());

const uploadDestination = path.resolve(__dirname, 'client', 'public', 'songdata');

// Multer Storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDestination);
    },
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(null, raw.toString('hex') + path.extname(file.originalname));
      });
    }
  });
  var upload = multer({ storage: storage });

  app.post('/upload/avatar', upload.single('avatar'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    res.send(res.req.file.filename); 
    
  })

  app.post('/upload/artwork', upload.single('artwork'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    res.send(res.req.file.filename); 
    
  })

  app.post('/upload/audio', upload.single('audio'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
  
    res.send(res.req.file.filename); 
    
    const id = path.basename(res.req.file.filename, path.extname(res.req.file.filename));
    const trackname = path.resolve(uploadDestination, res.req.file.filename);
    const jsonname = path.resolve(uploadDestination, id+'.json');
    const wave = getWaveformJSON(600, 100, trackname, id);
    fs.writeFile(jsonname, wave, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
  })

var db;
// DB Config
if (process.env.NODE_ENV === 'production') {
  db = process.env.mongoURI;
} else {
  db = require('./config/keys').mongoURI;
}

// Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/songs', require('./routes/api/songs'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/genres', require('./routes/api/genres'));
app.use('/api/reviews', require('./routes/api/reviews'));

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;



app.listen(port, () => console.log(`Server started on port ${port}`));