import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdvisory, fetchPestAlerts } from '../../features/advisory/advisorySlice';
import CropSelector from '../../components/advisory/CropSelector';
import PestAlertCard from '../../components/advisory/PestAlertCard';
import StageAdvice from '../../components/advisory/StageAdvice';
import ExpertVideo, { EXPERT_VIDEOS } from '../../components/advisory/ExpertVideo';
import Loader from '../../components/common/Loader';
import { GROWTH_STAGES } from '../../utils/constants';

const AdvisoryDashboard = () => {
    const dispatch = useDispatch();
    const { selectedCrop, selectedStage, data, pestAlerts, loading } = useSelector((s) => s.advisory);

    useEffect(() => {
        dispatch(fetchAdvisory({ crop: selectedCrop, stage: selectedStage }));
        dispatch(fetchPestAlerts(selectedCrop));
    }, [selectedCrop, selectedStage, dispatch]);

    if (loading) return <Loader center size="lg" text="Loading advisory..." />;

    return (
        <div>
            <CropSelector />
            <StageAdvice data={data} />
            {pestAlerts.map((a, i) => <PestAlertCard key={i} alert={a} />)}
            {EXPERT_VIDEOS.map((v) => <ExpertVideo key={v.id} video={v} />)}
        </div>
    );
};

export default AdvisoryDashboard;
