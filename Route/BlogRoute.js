const express = require('express');
const blogRouter = express.Router();

const {fetchListofBlogs, deleteBlog, updateBlog, addNewBlog} = require('../Controller/BlogControler')

blogRouter.get('/',fetchListofBlogs);
blogRouter.post('/add',addNewBlog);
blogRouter.put('/update/:id',updateBlog);
blogRouter.delete('/delete/:id',deleteBlog);

module.exports = blogRouter;

