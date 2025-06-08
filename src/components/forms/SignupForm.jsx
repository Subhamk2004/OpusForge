import { Link, Trash } from 'lucide-react'
import Image from 'next/image';
import React, { useState } from 'react'

function SignupForm({ handleSubmit, data = {}, setData, loading }) {
    let [link, setLink] = useState({
        name: "",
        link: "",
        image: ""
    });

    const profession = data.profession || "";
    const links = data.links || [];
    console.log(loading);

    return (
        <div className='w-full max-w-lg p-6 rounded-lg'>
            <form className="w-full max-w-lg flex flex-col items-center justify-center gap-4"
                onSubmit={handleSubmit}
            >
                <fieldset className="w-full border border-gray-200 rounded-xl p-1 hover:border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 bg-gray-50/30 focus-within:bg-white">
                    <legend className="px-2 text-sm font-medium text-gray-600 bg-white">Profession</legend>
                    <select
                        name=""
                        id=""
                        required
                        className='bg-light w-full p-3 rounded-lg outline-none border-none text-gray-700'
                        value={profession}
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

                {links.map((linkItem, index) => {
                    return (
                        <div key={index} className='flex flex-row w-full justify-between items-center bg-s/40 p-2 rounded-lg'>
                            <div className='flex flex-row w-[90%]'>
                                {linkItem.image && (
                                    <Image
                                        src={linkItem.image}
                                        alt={linkItem.name}
                                        width={50}
                                        height={50}
                                        className='mt-1 rounded-lg object-cover mr-2'
                                    />
                                )}
                                <div>
                                    <p className='text-sm font-semibold text-gray-800'>{linkItem.name}</p>
                                    <a
                                        href={linkItem.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='text-xs text-blue-600 hover:underline'
                                    >
                                        {linkItem.link}
                                    </a>
                                </div>
                            </div>
                            <button
                                type="button"
                                className='text-red-500 hover:text-red-700'
                                onClick={() => {
                                    setData({
                                        ...data,
                                        links: links.filter((_, i) => i !== index)
                                    });
                                }}
                            >
                                <Trash className='w-5' />
                            </button>
                        </div>
                    )
                })}

                <div className='flex flex-row w-full justify-between'>
                    <fieldset className="w-[49%] border border-gray-200 rounded-xl p-1 hover:border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 bg-gray-50/30 focus-within:bg-white">
                        <legend className="px-2 text-sm font-medium text-gray-600 bg-white">
                            Link name
                        </legend>
                        <input
                            type="text"
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
                        <input
                            type="text"
                            className='w-full p-1 bg-transparent border-none outline-none placeholder:text-gray-400 text-gray-700'
                            placeholder='https://github.com'
                            value={link.link}
                            onChange={(e) => setLink({ ...link, link: e.target.value })}
                        />
                    </fieldset>
                </div>
                <fieldset className='w-full border border-gray-200 rounded-xl p-1 hover:border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 bg-gray-50/30 focus-within:bg-white'>
                    <legend className="px-2 text-sm font-medium text-gray-600 bg-white">
                        Link's Image
                    </legend>
                    <input
                        type="text"
                        className='w-full p-1 bg-transparent border-none outline-none placeholder:text-gray-400 text-gray-700'
                        placeholder='https://res.cloudinary.com/image.png'
                        value={link.image || ""}
                        onChange={(e) => setLink({ ...link, image: e.target.value })}
                    />
                </fieldset>

                <p className='text-xs text-error flex items-start justify-start w-full'>
                    *Use your assets tabb to get a link for your image.
                </p>

                <button
                    type="button"
                    className='bg-black font-semibold text-light p-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors duration-200 w-full'
                    onClick={(e) => {
                        e.preventDefault();
                        if (link.name && link.link && link.image) {
                            setData({
                                ...data,
                                links: [...links, { name: link.name, link: link.link, image: link.image }]
                            });
                            setLink({ name: "", link: "", image: "" });
                        }
                    }}
                >
                    <Link className='w-4 h-4 mr-2' />
                    Add Link
                </button>

                <button
                    type="submit"
                    className="bg-purple font-semibold hover:bg-hoverbg text-black p-2 rounded-lg w-full"
                    disabled={loading}
                >
                    Complete
                    {
                        loading ? (
                            <span className="animate-spin inline-block w-4 h-4 border-2 border-current ml-2 border-t-transparent rounded-full"></span>
                        ) : null
                    }
                </button>
            </form>
        </div>
    )
}

export default SignupForm