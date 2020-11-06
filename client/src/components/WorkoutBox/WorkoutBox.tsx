import React from 'react';
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import useStyles from './style';
import { truncate } from '../../utils/text';

interface Props {
    image: string;
    name: string;
    description: string;
}

export default function WorkoutBox({ image, name, description }: Props) {
    const classes = useStyles();

    return (
        <Card className="workout-box">
            <CardMedia
                image={image}
                title={name}
                className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography className={classes.name} data-testid="name">
                    {name}
                </Typography>
                <Typography className={classes.description} data-testid="description">
                    {truncate(description, 60)}
                </Typography>
            </CardContent>
        </Card>
    )
}