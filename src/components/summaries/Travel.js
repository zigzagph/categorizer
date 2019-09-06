import React from 'react'

export default ({travel}) => {
    //console.log(travel);
    return (
        <div>
            { 
                travel.length > 0 ? 
                    <div style={{color: 'white'}}>
                        Travel
                    </div>
                :
                    null
            }
        </div>
    )
}
