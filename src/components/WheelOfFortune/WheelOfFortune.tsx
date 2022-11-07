import styles from "../../styles/Home.module.css";

import React, {useState} from 'react'
import Wheel from "./Wheel/Wheel";
import PrevWinners from "../PrevWinners/PrevWinners";


const WheelOfFortune = () => {

    const [winner, setWinner] = useState("");

    const winnerHandler = (participant: string) => {
        setWinner(participant)
    }

    const participants: Participants[] =
        [{
            name: 'per',
            color: '#EE4040'
        },
            {
                name: 'ola',
                color: '#F0CF50'
            },
            {
                name: 'jonny',
                color: '#815CD1'
            },
            {
                name: 'pål',
                color: '#3DA5E0'
            },
            {
                name: 'viggo',
                color: '#F0CF50'
            },
            {
                name: 'espen',
                color: '#EE4040'
            },
            {
                name: 'trond',
                color: '#F0CF50'
            },
            {
                name: 'hans',
                color: '#815CD1'
            },
            {
                name: 'vegard',
                color: '#3DA5E0'
            },
            {
                name: 'joakim',
                color: '#34A24F'
            },
            {
                name: 'øyvind',
                color: '#EC3F3F'
            },
            {
                name: 'ronny',
                color: '#FF9000'
            }
        ]

    return (
        <div className={styles.container}>
            <PrevWinners/>
            {winner && <h3>Todays winner is: {winner}</h3>}
            <Wheel participants={participants}
                   onFinished={winnerHandler}/>
        </div>
    )

}

export type Participants = {
    name: string
    color: string
}


export default WheelOfFortune;