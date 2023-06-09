import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTheme } from "@mui/material/styles";

// styles
import style from "../styles/musicPlayer.module.css";

// assets
import musicLogo from "../assets/images/musicLogo.jpg";

// components
import TimeSlider from "./TimeSlider";
import VolumeSlider from "./VolumeSlider";
import GlobalSettings from "./GlobalSettings";
import MobileMusicPlayer from "./MobileMusicPlayer";

// hooks
import useScreenWidth from "../hooks/useScreenWidth";

const MusicPlayer = ({
  musicPlaying,
  isPlay,
  setIsPlay,
  setMusicPlaying,
  musicList,
  isShowSubPlayer,
  setIsShowSubPlayer,
}) => {
  const theme = useTheme();
  const screenWidth = useScreenWidth();
  const { id, name, duration, audio } = musicPlaying;

  // This state is for show mobile music player
  const [isShowMainPlayer, setIsShowMainPlayer] = useState(false);

  const [isOnRepeat, setIsOnRepeat] = useState(false);
  const [time, setTime] = useState(0);
  const [volume, setVolume] = useState(50);

  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";

  useEffect(() => {
    if (audio) {
      !audio.paused && setIsPlay(true);
      audio.volume = volume / 100;
      setTime(Math.floor(audio.currentTime));
      if (!isShowMainPlayer) setIsShowSubPlayer(true);
    }
  }, [audio]);

  let runProgBar;
  useEffect(() => {
    if (isPlay) {
      runProgBar = setInterval(() => {
        if (!audio.paused) {
          setTime(Math.floor(audio.currentTime));
        }
        if (audio.ended) {
          audio.pause();
          audio.currentTime = 0;
          let musicID = id + 1;
          if (musicID > musicList.length - 1) musicID = 0;
          musicList[musicID].audio.play();
          setMusicPlaying({
            id: musicID,
            name: musicList[musicID].name,
            duration: musicList[musicID].duration,
            audio: musicList[musicID].audio,
          });
          setTime(0);
          setIsPlay(!isPlay);
          clearInterval(runProgBar);
        }
      }, 1000);
    }
  }, [audio, isPlay]);

  useEffect(() => {
    if (audio) {
      if (isOnRepeat && time === duration - 1) {
        audio.currentTime = 0;
        clearInterval(runProgBar);
        setIsOnRepeat(!isOnRepeat);
        setIsPlay(true);
        setTime(0);
      }
    }
  }, [isOnRepeat, time]);

  const playHandler = () => {
    if (audio) {
      setIsPlay(!isPlay);
      isPlay ? audio.pause() : audio.play();
    }
  };

  const forwardMusicHandler = (musicID) => {
    if (audio) {
      let list = musicList;
      if (musicID < 0) musicID = list.length - 1;
      if (musicID > list.length - 1) musicID = 0;
      audio.pause();
      audio.currentTime = 0;
      clearInterval(runProgBar);
      list[musicID].audio.play();
      setMusicPlaying({
        id: musicID,
        name: list[musicID].name,
        duration: list[musicID].duration,
        audio: list[musicID].audio,
      });
    }
  };

  const handle = (e) => {
    if (audio) {
      if (e.code === "Space") {
        setIsPlay(!isPlay);
        audio.paused ? audio.play() : audio.pause();
      } else if (e.code === "ArrowRight") forwardMusicHandler(id + 1);
      else if (e.code === "ArrowLeft") forwardMusicHandler(id - 1);
      else if (e.code === "ArrowDown")
        setVolume((prevVolume) => prevVolume - 1);
      else if (e.code === "ArrowUp") setVolume((prevVolume) => prevVolume + 1);
    }
  };

  return (
    <>
      <section
        className={style.musicPlayer}
        onKeyDown={(e) => handle(e, audio)}
        tabIndex={0}
        style={
          screenWidth < 1025
            ? {
                transform: `${
                  isShowMainPlayer ? "translateY(1%)" : "translateY(100%)"
                }`,
              }
            : null
        }
      >
        {screenWidth < 1025 && (
          <div
            className={style.arrowDown}
            onClick={() => {
              setIsShowMainPlayer(false);
              setIsShowSubPlayer(true);
            }}
          >
            {isShowMainPlayer && (
              <KeyboardArrowDownIcon sx={{ cursor: "pointer" }} />
            )}
          </div>
        )}
        <div className={style.musicProfile}>
          <div className={style.profileImage}>
            <img src={musicLogo} alt={name} />
          </div>
          <div className={style.profileName}>
            <div>{name && name}</div>
          </div>
        </div>
        <div className={style.btnHandlerBox}>
          <IconButton
            aria-label="previous song"
            onClick={() => forwardMusicHandler(id - 1)}
          >
            <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
          <IconButton onClick={playHandler}>
            {isPlay ? (
              <PauseRounded
                sx={{ fontSize: "3rem" }}
                htmlColor={mainIconColor}
              />
            ) : (
              <PlayArrowRounded
                sx={{ fontSize: "3rem" }}
                htmlColor={mainIconColor}
              />
            )}
          </IconButton>
          <IconButton
            aria-label="next song"
            onClick={() => forwardMusicHandler(id + 1)}
          >
            <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
        </div>
        <div className={style.timeOfMusic}>
          <div className={style.time}>
            <TimeSlider
              time={time}
              setTime={setTime}
              duration={duration}
              audio={audio}
            />
          </div>
          <GlobalSettings
            isOnRepeat={isOnRepeat}
            setIsOnRepeat={setIsOnRepeat}
          />
        </div>
        <div className={style.volumeSettingBox}>
          <VolumeSlider volume={volume} setVolume={setVolume} audio={audio} />
        </div>
      </section>
      {isShowSubPlayer && screenWidth < 1025 && (
        <MobileMusicPlayer
          id={id}
          setIsShowSubPlayer={setIsShowSubPlayer}
          isShowMainPlayer={isShowMainPlayer}
          setIsShowMainPlayer={setIsShowMainPlayer}
          setTime={setTime}
          setIsPlay={setIsPlay}
          name={name}
          isPlay={isPlay}
          audio={audio}
          playHandler={playHandler}
          forwardMusicHandler={forwardMusicHandler}
        />
      )}
    </>
  );
};

export default MusicPlayer;
