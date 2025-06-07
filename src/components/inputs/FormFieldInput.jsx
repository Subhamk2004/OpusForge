import React from 'react';

const FormFieldInput = ({ fieldName, value, onChange, formatFieldName }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {formatFieldName(fieldName)}
      </label>
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(fieldName, e.target.value)}
        className="border p-2 rounded w-full max-w-md"
        placeholder={`Enter ${formatFieldName(fieldName).toLowerCase()}...`}
      />
    </div>
  );
};

export default FormFieldInput;
