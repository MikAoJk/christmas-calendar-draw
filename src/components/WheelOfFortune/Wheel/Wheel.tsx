import React, {useEffect, useState} from 'react'
import {Participants} from "../WheelOfFortune";
import styles from "../../../styles/Home.module.css";


interface WheelProps {
    participants: Participants[],
    onFinished: (winner: string) => void;
}


const Wheel = (wheelProps: WheelProps) => {
    const contrastColor = 'white'
    const primaryColor = 'black'
    const fontFamily = 'proxima-nova'
    const size = 290
    let currentParticipant = ''
    let isStarted = false
    const [isFinished, setFinished] = useState(false)
    let timerHandle: NodeJS.Timer | number = 0
    const timerDelay = wheelProps.participants.length
    let angleCurrent = 0
    let angleDelta = 0
    let canvasContext: any = null
    let maxSpeed = Math.PI / wheelProps.participants.length
    const upTime = wheelProps.participants.length * 100
    const downTime = wheelProps.participants.length * 1000
    let spinStart = 0
    let frames = 0
    const centerX = 300
    const centerY = 300
    useEffect(() => {
        wheelInit()
        setTimeout(() => {
            window.scrollTo(0, 1)
        }, 0)
    }, [])
    const wheelInit = () => {
        initCanvas()
        wheelDraw()
    }

    const initCanvas = () => {
        let canvas = document.getElementById('canvas')
        console.log(navigator)
        if (navigator.userAgent.indexOf('MSIE') !== -1) {
            canvas = document.createElement('canvas') as HTMLCanvasElement | null;
            canvas?.setAttribute('width', String(1000))
            canvas?.setAttribute('height', String(600))
            canvas?.setAttribute('id', 'canvas')
            // @ts-ignore
            document?.getElementById('wheel')?.appendChild(canvas)
        }
        canvas!.addEventListener('click', spin, false)
        // @ts-ignore
        canvasContext = canvas?.getContext('2d')
    }

    const getRandomIntInclusive = () => {
        return Math.floor(Math.random() * (8 - 1 + 1) + 1)
    }

    const spin = () => {
        isStarted = true
        if (timerHandle === 0) {
            spinStart = new Date().getTime()
            maxSpeed = (Math.PI + getRandomIntInclusive()) / wheelProps.participants.length
            frames = 0
            timerHandle = setInterval(onTimerTick, timerDelay)
        }
    }
    const onTimerTick = () => {
        frames++
        draw()
        const duration = new Date().getTime() - spinStart
        let progress: number
        let finished = false
        if (duration < upTime) {
            progress = duration / upTime
            angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2)
        } else {
                progress = duration / downTime
                angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2)
            if (progress >= 1) finished = true
        }

        angleCurrent += angleDelta
        while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2
        if (finished) {
            setFinished(true)
            wheelProps.onFinished(currentParticipant)
            clearInterval(timerHandle)
            timerHandle = 0
            angleDelta = 0
        }
    }

    const wheelDraw = () => {
        clear()
        drawWheel()
        drawNeedle()
    }

    const draw = () => {
        clear()
        drawWheel()
        drawNeedle()
    }

    const drawSegment = (key: number, lastAngle: number, angle: number) => {
        const ctx = canvasContext
        const value = wheelProps.participants[key].name
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, size, lastAngle, angle, false)
        ctx.lineTo(centerX, centerY)
        ctx.closePath()
        ctx.fillStyle = wheelProps.participants[key].color
        ctx.fill()
        ctx.stroke()
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate((lastAngle + angle) / 2)
        ctx.fillStyle = contrastColor
        ctx.font = 'bold 1em ' + fontFamily
        ctx.fillText(value.substring(0, 21), size / 2 + 20, 0)
        ctx.restore()
    }

    const drawWheel = () => {
        const ctx = canvasContext
        let lastAngle = angleCurrent
        const len = wheelProps.participants.length
        const PI2 = Math.PI * 2
        ctx.lineWidth = 1
        ctx.strokeStyle = primaryColor
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        ctx.font = '1em ' + fontFamily
        for (let i = 1; i <= len; i++) {
            const angle = PI2 * (i / len) + angleCurrent
            drawSegment(i - 1, lastAngle, angle)
            lastAngle = angle
        }

        // Draw a center circle
        ctx.beginPath()
        ctx.arc(centerX, centerY, 50, 0, PI2, false)
        ctx.closePath()
        ctx.fillStyle = primaryColor
        ctx.lineWidth = 10
        ctx.strokeStyle = contrastColor
        ctx.fill()
        ctx.font = 'bold 1em ' + fontFamily
        ctx.fillStyle = contrastColor
        ctx.textAlign = 'center'
        ctx.fillText('spin', centerX, centerY + 3)
        ctx.stroke()

        // Draw outer circle
        ctx.beginPath()
        ctx.arc(centerX, centerY, size, 0, PI2, false)
        ctx.closePath()

        ctx.lineWidth = 10
        ctx.strokeStyle = primaryColor
        ctx.stroke()
    }

    const drawNeedle = () => {
        const ctx = canvasContext
        ctx.lineWidth = 1
        ctx.strokeStyle = contrastColor
        ctx.fileStyle = contrastColor
        ctx.beginPath()
        ctx.moveTo(centerX + 20, centerY - 50)
        ctx.lineTo(centerX - 20, centerY - 50)
        ctx.lineTo(centerX, centerY - 70)
        ctx.closePath()
        ctx.fill()
        const change = angleCurrent + Math.PI / 2
        let i =
            wheelProps.participants.length -
            Math.floor((change / (Math.PI * 2)) * wheelProps.participants.length) -
            1
        if (i < 0) i = i + wheelProps.participants.length
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = primaryColor
        ctx.font = 'bold 1.5em ' + fontFamily
        currentParticipant = wheelProps.participants[i].name
        isStarted && ctx.fillText(currentParticipant, centerX + 10, centerY + size + 50)
    }
    const clear = () => {
        canvasContext.clearRect(0, 0, 1000, 800)
    }
    return (
        <div id='wheel' className={styles.main}>
            <canvas
                id='canvas'
                width='1000'
                height='800'
                style={{
                    pointerEvents: isFinished ? 'none' : 'auto'
                }}
            />
        </div>
    )
}
export default Wheel
