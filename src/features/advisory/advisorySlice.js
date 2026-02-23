import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance';
import API from '../../services/apiEndpoints';

const MOCK_ADVISORY = {
    rice: {
        germination: {
            pests: ['Rice Stem Borer', 'Leaf Folder'],
            diseases: ['Blast', 'Brown Spot'],
            fertilizers: ['DAP 50kg/acre', 'Urea 25kg/acre'],
            spraySchedule: ['Week 1: Chlorpyrifos spray', 'Week 2: Carbendazim fungicide'],
            tips: ['Maintain 2-3 inches water level', 'Use certified seeds', 'Treat seeds with Trichoderma'],
        },
        flowering: {
            pests: ['Gall Midge', 'Brown Plant Hopper'],
            diseases: ['Sheath Blight', 'False Smut'],
            fertilizers: ['Potassium Sulphate 25kg/acre', 'MOP 20kg/acre'],
            spraySchedule: ['Propiconazole spray at boot leaf stage', 'Imidacloprid for BPH control'],
            tips: ['Avoid excess nitrogen', 'Monitor water levels', 'Keep field clean of weeds'],
        },
    },
    tomato: {
        germination: {
            pests: ['Whitefly', 'Thrips'],
            diseases: ['Damping Off', 'Early Blight'],
            fertilizers: ['19-19-19 NPK 5kg/acre', 'Calcium Nitrate 10kg/acre'],
            spraySchedule: ['Imidacloprid spray week 1', 'Mancozeb fungicide week 2'],
            tips: ['Use shade net', 'Drip irrigation preferred', 'Transplant at 25-30 days'],
        },
        flowering: {
            pests: ['Fruit Borer', 'Leaf Curl Virus'],
            diseases: ['Late Blight', 'Fusarium Wilt'],
            fertilizers: ['Biovita BioFertilizer', 'Boron 500g/acre'],
            spraySchedule: ['Coragen at fruit initiation', 'Saaf fungicide for blight'],
            tips: ['Stake plants for support', 'Remove infected leaves', 'Spray neem oil weekly'],
        },
    },
    cotton: {
        germination: {
            pests: ['Aphids', 'Jassids'],
            diseases: ['Bacterial Blight', 'Root Rot'],
            fertilizers: ['DAP 25kg/acre', 'SSP 50kg/acre'],
            spraySchedule: ['Imidacloprid seed treatment', 'Mancozeb spray week 3'],
            tips: ['Sow at 45x60 cm spacing', 'Deep ploughing before sowing', 'Treat seeds before sowing'],
        },
    },
};

export const fetchAdvisory = createAsyncThunk('advisory/fetch', async ({ crop, stage }, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(API.CROP_STAGES(crop), { params: { stage } });
        return data;
    } catch {
        const cropData = MOCK_ADVISORY[crop]?.[stage?.toLowerCase()] || MOCK_ADVISORY.rice.germination;
        return { crop, stage, ...cropData };
    }
});

export const fetchPestAlerts = createAsyncThunk('advisory/pests', async (crop, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(API.PEST_ALERTS(crop));
        return data;
    } catch {
        return (MOCK_ADVISORY[crop]?.germination?.pests || ['Rice Stem Borer']).map((name) => ({
            name,
            severity: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
            description: `${name} can cause significant yield loss. Monitor regularly.`,
            remedy: 'Apply recommended pesticide immediately.',
        }));
    }
});

const advisorySlice = createSlice({
    name: 'advisory',
    initialState: {
        selectedCrop: 'rice',
        selectedStage: 'germination',
        data: null,
        pestAlerts: [],
        loading: false,
        error: null,
    },
    reducers: {
        setCrop(state, action) { state.selectedCrop = action.payload; },
        setStage(state, action) { state.selectedStage = action.payload; },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdvisory.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchAdvisory.fulfilled, (state, action) => { state.loading = false; state.data = action.payload; })
            .addCase(fetchAdvisory.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            .addCase(fetchPestAlerts.fulfilled, (state, action) => { state.pestAlerts = action.payload; });
    },
});

export const { setCrop, setStage } = advisorySlice.actions;
export default advisorySlice.reducer;
