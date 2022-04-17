import { NowRequest, NowResponse } from "@now/node";

import reserveWod from "./_utils/reserveWod";

// export default async (req: NowRequest, res: NowResponse) => {
//   // const {
//   //   body: { wodDate, wodTime }
//   // } = req;
//   const success = await reserveWod({ wodTime: "7:45 PM" });
//   res.json({ success });
// };

export async function fetchReserveWod () {
  const success = await reserveWod({ wodTime: "12:01 AM" });
  console.log(success)

  // Below works!

  // var request = require('request');
  // var options = {
  //   'method': 'POST',
  //   'url': 'https://app.wodify.com/Mobile/Class_Schedule.aspx?_ts=1638656718347',
  //   'headers': {
  //     'cache-control': 'no-cache',
  //     'Content-Type': 'multipart/form-data;',
  //     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
  //     'Accept': '*/*',
  //     'Accept-Encoding': 'gzip, deflate, br',
  //     'Connection': 'keep-alive',
  //     'cookie': 'navigatedBack=false; hubspotutk=7ea5d6c4f17f91a756cf68aabcfbe3ad; osVisitor=37d4e054-f340-4c3e-96f6-367f9c2aa5d7; IsPhoneGapClient=True; DeviceUUID=1eb96512ff049337863ca8e0a1be9ed3aad85b1590dada74a9c4703059761ad1; _gcl_au=1.1.159956912.1636417321; __hstc=3148015.7ea5d6c4f17f91a756cf68aabcfbe3ad.1626905650597.1631493801012.1636417321633.3; __hssrc=1; __zlcmid=16ykT0HBtbLBBU5; AuthenticationToken=LoggedOut; nr1W_Theme_UI=lid%3d4SKEFPohlu0kCodzDxbsdw%3d%3dR0lJnYJOayNnswcjOqG4Zw%3d%3d%3btuu%3d63772020458%3bexp%3d63772021958%3brhs%3dKeLuvmWKLDW%2fTaLyG9g82m0qo%2bk%3d%3bhmc%3dGjhSxZ6B3Weh639J9uuJGDJjelI%3d; nr2W_Theme_UI=crf%3d3tfb%2fg9U5qvEopkDflFVyIQjf%2fE%3d%3buid%3d3544249%3bunm%3dt_8642_brennonplee%40gmail.com; _ga_64NZMPNR0G=GS1.1.1636422165.6.1.1636423366.0; _ga=GA1.2.1071575358.1626905650; osVisit=916b62f9-7d02-49d2-9f96-e0cb93a6ff34; _gid=GA1.2.1589200835.1638655188; ASP.NET_SessionId=v1esikzdabkohuypczj5zwnl; W_Theme_UI.sid=1390831925219806624312909405415684507420; W_Theme_UI=c8ec8fbe-8384-4626-96f1-50cffbe5e60f; pageLoadedFromBrowserCache=true; _gat=1; _gali=wt51_wtMainContent_wtClassTable'
  //   },
  //   formData: {
  //     '__EVENTTARGET': 'wt51$wtMainContent$wtClassTable$ctl03$wt43',
  //     '__EVENTARGUMENT': '',
  //     '__OSVSTATE': '0I3fuhB08F9aWv9knjdPAPi7uTwEs12czgN40+GSff5YnkKR+rsuGMc4vRzsYNprqySZrE8Aw+o5G4A3x6cl6HhP0yl5GF6Tx7LGfrbZgPDF/+VIVkaWhSe2NAWX7Rjr0iBZjsfQ39mA3HxpBWrO5keT+c3QqxxcSDdm81iWlgiWu+g76DUlKtkZUsU1x4gmpm7Fkd3FPpjkgLIxbRYEP81DoQOyLOntmemfogWRoIk6uaQ+wnU552Rc46+wZEUByu/O/Zr+3bfzC47yAaamJoRgJM9GQtFqOaA2ranHbw+40rpseRt/bwTkxNdAhhJ4AWK67wYGRr6GmvZVMFkrpAFuU3Ds8uo25aK+tRKyrncBUB8An6W2b6UwBqzf3BfgiK40rDX1gjhwLMzWcwnYvue0Bj3nYL7+lM6AvVmImRR+cYwNmpfXZeO15NHrcnyH66upKAw40sXr+2plZeXlpjOys+0d4z4CyO1VmSfh7pcsngvCIQW5Gd648ii0iuYzfsXd0pvBt0xhohsAtagNJGmjBejydV8SBhyormyWbiYfPZc2DqDPOj9foPh/ZYSbNdRXsbl2lnzWy2Trla6MHyQpU+c0AGSwfW/pVEUtbfHQNRM+qxsslxP3NXh4Vj0tIU8ELyo6hU91d8vKzgZs4Bfmy2py5W7BAAyNIl7PQ11E5raVudbnnFTGjaYUVVUauBq58spoZzrTwR/vP3sExbY4FJXjNQkrI1XK6+lI0/Yql/jyHe/6BAze1bJNnnCAXTL0tqNFcj1rPImxu1hr6yDZnZDZv0Bwq06kCf1RSdmJfdIqqXGrbz5hc1QdGdl36zgjCDDqFClOXbB73Wywwdi9b6lkTn2Y2LfyHOccxoCT5KxQ7ltRM//anI0Uf+b3FhwgLbunKVQcOpmSQG+ITmdktI90obUz6OK1+rDGdZGZswvcau9f2Cste6yzrdT/zCJTiAZnta/k7/A8eAzItOXMPiw22g+mpq/2pdkK/IJ9OqIWWSqIvHOnQCWKL6vEHdyD6tYleLDfjjTtrlh4oebmXbh2UO2GZ7+pRB/nzqW7X55uNpG73mVbPVwRIzaFvwOpDRrG1bp9e6jOJNa9F1e46ZY0gonuQfCx1Yo1gjY9qxWY6DtdS6rQk299Bx2XdkKfPZUrabw9lPgQegZuzDenCE1CtyAsdXPDC1Gu3KcYQLgi3NHXzZwx94tvBsPqzajtTjG4tp9bWO5uh8rnUNTp/SjNhKC8A7X/6xv2eaRbGhE1Hq5cXYXqMjuwij+FQJXGqq3OwKEUWpAOc7VAgPi0ntHFShUx2fVJWE97orSfQqqAFUl/q7zTPAbKS779gNvsSI5F42J+XyFRqlIOCATfocEUDEgLbcQYLpm6UrzjWWLVxuX/JpLtqGBd+XimAueEh5EHb7et9vEjZuA6d7DLgco4dFmeAfo1wQ2SsrDrEuTlKZkQNx7B8sgnliTJBjUJd6CPMo4apu9xzAWSNrYm/tRQwXCRhjBkmQOAYWbnqsAAu5Rc0kSQVCiCm7t+8g7v4XkplBSZ2Q0aNLwlLMX+0JahSMHgTElmBY9ORXnoJvbfBo45hi2ek76pJ1f6mBHj8PWoN+lx17tUwFzIvEW4MImqVLWkLMjeHEWF4orE+qIDM9356iUGLZGE+bsmQBPeBIq1SIX7Rp+7vp5jhyzGTeD5wGUQYFaA37l+9glc1cLQbSfPgjF6dzqUYW63',
  //     '__VIEWSTATE': '',
  //     '__VIEWSTATEGENERATOR': 'F25D7ADC',
  //     'wt51$wtMainContent$wtDate_Input:': '12/04/2021',
  //     'wt51$wtMainContent$W_Utils_UI_wt41$block$wtDateInputFrom': '12/04/2021',
  //     'wt51$wtMainContent$wt125': '__ossli_0',
  //     'wt51$wtMainContent$wt15': '__ossli_0',
  //     'wt51$Mobile_UI_wt21$block$wt13$wttxtuContent': '',
  //     'wt51$Mobile_UI_wt21$block$wt13$wttxtOnStart': ''
  //   }
  // };
  // request(options, function (error: any, response: any) {
  //   if (error) throw new Error(error);
  //   console.log(response.body);
  // });


};

fetchReserveWod();