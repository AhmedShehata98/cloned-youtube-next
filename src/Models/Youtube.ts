export interface IThumbnailProps {
  url: string;
  width: number;
  height: number;
}

export interface IThumbnailTypes {
  default: IThumbnailProps;
  high: IThumbnailProps;
  medium: IThumbnailProps;
}
export interface IChannelThumbnail {
  medium: IThumbnailProps;
  default: IThumbnailProps;
  high: IThumbnailProps;
}
export interface IChannelItem {
  kind: string;
  id: string;
  brandingSettings: {
    channel: {
      title: string;
      description: string;
      keywords: string;
      unsubscribedTrailer: string;
    };
    image: {
      bannerExternalUrl: string;
    };
  };
  contentDetails: {
    relatedPlaylists: {
      likes: string;
      uploads: string;
    };
  };
  snippet: {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: string;
    thumbnails: IChannelThumbnail;
    localized: {
      title: string;
      description: string;
    };
  };

  statistics: {
    viewCount: string;
    subscriberCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
  };
}

export interface IChannelDetails {
  brandingSettings: {
    channel: {
      country: string;
      defaultLanguage: string;
      description: string;
      keywords: string;
      title: string;
      unsubscribedTrailer: string;
    };
    image: {
      bannerExternalUrl: string;
    };
  };
  contentDetails: {
    relatedPlaylists: {
      likes: string;
      uploads: string;
    };
  };
  id: string;
  kind: string;
  snippet: {
    title: string;
    country: string;
    customUrl: string;
    defaultLanguage: string;
    description: string;
    localized: {
      title: string;
      description: string;
    };
    publishedAt: string;
    thumbnails: IChannelThumbnail;
  };
  statistics: {
    viewCount: string;
    subscriberCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
  };
}
export interface IYtChannel {
  kind: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: IChannelItem[];
}
export interface Iitem {
  kind: string;
  id: {
    kind: string;
    videoId: string;
    channelId: string;
    playlistId: string;
  };
  snippet: {
    publishAt: string;
    channelId: string;
    title: string;
    description: string;
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
    thumbnails: {
      default: IThumbnailProps;
      high: IThumbnailProps;
      medium: IThumbnailProps;
    };
  };
}

export interface IYTVideosResponse {
  items: Iitem[];
  kind: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}
