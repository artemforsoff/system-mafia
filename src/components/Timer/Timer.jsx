import React, { useState, useEffect } from 'react';
import s from './Timer.module.scss';
import { Space, Button } from 'antd';

export const Timer = () => {
    const [seconds, setSeconds] = useState(60 * 1000);
    const [pause, setPause] = useState(false);
    const [start, setStart] = useState(false);

    useEffect(() => {
        if(start && !pause) {
            if(seconds !== 1000) {
                changeTime();
            } else {
                resetTimer();
            }
        }
    });

    const changeTime = () => {
        if(start && !pause) {
            setTimeout(() => setSeconds(seconds - 100), 100);
        }
    }

    const resetTimer = () => {
        setStart(false);
        setTimeout(() => setSeconds(60 * 1000), 100);
    }

    const startTimer = () => {
        setStart(true);
        setPause(false)
    }

    const formatTime = (seconds) => {
        let date = new Date(seconds);
        return `${("00" + date.getMinutes()).slice(-2)}:${("00" + date.getSeconds()).slice(-2)}`;; 
    }

    return(
        <div className={s.timer}>
            <span className={[(seconds <= 10000 ? s.timer__currentDanger : ''), s.timer__current].join(' ')}>{formatTime(seconds)}</span>
            <Space>
                <Button onClick={startTimer}>Старт</Button>
                <Button onClick={() => setPause(true)}>Пауза</Button>
                <Button onClick={resetTimer}>Обнулить</Button>
            </Space>
        </div>
    );
}