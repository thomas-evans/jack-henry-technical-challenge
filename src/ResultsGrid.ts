import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators/custom-element.js";
import '@jack-henry/jh-elements/components/button/button.js';
import '@jack-henry/jh-elements/components/card/card.js';
import '@jack-henry/jh-elements/components/tag/tag.js';
import '@jack-henry/jh-elements/components/badge/badge.js';
import type {ModifiedSearchResponse} from "./types.ts";
import {consume} from "@lit/context";
import {resultsContext} from "./resultsContext.ts";

@customElement("results-grid")
export class ResultsGrid extends LitElement {

  @consume({context: resultsContext})
  results: ModifiedSearchResponse | undefined;

  static styles = css`
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


  render() {
    console.log('rendering grid');
    if (!this.results) return;
    return html`
        <section id="results">
            ${this.results.items.map((item) =>
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
                            <p class="card-description">${item.snippet.description}</p>
                            <div class="jh-card-footer" slot="jh-card-footer">
                                <jh-button name="bookMark" appearance="secondary"
                                           label="BookMark Video" size="small"></jh-button>
                                <div>Comment Count:
                                    <jh-badge count=${item.statistics?.commentCount}></jh-badge>
                                </div>
                            </div>
                        </jh-card>`
            )}
        </section>`
  }
}