import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Watch from './pages/Watch';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Account from './pages/Account';

function App() {
    return (
        <AuthContextProvider>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/watch" element={<Watch />} />
                    <Route
                        path="/account"
                        element={
                            <ProtectedRoute>
                                <Account />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </AuthContextProvider>
    );
}

export default App;
