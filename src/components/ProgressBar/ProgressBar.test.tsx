import {fireEvent, render, screen} from "@testing-library/react";
import Filter from "@/components/Filter/Filter";
import configureStore from 'redux-mock-store';
import {Provider} from "react-redux";
import '@testing-library/jest-dom';

const mockStore = configureStore([]);

describe("Filter Component", () => {
    let store: any;

    beforeEach(() => {
        store = mockStore({
            player: {
                trackArray: [
                    {_id: '1', name: 'Track 1', genre: 'Pop'},
                    {_id: '2', name: 'Track 2', genre: 'Rock'},
                ]
            }
        });
    });

    const renderWithProvider = (component: JSX.Element) => {
        return render(<Provider store={store}>{component}</Provider>);
    };

    test("renders filter buttons", () => {
        renderWithProvider(<Filter/>);

        expect(screen.getByText("исполнителю")).toBeInTheDocument();
        expect(screen.getByText("году выпуска")).toBeInTheDocument();
        expect(screen.getByText("жанру")).toBeInTheDocument();
    });

    test("toggles author filter visibility", () => {
        renderWithProvider(<Filter/>);

        const authorButton = screen.getByText("исполнителю");

        const trackText = screen.queryByText("Track 1");
        expect(trackText).not.toBeVisible();

        fireEvent.click(authorButton);

        expect(trackText).toBeVisible();
    });

    test("toggles genre filter visibility", () => {
        renderWithProvider(<Filter/>);

        const genreButton = screen.getByText("жанру");

        const genreText = screen.queryByText("Pop");
        expect(genreText).not.toBeVisible();

        fireEvent.click(genreButton);

        expect(genreText).toBeVisible();
    });
});