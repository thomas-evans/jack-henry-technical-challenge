import {customElement} from "lit/decorators/custom-element.js";
import {html, LitElement} from "lit";
import "./SearchYT.ts";
import {provide} from "@lit/context";
import {resultsContext} from "./resultsContext.ts";
import {state} from "lit/decorators.js";
import type {
  FireSearchEvent,
  ModifiedSearchResponse,
  SearchResponse,
  SortEvent,
  VideoResponse,
  VideoStatistics
} from "./types.ts";
import {setJhTheme} from '@jack-henry/jh-elements/utils/themeProvider.js';

import "./SearchYT.ts";
import "./SortResults.ts";
import "./ResultsGrid.ts";
import {Task, TaskStatus} from "@lit/task";
import {mockSearch, mockVideoStats} from "./mockData.ts";

// todo create bookmark component

setJhTheme();

@customElement('search-module')
export class YTSearchModule extends LitElement{
  @provide({context: resultsContext})
  @state() results: ModifiedSearchResponse | undefined = undefined;

  @state() sortOrderFromYT: (string | undefined)[] | undefined = undefined;

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

  resultsTemplate() {
    switch (this._getYTSearchData.status) {
      case TaskStatus.INITIAL:
        return html`<p>Search results will display here</p>`;
      case TaskStatus.PENDING:
        return html`<p>Searching YouTube for relevant videos</p>`;
      case TaskStatus.COMPLETE:
        console.log('getting here');
        if (!this.results) {
          this.results = this._getYTSearchData.value;
        }
        return html`<results-grid></results-grid>`
      case TaskStatus.ERROR:
        return html`<p>Oops, something went wrong: ${this._getYTSearchData.error}</p>`;
    }
  }

  render() {
    return html`      
          <main>
              <h1>YouTube Search Module</h1>
              <search-yt @fireSearch=${async (e:FireSearchEvent)=> await this._getYTSearchData.run(e.detail)}></search-yt>
              <sort-results @sort=${(e: SortEvent)=>this.results = e.detail}></sort-results>
              ${this.resultsTemplate()}              
          </main>          
      
    `;
  }
}