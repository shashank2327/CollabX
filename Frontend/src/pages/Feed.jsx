import React from 'react';
import Sidebar from '../components/Sidebar';

const Feed = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* 1. Add the Sidebar */}
      <Sidebar />

      {/* 2. Main Content Area */}
      {/* ml-64 pushes the content to the right of the sidebar */}
      <main className="ml-64 flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800">Your Feed</h1>
        <p className="mt-4 text-gray-600">Content goes here...</p>
      </main>
    </div>
  );
};

export default Feed;