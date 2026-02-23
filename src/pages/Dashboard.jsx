import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdvisory, fetchPestAlerts, setCrop, setStage } from '../features/advisory/advisorySlice';
import CropSelector from '../components/advisory/CropSelector';
import PestAlertCard from '../components/advisory/PestAlertCard';
import StageAdvice from '../components/advisory/StageAdvice';
import ExpertVideo, { EXPERT_VIDEOS } from '../components/advisory/ExpertVideo';
import Loader from '../components/common/Loader';
import { GROWTH_STAGES } from '../utils/constants';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { selectedCrop, selectedStage, data, pestAlerts, loading } = useSelector((s) => s.advisory);

    useEffect(() => {
        dispatch(fetchAdvisory({ crop: selectedCrop, stage: selectedStage }));
        dispatch(fetchPestAlerts(selectedCrop));
    }, [selectedCrop, selectedStage, dispatch]);

    return (
        <div className="bh-container bh-dashboard">
            <h1 className="bh-page-title">🌾 Crop Advisory Dashboard</h1>
            <p className="bh-page-sub">Get personalized guidance for your crops at every growth stage.</p>

            {/* Crop Selector */}
            <CropSelector />

            {/* Stage Tabs */}
            <div className="bh-stage-tabs">
                {GROWTH_STAGES.map((stage) => (
                    <button
                        key={stage}
                        className={`bh-stage-tab ${selectedStage === stage.toLowerCase() ? 'active' : ''}`}
                        onClick={() => dispatch(setStage(stage.toLowerCase()))}
                    >
                        {stage}
                    </button>
                ))}
            </div>

            {loading ? (
                <Loader center size="lg" text="Loading advisory..." />
            ) : (
                <div className="bh-advisory-grid">
                    {/* Pest Alerts */}
                    <div className="bh-advisory-left">
                        <h3 className="bh-advisory-section-title">🚨 Pest & Disease Alerts</h3>
                        {pestAlerts.length ? (
                            pestAlerts.map((a, i) => <PestAlertCard key={i} alert={a} />)
                        ) : (
                            <p className="bh-advisory-empty">No active alerts for {selectedCrop}.</p>
                        )}

                        {/* Advice */}
                        <h3 className="bh-advisory-section-title" style={{ marginTop: 24 }}>📋 Stage Recommendations</h3>
                        <StageAdvice data={data} />
                    </div>

                    {/* Expert Videos */}
                    <div className="bh-advisory-right">
                        <h3 className="bh-advisory-section-title">🎥 Expert Videos</h3>
                        {EXPERT_VIDEOS.map((v) => (
                            <ExpertVideo key={v.id} video={v} />
                        ))}
                        {/* Weather Alert placeholder */}
                        <div className="bh-weather-card">
                            <p>☁️ <strong>Weather Alert</strong></p>
                            <p style={{ fontSize: 13, marginTop: 6 }}>Moderate rain expected in next 48 hours. Avoid spraying.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
