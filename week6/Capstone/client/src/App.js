import React, { useState, useEffect } from 'react'  
import axios from 'axios'
import Tweet from './Tweet.js'
import AddTweetForm from './AddTweetForm'

function App() {
  const [tweet, setTweet] = useState([])

  function getTweet(){
    axios.get("/tweet")
      .then(res => setTweet(res.data))
      .catch(err => console.log(err))
  } 

  function addTweet(newTweet){
    axios.post("/tweet", newTweet)
      .then(res => {
        setTweet(prevTweet => [...prevTweet, res.data])
      })
      .catch(err => console.log(err))
  }

  function deleteTweet(tweetId){
    axios.delete(`/tweet/${tweetId}`)
      .then(res => {
        setTweet(prevTweet => prevTweet.filter(tweet => tweet._id !== tweetId))
      })
      .catch(err => console.log(err))
  }

  function editTweet(updates,tweetId){
    axios.put(`/tweet/${tweetId}`, updates)
      .then(res => {
        setTweet(prevTweet => prevTweet.map(tweet => tweet._id !== tweetId ? tweet : res.data))
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getTweet()
  }, [])  

  return (
    <div>
        <div className="tweetContainer">
          <AddTweetForm
            submit={addTweet} 
            buttonText="Post Tweet"
          />
         { tweet.map(tweet => 
            <Tweet 
              {...tweet} 
              key={tweet.twitterName}
              deleteTweet={deleteTweet}
              editTweet={editTweet}/>)
          }
        </div>
    </div>
  )
}

export default App
