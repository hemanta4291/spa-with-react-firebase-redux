import React from 'react'

const Breadcrumb = ({title='Default Title'}) => {
    return (
        <div className='hero border-t border-gray-200 pt-3'>
            <div className='container mx-auto flex bg-info-50 rounded-lg px-12 py-[76px] items-center justify-center'>
                <h2 className='text-4xl text-gray-800 font-semibold pb-2'>{title}</h2>
            </div>
        </div>
    )
}

export default Breadcrumb