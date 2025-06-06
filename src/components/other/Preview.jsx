"use client"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import Portfolio from "@/components/other/Portfolio";
import { toast, ToastContainer } from "react-toastify";

function page({ template }) {
    // console.log('from the view page: ', template);
    const user = useSelector((state) => state.user);
    // console.log(user.user);

    const userData = {};
    let [finalHtml, setFinalHtml] = useState("");
    let [data, setData] = useState({});
    let [debouncedData, setDebouncedData] = useState({});
    let [formFieldsArray, setFormFieldsArray] = useState([]);
    let [repoName, setRepoName] = useState("");
    let [repoCreated, setRepoCreated] = useState(false);

    let startProcess = async () => {
        let res = await createRepo();
        console.log(res);
        if (!res || res.error) {
            toast.error("An error occurred in the process. Please try again.");
            return;
        }
        let commitRes = await commitToRepo(res.repoName);
        if (commitRes.error) {
            toast.error("Error occured while commit process")
            return;
        }
        if (!res.isDeployed) await deployToGithub(commitRes.repoName);
        else toast.success("Process completed successfully, updates will be deployed soon.");
    }

    let createRepo = async () => {
        // console.log("Creating repo with data:", finalHtml);
        if (!repoName) {
            toast.error("Please enter a repository name.");
        } else {
            try {
                let formattedRepoName = repoName.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
                const username = user.user.githubUsername || "Anonymous";
                let response = await fetch('/api/user/createRepo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        credentials: 'include',
                    },
                    body: JSON.stringify({ formattedRepoName, finalHtml, username }),
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    toast.error(`Error: ${errorData.error || 'Failed to create repository.'}`);
                    throw new Error(errorData.error || 'Failed to create repository.');
                }
                else {
                    const data = await response.json();
                    if (data.isAlreadyCreated) {
                        toast.info(`Repository already exists: ${data.repoName}`);
                        return {
                            isAlreadyCreated: true,
                            repoName: data.repoName,
                            error: false,
                            isDeployed: data.isDeployed || false,
                        }
                    }
                    else {
                        toast.success(`Repository created successfully: ${data.repoName}`);
                        setRepoName(data.repoName);
                        setRepoCreated(true);
                        return {
                            isAlreadyCreated: false,
                            repoName: data.repoName,
                            error: false,
                            isDeployed: data.isDeployed || false,
                        }
                    }
                }
            } catch (error) {
                console.error("Error creating repository:", error);
                toast.error(`Error: ${error.message || 'Failed to create repository.'}`);
                return { error: true }
            }
        }
    }

    let commitToRepo = async (formattedRepoName) => {
        try {
            const username = user.user.githubUsername || "Anonymous";
            const res = await fetch('/api/user/commitToRepo', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    credentials: 'include',
                },
                body: JSON.stringify({ finalHtml, username, formattedRepoName }),
            })
            if (!res.ok) {
                const errorData = await res.json();
                toast.error(`Error: ${errorData.error || 'Failed to commit to repository.'}`);
                throw new Error(errorData.error || 'Failed to commit to repository.');
            }
            const data = await res.json();
            console.log(data.data.url);
            toast.success(`Committed to repository successfully: ${data.data.url}`);
            return {
                error: false,
                repoName: formattedRepoName
            }
        } catch (error) {
            console.error("Error committing to repository:", error);
            toast.error(`Error: ${error.message || 'Failed to commit to repository.'}`);
            return {
                error: true
            }
        }
    }

    let deployToGithub = async (formattedRepoName) => {
        const username = user.user.githubUsername || "Anonymous";
        try {
            const res = await fetch('/api/user/deployToGithubPages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    credentials: 'include'
                },
                body: JSON.stringify({
                    formattedRepoName,
                    username
                })
            })
            console.log(res);

            if (!res.ok) {
                const errorData = await res.json();
                toast.error(`Error: ${errorData.error || 'Failed to deploy to GitHub Pages.'}`);
                throw new Error(errorData.error || 'Failed to deploy to GitHub Pages.');
            }
            const data = await res.json();
            console.log(data.data.html_url);
            toast.success(`Deployed to GitHub Pages successfully: ${data.data.html_url}`);
        } catch (error) {
            console.error("Error deploying to GitHub Pages:", error);
            toast.error(`GitHub Pages deployment failed: ${error.message}`);
        }
    }

    useEffect(() => {
        const initialFormData = { ...userData };
        let fieldsArray = [];

        if (Array.isArray(template.formFields)) {
            if (template.formFields.length === 1 && typeof template.formFields[0] === 'string' && template.formFields[0].includes(',')) {
                fieldsArray = template.formFields[0].split(',').map(field => field.trim());
                // in here if our formFields[0] is like ["name, email, phone"], then then .split(,) is breaking the string into an array like ["name", "email", "phone"]

                // "hello?world?skr".split('?');
                // this will return ["hello", "world", "skr"]
            } else {
                fieldsArray = template.formFields;
            }
        } else if (typeof template.formFields === 'string') {
            fieldsArray = template.formFields.split(',').map(field => field.trim());
        }

        // console.log("Parsed fields array:", fieldsArray);
        setFormFieldsArray(fieldsArray);

        fieldsArray.forEach(fieldName => {
            if (!(fieldName in initialFormData)) {
                initialFormData[fieldName] = "";
            }
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


    return (
        <div className='w-screen overflow-hidden h-screen bg-light text-black flex flex-col items-center justify-start'>
            <ToastContainer />
            <div className="w-full flex items-center  p-4 bg-primary text-black">
                <input
                    type="text"
                    name="repoName"
                    placeholder="Enter repo name"
                    value={repoName}
                    onChange={(e) => setRepoName(e.target.value)}
                />
                <button
                    onClick={startProcess}
                >
                    Submit
                </button>
            </div>
            <div className="flex flex-row items-center justify-between p-4 bg-primary text-white seperator w-full h-screen overflow-auto">
                <div className="w-1/2 lg:w-[35%] flex flex-col items-start gap-4 text-black overflow-scroll h-full p-2 ">
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
                    <Portfolio userData={debouncedData} template={template} setHtml={setFinalHtml} />
                </div>
            </div>
        </div>
    );
}

export default page;