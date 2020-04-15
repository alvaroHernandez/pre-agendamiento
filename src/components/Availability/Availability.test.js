import React from 'react';
import { render } from '@testing-library/react';
import Availability from './Availability';
import {disableFetchMocks, enableFetchMocks} from 'jest-fetch-mock';
import {act} from 'react-dom/test-utils'; 



const disponibilidad = 
        [
            {
                "date":"2020-04-15T20:40:01.9205374+00:00",
                "hourFrom":10,
                "hourTo":11
            },
            {
                "date":"2020-04-15T20:40:01.9205443+00:00",
                "hourFrom":12,
                "hourTo":13
            },
            {
                "date":"2020-04-15T20:40:01.9205515+00:00",
                "hourFrom":15,
                "hourTo":16
            }
        ]
;

beforeAll(()=>{
    enableFetchMocks();
    fetch.mockResponse( req =>
        Promise.resolve(
            JSON.stringify(disponibilidad)
        )
    );
});

afterAll(()=>{
    disableFetchMocks();
});

test('renders hourFrom', async () => {
    let renderTitle;
    act(() => { 
        renderTitle = render(<Availability />)
    });
  const hour = await renderTitle.findByText(/10/i);
  expect(hour).toBeInTheDocument();
});
