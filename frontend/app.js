const express = require('express');
const path = require('path')

const app = express();

app.set('port', 3000);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/post1/:postId', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'login.html'));
})

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'signup.html'));
})

app.get('/post', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'post.html'));
})

app.get('/post1/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'post1.html'));
})

app.get('/post2', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'post2.html'));
})

app.get('/postedit', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'postedit.html'));
})

app.get('/edit', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'edit.html'));
})

app.get('/passwordedit', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'passwordedit.html'));
})

app.use((req, res, next) => {
    res.status(404).send('Not Found');
})

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message)
})

app.listen(3000, () => {
    console.log(app.get('port'), '번 포트에서 서버 대기 중')
})