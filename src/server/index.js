const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'upload/');
    },
    filename(req, file, cb) {
      const changedName = `${uuidv4()}-${file.originalname}`;
      cb(null, changedName);
    }
  })
});
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static('dist'));
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.send(req.file);
});
app.get('/api/test', (req, res) => {
  res.send({ ok: 0 });
});
app.listen(process.env.PORT || 8888, () => console.log(`Listening on port ${process.env.PORT || 8888}!`));
