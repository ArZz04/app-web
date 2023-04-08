import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${auth.accessToken}`
            }
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.access_token);
            return { ...prev, accessToken: response.data.access_token }
        });
        return response.data.accessToken;
    }

    return refresh
};

export default useRefreshToken;


