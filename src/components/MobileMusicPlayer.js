import IconButton from "@mui/material/IconButton";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

// styles
import style from "../styles/mobileMusicPlayer.module.css";

// assets
import musicLogo from "../assets/musicLogo.jpg";

const MobileMusicPlayer = ({
    id,
    setIsShowSubPlayer,
    setIsShowMainPlayer,
    setTime,
    setIsPlay,
    name,
    isPlay,
    audio,
    playHandler,
    forwardMusicHandler,
}) => {
    const theme = useTheme();
    const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";

    const closeHandler = () => {
        audio.pause();
        audio.currentTime = 0;
        setIsShowSubPlayer(false);
        setIsShowMainPlayer(false);
        setTime(0);
        setIsPlay(false);
    };

    const showHandler = () => {
        setIsShowMainPlayer(true);
        setIsShowSubPlayer(false);
    };

    return (
        <div className={style.mobileMusicPlayerContainer}>
            <div onClick={showHandler} style={{ overflow: "hidden" }}>
                <div className={style.imageBox}>
                    <img src={musicLogo} alt={name} />
                </div>
                <div className={style.nameBox}>
                    <span>{name}</span>
                    <span>music</span>
                </div>
            </div>
            <div className={style.playHandlerBox}>
                <IconButton onClick={playHandler}>
                    {isPlay ? (
                        <PauseRounded
                            sx={{ fontSize: "2rem" }}
                            htmlColor={mainIconColor}
                        />
                    ) : (
                        <PlayArrowRounded
                            sx={{ fontSize: "2rem" }}
                            htmlColor={mainIconColor}
                        />
                    )}
                </IconButton>
                <IconButton
                    aria-label="next song"
                    onClick={() => forwardMusicHandler(id + 1)}
                >
                    <FastForwardRounded
                        fontSize="large"
                        htmlColor={mainIconColor}
                        sx={{ fontSize: "2rem" }}
                    />
                </IconButton>
            </div>
            <div className={style.closeHandlerBox}>
                <CloseIcon onClick={closeHandler} sx={{ cursor: "pointer" }} />
            </div>
        </div>
    );
};

export default MobileMusicPlayer;
