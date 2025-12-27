import { ArrowUp } from 'lucide-react'
import React, { useRef } from 'react'
import SendButton from './SendButton/SendButton'
import styles from './PromptInput.module.css'
import { useState } from 'react'
import Loading from '../Loading/Loading'

const PromptInput = ({ placeholder = "Ask your query....", onSubmit, ...props }) => {
  const textAreaRef = useRef(null)
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)
  const autoGrow = () => {
    const el = textAreaRef.current;
    el.style.height = "auto"
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValue("");
    setLoading(true);
    await onSubmit(value);
    setLoading(false);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  }

  return (
    <div className={`${styles.promptInput}`}>
      <textarea
        ref={textAreaRef}
        onInput={autoGrow}
        rows={1}
        placeholder={placeholder}
        {...props} value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <SendButton
        icon={loading ?
          <Loading size={24} /> : <ArrowUp />}
        onClick={handleSubmit}
        disabled={value.trim().length < 5 || loading}
      />
    </div>
  )
}

export default PromptInput