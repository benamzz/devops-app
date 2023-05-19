import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import Article from "../components/Article";
import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";
import User from "../components/User";
import { AuthContext } from '../context/auth.context'

function Search() {
    const [user, setUser] = useState(null);
    const [myArticles, setMyArticles] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const { isLoggedIn } = useContext(AuthContext)

    const HandleSearch = (e) => setSearchTerm(e.target.value)

    // get users
    useEffect(() => {
        api().get(`/users`)
            .then((response) => {
                setUser(response.data);
            })
            .catch(err => console.log("err", err));
    }, []);

    // get articles
    useEffect(() => {
        api().get(`/articles`)
            .then((response) => {
                setMyArticles(response.data);
            })
            .catch((err) => console.log(err));
    }, []);

    if (!isLoggedIn) {
        return (
            <>
                <p>You must login to access this page</p>
                <Link to="/login">Login</Link>
            </>
        );
    }

    if (!myArticles || !user) {
        return "loading";
    }

    return (
        <div className="searchBar">
            <TopNavbar />
            <input
                type="text"
                name="searchBar"
                id="searchBar"
                placeholder="search by user, article, snippet or tag"
                onChange={HandleSearch}
                value={searchTerm}
            />

            {searchTerm.length > 0 && (
                <div className="searchResult">
                    <h4>Articles</h4>
                    {myArticles.filter(e => {
                        const lower = e.content?.toLowerCase();
                        return lower?.includes(searchTerm.trim().toLowerCase());
                    }).map((e) => (
                        <Link key={e._id} to={`/articles/${e._id}`}>
                            <Article value={e} />
                        </Link>
                    ))}
                    <h4>Users</h4>
                    {user.filter(e => {
                        const lower = e.username.toLowerCase();
                        return lower.includes(searchTerm.trim().toLowerCase());
                    }).map((e) => (
                        <Link key={e._id} to={`/users/${e._id}`}>
                            <User value={e} />
                        </Link>
                    ))}
                    <h4>Snippets</h4>
                    {myArticles.filter(e => {
                        const lower = e.snippet?.content?.toLowerCase();
                        return lower?.includes(searchTerm.trim().toLowerCase());
                    }).map(e => (
                        <Link key={e._id} to={`/articles/${e._id}`}>
                            <Article value={e} />
                        </Link>
                    ))}
                    <h4>Tags</h4>
                    {myArticles.filter(e => {
                        const lower = e.snippet?.tag?.toLowerCase();
                        return lower?.includes(searchTerm.trim().toLowerCase());
                    }).map(e => (
                        <Link key={e._id} to={`/articles/${e._id}`}>
                            <Article value={e} />
                        </Link>
                    ))}
                </div>
            )}
            <BottomNavbar />
        </div>
    );
}

export default Search;
