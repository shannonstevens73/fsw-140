import React, { useState } from 'react'        
import AddTweetForm from './AddTweetForm.js'

function Tweet(props) {
    const { twitterName, tagname, tweet, id } = props
    const [editToggle, setEditToggle] = useState(false)
    return (
        <div className="tweet">
            { !editToggle ?
                <>  
                    <span id="boldName">{ twitterName }</span>
                    <span id="tagnameLight"> { tagname }</span>
                    <p id="tweetSpace">{ tweet }</p>
                    <button
                        className="deleteButton"
                        onClick={() => props.deleteTweet(id)}>
                        Delete
                    </button>
                    <button
                        className="editButton"
                        onClick={() => setEditToggle(prevToggle => !prevToggle)}>            
                        Edit
                    </button>
                </>
            :
                <>
                    <AddTweetForm
                        twitterName={twitterName}
                        tagname={tagname}
                        tweet={tweet}
                        id={id}
                        buttonText="Submit Edit"
                        submit={props.editTweet} 
                    />
                    <button id="closeButton"
                        onClick={() => setEditToggle(prevToggle => !prevToggle)}>
                        Close
                    </button>
                </>
            }
        </div>
    )
}



export default Tweet