const express = require("express")       
const tweetRouter = express.Router()

const mysql = require("mysql");
//Create a MySQL Connection Handshake using a Connection String
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'endTimesNow5656',
        database: 'fssql'
    }
);
 
db.connect((err) => {
    if (err)
    {
        throw err;
    }
    console.log("MySQL Database Connection Established Successfully!");
});

// Get
tweetRouter.get("/", (req, res) => {
    let sql = "SELECT * FROM tweet";

    //Run the SQL Command
    db.query(sql, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send(result);
    })
})

// Get One
// tweetRouter.get("/:tweetId", (req, res, next) => {
//     const tweetId = req.params.tweetId
//     const foundTweet = tweet.find(tweet => tweet._id === tweetId)
//     if(!foundTweet){
//         const error = new Error(`The item with id ${tweetId} was not found.`)
//         res.status(500)
//         return next(error)
//     }
//     res.status(200).send(foundTweet)
// })

// Query
// tweetRouter.get("/search/tagname", (req, res, next) => {
//     const tagname = req.query.tagname
//     if(!tagname){
//         const error = new Error("You must provide a tagname")
//         res.status(500)
//         return next(error)
//     }
//     const filteredTweet = tweet.filter(tweet => tweet.genre === genre)
//     res.status(200).send(filteredTweet)
// })

// Post
tweetRouter.post("/", (req, res) => {
    const {twitterName, tagName, tweet} = req.body
    let sql = `INSERT INTO tweet (twitterName, tagName, tweet) VALUES ('${twitterName}', '${tagName}', '${tweet}')`

    //Run the SQL Command
    let query = db.query(sql, req.body, (err, result) => {
        if (err){
            throw err;
        }        
        console.log(result);
        let twitterGet = `SELECT * FROM tweet ORDER BY ID DESC LIMIT 1;`
        db.query(twitterGet, (err, result) => {
            if (err){
                throw err;
            }
        res.send(result);
    })})
});
       



// Delete
tweetRouter.delete("/:ID", (req, res) => {
    const ID = req.params.ID
    let sql = `DELETE FROM tweet WHERE ID IN(${ID});`

    //Run the SQL Command
    db.query(sql, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        res.send(result);
    })
   
})

// Put
tweetRouter.put("/:ID", (req, res) => {
    const ID = req.params.ID
    console.log(ID,'IMID')
    console.log(req.body)
    const {twitterName, tagName, tweet} = req.body
    let sql = `UPDATE tweet SET twitterName = '${twitterName}', tagName = '${tagName}', tweet = '${tweet}'WHERE ID = '${ID}';`

    //Run the SQL Command
    db.query(sql, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        let twitterGet = `SELECT * FROM tweet WHERE ID IN(${ID}) ORDER BY ID DESC LIMIT 1;`
        db.query(twitterGet, (err, result) => {
            if (err){
                throw err;
            }
            console.log(result, 'for put')
        res.status(200).send(result);
    })})
})

module.exports = tweetRouter