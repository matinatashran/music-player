import RepeatOneIcon from "@mui/icons-material/RepeatOne";

// style
import style from "../styles/globalSettings.module.css";

const iconStyle = {
    width: 28,
    height: 28,
    cursor: "pointer",
    transition: "0.3s",
};

const GlobalSettings = ({ isOnRepeat, setIsOnRepeat }) => { 
    return (
        <div className={style.globalSettingsContainer}>
            <RepeatOneIcon
                sx={{
                    color: `${isOnRepeat ? "#5f9ea0" : "#e0e0e0"}`,
                    ...iconStyle,
                }}
                onClick={() => setIsOnRepeat(!isOnRepeat)}
            />
        </div>
    );
};

export default GlobalSettings;
