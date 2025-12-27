import { useState } from 'react'
import "./styles/global.css";
import PromptInput from './components/PromptInput/PromptInput';
import ConversationFeed from './components/ConversationFeed/ConversationFeed';
import { useEffect } from 'react';
import { apiUrls, BASE_URL } from './utils/apiUrls';
import Header from './components/Header/Header';

function App() {
  const [chatFeed, setChatFeed] = useState([])
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 50;

  const fetchConversation = async (offset = 0) => {
    try {
      const response = await fetch(`${BASE_URL}${apiUrls.getConversation}?offset=${offset}&limit=${limit}`, {
        credentials: 'include',
        method: 'GET',
      });
      const json = await response.json();
      return { data: json.data, hasMore: json.hasMore };
    } catch (error) {
      console.error("Error fetching conversation:", error);
      return { data: [], hasMore: false };
    }
  };

  const loadMoreChats = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const offset = chatFeed.length;
    const { data: newChats, hasMore: more } = await fetchConversation(offset);
    setChatFeed(prev => [...newChats, ...prev]);
    setHasMore(more);
    setLoading(false);
  };

  useEffect(() => {
    const loadInitial = async () => {
      const { data, hasMore: more } = await fetchConversation(0);
      setChatFeed(data);
      setHasMore(more);
    };
    loadInitial();
  }, [])


  const handleNewMessage = async (newMessage) => {
    if (newMessage.length < 5) return;
    setChatFeed((prevChatFeed) => [
      ...prevChatFeed,
      { id: Date.now(), role: 'user', content: newMessage, created_at: new Date().toISOString() }
    ]);
    // send the new message to backend and accept the response stream
    try {
      const response = await fetch(BASE_URL + apiUrls.addMessageToConversation, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let assistantMessage = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        assistantMessage += chunk;
        setChatFeed((prevChatFeed) => {
          const updatedFeed = [...prevChatFeed];
          // Check if last message is from assistant
          if (updatedFeed.length > 0 && updatedFeed[updatedFeed.length - 1].role === 'assistant') {
            // Update existing assistant message
            updatedFeed[updatedFeed.length - 1].content = assistantMessage;
            updatedFeed[updatedFeed.length - 1].id = Date.now();
          } else {
            // Add new assistant message
            updatedFeed.push({ id: Date.now(), role: 'assistant', content: assistantMessage, created_at: new Date().toISOString() });
          }
          return updatedFeed;
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
  return (
    <div className='app'>
      <div className='page'>
        <Header />
        <ConversationFeed chatFeed={chatFeed} hasMore={hasMore} loading={loading} onLoadMore={loadMoreChats}/>
        <PromptInput onSubmit={handleNewMessage} />
      </div>
    </div>
  )
}

export default App
