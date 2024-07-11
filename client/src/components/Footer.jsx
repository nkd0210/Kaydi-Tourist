import React from 'react'

const Footer = () => {
    return (
        <div className='relative flex w-full justify-between items-center px-[20px] max-md:p-0'>

            <div className='flex flex-col gap-[20px] w-full'>

                <div className='border-gray-400 border-t-[1px] border-b-[1px]'>
                    <div className='flex justify-between p-[20px]'>
                        <h3 className='font-semibold text-[20px]'>Join our newsletter to<br />keep up to date with us!</h3>
                        <div className='flex gap-[10px]'>
                            <input type="email" placeholder='Enter your email' className='border rounded-[20px] px-[10px] w-[200px] h-[50px]' />
                            <button className='border rounded-[20px] px-[20px] h-[50px] bg-[#87db1c]'>Subscribe</button>
                        </div>

                    </div>
                </div>

                <div className='border-gray-400 border-b-[1px]  '>
                    <div className='flex justify-between p-[20px]'>
                        {/* LOGO */}
                        <a href="/" className='w-[200px] h-[150px]'>
                            <img src="/Kaydi.png" alt="logo" className='w-full h-full' />
                        </a>

                        <div className='flex gap-[20px]'>
                            <div className='flex flex-col gap-[10px]'>
                                <h3 className='cursor-pointer font-semibold'>Platform</h3>
                                <h3 className='cursor-pointer font-semibold'>Plans & Pricing</h3>
                                <h3 className='cursor-pointer font-semibold'>Personal AI Manager</h3>
                                <h3 className='cursor-pointer font-semibold'>All Business</h3>

                            </div>
                            <div className='flex flex-col gap-[10px]'>
                                <h3 className='cursor-pointer font-semibold'>Company</h3>
                                <h3 className='cursor-pointer font-semibold'>Blogs</h3>
                                <h3 className='cursor-pointer font-semibold'>Careers</h3>
                                <h3 className='cursor-pointer font-semibold'>News</h3>

                            </div>
                            <div className='flex flex-col gap-[10px]'>
                                <h3 className='cursor-pointer font-semibold'>Resources</h3>
                                <h3 className='cursor-pointer font-semibold'>Documentation</h3>
                                <h3 className='cursor-pointer font-semibold'>Papers</h3>
                                <h3 className='cursor-pointer font-semibold'>Press Conferences</h3>

                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex justify-between p-[20px]'>
                    <p>&copy; {new Date().getFullYear()} Kaydi Tourist</p>
                    <div className='flex gap-[30px]'>
                        <h3 className='cursor-pointer font-semibold'>Terms Of Service</h3>
                        <h3 className='cursor-pointer font-semibold'>Privacy Policy</h3>
                        <h3 className='cursor-pointer font-semibold'> Cookies</h3>
                    </div>
                </div>
            </div>




        </div>
    )
}

export default Footer