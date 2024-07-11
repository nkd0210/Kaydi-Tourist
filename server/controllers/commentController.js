import Comment from "../models/commentModel.js";

export const createComment = async (req, res, next) => {
  const userId = req.params;

  if (req.user.id !== userId) {
    return res
      .status(400)
      .json({ message: "You are not allowed to create a comment" });
  }
  try {
    const { content, postId, postTitle } = req.body;
    const newComment = new Comment({
      content,
      userId,
      postId,
      postTitle,
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
    const postComments = await Comment.find({ postId: req.params.postId }).sort(
      { createdAt: -1 }
    );
    res.status(200).json(postComments);
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Get post comments failed", error: error });
  }
};
