const albumsRouter = require('express').Router()
const Album = require('../models/album')
const Artist = require('../models/artist')

// get all albums in database
albumsRouter.get('/', async (req, res)=> {
    const albums = await Album.find({}).populate('artist')

    res.json(albums || '')
})

// get specific album by id
albumsRouter.get('/:id', async (req, res) => {
  const id = req.params.id

  const album = Album.findById({ _id: id })
  album ? 
    res.json(album) :
    res.status(404).send({ error: `Could not find album with ID: ${id}.`})
})

// create new album
albumsRouter.post('/', async (req, res) => {
  const {albumName, albumArtistName, albumDescription, albumGenres, albumReleaseDate, albumPhotoUrl} = req.body
  
  const artist = await Artist.findOne({ name: albumArtistName })

  if(!artist){
    return res.status(400).send({ error: 'Could not find artist with name: ' + albumName })
  }

  const existingAlbum = await Album.findOne({ name: albumName, artist: artist._id })

  if(existingAlbum){
    return res.status(400).send({ error: 'Album ' + albumName + ' by ' + albumArtistName + ' already exists!'})
  }

  const album = new Album({
    name: albumName,
    artist: artist._id,
    description: albumDescription,
    genres: albumGenres.split(',').map(g => g.trim()),
    photoURL: albumPhotoUrl || 'https://www.usab.com/imgproxy/ziarB3UvXnVI_LC7nZ-bQGhvzCd55ihxL9jx7PNKzt4/rs:fit:3000:0:0/g:ce/q:90/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL3VzYWItY29tLXByb2QvdXBsb2FkLzIwMjQvMDcvMDkvZGJkOTVjZWUtNDBlOS00MjBlLWEzZjAtMGI2M2Q3MDczMTk3LmpwZw.png',
    releaseDate: albumReleaseDate
  })

  const savedAlbum = await album.save()

  res.status(201).json(savedAlbum)
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