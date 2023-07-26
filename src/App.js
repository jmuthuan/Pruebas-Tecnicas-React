import './App.css';
import UsersTable from './components/UsersTable';
import { useEffect, useMemo, useRef, useState } from 'react';
import fetchUsers from "./controllers/fetchUsers";


function App() {
  const sortingBy = {
    NONE: 'none',
    NAME: 'name',
    LAST: 'last',
    COUNTRY: 'country'
  }

  const [users, setUsers] = useState(null);
  const [colorTable, setColorTable] = useState(false);
  const [sortBy, setSortBy] = useState(sortingBy.NONE);
  const [inputCountry, setInputCountry] = useState('');

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
    const sortingValue = sortBy === sortingBy.COUNTRY ? sortingBy.NONE : sortingBy.COUNTRY;
    setSortBy(sortingValue);
  }

  const deleteRow = (email) => {
    const deletedUser = users.filter(user => {
      if (email !== user.email) return user
    })
    setUsers(deletedUser);
  }

  const handleOnClickReset = () => {
    setUsers(originalUsers.current);
    setInputCountry('');
  }

  const onChangeHandle = (e) => {
    setInputCountry(e.target.value);
  }


  const handleChangeSort = (sortInput)=>{
    setSortBy(sortInput);
  }


  const sortedUsers = useMemo(() => {
    console.log('sort')
    return sortBy === sortingBy.COUNTRY
      ? [...users].sort(function (a, b) {
        return (a.location.country.localeCompare(b.location.country));
      })
      : users
  }, [users, sortBy])

  const filterUsers = useMemo(() => {
    console.log('filter')
    return inputCountry.length > 0
      ? sortedUsers.filter(user =>
        user.location.country.toLocaleLowerCase().includes(inputCountry.toLocaleLowerCase()))
      : sortedUsers;
  }, [sortedUsers, inputCountry])



  return (
    <div className="App">
      <header>
        <h1>Prueba Tecnica</h1>
        <button className='button-header' type='button' onClick={handleOnClickColor}>Colorear Filas</button>
        <button className='button-header' type='button' onClick={handleOnClickCountry}>
          {
            !sortBy === sortingBy.COUNTRY ? 'Ordenar por Pais' : 'No ordenar por Pais'
          }
        </button>
        <button className='button-header' type='button' onClick={handleOnClickReset}>Resetear Estado</button>
        <input
          className='input-header'
          placeholder='Fitrar por pais'
          onChange={onChangeHandle}
          value={inputCountry} />
      </header>
      <main>
        <UsersTable
          colorTable={colorTable}
          users={filterUsers}
          setUsers={setUsers}
          deleteRow={deleteRow}
          changeSortBy = {handleChangeSort}
        />
      </main>


    </div>
  );
}

export default App;
