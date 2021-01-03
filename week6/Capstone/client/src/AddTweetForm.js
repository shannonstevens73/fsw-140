import React, { useState } from 'react'

function AddTweetForm(props){
    const initInputs = { twitterName: props.twitterName || "", tagName: props.tagName || "", tweet: props.tweet || "" }
    const [inputs, setInputs] = useState(initInputs)

    function handleChange(e){
        const { name, value } = e.target
        setInputs(prevInputs => ({...prevInputs, [name]: value}))
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(inputs, props)
        props.submit(inputs, props.ID)
        setInputs(initInputs)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Post a Tweet</h3>        
            
            <input
                id="twitterName"
                type="text"
                name="twitterName"
                value={inputs.twitterName}
                onChange={handleChange}
                placeholder="name"/>
                
            
            <input
                id="tagName"
                type="text"
                name="tagName"
                value={inputs.tagName}
                onChange={handleChange}
                placeholder="@tagName"/>

            <br /><br />

            <textarea
                id="tweetText"
                name="tweet"
                value={inputs.tweet}
                onChange={handleChange}
                placeholder="tweet"
            ></textarea>

            <br /><br />                   

            <button id="addTwitterButton">{props.buttonText}</button>
        </form>
    )

}

export default AddTweetForm