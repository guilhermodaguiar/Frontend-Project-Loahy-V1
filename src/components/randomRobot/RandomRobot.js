import React, {useEffect, useState} from "react";

import robot1 from '../../assets/robots/Lovepik_com-401214037-robot-toy.png';
import robot2 from '../../assets/robots/Lovepik_com-401237306-toy-robot.png';
import robot3 from '../../assets/robots/Lovepik_com-610562776-Cartoon toy robot vector.png';
import robot4 from '../../assets/robots/Lovepik_com-610599430-Cartoon cute robot toy vector.png';
import robot5 from '../../assets/robots/Lovepik_com-611503078-Colored round robot toy.png';

function RandomRobot() {

    const images = [robot1, robot2, robot3, robot4, robot5 ];
    const [currentImageIndex, setCurrentImageIndex] = useState(Math.floor(Math.random() * images.length));


    function changeImage() {

        function getRandomNumber(max) {
            return Math.floor(Math.random() * max)
        }
        setCurrentImageIndex(getRandomNumber(3));
    }

    useEffect(() => changeImage(), []);


    return(
        <>
            <div className="random-robot-container">
                <img alt="randomRobot"
                     src={images[currentImageIndex]}/>
            </div>

        </>

    )
}

export default RandomRobot;