import React, { useEffect } from 'react'
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

function Home() {
    const { state, dispatch } = useUser();

    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:3000/users");
            if (!response.ok) {
                throw new Error("Failed to fetch data.");
            }
            const data = await response.json();
            dispatch({ type: "SET_USERS", payload: data });
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: `Error: ${error.message}` });
        }
    };

    return (
        <section>
            <div className='container p-5'>
                <h1 className='mb-4'>Home</h1>
                {state.users.length > 0 ? (
                    <div className='d-flex flex-column gap-3'>
                        {state.users.map((user) => (
                            <div key={user.id} className='border p-2 d-flex justify-content-between'>
                                <div>
                                    <p>ID: <span className='fw-bold'>{user.id}</span></p>
                                    <p>Name: <span className='fw-bold'>{user.name}</span></p>
                                    <p>Sport: <span className='fw-bold'>{user.sport}</span></p>
                                    <p>Nationality: <span className='fw-bold'>{user.nationality}</span></p>
                                </div>
                                <div className='d-flex flex-column gap-2'>
                                    <Link to={`/detail/${user.id}`} className="btn btn-primary">View</Link>
                                    <Link to={`/edit/${user.id}`} className="btn btn-success">Edit</Link>
                                    <Link to={`/delete/${user.id}`} className="btn btn-danger">Delete</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="fs-3">Users not found.</p>
                )}
            </div>
        </section>
    )
}

export default Home