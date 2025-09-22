import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tooltip from './Tooltip';

const ModelSettings = () => {
    const [availableModels, setAvailableModels] = useState({
        audio_emotion: [],
        face: [],
        face_emotion: [],
    });
    const [currentModels, setCurrentModels] = useState({
        audio_emotion: '',
        face: '',
        face_emotion: '',
    });
    const [parameters, setParameters] = useState({});

    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchModels = async () => {
            setLoading(true);
            setStatus('Fetching models...');
            try {
                const response = await fetch('http://localhost:9090/get_models');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const apiResponse = await response.json();
                setAvailableModels(apiResponse.available);
                setCurrentModels({
                    audio_emotion: apiResponse.current.audio_emotion,
                    face: apiResponse.current.face,
                    face_emotion: apiResponse.current.face_emotion,
                });
                setParameters(apiResponse.current.parameters || {});
                setStatus('Models and parameters loaded successfully.');
            } catch (error) {
                console.error('Failed to fetch models:', error);
                setStatus('Error: Failed to fetch models.');
            } finally {
                setLoading(false);
            }
        };

        fetchModels();
    }, []);

    const handleModelChange = (modelType, value) => {
        setCurrentModels(prev => ({ ...prev, [modelType]: value }));
    };

    const handleParamChange = (param, value) => {
        setParameters(prev => ({ ...prev, [param]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        setStatus('Saving models and parameters...');
        try {
            const response = await fetch('http://localhost:9090/set_models', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...currentModels,
                    parameters: parameters,
                }),
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            setStatus('Saved successfully!');
        } catch (error) {
            console.error('Failed to save models/params:', error);
            setStatus('Error: Failed to save models/params.');
        } finally {
            setIsSaving(false);
        }
    };
    
    // Framer Motion variants for animated sections
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="p-4 bg-accent rounded-xl text-foreground w-full flex flex-col gap-6">
            <h2 className="text-xl font-semibold mb-4">Model & Parameter Settings</h2>

            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div
                        key="loading"
                        className="text-gray-400"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={variants}
                    >
                        {status}
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                    >
                        {/* Model dropdowns */}
                        <motion.div variants={variants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Dropdown
                                title="Audio Emotion Model"
                                modelType="audio_emotion"
                                options={availableModels.audio_emotion}
                                value={currentModels.audio_emotion}
                                onChange={handleModelChange}
                                isSaving={isSaving}
                            />
                            <Dropdown
                                title="Face Model"
                                modelType="face"
                                options={availableModels.face}
                                value={currentModels.face}
                                onChange={handleModelChange}
                                isSaving={isSaving}
                            />
                            <Dropdown
                                title="Face Emotion Model"
                                modelType="face_emotion"
                                options={availableModels.face_emotion}
                                value={currentModels.face_emotion}
                                onChange={handleModelChange}
                                isSaving={isSaving}
                            />
                        </motion.div>

                        {/* Parameter sliders */}
                        <motion.div variants={variants} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <NumberInput
                                title="Frame Step"
                                toolTipText="Interval between frames to analyze. Higher values reduce computation but may miss rapid changes."
                                param="frame_step"
                                value={parameters.frame_step ?? 1}
                                step={1}
                                min={1}
                                max={100}
                                onChange={handleParamChange}
                                isSaving={isSaving}
                            />
                            <NumberInput
                                title="Face Confidence"
                                toolTipText="Confidence threshold for face detection. Higher values increase precision but may miss faces."
                                param="face_conf"
                                value={parameters.face_conf ?? 0.75}
                                step={0.05}
                                min={0.1}
                                max={1.0}
                                onChange={handleParamChange}
                                isSaving={isSaving}
                            />
                            <NumberInput
                                title="Emotion Confidence"
                                toolTipText="Confidence threshold for emotion recognition. Higher values increase precision but may miss subtle emotions."
                                param="emotion_conf"
                                value={parameters.emotion_conf ?? 0.75}
                                step={0.05}
                                min={0.1}
                                max={1.0}
                                onChange={handleParamChange}
                                isSaving={isSaving}
                            />
                        </motion.div>
                        
                        {/* Segment Duration */}
                        <motion.div variants={variants} className="mt-6">
                            <NumberInput
                                title="Segment Duration (s)"
                                toolTipText="Duration of audio segments to analyze. Shorter durations may capture quick changes but can be less accurate and significantly increase inference time."
                                param="segment_duration"
                                value={parameters.segment_duration ?? 0.5}
                                step={0.1}
                                min={0.1}
                                max={10.0}
                                onChange={handleParamChange}
                                isSaving={isSaving}
                            />
                        </motion.div>

                        {/* Save Button */}
                        <motion.button
                            variants={variants}
                            onClick={handleSave}
                            disabled={isSaving}
                            className={`w-full py-2 px-4 my-2 rounded-md text-gray-300 font-semibold transition-colors
                                ${isSaving ? 'bg-gray-500 cursor-not-allowed' : 'bg-sky-800 hover:bg-blue-700 shadow-lg'}
                            `}
                            whileHover={{ scale: isSaving ? 1 : 1.02 }}
                            whileTap={{ scale: isSaving ? 1 : 0.98 }}
                        >
                            {isSaving ? 'Saving...' : 'Save'}
                        </motion.button>

                        {/* Status Message */}
                        <AnimatePresence>
                            {status && (
                                <motion.p
                                    key="status-message"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className={`mt-4 text-sm font-medium ${status.includes('Error') ? 'text-red-500' : 'text-green-500'}`}
                                >
                                    {status}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ModelSettings;

const Dropdown = ({ title, modelType, options, value, onChange, isSaving }) => {
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
    };

    return (
        <motion.div 
            className="flex flex-col"
            variants={variants}
        >
            <label className="text-sm font-medium text-gray-400 mb-1">{title}</label>
            <select
                value={value}
                onChange={(e) => onChange(modelType, e.target.value)}
                className="w-full py-2 px-3 transition-all duration-300 hover:bg-popover border border-gray-600 rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSaving}
            >
                {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        </motion.div>
    );
};

// NumberInput component
const NumberInput = ({ title, param, value, step, min, max, onChange, isSaving, toolTipText }) => {
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
    };

    return (
        <motion.div 
            className="flex flex-col w-full"
            variants={variants}
        >
            <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-gray-400">{title}</label>
                {toolTipText && <Tooltip text={toolTipText} />}
            </div>
            <div className="flex items-center gap-4">
                <input
                    type="range"
                    step={step}
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => onChange(param, parseFloat(e.target.value))}
                    className="flex-1 cursor-pointer accent-blue-500"
                    disabled={isSaving}
                />
                <input
                    type="number"
                    step={step}
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => onChange(param, parseFloat(e.target.value))}
                    className="w-20 px-2 py-1 border border-gray-600 rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isSaving}
                />
            </div>
        </motion.div>
    );
};
