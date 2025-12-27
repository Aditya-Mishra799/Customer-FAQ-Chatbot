import React from 'react'
import styles from './Header.module.css'
import ThemeButton from '../ThemeButton/ThemeButton';
const Header = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Customer Support Chatbot</h1>
      <ThemeButton />
    </div>
  )
}

export default Header