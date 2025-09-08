import { render, screen, fireEvent } from "@testing-library/react";
import { CharacterSearch } from "./CharacterSearch";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import type { FlattenedPerson } from "@/shared/types/peopleTypes";

jest.mock("./CharactersTable", () => ({
  __esModule: true,
  default: ({
    data,
    handleClick,
  }: {
    data: FlattenedPerson[];
    handleClick: (id: string) => void;
  }) => (
    <div data-testid="character-table">
      {data.map((d) => (
        <span key={d.id} onClick={() => handleClick(d.id)}>
          {d.name}
        </span>
      ))}
    </div>
  ),
}));

interface PeopleState {
  data: Record<string, FlattenedPerson[]>;
  loadingPeople: boolean;
}

const peopleReducer = (state: PeopleState = { data: {}, loadingPeople: false }): PeopleState =>
  state;

describe("CharacterSearch component", () => {
  const mockPeopleData: Record<string, FlattenedPerson[]> = {
    "1": [
      {
        id: "1",
        name: "Luke Skywalker",
        gender: "male",
        hair_color: "blond",
        height: "172",
        eye_color: "blue",
        mass: "77",
        url: "",
        homeworld: "",
        films: [],
        starships: [],
      },
    ],
    "2": [
      {
        id: "2",
        name: "C-3PO",
        gender: "n/a",
        hair_color: "n/a",
        height: "167",
        eye_color: "yellow",
        mass: "75",
        url: "",
        homeworld: "",
        films: [],
        starships: [],
      },
    ],
  };

  const renderWithStore = (
    preloadedState: PeopleState,
    search: string,
    handleClick: (id: string) => void,
  ) => {
    const store = configureStore({
      reducer: { people: peopleReducer },
      preloadedState: { people: preloadedState },
    });

    render(
      <Provider store={store}>
        <CharacterSearch search={search} handleClick={handleClick} />
      </Provider>,
    );
  };

  it("renders CharacterTable when search matches", () => {
    renderWithStore({ data: mockPeopleData, loadingPeople: false }, "Luke", jest.fn());

    expect(screen.getByTestId("character-table")).toBeInTheDocument();
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });

  it("does not render CharacterTable when search is empty", () => {
    renderWithStore({ data: mockPeopleData, loadingPeople: false }, "", jest.fn());

    expect(screen.queryByTestId("character-table")).not.toBeInTheDocument();
  });

  it("calls handleClick when a character is clicked", () => {
    const handleClick = jest.fn();

    renderWithStore({ data: mockPeopleData, loadingPeople: false }, "Luke", handleClick);

    fireEvent.click(screen.getByText("Luke Skywalker"));
    expect(handleClick).toHaveBeenCalledWith("1");
  });
});
