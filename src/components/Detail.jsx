import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext';

function Detail() {
    const { id } = useParams();
    const { state } = useUser();
    const navigate = useNavigate();
    const user = state.users.find((user) => user.id === id);

    useEffect(()=>{
        if(!user){
            navigate('/');
        }
    }, [])

    return (
        <section>
            <div className="container p-5">
                <h1 className='mb-4'>Detail</h1>
                {user ? (
                    <div className='border p-2 d-flex justify-content-between'>
                        <div>
                            <p className='fs-3'>ID: <span className='fw-bold'>{user.id}</span></p>
                            <p className='fs-3'>Name: <span className='fw-bold'>{user.name}</span></p>
                            <p className='fs-3'>Sport: <span className='fw-bold'>{user.sport}</span></p>
                            <p className='fs-3'>Nationality: <span className='fw-bold'>{user.nationality}</span></p>
                        </div>
                        <div className='d-flex flex-column gap-2'>
                            <Link to={`/edit/${user.id}`} className="btn btn-success">Edit</Link>
                            <Link to={`/delete/${user.id}`} className="btn btn-danger">Delete</Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="fs-3 text-danger">User not found.</p>
                        <Link to="/" className="btn btn-primary">Back to Home</Link>
                    </>
                )}
            </div>
        </section>
    )
}

export default Detail