import React from 'react'

export default ({mande}) => {
    console.log(mande);
    return (
        <div>
            { 
                mande.length > 0 ? 
                    <div style={{color: 'white'}}>
                        Meals & Entertainment
                    </div>
                :
                    null
            }
        </div>
    )
}
