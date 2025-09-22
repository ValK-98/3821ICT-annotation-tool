import React, { useState, useEffect } from 'react';


const ProgressMonitor = () => {
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const response = await fetch('http://localhost:9090/get_progress');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProgress(data);
                setError(null); // Clear any previous errors
            } catch (err) {
                setError('Failed to fetch progress. Is the backend running?');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        // Fetch immediately and then every 3 seconds
        fetchProgress();
        const intervalId = setInterval(fetchProgress, 3000);

        // Cleanup function to clear the interval
        return () => clearInterval(intervalId);
    }, []);

    if (loading) {
        return <div className="p-2 bg-gray-200 rounded-xl shadow-md text-center">Loading progress...</div>;
    }

    if (error) {
        return <div className="p-2 bg-red-200 text-red-800 rounded-xl shadow-md text-center">{error}</div>;
    }

    return (
        <div className="p-3 bg-muted rounded-xl text-foreground">
            <h3 className="text-md text-center font-bold text-foreground mb-2">Task Progress</h3>
            {progress && (
                <div className="grid grid-cols-2">
                    <span className="font-semibold">Submitted</span>
                    <span className="text-center">{progress.submitted}</span>
                    <span className="font-semibold">Completed</span>
                    <span className="text-center">{progress.completed}</span>
                    <span className="font-semibold col-span-2">Status</span>
                    <span className="text-sm col-span-2">{progress.message}</span>
                </div>
            )}
        </div>
    );
};


export default ProgressMonitor