const express = require("express")       
const tweetRouter = express.Router()
const uuid = require("uuid/v4")

// Data for tweets
const tweet = [
    { 
        twitterName: "Angel Fire", 
        tagname: "@girlonfire",
        tweet: "It is a beautiful and HOT day in Louisiana.",
        _id: uuid() 
    },

    { 
        twitterName: "Lord Austin", 
        tagname: "@hisKingship",
        tweet: "Bow before me, or feel my wrath!! Who wants to play World of Warcraft?",
        _id: uuid() 
    },

    { 
        twitterName: "Fighter Jane", 
        tagname: "@ninjaGirl",
        tweet: "I'm off to MA class. Life is good!!",
        _id: uuid() 
    }   
]

// Get
tweetRouter.get("/", (req, res) => {
    res.status(200).send(tweet)
    (err => console.log(err.response.data.errMsg))
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
    const newTweet = req.body
    newTweet._id = uuid()
    tweet.push(newTweet)
    res.status(201).send(newTweet)
})

// Delete
tweetRouter.delete("/:tweetId", (req, res) => {
    const tweetId = req.params.tweetID
    const tweetIndex = tweet.findIndex(tweet => tweet._id === tweetId)
    tweet.splice(tweetIndex, 1)
    res.send("Successfully deleted tweet!")
})

// Put
tweetRouter.put("/:tweetId", (req, res) => {
    const tweetId = req.params.tweetId
    const updatedObject = req.body
    const tweetIndex = tweet.findIndex(tweet => tweet._id === tweetId)
    const updatedTweet = Object.assign(tweet[tweetIndex], updatedObject)
    res.status(201).send(updatedTweet)
})

module.exports = tweetRouter