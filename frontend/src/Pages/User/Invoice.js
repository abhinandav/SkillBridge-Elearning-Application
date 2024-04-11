import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import logo from '../../Images/default/favicon.png'
import axios  from 'axios';
import html2pdf from 'html2pdf.js';
import { FaDownload } from "react-icons/fa";


const Invoice = () => {
    const baseURL = "http://127.0.0.1:8000";
    const token = localStorage.getItem('access');
    const navigate=useNavigate()
    const [invoice, setInvoice] = useState();

    const { id } = useParams();

    

    useEffect(()=>{
        const checkCoursePurchase = async () => {
            try {
                const response = await axios.get(`${baseURL}/student/purchased/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('sssssssss',response.data);
                setInvoice(response.data);
                
                
            } catch (error) {
                console.error("Error checking course purchase:", error);
            }
        };
        checkCoursePurchase()
    },[])



    const generatePDF = () => {
        const element = document.getElementById('invoiceDiv');
        html2pdf()
          .from(element)
          .save(`invoice${invoice.order.username}.pdf`);
    };

    

console.log('invoice',invoice);

    return (<>
    {invoice && (
        <div id='invoiceDiv' className="flex flex-col w-full items-center justify-center bg-gray-200">
            <div className=" rounded bg-gray-50 mt-5 px-6 pt-8 shadow-lg">
            <span className='text-3xl text-blue-500 font-semibold flex justify-center mb-2 underline'>INVOICE</span>
                <img src={logo} alt="chippz" className="mx-auto w-16 py-4" />
                <div className="flex flex-col justify-center items-center gap-2">
                    <h4 className="font-semibold">SkillBridge</h4>
                    <p className="text-xs">main office noida</p>
                </div>
                <div className="flex flex-col gap-3 border-b py-6 ">
                    <p className="flex justify-between">
                        <span className="text-lg text-gray-400">Receipt No.:</span>
                        <span>#5033</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="text-lg text-gray-400">Order Type:</span>
                        <span>Razorpay</span>
                    </p>
                    <p className="flex justify-between">
                        <span className=" text-lg text-gray-400">Author:</span>
                        <span>{invoice.order.author}</span>
                    </p>
                    <p className="flex justify-between">
                        <span className="text-lg text-gray-400">Customer:</span>
                        <span>{invoice.order.username}</span>
                    </p>
                </div>
                <div className="flex flex-col gap-3 pb-6 pt-2">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="flex">
                                <th className="w-full py-2">Product</th>
                              
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="flex">
                                <td className="flex-1 py-1 ml-5">{invoice.order.course_name}</td> 
                            </tr>
                            
                        </tbody>
                    </table>

                    <table className="w-full text-left">
                        <thead>
                            <tr className="flex">
                                <th className="w-full py-2">Original Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="flex">
                                <td className="flex-1 py-1 ml-5"> ₹{invoice.order.original_price}</td> 
                            </tr>
                            
                        </tbody>
                    </table>

                    <table className="w-full text-left">
                        <thead>
                            <tr className="flex">
                                <th className="w-full py-2">Price</th>
                              
                            </tr>
                        </thead>
               
                        <tbody>
                            <tr className="flex">
                                <td className="flex-1 py-1 ml-5">₹ {invoice.order.price}</td> 
                            </tr>
                            
                        </tbody>
                    </table>

                    <table className="w-full text-left">
                        <thead>
                            <tr className="flex">
                                <th className="w-full py-2">Date Purchased</th>
                              
                            </tr>
                        </thead>
               
                        <tbody>
                            <tr className="flex">
                                <td className="flex-1 py-1 ml-5">{invoice.order.date_purchased}</td> 
                            </tr>
                            
                        </tbody>

                    </table>

                    <table className="w-full text-left flex justify-center">
                        <thead>
                            <tr className="flex">
                                <th className="w-full py-2 text-orange-500 text-lg">Total Amount</th>
                              
                            </tr>
                        </thead>
               
                        <tbody>
                            <tr className="flex">
                                <td className="flex-1 py-1 ml-5 text-lg mt-1 text-blue-500">₹ {invoice.order.price}</td> 
                            </tr>
                            
                        </tbody>
                    </table>


                    <div className=" border-b border border-dashed"></div>
                    <div className="py-4 justify-center items-center flex flex-col gap-2">
                        <p className="flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M11.05 14.95L9.2 16.8c-.39.39-1.01.39-1.41.01-.11-.11-.22-.21-.33-.32a28.414 28.414 0 01-2.79-3.27c-.82-1.14-1.48-2.28-1.96-3.41C2.24 8.67 2 7.58 2 6.54c0-.68.12-1.33.36-1.93.24-.61.62-1.17 1.15-1.67C4.15 2.31 4.85 2 5.59 2c.28 0 .56.06.81.18.26.12.49.3.67.56l2.32 3.27c.18.25.31.48.4.7.09.21.14.42.14.61 0 .24-.07.48-.21.71-.13.23-.32.47-.56.71l-.76.79c-.11.11-.16.24-.16.4 0 .08.01.15.03.23.03.08.06.14.08.2.18.33.49.76.93 1.28.45.52.93 1.05 1.45 1.58.1.1.21.2.31.3.4.39.41 1.03.01 1.43zM21.97 18.33a2.54 2.54 0 01-.25 1.09c-.17.36-.39.7-.68 1.02-.49.54-1.03.93-1.64 1.18-.01 0-.02.01-.03.01-.59.24-1.23.37-1.92.37-1.02 0-2.11-.24-3.26-.73s-2.3-1.15-3.44-1.98c-.39-.29-.78-.58-1.15-.89l3.27-3.27c.28.21.53.37.74.48.05.02.11.05.18.08.08.03.16.04.25.04.17 0 .3-.06.41-.17l.76-.75c.25-.25.49-.44.72-.56.23-.14.46-.21.71-.21.19 0 .39.04.61.13.22.09.45.22.7.39l3.31 2.35c.26.18.44.39.55.64.1.25.16.5.16.78z"></path></svg> skillbridge@gmail.com</p>
                        <p className="flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path fill="#000" d="M12.75 2c0-.41-.34-.75-.75-.75s-.75.34-.75.75v2h1.5V2Z"></path><path fill="#000" d="M22 9.81v1.04a2.06 2.06 0 0 0-.7-.12h-3.48c-1.55 0-2.94.86-3.63 2.24l-.75 1.48h-2.86l-.75-1.47a4.026 4.026 0 0 0-3.63-2.25H2.7c-.24 0-.48.04-.7.12V9.81C2 6.17 4.17 4 7.81 4h3.44v3.19l-.72-.72a.754.754 0 0 0-1.06 0c-.29.29-.29.77 0 1.06l2 2c.01.01.02.01.02.02a.753.753 0 0 0 .51.2c.1 0 .19-.02.28-.06.09-.03.18-.09.25-.16l2-2c.29-.29.29-.77 0-1.06a.754.754 0 0 0-1.06 0l-.72.72V4h3.44C19.83 4 22 6.17 22 9.81Z"></path></svg> +23489725483</p>
                    </div>
                </div>
            </div>
        </div>)}


        <div className='flex pb-10 bg-gray-200 flex justify-center'>
                <button onClick={generatePDF} className='text-ornage-500 mr-10 mt-5 flex border p-3 border-gray-500 rounded-xl text-white bg-orange-500'><span>Download</span> <FaDownload className='ml-3 mt-1' /></button>
                <Link className='mt-5 border p-3 border-gray-500 rounded-xl bg-blue-500  text-white-500' to={`/course_view/${id}`}>
                 <span className='text-white mt-5'>Go back</span>
                 </Link>
            </div>

        </>);
}

export default Invoice;
