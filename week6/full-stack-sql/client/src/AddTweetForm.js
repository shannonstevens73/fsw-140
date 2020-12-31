import React, { useState } from 'react'

function AddTweetForm(props){
    const initInputs = { twitterName: props.twitterName || "", tagname: props.tagname || "", tweet: props.tweet || "" }
    const [inputs, setInputs] = useState(initInputs)

    function handleChange(e){
        const { name, value } = e.target
        setInputs(prevInputs => ({...prevInputs, [name]: value}))
    }

    function handleSubmit(e){
        e.preventDefault()
        props.submit(inputs, props._id)
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
                id="tagname"
                type="text"
                name="tagname"
                value={inputs.tagname}
                onChange={handleChange}
                placeholder="@tagname"/>

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