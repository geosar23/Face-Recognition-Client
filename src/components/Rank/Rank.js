import React from 'react'
import moment from 'moment'

const Rank=({user})=>{
    return(
        <div className='ma4 mt0'>
            <div className='white f3'>
                {`Hello ${user.name}, you have logged in ${user.entries} times, you are joined since ${moment(user.joined).calendar()}`}

            </div>
            <div className='rank white f1'>
                {`Your rank is #${user.score}`}

            </div>
        </div>
    )
}

export default Rank