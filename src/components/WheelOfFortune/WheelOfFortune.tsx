import styles from "../../styles/Home.module.css";

import React, { useState } from 'react'
import Wheel from "./Wheel/Wheel";
import PrevWinners from "../PrevWinners/PrevWinners";


const WheelOfFortune = () => {

    const [winner, setWinner] = useState("");

    const winnerHandler = (participant: string) => {
        setWinner(participant)
    }

    const participants = [
        'per',
        'ola',
        'jonny',
        'pål',
        'alf',
        'viggo',
        'trong',
        'espen',
        'trond',
        'hans',
        'vegard',
        'joakim',
        'andre',
        'øyvind',
        'ronny'
    ]

    // Should match the number of participants
    const segColors = [
        '#EE4040',
        '#F0CF50',
        '#815CD1',
        '#3DA5E0',
        '#34A24F',
        '#F9AA1F',
        '#EC3F3F',
        '#FF9000',
        '#F0CF50',
        '#815CD1',
        '#3DA5E0',
        '#34A24F',
        '#F9AA1F',
        '#EC3F3F',
        '#FF9000'
    ]

    return (
        <div className={styles.container}>
            <PrevWinners/>
            {winner && <h3>Todays winner is: {winner}</h3>}
            <Wheel contrastColor={'white'} downDuration={1000}
                   fontFamily={'proxima-nova'}
                   primaryColor={'black'} segColors={segColors} participants={participants} size={290}
                   upDuration={100} winningSegment={1000} onFinished={winnerHandler}/>
        </div>
    )

}


export default WheelOfFortune;