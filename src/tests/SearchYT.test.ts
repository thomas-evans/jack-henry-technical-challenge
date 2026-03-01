import { assert, expect, test } from "vitest";
import { SearchYT } from "../SearchYT.ts";
import { render } from "vitest-browser-lit";
import { html } from "lit";

test("it should have default class properties", () => {
    const dataComponent = new SearchYT();
    expect(dataComponent.maxResults).toEqual(25);
    assert.isEmpty(dataComponent.query);
    expect(dataComponent.apiKey).toEqual(import.meta.env.VITE_YOUTUBE_API_KEY);
    expect(dataComponent.mockData).toEqual(true);
});

test("it should default mockData to true", () => {
    const component = new SearchYT();
    expect(component.mockData).toBe(true);
});

test("it should have empty query initially", () => {
    const component = new SearchYT();
    assert.isEmpty(component.query);
});

test("it should render the search input", async () => {
    const component = render(html`<search-yt></search-yt>`);
    const searchInput = component.getByLabelText("Input Search Terms for YouTube");
    await expect.element(searchInput).toBeInTheDocument();
});

test("it should render the search button", async () => {
    const component = render(html`<search-yt></search-yt>`);
    const searchButton = component.getByText("Search YouTube");
    await expect.element(searchButton).toBeInTheDocument();
});

test("it should handle custom maxResults", async () => {
    const component = new SearchYT();
    component.maxResults = 10;
    expect(component.maxResults).toEqual(10);
});

test("it should render form with search input", async () => {
    const component = render(html`<search-yt></search-yt>`);
    const searchInput = component.getByLabelText("Input Search Terms for YouTube");
    const searchButton = component.getByText("Search YouTube");
    await expect.element(searchInput).toBeInTheDocument();
    await expect.element(searchButton).toBeInTheDocument();
});
