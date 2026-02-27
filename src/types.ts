export interface SearchResponse {
  kind: string
  etag: string
  nextPageToken: string
  regionCode: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: SearchItem[]
}

export interface SearchItem {
  kind: string
  etag: string
  id: {
    kind: string
    channelId?: string
    videoId?: string
  }
  snippet: SearchSnippet
}


export interface SearchSnippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: Record<Thumbnail, ThumbnailContents>
  channelTitle: string
  liveBroadcastContent: string
  publishTime: string
}

type Thumbnail = "default" | "medium" | "high";

export interface ThumbnailContents {
  url: string
  width: number
  height: number
}

export interface VideoResponse {
  kind: string
  etag: string
  items: VideoItem[]
  pageInfo: PageInfo
}

export interface VideoItem {
  kind: string
  etag: string
  id: string
  statistics?: VideoStatistics
}

export interface VideoStatistics {
  viewCount: string
  likeCount?: string
  favoriteCount: string
  commentCount: string
}

export interface PageInfo {
  totalResults: number
  resultsPerPage: number
}


export interface ModifiedSearchResponse extends SearchResponse {
  items: ModifiedItem[]
}

export interface ModifiedItem extends SearchItem{
  statistics?: VideoStatistics
  relevanceIndex: number
}

export const sortTypes = {
  relevance: 1,
  date: 2,
  rating: 3
} as const;

export type SortTypes = typeof sortTypes[keyof typeof sortTypes];