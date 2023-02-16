

import http from "k6/http";
import { group, check, sleep } from "k6";

const BASE_URL = "http://ca.com/jshERP-boot";
// Sleep duration between successive requests.
// You might want to edit the value of this variable or remove calls to the sleep function on the script.
const SLEEP_DURATION = 0.1;
// Global variables should be initialized.
export function setup() {
    // Use either password authentication flow
    let url = BASE_URL + `/user/login`;

    return    http.post(
        url,
        JSON.stringify({
            "loginName": "jsh",
            "password": "e10adc3949ba59abbe56e057f20f883e"}),
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
}
export default function(data) {
    let jsonBody = JSON.parse(data.body)
    const headoptions ={headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,}};
    group("/material/getMaterialNameList", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/material/getMaterialNameList`;

            let request = http.get(url,headoptions);
            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/material/getMaterialByMeId", () => {
        let meId = 'TODO_EDIT_THE_MEID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let mpList = 'TODO_EDIT_THE_MPLIST'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/material/getMaterialByMeId?meId=${meId}&mpList=${mpList}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/materialsExtend/getInfoByBarCode", () => {
        let barCode = 'TODO_EDIT_THE_BARCODE'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/materialsExtend/getInfoByBarCode?barCode=${barCode}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/depotHead/addDepotHeadAndDetail", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/depotHead/addDepotHeadAndDetail`;
            // TODO: edit the parameters of the request body.
            let body = {"id": "long", "info": "string", "preTotalPrice": "bigdecimal", "rows": "string"};

            let request = http.post(url, JSON.stringify(body), headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/material/findBySelect", () => {
        let q = 'TODO_EDIT_THE_Q'; // specify value as there is no example value for this parameter in OpenAPI spec
        let depotId = 'TODO_EDIT_THE_DEPOTID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let enableSerialNumber = 'TODO_EDIT_THE_ENABLESERIALNUMBER'; // specify value as there is no example value for this parameter in OpenAPI spec
        let page = 'TODO_EDIT_THE_PAGE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let rows = 'TODO_EDIT_THE_ROWS'; // specify value as there is no example value for this parameter in OpenAPI spec
        let categoryId = 'TODO_EDIT_THE_CATEGORYID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let mpList = 'TODO_EDIT_THE_MPLIST'; // specify value as there is no example value for this parameter in OpenAPI spec
        let enableBatchNumber = 'TODO_EDIT_THE_ENABLEBATCHNUMBER'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/material/findBySelect?categoryId=${categoryId}&q=${q}&mpList=${mpList}&depotId=${depotId}&enableSerialNumber=${enableSerialNumber}&enableBatchNumber=${enableBatchNumber}&page=${page}&rows=${rows}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/unit/getAllList", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/unit/getAllList`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/unit/batchSetStatus", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/unit/batchSetStatus`;

            let request = http.post(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/material/batchSetMaterialCurrentStock", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/material/batchSetMaterialCurrentStock`;

            let request = http.post(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/user/registerUser", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/user/registerUser`;
            // TODO: edit the parameters of the request body.
            let body = {"department": "string", "description": "string", "email": "string", "expireTime": "string", "id": "long", "ismanager": "byte[]", "isystem": "byte[]", "loginName": "string", "orgAbr": "string", "orgaId": "long", "orgaUserRelId": "long", "password": "string", "phonenum": "string", "position": "string", "remark": "string", "roleId": "long", "roleName": "string", "status": "byte[]", "tenantId": "long", "userBlngOrgaDsplSeq": "string", "userNumLimit": "integer", "userType": "string", "username": "string"};

            let request = http.post(url, JSON.stringify(body), headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/depotItem/buyIn", () => {
        let materialParam = 'TODO_EDIT_THE_MATERIALPARAM'; // specify value as there is no example value for this parameter in OpenAPI spec
        let pageSize = 'TODO_EDIT_THE_PAGESIZE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let beginTime = 'TODO_EDIT_THE_BEGINTIME'; // specify value as there is no example value for this parameter in OpenAPI spec
        let endTime = 'TODO_EDIT_THE_ENDTIME'; // specify value as there is no example value for this parameter in OpenAPI spec
        let currentPage = 'TODO_EDIT_THE_CURRENTPAGE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let roleType = 'TODO_EDIT_THE_ROLETYPE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let mpList = 'TODO_EDIT_THE_MPLIST'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/depotItem/buyIn?currentPage=${currentPage}&pageSize=${pageSize}&beginTime=${beginTime}&endTime=${endTime}&materialParam=${materialParam}&mpList=${mpList}&roleType=${roleType}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/depotHead/findInOutMaterialCount", () => {
        let materialParam = 'TODO_EDIT_THE_MATERIALPARAM'; // specify value as there is no example value for this parameter in OpenAPI spec
        let depotId = 'TODO_EDIT_THE_DEPOTID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let pageSize = 'TODO_EDIT_THE_PAGESIZE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let organId = 'TODO_EDIT_THE_ORGANID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let beginTime = 'TODO_EDIT_THE_BEGINTIME'; // specify value as there is no example value for this parameter in OpenAPI spec
        let endTime = 'TODO_EDIT_THE_ENDTIME'; // specify value as there is no example value for this parameter in OpenAPI spec
        let currentPage = 'TODO_EDIT_THE_CURRENTPAGE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let type = 'TODO_EDIT_THE_TYPE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let roleType = 'TODO_EDIT_THE_ROLETYPE'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/depotHead/findInOutMaterialCount?currentPage=${currentPage}&pageSize=${pageSize}&organId=${organId}&materialParam=${materialParam}&depotId=${depotId}&beginTime=${beginTime}&endTime=${endTime}&type=${type}&roleType=${roleType}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/user/getCurrentPriceLimit", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/user/getCurrentPriceLimit`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/materialsExtend/checkIsBarCodeExist", () => {
        let id = 'TODO_EDIT_THE_ID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let barCode = 'TODO_EDIT_THE_BARCODE'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/materialsExtend/checkIsBarCodeExist?id=${id}&barCode=${barCode}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/user/getRoleTypeByCurrentUser", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/user/getRoleTypeByCurrentUser`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/organization/getOrganizationTree", () => {
        let id = 'TODO_EDIT_THE_ID'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/organization/getOrganizationTree?id=${id}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });

            sleep(SLEEP_DURATION);
        }

        // Request No. 2
        {
            let url = BASE_URL + `/organization/getOrganizationTree?id=${id}`;
            let request = http.options(url);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "No Content": (r) => r.status === 204
            });
        }
    });

    group("/plugin/list", () => {
        let name = 'TODO_EDIT_THE_NAME'; // specify value as there is no example value for this parameter in OpenAPI spec
        let pageSize = 'TODO_EDIT_THE_PAGESIZE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let currentPage = 'TODO_EDIT_THE_CURRENTPAGE'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/plugin/list?name=${name}&currentPage=${currentPage}&pageSize=${pageSize}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/systemConfig/fileSizeLimit", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/systemConfig/fileSizeLimit`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/account/getAccount", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/account/getAccount`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/materialCategory/editMaterialCategory", () => {
        let info = 'TODO_EDIT_THE_INFO'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/materialCategory/editMaterialCategory?info=${info}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });

            sleep(SLEEP_DURATION);
        }

        // Request No. 2
        {
            let url = BASE_URL + `/materialCategory/editMaterialCategory?info=${info}`;
            let request = http.options(url);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "No Content": (r) => r.status === 204
            });
        }
    });

    group("/material/getListWithStock", () => {
        let materialParam = 'TODO_EDIT_THE_MATERIALPARAM'; // specify value as there is no example value for this parameter in OpenAPI spec
        let zeroStock = 'TODO_EDIT_THE_ZEROSTOCK'; // specify value as there is no example value for this parameter in OpenAPI spec
        let column = 'TODO_EDIT_THE_COLUMN'; // specify value as there is no example value for this parameter in OpenAPI spec
        let pageSize = 'TODO_EDIT_THE_PAGESIZE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let currentPage = 'TODO_EDIT_THE_CURRENTPAGE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let categoryId = 'TODO_EDIT_THE_CATEGORYID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let depotIds = 'TODO_EDIT_THE_DEPOTIDS'; // specify value as there is no example value for this parameter in OpenAPI spec
        let mpList = 'TODO_EDIT_THE_MPLIST'; // specify value as there is no example value for this parameter in OpenAPI spec
        let order = 'TODO_EDIT_THE_ORDER'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/material/getListWithStock?currentPage=${currentPage}&pageSize=${pageSize}&depotIds=${depotIds}&categoryId=${categoryId}&materialParam=${materialParam}&zeroStock=${zeroStock}&mpList=${mpList}&column=${column}&order=${order}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/depotItem/totalCountMoney", () => {
        let materialParam = 'TODO_EDIT_THE_MATERIALPARAM'; // specify value as there is no example value for this parameter in OpenAPI spec
        let monthTime = 'TODO_EDIT_THE_MONTHTIME'; // specify value as there is no example value for this parameter in OpenAPI spec
        let depotIds = 'TODO_EDIT_THE_DEPOTIDS'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/depotItem/totalCountMoney?depotIds=${depotIds}&monthTime=${monthTime}&materialParam=${materialParam}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/accountItem/getDetailList", () => {
        let headerId = 'TODO_EDIT_THE_HEADERID'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/accountItem/getDetailList?headerId=${headerId}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/function/findRoleFunctionsById", () => {
        let roleId = 'TODO_EDIT_THE_ROLEID'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/function/findRoleFunctionsById?roleId=${roleId}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/msg/getMsgByStatus", () => {
        let status = 'TODO_EDIT_THE_STATUS'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/msg/getMsgByStatus?status=${status}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/platformConfig/getPlatformConfigByKey", () => {
        let platformKey = 'TODO_EDIT_THE_PLATFORMKEY'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/platformConfig/getPlatformConfigByKey?platformKey=${platformKey}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/supplier/batchSetStatus", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/supplier/batchSetStatus`;

            let request = http.post(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/depotItem/findByAll", () => {
        let materialParam = 'TODO_EDIT_THE_MATERIALPARAM'; // specify value as there is no example value for this parameter in OpenAPI spec
        let pageSize = 'TODO_EDIT_THE_PAGESIZE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let monthTime = 'TODO_EDIT_THE_MONTHTIME'; // specify value as there is no example value for this parameter in OpenAPI spec
        let currentPage = 'TODO_EDIT_THE_CURRENTPAGE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let depotIds = 'TODO_EDIT_THE_DEPOTIDS'; // specify value as there is no example value for this parameter in OpenAPI spec
        let mpList = 'TODO_EDIT_THE_MPLIST'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/depotItem/findByAll?currentPage=${currentPage}&pageSize=${pageSize}&depotIds=${depotIds}&monthTime=${monthTime}&materialParam=${materialParam}&mpList=${mpList}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/role/batchSetStatus", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/role/batchSetStatus`;

            let request = http.post(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/account/updateIsDefault", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/account/updateIsDefault`;

            let request = http.post(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/user/batchSetStatus", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/user/batchSetStatus`;

            let request = http.post(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/depotHead/getStatementAccount", () => {
        let pageSize = 'TODO_EDIT_THE_PAGESIZE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let organId = 'TODO_EDIT_THE_ORGANID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let beginTime = 'TODO_EDIT_THE_BEGINTIME'; // specify value as there is no example value for this parameter in OpenAPI spec
        let endTime = 'TODO_EDIT_THE_ENDTIME'; // specify value as there is no example value for this parameter in OpenAPI spec
        let currentPage = 'TODO_EDIT_THE_CURRENTPAGE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let supplierType = 'TODO_EDIT_THE_SUPPLIERTYPE'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/depotHead/getStatementAccount?currentPage=${currentPage}&pageSize=${pageSize}&beginTime=${beginTime}&endTime=${endTime}&organId=${organId}&supplierType=${supplierType}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/person/batchSetStatus", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/person/batchSetStatus`;

            let request = http.post(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/userBusiness/checkIsValueExist", () => {
        let keyId = 'TODO_EDIT_THE_KEYID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let type = 'TODO_EDIT_THE_TYPE'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/userBusiness/checkIsValueExist?type=${type}&keyId=${keyId}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/user/addUser", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/user/addUser`;

            let request = http.post(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/{apiName}/add", () => {
        let apiName = 'TODO_EDIT_THE_APINAME'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/${apiName}/add`;
            let params = {headers: {"Content-Type": "application/json", "Accept": "application/json"}};
            let request = http.post(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/supplier/findUserCustomer", () => {
        let uBKeyId = 'TODO_EDIT_THE_UBKEYID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let uBType = 'TODO_EDIT_THE_UBTYPE'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/supplier/findUserCustomer?UBType=${uBKeyId}&UBKeyId=${uBType}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/supplier/checkIsNameAndTypeExist", () => {
        let name = 'TODO_EDIT_THE_NAME'; // specify value as there is no example value for this parameter in OpenAPI spec
        let id = 'TODO_EDIT_THE_ID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let type = 'TODO_EDIT_THE_TYPE'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/supplier/checkIsNameAndTypeExist?id=${id}&name=${name}&type=${type}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/user/updateUser", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/user/updateUser`;

            let request = http.put(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/depotHead/getBillListByLinkNumber", () => {
        let number = 'TODO_EDIT_THE_NUMBER'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/depotHead/getBillListByLinkNumber?number=${number}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/supplier/findBySelect_sup", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/supplier/findBySelect_sup`;
            let request = http.post(url);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/{apiName}/info", () => {
        let apiName = 'TODO_EDIT_THE_APINAME'; // specify value as there is no example value for this parameter in OpenAPI spec
        let id = 'TODO_EDIT_THE_ID'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/${apiName}/info?id=${id}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/materialCategory/addMaterialCategory", () => {
        let info = 'TODO_EDIT_THE_INFO'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/materialCategory/addMaterialCategory?info=${info}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });

            sleep(SLEEP_DURATION);
        }

        // Request No. 2
        {
            let url = BASE_URL + `/materialCategory/addMaterialCategory?info=${info}`;
            let request = http.options(url);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "No Content": (r) => r.status === 204
            });
        }
    });

    group("/materialProperty/getAllList", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/materialProperty/getAllList`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/plugin/installByPath", () => {
        let path = 'TODO_EDIT_THE_PATH'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/plugin/installByPath?path=${path}`;
            let request = http.post(url);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/supplier/findBySelect_retail", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/supplier/findBySelect_retail`;
            let request = http.post(url);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/supplier/findBySelect_cus", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/supplier/findBySelect_cus`;
            let request = http.post(url);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/plugin/uninstall/{id}", () => {
        let id = 'TODO_EDIT_THE_ID'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/plugin/uninstall/${id}`;
            let request = http.post(url);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/depotHead/updateDepotHeadAndDetail", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/depotHead/updateDepotHeadAndDetail`;
            // TODO: edit the parameters of the request body.
            let body = {"id": "long", "info": "string", "preTotalPrice": "bigdecimal", "rows": "string"};

            let request = http.put(url, JSON.stringify(body), headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/material/batchSetStatus", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/material/batchSetStatus`;

            let request = http.post(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/{apiName}/delete", () => {
        let apiName = 'TODO_EDIT_THE_APINAME'; // specify value as there is no example value for this parameter in OpenAPI spec
        let id = 'TODO_EDIT_THE_ID'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/${apiName}/delete?id=${id}`;
            let request = http.del(url);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "No Content": (r) => r.status === 204
            });
        }
    });

    group("/materialCategory/getAllList", () => {
        let parentId = 'TODO_EDIT_THE_PARENTID'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/materialCategory/getAllList?parentId=${parentId}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/plugin/getMacWithSecret", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/plugin/getMacWithSecret`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/depot/updateIsDefault", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/depot/updateIsDefault`;

            let request = http.post(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/depotItem/findStockWarningCount", () => {
        let materialParam = 'TODO_EDIT_THE_MATERIALPARAM'; // specify value as there is no example value for this parameter in OpenAPI spec
        let depotId = 'TODO_EDIT_THE_DEPOTID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let pageSize = 'TODO_EDIT_THE_PAGESIZE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let currentPage = 'TODO_EDIT_THE_CURRENTPAGE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let mpList = 'TODO_EDIT_THE_MPLIST'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/depotItem/findStockWarningCount?currentPage=${currentPage}&pageSize=${pageSize}&materialParam=${materialParam}&depotId=${depotId}&mpList=${mpList}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/{apiName}/list", () => {
        let apiName = 'TODO_EDIT_THE_APINAME'; // specify value as there is no example value for this parameter in OpenAPI spec
        let search = 'TODO_EDIT_THE_SEARCH'; // specify value as there is no example value for this parameter in OpenAPI spec
        let pageSize = 'TODO_EDIT_THE_PAGESIZE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let currentPage = 'TODO_EDIT_THE_CURRENTPAGE'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/${apiName}/list?pageSize=${pageSize}&currentPage=${currentPage}&search=${search}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/materialAttribute/getValueListById", () => {
        let id = 'TODO_EDIT_THE_ID'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/materialAttribute/getValueListById?id=${id}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/organization/addOrganization", () => {
        let info = 'TODO_EDIT_THE_INFO'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/organization/addOrganization?info=${info}`;
            let request = http.post(url);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/depotHead/getDetailByNumber", () => {
        let number = 'TODO_EDIT_THE_NUMBER'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/depotHead/getDetailByNumber?number=${number}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/tenant/batchSetStatus", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/tenant/batchSetStatus`;

            let request = http.post(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/user/resetPwd", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/user/resetPwd`;

            let request = http.post(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/accountHead/updateAccountHeadAndDetail", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/accountHead/updateAccountHeadAndDetail`;
            // TODO: edit the parameters of the request body.
            let body = {"id": "long", "info": "string", "rows": "string"};

            let request = http.put(url, JSON.stringify(body), headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/materialsExtend/getDetailList", () => {
        let materialId = 'TODO_EDIT_THE_MATERIALID'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/materialsExtend/getDetailList?materialId=${materialId}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/depotHead/batchSetStatus", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/depotHead/batchSetStatus`;

            let request = http.post(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/material/exportExcel", () => {
        let expiryNum = 'TODO_EDIT_THE_EXPIRYNUM'; // specify value as there is no example value for this parameter in OpenAPI spec
        let materialParam = 'TODO_EDIT_THE_MATERIALPARAM'; // specify value as there is no example value for this parameter in OpenAPI spec
        let color = 'TODO_EDIT_THE_COLOR'; // specify value as there is no example value for this parameter in OpenAPI spec
        let weight = 'TODO_EDIT_THE_WEIGHT'; // specify value as there is no example value for this parameter in OpenAPI spec
        let remark = 'TODO_EDIT_THE_REMARK'; // specify value as there is no example value for this parameter in OpenAPI spec
        let enableSerialNumber = 'TODO_EDIT_THE_ENABLESERIALNUMBER'; // specify value as there is no example value for this parameter in OpenAPI spec
        let categoryId = 'TODO_EDIT_THE_CATEGORYID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let enabled = 'TODO_EDIT_THE_ENABLED'; // specify value as there is no example value for this parameter in OpenAPI spec
        let enableBatchNumber = 'TODO_EDIT_THE_ENABLEBATCHNUMBER'; // specify value as there is no example value for this parameter in OpenAPI spec
        let mpList = 'TODO_EDIT_THE_MPLIST'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/material/exportExcel?categoryId=${categoryId}&materialParam=${materialParam}&color=${color}&weight=${weight}&expiryNum=${expiryNum}&enabled=${enabled}&enableSerialNumber=${enableSerialNumber}&enableBatchNumber=${enableBatchNumber}&remark=${remark}&mpList=${mpList}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/msg/getMsgCountByType", () => {
        let type = 'TODO_EDIT_THE_TYPE'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/msg/getMsgCountByType?type=${type}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/systemConfig/static/**", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/systemConfig/static/**`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/plugin/stop/{id}", () => {
        let id = 'TODO_EDIT_THE_ID'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/plugin/stop/${id}`;
            let request = http.post(url);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/plugin/uploadPluginConfigFile", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/plugin/uploadPluginConfigFile`;
            // TODO: edit the parameters of the request body.
            let body = {"configFile": http.file(open("/path/to/file.bin", "b"), "test.bin")};
            let params = {headers: {"Content-Type": "multipart/form-data", "Accept": "*/*"}};
            let request = http.post(url, JSON.stringify(body), headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/supplier/importMember", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/supplier/importMember`;
            // TODO: edit the parameters of the request body.
            let body = {"file": http.file(open("/path/to/file.bin", "b"), "test.bin")};
            let params = {headers: {"Content-Type": "multipart/form-data", "Accept": "*/*"}};
            let request = http.post(url, JSON.stringify(body), headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/sequence/buildNumber", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/sequence/buildNumber`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/platformConfig/updatePlatformConfigByKey", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/platformConfig/updatePlatformConfigByKey`;

            let request = http.post(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/material/importExcel", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/material/importExcel`;
            // TODO: edit the parameters of the request body.
            let body = {"file": http.file(open("/path/to/file.bin", "b"), "test.bin")};
            let params = {headers: {"Content-Type": "multipart/form-data", "Accept": "*/*"}};
            let request = http.post(url, JSON.stringify(body), headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/depotHead/findInOutDetail", () => {
        let number = 'TODO_EDIT_THE_NUMBER'; // specify value as there is no example value for this parameter in OpenAPI spec
        let materialParam = 'TODO_EDIT_THE_MATERIALPARAM'; // specify value as there is no example value for this parameter in OpenAPI spec
        let depotId = 'TODO_EDIT_THE_DEPOTID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let pageSize = 'TODO_EDIT_THE_PAGESIZE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let organId = 'TODO_EDIT_THE_ORGANID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let remark = 'TODO_EDIT_THE_REMARK'; // specify value as there is no example value for this parameter in OpenAPI spec
        let beginTime = 'TODO_EDIT_THE_BEGINTIME'; // specify value as there is no example value for this parameter in OpenAPI spec
        let endTime = 'TODO_EDIT_THE_ENDTIME'; // specify value as there is no example value for this parameter in OpenAPI spec
        let currentPage = 'TODO_EDIT_THE_CURRENTPAGE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let roleType = 'TODO_EDIT_THE_ROLETYPE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let type = 'TODO_EDIT_THE_TYPE'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/depotHead/findInOutDetail?currentPage=${currentPage}&pageSize=${pageSize}&organId=${organId}&number=${number}&materialParam=${materialParam}&depotId=${depotId}&beginTime=${beginTime}&endTime=${endTime}&roleType=${roleType}&type=${type}&remark=${remark}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/person/getPersonByType", () => {
        let type = 'TODO_EDIT_THE_TYPE'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/person/getPersonByType?type=${type}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/supplier/importVendor", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/supplier/importVendor`;
            // TODO: edit the parameters of the request body.
            let body = {"file": http.file(open("/path/to/file.bin", "b"), "test.bin")};
            let params = {headers: {"Content-Type": "multipart/form-data", "Accept": "*/*"}};
            let request = http.post(url, JSON.stringify(body), headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/plugin/uploadInstallPluginJar", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/plugin/uploadInstallPluginJar`;
            // TODO: edit the parameters of the request body.
            let body = {"file": http.file(open("/path/to/file.bin", "b"), "test.bin")};
            let params = {headers: {"Content-Type": "multipart/form-data", "Accept": "*/*"}};
            let request = http.post(url, JSON.stringify(body), headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/supplier/importCustomer", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/supplier/importCustomer`;
            // TODO: edit the parameters of the request body.
            let body = {"file": http.file(open("/path/to/file.bin", "b"), "test.bin")};
            let params = {headers: {"Content-Type": "multipart/form-data", "Accept": "*/*"}};
            let request = http.post(url, JSON.stringify(body), headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/materialCategory/findById", () => {
        let id = 'TODO_EDIT_THE_ID'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/materialCategory/findById?id=${id}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/materialCategory/getMaterialCategoryTree", () => {
        let id = 'TODO_EDIT_THE_ID'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/materialCategory/getMaterialCategoryTree?id=${id}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });

            sleep(SLEEP_DURATION);
        }

        // Request No. 2
        {
            let url = BASE_URL + `/materialCategory/getMaterialCategoryTree?id=${id}`;
            let request = http.options(url);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "No Content": (r) => r.status === 204
            });
        }
    });

    group("/material/getMaterialByBarCode", () => {
        let prefixNo = 'TODO_EDIT_THE_PREFIXNO'; // specify value as there is no example value for this parameter in OpenAPI spec
        let depotId = 'TODO_EDIT_THE_DEPOTID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let barCode = 'TODO_EDIT_THE_BARCODE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let mpList = 'TODO_EDIT_THE_MPLIST'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/material/getMaterialByBarCode?barCode=${barCode}&depotId=${depotId}&mpList=${mpList}&prefixNo=${prefixNo}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/organization/findById", () => {
        let id = 'TODO_EDIT_THE_ID'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/organization/findById?id=${id}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/depotItem/findStockByDepotAndBarCode", () => {
        let depotId = 'TODO_EDIT_THE_DEPOTID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let barCode = 'TODO_EDIT_THE_BARCODE'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/depotItem/findStockByDepotAndBarCode?depotId=${depotId}&barCode=${barCode}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/{apiName}/deleteBatch", () => {
        let apiName = 'TODO_EDIT_THE_APINAME'; // specify value as there is no example value for this parameter in OpenAPI spec
        let ids = 'TODO_EDIT_THE_IDS'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/${apiName}/deleteBatch?ids=${ids}`;
            let request = http.del(url);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "No Content": (r) => r.status === 204
            });
        }
    });

    group("/person/getPersonByNumType", () => {
        let type = 'TODO_EDIT_THE_TYPE'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/person/getPersonByNumType?type=${type}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/user/randomImage/{key}", () => {
        let key = 'TODO_EDIT_THE_KEY'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/user/randomImage/${key}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/user/login", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/user/login`;
            // TODO: edit the parameters of the request body.
            let body = {"department": "string", "description": "string", "email": "string", "id": "long", "ismanager": "byte[]", "isystem": "byte[]", "loginName": "string", "password": "string", "phonenum": "string", "position": "string", "remark": "string", "status": "byte[]", "tenantId": "long", "username": "string"};

            let request = http.post(url, JSON.stringify(body), headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/inOutItem/batchSetStatus", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/inOutItem/batchSetStatus`;

            let request = http.post(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/systemConfig/upload", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/systemConfig/upload`;
            let request = http.post(url);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/depotItem/saleOut", () => {
        let materialParam = 'TODO_EDIT_THE_MATERIALPARAM'; // specify value as there is no example value for this parameter in OpenAPI spec
        let pageSize = 'TODO_EDIT_THE_PAGESIZE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let beginTime = 'TODO_EDIT_THE_BEGINTIME'; // specify value as there is no example value for this parameter in OpenAPI spec
        let endTime = 'TODO_EDIT_THE_ENDTIME'; // specify value as there is no example value for this parameter in OpenAPI spec
        let currentPage = 'TODO_EDIT_THE_CURRENTPAGE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let roleType = 'TODO_EDIT_THE_ROLETYPE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let mpList = 'TODO_EDIT_THE_MPLIST'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/depotItem/saleOut?currentPage=${currentPage}&pageSize=${pageSize}&beginTime=${beginTime}&endTime=${endTime}&materialParam=${materialParam}&mpList=${mpList}&roleType=${roleType}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/depotHead/findAllocationDetail", () => {
        let number = 'TODO_EDIT_THE_NUMBER'; // specify value as there is no example value for this parameter in OpenAPI spec
        let materialParam = 'TODO_EDIT_THE_MATERIALPARAM'; // specify value as there is no example value for this parameter in OpenAPI spec
        let depotId = 'TODO_EDIT_THE_DEPOTID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let pageSize = 'TODO_EDIT_THE_PAGESIZE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let subType = 'TODO_EDIT_THE_SUBTYPE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let remark = 'TODO_EDIT_THE_REMARK'; // specify value as there is no example value for this parameter in OpenAPI spec
        let beginTime = 'TODO_EDIT_THE_BEGINTIME'; // specify value as there is no example value for this parameter in OpenAPI spec
        let endTime = 'TODO_EDIT_THE_ENDTIME'; // specify value as there is no example value for this parameter in OpenAPI spec
        let currentPage = 'TODO_EDIT_THE_CURRENTPAGE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let depotIdF = 'TODO_EDIT_THE_DEPOTIDF'; // specify value as there is no example value for this parameter in OpenAPI spec
        let roleType = 'TODO_EDIT_THE_ROLETYPE'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/depotHead/findAllocationDetail?currentPage=${currentPage}&pageSize=${pageSize}&number=${number}&materialParam=${materialParam}&depotId=${depotId}&depotIdF=${depotIdF}&beginTime=${beginTime}&endTime=${endTime}&subType=${subType}&roleType=${roleType}&remark=${remark}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/depotHead/debtList", () => {
        let search = 'TODO_EDIT_THE_SEARCH'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/depotHead/debtList?search=${search}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/material/batchUpdate", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/material/batchUpdate`;

            let request = http.post(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/msg/readAllMsg", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/msg/readAllMsg`;
            let request = http.post(url);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/material/getMaxBarCode", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/material/getMaxBarCode`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/platformConfig/getPlatform/url", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/platformConfig/getPlatform/url`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/account/findBySelect", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/account/findBySelect`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/depotItem/getBatchNumberList", () => {
        let name = 'TODO_EDIT_THE_NAME'; // specify value as there is no example value for this parameter in OpenAPI spec
        let depotId = 'TODO_EDIT_THE_DEPOTID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let depotItemId = 'TODO_EDIT_THE_DEPOTITEMID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let barCode = 'TODO_EDIT_THE_BARCODE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let batchNumber = 'TODO_EDIT_THE_BATCHNUMBER'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/depotItem/getBatchNumberList?name=${name}&depotItemId=${depotItemId}&depotId=${depotId}&barCode=${barCode}&batchNumber=${batchNumber}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/material/getMaterialEnableSerialNumberList", () => {
        let q = 'TODO_EDIT_THE_Q'; // specify value as there is no example value for this parameter in OpenAPI spec
        let page = 'TODO_EDIT_THE_PAGE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let rows = 'TODO_EDIT_THE_ROWS'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/material/getMaterialEnableSerialNumberList?q=${q}&page=${page}&rows=${rows}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/account/batchSetStatus", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/account/batchSetStatus`;

            let request = http.post(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/account/getStatistics", () => {
        let name = 'TODO_EDIT_THE_NAME'; // specify value as there is no example value for this parameter in OpenAPI spec
        let serialNo = 'TODO_EDIT_THE_SERIALNO'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/account/getStatistics?name=${name}&serialNo=${serialNo}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/account/findAccountInOutList", () => {
        let accountId = 'TODO_EDIT_THE_ACCOUNTID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let initialAmount = 'TODO_EDIT_THE_INITIALAMOUNT'; // specify value as there is no example value for this parameter in OpenAPI spec
        let pageSize = 'TODO_EDIT_THE_PAGESIZE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let currentPage = 'TODO_EDIT_THE_CURRENTPAGE'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/account/findAccountInOutList?currentPage=${currentPage}&pageSize=${pageSize}&accountId=${accountId}&initialAmount=${initialAmount}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/user/getOrganizationUserTree", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/user/getOrganizationUserTree`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });

            sleep(SLEEP_DURATION);
        }

        // Request No. 2
        {
            let url = BASE_URL + `/user/getOrganizationUserTree`;
            let request = http.options(url);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "No Content": (r) => r.status === 204
            });
        }
    });

    group("/materialAttribute/getNameList", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/materialAttribute/getNameList`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/userBusiness/getBasicData", () => {
        let keyId = 'TODO_EDIT_THE_KEYID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let type = 'TODO_EDIT_THE_TYPE'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/userBusiness/getBasicData?KeyId=${KeyId}&Type=${Type}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/accountHead/getFinancialBillNoByBillId", () => {
        let billId = 'TODO_EDIT_THE_BILLID'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/accountHead/getFinancialBillNoByBillId?billId=${billId}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/serialNumber/getEnableSerialNumberList", () => {
        let name = 'TODO_EDIT_THE_NAME'; // specify value as there is no example value for this parameter in OpenAPI spec
        let depotId = 'TODO_EDIT_THE_DEPOTID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let depotItemId = 'TODO_EDIT_THE_DEPOTITEMID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let page = 'TODO_EDIT_THE_PAGE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let rows = 'TODO_EDIT_THE_ROWS'; // specify value as there is no example value for this parameter in OpenAPI spec
        let barCode = 'TODO_EDIT_THE_BARCODE'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/serialNumber/getEnableSerialNumberList?name=${name}&depotItemId=${depotItemId}&depotId=${depotId}&barCode=${barCode}&page=${page}&rows=${rows}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/depotHead/getBuyAndSaleStatistics", () => {
        let roleType = 'TODO_EDIT_THE_ROLETYPE'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/depotHead/getBuyAndSaleStatistics?roleType=${roleType}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/role/allList", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/role/allList`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/person/getPersonByIds", () => {
        let personIds = 'TODO_EDIT_THE_PERSONIDS'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/person/getPersonByIds?personIds=${personIds}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/user/getAllList", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/user/getAllList`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/{apiName}/checkIsNameExist", () => {
        let apiName = 'TODO_EDIT_THE_APINAME'; // specify value as there is no example value for this parameter in OpenAPI spec
        let name = 'TODO_EDIT_THE_NAME'; // specify value as there is no example value for this parameter in OpenAPI spec
        let id = 'TODO_EDIT_THE_ID'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/${apiName}/checkIsNameExist?id=${id}&name=${name}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/depotItem/getDetailList", () => {
        let isReadOnly = 'TODO_EDIT_THE_ISREADONLY'; // specify value as there is no example value for this parameter in OpenAPI spec
        let linkType = 'TODO_EDIT_THE_LINKTYPE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let headerId = 'TODO_EDIT_THE_HEADERID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let mpList = 'TODO_EDIT_THE_MPLIST'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/depotItem/getDetailList?headerId=${headerId}&mpList=${mpList}&linkType=${linkType}&isReadOnly=${isReadOnly}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/user/getUserList", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/user/getUserList`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/msg/batchUpdateStatus", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/msg/batchUpdateStatus`;

            let request = http.post(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/userBusiness/updateBtnStr", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/userBusiness/updateBtnStr`;

            let request = http.post(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/error", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/error`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });

            sleep(SLEEP_DURATION);
        }

        // Request No. 2
        {
            let url = BASE_URL + `/error`;
            let request = http.options(url);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "No Content": (r) => r.status === 204
            });
        }
    });

    group("/accountHead/batchSetStatus", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/accountHead/batchSetStatus`;

            let request = http.post(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/depotItem/findDetailByDepotIdsAndMaterialId", () => {
        let pageSize = 'TODO_EDIT_THE_PAGESIZE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let currentPage = 'TODO_EDIT_THE_CURRENTPAGE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let sku = 'TODO_EDIT_THE_SKU'; // specify value as there is no example value for this parameter in OpenAPI spec
        let materialId = 'TODO_EDIT_THE_MATERIALID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let depotIds = 'TODO_EDIT_THE_DEPOTIDS'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/depotItem/findDetailByDepotIdsAndMaterialId?pageSize=${pageSize}&currentPage=${currentPage}&depotIds=${depotIds}&sku=${sku}&materialId=${materialId}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/user/getUserSession", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/user/getUserSession`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/systemConfig/getCurrentInfo", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/systemConfig/getCurrentInfo`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/material/findByIdWithBarCode", () => {
        let meId = 'TODO_EDIT_THE_MEID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let mpList = 'TODO_EDIT_THE_MPLIST'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/material/findByIdWithBarCode?meId=${meId}&mpList=${mpList}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/organization/editOrganization", () => {
        let info = 'TODO_EDIT_THE_INFO'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/organization/editOrganization?info=${info}`;
            let request = http.post(url);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/msg/getMsgCountByStatus", () => {
        let status = 'TODO_EDIT_THE_STATUS'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/msg/getMsgCountByStatus?status=${status}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/role/findUserRole", () => {
        let uBKeyId = 'TODO_EDIT_THE_UBKEYID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let uBType = 'TODO_EDIT_THE_UBTYPE'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/role/findUserRole?UBType=${UBType}&UBKeyId=${UBKeyId}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/{apiName}/update", () => {
        let apiName = 'TODO_EDIT_THE_APINAME'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/${apiName}/update`;
            let params = {headers: {"Content-Type": "application/json", "Accept": "application/json"}};
            let request = http.put(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/function/findMenuByPNumber", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/function/findMenuByPNumber`;

            let request = http.post(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/depot/findDepotByCurrentUser", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/depot/findDepotByCurrentUser`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/plugin/back/{pluginId}", () => {
        let pluginId = 'TODO_EDIT_THE_PLUGINID'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/plugin/back/${pluginId}`;
            let request = http.post(url);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/material/checkIsExist", () => {
        let standard = 'TODO_EDIT_THE_STANDARD'; // specify value as there is no example value for this parameter in OpenAPI spec
        let otherField1 = 'TODO_EDIT_THE_OTHERFIELD1'; // specify value as there is no example value for this parameter in OpenAPI spec
        let unit = 'TODO_EDIT_THE_UNIT'; // specify value as there is no example value for this parameter in OpenAPI spec
        let color = 'TODO_EDIT_THE_COLOR'; // specify value as there is no example value for this parameter in OpenAPI spec
        let name = 'TODO_EDIT_THE_NAME'; // specify value as there is no example value for this parameter in OpenAPI spec
        let mfrs = 'TODO_EDIT_THE_MFRS'; // specify value as there is no example value for this parameter in OpenAPI spec
        let unitId = 'TODO_EDIT_THE_UNITID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let model = 'TODO_EDIT_THE_MODEL'; // specify value as there is no example value for this parameter in OpenAPI spec
        let id = 'TODO_EDIT_THE_ID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let otherField3 = 'TODO_EDIT_THE_OTHERFIELD3'; // specify value as there is no example value for this parameter in OpenAPI spec
        let otherField2 = 'TODO_EDIT_THE_OTHERFIELD2'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/material/checkIsExist?id=${id}&name=${name}&model=${model}&color=${color}&standard=${standard}&mfrs=${mfrs}&otherField1=${otherField1}&otherField2=${otherField2}&otherField3=${otherField3}&unit=${unit}&unitId=${unitId}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/supplier/exportExcel", () => {
        let supplier = 'TODO_EDIT_THE_SUPPLIER'; // specify value as there is no example value for this parameter in OpenAPI spec
        let telephone = 'TODO_EDIT_THE_TELEPHONE'; // specify value as there is no example value for this parameter in OpenAPI spec
        let phonenum = 'TODO_EDIT_THE_PHONENUM'; // specify value as there is no example value for this parameter in OpenAPI spec
        let type = 'TODO_EDIT_THE_TYPE'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/supplier/exportExcel?supplier=${supplier}&type=${type}&phonenum=${phonenum}&telephone=${telephone}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/function/findRoleFunction", () => {
        let uBKeyId = 'TODO_EDIT_THE_UBKEYID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let uBType = 'TODO_EDIT_THE_UBTYPE'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/function/findRoleFunction?UBType=${UBType}&UBKeyId=${UBKeyId}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/plugin/start/{id}", () => {
        let id = 'TODO_EDIT_THE_ID'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/plugin/start/${id}`;
            let request = http.post(url);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/user/infoWithTenant", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/user/infoWithTenant`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/depot/getAllListWithStock", () => {
        let mId = 'TODO_EDIT_THE_MID'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/depot/getAllListWithStock?mId=${mId}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/inOutItem/findBySelect", () => {
        let type = 'TODO_EDIT_THE_TYPE'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/inOutItem/findBySelect?type=${type}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/person/getAllList", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/person/getAllList`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/accountHead/getDetailByNumber", () => {
        let billNo = 'TODO_EDIT_THE_BILLNO'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/accountHead/getDetailByNumber?billNo=${billNo}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/user/updatePwd", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/user/updatePwd`;

            let request = http.put(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/supplier/findBySelect_organ", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/supplier/findBySelect_organ`;
            let request = http.post(url);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/depot/getAllList", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/depot/getAllList`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/platformConfig/getPlatform/name", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/platformConfig/getPlatform/name`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/plugin/files", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/plugin/files`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/depotHead/getCreatorByCurrentUser", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/depotHead/getCreatorByCurrentUser`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/accountHead/addAccountHeadAndDetail", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/accountHead/addAccountHeadAndDetail`;
            // TODO: edit the parameters of the request body.
            let body = {"id": "long", "info": "string", "rows": "string"};

            let request = http.post(url, JSON.stringify(body), headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/material/findById", () => {
        let id = 'TODO_EDIT_THE_ID'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/material/findById?id=${id}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/depot/batchSetStatus", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/depot/batchSetStatus`;

            let request = http.post(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/user/logout", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/user/logout`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/depotItem/buyOrSalePrice", () => {
        let roleType = 'TODO_EDIT_THE_ROLETYPE'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/depotItem/buyOrSalePrice?roleType=${roleType}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/serialNumber/batAddSerialNumber", () => {

        // Request No. 1
        {
            let url = BASE_URL + `/serialNumber/batAddSerialNumber`;

            let request = http.post(url, headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
            check(request, {
                "Created": (r) => r.status === 201
            });
        }
    });

    group("/depot/findUserDepot", () => {
        let uBKeyId = 'TODO_EDIT_THE_UBKEYID'; // specify value as there is no example value for this parameter in OpenAPI spec
        let uBType = 'TODO_EDIT_THE_UBTYPE'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/depot/findUserDepot?UBType=${UBType}&UBKeyId=${UBKeyId}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

    group("/function/checkIsNumberExist", () => {
        let number = 'TODO_EDIT_THE_NUMBER'; // specify value as there is no example value for this parameter in OpenAPI spec
        let id = 'TODO_EDIT_THE_ID'; // specify value as there is no example value for this parameter in OpenAPI spec

        // Request No. 1
        {
            let url = BASE_URL + `/function/checkIsNumberExist?id=${id}&number=${number}`;
            let request = http.get(url,headoptions);

            check(request, {
                "OK": (r) => r.status === 200
            });
        }
    });

}
