import theme from "./theme";

const style = {
    content: {
        [theme.breakpoints.up("sm")]: {
            margin: theme.spacing(10)
        },
    },
    filters: {
        display: "flex",
        flexDirection: "row",
        margin: "10",
        [theme.breakpoints.down("md")]: {
            display: "flex",
            flexDirection: "column",
            margin: theme.spacing(10)
        }
    },
    table: {
        display: "flex",
        flexDirection: "column",
    },
    changeOrgButton: {
        textTransform: 'none',
       // height: 56,
        width: 300,
        color: 'grey',
    },
}

export default style;