"use client"
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import processTemplateString from "@/helper/normalToBackticks";
import Portfolio from "@/components/other/Portfolio";

function page() {
    const templates = useSelector((state) => state.templates.templates);
    const userData = {};

    let [show, setShow] = useState("flex");
    let [isLoaded, setIsLoaded] = useState(false);
    let [data, setData] = useState(userData);
    let [debouncedData, setDebouncedData] = useState(userData);
    let [formFieldsArray, setFormFieldsArray] = useState([]);

    useEffect(() => {
        if (templates && templates[0] && templates[0][0] && templates[0][0].formFields) {
            const initialFormData = { ...userData };
            console.log("Original formFields:", templates[0][0].formFields);

            let fieldsArray = [];

            if (Array.isArray(templates[0][0].formFields)) {
                if (templates[0][0].formFields.length === 1 && typeof templates[0][0].formFields[0] === 'string' && templates[0][0].formFields[0].includes(',')) {
                    fieldsArray = templates[0][0].formFields[0].split(',').map(field => field.trim());
                    // in here if our formFields[0] is like ["name, email, phone"], then then .split(,) is breaking the string into an array like ["name", "email", "phone"]

                    // "hello?world?skr".split('?');
                    // this will return ["hello", "world", "skr"]
                } else {
                    fieldsArray = templates[0][0].formFields;
                }
            } else if (typeof templates[0][0].formFields === 'string') {
                fieldsArray = templates[0][0].formFields.split(',').map(field => field.trim());
            }

            console.log("Parsed fields array:", fieldsArray);
            setFormFieldsArray(fieldsArray);

            fieldsArray.forEach(fieldName => {
                if (!(fieldName in initialFormData)) {
                    initialFormData[fieldName] = "";
                }
            });

            setData(initialFormData);
            setDebouncedData(initialFormData);
        }
    }, [templates]);

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            setDebouncedData({ ...data });
        }, 1000);
        return () => clearTimeout(delayInputTimeoutId);
    }, [data]);

    useEffect(() => {
        if (templates !== undefined) {
            setIsLoaded(true);
        } else {
            setIsLoaded(false);
        }
    }, [templates]);

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

    if (!isLoaded) {
        return (
            <div className='w-screen h-screen bg-light text-black flex items-center justify-center'>
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='w-screen overflow-hidden h-screen bg-light text-black'>
            <div className="flex flex-row items-center justify-between p-4 bg-primary text-white seperator w-full h-screen overflow-auto">
                <div className="w-1/2 lg:w-[35%] flex flex-col items-start gap-4 text-black overflow-hidden h-full p-2">
                    {formFieldsArray.length > 0 &&
                        formFieldsArray.map((fieldName, index) => (
                            <div key={index} className="w-full">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {formatFieldName(fieldName)}
                                </label>
                                <input
                                    type="text"
                                    value={data[fieldName] || ""}
                                    onChange={(e) => handleInputChange(fieldName, e.target.value)}
                                    className="border p-2 rounded w-full max-w-md"
                                    placeholder={`Enter ${formatFieldName(fieldName).toLowerCase()}...`}
                                />
                            </div>
                        ))
                    }
                </div>

                <hr className="h-screen w-[1px] bg-error" />

                <div className="w-1/2 lg:w-[65%] flex h-screen gap-4 text-black overflow-scroll">
                    <Portfolio userData={debouncedData} templates={templates[0]} />
                </div>
            </div>
        </div>
    );
}

export default page;