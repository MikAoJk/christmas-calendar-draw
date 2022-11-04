import React, {useEffect, useState} from 'react'


interface WheelProps {
    participants: string[],
    segColors: string[],
    winningSegment: any,
    primaryColor: string,
    contrastColor: string,
    size: number,
    upDuration: number,
    downDuration: number,
    fontFamily: string,
    onFinished: (winner: string) => void;
}


const Wheel = (wheelProps: WheelProps) => {
    let currentParticipant = ''
    let isStarted = false
    const [isFinished, setFinished] = useState(false)
    let timerHandle: NodeJS.Timer | number = 0
    const timerDelay = wheelProps.participants.length
    let angleCurrent = 0
    let angleDelta = 0
    let canvasContext: any = null
    let maxSpeed = Math.PI / wheelProps.participants.length
    const upTime = wheelProps.participants.length * wheelProps.upDuration
    const downTime = wheelProps.participants.length * wheelProps.downDuration
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
            canvas = document.createElement('canvas') as HTMLCanvasElement
            canvas.setAttribute('width', String(1000))
            canvas.setAttribute('height', String(600))
            canvas.setAttribute('id', 'canvas')
            // TODO
            // @ts-ignore
            document.getElementById('wheel').appendChild(canvas)
        }
        // TODO
        // @ts-ignore
        canvas.addEventListener('click', spin, false)
        // TODO
        // @ts-ignore
        canvasContext = canvas.getContext('2d')
    }
    const spin = () => {
        isStarted = true
        if (timerHandle === 0) {
            spinStart = new Date().getTime()
            maxSpeed = Math.PI / wheelProps.participants.length
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
            if (wheelProps.winningSegment) {
                if (currentParticipant === wheelProps.winningSegment && frames > wheelProps.participants.length) {
                    progress = duration / upTime
                    angleDelta =
                        maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2)
                    progress = 1
                } else {
                    progress = duration / downTime
                    angleDelta =
                        maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2)
                }
            } else {
                progress = duration / downTime
                angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2)
            }
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
        const value = wheelProps.participants[key]
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, wheelProps.size, lastAngle, angle, false)
        ctx.lineTo(centerX, centerY)
        ctx.closePath()
        ctx.fillStyle = wheelProps.segColors[key]
        ctx.fill()
        ctx.stroke()
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate((lastAngle + angle) / 2)
        ctx.fillStyle = wheelProps.contrastColor
        ctx.font = 'bold 1em ' + wheelProps.fontFamily
        ctx.fillText(value.substring(0, 21), wheelProps.size / 2 + 20, 0)
        ctx.restore()
    }

    const drawWheel = () => {
        const ctx = canvasContext
        let lastAngle = angleCurrent
        const len = wheelProps.participants.length
        const PI2 = Math.PI * 2
        ctx.lineWidth = 1
        ctx.strokeStyle = wheelProps.primaryColor
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        ctx.font = '1em ' + wheelProps.fontFamily
        for (let i = 1; i <= len; i++) {
            const angle = PI2 * (i / len) + angleCurrent
            drawSegment(i - 1, lastAngle, angle)
            lastAngle = angle
        }

        // Draw a center circle
        ctx.beginPath()
        ctx.arc(centerX, centerY, 50, 0, PI2, false)
        ctx.closePath()
        ctx.fillStyle = wheelProps.primaryColor
        ctx.lineWidth = 10
        ctx.strokeStyle = wheelProps.contrastColor
        ctx.fill()
        ctx.font = 'bold 1em ' + wheelProps.fontFamily
        ctx.fillStyle = wheelProps.contrastColor
        ctx.textAlign = 'center'
        ctx.fillText('spin', centerX, centerY + 3)
        ctx.stroke()

        // Draw outer circle
        ctx.beginPath()
        ctx.arc(centerX, centerY, wheelProps.size, 0, PI2, false)
        ctx.closePath()

        ctx.lineWidth = 10
        ctx.strokeStyle = wheelProps.primaryColor
        ctx.stroke()
    }

    const drawNeedle = () => {
        const ctx = canvasContext
        ctx.lineWidth = 1
        ctx.strokeStyle = wheelProps.contrastColor
        ctx.fileStyle = wheelProps.contrastColor
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
        ctx.fillStyle = wheelProps.primaryColor
        ctx.font = 'bold 1.5em ' + wheelProps.fontFamily
        currentParticipant = wheelProps.participants[i]
        isStarted && ctx.fillText(currentParticipant, centerX + 10, centerY + wheelProps.size + 50)
    }
    const clear = () => {
        canvasContext.clearRect(0, 0, 1000, 800)
    }
    return (
        <div id='wheel'>
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
