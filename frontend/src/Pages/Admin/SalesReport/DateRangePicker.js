import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateRangePicker({ onGenerateReport }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const today = new Date();

  const handleGenerateReport = () => {
    if (startDate && endDate) {
      const startDateStr = startDate.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];
      // Call the parent component's onGenerateReport callback function
      onGenerateReport(startDateStr, endDateStr);
    } else {
      console.log('Please select both start and end dates.');
    }
  };

  return (
    <div className="flex items-center">
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        maxDate={endDate ? endDate : today}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
        placeholderText="Select start date"
      />
      <span className="mx-4 text-gray-500">to</span>
      <DatePicker
        selected={endDate}
        onChange={date => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        maxDate={today}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  "
        placeholderText="Select end date"
      />
      <button onClick={handleGenerateReport} className='ml-5 border border-gray-200 p-2 rounded-xl bg-indigo-700 text-white'>Generate</button>
    </div>
  );
}

export default DateRangePicker;











// import React, { useState } from 'react';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// function DateRangePicker({ handleReportData }) {
//   const baseURL = "http://127.0.0.1:8000";
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   const today = new Date();




//   const handleGenerateReport = () => {
//     if (startDate && endDate) {
//         const startDateStr = startDate.toISOString().split('T')[0];
//         const endDateStr = endDate.toISOString().split('T')[0];
//         axios.post(`${baseURL}/adminapp/custom_report/`, {
//             start_date: startDateStr,
//             end_date: endDateStr
//         })
//         .then(response => {
//             console.log('Report generated:', response.data);
//             handleReportData(response.data);
//         })
//         .catch(error => {
//             console.error('Error generating report:', error);
//         });
//     } else {
//         console.log('Please select both start and end dates.');
//     }
// };


//   return (
//     <div className="flex items-center">
//       <DatePicker
//         selected={startDate}
//         onChange={date => setStartDate(date)}
//         selectsStart
//         startDate={startDate}
//         endDate={endDate}
//         maxDate={endDate ? endDate : today} 
//         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
//         //  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
//         placeholderText="Select start date"
//       />
//       <span className="mx-4 text-gray-500">to</span>
//       <DatePicker
//         selected={endDate}
//         onChange={date => setEndDate(date)}
//         selectsEnd
//         startDate={startDate}
//         endDate={endDate}
//         minDate={startDate}
//         maxDate={today} 
//         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  "
//         placeholderText="Select end date"
//       />
//       <button onClick={handleGenerateReport} className='ml-5 border border-gray-200 p-2 rounded-xl bg-indigo-700 text-white'>Generate</button>
//     </div>
//   );
// }

// export default DateRangePicker;

