import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import WorkoutBox from '../../../components/WorkoutBox';
import Select from '../../../components/Select';
import MultiSelect from '../../../components/MultiSelect';
import Workout from '../workout';
import useStyles from './style';
import { findAll, WorkoutsSearch } from '../api';
import { categories, pageSize } from '../../../config';
import { Pagination } from '@material-ui/lab';
import { getMonths } from '../../../utils/date';

export default function List() {
    const classes = useStyles();
    const [workouts, setWorkouts] = useState([] as Workout[]);
    const [recordCount, setRecordCount] = useState(0);
    const pageCount = Math.ceil(recordCount / pageSize);
    const [workoutsSearch, setWorkoutsSearch] = useState<WorkoutsSearch>({ pageIndex: 1 });

    useEffect(() => {
        (async () => {
            const { workouts, recordCount } = await findAll(workoutsSearch);
            setWorkouts(workouts);
            setRecordCount(recordCount)
        })();
    }, [workoutsSearch]);

    function onMonthSelect(month: number) {
        setWorkoutsSearch({
            ...workoutsSearch,
            pageIndex: 1,
            month
        });
    }

    function onCategoriesSelect(categories: string[]) {
        setWorkoutsSearch({
            ...workoutsSearch,
            pageIndex: 1,
            categories
        });
    }

    function onPageSelect(pageIndex: number) {
        setWorkoutsSearch({
            ...workoutsSearch,
            pageIndex
        });
    }

    return (
        <>
            <Box mb={4}>
                <Select
                    label="Month"
                    options={getMonths()}
                    value={workoutsSearch.month}
                    onChange={onMonthSelect}
                />
                <Box ml={2} display="inline">
                    <MultiSelect
                        label="Categories"
                        options={categories}
                        value={workoutsSearch.categories}
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
                        page={workoutsSearch.pageIndex}
                        count={pageCount}
                        color="primary"
                        onChange={((event, page) => onPageSelect(page))} />
                </Grid>
            }
        </>
    )
}