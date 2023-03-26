import { useState, useLayoutEffect } from "react"

const useScreenWidth = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useLayoutEffect(() => {
        window.addEventListener("resize", function () {
            setScreenWidth(window.innerWidth);
        });
    }, []);

    return screenWidth;
}

export default useScreenWidth;