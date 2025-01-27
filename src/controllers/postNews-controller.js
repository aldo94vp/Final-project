
const mongoose = require('mongoose');

const PostNews = require('../models/PostNews.js');

const postsCtrl = {};


postsCtrl.getPosts = async (req, res) => {  
    try {
        const postNews = await PostNews.find();
                
        res.status(200).json(postNews);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

postsCtrl.getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostNews.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


postsCtrl.createPost = async (req, res) => {
    const post = req.body;

    const newPostNew = new PostNews({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostNew.save();

        res.status(201).json(newPostNew );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


postsCtrl.updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostNews.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

postsCtrl.deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostNews.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

postsCtrl.likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostNews.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        post.likes.push(req.userId);
      } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
      } 

      const updatedPost = await PostNews.findByIdAndUpdate(id, post, { new: true });
      res.status(200).json(updatedPost);

}

postsCtrl.commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostNews.findById(id);

    post.comments.push(value);

    const updatedPost = await PostNews.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};


module.exports = postsCtrl;