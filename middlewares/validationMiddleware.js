exports.validateBlog = (req, res, next) => {
    const { title, body } = req.body;
    if (!title || !body) return res.status(400).json({ message: 'Title and body are required' });
    next();
  };
  