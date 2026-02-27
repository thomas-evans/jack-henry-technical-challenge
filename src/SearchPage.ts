import {css, html, LitElement, nothing} from "lit";
import {Task, TaskStatus} from "@lit/task";
import {customElement} from "lit/decorators/custom-element.js";
import type {ModifiedSearchResponse, SearchResponse, SortTypes, VideoResponse, VideoStatistics} from "./types.ts";
import {state} from "lit/decorators.js";
import {setJhTheme} from '@jack-henry/jh-elements/utils/themeProvider.js';
import '@jack-henry/jh-elements/components/input-search/input-search.js';
import '@jack-henry/jh-elements/components/button/button.js';
import '@jack-henry/jh-elements/components/card/card.js';
import '@jack-henry/jh-elements/components/tag/tag.js';
import '@jack-henry/jh-elements/components/badge/badge.js';
import '@jack-henry/jh-icons/icons-wc/icon-arrow-down-small.js';
import '@jack-henry/jh-icons/icons-wc/icon-arrow-up-small.js';
import {mockSearch, mockVideoStats} from "./mockData.ts";


setJhTheme();

@customElement('search-page')
export class SearchPage extends LitElement {
  @state() maxResults = 25;
  @state() query = "";
  @state() apiKey = `${import.meta.env.VITE_YOUTUBE_API_KEY}`;
  @state() results: ModifiedSearchResponse | undefined = undefined;
  @state() mockData = true;
  @state() sortOrderFromYT: (string | undefined)[] | undefined = undefined;
  @state() currentSort: SortTypes = 1;
  @state() descendingOrder: boolean = true;

  static styles = css`
    #searchForm {
      display: flex;
      gap: 10px;
    }

    #results {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .card-description {
      margin: 0;
    }

    jh-card {
      max-width: 480px;
    }

    .jh-card-footer {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    @media screen and (max-width: 320px) {
      jh-card {
        max-width: 120px;
      }

      jh-card .card-media {
        display: flex;
        justify-content: center;
      }
    }
    @media screen and (max-width: 640px) {
      jh-card {
        max-width: 320px;
      }
    }
  `;

  private _getYTSearchData = new Task(
    this,
    {
      task: async ([maxResults, q, key, mockData]: [number, string, string, boolean]): Promise<ModifiedSearchResponse> => {
        if (mockData) {
          const purgeNonVideos = mockSearch.items.filter(value => value.id.videoId);
          this.sortOrderFromYT = purgeNonVideos.map(value => value.id.videoId);
          return this._mergeDatasets({...mockSearch, items: purgeNonVideos}, mockVideoStats)
        } else {
          const searchDataFetch = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${q}%20&key=${key}`);
          const searchDataResponse: SearchResponse = await searchDataFetch.json();
          if (searchDataResponse) {
            const purgeNonVideos = searchDataResponse.items.filter(value => value.id.videoId);
            this.sortOrderFromYT = purgeNonVideos.map(value => value.id.videoId);
            const videoStatisticsFetch = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${this.sortOrderFromYT?.toString()}&key=${key}`);
            const videoStatisticsResponse: VideoResponse = await videoStatisticsFetch.json();
            if (videoStatisticsResponse) {
              return this._mergeDatasets({...searchDataResponse, items: purgeNonVideos}, videoStatisticsResponse);
            } else {
              throw new Error("Statistics Failed");
            }
          } else {
            throw new Error("Search Failed");
          }
        }
      },
      autoRun: false
    }
  );

  private sortResults(e: Event) {
    const targetElement = e.target as HTMLElement;
    if (e.target === e.currentTarget) return;
    let sortType: SortTypes | undefined;
    sortType = parseInt((targetElement).getAttribute("sortType")!) as typeof sortType;
    if (sortType === undefined) return;
    if (isNaN(sortType)) {
      const parentElement = targetElement.parentElement;
      if (!parentElement) return;
      const sortAttribute = parentElement.getAttribute("sortType");
      if (!sortAttribute) return;
      sortType = parseInt(sortAttribute) as typeof sortType;
    }
    sortType === this.currentSort ? this.descendingOrder = !this.descendingOrder : this.descendingOrder = true;
    this.currentSort = sortType;
    switch (sortType) {
      case 1:
        if (this.descendingOrder) {
          this.results?.items.sort((a, b) => a.relevanceIndex - b.relevanceIndex);
        } else {
          this.results?.items.sort((a, b) => a.relevanceIndex - b.relevanceIndex).reverse();
        }
        break;
      case 2:
        if (this.descendingOrder) {
          this.results?.items.sort((a, b) => new Date(a.snippet.publishTime).valueOf() - new Date(b.snippet.publishTime).valueOf()).reverse();
        } else {
          this.results?.items.sort((a, b) => new Date(a.snippet.publishTime).valueOf() - new Date(b.snippet.publishTime).valueOf());
        }
        break;
      case 3:
        if (this.descendingOrder) {
          this.results?.items.sort((a, b) => parseInt(a.statistics?.likeCount??"0") - parseInt(b.statistics?.likeCount??"0")).reverse();
        } else {
          this.results?.items.sort((a, b) => parseInt(a.statistics?.likeCount??"0") - parseInt(b.statistics?.likeCount??"0"));
        }
        break;
    }
  };

  private _mergeDatasets(search: SearchResponse, video: VideoResponse): ModifiedSearchResponse {
    const videoStatisticsMap = new Map<string, VideoStatistics | undefined>();
    video.items.forEach(value => videoStatisticsMap.set(value.id, value.statistics));
    return {
      ...search, items: search.items.map(value => {
        return {
          statistics: value.id.videoId ? videoStatisticsMap.get(value.id.videoId) : undefined,
          relevanceIndex: this.sortOrderFromYT?.indexOf(value.id.videoId) ?? 99999, ...value
        };
      })
    };
  }

  private async _queryYTApi(e: SubmitEvent) {
    e.preventDefault();
    await this._getYTSearchData.run([this.maxResults, this.query, this.apiKey, this.mockData] as const);
  };

  searchFormTemplate() {
    return html`
        <form id="searchForm" @submit=${this._queryYTApi}>
            <jh-input-search
                    name="ytSearchInput"
                    accessible-label="Input Search Terms for YouTube"
                    @jh-input=${(e: CustomEvent) => {
                        this.query = e.detail.value;
                    }}
                    @jh-input:clear-button-click=${() => this.query = ""}

            ></jh-input-search>
            <jh-button name="ytSearchSubmit" appearance="primary" label="Search YouTube" submit></jh-button>
        </form>
    `;
  }

  cardTemplate(value: ModifiedSearchResponse | undefined) {
    if (!value) return;
    return html`${value.items.map((item) =>
      html`
          <jh-card show-header-divider show-footer-divider padding="small">
              <div class="card-media" slot="jh-card-media">
                  <a rel="noopener noreferrer"
                     href='https://www.youtube.com/watch?v=${item.id.videoId}'><img
                          src=${item.snippet.thumbnails.default.url}
                          srcset="
                                             ${item.snippet.thumbnails.default.url} 120w,
                                             ${item.snippet.thumbnails.medium.url} 320w,
                                             ${item.snippet.thumbnails.high.url} 480w"
                          sizes="(max-width: 320px) 120px, (max-width: 640px) 320px, 480px"
                          alt="YouTube Thumbnail"></a>
              </div>
              <h2 slot="jh-card-header">
                  <a rel="noopener noreferrer"
                     href='https://www.youtube.com/watch?v=${item.id.videoId}'>${item.snippet.title}</a>
              </h2>
              <p>${item.id.videoId}</p>
              <p>${item.snippet.publishTime}</p>
              <p>${item.statistics?.likeCount}</p>
              <p class="card-description">${item.snippet.description}</p>
              <div class="jh-card-footer" slot="jh-card-footer">
                  <jh-button name="bookMark" appearance="secondary"
                             label="BookMark Video" size="small"></jh-button>
                  <div>Comment Count:
                      <jh-badge count=${item.statistics?.commentCount}></jh-badge>
                  </div>
              </div>
          </jh-card>`
    )}`
  }

  resultsTemplate() {
    switch (this._getYTSearchData.status) {
      case TaskStatus.INITIAL:
        return html`<p>Search results will display here</p>`;
      case TaskStatus.PENDING:
        return html`<p>Searching YouTube for relevant videos</p>`;
      case TaskStatus.COMPLETE:
        if (!this.results) {
          this.results = this._getYTSearchData.value;
        }
        return html`${this.cardTemplate(this.results)}`;

      case TaskStatus.ERROR:
        return html`<p>Oops, something went wrong: ${this._getYTSearchData.error}</p>`;
    }
  }

  sortTemplate() {
    return html`
        <h2>Sort</h2>
        <div @click=${this.sortResults}>
            <jh-button name="sortByRelevance" appearance="tertiary" label="Relevance" size="small" icon-position="after"
                       sortType="1">
                ${this.sortOrderIconTemplate(1)}
            </jh-button>
            <jh-button name="sortByDate" appearance="tertiary" label="Date" size="small" icon-position="after"
                       sortType="2">
                ${this.sortOrderIconTemplate(2)}
            </jh-button>
            <jh-button name="sortByRating" appearance="tertiary" label="Rating" size="small" icon-position="after"
                       sortType="3">
                ${this.sortOrderIconTemplate(3)}
            </jh-button>
        </div>
    `
  }

  sortOrderIconTemplate(sortType: number) {
    // I added this span to prevent #handleSlotChange in
    // node_modules/@jack-henry/jh-elements/components/button/button.js
    // from throwing when I remove the sort order icons
    if (this.currentSort !== sortType) return html`<span></span>`;
    return this.descendingOrder ?
      html`
          <jh-icon-arrow-down-small slot="jh-button-icon"></jh-icon-arrow-down-small>` :
      html`
          <jh-icon-arrow-up-small slot="jh-button-icon"></jh-icon-arrow-up-small>`;
  }


  render() {
    return html`
        <main>
            <h1>YouTube Search Module</h1>
            <section id="search">
                ${this.searchFormTemplate()}
            </section>
            <section id="sort">
                ${this._getYTSearchData.status === TaskStatus.COMPLETE ? this.sortTemplate() : nothing}
            </section>
            <section id="results">
                ${this.resultsTemplate()}
            </section>
        </main>
    `;
  }
}