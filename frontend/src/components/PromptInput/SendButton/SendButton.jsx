import React from 'react'
import styles from './SendButton.module.css'
const SendButton = ({icon: Icon, className = "", ...props}) => {
  return (
    <button className={`${styles.sendButton} center ${className}`} {...props}>
      {<Icon />}
    </button>
  )
}

export default SendButton