import React from "react";
import {
  render,
  within,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import MediaList from "./MediaList";
import { disableFetchMocks, enableFetchMocks } from "jest-fetch-mock";

const THUMBNAIL_ALT_IMAGE_PREFIX = "Thumbnail for ";
const ADD_TO_FAVOURITES_LABEL = "Add to favourites";
const REMOVE_FROM_FAVOURITES_LABEL = "Remove from favourites";

const moviesList = [
  {
    Name: "X-Men: The Last Stand",
    Year: "2006",
    Type: "movie",
    Image:
      "https://m.media-amazon.com/images/M/MV5BZmIyMDk5NGYtYjQ5NS00ZWQxLTg2YzQtZDk1ZmM4ZDBlN2E3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL__QL50.jpg",
  },
  {
    Name: "The Last Airbender",
    Year: "2010",
    Type: "movie",
    Image:
      "https://m.media-amazon.com/images/M/MV5BMTM1NjE0NDA0MV5BMl5BanBnXkFtZTcwODE4NDg1Mw@@._V1_UX182_CR0,0,182,268_AL__QL50.jpg",
  },
];

beforeAll(() => {
  enableFetchMocks();
  fetch.mockResponse((req) => Promise.resolve(JSON.stringify(moviesList)));
});

afterAll(() => {
  disableFetchMocks();
});

test("loader disappear when fetching is completed", async () => {
  const mediaList = render(<MediaList title={"someTitle"} api={"someApi"} />);
  await waitForElementToBeRemoved(() => mediaList.getByLabelText("Cargando"));
});

test("show media items when fetching is completed", async () => {
  const mediaList = render(<MediaList title={"someTitle"} api={"someApi"} />);

  const listItems = await mediaList.findAllByRole("listitem");

  expect(listItems).toHaveLength(2);

  expect(
    mediaList.getByAltText(`${THUMBNAIL_ALT_IMAGE_PREFIX}${moviesList[0].Name}`)
  ).toBeInTheDocument();
  expect(
    mediaList.getByAltText(`${THUMBNAIL_ALT_IMAGE_PREFIX}${moviesList[1].Name}`)
  ).toBeInTheDocument();
});

test("add movie to favourite when button is clicked", async () => {
  const mediaList = render(<MediaList title={"someTitle"} api={"someApi"} />);
  const listItems = await mediaList.findAllByRole("listitem");

  const firstMovie = within(listItems[0]);
  const secondMovie = within(listItems[1]);

  clickAddToFavourites(firstMovie);
  clickAddToFavourites(secondMovie);

  clickRemoveFromFavourites(firstMovie);
  clickRemoveFromFavourites(secondMovie);
});

function clickAddToFavourites(movie) {
  fireEvent.click(movie.getByText(ADD_TO_FAVOURITES_LABEL));
  expect(movie.getByText(REMOVE_FROM_FAVOURITES_LABEL)).toBeInTheDocument();
  expect(movie.queryByText(ADD_TO_FAVOURITES_LABEL)).not.toBeInTheDocument();
}

function clickRemoveFromFavourites(movie) {
  fireEvent.click(movie.getByText(REMOVE_FROM_FAVOURITES_LABEL));
  expect(movie.getByText(ADD_TO_FAVOURITES_LABEL)).toBeInTheDocument();
  expect(
    movie.queryByText(REMOVE_FROM_FAVOURITES_LABEL)
  ).not.toBeInTheDocument();
}
