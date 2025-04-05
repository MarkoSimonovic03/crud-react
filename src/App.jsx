import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from "./context/UserContext";
import Navigation from './components/Navigation';
import Home from './components/Home';
import Detail from './components/Detail';
import Create from './components/Create';
import Delete from './components/Delete';
import Edit from './components/Edit';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/create" element={<Create />} />
          <Route path="edit/:id?" element={<Edit />} />
          <Route path="/delete/:id?" element={<Delete />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App;
