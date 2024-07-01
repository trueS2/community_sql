const express = require('express');
const path = require('path');

const app = express();

// 서버 포트 설정
const PORT = 3000;

app.set('port', PORT);

// 정적 파일 제공 (public 디렉토리)
// public 디렉토리 안의 파일들을 정적 파일로 제공
app.use(express.static(path.join(__dirname, 'public')));

// 각 페이지에 맞는 HTML 파일 서빙
// 루트 경로 ('/')에 접속하면 login.html 파일을 제공
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'login.html'));
});

// /signup 경로에 접속하면 signup.html 파일을 제공
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'signup.html'));
});

// /post 경로에 접속하면 post.html 파일을 제공
app.get('/post', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'post.html'));
});

// /post1/:id 경로에 접속하면 post1.html 파일을 제공
// :id는 동적 파라미터로 사용됨
app.get('/post1/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'post1.html'));
});

// /post2 경로에 접속하면 post2.html 파일을 제공
app.get('/post2', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'post2.html'));
});

// /postedit 경로에 접속하면 postedit.html 파일을 제공
app.get('/postedit', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'postedit.html'));
});

// /edit 경로에 접속하면 edit.html 파일을 제공
app.get('/edit', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'edit.html'));
});

// /passwordedit 경로에 접속하면 passwordedit.html 파일을 제공
app.get('/passwordedit', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'passwordedit.html'));
});

// 404 처리 미들웨어
// 요청된 경로가 위의 어떤 경로와도 일치하지 않으면 404 상태 코드와 'Not Found' 메시지 전송
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

// 에러 처리 미들웨어
// 서버에서 발생한 에러를 처리하고 500 상태 코드와 에러 메시지 전송
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

// 서버 시작
// 설정된 포트에서 서버를 실행하고, 실행 메시지 출력
app.listen(PORT, () => {
    console.log(`Frontend server is running on port ${PORT}`);
});
