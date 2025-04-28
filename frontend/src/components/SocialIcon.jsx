import React from 'react'

const SocialIcon = ({ icon }) => (
    <h4 className="border w-10 h-10 flex justify-center items-center border-gray-400 rounded-full hover:bg-gray-200">
        <i className={`${icon} text-xl`}></i>
    </h4>
);

export default SocialIcon