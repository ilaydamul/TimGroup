import axios from "axios";
const api = "https://timgroup.net.tr";

export async function login(email, password, role) {
    var apiDr;

    if (role == "employee") {
        apiDr = "/login-employee";
    }
    else if (role == "audit") {
        apiDr = "/login-audit";
    }

    var formData = new FormData();
    // test 123
    formData.append('username', email);
    formData.append('password', password);

    const response = await axios.post((api + apiDr), formData);
    var result = response;

    return result;
}


function JSONtoFormData(datas) {
    var formData = new FormData();
    for (let i = 0; i < datas.length; i++) {
        formData.append(datas[i])
    }

    return formData;
}


// DENETMEN TALİMATLARINI ÇEKME
export async function getAuditDirective(token) {
    const header = {
        "Cookie": token
    };

    const response = await axios.get(api + "/api/get-audit-directive", {
        headers: header
    });

    return response.data;
}

export async function addAuditWarning(token, datas) {
    // console.log(token, datas);
    const header = {
        "Cookie": token
    };

    const data = JSONtoFormData(datas);

    const response = await axios.post(api + "/api/add-audit-warning", data, {
        headers: header
    });

    return response.data;
}

export async function addAuditDirective(params) {

}


//GET PERSONEL LIST
export async function getPersonelList(token) {
    const header = {
        "Cookie": token
    };

    const response = await axios.get(api + "/api/get-employee", {
        headers: header
    });

    return response.data;
}

//GET PROJECTS
export async function getProjects(token, projectType) {
    const header = {
        "Cookie": token
    };

    const response = await axios.get(api + "/api/get-audit-project?projectType=" + projectType, {
        headers: header
    });


    return response.data;
}