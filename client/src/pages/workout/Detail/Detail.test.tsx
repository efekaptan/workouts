import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import WorkoutDetail from './Detail';
import { Context, State } from '../../../context';
import { BrowserRouter } from 'react-router-dom';
import { MOCK_CONTEXT, MOCK_DATA } from '../mock';
import { getByTestId } from '../../../utils/text';
import { getMockedHttp } from '../../../utils/test';

jest.mock('axios');
let container: HTMLElement;
const MOCK_WORKOUT = MOCK_DATA[0][0];
let mockedHttp = getMockedHttp(MOCK_WORKOUT);

function renderer(value: State, container: Element) {
    render(
        <Context.Provider value={value}>
            <BrowserRouter>
                <WorkoutDetail />
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

test('should render detail page', async () => {
    await act(async () => {
        renderer(MOCK_CONTEXT, container);
    });

    const detail = container.querySelector('#workout-detail');
    expect(getByTestId(detail, 'name')?.textContent).toEqual(MOCK_WORKOUT.name);
    expect(getByTestId(detail, 'description')?.textContent).toEqual(MOCK_WORKOUT.description);
});