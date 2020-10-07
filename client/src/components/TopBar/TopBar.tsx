import React from 'react';
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import useStyles from './style';
import logo from '../../assets/images/logo.svg';
import { Link } from 'react-router-dom';

export default function TopBar() {
    const classes = useStyles();

    return (
        <AppBar position="relative" className={classes.appBar}>
            <Toolbar>
                <Link to="/">
                    <img id="logo" src={logo} className={classes.logo} alt="logo" />
                </Link>
                <Link to="/" className={classes.link}>
                    <Typography className={classes.text}>
                        Workouts
                </Typography>
                </Link>
            </Toolbar>
        </AppBar>
    )
}