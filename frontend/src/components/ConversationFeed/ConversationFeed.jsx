import React, { useEffect, useRef } from 'react'
import styles from './ConversationFeed.module.css'
import AgentResponse from '../AgentResponse/AgentResponse';
import UserQuery from '../UserQuery/UserQuery';
import Loading from '../Loading/Loading';

const ConversationFeed = ({ chatFeed, onLoadMore, hasMore, loading }) => {
    if ((!chatFeed || chatFeed.length === 0) && !loading) {
        return (
            <div className={`${styles.emptyState}`}>
                <div className={`${styles.emptyCard}`}>
                    <p>No conversation history available.</p>
                    <span>Start by typing your query below!</span>
                </div>
            </div>
        )
    }
    const topSentinelRef = useRef();
    const lastChatIdRef = useRef(null);
    const bottomRef = useRef();

    useEffect(() => {
        if (lastChatIdRef.current !== chatFeed.at(-1)?.id) {
            bottomRef.current?.scrollIntoView({ behavior: "auto" });
            lastChatIdRef.current = chatFeed.at(-1)?.id;
        }
    }, [chatFeed]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                onLoadMore();
            }
        }, { threshold: 1.0 });
        if (topSentinelRef.current) {
            observer.observe(topSentinelRef.current);
        }
        return () => {
            if (topSentinelRef.current) {
                observer.unobserve(topSentinelRef.current);
                observer.disconnect();
            }
        }
    }, [onLoadMore]);

    return (
        <div className={`${styles.conversationFeed}`}>
            {hasMore && <div ref={topSentinelRef} style={{ height: '20px' }}></div>}
            {loading && <div className={`${styles.loadingContainer}`}><Loading /></div>}
            {chatFeed.map(({ id, role, content, created_at }, idx) => (
                role === "assistant" ?
                    <AgentResponse
                        text={content}
                        key={id}
                    /> :
                    <UserQuery
                        text={content}
                        key={id}
                    />))}
            <div ref={bottomRef}></div>
        </div>
    )
}

export default ConversationFeed