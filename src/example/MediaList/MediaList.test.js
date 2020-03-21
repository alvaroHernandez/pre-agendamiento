import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks();

import React from 'react'
import {render, fireEvent, screen, waitForElement} from '@testing-library/react'
import MediaList from "./MediaList";


test('shows media information after fetching data from api', async () => {
    fetch.mockResponse( req =>
        Promise.resolve(
            JSON.stringify(
                [
                    {
                        "Name":"X-Men: The Last Stand",
                        "Year":"2006","Type":"movie",
                        "Image":"https://m.media-amazon.com/images/M/MV5BZmIyMDk5NGYtYjQ5NS00ZWQxLTg2YzQtZDk1ZmM4ZDBlN2E3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL__QL50.jpg"},
                    {
                        "Name":"The Last Airbender",
                        "Year":"2010",
                        "Type":"movie",
                        "Image":"https://m.media-amazon.com/images/M/MV5BMTM1NjE0NDA0MV5BMl5BanBnXkFtZTcwODE4NDg1Mw@@._V1_UX182_CR0,0,182,268_AL__QL50.jpg"
                    }
                ])
        )
    );
    render(<MediaList title={"someTitle"} api={"someApi"}/>)
    const mediaTitle = await waitForElement(() => screen.getByText('Last Stand'));
    expect(screen.queryByText("someTitle")).toBeInTheDocument();
});
