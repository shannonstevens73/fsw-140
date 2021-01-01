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
tweetRouter.get("/:tweetId", (req, res, next) => {
    const tweetId = req.params.tweetId
    const foundTweet = tweet.find(tweet => tweet._id === tweetId)
    if(!foundTweet){
        const error = new Error(`The item with id ${tweetId} was not found.`)
        res.status(500)
        return next(error)
    }
    res.status(200).send(foundTweet)
})

// Query
tweetRouter.get("/search/tagname", (req, res, next) => {
    const tagname = req.query.tagname
    if(!tagname){
        const error = new Error("You must provide a tagname")
        res.status(500)
        return next(error)
    }
    const filteredTweet = tweet.filter(tweet => tweet.genre === genre)
    res.status(200).send(filteredTweet)
})

// Post
tweetRouter.post("/", (req, res) => {
    const {twitterName, tagname, tweet} = req.body
    let sql = `INSERT INTO tweet (twitterName, tagName, tweet) VALUES ('${twitterName}', '${tagname}', '${tweet}');`

    //Run the SQL Command
    db.query(sql, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        let tweetPost = "SELECT * FROM tweet ORDER BY ID DESC LIMIT 1;"
        db.query(sql, (err, result) => {
            if (err){
                throw err;
            }
        res.status(200).send(result);
    })})
})

// Delete
tweetRouter.delete("/:tweetId", (req, res) => {
    const ID = req.params.tweetID
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
tweetRouter.put("/:tweetId", (req, res) => {
    const ID = req.params.tweetId
    const {twitterName, tagname, tweet} = req.body
    let sql = `UPDATE tweet SET twitterName = '${twitterName}', tagName = '${tagname}', tweet = '${tweet}'
                WHERE ID IN(${ID});`

    //Run the SQL Command
    db.query(sql, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result);
        let tweetPut = `SELECT * FROM tweet WHERE ID IN(${tweetId});`
        db.query(sql, (err, result) => {
            if (err){
                throw err;
            }
        res.status(200).send(result);
    })})

})

module.exports = tweetRouter