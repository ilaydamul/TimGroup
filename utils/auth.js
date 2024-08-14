import axios from "axios";

export async function login(email, password, role) {
    var api;

    if (role == "employee") {
        api = "https://timgroup.net.tr/login-employee";
    }
    else if (role == "audit") {
        api = "https://timgroup.net.tr/login-audit";
    }
    
    
    var formData = new FormData();
    formData.append('username', 'test');
    formData.append('password', '123');

    const response = await axios.post(api, formData);
    var result = response;

    return result;
}