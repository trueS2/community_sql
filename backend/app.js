const userRouter = require('./routes/user.route');
const postRouter = require('./routes/post.route');
// const commentRouter = require('./routes/comment.route');

const express = require('express');
const cors = require('cors');

const app = express();
const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
  method: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}

app.set('port', 8080);

app.use(cors(corsOption));

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/users', userRouter);
app.use('/posts', postRouter);
// app.use('/comments', commentRouter);

app.use((req, res, next) => {
  res.status(404).send('Not Found');
})

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message)
})

app.listen(8080, () => {
  console.log(app.get('port'), '번 포트에서 서버 대기 중')
})