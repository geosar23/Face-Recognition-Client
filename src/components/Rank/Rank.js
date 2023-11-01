import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import './Rank.css';
import { PointsEarnedContext } from '../../App';

const Rank = ({ user }) => {
    const { pointsEarned } = useContext(PointsEarnedContext);
    const [animate, setAnimate] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
        if (pointsEarned !== 0) {
            setShowAnimation(true);
            setAnimate(true);

            const timer = setTimeout(() => {
                setAnimate(false);
                setShowAnimation(false);
            }, 2000); // Adjust the duration to match your animation's duration

            return () => clearTimeout(timer);
        }
    }, [pointsEarned]);

    return (
        <div className='ma4 mt0'>
            <div className='white f3'>
                {`Hello ${user.name}, you have logged in ${user.entries} times, you joined since ${moment(user.joined).calendar()}`}
            </div>
            <div className='rank white f1'>
                {`Your rank is #${user.score}`}
                {showAnimation && animate && (
                    <h1 className={`rotate-and-scale hoverOver press-start-2p`}><span className='changeColor press-start-2p'>+{pointsEarned}</span></h1>
                )}
            </div>
        </div>
    );
};

export default Rank;
