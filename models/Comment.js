const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  text: { type: String, required: true },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
