import { assert, expect, test } from "vitest";
import { SearchYT } from "./SearchYT.ts";
import { render } from "vitest-browser-lit";
import { html } from "lit";

test("it should have default class properties", () => {
    const dataComponent = new SearchYT();
    expect(dataComponent.maxResults).toEqual(25);
    assert.isEmpty(dataComponent.query);
    expect(dataComponent.apiKey).toEqual(import.meta.env.VITE_YOUTUBE_API_KEY);
});

test("it should render the search button", async () => {
    const component = render(html`<yt-data></yt-data>`);
    const searchButton = component.getByText("Search YouTube");
    await expect.element(searchButton).toBeInTheDocument();
});

test("it should call the YouTube Search API when clicked", async () => {
    // const component = render(html`<yt-data></yt-data>`);
    // const searchButton = component.getByText('Search YouTube');
});
