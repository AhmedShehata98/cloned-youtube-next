import {IPlayListVideos} from "@/Models/Youtube";
import Link from "next/link";
import Image from "next/image";

interface IPlaylistVideoCardProps{
    videoData : IPlayListVideos
}
export default function PlaylistVideoCard ({videoData}:IPlaylistVideoCardProps){
    return (
        <li key={videoData.index} className={`flex items-start justify-start px-4 py-2 bg-gray-200 dark:bg-zinc-600 hover:bg-gray-300 dark:hover:bg-zinc-800 `}>
            <p className={'min-w-[1.5rem] h-full my-auto'}>
                {videoData.index}
            </p>
            <figure className={"relative min-w-max"}>
                <Link href={
                    {pathname:'/watch',query:{ vidId : videoData.videoId}}
                }>
                    <Image
                        src={videoData?.thumbnail?.[1].url}
                        width={videoData.thumbnail?.[1].width}
                        height={videoData.thumbnail?.[1].height}
                        alt="playlist-video-thumbnail"
                    />
                    <h5 className={'absolute bottom-1 left-1 text-md bg-neutral-800 px-2 shadow-xl'}>{videoData.lengthText}</h5>
                </Link>
            </figure>
            <div className={"flex flex-col px-4 py-1"}>
                <Link href={
                    {pathname:'/watch',query:{ vidId : videoData.videoId}}
                }>
                <h3 className={'text-lg leading-5 h-12 overflow-hidden mb-3'}>{videoData.title}</h3>
                </Link>
                <Link href={
                    {
                        pathname : "/channels",
                        query:{channelId : videoData.videoOwnerChannelId}
                    }
                }
                      className={'underline underline-offset-2'}
                >
                    <small className={'opacity-70'}>{videoData.videoOwnerChannelTitle}</small>
                </Link>
            </div>
        </li>
    )
}