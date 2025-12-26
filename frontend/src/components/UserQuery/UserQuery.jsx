import React from 'react'
import styles from "./UserQuery.module.css"
import CopyButton from '../CopyButton/CopyButton'
const UserQuery = ({ text }) => {
  return (
    <div className={`${styles.userQuery}`}>
      <p>
        {text}
      </p>
      <div className={`${styles.controls}`}>
        <CopyButton text={text} />
      </div>
    </div>
  )
}

export default UserQuery