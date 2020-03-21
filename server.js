const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const mime = require('mime');
const app = express();

// Bodyparser Middleware
app.use(express.json());

// Multer Storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, 'client', 'public', 'songdata'));
    },
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(null, raw.toString('hex') + path.extname(file.originalname));
      });
    }
  });
  var upload = multer({ storage: storage });

  app.post('/upload', upload.single('artwork'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    res.send(res.req.file.filename); 
    
  })



// DB Config
const db = require('./config/keys').mongoURI;
// Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use('/api/songs', require('./routes/api/songs'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

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