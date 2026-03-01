import { customElement } from "lit/decorators/custom-element.js";
import { html, LitElement, nothing } from "lit";
import "./SearchYT.ts";
import { provide } from "@lit/context";
import { resultsContext } from "./util/resultsContext.ts";
import { state } from "lit/decorators.js";
import type {
    FireSearchEvent,
    ModifiedItem,
    ModifiedSearchResponse,
    SearchResponse,
    VideoResponse,
    VideoStatistics,
} from "./util/types.ts";
import { setJhTheme } from "@jack-henry/jh-elements/utils/themeProvider.js";
import "@jack-henry/jh-elements/components/tooltip/tooltip.js";
import "@jack-henry/jh-elements/components/button/button.js";
import "@jack-henry/jh-elements/components/card/card.js";
import "@jack-henry/jh-elements/components/tag/tag.js";
import "@jack-henry/jh-elements/components/badge/badge.js";
import "@jack-henry/jh-icons/icons-wc/icon-bookmark.js";
import "@jack-henry/jh-elements/components/switch/switch.js";
import "./SortResults.ts";
import { Task, TaskStatus } from "@lit/task";
import { mockSearch, mockVideoStats } from "./util/mockData.ts";
import { sharedStyles } from "./util/sharedStyles.ts";

setJhTheme();

@customElement("search-module")
export class YTSearchModule extends LitElement {
    @provide({ context: resultsContext })
    @state()
    results: ModifiedSearchResponse | undefined;
    @state() sortOrderFromYT: (string | undefined)[] | undefined;

    @state() bookmarks: ModifiedItem[] | [];

    @state() showBookmarks: boolean = false;

    @state() renderedResults: boolean = false;

    constructor() {
        super();
        this.bookmarks = this.syncBookmarks();
    }

    static styles = [sharedStyles];

    private _getYTSearchData = new Task(this, {
        task: async ([maxResults, q, key, mockData]: [
            number,
            string,
            string,
            boolean,
        ]): Promise<ModifiedSearchResponse> => {
            this.renderedResults = false;
            if (mockData) {
                const purgeNonVideos = mockSearch.items.filter((value) => value.id.videoId);
                this.sortOrderFromYT = purgeNonVideos.map((value) => value.id.videoId);
                return this._mergeDatasets(
                    { ...mockSearch, items: purgeNonVideos },
                    mockVideoStats,
                );
            } else {
                const searchDataFetch = await fetch(
                    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${q}%20&key=${key}`,
                );
                const searchDataResponse: SearchResponse = await searchDataFetch.json();
                if (searchDataResponse) {
                    const purgeNonVideos = searchDataResponse.items.filter(
                        (value) => value.id.videoId,
                    );
                    this.sortOrderFromYT = purgeNonVideos.map((value) => value.id.videoId);
                    const videoStatisticsFetch = await fetch(
                        `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${this.sortOrderFromYT?.toString()}&key=${key}`,
                    );
                    const videoStatisticsResponse: VideoResponse =
                        await videoStatisticsFetch.json();
                    if (videoStatisticsResponse) {
                        return this._mergeDatasets(
                            { ...searchDataResponse, items: purgeNonVideos },
                            videoStatisticsResponse,
                        );
                    } else {
                        throw new Error("Statistics Failed");
                    }
                } else {
                    throw new Error("Search Failed");
                }
            }
        },
        autoRun: false,
    });

    private _mergeDatasets(search: SearchResponse, video: VideoResponse): ModifiedSearchResponse {
        const videoStatisticsMap = new Map<string, VideoStatistics | undefined>();
        video.items.forEach((value) => videoStatisticsMap.set(value.id, value.statistics));
        return {
            ...search,
            items: search.items.map((value) => {
                return {
                    statistics: value.id.videoId
                        ? videoStatisticsMap.get(value.id.videoId)
                        : undefined,
                    relevanceIndex: this.sortOrderFromYT?.indexOf(value.id.videoId) ?? 99999,
                    ...value,
                };
            }),
        };
    }

    private syncBookmarks() {
        const lsBookmarks = localStorage.getItem("bookmarks");
        if (lsBookmarks !== null) {
            return JSON.parse(lsBookmarks) || [];
        } else {
            return [];
        }
    }

    private recordBookmark(item: ModifiedItem) {
        const lsBookmarks = localStorage.getItem("bookmarks");
        if (lsBookmarks !== null) {
            const updatedBookmarks: ModifiedItem[] = JSON.parse(lsBookmarks);
            if (this.isBookmarked(item.id.videoId)) {
                const filteredBookmarks = updatedBookmarks.filter(
                    (value) => value.id.videoId !== item.id.videoId,
                );
                localStorage.setItem("bookmarks", JSON.stringify(filteredBookmarks));
            } else {
                updatedBookmarks.push(item);
                localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
            }
        } else {
            localStorage.setItem("bookmarks", JSON.stringify([item]));
        }
        this.bookmarks = this.syncBookmarks();
    }

    private isBookmarked(videoId: string | undefined) {
        if (!videoId) return;
        return this.bookmarks.some((element) => element.id.videoId === videoId);
    }

    private cardTemplate(item: ModifiedItem) {
        const isBookmarked = this.isBookmarked(item.id.videoId);
        return html` <jh-card show-header-divider show-footer-divider padding="small">
            <div class="card-media" slot="jh-card-media">
                <a
                    rel="noopener noreferrer"
                    href="https://www.youtube.com/watch?v=${item.id.videoId}"
                    ><img
                        src=${item.snippet.thumbnails.default.url}
                        srcset="
                            ${item.snippet.thumbnails.default.url} 120w,
                            ${item.snippet.thumbnails.medium.url} 320w,
                            ${item.snippet.thumbnails.high.url} 480w
                        "
                        sizes="(max-width: 320px) 120px, (max-width: 640px) 320px, 480px"
                        alt="YouTube Thumbnail"
                /></a>
            </div>
            <h2 slot="jh-card-header">
                <a
                    rel="noopener noreferrer"
                    href="https://www.youtube.com/watch?v=${item.id.videoId}"
                    >${item.snippet.title}</a
                >
            </h2>
            <p class="card-description">${item.snippet.description}</p>
            <div class="jh-card-footer" slot="jh-card-footer">
                <jh-tooltip
                    position="top-right"
                    label="${isBookmarked ? "Remove Bookmark" : "Bookmark Video"}"
                >
                    <jh-button
                        accessible-label="Bookmark Video"
                        name="bookMark"
                        appearance="${isBookmarked ? "primary" : "secondary"}"
                        size="small"
                        icon-position="after"
                        @click=${() => this.recordBookmark(item)}
                    >
                        <jh-icon-bookmark slot="jh-button-icon"></jh-icon-bookmark>
                    </jh-button>
                </jh-tooltip>
                <div>
                    Comment Count:
                    <jh-badge count=${item.statistics?.commentCount}></jh-badge>
                </div>
            </div>
        </jh-card>`;
    }

    private resultsTemplate() {
        switch (this._getYTSearchData.status) {
            case TaskStatus.INITIAL:
                return html`<p>Search results will display here</p>`;
            case TaskStatus.PENDING:
                return html`<p>Searching YouTube for relevant videos</p>`;
            case TaskStatus.COMPLETE:
                if (!this.renderedResults) {
                    this.results = this._getYTSearchData.value;
                    this.renderedResults = true;
                }
                return html` ${this.results?.items.map((item) => this.cardTemplate(item))} `;
            case TaskStatus.ERROR:
                return html`<p>Oops, something went wrong: ${this._getYTSearchData.error}</p>`;
        }
    }

    private noBookmarksTemplate() {
        return html`
            <p>
                No bookmarks yet. Search for videos and bookmark the ones you want by pressing the
                bookmark button (
                <jh-button
                    accessible-label="Bookmark Video"
                    name="bookMark"
                    appearance="secondary"
                    size="small"
                >
                    <jh-icon-bookmark slot="jh-button-icon"></jh-icon-bookmark>
                </jh-button>
                ) under each video.
            </p>
        `;
    }

    private bookMarksTemplate() {
        return html`
            <section id="bookmarks">
                ${this.bookmarks.length === 0
                    ? this.noBookmarksTemplate()
                    : this.bookmarks.map((item) => this.cardTemplate(item))}
            </section>
        `;
    }

    render() {
        return html`
            <main>
                <header>
                    <h1>YouTube Search</h1>
                    <jh-switch
                        label="View Bookmarks"
                        checked=${this.showBookmarks || nothing}
                        @jh-change=${() => (this.showBookmarks = !this.showBookmarks)}
                    ></jh-switch>
                </header>
                ${this.showBookmarks
                    ? this.bookMarksTemplate()
                    : html`
                          <section id="search">
                              <search-yt
                                  @fireSearch=${async (e: FireSearchEvent) =>
                                      await this._getYTSearchData.run(e.detail)}
                              ></search-yt>
                          </section>
                          <section id="sort">
                              ${this._getYTSearchData.status === TaskStatus.COMPLETE
                                  ? html`<sort-results
                                        @sort=${() => this.requestUpdate()}
                                    ></sort-results>`
                                  : nothing}
                          </section>
                          <section id="results">${this.resultsTemplate()}</section>
                      `}
            </main>
        `;
    }
}
