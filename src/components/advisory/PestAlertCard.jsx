import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

const SEVERITY_COLORS = { Low: '#22c55e', Medium: '#f59e0b', High: '#ef4444' };

const PestAlertCard = ({ alert }) => {
    const { name, severity, description, remedy } = alert;
    const color = SEVERITY_COLORS[severity] || '#64748b';

    return (
        <div className="bh-pest-card" style={{ borderLeftColor: color }}>
            <div className="bh-pest-header">
                <FiAlertTriangle size={18} color={color} />
                <span className="bh-pest-name">{name}</span>
                <span className="bh-pest-severity" style={{ background: color }}>
                    {severity}
                </span>
            </div>
            <p className="bh-pest-desc">{description}</p>
            <p className="bh-pest-remedy"><strong>Remedy:</strong> {remedy}</p>
        </div>
    );
};

export default PestAlertCard;
