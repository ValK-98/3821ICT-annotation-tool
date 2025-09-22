import { useState } from "react";
import { Info } from "lucide-react";

const Tooltip = ({ text }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <Info className="w-4 h-4 text-gray-400 cursor-pointer" />

      {visible && (
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-sky-800 text-gray-100 text-sm px-2 py-1 rounded shadow-md break-words max-w-xs w-64">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
