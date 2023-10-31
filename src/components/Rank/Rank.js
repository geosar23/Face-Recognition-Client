import React, {useEffect, useState, useContext } from 'react';
import moment from 'moment'
import './Rank.css'
import { PointsEarnedContext } from '../../App';

const Rank = ({ user }) => {
    const { pointsEarned } = useContext(PointsEarnedContext);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {

        if (pointsEarned !== 0) {
            setAnimate(true);

            
            const timer = setTimeout(() => {
                setAnimate(false);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [pointsEarned]);

    return (
        <div className='ma4 mt0'>
        <div className='white f3'>
            {`Hello ${user.name}, you have logged in ${user.entries} times, you are joined since ${moment(user.joined).calendar()}`}
        </div>
        <div className='rank white f1'>
            {`Your rank is #${user.score}`}
            {/* {pointsEarned !== 0 && (
                <h1 className={`rotate hoverOver ${animate ? 'hovered' : ''}`}>+{pointsEarned}</h1>
            )} */}
        </div>
        </div>
    );
}

export default Rank;
