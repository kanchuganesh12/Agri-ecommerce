import React from 'react';
import { FiPlay } from 'react-icons/fi';

const EXPERT_VIDEOS = [
    { id: 1, title: 'Profitability tips for quality farm produce', thumbnail: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=225&fit=crop', duration: '8:42', expert: 'Dr. Ramesh Kumar' },
    { id: 2, title: 'Managing Pink Bollworm in Cotton: A Guide for Farmers', thumbnail: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=225&fit=crop', duration: '12:15', expert: 'AgriExpert Team' },
    { id: 3, title: '5 Secret Irrigation Tips to Save Water and Increase Yield', thumbnail: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=225&fit=crop', duration: '6:30', expert: 'Kisan Vedika' },
];

const ExpertVideo = ({ video = EXPERT_VIDEOS[0] }) => {
    return (
        <div className="bh-expert-video">
            <div className="bh-video-thumb-wrap">
                <img src={video.thumbnail} alt={video.title} className="bh-video-thumb" />
                <div className="bh-video-play-btn">
                    <FiPlay size={24} fill="#fff" stroke="#fff" />
                </div>
                <span className="bh-video-duration">{video.duration}</span>
            </div>
            <div className="bh-video-info">
                <p className="bh-video-title">{video.title}</p>
                <p className="bh-video-expert">{video.expert}</p>
            </div>
        </div>
    );
};

export { EXPERT_VIDEOS };
export default ExpertVideo;
