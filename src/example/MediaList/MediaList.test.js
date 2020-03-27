import React from 'react'
import { render, within, fireEvent, waitForElementToBeRemoved} from '@testing-library/react'
import MediaList from "./MediaList";
import {disableFetchMocks, enableFetchMocks} from 'jest-fetch-mock'

const THUMBNAIL_ALT_IMAGE_PREFIX = 'Thumbnail for ';

beforeAll(()=>{
    enableFetchMocks();
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
});

afterAll(()=>{
    disableFetchMocks();
});

test('loader disappear when fetching is completed', async() =>{
    const mediaList = render(<MediaList title={"someTitle"} api={"someApi"}/>);
    await waitForElementToBeRemoved(() => mediaList.getByLabelText("Cargando"));
});

test('show media items when fetching is completed', async () => {
    const mediaList = render(<MediaList title={"someTitle"} api={"someApi"}/>);

    const listItems = await mediaList.findAllByRole('listitem');

    expect(listItems).toHaveLength(2);

    expect(mediaList.getByAltText(`${THUMBNAIL_ALT_IMAGE_PREFIX}X-Men: The Last Stand`)).toBeInTheDocument()
    expect(mediaList.getByAltText(`${THUMBNAIL_ALT_IMAGE_PREFIX}The Last Airbender`)).toBeInTheDocument()
});

test('add movie to favourite when button is clicked', async() => {
    const mediaList = render(<MediaList title={"someTitle"} api={"someApi"}/>);
    const listItems = await mediaList.findAllByRole('listitem');

    const firstMovie = within(listItems[0]);
    fireEvent.click(firstMovie.getByText("Add to favourites"));
    expect(firstMovie.getByText('Remove from favourites')).toBeInTheDocument()
    expect(firstMovie.queryByText("Add to favourites")).not.toBeInTheDocument()
    //maybe only check that other movie button didn't change

    const secondMovie = within(listItems[1]);
    fireEvent.click(secondMovie.getByText("Add to favourites"));
    expect(secondMovie.getByText('Remove from favourites')).toBeInTheDocument()
    expect(secondMovie.queryByText("Add to favourites")).not.toBeInTheDocument()
});
