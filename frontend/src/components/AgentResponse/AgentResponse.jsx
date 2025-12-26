import React from 'react'
import styles from "./AgentResponse.module.css"
import CopyButton from '../CopyButton/CopyButton'
const AgentResponse = ({text}) => {
  return (
    <div className={`${styles.agentResponse}`}>
      <p>
        {text}
      </p>
      <div className={`${styles.controls}`}>
        <CopyButton text={text} />
      </div>
    </div>
  )
}

export default AgentResponse