const express = require('express');
const Users = require('./userDb')
const router = express.Router();
const Post = require("../posts/postDb")





router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      console.log(error.message)
      res.status(500).json({ message: "user not added" })
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const newPost = req.body
  Post.insert(newPost)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(error => {
      console.log(error.message)
      res.status(500).json({ message: "post not added" })
    })
});

router.get('/', (req, res) => {
  Users.get()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "nothing to grab" })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  const { id } = req.params
  Users.getById(id)
    .then(e => {
      res.status(200).json(e)
    })
    .catch(error => {
      console.log(error.message)
      res.status(500).json({ message: "user not found" })
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  const { id } = req.params
  Users.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      console.log(error.message)
      res.status(500).json({ message: "no posts bro" })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  const { id } = req.params
  Users.remove(id)
    .then(deletedStuff => {
      res.status(200).json(deletedStuff)
    })
    .catch(error => {
      console.log(error.message)
      res.status(500).json({ message: "delete not deleted" })
    })
});

router.put('/:id', validateUserId, (req, res) => {
  const { id } = req.params
  Users.update(id, req.body)
    .then(e => {
      if (e === 1) {
        res.status(201).json({ message: "updated" })
      }
      else {
        res.status(400).json({ message: "not updated" })
      }
    })
    .catch(error => {
      console.log(error.message)
      res.status(500).json({ message: "does not compute" })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params
  Users.getById(id)
    .then(userId => {
      if (userId) {
        req.id = userId;
        next()
      }
      else {
        res.status(404).json({ message: "not a valid id dude" })
      }
    })
}

function validateUser(req, res, next) {
  const user = req.body;

  if (!user.name) {
    res.status(400).json({ message: "name is required " })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  const post = req.body;

  if (!post.text) {
    res.status(400).json({ message: "name is required " })
  } else {
    next()
  }
}


module.exports = router;
