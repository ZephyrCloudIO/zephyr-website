import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="text-white space-y-6">
      <h1 className="text-6xl font-bold leading-tight">
        <span className="text-white">Speed </span>
        <span className="text-gray-400">without</span>
        <br />
        <span className="text-gray-400">sacrifice!</span>
      </h1>

      <p className="text-gray-400 text-xl max-w-xl">
        As your organization grows and you add more micro-frontends
        Zephyr Cloud provides the observability and orchestration you
        need without sacrificing the performance you expect.
      </p>
    </div>
  );
};
