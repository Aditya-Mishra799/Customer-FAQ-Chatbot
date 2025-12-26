import React from 'react'
import styles from './ConversationFeed.module.css'
import AgentResponse from '../AgentResponse/AgentResponse';
import UserQuery from '../UserQuery/UserQuery';
const chatFeed = [
   
];

const ConversationFeed = () => {
    return (
        <div className={`${styles.conversationFeed}`}>
            {chatFeed.map(({ id, type, text, timestamp }) => (
                type === "agent" ?
                    <AgentResponse key={id} text={text} /> :
                    <UserQuery key={id} text={text} />))}
        </div>
    )
}

export default ConversationFeed