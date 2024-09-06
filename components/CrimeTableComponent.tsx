'use client';

import { useEffect, useState } from 'react';
import { fetchCrimeRequest } from '@/app/redux/Slices/CrimeDstaSlice';
import { useAppDispatch, useAppSelector } from '@/app/hook/hook';
import Loading from './Loader/Loading';


interface CrimeItem {
    id: string;
    case_number: string;
    date: string;
    block: string;
    iucr: string;
    primary_type: string;
    description: string;
    location_description: string;
    arrest: boolean;
    domestic: boolean;
    beat: string;
    district: string;
    ward: string;
    community_area: string;
    fbi_code: string;
    x_coordinate: string;
    y_coordinate: string;
    year: string;
    updated_on: string;
    latitude: string;
    longitude: string;
    location: {
      latitude: string;
      longitude: string;
      human_address: string;
    };
}

const availableLabels = [
  { label: 'Case Number', key: 'case_number' },
  { label: 'Date', key: 'date' },
  { label: 'Block', key: 'block' },
  { label: 'Primary Type', key: 'primary_type' },
  { label: 'Description', key: 'description' },
  { label: 'Location Description', key: 'location_description' },
  { label: 'Arrest', key: 'arrest' },
  { label: 'Domestic', key: 'domestic' },
  { label: 'Ward', key: 'ward' },
  { label: 'Year', key: 'year' },
  { label: 'Latitude', key: 'latitude' },
  { label: 'Longitude', key: 'longitude' },
];

const TableComponent = () => {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.data);

  // State for managing selected labels
  const [selectedLabels, setSelectedLabels] = useState<string[]>([
    'case_number',
    'date',
    'block',
    'primary_type',
    'arrest',
    'domestic',
  ]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCrimeRequest());
    }
  }, [dispatch, status]);

  const handleLabelChange = (label: string) => {
    setSelectedLabels((prev) => {
      if (prev.includes(label)) {
        return prev.filter((l) => l !== label);
      } else if (prev.length < 6) {
        return [...prev, label];
      } else {
        return prev;
      }
    });
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-100 border border-red-300 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Crime Report</h1>
      
      <div className="mb-6 bg-white shadow-md rounded-lg p-4 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Select up to 6 labels to display:</h2>
        <div className="flex flex-wrap gap-4">
          {availableLabels.map((label) => (
            <label
              key={label.key}
              className={`flex items-center space-x-3 cursor-pointer ${
                selectedLabels.includes(label.key) ? 'text-blue-600' : 'text-gray-600'
              }`}
              style={{ minWidth: '200px' }}
            >
              <input
                type="checkbox"
                value={label.key}
                checked={selectedLabels.includes(label.key)}
                onChange={() => handleLabelChange(label.key)}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="text-base">{label.label}</span>
            </label>
          ))}
        </div>
        {selectedLabels.length >= 6 && (
          <p className="text-blue-800 mt-2">You can select a maximum of 6 labels.</p>
        )}
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
          <thead className="bg-blue-500 text-white">
            <tr>
              {selectedLabels.map((labelKey) => (
                <th
                  key={labelKey}
                  className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold uppercase tracking-wider"
                >
                  {availableLabels.find((label) => label.key === labelKey)?.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item: CrimeItem) => (
              <tr key={item.id} className="hover:bg-gray-100">
                {selectedLabels.map((labelKey) => (
                  <td
                    key={labelKey}
                    className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
                  >
                    {labelKey === 'date'
                      ? new Date(item[labelKey as keyof CrimeItem] as string).toLocaleString()
                      : item[labelKey as keyof CrimeItem]?.toString() || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
