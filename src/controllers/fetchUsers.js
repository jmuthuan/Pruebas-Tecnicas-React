
const URL_API = "https://randomuser.me/api/?results=100";

const fetchUsers = 
    fetch(URL_API)
    .then(res => res.json())
    .then(user => {return user.results})
    .catch(error => console.log(error));


export default fetchUsers;