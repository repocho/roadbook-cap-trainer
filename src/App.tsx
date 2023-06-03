import React from 'react';
import { useCallback, useState, useEffect } from 'react';
import windRose from './Rosa_de_los_vientos_71-svg.png';
import logo from './logo.png';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faLocationPin } from '@fortawesome/free-solid-svg-icons';
import { isDirectionCorrect, nextRandomCap } from './utils';
import HistoryCapList from './HistoryCapList';

const MAX_HISTORY_LENGTH = 15;

function App() {
    const initCap = nextRandomCap(0);
    const [showRose, setShowRose] = useState(true);
    const [currentCap, setCurrentCap] = useState(initCap);
    const [nextCap, setNextCap] = useState(nextRandomCap(initCap));
    const [historyCap, setHistoryCap] = useState<
        Array<{
            current: number;
            next: number;
            isLeft: boolean;
            correct: boolean;
        }>
    >([]);
    const [showResultAnimation, setShowResultAnimation] = useState(false);
    const [totals, setTotals] = useState<{
        correct: number;
        total: number;
    }>({ correct: 0, total: 0 });

    const setNewRandomCap = useCallback(
        (isLeft: boolean) => {
            const newCap = nextRandomCap(nextCap);
            const correct = isDirectionCorrect(currentCap, nextCap, isLeft);
            setHistoryCap([{ current: currentCap, next: nextCap, isLeft, correct }, ...historyCap.slice(0, MAX_HISTORY_LENGTH - 1)]);
            setCurrentCap(nextCap);
            setNextCap(newCap);
            setShowResultAnimation(true);
            setTotals({ correct: totals.correct + (correct ? 1 : 0), total: totals.total + 1 });
        },
        [historyCap, currentCap, nextCap, showResultAnimation]
    );

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                setNewRandomCap(true);
            } else if (e.key === 'ArrowRight') {
                setNewRandomCap(false);
            }
        },
        [setNewRandomCap]
    );

    // useEffect(() => {
    //   const interval = setInterval(() => setNewRandomCap(), 1000);
    //   return () => clearInterval(interval);
    // }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const markerStyle = {
        margin: '10px 20px',
        padding: '10px 20px',
        backgroundColor: '#14161a',
        border: '4px #3f444f solid',
        width: '7em',
    };

    const leftArrowClasses = ['arrowButton'];
    const rightArrowClasses = ['arrowButton'];

    if (showResultAnimation && historyCap.length > 0) {
        if (historyCap[0].isLeft) {
            leftArrowClasses.push(historyCap[0].correct ? 'correct' : 'incorrect');
        } else {
            rightArrowClasses.push(historyCap[0].correct ? 'correct' : 'incorrect');
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>
                    Roadbook <img src={logo} alt="logo" style={{ verticalAlign: 'middle', maxHeight: 70 }} />
                </h1>
                <span>Choose the Direction (Left or Right) based on Current and Next CAPs</span>
                <div className={'container'}>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <span style={markerStyle}>
                                Current CAP: <h3 style={{ padding: '10px 20px' }}>{currentCap}</h3>
                            </span>
                            <span style={markerStyle}>
                                Next CAP: <h3 style={{ padding: '10px 20px', backgroundColor: 'yellow', color: 'black' }}>{nextCap}</h3>
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-around', position: 'relative' }}>
                            <span style={{ cursor: 'pointer' }} onClick={() => setNewRandomCap(true)}>
                                <FontAwesomeIcon
                                    className={leftArrowClasses.join(' ')}
                                    icon={faArrowLeft}
                                    size="2xl"
                                    style={{ height: 100 }}
                                    onAnimationEnd={() => setShowResultAnimation(false)}
                                />
                            </span>
                            <span style={{ cursor: 'pointer' }} onClick={() => setShowRose(!showRose)}>
                                <FontAwesomeIcon icon={faLocationPin} style={{ position: 'absolute', bottom: 0, marginLeft: -8 }} />
                            </span>
                            <span style={{ cursor: 'pointer' }} onClick={() => setNewRandomCap(false)}>
                                <FontAwesomeIcon
                                    className={rightArrowClasses.join(' ')}
                                    icon={faArrowRight}
                                    size="2xl"
                                    style={{ height: 100 }}
                                    onAnimationEnd={() => setShowResultAnimation(false)}
                                />
                            </span>
                        </div>
                        <img
                            src={windRose}
                            className="App-logo"
                            alt="logo"
                            style={{
                                transform: `rotate(-${currentCap}deg)`,
                                transition: 'transform 350ms ease',
                                visibility: showRose ? 'visible' : 'hidden',
                            }}
                        />
                    </div>
                    <div className={'results'}>
                        <h4>Accuracy: {totals.total ? `${Math.floor((100 * totals.correct) / totals.total)} %` : 'N/A'}</h4>
                        <h4>Previous {MAX_HISTORY_LENGTH} caps:</h4>
                        <HistoryCapList historyCap={historyCap}></HistoryCapList>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
