const albumsRouter = require('express').Router()
const Album = require('../models/album')

// get all albums in database
albumsRouter.get('/', async (req, res)=> {
    const albums = await Album.find({}).populate('artist')

    res.json(albums)
})

// get specific album by id
albumsRouter.get('/:id', async (req, res) => {
  const id = req.params.id

  const album = Album.findById({ _id: id })
  album ? 
    res.json(album) :
    res.status(404).send({ error: `Could not find album with ID: ${id}.`})
})

// // create new album
// albumsRouter.post('/', (req, res)=> {
//     //get data from forms and add to artists table
//     var { name, artist, description, photo, releaseDate } = req.body;
//     if(!photo){
//         photo = 'default.jpg'
//     }
//     const sql = `insert into Album (name, artist, description, photo, releaseDate)
//                 values (?, ?, ?, ?, ?)`;
//     db.query(sql, [name, artist, description, photo, releaseDate], (err, results)=> {
//         if(err){
//             console.error("Error inserting data: ", err);
//             res.status(500).send("Error inserting data")
//         }
//         else{
//             console.log("Successfully Inserted Album into Database!");
//             res.status(200).send("Album inserted successfully")
//         }
//     }) 
// })

// // get top 3 highest rated albums (on average)
// albumsRouter.get('/topthree', (req, res)=> {
//   const sql = "select * from Album INNER JOIN(SELECT album, AVG(rating) AS average_rating FROM listenedlist GROUP BY album ORDER BY average_rating DESC LIMIT 3) as T ON Album.name = T.album";
//   db.query(sql, (err, data) => {
//       if(err) return res.json(err);
//       return res.json(data);
//   })
// })

// // get 3 most recently released albums
// albumsRouter.get('/new', (req, res)=> {
//   const sql = "select * from Album ORDER BY releaseDate DESC LIMIT 3;";
//   db.query(sql, (err, data) => {
//       if(err) return res.json(err);
//       return res.json(data);
//   })
// })

module.exports = albumsRouter