import { useEffect, useState } from 'react';
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
  const [parameters, setParameters] = useState({}); // store current predictor params

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
        console.log(apiResponse)
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


  return (
    <div className="p-4 bg-accent rounded-xl text-foreground">
      <h2 className="text-xl font-semibold mb-4">Model & Parameter Settings</h2>
      {loading ? (
        <div className="text-gray-400">{status}</div>
      ) : (
        <>
          {/* Model selectors */}
          <Dropdown
            title="Audio Emotion Model"
            isSaving={isSaving}
            modelType="audio_emotion"
            options={availableModels.audio_emotion}
            value={currentModels.audio_emotion}
            onChange={handleModelChange}
          />
          <Dropdown
            title="Face Model"
            modelType="face"
            isSaving={isSaving}
            options={availableModels.face}
            value={currentModels.face}
            onChange={handleModelChange}
          />
          <Dropdown
            title="Face Emotion Model"
            isSaving={isSaving}
            modelType="face_emotion"
            options={availableModels.face_emotion}
            value={currentModels.face_emotion}
            onChange={handleModelChange}
          />

          {/* Parameter inputs */}
          <div className=''>
              <div className='flex gap-4 justify-between'>
                <NumberInput
                    title="Frame Step"
                    isSaving={isSaving}
                    toolTipText={"Interval between frames to analyze. Higher values reduce computation but may miss rapid changes."}
                    param="frame_step"
                    value={parameters.frame_step ?? 1}
                    step={1}
                    min={1}
                    max={100}
                    onChange={handleParamChange}
                />
                <NumberInput
                    title="Face Confidence"
                    toolTipText={"Confidence threshold for face detection. Higher values increase precision but may miss faces."}
                    isSaving={isSaving}
                    param="face_conf"
                    value={parameters.face_conf ?? 0.75}
                    step={0.05}
                    min={0.1}
                    max={1.0}
                    onChange={handleParamChange}
                />
                <NumberInput
                title="Emotion Confidence"
                toolTipText={"Confidence threshold for emotion recognition. Higher values increase precision but may miss subtle emotions."}
                param="emotion_conf"
                isSaving={isSaving}
                value={parameters.emotion_conf ?? 0.75}
                step={0.05}
                min={0.1}
                max={1.0}
                onChange={handleParamChange}
              />
              </div>
          </div>



          <NumberInput
            title="Segment Duration (s)"
            toolTipText={"Duration of audio segments to analyze. Shorter durations may capture quick changes but can be less accurate and significantly increase inference time"}
            param="segment_duration"
            isSaving={isSaving}
            value={parameters.segment_duration ?? 0.5}
            step={0.1}
            min={0.1}
            max={10.0}
            onChange={handleParamChange}
          />
          <button
            onClick={handleSave}
            className={`w-full py-2 px-4 rounded-md text-gray-300 font-semibold transition-colors
              ${isSaving ? 'bg-gray-500 cursor-not-allowed' : 'bg-sky-800 hover:bg-blue-700 shadow-lg'}
            `}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>

          {status && (
            <p className={`mt-4 text-sm font-medium ${status.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
              {status}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default ModelSettings;


const Dropdown = ({ title, modelType, options, value, onChange, isSaving }) => {
    return(
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400">{title}</label>
        <select
        value={value}
        onChange={(e) => onChange(modelType, e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md bg-background text-foreground"
        disabled={isSaving}
        >
        {options.map(option => (
            <option key={option} value={option}>{option}</option>
        ))}
        </select>
    </div>)
};

const NumberInput = ({ title, param, value, step = 0.1, min = 0, max = 10, onChange, isSaving, toolTipText }) => {
    return (
    <div className="mb-4 w-full">
        <div className='flex gap-2'>
            <label className="block text-sm font-medium text-gray-400">{title}</label>
            {toolTipText && <Tooltip className="w-full" text={toolTipText}/> }

        </div>
        <input
        type="number"
        step={step}
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(param, parseFloat(e.target.value))}
        className="mt-1 block w-full px-3 py-2 text-base border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md bg-background text-foreground"
        disabled={isSaving}
        />
    </div>
    )
}
