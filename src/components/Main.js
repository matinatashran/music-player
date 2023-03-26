import { useState } from "react";

// components
import MusicPlayer from "./MusicPlayer";

// shared
import MusicCard from "../shared/MusicCard";

// styles
import style from "../styles/main.module.css";

// helper
import { getDuration } from "../helper/functions";

const Main = () => {
    const [searchedMusic, setSearchMusic] = useState("");
    const [musicPlaying, setMusicPlaying] = useState({
        id: "",
        name: "",
        duration: "",
        audio: "",
    });
    const [musicList, setMusicList] = useState([]);
    const musicFileHanlder = async (e, type) => {
        const selectedMusics = e.target.files;
        const files = [];
        for (let i = 0; i < Object.keys(selectedMusics).length; i++) {
            const url = URL.createObjectURL(selectedMusics[i]);

            files.push({
                id: i,
                name: selectedMusics[i].name,
                duration: await getDuration(url),
                audio: new Audio(url),
            });
        }
        if (type === "NEWPLAYLIST") setMusicList([...files]);
        else setMusicList([...musicList, ...files]);
    };

    const searchHandler = (e) => {
        setSearchMusic(e.target.value);
    };

    return (
        <main className={style.mainContainer}>
            <MusicPlayer
                musicPlaying={musicPlaying}
                setMusicPlaying={setMusicPlaying}
                musicList={musicList}
            />
            <section className={style.musicMenu}>
                <div className={style.buttonBox}>
                    <div className={style.fileBox}>
                        <label
                            htmlFor="music-upload"
                            className={style.uploadButton}
                        >
                            Upload Music
                        </label>
                        <input
                            id="music-upload"
                            className={style.fileUpload}
                            type="file"
                            accept="audio/*"
                            alt="music"
                            multiple
                            onChange={(e) =>
                                musicFileHanlder(e, "UPLOAD_MUSIC")
                            }
                        />
                    </div>
                    <div className={style.newFileBox}>
                        <label
                            htmlFor="new-playlist"
                            className={style.newUploadButton}
                        >
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
                <div className={style.musicBox}>
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
                                        setMusicPlaying={setMusicPlaying}
                                        musicPlaying={musicPlaying}
                                    />
                                )
                        )
                    ) : (
                        <div className={style.musicNotExist}>
                            Upload Music Here
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default Main;
