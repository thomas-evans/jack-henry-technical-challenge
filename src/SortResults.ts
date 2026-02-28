import {customElement} from "lit/decorators/custom-element.js";
import {css, html, LitElement} from "lit";
import type {ModifiedSearchResponse, SortTypes} from "./types.ts";
import {state} from "lit/decorators.js";
import {consume} from "@lit/context";
import {resultsContext} from "./resultsContext.ts";
import '@jack-henry/jh-elements/components/button/button.js';
import '@jack-henry/jh-icons/icons-wc/icon-arrow-down-small.js';
import '@jack-henry/jh-icons/icons-wc/icon-arrow-up-small.js';


@customElement('sort-results')
export class SortResults extends LitElement{
  @state() currentSort: SortTypes = 1;
  @state() descendingOrder: boolean = true;

  @consume({context: resultsContext, subscribe: true})
  results: ModifiedSearchResponse | undefined;

  static styles = css`
    :host{
      display: flex;
      align-items: center;
    }
  `;

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
    this.dispatchEvent(new CustomEvent('sort'));
  };



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
        <h2>Sort Results</h2>
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
    `;
  }
}