import React from 'react'
import styles from './IconButton.module.css'
const IconButton = ({ icon: Icon, ...props }) => {
    return (
        <button className={`${styles.iconButton}`} {...props}>
            {<Icon className = {`${styles.icon}`}/>}
        </button>
    )
}

export default IconButton