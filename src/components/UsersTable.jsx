
const UsersTable = (props) => {

    //const [users, setUsers] = useState(null);  

    const handleOnClick = (email) => {
        props.deleteRow(email)
    }

    if (!props.users) return <div>Loading users...</div>

    return (
        <table className="user-table">
            <thead>
                <tr>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Pais</th>
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