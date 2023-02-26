import { extendTheme, theme } from "@chakra-ui/react"

const colors = {
    "black": "#303030",
    "white": "#f8f6ef",
    "off-white": "#c2beb2",

    "dark-yellow": "#ffb800",
    "yellow": "#ffcd38",
    "off-yellow": "#ffdc80",

    "card-bg": "242731",
    "card-border": "#2d313e"
};

export default extendTheme({
    ...theme,
    colors,
});