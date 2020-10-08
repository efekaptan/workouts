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
            fontSize: 14,
        },
        startDate: {
            fontSize: 12,
            fontWeight: 'bold',
            marginTop: theme.spacing(1),
            alignContent: 'right'
        },
        link: {
            textDecoration: 'none',
            marginBottom: theme.spacing(1)
        },
        category: {
            margin: '5px 0 0 10px'
        }
    }),
);
