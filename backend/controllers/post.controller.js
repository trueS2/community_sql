const posts = require('../database/posts.json');
const { addPost, getPost, updatePost, deletePost } = require('../models/post.model');

module.exports = {
    // 모든 게시글을 렌더링
    render: async (req, res) => {
        return res.status(200).json({ status: 200, message: "render_success", data: posts});
    },

    // 새 게시글 생성
    createPost: async (req, res) => {
        const { postTitle, postContent, postDate } = req.body;
        if (!postTitle || !postContent) return res.status(400).json({ status: 400, message: "invalid_title", data: null });
        
        const newPostId = addPost({ postTitle, postContent, postDate });
        if (!newPostId) return res.status(500).json({ status: 500, message: "internal_server_error", data: null });

        return res.status(200).json({ status: 200, message: "create_success", data: { post_id: newPostId }})
    },

    // 특정 게시글 불러오기
    readPost: async (req, res) => {
        const postId = req.params.id;
        // console.log(postId);
        const post = getPost(postId);
        if (!post) return res.status(404).json({ status: 404, message: "post_not_found", data: null });

        return res.status(200).json({ status: 200, message: "read_success", data: post});
    },

    // 게시글 업데이트
    updatePost: async (req, res) => {
        const postId = req.params.id;
        const { postTitle, postContent, postDate } = req.body;
        const updatedData = { postTitle, postTitle, postDate };

        const result = updatePost(postId, updatedData);
        if (!result) return res.status(404).json({ status: 404, message: "post_not_found", data: null });

        return res.status(200).json({ status: 200, message: "update_success", data: updatedData });
    },

    // 게시글 삭제
    deletePost: async (req, res) => {
        const postId = req.params.id;
        const success = deletePost(postId);
        if (!success) return res.status(404).json({ status: 404, message: "post_not_found", data: null });

        return res.status(200).json({ status: 200, message: "delete_success" });
    }

}