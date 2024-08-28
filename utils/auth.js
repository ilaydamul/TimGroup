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


// function JSONtoFormData(datas) {
//     var formData = new FormData();
//     for (let i = 0; i < datas.length; i++) {
//         formData.append(datas[i])
//     }

//     return formData;
// }

function JSONtoFormData(json) {
    const formData = new FormData();
    for (const key in json) {
        if (json[key] instanceof Array || json[key] instanceof Object) {
            formData.append(key, JSON.stringify(json[key]));
        } else {
            formData.append(key, json[key]);
        }
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

export async function addAuditWarningOrDirective(token, datas, type) {
    const header = {
        "Cookie": token
    };

    // const data = JSONtoFormData(datas);
    // var apiType;

    if (type == "Warn") {
        apiType = "/api/add-audit-warning";
    }
    else {
        apiType = "/api/add-audit-directive";
    }

    const response = await axios.post(api + apiType, datas, {
        headers: header
    });

    return response.data;
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

//GET PROJECT DETAILS
export async function getProjectDetails(token, projectId) {
    const header = {
        "Cookie": token
    };

    const response = await axios.get(api + "/api/get-audit-project/" + projectId, {
        headers: header
    });


    return response.data;
}


//POST PROJECT AUDIT
export async function addAudit(token, datas) {
    const formData2 = new FormData();
    formData2.append("projectId", datas.projectId);
    formData2.append("customerComment", datas.customerComment);
    formData2.append("picture", datas.picture);
    formData2.append("pictureComment", datas.pictureComment);
    formData2.append("lng", datas.lng);
    formData2.append("lat", datas.lat);
    formData2.append("note", datas.note);

    const header = {
        'Cookie': token,
        'Content-Type': 'multipart/form-data',
    };

    datas.auditAnswerList.forEach((item, index) => {
        const prefix = `auditAnswerList[${index}]`;
        formData2.append(`${prefix}.projectQuestionId`, item.projectQuestionId);
        formData2.append(`${prefix}.status`, item.status);
    });

    const response = await axios.post(api + "/api/inspector-check", formData2, {
        headers: header
    });

    return response.data;
}