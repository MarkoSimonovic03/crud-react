import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../context/UserContext';

function Delete() {
    const { id : paramId } = useParams();
    const [id, setId] = useState('');
    const { state, dispatch } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (paramId) {
            const user = state.users.find(user => user.id === paramId);
            if(user){
                setId(user.id);
            }
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: 'DELETE'
            })

            if (!response.ok) {
                throw new Error('Error');
            }

            dispatch({ type: 'DELETE_USER', payload: id });
            navigate('/')
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message })
        }
    };

    return (
        <section>
            <div className="container p-5">
                <h1 className='mb-4'>Delete</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="id" className="form-label">ID</label>
                        <input type="text" className="form-control" id="id" value={id} onChange={(e) => setId(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-danger">Delete</button>
                </form>
            </div>
        </section>
    )
}

export default Delete