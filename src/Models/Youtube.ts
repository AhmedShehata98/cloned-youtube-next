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

export interface ISuggestVideoItems {
  kind: string;
  id: { kind: string; videoId: string };
  snippet: {
    channelId: string;
    channelTitle: string;
    title: string;
    description: string;
    publishedAt: string;
    publishedTime: string;
    liveBroadcastContent: string;
    thumbnails: {
      default: IThumbnailProps;
      medium: IThumbnailProps;
      high: IThumbnailProps;
    };
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

export interface IVideoDetails {
  items: IVideoDetailsItem[];
  kind: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
}
export interface IVideoDetailsItem {
  contentDetails: {
    caption: string;
    contentRating: {};
    definition: string;
    dimension: string;
    duration: string;
    licensedContent: boolean;
    projection: string;
  };
  id: string;
  kind: string;
  snippet: {
    categoryId: string;
    channelId: string;
    channelTitle: string;
    defaultAudioLanguage: string;
    defaultLanguage: string;
    description: string;
    liveBroadcastContent: string;
    localized: {
      description: string;
      title: string;
    };
    publishedAt: string;
    tags: string[];
    thumbnails: {
      default: IThumbnailProps;
      high: IThumbnailProps;
      maxres: IThumbnailProps;
      medium: IThumbnailProps;
      standard: IThumbnailProps;
    };
    title: string;
  };
  statistics: {
    viewCount: string;
    commentCount: string;
    favoriteCount: string;
    likeCount: string;
  };
}

export interface IYtSuggestVideos {
  kind: string;
  nextToken: string;
  regionCode: string;
  items: ISuggestVideoItems[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface Iitem {
  type: string;
  videoId: string;
  playlistId: string;
  title: string;
  channelTitle: string;
  channelId: string;
  description: string;
  viewCount: string;
  publishedText: string;
  lengthText: string;
  thumbnail: IThumbnailProps[];
  richThumbnail: IThumbnailProps[];
  channelThumbnail: IThumbnailProps[];
}

export interface IYTVideosResponse {
  continuation: string;
  estimatedResults: string;
  data: Iitem[];
  msg: string;
  refinements: string[];
}
