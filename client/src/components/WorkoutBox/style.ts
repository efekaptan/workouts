import { createStyles, makeStyles, Theme } from "@material-ui/core";

export default makeStyles((theme: Theme) =>
    createStyles({
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9 ratio
        },
        name: {
            fontSize: 16,
            color: theme.palette.primary.main
        },
        description: {
            fontSize: 12,
            fontWeight: 'bold'
        }
    }),
);