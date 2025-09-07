import { act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";
import { render as rtlRender } from "@testing-library/react";

jest.useFakeTimers();

function TestComponent({ value, delay }: { value: string; delay?: number }) {
  const debounced = useDebounce(value, delay);
  return <div data-testid="debounced">{debounced}</div>;
}

describe("useDebounce", () => {
  it("returns initial value immediately", () => {
    const { getByTestId } = rtlRender(<TestComponent value="initial" />);
    expect(getByTestId("debounced").textContent).toBe("initial");
  });

  it("updates debounced value after delay", () => {
    const { getByTestId, rerender } = rtlRender(<TestComponent value="first" delay={500} />);

    rerender(<TestComponent value="second" delay={500} />);

    expect(getByTestId("debounced").textContent).toBe("first");

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(getByTestId("debounced").textContent).toBe("second");
  });

  it("resets timer if value changes before delay", () => {
    const { getByTestId, rerender } = rtlRender(<TestComponent value="A" delay={300} />);

    rerender(<TestComponent value="B" delay={300} />);
    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(getByTestId("debounced").textContent).toBe("A");

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(getByTestId("debounced").textContent).toBe("B");
  });
});
