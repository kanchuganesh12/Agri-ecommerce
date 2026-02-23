import React from 'react';

const StageAdvice = ({ data }) => {
    if (!data) return null;
    return (
        <div className="bh-stage-advice">
            {/* Fertilizers */}
            {data.fertilizers?.length > 0 && (
                <div className="bh-advice-section">
                    <h4>🌿 Recommended Fertilizers</h4>
                    <ul>
                        {data.fertilizers.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                </div>
            )}
            {/* Spray Schedule */}
            {data.spraySchedule?.length > 0 && (
                <div className="bh-advice-section">
                    <h4>💧 Spray Schedule</h4>
                    <ul>
                        {data.spraySchedule.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                </div>
            )}
            {/* Tips */}
            {data.tips?.length > 0 && (
                <div className="bh-advice-section">
                    <h4>💡 Expert Tips</h4>
                    <ul>
                        {data.tips.map((t, i) => <li key={i}>{t}</li>)}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default StageAdvice;
