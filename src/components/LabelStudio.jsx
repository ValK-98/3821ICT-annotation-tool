import {useState} from 'react';
import LabelStudioSidebar from './LabelStudioSidebar';
import CollapsibleMenuItem from './ui/CollapsableMenuItem';
import AbortButton from './ui/AbortButton';
import ProgressMonitor from './ui/ProgressMonitor';
import { RefreshCcw } from 'lucide-react';

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
      bottomChildren=
      {<div className='flex flex-row p-4 w-fit gap-2'>
        <RefreshButton onRefresh={handleRefreshIframe}/>
        <AbortButton/>
        </div>}>

        <CollapsibleMenuItem open={true} title={"Progress Monitor"}><ProgressMonitor/></CollapsibleMenuItem>
        <CollapsibleMenuItem title={"Model settings"}/>
      </LabelStudioSidebar>
      </div>
  );
};

export default LabelStudio;


const RefreshButton = ({ onRefresh }) => {
  return (
    <button
      onClick={onRefresh}
      className="w-10 h-10 hover:cursor-pointer items-center flex justify-center rounded-full text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg"
    >
      <RefreshCcw></RefreshCcw>
    </button>
  );
};