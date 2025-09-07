import { render, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";
import { useState } from "react";
import { render as rtlRender } from "@testing-library/react";
import React from "react";

jest.useFakeTimers();

// Helper component to test the hook
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

    // Change the value
    rerender(<TestComponent value="second" delay={500} />);

    // Should not update immediately
    expect(getByTestId("debounced").textContent).toBe("first");

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Now it should update
    expect(getByTestId("debounced").textContent).toBe("second");
  });

  it("resets timer if value changes before delay", () => {
    const { getByTestId, rerender } = rtlRender(<TestComponent value="A" delay={300} />);

    rerender(<TestComponent value="B" delay={300} />);
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Should still show previous value
    expect(getByTestId("debounced").textContent).toBe("A");

    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Now it should update
    expect(getByTestId("debounced").textContent).toBe("B");
  });
});
