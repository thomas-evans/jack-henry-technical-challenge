import { expect, test, describe } from "vitest";
import { mockSearch, mockVideoStats } from "./mockData.ts";

describe("mockSearch", () => {
    test("should have valid kind", () => {
        expect(mockSearch.kind).toBe("youtube#searchListResponse");
    });

    test("should have etag", () => {
        expect(mockSearch.etag).toBeDefined();
        expect(typeof mockSearch.etag).toBe("string");
    });

    test("should have pageInfo with totalResults", () => {
        expect(mockSearch.pageInfo.totalResults).toBeGreaterThan(0);
    });

    test("should have pageInfo with resultsPerPage", () => {
        expect(mockSearch.pageInfo.resultsPerPage).toBeGreaterThan(0);
    });

    test("should have items array", () => {
        expect(mockSearch.items).toBeDefined();
        expect(Array.isArray(mockSearch.items)).toBe(true);
        expect(mockSearch.items.length).toBeGreaterThan(0);
    });

    test("each item should have id with videoId", () => {
        mockSearch.items.forEach((item) => {
            expect(item.id).toBeDefined();
            expect(item.id.videoId).toBeDefined();
            expect(typeof item.id.videoId).toBe("string");
        });
    });

    test("each item should have snippet with title", () => {
        mockSearch.items.forEach((item) => {
            expect(item.snippet).toBeDefined();
            expect(item.snippet.title).toBeDefined();
            expect(typeof item.snippet.title).toBe("string");
        });
    });

    test("each item should have snippet with thumbnails", () => {
        mockSearch.items.forEach((item) => {
            expect(item.snippet.thumbnails).toBeDefined();
            expect(item.snippet.thumbnails.default).toBeDefined();
            expect(item.snippet.thumbnails.medium).toBeDefined();
            expect(item.snippet.thumbnails.high).toBeDefined();
        });
    });

    test("each thumbnail should have url, width, and height", () => {
        mockSearch.items.forEach((item) => {
            const thumbnails = item.snippet.thumbnails;
            Object.values(thumbnails).forEach((thumb) => {
                expect(thumb.url).toContain("https://i.ytimg.com/vi/");
                expect(thumb.width).toBeGreaterThan(0);
                expect(thumb.height).toBeGreaterThan(0);
            });
        });
    });

    test("should have channelTitle for each item", () => {
        mockSearch.items.forEach((item) => {
            expect(item.snippet.channelTitle).toBeDefined();
            expect(typeof item.snippet.channelTitle).toBe("string");
        });
    });

    test("should have publishTime for each item", () => {
        mockSearch.items.forEach((item) => {
            expect(item.snippet.publishTime).toBeDefined();
            expect(item.snippet.publishTime).toMatch(/^\d{4}-\d{2}-\d{2}T/);
        });
    });
});

describe("mockVideoStats", () => {
    test("should have valid kind", () => {
        expect(mockVideoStats.kind).toBe("youtube#videoListResponse");
    });

    test("should have etag", () => {
        expect(mockVideoStats.etag).toBeDefined();
        expect(typeof mockVideoStats.etag).toBe("string");
    });

    test("should have items array", () => {
        expect(mockVideoStats.items).toBeDefined();
        expect(Array.isArray(mockVideoStats.items)).toBe(true);
        expect(mockVideoStats.items.length).toBeGreaterThan(0);
    });

    test("each item should have id and statistics", () => {
        mockVideoStats.items.forEach((item) => {
            expect(item.id).toBeDefined();
            expect(typeof item.id).toBe("string");
            expect(item.statistics).toBeDefined();
        });
    });

    test("statistics should have viewCount and commentCount", () => {
        mockVideoStats.items.forEach((item) => {
            expect(item.statistics?.viewCount).toBeDefined();
            expect(item.statistics?.commentCount).toBeDefined();
        });
    });

    test("viewCount should be numeric string", () => {
        mockVideoStats.items.forEach((item) => {
            expect(item.statistics?.viewCount).toMatch(/^\d+$/);
        });
    });

    test("commentCount should be numeric string", () => {
        mockVideoStats.items.forEach((item) => {
            expect(item.statistics?.commentCount).toMatch(/^\d+$/);
        });
    });

    test("should have pageInfo with totalResults", () => {
        expect(mockVideoStats.pageInfo.totalResults).toBeGreaterThan(0);
    });
});

describe("Data Consistency", () => {
    test("all videoIds in mockSearch should have corresponding stats", () => {
        const searchVideoIds = mockSearch.items.map((item) => item.id.videoId);
        const statsVideoIds = mockVideoStats.items.map((item) => item.id);

        searchVideoIds.forEach((videoId) => {
            expect(statsVideoIds).toContain(videoId);
        });
    });

    test("number of search items should match stats items", () => {
        expect(mockSearch.items.length).toBe(mockVideoStats.items.length);
    });

    test("all search items should be videos (not channels)", () => {
        mockSearch.items.forEach((item) => {
            expect(item.id.kind).toBe("youtube#video");
            expect(item.id.videoId).toBeDefined();
        });
    });
});

describe("Edge Cases", () => {
    test("should handle items with empty descriptions", () => {
        const itemsWithEmptyDesc = mockSearch.items.filter(
            (item) => item.snippet.description === "",
        );
        expect(itemsWithEmptyDesc.length).toBeGreaterThan(0);
    });

    test("should handle statistics with missing likeCount", () => {
        const itemsWithoutLikes = mockVideoStats.items.filter(
            (item) => !item.statistics?.likeCount,
        );
        expect(itemsWithoutLikes.length).toBeGreaterThan(0);
    });

    test("should have diverse publish dates", () => {
        const years = new Set(
            mockSearch.items.map((item) => new Date(item.snippet.publishTime).getFullYear()),
        );
        expect(years.size).toBeGreaterThan(1);
    });

    test("should have videos with varying view counts", () => {
        const viewCounts = mockVideoStats.items.map((item) =>
            parseInt(item.statistics?.viewCount || "0"),
        );
        const maxViews = Math.max(...viewCounts);
        const minViews = Math.min(...viewCounts);
        expect(maxViews).toBeGreaterThan(minViews * 10);
    });
});
