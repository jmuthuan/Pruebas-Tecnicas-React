
const UsersTable = (props) => {

    const sortingBy = {
        NONE: 'none',
        NAME: 'name',
        LAST: 'last',
        COUNTRY: 'country'
      }
    
    const handleOnClick = (email) => {
        props.deleteRow(email)
    }

    const sortByNamne = ()=>{
        console.log('name');
    }
    if (!props.users) return <div>Loading users...</div>

    return (
        <table className="user-table">
            <thead>
                <tr>
                    <th>Foto</th>
                    <th onClick={()=>{props.changeSortBy(sortingBy.NAME)}}>Nombre</th>
                    <th onClick={()=>{props.changeSortBy(sortingBy.LAST)}}>Apellido</th>
                    <th onClick={()=>{props.changeSortBy(sortingBy.COUNTRY)}}>Pais</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody className={props.colorTable ? 'show-color-table' : ''}>
                {
                    props.users && props.users.map((user, index) => {
                        return (
                            <tr key={user.email}>
                                <td><img src={user.picture.thumbnail} alt={`of user ${user.name.last}`} /></td>
                                <td>{user.name.first}</td>
                                <td>{user.name.last}</td>
                                <td>{user.location.country}</td>
                                <td><button type="button" onClick={() => handleOnClick(user.email)}>Borrar</button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )

}

export default UsersTable;