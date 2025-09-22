// src/components/ui/RefreshButton.jsx
import { motion } from 'framer-motion';
import { RefreshCcw } from 'lucide-react';
import React from 'react';

const LabelStudioRefreshButton = ({ onRefresh }) => {
    return (
        <div className="relative inline-block group">
            <motion.button
                onClick={onRefresh}
                className="w-8 h-8 hover:cursor-pointer items-center flex justify-center rounded-full text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95, rotate: 15 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <RefreshCcw size={20} />
            </motion.button>
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Refresh Label Studio
            </div>
        </div>
    );
};

export default LabelStudioRefreshButton;