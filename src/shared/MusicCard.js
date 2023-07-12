import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// styles
import style from "../styles/musicCard.module.css";

// helper
import { formatDuration } from "../helper/functions";

// hooks
import useScreenWidth from "../hooks/useScreenWidth";
import MusicEqualizer from "../components/MusicEqualizer";

const MusicCard = ({
    id,
    name,
    duration,
    audio,
    musicList,
    setMusicList,
    setMusicPlaying,
    setIsPlay,
    musicPlaying,
    isShowSubPlayer,
    setIsShowSubPlayer,
}) => {
    const [isShow, setIsShow] = useState(false);
    const screenWidth = useScreenWidth();

    const playHandler = () => {
        if (musicPlaying.audio && musicPlaying.name !== name) {
            console.log("Neq")
            musicPlaying.audio.pause();
            musicPlaying.audio.currentTime = 0;
        }
        audio.play();
        setIsPlay(true);
        setIsShowSubPlayer(true);
        setMusicPlaying({
            id,
            name,
            duration: Math.floor(audio.duration),
            audio,
        });
    };

    const deleteHandler = () => {
        const newList = musicList.filter((item) => item.id !== id);
        setMusicList([...newList]);
    };

    return (
        <div className={style.musicCardContainer}>
            <div
                className={style.leftSide}
                // this onClick is for big devices
                onDoubleClick={screenWidth >= 1025 ? playHandler : null}
                // this onClick is for mobile and tablets and other short devices
                onClick={screenWidth < 1025 ? playHandler : null}
            >
                <div className={style.musicIcon}>
                    {musicPlaying.audio === audio && isShowSubPlayer ? (
                        <MusicEqualizer type="ANIMATION" isPlay={true} />
                    ) : (
                        <MusicEqualizer type="STATIC" isPlay={false} />
                    )}
                </div>
                <div className={style.musicName}>{name}</div>
            </div>
            <div className={style.rightSide}>
                <div className={style.musicDuration}>
                    {formatDuration(duration)}
                </div>
                <div
                    className={style.moreVert}
                    onClick={() => setIsShow(!isShow)}
                >
                    <div className={style.moreIcon}>
                        <MoreVertIcon />
                    </div>
                    <div
                        className={style.more}
                        style={{ width: isShow ? "100px" : "0" }}
                    >
                        <button
                            onClick={deleteHandler}
                            style={{
                                visibility: isShow ? "visible" : "hidden",
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicCard;
