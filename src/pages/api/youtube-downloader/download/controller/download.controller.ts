import { NextApiRequest, NextApiResponse } from "next";
import ytdl from "ytdl-core";

interface IdownloadVideoProps {
  container: string;
  url: string;
  itag: number;
  title: string;
}
export const donwloadVideo = function (
  { url, itag, title, container }: IdownloadVideoProps,
  res: NextApiResponse,
  req: NextApiRequest
) {
  const video = ytdl(url, { filter: (format) => format.itag === itag });
  res.setHeader(
    `Content-Disposition`,
    `attachment; filename=${encodeURI(title)}.${container}`
  );

  video.on("data", (chunks: any) => res.write(chunks));
  video.on("end", () => res.end());
};
