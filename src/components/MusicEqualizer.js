import styled from "styled-components";

const Div = styled.div`
    width: 3px;
    height: ${(props) => props.mainHeight};
    border-radius: 20px;
    background-color: ${props => props.isPlay ? "#ff4500" : "#17625f"};
    animation: ${(props) =>
        props.type === "ANIMATION"
            ? "MoveEqualizer infinite linear 0.4s alternate"
            : null};
    animation-delay: ${(props) => props.delay};

    @keyframes MoveEqualizer {
        0% {
            height: 5px;
        }
        100% {
            height: 20px;
        }
    }
`;
const MusicEqualizer = ({ type, isPlay }) => {
    const equalizerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "2.5px",
    };

    return (
        <div style={equalizerStyle}>
            <Div type={type} mainHeight="8px" delay="0.2s" isPlay={isPlay}></Div>
            <Div type={type} mainHeight="20px" delay="0.4s" isPlay={isPlay}></Div>
            <Div type={type} mainHeight="20px" delay="0.2s" isPlay={isPlay}></Div>
            <Div type={type} mainHeight="8px" delay="0.4s" isPlay={isPlay}></Div>
        </div>
    );
};

export default MusicEqualizer;
