import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { motion, useAnimation } from "framer-motion";
import { GrClose } from "react-icons/gr";
import { IVideoDetails, Iitem } from "@/Models/Youtube";
import { BsCheckCircleFill, BsFillVolumeMuteFill } from "react-icons/bs";
import { AiFillPicture, AiOutlineDownload } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { downloadVideo, getInfo } from "@/services/api/downloaderApi";
import Spinner from "../Spinner";
import SkeletonVideoCard from "../SkeletonVideoCard";
import { IoVolumeHighSharp } from "react-icons/io5";
import { MdAccessTime, MdOutlineNoPhotography } from "react-icons/md";
import { TfiHarddrive } from "react-icons/tfi";
import { useInView } from "react-intersection-observer";

interface IDownloadWindowProps {
  videoDetailsData: IVideoDetails;
  setShowDownloadWindow: Dispatch<SetStateAction<boolean>>;
}
function DownloadWindow({
  videoDetailsData,
  setShowDownloadWindow,
}: IDownloadWindowProps) {
  const { data, isLoading: isLoadingVideoInfo } = useQuery({
    queryKey: ["download", videoDetailsData.items?.[0].id],
    queryFn: () =>
      getInfo(`https://youtu.be/${videoDetailsData.items?.[0].id}`),
  });
  const [ref, inView] = useInView();
  const contorl = useAnimation();
  const [startingDownload, setStartingDownload] = useState(false);

  useEffect(() => {
    window.document.addEventListener("click", (e: Event) => {
      const target = e.target as Element;
      if (target.id === "main-window") {
        setShowDownloadWindow(false);
      }
    });

    return () => {
      window.document.removeEventListener("click", (e: Event) => {
        const target = e.target as Element;
        if (target.id === "main-window") {
          setShowDownloadWindow(false);
        }
      });
    };
  }, []);

  useEffect(() => {
    document.body.classList.add("prevent-scroll");
    return () => {
      document.body.classList.remove("prevent-scroll");
    };
  }, []);

  useEffect(() => {
    if (inView) contorl.start("visible");
  }, [inView, contorl]);

  const downWindowVariants = {
    visible: {
      opacity: 1,
      translateY: "0px",
    },
    hidden: {
      opacity: 0.2,
      translateY: "30px",
    },
  };

  // const startDownload = function (title: string, itag: number) {
  //   downloadVideo(
  //     `https://youtu.be/${videoDetailsData.items?.[0].id}`,
  //     itag,
  //     title
  //   )
  //     .then((res) => setStartingDownload(true))
  //     .then((res) => {
  //       const a = document.createElement("a");
  //       const url = URL.createObjectURL(res);
  //       a.download;
  //       a.click();
  //     })
  //     .finally(() => setStartingDownload(false));
  // };
  return (
    <div
      className="absolute z-30 inset-0 bg-slate-900 bg-opacity-80 flex items-end lg:items-center justify-center mt-16"
      id="main-window"
    >
      <motion.article
        variants={downWindowVariants}
        initial={"hidden"}
        animate={"visible"}
        ref={ref}
        className="bg-zinc-500 w-[95%] lg:w-1/2 h-fit shadow-lg rounded-2xl lg:rounded-lg overflow-hidden my-3"
      >
        <span className="flex justify-between items-center border-b border-zinc-800 px-4 py-3 lg:py-2 bg-zinc-600">
          <button
            className="bg-red-300 p-1 border-red-400 hover:bg-red-400"
            onClick={() => setShowDownloadWindow(false)}
          >
            <GrClose />
          </button>
          <p className="mx-auto">
            Download{" "}
            {`${videoDetailsData.items?.[0]?.snippet.title
              .split("")
              .splice(
                0,
                Math.floor(
                  videoDetailsData.items?.[0]?.snippet.title.length / 3.7
                )
              )
              .join("")}....`}
          </p>
        </span>
        <div className="p-3">
          <b className="capitalize">video you want to download </b>
          {isLoadingVideoInfo && (
            <SkeletonVideoCard layout="row" id="dowloading-window" gap />
          )}
          {!isLoadingVideoInfo && (
            <figure className="flex flex-col md:flex-row justify-between items-start mt-3 mb-4">
              <img
                src={data?.videoThumbnail}
                alt="video thumbnail"
                className="w-full lg:w-1/3 aspect-video rounded-md"
              />
              <div className="w-full md:w-2/3 lg:px-2">
                <p className="text-lg">{data?.title}</p>
                <span className="flex items-center justify-start gap-2 mt-1 lg:mt-3">
                  <img
                    className="aspect-square rounded-full shadow-sm w-9"
                    src={data.channelData.channelthumbnail}
                    alt="channel-img"
                  />
                  <span className="flex items-center justify-center">
                    <b className="px-2 uppercase">
                      {data.channelData.ownerChannelName}
                    </b>
                    {data.channelData.verified && (
                      <BsCheckCircleFill className="text-sm text-zinc-500 dark:text-zinc-300" />
                    )}
                  </span>
                </span>
              </div>
            </figure>
          )}
          <b className="capitalize mb-2">download quality options</b>
          <ul className="h-52 overflow-auto grid grid-flow-row gap-2 w-full h-ful p-2 bg-zinc-700 rounded-md">
            {isLoadingVideoInfo && <Spinner withText={true} />}
            {!isLoadingVideoInfo &&
              data.customFormats.map((format: any) => {
                return (
                  <li
                    key={format.qualityLabel || format.quality}
                    className="flex flex-col lg:flex-row justify-between items-start shadow-lg rounded-md p-2 bg-zinc-600 hover:bg-zinc-500"
                  >
                    <div className="flex flex-col">
                      <p className="flex capitalize mb-0 gap-4">
                        video quality
                        <small className="px-2 grid place-items-center place-content-center bg-red-500 rounded-xl uppercase">
                          {format.qualityLabel || format.quality}
                        </small>
                      </p>
                      <span className="w-full lg:w-auto flex items-center gap-2">
                        <small className="flex gap-2 items-center justify-center">
                          <TfiHarddrive className="text-red-200" />
                          {format.contentSize}
                        </small>
                        <small className="flex gap-1 items-center opacity-60 mr-2">
                          <MdAccessTime className="text-red-200" />
                          {data?.videoLength}
                        </small>
                        <p>
                          {format.hasAudio ? (
                            <IoVolumeHighSharp className="text-red-300" />
                          ) : (
                            <BsFillVolumeMuteFill className="text-red-200 " />
                          )}
                        </p>
                        <p>
                          {format.hasVideo ? (
                            <AiFillPicture className="text-red-300" />
                          ) : (
                            <MdOutlineNoPhotography className="text-red-200 " />
                          )}
                        </p>
                      </span>
                    </div>
                    <a
                      href={`/api/youtube-downloader/download?url=https://youtu.be/${
                        videoDetailsData.items?.[0].id
                      }&itag=${format.itag}&title=${encodeURI(
                        data.title
                      )}&container=${format.format}`}
                      className="w-full lg:w-auto flex items-center justify-center gap-2 px-4 py-2 mt-3 lg:my-0 rounded-md bg-cyan-400 hover:bg-cyan-500 border-emerald-300"
                    >
                      <AiOutlineDownload className="leading-3" />
                      <p className="!text-black capitalize leading-3">
                        download
                      </p>
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
      </motion.article>
    </div>
  );
}

export default DownloadWindow;
