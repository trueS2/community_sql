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
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'signup.html'));
});

app.get('/post', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'post.html'));
});

app.get('/post1/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'post1.html'));
});

app.get('/post2', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'post2.html'));
});

app.get('/postedit', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'postedit.html'));
});

app.get('/edit', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'edit.html'));
});

app.get('/passwordedit', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'passwordedit.html'));
});

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
app.listen(PORT, () => {
    console.log(`Frontend server is running on port ${PORT}`);
});
