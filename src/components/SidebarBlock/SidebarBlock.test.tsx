import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import SidebarBlock from "@/components/SidebarBlock/SidebarBlock";
import { useRouter } from "next/router";
import * as nextImage from 'next/image';

// Мокируем модуль next/image для тестов
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        const { src, alt, width, height } = props;
        return <img src={src} alt={alt} width={width} height={height} />;
    },
}));

// Мокируем useRouter, если нужно
jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

describe("SidebarBlock", () => {
    it("должен отображать три изображения плейлистов", () => {
        render(<SidebarBlock />);

        const images = screen.getAllByAltText("day's playlist");
        expect(images).toHaveLength(3);

        // Проверяем атрибуты изображений
        expect(images[0]).toHaveAttribute("src", "/img/playlist01.png");
        expect(images[1]).toHaveAttribute("src", "/img/playlist02.png");
        expect(images[2]).toHaveAttribute("src", "/img/playlist03.png");

        expect(images[0]).toHaveAttribute("width", "250");
        expect(images[0]).toHaveAttribute("height", "150");
    });

    it("должен отображать ссылки с правильными href", () => {
        render(<SidebarBlock />);

        const links = screen.getAllByRole("link");
        expect(links).toHaveLength(3);

        expect(links[0]).toHaveAttribute("href", "/main/selection/2");
        expect(links[1]).toHaveAttribute("href", "/main/selection/3");
        expect(links[2]).toHaveAttribute("href", "/main/selection/4");
    });
});