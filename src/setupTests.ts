import "@testing-library/jest-dom";
import "whatwg-fetch";

import { TextEncoder, TextDecoder } from "util";

// Patch globalThis for Jest (JSDOM)
if (typeof globalThis.TextEncoder === "undefined") {
  (globalThis as any).TextEncoder = TextEncoder as any;
}

if (typeof globalThis.TextDecoder === "undefined") {
  (globalThis as any).TextDecoder = TextDecoder as any;
}
