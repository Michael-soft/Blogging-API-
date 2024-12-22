module.exports = (body) => {
    const wordsPerMinute = 200;
    const words = body.split(" ").length;
    return `${Math.ceil(words / wordsPerMinute)} min read`;
  };
  