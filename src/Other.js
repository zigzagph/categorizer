import React from 'react'

export default ({other}) => {
    console.log(other);
    return (
        <div>
            { 
                other.length > 0 ? 
                    <div style={{color: 'white'}}>
                        Other
                    </div>
                :
                    null
            }
        </div>
    )
}
