// Creator: WebInspector 537.36

import { sleep } from 'k6'
import http from 'k6/http'
const BASE_URL = "http://ca.com/jshERP-boot";
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
export const options = {}

export default function main(data) {
  let jsonBody = JSON.parse(data.body)
  const headoptions ={headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,}};
  let response

  response = http.post(
    BASE_URL+'/user/login',
    '{"loginName":"jsh","password":"e10adc3949ba59abbe56e057f20f883e"}',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/user/login',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',},
    }
  )

  response = http.post(
    BASE_URL+'/function/findMenuByPNumber',
    '{"pNumber":0,"userId":63}',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,},
    }
  )
  console.log(response,jsonBody.data.token)

  response = http.get(BASE_URL+'/user/infoWithTenant', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,},
  })
  console.log(response,jsonBody.data.token)
  response = http.get(
    BASE_URL+'/materialProperty/list?currentPage=1&pageSize=100',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/user/login',},
    }
  )






  response = http.get(
    BASE_URL+'/platformConfig/getPlatformConfigByKey?platformKey=pay_fee_url',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/dashboard/analysis',},
    }
  )



  response = http.get(
    BASE_URL+'/msg/list?search=%7B%22name%22:%22%22%7D&column=createTime&order=desc&field=id,,msgTitle,type,createTimeStr,action&currentPage=1&pageSize=5',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/dashboard/analysis',},
    }
  )

  response = http.get(
    BASE_URL+'/depotHead/getBuyAndSaleStatistics?roleType=%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/dashboard/analysis',},
    }
  )

  response = http.get(
    BASE_URL+'/depotItem/buyOrSalePrice?roleType=%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/dashboard/analysis',},
    }
  )

  response = http.get(
    BASE_URL+'/platformConfig/getPlatformConfigByKey?platformKey=pay_fee_url',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/dashboard/analysis',},
    }
  )

  response = http.get(BASE_URL+'/user/infoWithTenant', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/dashboard/analysis',},
  })

  response = http.get(BASE_URL+'/msg/getMsgByStatus?status=1', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/dashboard/analysis',},
  })






  response = http.get(
    BASE_URL+'/depotHead/list?search=%7B%22number%22:%22%22,%22materialParam%22:%22%22,%22type%22:%22%E5%87%BA%E5%BA%93%22,%22subType%22:%22%E9%9B%B6%E5%94%AE%22,%22roleType%22:%22%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE%22,%22organId%22:%22%22,%22depotId%22:%22%22,%22creator%22:%22%22,%22accountId%22:%22%22,%22status%22:%22%22,%22remark%22:%22%22%7D&column=createTime&order=desc&field=id,,action,organName,number,materialsList,operTimeStr,userName,materialCount,totalPrice,getAmount,backAmount,status&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/retail_out',},
    }
  )

  response = http.post(BASE_URL+'/supplier/findBySelect_retail', '{}', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/retail_out',},
  })

  response = http.get(BASE_URL+'/depot/findDepotByCurrentUser', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/retail_out',},
  })

  response = http.get(BASE_URL+'/user/getUserList', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/retail_out',},
  })

  response = http.get(BASE_URL+'/account/getAccount', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/retail_out',},
  })






  response = http.get(
    BASE_URL+'/depotHead/list?search=%7B%22number%22:%22%22,%22materialParam%22:%22%22,%22type%22:%22%E5%85%A5%E5%BA%93%22,%22subType%22:%22%E9%9B%B6%E5%94%AE%E9%80%80%E8%B4%A7%22,%22roleType%22:%22%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE%22,%22organId%22:%22%22,%22depotId%22:%22%22,%22creator%22:%22%22,%22linkNumber%22:%22%22,%22accountId%22:%22%22,%22status%22:%22%22,%22remark%22:%22%22%7D&column=createTime&order=desc&field=id,,action,organName,number,materialsList,operTimeStr,userName,materialCount,totalPrice,getAmount,backAmount,status&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/retail_back',},
    }
  )

  response = http.post(BASE_URL+'/supplier/findBySelect_retail', '{}', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/retail_back',},
  })

  response = http.get(BASE_URL+'/depot/findDepotByCurrentUser', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/retail_back',},
  })

  response = http.get(BASE_URL+'/user/getUserList', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/retail_back',},
  })

  response = http.get(BASE_URL+'/account/getAccount', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/retail_back',},
  })






  response = http.get(
    BASE_URL+'/depotHead/list?search=%7B%22number%22:%22%22,%22materialParam%22:%22%22,%22type%22:%22%E5%85%B6%E5%AE%83%22,%22subType%22:%22%E9%87%87%E8%B4%AD%E8%AE%A2%E5%8D%95%22,%22roleType%22:%22%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE%22,%22organId%22:%22%22,%22depotId%22:%22%22,%22creator%22:%22%22,%22status%22:%22%22,%22remark%22:%22%22%7D&column=createTime&order=desc&field=id,,action,organName,number,materialsList,operTimeStr,userName,materialCount,totalPrice,totalTaxLastMoney,changeAmount,status&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/purchase_order',},
    }
  )

  response = http.post(BASE_URL+'/supplier/findBySelect_sup', '{}', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/purchase_order',},
  })

  response = http.get(BASE_URL+'/user/getUserList', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/purchase_order',},
  })







  response = http.get(
    BASE_URL+'/depotHead/list?search=%7B%22number%22:%22%22,%22materialParam%22:%22%22,%22type%22:%22%E5%85%A5%E5%BA%93%22,%22subType%22:%22%E9%87%87%E8%B4%AD%22,%22roleType%22:%22%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE%22,%22organId%22:%22%22,%22depotId%22:%22%22,%22creator%22:%22%22,%22linkNumber%22:%22%22,%22accountId%22:%22%22,%22hasDebt%22:%22%22,%22status%22:%22%22,%22remark%22:%22%22%7D&column=createTime&order=desc&field=id,,action,organName,number,materialsList,operTimeStr,userName,materialCount,totalPrice,totalTaxLastMoney,needInMoney,changeAmount,debt,status&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/purchase_in',},
    }
  )

  response = http.post(BASE_URL+'/supplier/findBySelect_sup', '{}', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/purchase_in',},
  })

  response = http.get(BASE_URL+'/depot/findDepotByCurrentUser', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/purchase_in',},
  })

  response = http.get(BASE_URL+'/user/getUserList', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/purchase_in',},
  })

  response = http.get(BASE_URL+'/account/getAccount', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/purchase_in',},
  })





  response = http.get(
    BASE_URL+'/depotHead/list?search=%7B%22number%22:%22%22,%22materialParam%22:%22%22,%22type%22:%22%E5%87%BA%E5%BA%93%22,%22subType%22:%22%E9%87%87%E8%B4%AD%E9%80%80%E8%B4%A7%22,%22roleType%22:%22%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE%22,%22organId%22:%22%22,%22depotId%22:%22%22,%22creator%22:%22%22,%22linkNumber%22:%22%22,%22accountId%22:%22%22,%22status%22:%22%22,%22remark%22:%22%22%7D&column=createTime&order=desc&field=id,,action,organName,number,materialsList,operTimeStr,userName,materialCount,totalPrice,totalTaxLastMoney,needBackMoney,changeAmount,debt,status&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/purchase_back',},
    }
  )

  response = http.post(BASE_URL+'/supplier/findBySelect_sup', '{}', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/purchase_back',},
  })

  response = http.get(BASE_URL+'/depot/findDepotByCurrentUser', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/purchase_back',},
  })

  response = http.get(BASE_URL+'/user/getUserList', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/purchase_back',},
  })

  response = http.get(BASE_URL+'/account/getAccount', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/purchase_back',},
  })





  response = http.get(
    BASE_URL+'/depotHead/list?search=%7B%22number%22:%22%22,%22materialParam%22:%22%22,%22type%22:%22%E5%85%B6%E5%AE%83%22,%22subType%22:%22%E9%94%80%E5%94%AE%E8%AE%A2%E5%8D%95%22,%22roleType%22:%22%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE%22,%22organId%22:%22%22,%22depotId%22:%22%22,%22creator%22:%22%22,%22status%22:%22%22,%22remark%22:%22%22%7D&column=createTime&order=desc&field=id,,action,organName,number,materialsList,operTimeStr,userName,materialCount,totalPrice,totalTaxLastMoney,changeAmount,status,purchaseStatus&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/sale_order',},
    }
  )

  response = http.post(BASE_URL+'/supplier/findBySelect_cus', '{}', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/sale_order',},
  })

  response = http.get(BASE_URL+'/user/getUserList', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/sale_order',},
  })

  response = http.get(BASE_URL+'/systemConfig/getCurrentInfo', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/sale_order',},
  })





  response = http.get(
    BASE_URL+'/depotHead/list?search=%7B%22number%22:%22%22,%22materialParam%22:%22%22,%22type%22:%22%E5%87%BA%E5%BA%93%22,%22subType%22:%22%E9%94%80%E5%94%AE%22,%22roleType%22:%22%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE%22,%22organId%22:%22%22,%22depotId%22:%22%22,%22creator%22:%22%22,%22linkNumber%22:%22%22,%22accountId%22:%22%22,%22hasDebt%22:%22%22,%22status%22:%22%22,%22remark%22:%22%22%7D&column=createTime&order=desc&field=id,,action,organName,number,materialsList,operTimeStr,userName,materialCount,totalPrice,totalTaxLastMoney,needOutMoney,changeAmount,debt,status&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/sale_out',},
    }
  )

  response = http.post(BASE_URL+'/supplier/findBySelect_cus', '{}', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/sale_out',},
  })

  response = http.get(BASE_URL+'/depot/findDepotByCurrentUser', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/sale_out',},
  })

  response = http.get(BASE_URL+'/user/getUserList', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/sale_out',},
  })

  response = http.get(BASE_URL+'/account/getAccount', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/sale_out',},
  })






  response = http.get(
    BASE_URL+'/depotHead/list?search=%7B%22number%22:%22%22,%22materialParam%22:%22%22,%22type%22:%22%E5%85%A5%E5%BA%93%22,%22subType%22:%22%E9%94%80%E5%94%AE%E9%80%80%E8%B4%A7%22,%22roleType%22:%22%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE%22,%22organId%22:%22%22,%22depotId%22:%22%22,%22creator%22:%22%22,%22linkNumber%22:%22%22,%22accountId%22:%22%22,%22status%22:%22%22,%22remark%22:%22%22%7D&column=createTime&order=desc&field=id,,action,organName,number,materialsList,operTimeStr,userName,materialCount,totalPrice,totalTaxLastMoney,needBackMoney,changeAmount,debt,status&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/sale_back',},
    }
  )

  response = http.post(BASE_URL+'/supplier/findBySelect_cus', '{}', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/sale_back',},
  })

  response = http.get(BASE_URL+'/depot/findDepotByCurrentUser', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/sale_back',},
  })

  response = http.get(BASE_URL+'/user/getUserList', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/sale_back',},
  })

  response = http.get(BASE_URL+'/account/getAccount', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/sale_back',},
  })







  response = http.get(
    BASE_URL+'/depotHead/list?search=%7B%22number%22:%22%22,%22materialParam%22:%22%22,%22type%22:%22%E5%85%A5%E5%BA%93%22,%22subType%22:%22%E5%85%B6%E5%AE%83%22,%22roleType%22:%22%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE%22,%22organId%22:%22%22,%22depotId%22:%22%22,%22creator%22:%22%22,%22linkNumber%22:%22%22,%22status%22:%22%22,%22remark%22:%22%22%7D&column=createTime&order=desc&field=id,,action,organName,number,materialsList,operTimeStr,userName,materialCount,totalPrice,status&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/other_in',},
    }
  )

  response = http.post(BASE_URL+'/supplier/findBySelect_sup', '{}', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/other_in',},
  })

  response = http.get(BASE_URL+'/depot/findDepotByCurrentUser', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/other_in',},
  })

  response = http.get(BASE_URL+'/user/getUserList', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/other_in',},
  })






  response = http.get(
    BASE_URL+'/depotHead/list?search=%7B%22number%22:%22%22,%22materialParam%22:%22%22,%22type%22:%22%E5%87%BA%E5%BA%93%22,%22subType%22:%22%E5%85%B6%E5%AE%83%22,%22roleType%22:%22%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE%22,%22organId%22:%22%22,%22depotId%22:%22%22,%22creator%22:%22%22,%22linkNumber%22:%22%22,%22status%22:%22%22,%22remark%22:%22%22%7D&column=createTime&order=desc&field=id,,action,organName,number,materialsList,operTimeStr,userName,materialCount,totalPrice,status&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/other_out',},
    }
  )

  response = http.post(BASE_URL+'/supplier/findBySelect_cus', '{}', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/other_out',},
  })

  response = http.get(BASE_URL+'/depot/findDepotByCurrentUser', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/other_out',},
  })

  response = http.get(BASE_URL+'/user/getUserList', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/other_out',},
  })






  response = http.get(
    BASE_URL+'/depotHead/list?search=%7B%22number%22:%22%22,%22materialParam%22:%22%22,%22type%22:%22%E5%87%BA%E5%BA%93%22,%22subType%22:%22%E8%B0%83%E6%8B%A8%22,%22roleType%22:%22%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE%22,%22depotId%22:%22%22,%22creator%22:%22%22,%22status%22:%22%22,%22remark%22:%22%22%7D&column=createTime&order=desc&field=id,,action,number,materialsList,operTimeStr,userName,materialCount,totalPrice,status&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/allocation_out',},
    }
  )

  response = http.get(BASE_URL+'/depot/findDepotByCurrentUser', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/allocation_out',},
  })

  response = http.get(BASE_URL+'/user/getUserList', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/allocation_out',},
  })






  response = http.get(
    BASE_URL+'/depotHead/list?search=%7B%22number%22:%22%22,%22materialParam%22:%22%22,%22type%22:%22%E5%85%B6%E5%AE%83%22,%22subType%22:%22%E7%BB%84%E8%A3%85%E5%8D%95%22,%22roleType%22:%22%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE%22,%22depotId%22:%22%22,%22creator%22:%22%22,%22status%22:%22%22,%22remark%22:%22%22%7D&column=createTime&order=desc&field=id,,action,number,materialsList,operTimeStr,userName,materialCount,totalPrice,status&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/assemble',},
    }
  )

  response = http.get(BASE_URL+'/depot/findDepotByCurrentUser', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/assemble',},
  })

  response = http.get(BASE_URL+'/user/getUserList', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/assemble',},
  })





  response = http.get(
    BASE_URL+'/depotHead/list?search=%7B%22number%22:%22%22,%22materialParam%22:%22%22,%22type%22:%22%E5%85%B6%E5%AE%83%22,%22subType%22:%22%E6%8B%86%E5%8D%B8%E5%8D%95%22,%22roleType%22:%22%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE%22,%22depotId%22:%22%22,%22creator%22:%22%22,%22status%22:%22%22,%22remark%22:%22%22%7D&column=createTime&order=desc&field=id,,action,number,materialsList,operTimeStr,userName,materialCount,totalPrice,status&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/disassemble',},
    }
  )

  response = http.get(BASE_URL+'/depot/findDepotByCurrentUser', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/disassemble',},
  })

  response = http.get(BASE_URL+'/user/getUserList', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/bill/disassemble',},
  })








  response = http.get(
    BASE_URL+'/accountHead/list?search=%7B%22billNo%22:%22%22,%22searchMaterial%22:%22%22,%22type%22:%22%E6%94%B6%E5%85%A5%22,%22organId%22:%22%22,%22creator%22:%22%22,%22handsPersonId%22:%22%22,%22accountId%22:%22%22,%22status%22:%22%22,%22remark%22:%22%22,%22roleType%22:%22%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE%22%7D&column=createTime&order=desc&field=id,,action,organName,handsPersonName,billNo,billTimeStr,userName,changeAmount,remark,status&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/item_in',},
    }
  )

  response = http.post(BASE_URL+'/supplier/findBySelect_organ', '{}', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/item_in',},
  })

  response = http.get(BASE_URL+'/user/getUserList', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/item_in',},
  })

  response = http.get(
    BASE_URL+'/person/getPersonByType?type=%E8%B4%A2%E5%8A%A1%E5%91%98',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/item_in',},
    }
  )

  response = http.get(BASE_URL+'/account/getAccount', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/item_in',},
  })







  response = http.get(
    BASE_URL+'/accountHead/list?search=%7B%22billNo%22:%22%22,%22searchMaterial%22:%22%22,%22type%22:%22%E6%94%AF%E5%87%BA%22,%22organId%22:%22%22,%22creator%22:%22%22,%22handsPersonId%22:%22%22,%22accountId%22:%22%22,%22status%22:%22%22,%22remark%22:%22%22,%22roleType%22:%22%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE%22%7D&column=createTime&order=desc&field=id,,action,organName,handsPersonName,billNo,billTimeStr,userName,changeAmount,remark,status&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/item_out',},
    }
  )

  response = http.post(BASE_URL+'/supplier/findBySelect_organ', '{}', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/item_out',},
  })

  response = http.get(BASE_URL+'/user/getUserList', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/item_out',},
  })

  response = http.get(
    BASE_URL+'/person/getPersonByType?type=%E8%B4%A2%E5%8A%A1%E5%91%98',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/item_out',},
    }
  )

  response = http.get(BASE_URL+'/account/getAccount', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/item_out',},
  })





  response = http.get(
    BASE_URL+'/accountHead/list?search=%7B%22billNo%22:%22%22,%22searchMaterial%22:%22%22,%22type%22:%22%E6%94%B6%E6%AC%BE%22,%22organId%22:%22%22,%22creator%22:%22%22,%22handsPersonId%22:%22%22,%22accountId%22:%22%22,%22status%22:%22%22,%22remark%22:%22%22,%22number%22:%22%22,%22roleType%22:%22%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE%22%7D&column=createTime&order=desc&field=id,,action,organName,handsPersonName,billNo,billTimeStr,userName,totalPrice,discountMoney,changeAmount,remark,status&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/money_in',},
    }
  )

  response = http.post(BASE_URL+'/supplier/findBySelect_cus', '{}', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/money_in',},
  })

  response = http.get(BASE_URL+'/user/getUserList', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/money_in',},
  })

  response = http.get(
    BASE_URL+'/person/getPersonByType?type=%E8%B4%A2%E5%8A%A1%E5%91%98',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/money_in',},
    }
  )

  response = http.get(BASE_URL+'/account/getAccount', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/money_in',},
  })







  response = http.get(
    BASE_URL+'/accountHead/list?search=%7B%22billNo%22:%22%22,%22searchMaterial%22:%22%22,%22type%22:%22%E4%BB%98%E6%AC%BE%22,%22organId%22:%22%22,%22creator%22:%22%22,%22handsPersonId%22:%22%22,%22accountId%22:%22%22,%22status%22:%22%22,%22remark%22:%22%22,%22number%22:%22%22,%22roleType%22:%22%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE%22%7D&column=createTime&order=desc&field=id,,action,organName,handsPersonName,billNo,billTimeStr,userName,totalPrice,discountMoney,changeAmount,remark,status&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/money_out',},
    }
  )

  response = http.post(BASE_URL+'/supplier/findBySelect_sup', '{}', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/money_out',},
  })

  response = http.get(BASE_URL+'/user/getUserList', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/money_out',},
  })

  response = http.get(
    BASE_URL+'/person/getPersonByType?type=%E8%B4%A2%E5%8A%A1%E5%91%98',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/money_out',},
    }
  )

  response = http.get(BASE_URL+'/account/getAccount', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/money_out',},
  })






  response = http.get(
    BASE_URL+'/accountHead/list?search=%7B%22billNo%22:%22%22,%22searchMaterial%22:%22%22,%22type%22:%22%E8%BD%AC%E8%B4%A6%22,%22creator%22:%22%22,%22handsPersonId%22:%22%22,%22accountId%22:%22%22,%22status%22:%22%22,%22remark%22:%22%22,%22roleType%22:%22%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE%22%7D&column=createTime&order=desc&field=id,,action,handsPersonName,billNo,billTimeStr,userName,changeAmount,remark,status&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/giro',},
    }
  )

  response = http.get(BASE_URL+'/user/getUserList', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/giro',},
  })

  response = http.get(
    BASE_URL+'/person/getPersonByType?type=%E8%B4%A2%E5%8A%A1%E5%91%98',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/giro',},
    }
  )

  response = http.get(BASE_URL+'/account/getAccount', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/giro',},
  })






  response = http.get(
    BASE_URL+'/accountHead/list?search=%7B%22billNo%22:%22%22,%22searchMaterial%22:%22%22,%22type%22:%22%E6%94%B6%E9%A2%84%E4%BB%98%E6%AC%BE%22,%22organId%22:%22%22,%22creator%22:%22%22,%22handsPersonId%22:%22%22,%22status%22:%22%22,%22remark%22:%22%22,%22roleType%22:%22%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE%22%7D&column=createTime&order=desc&field=id,,action,organName,handsPersonName,billNo,billTimeStr,userName,totalPrice,changeAmount,remark,status&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/advance_in',},
    }
  )

  response = http.post(BASE_URL+'/supplier/findBySelect_retail', '{}', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/advance_in',},
  })

  response = http.get(BASE_URL+'/user/getUserList', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/advance_in',},
  })

  response = http.get(
    BASE_URL+'/person/getPersonByType?type=%E8%B4%A2%E5%8A%A1%E5%91%98',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/advance_in',},
    }
  )

  response = http.get(BASE_URL+'/account/getAccount', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/financial/advance_in',},
  })






  response = http.get(
    BASE_URL+'/material/getListWithStock?categoryId=&materialParam=&zeroStock=0&mpList=&column=createTime&order=desc&field=id,,rowIndex,action,mBarCode,name,standard,model,color,categoryName,unitName,purchaseDecimal,initialStock,currentStock,currentStockPrice&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/material_stock',},
    }
  )

  response = http.get(BASE_URL+'/depot/findDepotByCurrentUser', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/material_stock',},
  })

  response = http.get(BASE_URL+'/materialCategory/getMaterialCategoryTree?id=', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/material_stock',},
  })

  response = http.get(
    BASE_URL+'/depotItem/findDetailByDepotIdsAndMaterialId?depotIds=&materialId=&column=createTime&order=desc&field=id,,,number,type,barCode,materialName,depotName,basicNumber,operTime&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/material_stock',},
    }
  )






  response = http.get(
    BASE_URL+'/account/list?search=%7B%22name%22:%22%22,%22serialNo%22:%22%22%7D&column=createTime&order=desc&field=id,,rowIndex,action,name,serialNo,initialAmount,thisMonthAmount,currentAmount&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/account_report',},
    }
  )

  response = http.get(BASE_URL+'/account/getStatistics?name=&serialNo=', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/account_report',},
  })

  response = http.get(
    BASE_URL+'/account/findAccountInOutList?accountId=&initialAmount=&column=createTime&order=desc&field=id,,,number,type,supplierName,changeAmount,balance,operTime&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/account_report',},
    }
  )







  response = http.get(
    BASE_URL+'/depotItem/buyIn?materialParam=&beginTime=2023-01-01&endTime=2023-02-15&mpList=&roleType=%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE&column=createTime&order=desc&field=id,,rowIndex,barCode,materialName,materialStandard,materialModel,materialOther,materialUnit,inSum,inSumPrice,outSum,outSumPrice,inOutSumPrice&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/buy_in_report',},
    }
  )






  response = http.get(
    BASE_URL+'/depotItem/saleOut?materialParam=&beginTime=2023-01-01&endTime=2023-02-15&mpList=&roleType=%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE&column=createTime&order=desc&field=id,,rowIndex,barCode,materialName,materialStandard,materialModel,materialOther,materialUnit,outSum,outSumPrice,inSum,inSumPrice,outInSumPrice&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/sale_out_report',},
    }
  )







  response = http.get(
    BASE_URL+'/depotHead/findInOutDetail?organId=&number=&materialParam=&depotId=&beginTime=2023-01-01&endTime=2023-02-15&roleType=%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE&type=%E5%85%A5%E5%BA%93&remark=&column=createTime&order=desc&field=id,,rowIndex,number,barCode,mname,standard,model,mUnit,operNumber,unitPrice,allPrice,taxRate,taxMoney,sname,dname,operTime,newRemark&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/in_detail',},
    }
  )

  response = http.get(BASE_URL+'/depot/findDepotByCurrentUser', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/in_detail',},
  })

  response = http.post(BASE_URL+'/supplier/findBySelect_organ', '{}', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/in_detail',},
  })






  response = http.get(
    BASE_URL+'/depotHead/findInOutDetail?organId=&number=&materialParam=&depotId=&beginTime=2023-01-01&endTime=2023-02-15&roleType=%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE&type=%E5%87%BA%E5%BA%93&remark=&column=createTime&order=desc&field=id,,rowIndex,number,barCode,mname,standard,model,mUnit,operNumber,unitPrice,allPrice,taxRate,taxMoney,sname,dname,operTime,newRemark&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/out_detail',},
    }
  )

  response = http.get(BASE_URL+'/depot/findDepotByCurrentUser', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/out_detail',},
  })

  response = http.post(BASE_URL+'/supplier/findBySelect_organ', '{}', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/out_detail',},
  })




  response = http.get(
    BASE_URL+'/depotHead/findAllocationDetail?organId=&number=&materialParam=&depotId=&depotIdF=&beginTime=2023-01-01&endTime=2023-02-15&subType=%E8%B0%83%E6%8B%A8&roleType=%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE&remark=&column=createTime&order=desc&field=id,,rowIndex,number,barCode,mname,standard,model,mUnit,operNumber,unitPrice,allPrice,dname,sname,operTime,newRemark&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/allocation_detail',},
    }
  )

  response = http.get(BASE_URL+'/depot/findDepotByCurrentUser', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/allocation_detail',},
  })

  response = http.post(BASE_URL+'/supplier/findBySelect_sup', '{}', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/allocation_detail',},
  })






  response = http.get(
    BASE_URL+'/depotHead/findInOutMaterialCount?organId=&materialParam=&depotId=&beginTime=2023-01-01&endTime=2023-02-15&type=%E5%85%A5%E5%BA%93&roleType=%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE&column=createTime&order=desc&field=id,,rowIndex,barCode,mName,standard,model,categoryName,materialUnit,numSum,priceSum&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/in_material_count',},
    }
  )

  response = http.get(BASE_URL+'/depot/findDepotByCurrentUser', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/in_material_count',},
  })

  response = http.post(BASE_URL+'/supplier/findBySelect_organ', '{}', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/in_material_count',},
  })






  response = http.get(
    BASE_URL+'/depotHead/findInOutMaterialCount?organId=&materialParam=&depotId=&beginTime=2023-01-01&endTime=2023-02-15&type=%E5%87%BA%E5%BA%93&roleType=%E5%85%A8%E9%83%A8%E6%95%B0%E6%8D%AE&column=createTime&order=desc&field=id,,rowIndex,barCode,mName,standard,model,categoryName,materialUnit,numSum,priceSum&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/out_material_count',},
    }
  )

  response = http.get(BASE_URL+'/depot/findDepotByCurrentUser', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/out_material_count',},
  })

  response = http.post(BASE_URL+'/supplier/findBySelect_organ', '{}', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/out_material_count',},
  })






  response = http.get(
    BASE_URL+'/depotItem/findByAll?depotId=&monthTime=2023-02&materialParam=&mpList=&column=createTime&order=desc&field=id,,rowIndex,barCode,materialName,materialStandard,materialModel,materialOther,unitName,unitPrice,prevSum,inSum,outSum,thisSum,thisAllPrice&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/in_out_stock_report',},
    }
  )

  response = http.get(BASE_URL+'/depot/findDepotByCurrentUser', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/in_out_stock_report',},
  })

  response = http.get(
    BASE_URL+'/depotItem/totalCountMoney?depotId=&monthTime=2023-02&materialParam=&mpList=&column=createTime&order=desc',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/in_out_stock_report',},
    }
  )





  response = http.get(
    BASE_URL+'/depotHead/getStatementAccount?supplierType=%E5%AE%A2%E6%88%B7&organId=&beginTime=2023-01-01&endTime=2023-02-15&column=createTime&order=desc&field=id,,rowIndex,action,supplier,contacts,telephone,phoneNum,email,preNeed,debtMoney,backMoney,allNeed&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/customer_account',},
    }
  )

  response = http.post(BASE_URL+'/supplier/findBySelect_cus', '{}', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/customer_account',},
  })






  response = http.get(
    BASE_URL+'/depotHead/getStatementAccount?supplierType=%E4%BE%9B%E5%BA%94%E5%95%86&organId=&beginTime=2023-01-01&endTime=2023-02-15&column=createTime&order=desc&field=id,,rowIndex,action,supplier,contacts,telephone,phoneNum,email,preNeed,debtMoney,backMoney,allNeed&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/vendor_account',},
    }
  )

  response = http.post(BASE_URL+'/supplier/findBySelect_sup', '{}', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/vendor_account',},
  })







  response = http.get(
    BASE_URL+'/depotItem/findStockWarningCount?materialParam=&depotId=&mpList=&column=createTime&order=desc&field=id,,rowIndex,depotName,barCode,mname,mstandard,mmodel,materialOther,materialUnit,currentNumber,lowSafeStock,highSafeStock,lowCritical,highCritical&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/stock_warning_report',},
    }
  )

  response = http.get(BASE_URL+'/depot/findDepotByCurrentUser', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/report/stock_warning_report',},
  })






  response = http.get(BASE_URL+'/materialCategory/getMaterialCategoryTree?id=', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/material/material_category',},
  })





  response = http.get(
    BASE_URL+'/material/list?search=%7B%22categoryId%22:%22%22,%22materialParam%22:%22%22,%22color%22:%22%22,%22materialOther%22:%22%22,%22weight%22:%22%22,%22expiryNum%22:%22%22,%22enabled%22:%22%22,%22enableSerialNumber%22:%22%22,%22enableBatchNumber%22:%22%22,%22remark%22:%22%22,%22mpList%22:%22%22%7D&column=createTime&order=desc&field=id,&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/material/material',},
    }
  )

  response = http.get(BASE_URL+'/materialCategory/getMaterialCategoryTree?id=', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/material/material',},
  })






  response = http.get(
    BASE_URL+'/unit/list?search=%7B%22name%22:%22%22,%22type%22:%22%22%7D&column=createTime&order=desc&field=id,,,action,name,basicUnit,otherUnit,otherUnitTwo,otherUnitThree,enabled&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/system/unit',},
    }
  )

  response = http.get(
    BASE_URL+'/materialAttribute/list?search=%7B%22attributeName%22:%22%22%7D&column=createTime&order=desc&field=id,,,action,attributeName,attributeValue&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/material/material_attribute',},
    }
  )




  response = http.get(
    BASE_URL+'/supplier/list?search=%7B%22supplier%22:%22%22,%22type%22:%22%E4%BE%9B%E5%BA%94%E5%95%86%22,%22telephone%22:%22%22,%22phonenum%22:%22%22%7D&column=createTime&order=desc&field=id,,,action,supplier,contacts,telephone,phoneNum,email,beginNeedPay,allNeedPay,taxRate,sort,enabled&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/system/vendor',},
    }
  )




  response = http.get(
    BASE_URL+'/account/list?search=%7B%22name%22:%22%22,%22serialNo%22:%22%22,%22remark%22:%22%22%7D&column=createTime&order=desc&field=id,,,action,name,serialNo,initialAmount,currentAmount,remark,sort,enabled,isDefault&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/system/account',},
    }
  )




  response = http.get(
    BASE_URL+'/inOutItem/list?search=%7B%22name%22:%22%22,%22type%22:%22%22,%22remark%22:%22%22%7D&column=createTime&order=desc&field=id,,,action,name,type,remark,sort,enabled&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/system/in_out_item',},
    }
  )






  response = http.get(
    BASE_URL+'/supplier/list?search=%7B%22supplier%22:%22%22,%22type%22:%22%E5%AE%A2%E6%88%B7%22,%22telephone%22:%22%22,%22phonenum%22:%22%22%7D&column=createTime&order=desc&field=id,,,action,supplier,contacts,telephone,phoneNum,email,beginNeedGet,allNeedGet,taxRate,sort,enabled&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/system/customer',},
    }
  )




  response = http.get(
    BASE_URL+'/supplier/list?search=%7B%22supplier%22:%22%22,%22type%22:%22%E4%BC%9A%E5%91%98%22,%22telephone%22:%22%22,%22phonenum%22:%22%22%7D&column=createTime&order=desc&field=id,,,action,supplier,contacts,telephone,phoneNum,email,advanceIn,sort,enabled&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/system/member',},
    }
  )





  response = http.get(
    BASE_URL+'/depot/list?search=%7B%22name%22:%22%22,%22remark%22:%22%22%7D&column=createTime&order=desc&field=id,,,action,name,address,warehousing,truckage,principalName,remark,sort,enabled,isDefault&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/system/depot',},
    }
  )

  response = http.get(BASE_URL+'/user/getUserList', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/system/depot',},
  })



  response = http.get(
    BASE_URL+'/role/list?search=%7B%22name%22:%22%22%7D&column=createTime&order=desc&field=id,,,action,name,type,priceLimitStr,description,sort,enabled&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/system/role',},
    }
  )





  response = http.get(
    BASE_URL+'/user/list?search=%7B%7D&column=createTime&order=desc&field=id,,,action,loginName,username,userType,roleName,orgAbr,phonenum,userBlngOrgaDsplSeq,status&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/system/user',},
    }
  )

  response = http.get(BASE_URL+'/systemConfig/getCurrentInfo', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/system/user',},
  })





  response = http.get(BASE_URL+'/organization/getOrganizationTree?id=', {
   headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/system/organization',},
  })





  response = http.get(
    BASE_URL+'/log/list?search=%7B%22operation%22:%22%22,%22content%22:%22%22,%22createTimeRange%22:[],%22userInfo%22:%22%22,%22clientIp%22:%22%22,%22status%22:%22%22%7D&column=createTime&order=desc&field=id,,,operation,content,loginName,userName,status,clientIp,createTimeStr&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/system/log',},
    }
  )






  response = http.get(
    BASE_URL+'/systemConfig/list?search=%7B%22companyName%22:%22%22%7D&currentPage=1&pageSize=10',
    {
     headers: {"Content-Type": "application/json", "Accept": "*/*",'X-Access-Token': `${jsonBody.data.token}`,Referer: 'http://ca.com/system/system_config',},
    }
  )



  // Automatically added sleep
  sleep(1)
}
