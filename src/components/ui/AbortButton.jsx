import { useState } from "react";
import { X } from "lucide-react";
const AbortButton = () => {
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);
    
    const handleAbort = async () => {
        setMessage('Attempting to abort all tasks...');
        setIsError(false);
        try {
            const response = await fetch('http://localhost:9090/abort_all', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                setMessage('Successfully aborted all tasks.');
                setIsError(false);
            } else {
                const errorText = await response.text();
                setMessage(`Failed to abort tasks: ${errorText || response.statusText}`);
                setIsError(true);
            }
        } catch (error) {
            setMessage(`Error sending abort request: ${error.message}`);
            setIsError(true);
        } finally {
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleAbort}
                className="px-6 py-2 rounded-full text-white font-semibold bg-red-800 hover:bg-red-700 transition-colors shadow-lg"
            >
                Abort All Tasks
            </button>
            <div className="h-6 mt-2">
                {message && (
                    <span className={`text-sm font-medium ${isError ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </span>
                )}
            </div>
        </div>
    );
};

export default AbortButton