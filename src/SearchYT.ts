import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators/custom-element.js";
import {state} from "lit/decorators.js";
import '@jack-henry/jh-elements/components/input-search/input-search.js';
import '@jack-henry/jh-elements/components/button/button.js';



@customElement('search-yt')
export class SearchYT extends LitElement {
  @state() maxResults = 25;
  @state() query = "";
  @state() apiKey = `${import.meta.env.VITE_YOUTUBE_API_KEY}`;
  @state() mockData = true;

  static styles = css`
    #searchForm {
      display: flex;
      gap: 10px;
    }
  `;

  private async _queryYTApi(e: SubmitEvent) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent<[number, string, string, boolean]>('fireSearch', {detail: [this.maxResults, this.query, this.apiKey, this.mockData] as const}));
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

  render() {
    return html`
        <section id="search">
            ${this.searchFormTemplate()}
        </section>
    `;
  }
}