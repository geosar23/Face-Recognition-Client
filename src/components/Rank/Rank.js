import React from 'react'
import moment from 'moment'

const Rank=({user})=>{
    return(
        <div className='ma4 mt0'>
            <div className='white f3'>
                {`${user.name} your current entry count is ${user.entries}, you are joined since ${moment(user.joined).calendar()}`}

            </div>
            <div className='rank white f1'>
                {`Your rank is #${user.score}`}

            </div>
        </div>
    )
}

export default Rank