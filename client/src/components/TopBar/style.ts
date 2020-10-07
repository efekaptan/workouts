import { createStyles, makeStyles, Theme } from "@material-ui/core";

export default makeStyles((theme: Theme) =>
    createStyles({
        logo: {
            width: 45
        },
        appBar: {
            backgroundColor: theme.palette.primary.contrastText
        },
        link: {
            textDecoration: 'none'
        },
        text: {
            color: theme.palette.text.primary,
            fontSize: 14,
            fontWeight: 'bold',
            marginLeft: theme.spacing(2),
        }
    }),
);