import React from 'react';
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import useStyles from './style';

interface Props {
    image: string;
    name: string;
    description: string;
}

export default function WorkoutBox({ image, name, description }: Props) {
    const classes = useStyles();

    function truncate(description: string) {
        return description.length > 60 ? `${description.substr(0, 60)}...` : description;
    }

    return (
        <Card>
            <CardMedia
                image={image}
                title={name}
                className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography className={classes.name}>{name}</Typography>
                <Typography className={classes.description}>{truncate(description)}</Typography>
            </CardContent>
        </Card>
    )
}