import React from 'react';

export default function Sessions() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Conference Sessions</h1>
      <div className="mt-6">
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            <li className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-primary-600">Coming Soon</p>
                  <p className="mt-1 text-sm text-gray-500">Session details will be available closer to the conference date.</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 