import React from 'react'
import styles from './Loading.module.css'
import { Loader2 } from 'lucide-react'

const Loading = ({size = 32}) => {
  return (
    <div className={`${styles.loading} center-column`}>
      <Loader2 className="animate-spin" size={size} />
    </div>
  )
}

export default Loading