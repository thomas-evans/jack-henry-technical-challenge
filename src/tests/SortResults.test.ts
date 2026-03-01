import { expect, test, describe } from "vitest";
import { SortResults } from "../SortResults.ts";
import { render } from "vitest-browser-lit";
import { html } from "lit";

describe("SortResults Unit Tests", () => {
    test("should have default currentSort as 1 (relevance)", () => {
        const component = new SortResults();
        expect(component.currentSort).toBe(1);
    });

    test("should have default descendingOrder as true", () => {
        const component = new SortResults();
        expect(component.descendingOrder).toBe(true);
    });

    test("should have undefined results initially", () => {
        const component = new SortResults();
        expect(component.results).toBeUndefined();
    });

    test("should set currentSort to 1 initially", () => {
        const component = new SortResults();
        expect(component.currentSort).toBe(1);
    });
});

describe("SortResults UI Tests", () => {
    test("should render Sort Results heading", async () => {
        const component = render(html`<sort-results></sort-results>`);
        const heading = component.getByText("Sort Results");
        await expect.element(heading).toBeInTheDocument();
    });

    test("should render Relevance button", async () => {
        const component = render(html`<sort-results></sort-results>`);
        const button = component.getByText("Relevance");
        await expect.element(button).toBeInTheDocument();
    });

    test("should render Date button", async () => {
        const component = render(html`<sort-results></sort-results>`);
        const button = component.getByText("Date");
        await expect.element(button).toBeInTheDocument();
    });

    test("should render Rating button", async () => {
        const component = render(html`<sort-results></sort-results>`);
        const button = component.getByText("Rating");
        await expect.element(button).toBeInTheDocument();
    });
});

describe("SortResults Edge Cases", () => {
    test("should handle undefined results gracefully in render", () => {
        const component = new SortResults();
        expect(() => component.render()).not.toThrow();
    });

    test("should have initial state ready for sorting", () => {
        const component = new SortResults();
        expect(component.currentSort).toBeDefined();
        expect(component.descendingOrder).toBeDefined();
    });
});
