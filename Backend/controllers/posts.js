const postsRouter = require('express').Router()
const Post = require('../models/post')

// gets all posts in database
postsRouter.get('/', async (req, res)=> {
  const posts = await Posts.find({})

  res.json(posts)
})

// get specific post by id
postsRouter.get('/:id', async (req, res) => {
  const id = req.params.id

  const post = Post.findById({ _id: id })
  post ? 
    res.json(post) :
    res.status(404).send({ error: `Could not find post with ID: ${id}.`})
})

// // handle the creation of a new post
// postsRouter.post('/', (req, res)=> {
//     //get data from forms and add to userposts table
//     const { uid, username, content, photo, song_name, album_name, date, time } = req.body;
//     const sql = `insert into UserPost (uid, username, content, photo, song_name, album_name, date, time)
//                 values (?, ?, ?, ?, ?, ?, ?, ?)`;
//     db.query(sql, [uid, username, content, photo, song_name, album_name, date, time], (err, results)=> {
//         if(err){
//             console.error("Error inserting data: ", err);
//             res.status(500).send("Error inserting data")
//         }
//         else{
//             console.log("Successfully Inserted Post into Database!");
//             res.status(200).send("Data inserted successfully")
//         }
//     })
// })

module.exports = postsRouter