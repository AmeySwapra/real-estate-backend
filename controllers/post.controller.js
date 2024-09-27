import prisma from "../lib/prisma.js";


export const addPost = async (req, res) => {
  const { name, price, images, area, location } = req.body;
  
  try {
    const newPost = await prisma.post.create({
      data: {
        name,
        price,
        images,
        area,
        location,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post', message: error.message });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { name, price, images, area, location } = req.body;

  try {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        name,
        price,
        images,
        area,
        location,
      },
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post', message: error.message });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.post.delete({
      where: { id },
    });
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post', message: error.message });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts', message: error.message });
  }
};

// Get single post by ID
export const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post', message: error.message });
  }
};