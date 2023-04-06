import { NextApiRequest, NextApiResponse } from "next";
import { donwloadVideo } from "./controller/download.controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = req.query.url as string;
  const title = req.query.title as string;
  const itag = req.query.itag as string;
  const container = req.query.container as string;
  if (!url) {
    res.status(400).send({
      err: "its seems you forget to send video URL",
      isResponseErr: true,
    });
    res.end();
  }
  if (!title || !itag) {
    res.status(400).send({
      err: "its seems you forget to send title or itag",
      isResponseErr: true,
    });
    res.end();
  }
  // const inf = await ytdl.getInfo(videoURL);
  // const formatIndex =
  //   inf.formats.findIndex((format) => format.itag === Number(itag)) || 1;
  // res.setHeader(
  //   `Content-Disposition`,
  //   `attachment; filename=${encodeURI(title)}.${
  //     inf.formats?.[formatIndex].container
  //   }`
  // );
  donwloadVideo({ url, itag: +itag, title, container }, res, req);
}
