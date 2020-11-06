import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardMedia, CardContent, Chip, Grid, Typography } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import useStyles from './style';
import Workout from '../workout';
import { findOne } from '../api';
import { format } from '../../../utils/date';

export default function Detail() {
    const classes = useStyles();
    const [workout, setWorkout] = useState<Workout>();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        (async () => {
            const workout = await findOne(parseInt(id));
            setWorkout(workout);
        })();
    }, [id]);

    if (!workout) {
        return null;
    }

    return (
        <Card id="workout-detail">
            <CardMedia
                image={workout.image}
                title={workout.name}
                className={classes.media} />
            <CardContent>
                <Typography className={classes.name} data-testid="name">
                    {workout.name}
                </Typography>
                <Typography className={classes.description} data-testid="description">
                    {workout.description}
                </Typography>
                <Grid container alignItems="flex-start" direction="row">
                    <Typography className={classes.startDate}>{format(workout.startDate)}</Typography>
                    <Chip className={classes.category} label={workout.category} size="small" />
                </Grid>
            </CardContent>
            <CardActions>
                <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                    <Link to="/workouts" className={classes.link}>
                        <Button variant="contained" color="primary" size="small">BACK TO WORKOUTS</Button>
                    </Link>
                </Grid>
            </CardActions>
        </Card>
    )
}