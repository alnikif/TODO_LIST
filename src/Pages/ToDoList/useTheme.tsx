import {useContext} from "react";
import {ThemeContext} from "../../Providers/ThemeProvider";
import {themes} from "../../constants/theme";

const themesOptions = themes.map(({key, title}) => ({
    id: key, label: title
}));

const useTheme = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    return {
        theme,
        themesOptions,
        onChangeTheme: setTheme,
    }
};

export default useTheme;