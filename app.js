const http = require('http');
const path = require('path');
const express = require('express');

const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type,Accept");
  next();
})
app.use(express.static(path.join(__dirname, 'dist/my-project')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/my-project/index.html'));
});
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('Running'));
