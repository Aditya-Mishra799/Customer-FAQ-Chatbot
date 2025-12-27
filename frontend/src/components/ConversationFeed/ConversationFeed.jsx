import React from 'react'
import styles from './ConversationFeed.module.css'
import AgentResponse from '../AgentResponse/AgentResponse';
import UserQuery from '../UserQuery/UserQuery';
const chatFeed = [
   
];

const ConversationFeed = () => {
    return (
        <div className={`${styles.conversationFeed}`}>
            {chatFeed.map(({ id, role, content, timestamp }) => (
                role === "agent" ?
                    <AgentResponse key={id} text={content} /> :
                    <UserQuery key={id} text={content} />))}
        </div>
    )
}

export default ConversationFeed