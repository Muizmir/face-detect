import React from 'react';

const Rank = ({ name, entries }) => {
    return (
        <React.Fragment>
            <span className='white f3'>
                {`${name}, your entries count is ..... `}
            </span>
            <span className='white f1'>
                {entries}
            </span>
        </React.Fragment>        
        
    )
}

export default Rank;