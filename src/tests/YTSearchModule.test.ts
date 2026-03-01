import { expect, test, beforeEach, describe, vi } from "vitest";
import { render } from "vitest-browser-lit";
import { html } from "lit";

describe("YTSearchModule Edge Cases", () => {
    let localStorageMock: Map<string, string>;

    beforeEach(() => {
        localStorageMock = new Map();
        vi.stubGlobal("localStorage", {
            getItem: (key: string) => localStorageMock.get(key) || null,
            setItem: (key: string, value: string) => localStorageMock.set(key, value),
            clear: () => localStorageMock.clear(),
        });
    });

    test("should handle corrupted localStorage data", () => {
        localStorageMock.set("bookmarks", "not valid json");

        const component = render(html`<search-module></search-module>`);

        expect(component).toBeTruthy();
    });

    test("should handle null bookmarks in localStorage", () => {
        localStorageMock.set("bookmarks", "null");

        const component = render(html`<search-module></search-module>`);

        expect(component).toBeTruthy();
    });

    test("should handle empty bookmarks string in localStorage", () => {
        localStorageMock.set("bookmarks", "");

        const component = render(html`<search-module></search-module>`);

        expect(component).toBeTruthy();
    });
});
