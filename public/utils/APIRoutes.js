const host = "http://localhost:5000";

const registerRoute = `${host}/api/auth/register`;
const accountCheck = `${host}/api/auth/checkaccount`;
const check = `${host}/api/auth/check`;
const login = `${host}/api/auth/login`;
const getUserByEmail = `${host}/api/auth/getUserByEmail`;
const setAvatar = `${host}/api/auth/setAvatar`;
const getUsers = `${host}/api/auth/getUsers`;

export { registerRoute, accountCheck, login, check, getUserByEmail, setAvatar,getUsers };
