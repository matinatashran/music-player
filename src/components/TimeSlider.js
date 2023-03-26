import Slider from "@mui/material/Slider";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

// helper
import { formatDuration } from "../helper/functions";

const TinyText = styled(Typography)({
    fontSize: "0.75rem",
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});

const TimeSlider = ({ time, setTime, duration, audio }) => {
    const theme = useTheme();
    const timeChangeHandler = (e) => {
        setTime(+e.target.value);
        if (audio) audio.currentTime = +e.target.value;
    };

    return (
        <>
            <Slider
                value={time}
                min={0}
                step={1}
                max={+duration}
                onChange={timeChangeHandler}
                sx={{
                    color:
                        theme.palette.mode === "dark"
                            ? "#fff"
                            : "rgba(0,0,0,0.87)",
                    width: 500,
                    height: 2,
                    "& .MuiSlider-thumb": {
                        width: 8,
                        height: 8,
                        transition: "0.2s",
                        "&:hover, &.Mui-focusVisible": {
                            boxShadow: `0px 0px 0px 0px ${
                                theme.palette.mode === "dark"
                                    ? "rgb(255 255 255 / 16%)"
                                    : "#c4c4c45e"
                            }`,
                            width: 13,
                            height: 13,
                        },
                    },
                    "& .MuiSlider-rail": {
                        opacity: 0.38,
                        backgroundColor: "#9eafb0",
                    },
                    "@media (max-width: 768px)": {
                        width: 380,
                    },
                    "@media (max-width: 480px)": {
                        width: 280,
                    },
                }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <TinyText>{formatDuration(time)}</TinyText>
                <TinyText>{formatDuration(+duration - time)}</TinyText>
            </div>
        </>
    );
};

export default TimeSlider;
