import { useContext, useState } from "react"
import { UserContext } from "../usercontext"
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./placespage";
import AccountNav from "../accountNav";

export default function profilePage() {
    const { ready, user, setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile'
    }
    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }
    if (!ready) {
        return 'Loading .....';
    }
    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }
    if (redirect) {
        return <Navigate to={redirect} />
    }
    return (
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})<br />
                    <button className="primary max-w-sm mt-2" onClick={logout}>Logout</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    )
}