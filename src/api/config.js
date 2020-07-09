//api地址公用前缀

// export const DEV_HOST = "http://47.104.90.16:8000/api/v1/";
//api地址公用前缀

// export const DEV_HOST = "http://47.104.90.16:8003/api/v1/";
// 39.99.143.15
export const DEV_HOST = (() => {
    const hostname = window.location.hostname;
    if (hostname.indexOf('192') > -1 || hostname.indexOf('172') > -1 || hostname.indexOf('localhost') > -1) {
        console.log(11)
        return 'http://47.105.172.229/serverPropertyAdmin/api/v1/';
        // return 'http://47.105.96.22/serverPropertyAdmin/api/v1/';
    }
    return 'http://47.105.172.229/serverPropertyAdmin/api/v1/';
    // return 'http://47.105.96.22/serverPropertyAdmin/api/v1/'


})();
export const UPLOAD_HOST = `${DEV_HOST}file/image`;

export const EXCEL_HOST = `${DEV_HOST}owner/impExcel`;

export const PEXCEL_HOST = `${DEV_HOST}paymentManagement/impExcel`;

export const version = "1.0.3";