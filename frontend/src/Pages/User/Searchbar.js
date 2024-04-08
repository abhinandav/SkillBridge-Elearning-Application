import React, { useState } from 'react';

function CourseSearch({ setSearchQuery }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    const inputQuery = event.target.value;
    setQuery(inputQuery);
    setSearchQuery(inputQuery); 
  };

  return (
    <div className=" bg-gray-100 flex justify-center items-center px-40 py-10">
      <div className="container mx-auto  rounded-xl ">
        <form>
          <h1 className="text-center font-bold text-red-800 text-2xl mb-5">Find the perfect Course for you</h1>
          <div className="sm:flex  border border-red-700  items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
            <input
              className="text-base text-gray-400 flex-grow outline-none px-2"
              type="text"
              placeholder="Search your course name"
              value={query}
              onChange={handleInputChange} 
            />
            <button className="bg-red-800 text-white text-base rounded-lg px-4 py-2 font-thin">Search</button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default CourseSearch;

















// import React, { useState } from 'react';

// function CourseSearch({ setSearchQuery }) {
//   const [query, setQuery] = useState('');

//   const handleInputChange = (event) => {
//     setQuery(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setSearchQuery(query);
//   };

//   return (
//     <div className=" bg-gray-100 flex justify-center items-center px-40 py-10">
//       <div className="container mx-auto  rounded-xl ">
//         <form onSubmit={handleSubmit}>
//           <h1 className="text-center font-bold text-orange-600 text-2xl mb-5">Find the perfect Course for you</h1>
//           <div className="sm:flex  border border-orange-300  items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
//             <input
//               className="text-base text-gray-400 flex-grow outline-none px-2"
//               type="text"
//               placeholder="Search your course name"
//               value={query}
//               onChange={handleInputChange}
//             />
            // <button className="bg-orange-500 text-white text-base rounded-lg px-4 py-2 font-thin">Search</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CourseSearch;