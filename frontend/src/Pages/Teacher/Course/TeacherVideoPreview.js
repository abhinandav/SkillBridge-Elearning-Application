import React from 'react';

function TeacherVideoPreview() {
  return (

<div>
  <div className=" p-6 bg-gray-100 flex items-center justify-center">
    <div className="container max-w-screen-x mx-auto my-10">
      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">

        <div className="grid gap-5 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">

          <div className="" controls>
            <video className="w-full " controls>
                <source src="/docs/videos/flowbite.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
          </div>
     

          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">

              <div className="md:col-span-6">
                <h1 className='text-indigo-800'
                style={{ width: '100%', display: 'block', fontSize: '2.5rem', lineHeight: 1 }}>Python - Django web Development Course - Beginner Level</h1>
              </div>
              
              <div className="md:col-span-6 mt-5" >
                <p className='mt-3' style={{  fontSize: '1.2rem'}} >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type 
                specimen book. It has survived not only five centuries
                </p>
              </div>

              <div className="md:col-span-6 mt-5" >
                <p className='mt-3' style={{  fontSize: '1.2rem'}} >
                  <span className='text-orange-500' >Course Level </span> :  Beginner</p>
              </div>


              <div className="md:col-span-6 mt-3">
                <p style={{  fontSize: '1.2rem'}}>
                   <span className='text-orange-500' >Category </span>:  FullStack Development</p>
              </div>

            </div>
          </div>


          

        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default TeacherVideoPreview;
