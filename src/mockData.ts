import type { SearchResponse, VideoResponse } from "./types.ts";

const createThumbnails = (videoId: string) => ({
    default: { url: `https://i.ytimg.com/vi/${videoId}/default.jpg`, width: 120, height: 90 },
    medium: { url: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`, width: 320, height: 180 },
    high: { url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`, width: 480, height: 360 },
});

export const mockSearch: SearchResponse = {
    kind: "youtube#searchListResponse",
    etag: "t_qnpVMqwhvDnwDI360Az-9xFGA",
    nextPageToken: "CBkQAA",
    regionCode: "US",
    pageInfo: {
        totalResults: 1000000,
        resultsPerPage: 25,
    },
    items: [
        {
            kind: "youtube#searchResult",
            etag: "pX8tQ2AKyHnMm340IJnPNdEW3Pc",
            id: {
                kind: "youtube#video",
                videoId: "RgmbV_2FmF8",
            },
            snippet: {
                publishedAt: "2025-12-12T17:00:49Z",
                channelId: "UC2HNqPgeKtVr2gZmLeeIk3g",
                title: "How To Make Croissants At Home",
                description:
                    "The perfect croissant is buttery, flaky, fluffy, and irresistible. With a few simple ingredients and patience, you can make the most ...",
                thumbnails: createThumbnails("RgmbV_2FmF8"),
                channelTitle: "Nick's Kitchen",
                liveBroadcastContent: "none",
                publishTime: "2025-12-12T17:00:49Z",
            },
        },
        {
            kind: "youtube#searchResult",
            etag: "hlL-HgAONfo_UqH6z0E2g8dR5uw",
            id: {
                kind: "youtube#video",
                videoId: "djnNkLi_K6E",
            },
            snippet: {
                publishedAt: "2022-04-08T17:00:23Z",
                channelId: "UCJFp8uSYCjXOMnkUyb3CQ3Q",
                title: "How To Make The Best Croissants At Home",
                description:
                    "Watch More Tasty 101: https://www.youtube.com/playlist?list=PL8zglt-LDl-g6B-VumB3Hv_8EhVFrEVOn These perfect croissants ...",
                thumbnails: createThumbnails("djnNkLi_K6E"),
                channelTitle: "Tasty",
                liveBroadcastContent: "none",
                publishTime: "2022-04-08T17:00:23Z",
            },
        },
        {
            kind: "youtube#searchResult",
            etag: "JrncUN5ANL5klY_QKpaX8jRkP-Y",
            id: {
                kind: "youtube#video",
                videoId: "0nHC33ngLeU",
            },
            snippet: {
                publishedAt: "2024-12-15T05:17:59Z",
                channelId: "UCtYPTM2s0sYbyZWyG_iewUA",
                title: "Croissant 🥐 #french #funny #viralvideo #trending #shorts",
                description: "",
                thumbnails: createThumbnails("0nHC33ngLeU"),
                channelTitle: "I have controversial opinions",
                liveBroadcastContent: "none",
                publishTime: "2024-12-15T05:17:59Z",
            },
        },
        {
            kind: "youtube#searchResult",
            etag: "Ehb3Bftmp0QGXyStWXn41eM9DmU",
            id: {
                kind: "youtube#video",
                videoId: "gPibdR4GtDI",
            },
            snippet: {
                publishedAt: "2025-04-26T14:38:22Z",
                channelId: "UC6j8I_YskDRSRR0tZ5NQBgg",
                title: "Easy Homemade Croissant 🥐",
                description: "",
                thumbnails: createThumbnails("gPibdR4GtDI"),
                channelTitle: "foodzizzles",
                liveBroadcastContent: "none",
                publishTime: "2025-04-26T14:38:22Z",
            },
        },
        {
            kind: "youtube#searchResult",
            etag: "isPQEZlmF8fHQfJygDQe6xLg-fU",
            id: {
                kind: "youtube#video",
                videoId: "uMCE2v6qpT8",
            },
            snippet: {
                publishedAt: "2023-08-24T14:32:14Z",
                channelId: "UClQQ-PD3rMT2nyYIn9mQL_Q",
                title: "FIRST TIME making homemade croissants 🥐 using Claire Saffitz’ recipe!",
                description: "",
                thumbnails: createThumbnails("uMCE2v6qpT8"),
                channelTitle: "Hello Bake",
                liveBroadcastContent: "none",
                publishTime: "2023-08-24T14:32:14Z",
            },
        },
        {
            kind: "youtube#searchResult",
            etag: "6NldlCbvmD-6XtThQdVJ0nCa0nk",
            id: {
                kind: "youtube#video",
                videoId: "4Kjv7kQF9lE",
            },
            snippet: {
                publishedAt: "2023-03-26T23:40:48Z",
                channelId: "UCqgWc2OZlNIeka5h0CN6KYw",
                title: "It is so easy to make #croissants at home, of course, with some practice Details are in description",
                description:
                    "Please find detailed instructions on how to make perfect croissants on my website ...",
                thumbnails: createThumbnails("4Kjv7kQF9lE"),
                channelTitle: "Natashas_Baking",
                liveBroadcastContent: "none",
                publishTime: "2023-03-26T23:40:48Z",
            },
        },
        {
            kind: "youtube#searchResult",
            etag: "IggJ-pDBFPgJWoDX2AWrSmdBtac",
            id: {
                kind: "youtube#video",
                videoId: "GiN9w2a7wTc",
            },
            snippet: {
                publishedAt: "2024-12-17T00:05:17Z",
                channelId: "UCuEnYlSiPIwtdK3WjrgSkFQ",
                title: "A strawberry croissant? 🌸 #croissant #pastry #baking #recipe #sourdough",
                description: "",
                thumbnails: createThumbnails("GiN9w2a7wTc"),
                channelTitle: "Jesha Ann Stevens",
                liveBroadcastContent: "none",
                publishTime: "2024-12-17T00:05:17Z",
            },
        },
        {
            kind: "youtube#searchResult",
            etag: "8QhGaUa6RGCx4t1kg_ZhmFq_7XU",
            id: {
                kind: "youtube#video",
                videoId: "vpwY3nmLLaA",
            },
            snippet: {
                publishedAt: "2021-05-07T17:00:26Z",
                channelId: "UC1rIOwTqDuWkFj87HZYRFOg",
                title: "Make Perfect Croissants With Claire Saffitz | Try This at Home | NYT Cooking",
                description:
                    "Get the recipes: Croissants: https://nyti.ms/2RrNUnL Pain au Chocolat: https://nyti.ms/2RuxP0A Ham and Cheese Croissants: ...",
                thumbnails: createThumbnails("vpwY3nmLLaA"),
                channelTitle: "NYT Cooking",
                liveBroadcastContent: "none",
                publishTime: "2021-05-07T17:00:26Z",
            },
        },
        {
            kind: "youtube#searchResult",
            etag: "b6SCI5N7aVVcBm-iR0Ll8gnlSW8",
            id: {
                kind: "youtube#video",
                videoId: "gRxl_6v1Egg",
            },
            snippet: {
                publishedAt: "2023-04-06T17:39:35Z",
                channelId: "UC0fvGpDXi7sV2hbgD-O47yw",
                title: "The Croissant to share! 🥐 The perfect breakfast pastry for Sunday brunch! #amauryguichon #croissant",
                description: "",
                thumbnails: createThumbnails("gRxl_6v1Egg"),
                channelTitle: "Amaury Guichon",
                liveBroadcastContent: "none",
                publishTime: "2023-04-06T17:39:35Z",
            },
        },
        {
            kind: "youtube#searchResult",
            etag: "to0pQ4CATD950OtKcxgwMdtQ2xw",
            id: {
                kind: "youtube#video",
                videoId: "K76tgR-sozo",
            },
            snippet: {
                publishedAt: "2022-11-03T16:00:16Z",
                channelId: "UCmGShZALa05bKhGsA86ZM2w",
                title: "NUTELLA CROISSANTS🤩🥐 #shorts",
                description: "This recipe isn't a WANT its a NEED. #shortsfood.",
                thumbnails: createThumbnails("K76tgR-sozo"),
                channelTitle: "Caught Snackin'",
                liveBroadcastContent: "none",
                publishTime: "2022-11-03T16:00:16Z",
            },
        },
        {
            kind: "youtube#searchResult",
            etag: "tzmE8UrJemhNeoFozhOAEBii5uw",
            id: {
                kind: "youtube#video",
                videoId: "l-4hEBgfZxs",
            },
            snippet: {
                publishedAt: "2025-10-09T19:00:42Z",
                channelId: "UCTvYEid8tmg0jqGPDkehc_Q",
                title: "Homemade Croissants Recipe",
                description:
                    "My homemade Croissant recipe is a buttery, flaky pastry-lover's dream, especially served warm with a generous smear of butter!",
                thumbnails: createThumbnails("l-4hEBgfZxs"),
                channelTitle: "Preppy Kitchen",
                liveBroadcastContent: "none",
                publishTime: "2025-10-09T19:00:42Z",
            },
        },
        {
            kind: "youtube#searchResult",
            etag: "5tns3RDKzxhyRLqJvgcQ0uST9as",
            id: {
                kind: "youtube#video",
                videoId: "t908lbEPN6A",
            },
            snippet: {
                publishedAt: "2025-02-21T00:33:04Z",
                channelId: "UCuuLy9wn33DAE7qNt7oVGww",
                title: "Croissant in Paris vs United States",
                description:
                    "Have you tried them? Which one do you this is the best croissant? #french #travel.",
                thumbnails: createThumbnails("t908lbEPN6A"),
                channelTitle: "DanCookedIt",
                liveBroadcastContent: "none",
                publishTime: "2025-02-21T00:33:04Z",
            },
        },
        {
            kind: "youtube#searchResult",
            etag: "Ct8usWuZHoEo0zn0kbzuty-kfwo",
            id: {
                kind: "youtube#video",
                videoId: "LAwooNmfr-U",
            },
            snippet: {
                publishedAt: "2025-09-28T10:05:00Z",
                channelId: "UC0uTbw5RVTdhkyY_lnCCOEA",
                title: "The new way to make croissants that is conquering the world!",
                description:
                    "The new way to make croissants that is conquering the world! Ingredients milk: 300 ml (10 fl oz) water: 300 ml (10 fl oz) sugar: 120 ...",
                thumbnails: createThumbnails("LAwooNmfr-U"),
                channelTitle: "Cookrate - Dough Recipes",
                liveBroadcastContent: "none",
                publishTime: "2025-09-28T10:05:00Z",
            },
        },
        {
            kind: "youtube#searchResult",
            etag: "yqdp0yjO0SMrMKGdDwLLKTsLyOU",
            id: {
                kind: "youtube#video",
                videoId: "EuhQnUQY5ek",
            },
            snippet: {
                publishedAt: "2024-09-04T16:56:01Z",
                channelId: "UC0fvGpDXi7sV2hbgD-O47yw",
                title: "Giant Croissant! 🥐 The making of the croissant from the coffee cup video! #amauryguichon #croissant",
                description: "",
                thumbnails: createThumbnails("EuhQnUQY5ek"),
                channelTitle: "Amaury Guichon",
                liveBroadcastContent: "none",
                publishTime: "2024-09-04T16:56:01Z",
            },
        },
        {
            kind: "youtube#searchResult",
            etag: "Y6MNQudUAoWLWhoXjytoYIFLa4M",
            id: {
                kind: "youtube#video",
                videoId: "L2ZAZc7sNEs",
            },
            snippet: {
                publishedAt: "2024-12-22T15:30:06Z",
                channelId: "UChBEbMKI1eCcejTtmI32UEw",
                title: "I Tried The Best Croissant in The World",
                description:
                    "There are a lot of croissants here... so we better get to work. Thank you to Eating Europe and Adriana for helping us pull this off.",
                thumbnails: createThumbnails("L2ZAZc7sNEs"),
                channelTitle: "Joshua Weissman",
                liveBroadcastContent: "none",
                publishTime: "2024-12-22T15:30:06Z",
            },
        },
        {
            kind: "youtube#searchResult",
            etag: "xYF74PyLTSsXgbJfIXGQ8kejnNg",
            id: {
                kind: "youtube#video",
                videoId: "ANKI177u6_A",
            },
            snippet: {
                publishedAt: "2023-12-21T19:59:17Z",
                channelId: "UCMpVQVKYRb_xXnevxQjYepQ",
                title: "I baked perfect croissants #cooking #food #foodasmr #recipe",
                description: "",
                thumbnails: createThumbnails("ANKI177u6_A"),
                channelTitle: "Louis Gantus",
                liveBroadcastContent: "none",
                publishTime: "2023-12-21T19:59:17Z",
            },
        },
        {
            kind: "youtube#searchResult",
            etag: "bLKkFLPKgLvxRB-xnnfnAxgpgps",
            id: {
                kind: "youtube#video",
                videoId: "hJxaVD6eAtc",
            },
            snippet: {
                publishedAt: "2018-11-05T19:45:00Z",
                channelId: "UChBEbMKI1eCcejTtmI32UEw",
                title: "How To Make Proper Croissants Completely By Hand",
                description:
                    "This Croissant recipe is about as minimal equipment as you can get in a recipe. It's a no machine, as well as a no knead recipe.",
                thumbnails: createThumbnails("hJxaVD6eAtc"),
                channelTitle: "Joshua Weissman",
                liveBroadcastContent: "none",
                publishTime: "2018-11-05T19:45:00Z",
            },
        },
        {
            kind: "youtube#searchResult",
            etag: "az0MQ325P_Q_WuJqyJDZbSNq2k8",
            id: {
                kind: "youtube#video",
                videoId: "DzG-0slfnkc",
            },
            snippet: {
                publishedAt: "2024-01-27T14:00:09Z",
                channelId: "UC93iVjVDI3-XvHmtpNslMrw",
                title: "What makes a real French croissant?",
                description:
                    "Croissants are a staple in French pastry. A fresh coffee and a croissant create the perfect breakfast combination. So, how are ...",
                thumbnails: createThumbnails("DzG-0slfnkc"),
                channelTitle: "DW Food",
                liveBroadcastContent: "none",
                publishTime: "2024-01-27T14:00:09Z",
            },
        },
        {
            kind: "youtube#searchResult",
            etag: "l7PbsCt_hH7IrrIhXdXTF5SLcQ0",
            id: {
                kind: "youtube#video",
                videoId: "XlenPgYGTm4",
            },
            snippet: {
                publishedAt: "2024-06-27T16:00:29Z",
                channelId: "UC4tAgeVdaNB5vD_mBoxg50w",
                title: "How to Make 3 Viral Croissant Recipes (Crookie, Flat Croissant &amp; More) | Allrecipes",
                description:
                    "Nicole makes three viral TikTok croissant recipes using a $6 box of Costco croissants! Crookie - 0:00 ...",
                thumbnails: createThumbnails("XlenPgYGTm4"),
                channelTitle: "Allrecipes",
                liveBroadcastContent: "none",
                publishTime: "2024-06-27T16:00:29Z",
            },
        },
        {
            kind: "youtube#searchResult",
            etag: "UgBW_hcGcNUvclBhrgvQic1pYNw",
            id: {
                kind: "youtube#video",
                videoId: "K4Jwsl6BoHQ",
            },
            snippet: {
                publishedAt: "2020-11-29T13:00:14Z",
                channelId: "UCcsSowAamCLJv-xeF9geXoA",
                title: "How to Make CROISSANTS Like a Pastry Chef",
                description:
                    "Croissants are decadent crescents of flakey, crispy, chewy goodness and in many ways, a work of art. They can be enjoyed ...",
                thumbnails: createThumbnails("K4Jwsl6BoHQ"),
                channelTitle: "Vincenzo's Plate",
                liveBroadcastContent: "none",
                publishTime: "2020-11-29T13:00:14Z",
            },
        },
        {
            kind: "youtube#searchResult",
            etag: "4aU6xuw76cosS7XCWoHIipYg9is",
            id: {
                kind: "youtube#video",
                videoId: "Y3zqfa2pHAE",
            },
            snippet: {
                publishedAt: "2025-08-23T07:15:05Z",
                channelId: "UCbFDOSeFTQjb5nLhe9_6ueg",
                title: "Bee croissants with honey filling 🐝🍯🥐 #croissant",
                description: "",
                thumbnails: createThumbnails("Y3zqfa2pHAE"),
                channelTitle: "Rustic bakery",
                liveBroadcastContent: "none",
                publishTime: "2025-08-23T07:15:05Z",
            },
        },
        {
            kind: "youtube#searchResult",
            etag: "hKSe2Bqi-SVztd-0PvPuQK14bnE",
            id: {
                kind: "youtube#video",
                videoId: "mT4cqHc4HqU",
            },
            snippet: {
                publishedAt: "2021-07-15T16:00:32Z",
                channelId: "UCn5fhcGRrCvrmFibPbT6q1A",
                title: "FLAKEY HOMEMADE CROISSANTS (Beginner Friendly)",
                description:
                    "Fresh, flakey croissants are the ultimate home bakers reward. These croissants so flakey, buttery, and delicious that you wouldn't ...",
                thumbnails: createThumbnails("mT4cqHc4HqU"),
                channelTitle: "Brian Lagerstrom ",
                liveBroadcastContent: "none",
                publishTime: "2021-07-15T16:00:32Z",
            },
        },
        {
            kind: "youtube#searchResult",
            etag: "U1EWdECm5Lo-8lo3wHTHSjI2zJc",
            id: {
                kind: "youtube#video",
                videoId: "Dt9sJ1J4Y9g",
            },
            snippet: {
                publishedAt: "2025-03-14T15:19:40Z",
                channelId: "UCUYiOr24r02GuIFMEjYyuOw",
                title: "Homemade Pistachio Cream Croissants😋 #food",
                description: "",
                thumbnails: createThumbnails("Dt9sJ1J4Y9g"),
                channelTitle: "Turkuaz Kitchen",
                liveBroadcastContent: "none",
                publishTime: "2025-03-14T15:19:40Z",
            },
        },
        {
            kind: "youtube#searchResult",
            etag: "E_yKC5WDNKuLz6BbV6yxngpLnBM",
            id: {
                kind: "youtube#video",
                videoId: "0CeQYPom734",
            },
            snippet: {
                publishedAt: "2023-10-15T12:45:00Z",
                channelId: "UCD0qzKrNUFS7TXVcwgnjd2A",
                title: "rolling the croissant 🥐#croissant  #shorts #bake",
                description:
                    "rolling the croissant #croissant #shorts #bake #bakery #breads #youtubeshorts #ytshorts #roll #croissants Video tags : how to ...",
                thumbnails: createThumbnails("0CeQYPom734"),
                channelTitle: "Baking Raja",
                liveBroadcastContent: "none",
                publishTime: "2023-10-15T12:45:00Z",
            },
        },
    ],
};

export const mockVideoStats: VideoResponse = {
    kind: "youtube#videoListResponse",
    etag: "FjiCEHuwVixkkAChvucooaIHy9Y",
    items: [
        {
            kind: "youtube#video",
            etag: "eHsylfZnOwf7tyYljUKXrReyjio",
            id: "RgmbV_2FmF8",
            statistics: {
                viewCount: "506212",
                likeCount: "8010",
                favoriteCount: "0",
                commentCount: "300",
            },
        },
        {
            kind: "youtube#video",
            etag: "1fyySohiId50kYx6fwugrnFdDfc",
            id: "djnNkLi_K6E",
            statistics: {
                viewCount: "2346975",
                likeCount: "42020",
                favoriteCount: "0",
                commentCount: "1009",
            },
        },
        {
            kind: "youtube#video",
            etag: "C7Ho_jrKm5kBUHr2Ri4CUlDg-uQ",
            id: "0nHC33ngLeU",
            statistics: {
                viewCount: "174271",
                likeCount: "3789",
                favoriteCount: "0",
                commentCount: "87",
            },
        },
        {
            kind: "youtube#video",
            etag: "hwpwRh25c28thyheVcBHQI7_iRw",
            id: "gPibdR4GtDI",
            statistics: {
                viewCount: "488833",
                likeCount: "12210",
                favoriteCount: "0",
                commentCount: "102",
            },
        },
        {
            kind: "youtube#video",
            etag: "P3N7OXLhLsBRWdYBrkE2cme7O8I",
            id: "uMCE2v6qpT8",
            statistics: {
                viewCount: "103004",
                likeCount: "1791",
                favoriteCount: "0",
                commentCount: "26",
            },
        },
        {
            kind: "youtube#video",
            etag: "cwNNtatcLo1APyq5YJzJv5lPMs0",
            id: "4Kjv7kQF9lE",
            statistics: {
                viewCount: "3816143",
                likeCount: "138118",
                favoriteCount: "0",
                commentCount: "272",
            },
        },
        {
            kind: "youtube#video",
            etag: "7s4oIq_XN2-ga331VFlE6_jY8n4",
            id: "GiN9w2a7wTc",
            statistics: {
                viewCount: "51972544",
                likeCount: "2338634",
                favoriteCount: "0",
                commentCount: "14485",
            },
        },
        {
            kind: "youtube#video",
            etag: "IA8JpiCKNnoiFtWDOLbeZg2Us7s",
            id: "vpwY3nmLLaA",
            statistics: {
                viewCount: "5585754",
                likeCount: "117006",
                favoriteCount: "0",
                commentCount: "3558",
            },
        },
        {
            kind: "youtube#video",
            etag: "iz6G714t8F5Tf_w5gy-mGQ0e_00",
            id: "gRxl_6v1Egg",
            statistics: {
                viewCount: "11338610",
                likeCount: "543172",
                favoriteCount: "0",
                commentCount: "1998",
            },
        },
        {
            kind: "youtube#video",
            etag: "aEqiAKRv96LCT_tNVLGVsgQFEe4",
            id: "K76tgR-sozo",
            statistics: {
                viewCount: "1179994",
                likeCount: "21177",
                favoriteCount: "0",
                commentCount: "94",
            },
        },
        {
            kind: "youtube#video",
            etag: "Scf_DD8KyfdX0RGleEyrKN5sZWo",
            id: "l-4hEBgfZxs",
            statistics: {
                viewCount: "628399",
                likeCount: "12561",
                favoriteCount: "0",
                commentCount: "914",
            },
        },
        {
            kind: "youtube#video",
            etag: "uqIXIm7b98h5Bvf6rkZJp_ml2yg",
            id: "t908lbEPN6A",
            statistics: {
                viewCount: "8130250",
                likeCount: "317210",
                favoriteCount: "0",
                commentCount: "2492",
            },
        },
        {
            kind: "youtube#video",
            etag: "Gg9aqRkU2X5uS128NIxecW1OBiU",
            id: "LAwooNmfr-U",
            statistics: {
                viewCount: "386531",
                likeCount: "8625",
                favoriteCount: "0",
                commentCount: "91",
            },
        },
        {
            kind: "youtube#video",
            etag: "P5VSPTtnHC994ze7PV94QIVG9GY",
            id: "EuhQnUQY5ek",
            statistics: {
                viewCount: "16599451",
                likeCount: "680425",
                favoriteCount: "0",
                commentCount: "2556",
            },
        },
        {
            kind: "youtube#video",
            etag: "0UXuBP2hdQSUYmi0NjPKCuxsagA",
            id: "L2ZAZc7sNEs",
            statistics: {
                viewCount: "1981418",
                likeCount: "40260",
                favoriteCount: "0",
                commentCount: "1432",
            },
        },
        {
            kind: "youtube#video",
            etag: "PCpux5ze0M2EmRbprs-ozRitY1w",
            id: "ANKI177u6_A",
            statistics: {
                viewCount: "18381189",
                favoriteCount: "0",
                commentCount: "12499",
            },
        },
        {
            kind: "youtube#video",
            etag: "plbq64_m9L-x5VTTHVujHBWCmDI",
            id: "hJxaVD6eAtc",
            statistics: {
                viewCount: "11649199",
                likeCount: "240575",
                favoriteCount: "0",
                commentCount: "9143",
            },
        },
        {
            kind: "youtube#video",
            etag: "oQqKjYTqA7InctNjWUfKcRHirOs",
            id: "DzG-0slfnkc",
            statistics: {
                viewCount: "459798",
                likeCount: "6017",
                favoriteCount: "0",
                commentCount: "212",
            },
        },
        {
            kind: "youtube#video",
            etag: "bNpHJS8Yo9hMMThU-zXgzdVHqwI",
            id: "XlenPgYGTm4",
            statistics: {
                viewCount: "311481",
                likeCount: "8199",
                favoriteCount: "0",
                commentCount: "218",
            },
        },
        {
            kind: "youtube#video",
            etag: "dYe6AuR5Ea1DJJjdL9GJm-qB-94",
            id: "K4Jwsl6BoHQ",
            statistics: {
                viewCount: "921393",
                likeCount: "19657",
                favoriteCount: "0",
                commentCount: "1088",
            },
        },
        {
            kind: "youtube#video",
            etag: "yXngSxlnRuyUBYZzivath-nqXm0",
            id: "Y3zqfa2pHAE",
            statistics: {
                viewCount: "15460705",
                likeCount: "230048",
                favoriteCount: "0",
                commentCount: "630",
            },
        },
        {
            kind: "youtube#video",
            etag: "FtOOXYfaKhWl-VX4xpUlqiib0_0",
            id: "mT4cqHc4HqU",
            statistics: {
                viewCount: "1544533",
                likeCount: "38596",
                favoriteCount: "0",
                commentCount: "1270",
            },
        },
        {
            kind: "youtube#video",
            etag: "oUHuSceTzNiWXDb7ASMgJwfM19w",
            id: "Dt9sJ1J4Y9g",
            statistics: {
                viewCount: "5455297",
                likeCount: "250700",
                favoriteCount: "0",
                commentCount: "935",
            },
        },
        {
            kind: "youtube#video",
            etag: "SY186iqyPiZ6XK6hlkR1_I2oaVQ",
            id: "0CeQYPom734",
            statistics: {
                viewCount: "5309070",
                likeCount: "30466",
                favoriteCount: "0",
                commentCount: "132",
            },
        },
    ],
    pageInfo: {
        totalResults: 24,
        resultsPerPage: 24,
    },
};
