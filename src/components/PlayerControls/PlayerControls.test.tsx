// tests/PlayerControls.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import {useAppDispatch, useAppSelector} from "@/store/store";
import PlayerControls from "@/components/PlayerControls/PlayerControls";

// Mock redux hooks
jest.mock('../../store/store');

// Создаем полноценный mock объекта HTMLAudioElement
const createMockAudioRef = () => ({
    current: {
        play: jest.fn(),
        pause: jest.fn(),
        src: '',
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        load: jest.fn(),
        loop: false,
        volume: 1,
    } as unknown as HTMLAudioElement, // Приводим тип к HTMLAudioElement
});

describe('PlayerControls Component', () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
        (useAppSelector as jest.Mock).mockReturnValue({
            isPlaying: false,
            currentTrackId: 1,
            currentTrack: { _id: 1, track_file: 'track.mp3' },
            trackArray: [],
            clickedTracks: false,
        });
    });

    it('Play/Pause button works', () => {
        const mockAudioRef = createMockAudioRef();

        // Рендерим компонент
        render(<PlayerControls audioRef={mockAudioRef} />);

        // Находим кнопку воспроизведения
        const playButton = screen.getByRole('button', { name: /play/i });

        // Нажимаем на кнопку воспроизведения
        fireEvent.click(playButton);

        // Проверяем, что вызван метод play
        expect(mockAudioRef.current.play).toHaveBeenCalled();

        // Нажимаем еще раз для паузы
        fireEvent.click(playButton);

        // Проверяем, что вызван метод pause
        expect(mockAudioRef.current.pause).toHaveBeenCalled();
    });
});