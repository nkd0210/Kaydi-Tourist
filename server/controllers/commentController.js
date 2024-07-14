import Comment from "../models/commentModel.js";

export const createComment = async (req, res, next) => {
  const { userId, postId } = req.params;

  if (req.user.id !== userId) {
    return res
      .status(400)
      .json({ message: "You are not allowed to create a comment" });
  }
  try {
    const { content, creator } = req.body;
    const newComment = new Comment({
      content,
      userId,
      postId,
      creator,
    });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Create comment failed", error: error });
  }
};

export const getPostComments = async (req, res, next) => {
  try {
    const postComments = await Comment.find({ postId: req.params.postId })
      .sort({ createdAt: -1 })
      .populate("creator");
    if (postComments.length === 0) {
      return res
        .status(404)
        .json({ message: "No comments found for this post" });
    }
    res.status(200).json(postComments);
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Get post comments failed", error: error });
  }
};

export const updateComment = async (req, res, next) => {
  const { userId, commentId } = req.params;
  if (req.user.id !== userId) {
    return res
      .status(400)
      .json({ message: "You are not allowed to update this comment" });
  }
  try {
    const findComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $set: { content: req.body.content },
      },
      { new: true }
    );
    res.status(200).json(findComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  const { userId, commentId } = req.params;
  if (req.user.id !== userId) {
    return res
      .status(400)
      .json({ message: "You are not allowed to delete this comment" });
  }
  try {
    const findComment = await Comment.findByIdAndDelete(commentId);
    if (!findComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    const userIndex = comment.likes.indexOf(req.user.id); // check if the user like the comment or not, if not found will return -1
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};
