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

export interface IChannelMetaData {
  title: string;
  description: string;
  thumbnail: Array<IThumbnailProps>;
  image: {
    banner: Array<IThumbnailProps>;
    tvBanner: Array<IThumbnailProps>;
    mobileBanner: Array<IThumbnailProps>;
  };
  subscriberCount: string;
  keywords: Array<string>;
  isFamilySafe: boolean;
  availableCountries: Array<string>;
}
export interface IYtChannel {
  meta: IChannelMetaData;
  data: Iitem[];
  continuation: string;
  msg: "";
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
export interface IPlayListVideos {
  videoId: string;
  title: string;
  index: string;
  lengthSeconds: string;
  lengthText: string;
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
  thumbnail: Array<IThumbnailProps>;
}
export interface IPlaylist {
  meta: {
    title: string;
    description: string;
    thumbnail: string;
    videoCount: string;
    viewCount: string;
    lastUpdated: string;
    avatar: Array<IThumbnailProps>;
    channelTitle: string;
    channelId: string;
  };
  continuation: string;
  data: Array<IPlayListVideos>;
}
