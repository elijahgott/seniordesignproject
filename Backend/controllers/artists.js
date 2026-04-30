const artistsRouter = require('express').Router()
const Artist = require('../models/artist')

// gets all artists in database
artistsRouter.get('/', async (req, res)=> {
  const artists = await Artist.find({})

  res.json(artists || '')
})

// get specific artist by id
artistsRouter.get('/:id', async (req, res) => {
  const id = req.params.id

  const artist = Artist.findById({ _id: id })
  artist ? 
    res.json(artist) :
    res.status(404).send({ error: `Could not find artist with ID: ${id}.`})
})

// create new artist
artistsRouter.post('/', async (req, res) => {
  const {artistName, artistBio, artistPhotoUrl} = req.body
  
  const existingArtist = await Artist.findOne({ name: artistName })

  if(existingArtist){
    return res.status(400).send({ error: 'Artist already exists with name: ' + artistName })
  }

  const artist = new Artist({
    name: artistName,
    bio: artistBio,
    albums: [],
    photoURL: artistPhotoUrl || 'https://www.usab.com/imgproxy/ziarB3UvXnVI_LC7nZ-bQGhvzCd55ihxL9jx7PNKzt4/rs:fit:3000:0:0/g:ce/q:90/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL3VzYWItY29tLXByb2QvdXBsb2FkLzIwMjQvMDcvMDkvZGJkOTVjZWUtNDBlOS00MjBlLWEzZjAtMGI2M2Q3MDczMTk3LmpwZw.png',
  })

  const savedArtist = await artist.save()

  res.status(201).json(savedArtist)
})

// get top 3 rated artists
// artistsRouter.get('/topthree', async (req, res) => {
//   const artists = []


// })

// // handles the insertion of a new artist into the database
// artistsRouter.post('/', (req, res)=> {
//     //get data from forms and add to artists table
//     var { name, bio, photo } = req.body;
//     if(!photo){
//         photo = 'default.jpg'
//     }
//     const sql = `insert into Artist (name, bio, photo)
//                 values (?, ?, ?)`;
//     db.query(sql, [name, bio, photo], (err, results)=> {
//         if(err){
//             console.error("Error inserting data: ", err);
//             res.status(500).send("Error inserting data")
//         }
//         else{
//             console.log("Successfully Inserted Artist into Database!");
//             res.status(200).send("Artist inserted successfully")
//         }
//     })
// })

module.exports = artistsRouter