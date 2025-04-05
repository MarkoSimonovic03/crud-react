import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
   <nav className="navbar navbar-expand-lg bg-body-tertiary">
   <div className="container">
     <NavLink to="/" className="navbar-brand">Home</NavLink>
     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
       <span className="navbar-toggler-icon"></span>
     </button>
     <div className="collapse navbar-collapse" id="navbarNav">
       <ul className="navbar-nav">
         <li className="nav-item">
           <NavLink to="/create" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Create</NavLink>
         </li>
         <li className="nav-item">
           <NavLink to="/edit" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Edit</NavLink>
         </li>
         <li className="nav-item">
           <NavLink to="/delete" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Delete</NavLink>
         </li>
       </ul>
     </div>
   </div>
 </nav>
  );
}

export default Navigation;
