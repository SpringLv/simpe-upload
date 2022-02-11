const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
// const os = require('os');

const app = express();

app.use(express.static('dist'));
// app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
// 先引入multer
const upload = multer();
// 从upload中获取文件

app.post('/api/upload', upload.any(), (req) => {
  const inputFiles = req.file;
  //   const content = inputFiles.inputFile[0].buffer.toString();
  console.log(inputFiles);
//   multer({ dest: './uploadFiles/tmp/' });
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
