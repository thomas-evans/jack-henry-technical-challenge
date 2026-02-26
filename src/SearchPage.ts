import {css, html, LitElement} from "lit";
import {Task} from "@lit/task";
import {customElement} from "lit/decorators/custom-element.js";
import type {ModifiedSearchResponse, SearchResponse, VideoResponse} from "./types.ts";
import {state} from "lit/decorators.js";
import {setJhTheme} from '@jack-henry/jh-elements/utils/themeProvider.js';
import '@jack-henry/jh-elements/components/input-search/input-search.js';
import '@jack-henry/jh-elements/components/button/button.js';
import '@jack-henry/jh-elements/components/card/card.js';
import '@jack-henry/jh-elements/components/tag/tag.js';
import '@jack-henry/jh-elements/components/badge/badge.js';
import {mockSearch, mockVideoStats} from "./mockData.ts";

setJhTheme();

@customElement('search-page')
export class SearchPage extends LitElement {
  @state() maxResults = 25;
  @state() query = "";
  @state() apiKey = `${import.meta.env.VITE_YOUTUBE_API_KEY}`;
  @state() results = undefined;

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
      task: async ([maxResults, q, key]: [number, string, string]): Promise<ModifiedSearchResponse> => {
        // const searchDataFetch = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${q}%20&key=${key}`);
        // const searchDataResponse: SearchResponse = await searchDataFetch.json();
        const searchDataResponse: SearchResponse = mockSearch;
        if (searchDataResponse) {
          // const videoIds = searchDataResponse.items.map(value => value.id.videoId).toString();
          // const videoStatisticsFetch = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${key}`);
          // const videoStatisticsResponse: VideoResponse = await videoStatisticsFetch.json();
          const videoStatisticsResponse: VideoResponse = mockVideoStats;
          if (videoStatisticsResponse) {
            const videoCommentsMap = new Map<string, string>();
            videoStatisticsResponse.items.forEach(value => videoCommentsMap.set(value.id, value.statistics.commentCount));
            return {
              ...searchDataResponse, items: searchDataResponse.items.map(value => {
                return {commentCount: value.id.videoId ? videoCommentsMap.get(value.id.videoId) : "Could not find video id", ...value};
              })
            };
          } else {
            throw new Error("Statistics Failed");
          }
        } else {
          throw new Error("Search Failed");
        }
      },
      autoRun: false
    }
  );

  private async _queryYTApi(e: SubmitEvent) {
    e.preventDefault();
    await this._getYTSearchData.run([this.maxResults, this.query, this.apiKey] as const);
  };

  searchFormTemplate() {
    return html`
        <section id="search">
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
        </section>
    `;
  }

  resultsTemplate() {
    return html`
        <section id="results">
            ${this._getYTSearchData.render({
                initial: () => html`<p>Search results will display here</p>`,
                pending: () => html`<p>Searching YouTube for matching videos</p>`,
                complete: (value) => html`${value.items.map((item) =>
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
                                    <a rel="noopener noreferrer" href='https://www.youtube.com/watch?v=${item.id.videoId}'>${item.snippet.title}</a>
                                </h2>
                                <p class="card-description">${item.snippet.description}</p>
                                <div class="jh-card-footer" slot="jh-card-footer">
                                    <jh-button name="bookMark" appearance="secondary"
                                               label="BookMark Video" size="small"></jh-button>
                                    <div>Comment Count:
                                        <jh-badge count=${item.commentCount}></jh-badge>
                                    </div>
                                </div>
                            </jh-card>`
                )}`,
                error: (error) => html`<p>Oops, something went wrong: ${error}</p>`,
            })}
        </section>
    `;
  }

  render() {
    return html`
        <main>
            <h1>YouTube Search Module</h1>
            ${this.searchFormTemplate()}
            ${this.resultsTemplate()}
        </main>
    `;
  }
}