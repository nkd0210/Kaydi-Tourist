import Post from "../models/postModel.js";

export const createPost = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { creator, title, image, content } = req.body;
    const newPost = new Post({
      userId,
      creator,
      title,
      image,
      content,
    });
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    next(error);
  }
};

export const getSinglePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const findPost = await Post.findById(postId).populate("creator");
    if (!findPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(findPost);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  const { userId, postId } = req.params;
  if (req.user.id !== userId) {
    return res
      .status(400)
      .json({ message: "You are not allowed to delete this post" });
  }
  try {
    const findPost = await Post.findByIdAndDelete(postId);
    if (!findPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  const { userId, postId } = req.params;
  if (req.user.id !== userId) {
    return res
      .status(400)
      .json({ message: "You are not allowed to update this post" });
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

export const getPostBySearch = async (req, res, next) => {
  const { postKeyWord } = req.params;
  try {
    let searchPost = [];

    if (postKeyWord === "all") {
      searchPost = await Post.find().populate("creator");
    } else {
      searchPost = await Post.find({
        $or: [
          {
            title: {
              $regex: postKeyWord,
              $options: "i",
            },
          },
        ],
      }).populate("creator");
    }

    if (searchPost.length === 0) {
      return res.status(404).json({ message: "No post found" });
    }
    res.status(200).json(searchPost);
  } catch (error) {
    next(error);
  }
};

export const getAllPost = async (req, res, next) => {
  try {
    const allPosts = await Post.find().populate("creator");
    if (allPosts.length === 0) {
      return res.status(404).json({ message: "Fetch all post failed" });
    } else {
      return res.status(200).json(allPosts);
    }
  } catch (error) {
    next(error);
  }
};

export const getRecentPost = async (req, res, next) => {
  try {
    const { limitPost } = req.params;
    const limit = parseInt(limitPost);

    const allPost = await Post.find()
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("creator");
    if (allPost.length === 0) {
      return res.status(404).json({ message: "No recent post found!" });
    }
    res.status(200).json(allPost);
  } catch (error) {
    next(error);
  }
};
