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

function createFormData(datas) {
    var formData = new FormData();
    for (let i = 0; i < datas.length; i++) {
        formData.append(datas[i])
    }

    return formData;
}


export async function getAuditDirective() {
    const header = {
        "Cookie": ".AspNetCore.Cookies=CfDJ8NteQE5MPOpKpf128g3J0JqYxCTX9SCZiSELlBwYcpAa7BWTDNYRANgHBOJvA2g5dVfrqhhzupOdCPaNoBNswzEA-VT3aVYXhKVoABTXyc_HscbYq_E_xHT9g0VXlIJah27oFy7bUUWteR_Cgx6w5lZQdsYxNuR7ts-Pzmoz4uY2CVNG_GrCmRkLTThf7NxI0aMUDJBsWxVqFvGv2U1DYmCCCUaEOwk6UB9vIuU9D_TRZ9CWqccJKI7wLhsTi07n2moHsGmGog3Ow5Q8FIHI7fUamw6mGrB4ctNVmwY3Ui6AZCHyFzgycLV4Opz72BShsxpuslJAr5wgQVipsZGxpolwCbvWqRTiDnwdoKH3FS8THA6C6eizYXu9ljQwLCwl_wPy9hnCObqQCOhCSTI9vT52CM9PM2gKdS5PtDwbjjMoqLHdHdrrI0jObZEtY1WO3iBrgM5r66RIQK2dCipetZXcwRcP_hVHT7NkcOdLxEkKGi2i3-cGDI_qBO2UcpsmReI07y-aVeev2Qtl8t5UBhvqQGy98xShSJ_am2Ykp1oEoNYXkgVpMGpY3iMZIZCmOQ"
    };

    const response = await axios.get(api + "/api/get-audit-directive", {
        headers: header
    });

    // console.log(response.data);

    return response.data;
}

export async function addAuditWarning(params) {

}

export async function addAuditDirective(params) {

}