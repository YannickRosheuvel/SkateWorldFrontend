import React, { useState } from 'react';

const ChatInput = (props) => {
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const isMessageProvided = message && message !== '';

        if (isMessageProvided) {
            props.sendMessage(message);
            e.target.reset();
        } 
        else {
            alert('Please insert an user and a message.');
        }
    }

    const onUserUpdate = (e) => {
        setUser(e.target.value);
    }

    const onMessageUpdate = (e) => {
        setMessage(e.target.value);
    }

    return (
        <form 
            onSubmit={onSubmit}>
            <label htmlFor="message">Message:</label>
            <br />
            <input data-testid="message"
                type="text"
                id="message"
                name="message" 
                value={message}
                onChange={onMessageUpdate} />
            <br/><br/>
            <button data-testid="button1">Submit</button>
        </form>
    )
};

export default ChatInput;