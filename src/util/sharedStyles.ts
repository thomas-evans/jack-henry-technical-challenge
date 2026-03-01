import { css } from "lit";

export const sharedStyles = css`
    main {
        display: grid;
        font-family: "Roboto Flex", Roboto, Helvetica, Arial, sans-serif;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
        grid-template-areas:
            ". header ."
            ". search ."
            ". sort ."
            "results results results";
        gap: 20px 20px;
        grid-auto-flow: row;
    }

    header {
        grid-area: header;
    }

    #search {
        grid-area: search;
    }

    #sort {
        grid-area: sort;
    }

    #results,
    #bookmarks {
        grid-area: results;
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: center;
    }

    .card-description {
        margin: 0;
    }

    jh-card {
        max-width: 480px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
    @media screen and (max-width: 1200px) {
        main {
            grid-template-columns: 1fr;
            grid-template-areas:
                "header"
                "search"
                "sort"
                "results";
        }
    }
`;
