const postsRouter = require('express').Router()

// handle fetching user posts based on user ID
postsRouter.get('/:uid', (req, res) => {
    const userId = req.params.uid;
    const sql = `select * from UserPost where uid = ? OR uid IN ((select friendID from UserFriend where uid = ?)) ORDER BY date DESC;`;
  
    db.query(sql, [userId, userId], (err, results) => {
      if (err) {
        console.error('Error executing query: ', err);
        res.status(500).json({ message: 'Error fetching data' });
      } else {
        res.status(200).json(results);
      }
    });
  });

// handle the creation of a new post
postsRouter.post('/', (req, res)=> {
    //get data from forms and add to userposts table
    const { uid, username, content, photo, song_name, album_name, date, time } = req.body;
    const sql = `insert into UserPost (uid, username, content, photo, song_name, album_name, date, time)
                values (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [uid, username, content, photo, song_name, album_name, date, time], (err, results)=> {
        if(err){
            console.error("Error inserting data: ", err);
            res.status(500).send("Error inserting data")
        }
        else{
            console.log("Successfully Inserted Post into Database!");
            res.status(200).send("Data inserted successfully")
        }
    })
})

module.exports = postsRouter