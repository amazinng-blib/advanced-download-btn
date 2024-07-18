import React, { useEffect, useState } from 'react';
import './DownloadButton.css';
import { FaCheck, FaDownload } from 'react-icons/fa';

const DownloadButton: React.FC = () => {
  const [active, setActive] = useState(false);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | number | undefined;
    if (active) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setActive(false);
            setDone(true);
            return 100;
          }
          return prev + 1;
        });
      }, 40);
    }

    return () => clearInterval(interval);
  }, [active]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setActive(true);
    setDone(false);
    setProgress(0);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      <a
        className={`relative block text-center no-underline perspective ${
          active ? 'active' : ''
        } ${done ? 'done' : ''}`}
        href="#"
        onClick={handleClick}
      >
        <div className="relative bg-white rounded-lg overflow-hidden flex p-4 shadow-md">
          <div className="icon mr-3 relative">
            <div
              className={`relative w-5 h-5 rounded-full ${
                done ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              {done ? (
                <FaCheck className="w-full h-full text-white" />
              ) : (
                <FaDownload className="w-full h-full text-gray-600" />
              )}
            </div>
          </div>
          <div className="label relative text-lg font-medium text-gray-700 flex items-center">
            <div className="show">{done ? 'Done' : 'Download'}</div>
            {!done && active && <div className="ml-2">{progress}%</div>}
          </div>
          <div className="progress-container absolute left-0 right-0 bottom-0 h-1 bg-gray-200">
            <div
              className={`progress h-full ${
                done ? 'bg-green-500' : 'bg-green-500'
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </a>
      {done && (
        <a
          href="#"
          className="text-blue-500 underline"
          onClick={() => setDone(false)}
        >
          Restart
        </a>
      )}
    </div>
  );
};

export default DownloadButton;
