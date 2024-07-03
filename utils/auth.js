import axios from "axios";

export async function login(email, password) {

    const response = await axios.post("https://dummyjson.com/auth/login", {
        username: 'emilys',
        password: 'emilyspass',
        expiresInMins: 30
    })

    return response.data.token;
}