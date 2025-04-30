import React from 'react'

const SocialIcon = ({ icon, hW, textSize }) => (
    <h4 className={`${hW ? hW : 'w-8 h-8'} flex justify-center items-center rounded-full`}>
        <i className={`${icon} ${textSize ? textSize : 'text-xl'} `}></i>
    </h4>
);

export default SocialIcon