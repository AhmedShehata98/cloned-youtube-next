import { NextApiRequest, NextApiResponse } from "next";
import ytdl from "ytdl-core";
import { fileSizeHumanReadable } from "../helper/helper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const vidURL = req.query.url as string;
  if (!vidURL) {
    res.status(404).send({ msg: "video url or id is needed" });
  }
  try {
    const {
      videoDetails: {
        title,
        ownerChannelName,
        lengthSeconds,
        author: { thumbnails: channelthumbnails, verified, subscriber_count },
        thumbnail: { thumbnails: videoThumbnails },
      },
      formats,
    } = await ytdl.getInfo(vidURL);
    //
    const videoTime = `${
      Math.floor(+lengthSeconds / 60) < 10
        ? `0${Math.floor(+lengthSeconds / 60)}`
        : Math.floor(+lengthSeconds / 60)
    }:${
      Math.trunc(+lengthSeconds % 60) < 10
        ? `0${Math.trunc(+lengthSeconds % 60)}`
        : Math.trunc(+lengthSeconds % 60)
    }`;
    //
    const newFormats = [
      ...formats
        .filter((format) => format.container === "mp4")
        .map((format) => ({
          format: format.container,
          qualityLabel: format.qualityLabel || format.quality,
          itag: format.itag,
          hasVideo: format.hasVideo,
          hasAudio: format.hasAudio,
          audioQuality: format.audioQuality,
          contentSize: fileSizeHumanReadable(+format.contentLength),
        })),
    ];
    const videoInformation = {
      title,
      videoLength: videoTime,
      channelData: {
        channelthumbnail: channelthumbnails?.[0].url,
        verified,
        subscriber_count,
        ownerChannelName,
      },
      videoThumbnail: videoThumbnails?.[0].url,
      customFormats: newFormats,
    };
    res.send(videoInformation);
  } catch (error) {
    res.send(error || "error occured");
  }
}
