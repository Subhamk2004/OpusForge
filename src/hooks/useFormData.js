import { useState, useEffect } from 'react';

export const useFormData = (template, existingPortfolioData) => {
  const [data, setData] = useState({});
  const [debouncedData, setDebouncedData] = useState({});
  const [formFieldsArray, setFormFieldsArray] = useState([]);

  useEffect(() => {
    let initialFormData = existingPortfolioData ? { ...existingPortfolioData } : {};
    let fieldsArray = [];

    if (Array.isArray(template.formFields)) {
      if (template.formFields.length === 1 && typeof template.formFields[0] === 'string' && template.formFields[0].includes(',')) {
        fieldsArray = template.formFields[0].split(',').map(field => field.trim());
      } else {
        fieldsArray = template.formFields;
      }
    } else if (typeof template.formFields === 'string') {
      fieldsArray = template.formFields.split(',').map(field => field.trim());
    }

    setFormFieldsArray(fieldsArray);

    fieldsArray.forEach(fieldName => {
      console.log(fieldName);
      
      if (!(fieldName in initialFormData)) {
        initialFormData[fieldName] = "";
      }
      // else console.log(`Field ${fieldName} already exists in initialFormData`);
      
    });

    setData(initialFormData);
    setDebouncedData(initialFormData);
  }, [template]);

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedData({ ...data });
    }, 1000);
    return () => clearTimeout(delayInputTimeoutId);
  }, [data]);

  const handleInputChange = (fieldName, value) => {
    setData(prevData => ({
      ...prevData,
      [fieldName]: value
    }));
  };

  const formatFieldName = (fieldName) => {
    return fieldName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  return {
    data,
    debouncedData,
    formFieldsArray,
    handleInputChange,
    formatFieldName
  };
};
