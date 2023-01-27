import { IYTVideos } from "./Youtube";

export interface ISuggestVideos {
  items: IYTVideos[];
  kind: string;
}
