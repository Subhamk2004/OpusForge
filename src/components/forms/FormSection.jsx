import React from 'react';
import { ToastContainer } from 'react-toastify';
import FormFieldInput from '@/components/inputs/FormFieldInput';

const FormSection = ({ formFieldsArray, data, onInputChange, formatFieldName }) => {
    return (
        <div className="w-1/2 lg:w-[35%] flex flex-col items-start gap-4 text-black overflow-scroll h-full p-2 mb-24">
            <ToastContainer />
            {formFieldsArray.length > 0 &&
                formFieldsArray.map((fieldName, index) => (
                    <FormFieldInput
                        key={index}
                        fieldName={fieldName}
                        value={data[fieldName]}
                        onChange={onInputChange}
                        formatFieldName={formatFieldName}
                    />
                ))
            }
        </div>
    );
};

export default FormSection;