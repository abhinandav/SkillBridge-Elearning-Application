import React from 'react'
import teacherhome from '../../Images/teacher-home2.jpg'
import {useSelector } from 'react-redux'


function TeacherHome() {
  const authentication_user=useSelector(state=>state.authentication_user)
  return (
    <>
    <div class="container mx-auto px-8 py-8 lg:py-40 relative flex flex-col lg:flex-row items-center">
      <div className="lg:w-1/2 flex flex-col items-center lg:items-start">
        <h1 className="text-center lg:text-left text-3xl sm:text-5xl font-light text-blue-700 leading-tight mb-4">Our recruiting strategy <strong className="font-black text-orange-500 text-3xl sm:text-4xl block">hit your hiring plan</strong></h1>
        <p className="text-center lg:text-left sm:text-lg text-gray-500 lg:pr-40 leading-relaxed">You must be able to convey information via phone, email, and in person. You want to make sure your tone is always professional but friendly.</p>
        {! authentication_user.userid &&
        <span to="#" className="bg-orange-400 hover:bg-orange-500 mt-8 py-1 px-5 text-lg rounded-full font-bold uppercase text-white tracking-widest">SignUp Now</span>
        }
        <div className="mt-16 lg:mt-24 flex">
          <span className="w-12 h-1 mx-1 bg-blue-400"></span>
          <span className="w-12 h-1 mx-1 bg-blue-200"></span>
          <span className="w-12 h-1 mx-1 bg-blue-200"></span>
        </div>
      </div>

      <div class="w-full sm:w-2/3 lg:absolute top-0 right-0 bottom-0  lg:mr-8">
      <img className='ml-60 mt-10'  style={{height:600}} src={teacherhome} alt=''/>
        </div>
    </div>

      {/* testimonials */}
      <section className="bg-white -mt-20 mb-10">
        <div className="container mx-auto px-6 pt-28">
          <div className="mt-6 md:flex md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold capitalize text-orange-500  lg:text-4xl">
                What our clients are saying
              </h1>

              <div className="mx-auto mt-6 flex">
                <span className="inline-block h-1 w-40 rounded-full bg-orange-500"></span>
                <span className="mx-1 inline-block h-1 w-3 rounded-full bg-orange-500"></span>
                <span className="inline-block h-1 w-1 rounded-full bg-orange-500"></span>
              </div>
            </div>

            <div className="mt-8 flex justify-between md:mt-0">
              <button
                title="left arrow"
                className="mx-3 rounded-full border p-2 text-gray-800 transition-colors duration-300 hover:bg-gray-100 rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                title="right arrow"
                className="rounded-full border p-2 text-gray-800 transition-colors duration-300 hover:bg-gray-100 rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <section className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 xl:mt-12 xl:grid-cols-3">
            <div className="rounded-lg border p-8 dark:border-gray-700">
              <p className="leading-loose text-gray-500 dark:text-gray-400">
                “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda rerum, culpa aperiam dolorum, obcaecati corrupti aspernatur a.”.
              </p>

              <div className="-mx-2 mt-8 flex items-center">
                <img className="mx-2 h-14 w-14 shrink-0 rounded-full object-cover ring-4 ring-gray-300 dark:ring-gray-700" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />

                <div className="mx-2">
                  <h1 className="font-semibold text-gray-800 dark:text-white">Robert</h1>
                  <span className="text-sm text-gray-500 dark:text-gray-400">CTO, Robert Consultancy</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-transparent bg-orange-500 p-8 dark:bg-orange-600">
              <p className="leading-loose text-white">
                “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda rerum, culpa aperiam dolorum, obcaecati corrupti aspernatur a.”.
              </p>

              <div className="-mx-2 mt-8 flex items-center">
                <img className="mx-2 h-14 w-14 shrink-0 rounded-full object-cover ring-4 ring-blue-200" src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" alt="" />

                <div className="mx-2">
                  <h1 className="font-semibold text-white">Jeny Doe</h1>
                  <span className="text-sm text-blue-200">CEO, Jeny Consultancy</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-8 dark:border-gray-700">
              <p className="leading-loose text-gray-500 dark:text-gray-400">
                “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda rerum, culpa aperiam dolorum, obcaecati corrupti aspernatur a.”.
              </p>

              <div className="-mx-2 mt-8 flex items-center">
                <img className="mx-2 h-14 w-14 shrink-0 rounded-full object-cover ring-4 ring-gray-300 dark:ring-gray-700" src="https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />

                <div className="mx-2">
                  <h1 className="font-semibold text-gray-800 dark:text-white">Ema Watson</h1>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Marketing Manager at Stech</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>





  
    </>
  )
}

export default TeacherHome











