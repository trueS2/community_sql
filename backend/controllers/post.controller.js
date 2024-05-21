const posts = require('../database/posts.json');
const { addPost, getPost } = require('../models/post.model');

module.exports = {
    render: async (req, res) => {
        return res.status(200).json({ status: 200, message: "render_success", data: posts});
    },

    createPost: async (req, res) => {
        const { postTitle, postContent, postDate } = req.body;
        if (!postTitle || !postContent) return res.status(400).json({ status: 400, message: "invalid_title", data: null });
        
        const newPostId = addPost({ postTitle, postContent, postDate });
        if (!newPostId) return res.status(500).json({ status: 500, message: "internal_server_error", data: null });

        return res.status(200).json({ status: 200, message: "create_success", data: { post_id: newPostId }})
    },

    readPost: async (req, res) => {
        const postId = req.params.id;
        // console.log(postId);
        const post = getPost(postId);
        if (!post) return res.status(404).json({ status: 404, message: "post_not_found", data: null });

        return res.status(200).json({ status: 200, message: "read_success", data: post});
    },

    updatePost: async (req, res) => {
        return res.status(200).json({ status: 200, message: "update_success", data: post})
    }
}