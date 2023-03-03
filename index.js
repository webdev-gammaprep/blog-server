const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000
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
  blogs = [...blogs, req.body];
  fs.writeFileSync('blogs.json', JSON.stringify(blogs, null ,2));
  res.send('Post added!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})