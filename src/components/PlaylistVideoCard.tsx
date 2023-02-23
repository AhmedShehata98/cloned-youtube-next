import {IPlayListVideos} from "@/Models/Youtube";
import Link from "next/link";
import Image from "next/image";

interface IPlaylistVideoCardProps{
    videoData : IPlayListVideos
}
export default function PlaylistVideoCard ({videoData}:IPlaylistVideoCardProps){
    return (
        <li key={videoData.index} className={`flex items-start justify-start px-2 lg:px-4 py-2 bg-gray-200 dark:bg-zinc-600 hover:bg-gray-300 overflow-y-hidden dark:hover:bg-zinc-800 `}>
            <p className={'min-w-[1.2rem] lg:min-w-[1.5rem] h-full mr-1 my-auto'}>
                {videoData.index}
            </p>
            <figure className={"relative min-w-[40%] w-[40%] lg:w-auto lg:min-w-max my-auto aspect-video"}>
                <Link href={
                    {pathname:'/watch',query:{ vidId : videoData.videoId}}
                }>
                    <Image
                        src={videoData?.thumbnail?.[1].url}
                        width={videoData.thumbnail?.[1].width}
                        height={videoData.thumbnail?.[1].height}
                        alt="playlist-video-thumbnail"
                        className={'max-w-full object-cover object-center'}
                    />
                    <h5 className={'absolute bottom-1 left-1 text-md bg-neutral-800 px-2 shadow-xl'}>{videoData.lengthText}</h5>
                </Link>
            </figure>
            <div className={"flex flex-col pl-4 lg:px-4 py-1"}>
                <Link href={
                    {pathname:'/watch',query:{ vidId : videoData.videoId}}
                }>
                <h3 className={'max-w-[95%] text-base lg:text-lg leading-4 lg:leading-5 h-8 lg:h-12 !overflow-hidden mb-3'}>{videoData.title}</h3>
                </Link>
                <Link href={
                    {
                        pathname : "/channels",
                        query:{channelId : videoData.videoOwnerChannelId}
                    }
                }
                      className={'underline underline-offset-2'}
                >
                    <p className={'opacity-70 truncate overflow-hidden max-w-[80%]'}>{videoData.videoOwnerChannelTitle}</p>
                </Link>
            </div>
        </li>
    )
}