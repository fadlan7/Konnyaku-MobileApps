import React, { useContext, useState } from 'react'
import { darkTheme, lightTheme } from '../shared/constant/theme';

const Context = React.createContext({});

function ThemeContextProvider({ children }) {
    const [theme, setTheme] = useState(lightTheme);

    const switchTheme = () => {
        setTheme(theme === lightTheme ? darkTheme : lightTheme);
    }

    return (
        <Context.Provider value={{ theme, switchTheme, }}>
            {children}
        </Context.Provider>
    )
}

export const useTheme = () => useContext(Context);

export default ThemeContextProvider;