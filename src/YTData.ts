import {html, LitElement} from "lit";
import {Task} from "@lit/task";
import {customElement} from "lit/decorators/custom-element.js";
import type {SearchResponse} from "./types.ts";
import { property } from "lit/decorators.js";


@customElement('yt-data')
export class YTData extends LitElement {
  @property() maxResults = 25;
  @property() query = "";
  @property() apiKey = `${import.meta.env.VITE_YOUTUBE_API_KEY}`;

  private _getYTSearchData = new Task(
    this,
    {
      task: async ([maxResults, q, key]): Promise<SearchResponse> => {
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${q}%20&key=${key}`);
        return response.json();
      },
      autoRun: false
    }
  );

  render() {
    return html`
        <button @click=${this._onClick}>Search YouTube</button>
    `;
  }

  private _onClick() {
    this._getYTSearchData.run([this.maxResults, this.query, this.apiKey] as const);
  }
}