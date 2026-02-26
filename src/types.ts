export interface SearchResponse {
  kind: string
  etag: string
  nextPageToken: string
  regionCode: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: Item[]
}

export interface Item {
  kind: string
  etag: string
  id: {
    kind: string
    channelId?: string
    videoId?: string
  }
  snippet: Snippet
}


export interface Snippet {
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
  width?: number
  height?: number
}