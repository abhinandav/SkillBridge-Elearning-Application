import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


function ChangePasswordPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const hashValue = searchParams.get('hash');

        // Send a request to your backend to decode the hash
        // and retrieve the user ID
        decodeHash(hashValue);
    }, [location]);

    const decodeHash = (hashValue) => {
        axios.get(`http://127.0.0.1:8000/api/accounts/decode_hash?hash=${hashValue}/`)
            .then(response => {
                const userId = response.data.userId;
                setUserId(userId);
            })
            .catch(error => {
                console.error('Error decoding hash:', error);
            });
    };

    useEffect(() => {
        if (userId) {
            navigate(`/reset_password/${userId}`);
        }
    }, [userId, navigate]);

    return null; 
}

export default ChangePasswordPage;
