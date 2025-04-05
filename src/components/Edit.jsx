import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../context/UserContext';

function Edit() {
    const { id : paramId } = useParams();

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [sport, setSport] = useState('');
    const [nationality, setNationality] = useState('');
    const { state, dispatch } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (paramId) {
            const user = state.users.find(user => user.id === paramId);

            if(user){
                setId(user.id);
                setName(user.name);
                setSport(user.sport);
                setNationality(user.nationality);
            }else{
                navigate('/');
            }
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, name, sport, nationality })
            })

            if (!response.ok) {
                throw new Error('Error');
            }

            const data = await response.json();
            dispatch({ type: 'UPDATE_USER', payload: data });
            setName('');
            setSport('');
            setNationality('');
            navigate(`/detail/${data.id}`)
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message })
        }
    };

    return (
        <section>
            <div className="container p-5">
                <h1 className='mb-4'>Edit</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="id" className="form-label">ID</label>
                        <input type="text" className="form-control" id="id" value={id} onChange={(e) => setId(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sport" className="form-label">Sport</label>
                        <input type="text" className="form-control" id="sport" value={sport} onChange={(e) => setSport(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nationality" className="form-label">Nationality</label>
                        <input type="text" className="form-control" id="nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-success">Update</button>
                </form>
            </div>
        </section>
    )
}

export default Edit