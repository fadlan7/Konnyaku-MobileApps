import { colors } from "./colors";
import { typography } from "./typography";

export const lightTheme = {
    colors: {
        ...colors,
        background: '#ffffff',
        text: '#2a2a2a',
    },
    typography,
};

export const darkTheme = {
    colors: {
        ...colors,
        background: '#121212',
        text: '#fffffe',
    },
    typography,
};