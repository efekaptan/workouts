import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import moment from 'moment';
import { act } from 'react-dom/test-utils';
import WorkoutList from './List';
import { Context, State } from '../../../context';
import { BrowserRouter } from 'react-router-dom';
import { MOCK_CONTEXT, MOCK_DATA } from '../mock';
import { getByTestId, truncate } from '../../../utils/text';
import { getMockedHttp } from '../../../utils/test';
import { formatMonth } from '../../../utils/date';

jest.mock('axios');
let container: HTMLElement;
let mockedHttp = getMockedHttp(MOCK_DATA);

function renderer(value: State, container: Element) {
    render(
        <Context.Provider value={value}>
            <BrowserRouter>
                <WorkoutList />
            </BrowserRouter>
        </Context.Provider>
        , container);
}

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
});

test('should render workouts', async () => {
    await act(async () => {
        renderer(MOCK_CONTEXT, container);
    });

    const workouts = container.querySelectorAll('.workout-box');
    const workoutElement = workouts[0];
    const firstWorkout = MOCK_DATA[0][0];

    expect(workouts.length).toBe(MOCK_DATA[0].length);
    expect(getByTestId(container, 'pagination')).toBeTruthy();
    expect(getByTestId(workoutElement, 'name')?.textContent).toEqual(firstWorkout.name);
    expect(getByTestId(workoutElement, 'description')?.textContent).toEqual(truncate(firstWorkout.description, 60));
});

test('should hide pagination when there is no data', async () => {
    mockedHttp.get.mockResolvedValue({ data: [[], 0] });

    await act(async () => {
        renderer({ ...MOCK_CONTEXT, workouts: [] }, container);
    });

    expect(getByTestId(container, 'pagination')).toBeFalsy();
});

test('month dropdown should render 12 months', async () => {
    await act(async () => {
        renderer({ ...MOCK_CONTEXT, workouts: [] }, container);
    });

    const monthSelect = getByTestId(container, 'month-select');
    expect(monthSelect).toBeTruthy();

    const button = monthSelect?.querySelector(`[role='button']`);

    act(() => {
        button?.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });

    const monthList = document.body.querySelectorAll(`[role='listbox'] > li`);
    const date = moment();
    const thisMonth = formatMonth(date);
    date.add(11, 'month');
    const lastMonth = formatMonth(date);

    expect(monthList.length).toEqual(13); // Label + 12 months
    expect(monthList[1].textContent).toEqual(thisMonth);
    expect(monthList[12].textContent).toEqual(lastMonth);
});