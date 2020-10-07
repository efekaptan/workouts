import { createStyles, makeStyles, Theme } from "@material-ui/core";

export default makeStyles((theme: Theme) =>
    createStyles({
        link: {
            textDecoration: 'none'
        },
        pagination: {
            marginTop: theme.spacing(4)
        }
    }),
);