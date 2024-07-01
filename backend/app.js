const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.route');
const postRouter = require('./routes/post.route');
const commentRouter = require('./routes/comment.route');

const app = express();

// CORS 설정
const corsOptions = {
  origin: 'http://localhost:3000', // 허용할 프론트엔드의 주소
  credentials: true, // 인증 정보(cookie 등) 허용 여부
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // 허용할 HTTP 메소드
};

app.use(cors(corsOptions));

// JSON 파싱을 위한 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 라우팅 설정
app.use('/api/users', userRouter); // '/api/users' 경로에 사용자 관련 라우트 등록
app.use('/api/posts', postRouter); // '/api/posts' 경로에 게시글 관련 라우트 등록
app.use('/api/comments', commentRouter); // '/api/comments' 경로에 댓글 관련 라우트 등록

// 404 처리 미들웨어
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

// 서버 시작
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
