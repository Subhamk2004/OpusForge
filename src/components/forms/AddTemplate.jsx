import React, { useState } from 'react';
import { Save, FileText, Image as Imges, Tag } from 'lucide-react';
import logo1 from '@/assets/logo1.png';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';

const TemplateForm = ({ showForm }) => {
    const [formData, setFormData] = useState({
        name: '',
        htmlString: '',
        image: '',
        for: '',
        description: '',
        formFields: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Required';
        if (!formData.htmlString.trim()) newErrors.htmlString = 'Required';
        if (!formData.image.trim()) newErrors.image = 'Required';
        if (!formData.for.trim()) newErrors.for = 'Required';
        if (!formData.description.trim()) newErrors.description = 'Required';
        if (!formData.formFields.trim()) newErrors.formFields = 'Required';
        return newErrors;
    };

    const handleSubmit = async () => {
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setIsSubmitting(true);
        try {
            const formFieldsArray = formData.formFields.split(',').map(field => field.trim());
            const formDataToSend = {
                ...formData,
                formFields: formFieldsArray,
            }
            console.log('Submitting form data:', formDataToSend);
            let res = await fetch('/api/user/templates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            let data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || 'Failed to create template');
            }
            toast.success('Template created successfully!');
            setFormData({ name: '', htmlString: '', image: '', for: '', description: '', formFields: [] });

        } catch (error) {
            toast.error('Failed to create template. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`min-h-screen w-full ${showForm}`}>
            <ToastContainer />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-xl mx-auto">
                    <div className="rounded-xl p-6 border" style={{ backgroundColor: '#fefefe' }}>
                        <Image
                            src={logo1}
                            alt="Logo"
                            className="w-16 h-16 mx-auto mb-4"
                            style={{ borderRadius: '50%' }}
                        />

                        <div className="space-y-4">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#2D2D2D' }}>
                                    <FileText size={14} />
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Template name"
                                    className="w-full px-3 py-2 rounded-lg border-2 focus:outline-none focus:border-purple-400"
                                    style={{ backgroundColor: '#F1F1F6', color: '#2D2D2D' }}
                                />
                                {errors.name && <p className="text-xs mt-1" style={{ color: '#710909' }}>{errors.name}</p>}
                            </div>
                            <div className='description'>
                                <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#2D2D2D' }}>
                                    <FileText size={14} />
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Template description"
                                    rows={3}
                                    className="w-full px-3 py-2 rounded-lg border-2 focus:outline-none focus:border-purple-400 resize-none"
                                    style={{ backgroundColor: '#F1F1F6', color: '#2D2D2D' }}
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#2D2D2D' }}>
                                    <FileText size={14} />
                                    HTML Content
                                </label>
                                <textarea
                                    name="htmlString"
                                    value={formData.htmlString}
                                    onChange={handleInputChange}
                                    placeholder="HTML content"
                                    rows={6}
                                    className="w-full px-3 py-2 rounded-lg border-2 focus:outline-none focus:border-purple-400 resize-none"
                                    style={{ backgroundColor: '#F1F1F6', color: '#2D2D2D' }}
                                />
                                {errors.htmlString && <p className="text-xs mt-1" style={{ color: '#710909' }}>{errors.htmlString}</p>}
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#2D2D2D' }}>
                                    <FileText size={14} />
                                    Form Fields
                                </label>
                                <textarea
                                    name="formFields"
                                    value={formData.formFields}
                                    onChange={handleInputChange}
                                    placeholder="Form fields (e.g., name, email)"
                                    rows={3}
                                    className="w-full px-3 py-2 rounded-lg border-2 focus:outline-none focus:border-purple-400 resize-none"
                                    style={{ backgroundColor: '#F1F1F6', color: '#2D2D2D' }}
                                />
                                {errors.formFields && <p className="text-xs mt-1" style={{ color: '#710909' }}>{errors.formFields}</p>}
                                <p className="text-xs mt-1" style={{ color: '#710909' }}>
                                    Note: Enter form fields as comma-separated values (e.g., name, email, message).
                                </p>
                                <p className="text-xs mt-1" style={{ color: '#710909' }}>
                                    Must be same as the variable names used by respective querySelector in html script
                                </p>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#2D2D2D' }}>
                                    <Imges size={14} />
                                    Image URL
                                </label>
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-3 py-2 rounded-lg border-2 focus:outline-none focus:border-purple-400"
                                    style={{ backgroundColor: '#F1F1F6', color: '#2D2D2D' }}
                                />
                                {errors.image && <p className="text-xs mt-1" style={{ color: '#710909' }}>{errors.image}</p>}
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#2D2D2D' }}>
                                    <Tag size={14} />
                                    Category
                                </label>
                                <select
                                    name="for"
                                    value={formData.for}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 rounded-lg border-2 focus:outline-none focus:border-purple-400"
                                    style={{ backgroundColor: '#F1F1F6', color: '#2D2D2D' }}
                                >
                                    <option value="">Select category</option>
                                    <option value="email">Email</option>
                                    <option value="landing-page">Landing Page</option>
                                    <option value="newsletter">Newsletter</option>
                                    <option value="blog">Blog</option>
                                    <option value="portfolio">Portfolio</option>
                                    <option value="business">Business</option>
                                </select>
                                {errors.for && <p className="text-xs mt-1" style={{ color: '#710909' }}>{errors.for}</p>}
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full py-3 px-4 rounded-lg font-medium text-white flex items-center justify-center gap-2 mt-6"
                                style={{ backgroundColor: isSubmitting ? '#B1A2E3' : '#C8BBF0' }}
                                onMouseOver={(e) => !isSubmitting && (e.target.style.backgroundColor = '#B1A2E3')}
                                onMouseOut={(e) => !isSubmitting && (e.target.style.backgroundColor = '#C8BBF0')}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Save size={16} />
                                        Create
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateForm;