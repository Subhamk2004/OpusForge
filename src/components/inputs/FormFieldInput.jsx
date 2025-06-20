import React from 'react';

const FormFieldInput = ({ fieldName, value, onChange, formatFieldName }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-800 mb-2 tracking-wide">
        {formatFieldName(fieldName)}
      </label>
      <textarea
        type="text"
        value={value || ""}
        onChange={(e) => onChange(fieldName, e.target.value)}
        className="w-full max-w-md px-4 py-3 text-gray-800 bg-white border-2 border-gray-200 rounded-lg shadow-sm transition-all duration-300 ease-out focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-gray-300 hover:shadow-md placeholder-gray-400"
        placeholder={`Enter ${formatFieldName(fieldName).toLowerCase()}...`}
      />
    </div>
  );
};

export default FormFieldInput;