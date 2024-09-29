const mongoose = require('mongoose');
import { json } from 'express';
const Blog = require('../Model/Blog')

const fetchListofBlogs = async (req,res) =>
{
    let blogList;
    try{
        blogList = await Blog.find();
    }catch(e)
    {
        console.log(e)
    }
    if(!blogList)
    {
        return res.status(404).json({message : 'No Blogs Found'})
    }

    return res.status(200).json({blogList})
}

const addNewBlog =  async(req,res) =>
{
    const {title, description} = req.body;
    const currentDate = new Date();

    const newlyCreatedBlog = new Blog({
        title, description, date : currentDate
    })

    try{
        await newlyCreatedBlog.save();

    }catch(e)
    {
        console.log(e)
    }

    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await newlyCreatedBlog.save(session);
        session.commitTransaction();

    }catch(e)
    {
        return res.send(500).json({message:e})
    }

    return res.status(200).json({newlyCreatedBlog});
};

const deleteBlog = async() =>
{
    const id = req.param.id;

    try{
        const findCurrentBlog = await Blog.findByIdAndDelete(id);
        if(!findCurrentBlog)
        {
            return res.status(404).json({message: 'Blog not found'});
        }

        return res.status(200).json({message: "Succesfullt deleted"})
    }catch(e)
    {
        console.log(e);
        return res.status(500).json({message:'Unable to delete ! Please Try Again' })
    }
}

const updateBlog = async (req,res) =>
{
    const id = req.param.id;

    const {title,description} = req.body
    let currentBlogtoUpdate;

    try{
        currentBlogtoUpdate = await Blog.findByIdAndDelete(id,{
            title,description
        })

    }catch(e)
    {
       console.log(e);
       return res.status(500).json({message: 'Something went wrong while updating! Please try again'})
    }

    if(!currentBlogtoUpdate)
    {
        return res.status(500).json({message: 'Unable to Update'})
    }
    return res.status(200).json({currentBlogtoUpdate})
}

module.exports = {fetchListofBlogs, deleteBlog, updateBlog, addNewBlog}
