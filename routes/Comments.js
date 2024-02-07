const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// get a comment by id
router.get('/:commentID', async (req, res) => {
    try {
        const commentID = req.params.commentID;

        // Find the comment by its ID
        const comment = await Comment.findById(commentID).populate('user');

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Create a new comment
router.post('/create', async (req, res) => {
    try {
        const { eventID, text } = req.body;

        // Create a new comment
        const newComment = new Comment({
            user: req.user._id,
            event: eventID,
            text
        });

        // Save the comment to the database
        await newComment.save();

        res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Update a comment by its ID
router.put('/:commentID', async (req, res) => {
    try {
        const commentID = req.params.commentID;
        const { text } = req.body;

        // Find the comment and check if it belongs to the user
        const comment = await Comment.findOneAndUpdate(
            { _id: commentID, user: req.user._id },
            { text },
            { new: true }
        );

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found or unauthorized access' });
        }

        res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Delete a comment by its ID
router.delete('/:commentID', async (req, res) => {
    try {
        const commentID = req.params.commentID;

        // Find the comment and check if it belongs to the user
        const comment = await Comment.findOneAndDelete({ _id: commentID, user: req.user._id }); 

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found or unauthorized access' });
        }

        res.status(204).json({ message: 'Comment deleted successfully', comment: comment }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
