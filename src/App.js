import './App.css';
import UsersTable from './components/UsersTable';
import { useEffect, useRef, useState } from 'react';
import fetchUsers from "./controllers/fetchUsers";

function App() {


  const [users, setUsers] = useState(null);
  const [colorTable, setColorTable] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);

  const originalUsers = useRef();
  
  const getUsers = async () => {
    const data = await fetchUsers;
    setUsers(data);
    originalUsers.current = data;
  }

useEffect(() => {
    getUsers();
}, [])

  const handleOnClickColor = () => {
    setColorTable(!colorTable);
  }

  const handleOnClickCountry = () => {
    setSortByCountry(prevState => !prevState);
  }

  const deleteRow = (email)=>{
    const deletedUser = users.filter( user=>{
       if(email !== user.email) return user
    })
    setUsers(deletedUser);
  }

  const handleOnClickReset = () => {
    setUsers(originalUsers.current)
  }



  const sortedUsers = sortByCountry
    ? [...users].sort(function (a, b) {
      return (a.location.country.localeCompare(b.location.country));
    })
    : users;


  return (
    <div className="App">
      <header>
        <h1>Prueba Tecnica</h1>
        <button type='button' onClick={handleOnClickColor}>Colorear Filas</button>
        <button type='button' onClick={handleOnClickCountry}>
          {
            !sortByCountry ? 'Ordenar por Pais' : 'No ordenar por Pais'
          }
        </button>
        <button type='button' onClick={handleOnClickReset}>Resetear Estado</button>
        <input placeholder='Fitrar por pais' />
      </header>
      <main>
        <UsersTable
          colorTable={colorTable}
          users={sortedUsers}
          setUsers={setUsers}
          deleteRow={deleteRow}
        />
      </main>


    </div>
  );
}

export default App;
