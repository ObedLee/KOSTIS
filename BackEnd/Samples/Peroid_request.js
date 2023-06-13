const url_base = '{"URL":"https://kosis.kr/openapi/statisticsData.do?method=getMeta&"}';
const url_req = '{"apiKey":"NjNkMWRlMmJlNjhkOTBmODA3MjhiMWQ1NmQyNDUzNGE=","format":"json","type":"NCD","orgId":"101","tblId":"DT_1IN1503"}';
// 01, 각 JSON 데이터는 DB에서 받아논 것이라 가정.
// 02, 이 샘플 데이터는 인구총조사 데이터에 대한 요청내용임.
// 03, 이 샘플 데이터의 api키는 추후 따로 분리될 예정 (핵심 보안자료) (현재 구현 과정에서는 후순위)
// 04, 출력된 URL을 기반으로 사용자 요청 JSON을 KOSIS에서 반환받음.
// + 출력값은 현재 작동하는 값임.

let url = JSON.parse(url_base);
let temp_url = JSON.stringify(url_req);

var normalize_req = function(obj){
    obj = obj.replace('{', '');
    obj = obj.replace('}', '');
    obj = obj.replace(/"/g, '');
    obj = obj.replace(/,/g, '&');
    obj = obj.replace(/:/g, '=');
    obj = obj.replace(/\\/g, '');

    return obj;
}

temp_url =normalize_req(temp_url);
url.URL = url.URL + temp_url;

console.log(url.URL);
