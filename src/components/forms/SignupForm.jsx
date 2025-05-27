import { Link, Trash } from 'lucide-react'
import React, { useState } from 'react'

function SignupForm({ handleSubmit, data, setData }) {
    let [link, setLink] = useState({
        name: "",
        link: ""
    });
    // console.log(data.links);
    return (
        <div className='w-full max-w-lg p-6 rounded-lg'>
            <form className="w-full max-w-lg flex flex-col items-center justify-center gap-4"
                onSubmit={handleSubmit}
            >
                <fieldset className="w-full border border-gray-200 rounded-xl p-1 hover:border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 bg-gray-50/30 focus-within:bg-white">
                    <legend className="px-2 text-sm font-medium text-gray-600 bg-white">Profession</legend>
                    <select name="" id="" className='bg-light w-full p-3 rounded-lg outline-none border-none text-gray-700'
                        value={data.profession || ""}
                        onChange={(e) => setData({ ...data, profession: e.target.value })}
                    >
                        <option value="" disabled>Select your profession</option>
                        <option value="developer">Developer</option>
                        <option value="designer">Designer</option>
                        <option value="manager">Manager</option>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="entrepreneur">Entrepreneur</option>
                        <option value="freelancer">Freelancer</option>
                        <option value="researcher">Researcher</option>
                        <option value="other">Other</option>
                    </select>
                </fieldset>
                {
                    data.links &&
                    data.links.map((link, index) => {
                        return (
                            <div key={index} className='flex flex-row w-full justify-between items-center bg-s/40 p-2 rounded-lg'>
                                <div className='flex flex-col'>
                                    <span className='text-sm font-semibold text-gray-800'>{link.name}</span>
                                    <a href={link.link} target="_blank" rel="noopener noreferrer" className='text-xs text-hoverbg hover:underline'>{link.link}</a>
                                </div>
                                <button className='text-red-500 hover:text-red-700' onClick={() => {
                                    setData({
                                        ...data,
                                        links: data.links.filter((_, i) => i !== index)
                                    });
                                }}><Trash className='w-5' /></button>
                            </div>
                        )
                    })
                }
                <div className='flex flex-row w-full justify-between'>
                    <fieldset className="w-[49%] border border-gray-200 rounded-xl p-1 hover:border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 bg-gray-50/30 focus-within:bg-white">
                        <legend className="px-2 text-sm font-medium text-gray-600 bg-white">
                            Link name
                        </legend>
                        <input type="text"
                            className='w-full p-1 bg-transparent border-none outline-none placeholder:text-gray-400 text-gray-700'
                            placeholder='Github'
                            value={link.name}
                            onChange={(e) => setLink({ ...link, name: e.target.value })}
                        />
                    </fieldset>
                    <fieldset className="w-[49%] border border-gray-200 rounded-xl p-1 hover:border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 bg-gray-50/30 focus-within:bg-white">
                        <legend className="px-2 text-sm font-medium text-gray-600 bg-white">
                            Link
                        </legend>
                        <input type="text"
                            className='w-full p-1 bg-transparent border-none outline-none placeholder:text-gray-400 text-gray-700'
                            placeholder='https://github.com'
                            value={link.link}
                            onChange={(e) => setLink({ ...link, link: e.target.value })}
                        />
                    </fieldset>

                </div>
                <p className='text-xs text-error flex items-start justify-start w-full'>
                    *Add your link's name and actual link seperating them with a comma
                </p>

                <button className='bg-black font-semibold text-light p-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors duration-200 w-full'
                    onClick={(e) => {
                        e.preventDefault();
                        if (link.name && link.link) {
                            setData({
                                ...data,
                                links: [...(data.links || []), { name: link.name, link: link.link }]
                            });
                            setLink({ name: "", link: "" });
                        }
                    }}
                >
                    <Link className='w-4 h-4 mr-2' />
                    Add Link
                </button>

                <button className="bg-purple font-semibold hover:bg-hoverbg text-black p-2 rounded-lg w-full"
                    onSubmit={handleSubmit}
                >
                    Complete
                </button>
            </form>
        </div>
    )
}

export default SignupForm