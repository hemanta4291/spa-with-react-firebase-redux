import React from 'react'

const Empty = ({title='default title'}) => {
    return (
        <div className='text-center h-full flex justify-center items-center flex-col '>
            {title}
            <div class="material-icons-outlined">production_quantity_limits</div>
        </div>
    )
}

export default Empty