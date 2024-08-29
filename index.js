import http from 'http';
import url from 'url';
import crypto from 'crypto';

let users = [];
const key = crypto.randomBytes(32);



http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      body = JSON.parse(body);
      const index = users.indexOf(users.username);
      if(index == -1){
        const hash = crypto.createHash('sha256', key);
        users[body.username] = hash.update(body.password).digest('hex');
      }
      console.log(users);
    });
  }else if (req.method === 'PUT') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      body = JSON.parse(body);
      const hash = crypto.createHash('sha256', key);
        users[body.username] = hash.update(body.password).digest('hex');
      console.log(users);
    });
  }else if (req.method === 'DELETE') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      body = JSON.parse(body);
      const index = users.indexOf(users.username);
      if(index > -1){
        users.splice(index, 1)
      }
      console.log(users);
    });
  } else if (req.method === 'GET'){
    const parse = url.parse(req.url);
    console.log(users[parse.query]);
  }
  res.end();
}).listen(process.env.PORT || 3000, 'localhost', () => {
  console.log(`server listen at: ${process.env.PORT || 3000}`);
});
