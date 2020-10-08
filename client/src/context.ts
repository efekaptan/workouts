import React, { Dispatch, SetStateAction } from 'react';
import Workout from './pages/workout/workout';

export interface Search {
    month?: number;
    categories?: string[];
    pageIndex: number
}

export interface State {
    workouts: Workout[],
    setWorkouts: Dispatch<SetStateAction<Workout[]>>;
    search: Search,
    setSearch: Dispatch<SetStateAction<Search>>;
}

const emptyState: State = {
    workouts: [],
    setWorkouts: () => { },
    search: { pageIndex: 1 },
    setSearch: () => { }
}

export const Context = React.createContext<State>(emptyState);