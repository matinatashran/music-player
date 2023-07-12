import { useState } from "react";

// components
import MusicPlayer from "./MusicPlayer";

// shared
import MusicCard from "../shared/MusicCard";

// styles
import style from "../styles/main.module.css";

// helper
import { createMusicList } from "../helper/functions";

const Main = () => {
  const [isPlay, setIsPlay] = useState(false);
  const [searchedMusic, setSearchMusic] = useState("");
  const [musicPlaying, setMusicPlaying] = useState({
    id: "",
    name: "",
    duration: "",
    audio: "",
  });

  // This state is for show mobile music player
  const [isShowSubPlayer, setIsShowSubPlayer] = useState(false);

  const [musicList, setMusicList] = useState([]);

  const musicFileHanlder = async (e, type) => {
    const selectedFiles = e.target.files;
    if (type === "NEWPLAYLIST")
      setMusicList([...(await createMusicList(selectedFiles))]);
    else
      setMusicList([...musicList, ...(await createMusicList(selectedFiles))]);
  };

  const dragHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const dropHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const selectedFiles = e.dataTransfer.files;
    setMusicList([...(await createMusicList(selectedFiles))]);
  };

  const searchHandler = (e) => {
    setSearchMusic(e.target.value);
  };

  return (
    <main className={style.mainContainer}>
      <MusicPlayer
        isPlay={isPlay}
        setIsPlay={setIsPlay}
        musicPlaying={musicPlaying}
        setMusicPlaying={setMusicPlaying}
        musicList={musicList}
        isShowSubPlayer={isShowSubPlayer}
        setIsShowSubPlayer={setIsShowSubPlayer}
      />
      <section className={style.musicMenu}>
        <div className={style.buttonBox}>
          <div className={style.fileBox}>
            <label htmlFor="music-upload" className={style.uploadButton}>
              Upload Music
            </label>
            <input
              id="music-upload"
              className={style.fileUpload}
              type="file"
              accept="audio/*"
              alt="music"
              multiple
              onChange={(e) => musicFileHanlder(e, "UPLOAD_MUSIC")}
            />
          </div>
          <div className={style.newFileBox}>
            <label htmlFor="new-playlist" className={style.newUploadButton}>
              New Playlist <span>+</span>
            </label>
            <input
              id="new-playlist"
              className={style.fileUpload}
              type="file"
              accept="audio/*"
              alt="music"
              multiple
              onChange={(e) => musicFileHanlder(e, "NEWPLAYLIST")}
            />
          </div>
        </div>
        <div className={style.searchBox}>
          <input
            type="text"
            className={style.search}
            placeholder="Search ..."
            onChange={searchHandler}
          />
        </div>
        <div
          className={style.musicBox}
          onDragEnter={dragHandler}
          onDragOver={dragHandler}
          onDragLeave={dragHandler}
          onDrop={dropHandler}
        >
          {musicList.length ? (
            musicList.map(
              (music, index) =>
                music.name
                  .toLowerCase()
                  .includes(searchedMusic.toLowerCase()) && (
                  <MusicCard
                    key={index}
                    id={music.id}
                    name={music.name}
                    duration={music.duration}
                    audio={music.audio}
                    musicList={musicList}
                    setMusicList={setMusicList}
                    setIsPlay={setIsPlay}
                    setMusicPlaying={setMusicPlaying}
                    musicPlaying={musicPlaying}
                    isShowSubPlayer={isShowSubPlayer}
                    setIsShowSubPlayer={setIsShowSubPlayer}
                  />
                )
            )
          ) : (
            <div className={style.musicNotExist}>Upload Music Here</div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Main;
