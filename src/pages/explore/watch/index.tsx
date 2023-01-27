import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

function VideoDetails() {
  const { query } = useRouter();
  const [res, setRes] = useState();

  useEffect(() => {
    async function fetcher() {
      const result = await fetch(
        "https://youtube-v31.p.rapidapi.com/videos?part=snippet,statistics&id=" +
          query.videoId,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "0037b1fc77msh8b9be05e45f506ap1d9b28jsne5ef237661fd",
            "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
          },
        }
      );
      const data = await result.json();
      setRes(data);
    }
    fetcher();
  }, []);
  return (
    <div>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${res?.items?.[0].id}`}
      />
      {JSON.stringify(res, undefined, 5)}
    </div>
  );
}

export default VideoDetails;
