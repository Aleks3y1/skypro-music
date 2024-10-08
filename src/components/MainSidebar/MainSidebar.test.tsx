import { render, screen, fireEvent } from '@testing-library/react';
import MainSidebar from '@/components/MainSidebar/MainSidebar';
import { useAppSelector } from '@/store/store';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';

jest.mock('../../store/store', () => ({
    useAppSelector: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('MainSidebar Component', () => {
    let mockRouterPush: jest.Mock;

    beforeEach(() => {
        mockRouterPush = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });

        localStorage.clear();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly with logged-in user', () => {
        (useAppSelector as jest.Mock).mockReturnValue({
            user: {
                _id: 1,
                username: 'TestUser',
                email: 'testuser@example.com',
            },
            errorMessage: '',
        });

        render(<MainSidebar />);

        const usernameElement = screen.getByText('TestUser');
        expect(usernameElement).toBeInTheDocument();
    });

    test('renders correctly when user is not logged in', () => {
        (useAppSelector as jest.Mock).mockReturnValue({
            user: null,
            errorMessage: '',
        });

        render(<MainSidebar />);

        const defaultText = screen.getByText('Авторизируйтесь');
        expect(defaultText).toBeInTheDocument();
    });

    test('handles logout correctly', () => {
        (useAppSelector as jest.Mock).mockReturnValue({
            user: {
                _id: 1,
                username: 'TestUser',
                email: 'testuser@example.com',
            },
            errorMessage: '',
        });

        render(<MainSidebar />);

        localStorage.setItem('user', 'TestUser');
        localStorage.setItem('access_token', 'access_token');
        localStorage.setItem('refresh_token', 'refresh_token');

        const logoutIcon = screen.getByTestId('logout-icon');
        fireEvent.click(logoutIcon);

        expect(localStorage.getItem('user')).toBeNull();
        expect(localStorage.getItem('access_token')).toBeNull();
        expect(localStorage.getItem('refresh_token')).toBeNull();

        expect(mockRouterPush).toHaveBeenCalledWith('/signin');
    });
});