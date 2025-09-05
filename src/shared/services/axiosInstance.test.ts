import axiosInstance from "./axiosInstance";

describe("axiosInstance", () => {
  it("should have correct defaults", () => {
    expect(axiosInstance.defaults.baseURL).toBe("https://www.swapi.tech");
    expect(axiosInstance.defaults.timeout).toBe(10000);
  });

  it("request interceptor should pass config correctly", async () => {
    const config = { headers: {} };

    // Access the first request interceptor's fulfilled function
    const requestInterceptor = (axiosInstance.interceptors.request as any).handlers[0].fulfilled;
    const result = await requestInterceptor(config);

    expect(result).toBe(config); // should return the same config
  });

  it("request interceptor should reject errors", async () => {
    const error = new Error("Request error");

    const requestInterceptor = (axiosInstance.interceptors.request as any).handlers[0].rejected;
    await expect(requestInterceptor(error)).rejects.toThrow("Request error");
  });

  it("response interceptor should pass response correctly", async () => {
    const response = { data: { name: "Tatooine" } };

    const responseInterceptor = (axiosInstance.interceptors.response as any).handlers[0].fulfilled;
    const result = await responseInterceptor(response);

    expect(result).toBe(response); // should return the same response
  });

  it("response interceptor should reject errors", async () => {
    const error = new Error("Response error");

    const responseInterceptor = (axiosInstance.interceptors.response as any).handlers[0].rejected;
    await expect(responseInterceptor(error)).rejects.toThrow("Response error");
  });
});
