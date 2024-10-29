import { render, screen, fireEvent } from '@testing-library/react';
import Volume from '@/components/Volume/Volume';
import { useDispatch } from 'react-redux';
import { setVolume } from '@/store/features/player/playerSlice';
import '@testing-library/jest-dom';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));

jest.mock('../../store/features/player/playerSlice', () => ({
    setVolume: jest.fn(),
}));

describe('Volume Component', () => {
    let mockDispatch: jest.Mock;

    beforeEach(() => {
        mockDispatch = jest.fn();
        (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders volume slider', () => {
        render(<Volume />);

        const slider = screen.getByRole('slider');
        expect(slider).toBeInTheDocument();
    });

    test('dispatches setVolume when the slider changes', () => {
        render(<Volume />);

        const slider = screen.getByRole('slider');

        fireEvent.change(slider, { target: { value: '0.5' } });

        expect(mockDispatch).toHaveBeenCalledWith(setVolume(0.5));
    });

    test('slider has correct initial attributes', () => {
        render(<Volume />);

        const slider = screen.getByRole('slider');

        expect(slider).toHaveAttribute('min', '0');
        expect(slider).toHaveAttribute('max', '1');
        expect(slider).toHaveAttribute('step', '0.01');
    });
});