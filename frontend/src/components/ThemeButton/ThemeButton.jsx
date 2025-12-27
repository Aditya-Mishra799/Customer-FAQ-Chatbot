import React, { useEffect, useState } from 'react'
import styles from './ThemeButton.module.css'
import { Sun, MoonIcon } from 'lucide-react'
const ThemeButton = () => {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };
    useEffect(()=>{
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme])
    return (
        <button className={styles.themeButton} onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'light' ?
                <Sun className={styles.themeIcon}  /> :
                <MoonIcon className={styles.themeIcon} />}
        </button>
    )
}

export default ThemeButton