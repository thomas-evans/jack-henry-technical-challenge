import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import { query, state } from "lit/decorators.js";
import "@jack-henry/jh-elements/components/input-search/input-search.js";
import "@jack-henry/jh-elements/components/button/button.js";

@customElement("search-yt")
export class SearchYT extends LitElement {
    @state() maxResults = 25;
    @state() query = "";
    @state() apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    @state() mockData = true;

    @query("#searchForm") private searchForm: HTMLFormElement | undefined;

    static styles = css`
        #searchForm {
            display: flex;
            gap: 10px;
        }
    `;

    private async _queryYTApi(e: SubmitEvent) {
        e.preventDefault();
        this.dispatchEvent(
            new CustomEvent<[number, string, string, boolean]>("fireSearch", {
                detail: [this.maxResults, this.query, this.apiKey, this.mockData] as const,
            }),
        );
    }

    // added to create typical enter key function for search fields
    private _handleKeydown(event: KeyboardEvent) {
        if (event.key === "Enter") {
            event.preventDefault();
            if (!this.searchForm) return;
            this.searchForm.requestSubmit();
        }
    }

    render() {
        return html`
            <form id="searchForm" @submit=${this._queryYTApi}>
                <jh-input-search
                    name="ytSearchInput"
                    accessible-label="Input Search Terms for YouTube"
                    value=${this.query}
                    @jh-input=${(e: CustomEvent) => {
                        this.query = e.detail.value;
                    }}
                    @keydown="${this._handleKeydown}"
                ></jh-input-search>
                <jh-button
                    name="ytSearchSubmit"
                    appearance="primary"
                    label="Search YouTube"
                    submit
                ></jh-button>
            </form>
        `;
    }
}
