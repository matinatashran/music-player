import Slider from "@mui/material/Slider";
import { useTheme } from "@mui/material/styles";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import { useEffect } from "react";

const VolumeSlider = ({ volume, setVolume, audio }) => {
  const theme = useTheme();
  const volumeChangeHandler = (e) => {
    setVolume(+e.target.value);
    if (audio) audio.volume = +e.target.value / 100;
  };

  useEffect(() => {
    if (audio) audio.volume = volume / 100;
  }, [volume]);

  return (
    <section
      style={{ display: "flex", alignItems: "center", columnGap: "10px" }}
    >
      <div style={{ cursor: "pointer" }}>
        {volume === 0 ? (
          <VolumeMuteIcon sx={{ color: "#8484848f", fontSize: "1.5rem" }} />
        ) : (
          <VolumeDownIcon sx={{ color: "#8484848f", fontSize: "1.5rem" }} />
        )}
      </div>
      <Slider
        value={volume}
        min={0}
        step={1}
        max={100}
        onChange={volumeChangeHandler}
        sx={{
          color: theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
          width: 250,
          height: 2,
          marginTop: -1,
          "& .MuiSlider-thumb": {
            width: 13,
            height: 13,
            transition: "0.2s",
            "&:hover, &.Mui-focusVisible": {
              boxShadow: `0px 0px 0px 0px ${
                theme.palette.mode === "dark"
                  ? "rgb(255 255 255 / 16%)"
                  : "#c4c4c45e"
              }`,
            },
          },
          "& .MuiSlider-rail": {
            opacity: 0.38,
            backgroundColor: "#9eafb0",
          },
          "@media (max-width: 768px)": {
            width: 180,
          },
          "@media (max-width: 480px)": {
            width: 130,
          },
        }}
      />
      <div style={{ cursor: "pointer" }}>
        {<VolumeUpIcon sx={{ color: "#8484848f", fontSize: "1.5rem" }} />}
      </div>
    </section>
  );
};

export default VolumeSlider;
