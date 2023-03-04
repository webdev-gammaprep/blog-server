const express = require('express')
const fs = require('fs')
const cors = require('cors')
const app = express()
const port = 3000


app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json())

const base = '/api/v1/post';

app.get(base + '/all', (req, res) => {
  var blogs = JSON.parse(fs.readFileSync('blogs.json').toString());
  res.json(blogs)
})

app.get(base + '/:id', (req, res) => {
  var blogs = JSON.parse(fs.readFileSync('blogs.json').toString());
  var postId = req.params.id;
  var blog = blogs?.find(e => e.id == postId);
  res.json(blog);
})

app.post(base, (req, res) => {
  var blogs = JSON.parse(fs.readFileSync('blogs.json').toString());
  req.body.id = blogs[blogs.length-1].id + 1;
  blogs = [...blogs, req.body];
  fs.writeFileSync('blogs.json', JSON.stringify(blogs, null ,2));
  res.send('Post added!');
})

app.delete(base + '/:id', (req, res) => {
  var blogs = JSON.parse(fs.readFileSync('blogs.json').toString());
  var postId = req.params.id;
  blogs = blogs.filter(p => p.id != postId);
  fs.writeFileSync('blogs.json', JSON.stringify(blogs, null ,2));
  res.send('Post deleted!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})