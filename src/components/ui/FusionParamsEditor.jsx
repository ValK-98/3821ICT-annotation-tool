import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tooltip from "./Tooltip";

const FusionParamsEditor = () => {
    // State to hold the current parameter values
    const [params, setParams] = useState(null);
    // State to hold the min/max limits for the inputs
    const [paramLimits, setParamLimits] = useState(null);
    
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const fetchParams = async () => {
            setLoading(true);
            setStatus("Fetching fusion parameters...");
            try {
                const res = await fetch("http://localhost:9090/get-fusion_params");
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();
                
                // Set the current values from the 'params' object
                setParams(data.params);
                // Set the limits for the inputs
                setParamLimits(data.limits);

                setStatus("Parameters loaded successfully.");
            } catch (err) {
                console.error("Failed to fetch fusion params", err);
                setStatus("Error: Failed to fetch parameters.");
            } finally {
                setLoading(false);
            }
        };
        fetchParams();
    }, []);

    const handleChange = (key, value) => {
        setParams((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        setStatus("Saving changes...");
        try {
            const res = await fetch("http://localhost:9090/update-fusion_params", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(params),
            });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            setStatus("Saved successfully!");
        } catch (err) {
            console.error("Failed to update fusion params", err);
            setStatus("Error: Failed to save changes.");
        } finally {
            setSaving(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    };

    return (
        <div className="p-4 bg-accent rounded-xl text-foreground w-full flex flex-col gap-6">
            <h2 className="text-xl font-semibold mb-2">Fusion Parameters</h2>

            <AnimatePresence mode="wait">
                {loading && (
                    <motion.p
                        key="loading"
                        className="text-gray-400"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={itemVariants}
                    >
                        {status}
                    </motion.p>
                )}
                {!loading && (!params || !paramLimits) && (
                    <motion.p
                        key="no-params"
                        className="text-red-500"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={itemVariants}
                    >
                        No fusion parameters loaded
                    </motion.p>
                )}
                {!loading && params && paramLimits && (
                    <motion.div
                        key="content"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={containerVariants}
                        >
                            <NumberInput
                                title="Beta"
                                toolTipText="Beta: Smoothing factor for video frame probabilities. Higher values make video labels more stable over time, reducing sudden changes. It does not directly affect the weight of audio vs. video in the fusion step."
                                param="beta"
                                value={params.beta}
                                step={0.01}
                                min={paramLimits.beta[0]}
                                max={paramLimits.beta[1]}
                                onChange={handleChange}
                                isSaving={saving}
                            />
                            <NumberInput
                                title="Min Duration (s)"
                                toolTipText="The minimum time (in seconds) a label must persist to be allowed to change. Shorter labels that appear for less than this duration are ignored, helping to reduce flickering in the detected emotion."
                                param="min_duration"
                                value={params.min_duration}
                                step={0.1}
                                min={paramLimits.min_duration[0]}
                                max={paramLimits.min_duration[1]}
                                onChange={handleChange}
                                isSaving={saving}
                            />
                            <NumberInput
                                title="FPS"
                                toolTipText="Frames per second for video analysis. Higher values increase accuracy but require more computation."
                                param="fps"
                                value={params.fps}
                                step={1}
                                min={paramLimits.fps[0]}
                                max={paramLimits.fps[1]}
                                onChange={handleChange}
                                isSaving={saving}
                            />
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6"
                        >
                            <NumberInput
                                title="Floor Prob"
                                toolTipText="The minimum probability value used to avoid numerical instability in calculations."
                                param="floor_prob"
                                value={params.floor_prob}
                                step={1e-12}
                                min={paramLimits.floor_prob[0]}
                                max={paramLimits.floor_prob[1]}
                                onChange={handleChange}
                                isSaving={saving}
                                isRange={false}
                            />
                            <div className="flex items-center space-x-3 mt-8 md:mt-0">
                                <input
                                    type="checkbox"
                                    checked={params.debug}
                                    onChange={(e) => handleChange("debug", e.target.checked)}
                                    className="h-4 w-4"
                                    disabled={saving}
                                />
                                <label className="text-sm font-medium text-gray-400">
                                    Debug Mode
                                </label>
                            </div>
                        </motion.div>

                        <motion.button
                            variants={itemVariants}
                            onClick={handleSave}
                            disabled={saving}
                            className={`w-full py-2 px-4 my-2 rounded-md text-gray-300 font-semibold transition-colors
                                ${saving ? 'bg-gray-500 cursor-not-allowed' : 'bg-sky-800 hover:bg-blue-700 shadow-lg'}
                            `}
                            whileHover={{ scale: saving ? 1 : 1.02 }}
                            whileTap={{ scale: saving ? 1 : 0.98 }}
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </motion.button>
                        <AnimatePresence>
                            {status && (
                                <motion.p
                                    key="status-message"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className={`mt-4 text-sm font-medium ${status.includes("Error") ? "text-red-500" : "text-green-500"}`}
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

export default FusionParamsEditor;

// Drop-in reusable component from ModelSettings
const NumberInput = ({
    title,
    param,
    value,
    step,
    min,
    max,
    onChange,
    isSaving,
    toolTipText,
    isRange = true,
}) => {
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    };

    return (
        <motion.div className="flex flex-col w-full" variants={variants}>
            <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-gray-400">{title}</label>
                {toolTipText && <Tooltip text={toolTipText} />}
            </div>
            <div className="flex items-center gap-4">
                {isRange && (
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
                )}
                <input
                    type="number"
                    step={step}
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => onChange(param, parseFloat(e.target.value))}
                    className={`w-20 px-2 py-1 border border-gray-600 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isRange && "w-full"
                        }`}
                    disabled={isSaving}
                />
            </div>
        </motion.div>
    );
};