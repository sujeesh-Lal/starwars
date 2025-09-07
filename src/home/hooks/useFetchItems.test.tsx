import { renderHook, act } from "@testing-library/react";
import { useFetchItems } from "./useFetchItems";
import * as reactRedux from "react-redux";
import type { AsyncThunk } from "@reduxjs/toolkit";

jest.mock("react-redux");

const mockedUseDispatch = reactRedux.useDispatch as unknown as jest.Mock;

describe("useFetchItems", () => {
  beforeEach(() => {
    mockedUseDispatch.mockReset();
  });

  it("returns false initially and sets loaded to true after dispatch", async () => {
    const dispatchMock = jest.fn(() => Promise.resolve());
    mockedUseDispatch.mockReturnValue(dispatchMock);

    const mockThunk = jest.fn() as unknown as AsyncThunk<any, string, any>;
    const items = ["url/1", "url/2"];

    const { result } = renderHook(() => useFetchItems({ items, fetchById: mockThunk }));

    expect(result.current).toBe(false);

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current).toBe(true);
    expect(dispatchMock).toHaveBeenCalledTimes(items.length);
  });

  it("returns false if no items", () => {
    mockedUseDispatch.mockReturnValue(jest.fn());
    const mockThunk = jest.fn() as unknown as AsyncThunk<any, string, any>;
    const { result } = renderHook(() => useFetchItems({ items: undefined, fetchById: mockThunk }));
    expect(result.current).toBe(false);
  });
});
