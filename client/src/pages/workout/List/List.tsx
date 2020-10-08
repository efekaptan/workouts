import React, { useEffect, useContext, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import WorkoutBox from '../../../components/WorkoutBox';
import Select from '../../../components/Select';
import MultiSelect from '../../../components/MultiSelect';
import useStyles from './style';
import { findAll } from '../api';
import { categories, pageSize } from '../../../config';
import { Pagination } from '@material-ui/lab';
import { getMonths } from '../../../utils/date';
import { Context, State } from '../../../context';

export default function List() {
    const classes = useStyles();

    const [recordCount, setRecordCount] = useState(0);
    const pageCount = Math.ceil(recordCount / pageSize);

    const { workouts, setWorkouts, search, setSearch } = useContext<State>(Context);

    useEffect(() => {
        (async () => {
            const { workouts, recordCount } = await findAll(search);
            setWorkouts(workouts);
            setRecordCount(recordCount)
        })();
    }, [search, setWorkouts]);

    function onMonthSelect(month: number) {
        setSearch({
            ...search,
            pageIndex: 1,
            month
        });
    }

    function onCategoriesSelect(categories: string[]) {
        setSearch({
            ...search,
            pageIndex: 1,
            categories
        });
    }

    function onPageSelect(pageIndex: number) {
        setSearch({
            ...search,
            pageIndex
        });
    }

    return (
        <>
            <Box mb={4}>
                <Select
                    label="Month"
                    options={getMonths()}
                    value={search.month}
                    onChange={onMonthSelect}
                />
                <Box ml={2} display="inline">
                    <MultiSelect
                        label="Categories"
                        options={categories}
                        value={search.categories}
                        onChange={onCategoriesSelect} />
                </Box>
            </Box>
            <Grid container spacing={2}>
                {workouts.map((workout) =>
                    <Grid key={workout.id} item xs={12} sm={6} md={3}>
                        <Link to={`/workout/${workout.id}`} className={classes.link}>
                            <WorkoutBox
                                image={workout.image}
                                name={workout.name}
                                description={workout.description} />
                        </Link>
                    </Grid>
                )}
            </Grid>

            {pageCount > 1 &&
                <Grid className={classes.pagination} container direction="row" justify="center" alignItems="center">
                    <Pagination
                        page={search.pageIndex}
                        count={pageCount}
                        color="primary"
                        onChange={((event, page) => onPageSelect(page))} />
                </Grid>
            }
        </>
    )
}