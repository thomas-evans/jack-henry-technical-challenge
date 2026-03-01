import { customElement } from "lit/decorators/custom-element.js";
import { css, html, LitElement } from "lit";
import type { ModifiedItem, ModifiedSearchResponse, SortTypes } from "./util/types.ts";
import { state } from "lit/decorators.js";
import { consume } from "@lit/context";
import { resultsContext } from "./util/resultsContext.ts";
import "@jack-henry/jh-elements/components/button/button.js";
import "@jack-henry/jh-icons/icons-wc/icon-arrow-down-small.js";
import "@jack-henry/jh-icons/icons-wc/icon-arrow-up-small.js";

@customElement("sort-results")
export class SortResults extends LitElement {
    @state() currentSort: SortTypes = 1;
    @state() descendingOrder: boolean = true;

    @consume({ context: resultsContext, subscribe: true })
    results: ModifiedSearchResponse | undefined;

    static styles = css`
        :host {
            display: flex;
            align-items: center;
        }
    `;

    private sortResults(e: Event) {
        const targetElement = e.target as HTMLElement;
        if (e.target === e.currentTarget) return;
        let sortType: SortTypes | undefined;
        sortType = parseInt(targetElement.getAttribute("sortType")!) as typeof sortType;
        if (sortType === undefined) return;
        if (isNaN(sortType)) {
            const parentElement = targetElement.parentElement;
            if (!parentElement) return;
            const sortAttribute = parentElement.getAttribute("sortType");
            if (!sortAttribute) return;
            sortType = parseInt(sortAttribute) as typeof sortType;
        }
        if (sortType === this.currentSort) {
            this.descendingOrder = !this.descendingOrder;
        } else {
            this.descendingOrder = true;
        }
        this.currentSort = sortType;

        const comparators: Record<SortTypes, (a: ModifiedItem, b: ModifiedItem) => number> = {
            1: (a, b) => a.relevanceIndex - b.relevanceIndex,
            2: (a, b) =>
                new Date(a.snippet.publishTime).valueOf() -
                new Date(b.snippet.publishTime).valueOf(),
            3: (a, b) =>
                Number(a.statistics?.likeCount ?? "0") - Number(b.statistics?.likeCount ?? "0"),
        };

        const comparator = comparators[sortType];
        if (comparator) {
            this.results?.items.sort(comparator);
            if (!this.descendingOrder) this.results?.items.reverse();
        }
        this.dispatchEvent(new CustomEvent("sort"));
    }

    sortOrderIconTemplate(sortType: number) {
        // I added this span to prevent #handleSlotChange in
        // node_modules/@jack-henry/jh-elements/components/button/button.js
        // from throwing when I remove the sort order icons
        if (this.currentSort !== sortType) return html`<span></span>`;
        return this.descendingOrder
            ? html` <jh-icon-arrow-down-small slot="jh-button-icon"></jh-icon-arrow-down-small>`
            : html` <jh-icon-arrow-up-small slot="jh-button-icon"></jh-icon-arrow-up-small>`;
    }

    render() {
        return html`
            <h2>Sort Results</h2>
            <div @click=${this.sortResults}>
                <jh-button
                    name="sortByRelevance"
                    appearance="tertiary"
                    label="Relevance"
                    size="small"
                    icon-position="after"
                    sortType="1"
                >
                    ${this.sortOrderIconTemplate(1)}
                </jh-button>
                <jh-button
                    name="sortByDate"
                    appearance="tertiary"
                    label="Date"
                    size="small"
                    icon-position="after"
                    sortType="2"
                >
                    ${this.sortOrderIconTemplate(2)}
                </jh-button>
                <jh-button
                    name="sortByRating"
                    appearance="tertiary"
                    label="Rating"
                    size="small"
                    icon-position="after"
                    sortType="3"
                >
                    ${this.sortOrderIconTemplate(3)}
                </jh-button>
            </div>
        `;
    }
}
