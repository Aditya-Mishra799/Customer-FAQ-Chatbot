import React from 'react'
import styles from './SendButton.module.css'
const SendButton = ({icon, className = "", ...props}) => {
  return (
    <button className={`${styles.sendButton} center ${className}`} {...props}>
      {icon}
    </button>
  )
}

export default SendButton