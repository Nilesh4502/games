import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VideoPlayer from "../components/VideoPlayer";
import roomdata from "../data/rooms.json"

interface Room {
  id: string;
  type: string;
  category: string;
  isHls:boolean;
  imageurl: string;
  videoUrl: string;
  hlsstreamurl: string;
}

interface Video {
  poster: string;
  url: string;
}

interface RoomData {
  Room: Room;
  Video: Video;
}

const VideoGallery = () => {
  const [rooms, setRooms] = useState<RoomData[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
      //  const response = await fetch("https://example.com/api/rooms");
     // const response = rooms;
    //    const roomsData: RoomData[] = await response.json();
      //  setRooms(roomsData);
        setRooms(roomdata);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <>
      <Header />
      <div>

        {rooms.map(({ Room, Video }) => (
          <VideoPlayer
            key={Room.id}
            src ={Room.videoUrl}
            videoUrl={Room.videoUrl}
            hlsUrl={Room.hlsstreamurl}
            poster={Video.poster}
            isHLS={Room.isHls}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default VideoGallery;
