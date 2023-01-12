import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
    const navigate = useNavigate();

    const { user } = UserAuth();

    if (!user) {
        navigate('/signin');
        return;
    } else {
        return children;
    }
}

export default ProtectedRoute;
