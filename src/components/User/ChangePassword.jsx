import Input from '../Account/Input';
import React from 'react'

function ChangePassword() {
    return (
        <>
            <div className='h-screen flex mt-14 justify-center w-screen'>
                <div className='shadow-2xl rounded-2xl w-5/12 h-fit bg-slate-200'>
                    <p className='text-center pt-8 text-orange-600 font-semibold text-lg'>Change Your Password</p>
                    <form action="" className='flex flex-col items-center px-10 py-4 gap-8'>
                        <div className='flex flex-col gap-2 w-full'>
                            <Input
                                label="Current Password"
                                type="password"
                                id="password"
                                placeholder="Enter Your Current Password"
                                name="cpassword"
                                required={true}
                            />
                            <Input
                                label="New Password"
                                type="password"
                                id="password"
                                placeholder="Enter Your New Password"
                                name="cpassword"
                                required={true}
                            />
                            <Input
                                label="Confirm Password"
                                type="password"
                                id="password"
                                placeholder="Re-Enter Your Current Password"
                                name="cpassword"
                                required={true}
                            />
                        </div>
                        <button className="w-32 h-10 bg-orange-600 text-white rounded-md mb-4 hover:bg-blue-700 focus:outline-none">Confirm Change</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ChangePassword