import styles from "WheelOfFortune.module.css";

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
                color: '#1f8314'
            },
            {
                name: 'jonny',
                color: '#815CD1'
            },
            {
                name: 'pål',
                color: '#a34508'
            },
            {
                name: 'viggo',
                color: '#530dcb'
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
                color: '#26303f'
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
                color: '#a20ab4'
            },
            {
                name: 'ronny',
                color: '#FF9000'
            }
        ]

    const shuffleParticipant = (participants: Participants[]) => {
        let currentIndex = participants.length, randomIndex;

        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [participants[currentIndex], participants[randomIndex]] = [
                participants[randomIndex], participants[currentIndex]];
        }

        return participants;
    }

    return (
        <div className={styles.main}>
            <PrevWinners/>
            {!winner && <h3>Todays winner is:</h3>}
            {winner && <h3>Todays winner is: {winner}🥇</h3>}
            <Wheel participants={shuffleParticipant(participants)}
                   onFinished={winnerHandler}/>
        </div>
    )

}

export type Participants = {
    name: string
    color: string
}


export default WheelOfFortune;
