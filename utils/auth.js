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
    formData.append('username', email);
    formData.append('password', password);

    const response = await axios.post((api + apiDr), formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
        },
    });

    return response;
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



//QR READ WRITE
export async function qrReadWrite(token, datas) {
    const header = {
        "Cookie": token
    };

    const code = datas.code;
    const lat = datas.lat;
    const lng = datas.lng;

    const response = await axios.get(api + "/api/employee/qr-read-write?resultId=" +
        code + "&lat=" + lat + "&lng=" + lng, {
        headers: header
    });

    return response.data;
}



//LOCATION CONTROL
export async function locationCheck(token, datas) {
    const header = {
        "Cookie": token
    };
    
    const response = await axios.post(api + "/api/check-location", datas, {
        headers: header
    });

    return response.data;
}


//GET DOCUMENTS
export async function getDocuments(token) {
    const header = {
        "Cookie": token
    };

    const response = await axios.get(api + "/api/get-employee-files", {
        headers: header
    });


    return response.data;
}


//UPDATE DOCUMENT STATUS
export async function updateFileStatus(token, data) {
    const header = {
        "Cookie": token
    };

    const response = await axios.post(api + "/api/update-employee-status", data, {
        headers: header
    });

    return response.data;
}
