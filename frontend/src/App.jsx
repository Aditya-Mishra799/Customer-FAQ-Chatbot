import { useState } from 'react'
import "./styles/global.css";
import PromptInput from './components/PromptInput/PromptInput';
import ConversationFeed from './components/ConversationFeed/ConversationFeed';

function App() {

  return (
    <div className='page'>
      <ConversationFeed />
      <PromptInput/>
    </div>
  )
}

export default App
