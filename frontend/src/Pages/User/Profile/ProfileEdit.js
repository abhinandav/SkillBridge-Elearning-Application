import React, { useRef } from 'react';
import ProfileSidebar from './ProfileSidebar';
import userimg from '../../../Images/user.png'



const ProfileEdit = () => {
    const fileInputRef = useRef(null);

  const handleEditProfileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Handle the file upload logic here
    console.log('Selected file:', file);
  };
  return (
<>
    <div className="bg-gray-100">
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
        <ProfileSidebar/>
        <div className="col-span-4 sm:col-span-9">
            <div className="bg-white shadow rounded-lg p-6 flex">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
                        Username
                    </label>
                    <input type="text" placeholder="Username" className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name"  />
                </div>
                <div className="md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Mobile No.
                    </label>
                    <input type="number" placeholder="+91 " className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name"  />
                </div>
            </div>


            <div className="bg-white shadow rounded-lg p-6 flex">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
                        LinkedIn Link
                    </label>
                    <input type="text" name='linkedinurl' placeholder="Paste your Linkedin url here " className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name"  />
                </div>
                <div className="md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-last-name">
                        FaceBook
                    </label>
                    <input type="text" name='fburl' placeholder="Paste your facebook url here " className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name"  />
                </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6 flex">
                <div className="md:w-full px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
                        About You
                    </label>
                    <textarea type="text" name='linkedinurl' placeholder="Add About you" className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name"  />
                </div>
            </div>


            <div className="bg-white shadow rounded-lg p-6 mt-3 mb-4 ">
                <div className=' mx-10'>
                    <img src={userimg} className="rounded-circle img-fluid" style={{width: '200px'}} alt='img'/> 
                </div>
                <div className='flex justify-between'>
                    {/* <div className='mt-5 mx-20 text-indigo-800 text-md font-bold '>
                        Edit Your Profile
                    </div> */}

                        <label htmlFor="fileInput" className="mt-5 mx-20 text-indigo-800 text-md font-bold cursor-pointer">
                            Edit Your Profile
                            <input
                                ref={fileInputRef}
                                name='profile'
                                type="file"
                                id="fileInput"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                    <div>
                        <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'>Save Changes</button>
                    </div>
                </div> 
            </div>


        </div>





    </div>
    </div>
</div>

    </>
  );
};

export default ProfileEdit;
