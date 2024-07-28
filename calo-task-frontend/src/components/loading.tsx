import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-10">
      <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-black" />
    </div>
  );
}

export default Loading;
