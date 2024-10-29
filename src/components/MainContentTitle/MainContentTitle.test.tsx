import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import MainContentTitle from "@/components/MainContentTitle/MainContentTitle";

describe("MainContentTitle", () => {
    it("должен корректно отображать заголовки колонок", () => {
        render(<MainContentTitle />);

        expect(screen.getByText("Трек")).toBeInTheDocument();
        expect(screen.getByText("Исполнитель")).toBeInTheDocument();
        expect(screen.getByText("Альбом")).toBeInTheDocument();
    });

    it("должен отображать иконку времени в последнем столбце", () => {
        render(<MainContentTitle />);

        // Проверка наличия SVG-иконки с data-testid="icon-watch"
        const svgIcon = screen.getByTestId("icon-watch");
        expect(svgIcon).toBeInTheDocument();
    });
});