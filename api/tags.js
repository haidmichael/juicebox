const express = require('express');
const tagsRouter = express.Router();
const { getPostsByTagName, client } = require('../db')

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    // read the tagname from the params
    try {
      // use our method to get posts by tag name from the db
      const posts = await getPostsByTagName(req.params.tagName);
      // send out an object to the client { posts: // the posts }

        res.send({
            posts: posts
        });
    } catch ({ name, message }) {
      // forward the name and message to the error handler
      next({ name, message });
    }
  });