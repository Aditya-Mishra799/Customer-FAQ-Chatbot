import { ArrowUp } from 'lucide-react'
import React, { useRef } from 'react'
import SendButton from './SendButton/SendButton'
import styles from './PromptInput.module.css'

const PromptInput = ({ placeholder = "Ask your query....", onSubmit, ...props }) => {
  const textAreaRef = useRef(null)
  const autoGrow = () => {
    const el = textAreaRef.current;
    el.style.height = "auto"
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }
  return (
    <div className={`${styles.promptInput}`}>
      <textarea ref={textAreaRef} onInput={autoGrow} rows={1} placeholder={placeholder} {...props} />
      <SendButton icon={ArrowUp} onClick={onSubmit} />
    </div>
  )
}

export default PromptInput