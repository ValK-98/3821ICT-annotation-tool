// src/components/LabelStudio.jsx
import { useState } from 'react';
import LabelStudioSidebar from './LabelStudioSidebar';
import CollapsibleMenuItem from './ui/CollapsableMenuItem';
import AbortButton from './ui/AbortButton';
import ProgressMonitor from './ui/ProgressMonitor';
import LabelStudioRefreshButton from './ui/LabelStudioRefreshButton';

const LabelStudio = () => {
    const [iframeKey, setIframeKey] = useState(0);

    const handleRefreshIframe = () => {
        setIframeKey(prevKey => prevKey + 1);
    };

    return (
        <div className='overflow-hidden flex h-full'>
            <iframe
                key={iframeKey}
                src="http://localhost:8026"
                title="Label Studio"
                style={{
                    width: '100%',
                    height: '100vh',
                    border: 'none',
                    overflow: 'hidden'
                }}
            />
            <LabelStudioSidebar
                bottomChildren={
                    <div className='flex justify-start flex-row w-full gap-2'>
                        <LabelStudioRefreshButton onRefresh={handleRefreshIframe} />
                        <AbortButton/>
                    </div>
                }>
                <CollapsibleMenuItem open={true} title={"Progress Monitor"}>
                    <ProgressMonitor />
                </CollapsibleMenuItem>
            </LabelStudioSidebar>
        </div>
    );
};

export default LabelStudio;