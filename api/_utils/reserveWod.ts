import cheerio from "cheerio";
import axios from "axios";
const FormData = require("form-data");
import fs from "fs";
import pretty from "pretty-format";
import path from "path";

import stringifyCookie from "./stringifyCookie";
import stringifyFormData from "./stringifyFormData";
import {
  wodCookie,
  todaysSchedule,
  formData,
  tmpFormValueFilename,
  BOWERY_CROSSFIT_GYM_NAME
} from "./constants";
import constructFormData from "./constructFormData";

const reserveWod = async ( { wodTime }: {wodTime: string}) => {
  const result = await axios.get(todaysSchedule, {
    headers: {
      Cookie: stringifyCookie(wodCookie)
    },
    withCredentials: true
  });
  const $ = cheerio.load(result.data);
  const __OSVSTATE = $("input#__OSVSTATE").val();
  const __VIEWSTATEGENERATOR = $("input#__VIEWSTATEGENERATOR").val();

  const wodSchedule = $("tr");
  const bowerySchedule = wodSchedule.filter(function() {
    return (
      $(this)
        .find("span.Text_Note")
        .first()
        .text() == BOWERY_CROSSFIT_GYM_NAME
    );
  });

  const wodToSchedule = bowerySchedule.filter(function() {
    return (
      $(this)
        .find("span")
        .first()
        .text() === wodTime
    );
  });

  const __EVENTTARGET = wodToSchedule
    .find("input[value='Sign In']")
    .attr("name");
    if (__EVENTTARGET && __VIEWSTATEGENERATOR && __OSVSTATE) {
      // console.log('post body for today: ' + todaysSchedule)
      // console.log(
      //     stringifyFormData({
      //       ...formData,
      //       __OSVSTATE,
      //       __VIEWSTATEGENERATOR,
      //       __EVENTTARGET,
      //       wt51$wtMainContent$wtDate_Input: "12/04/2021",
      //       wt51$wtMainContent$W_Utils_UI_wt41$block$wtDateInputFrom: "12/04/2021"
      //     })
      // )
      const postURL = `https://app.wodify.com/Mobile/Class_Schedule.aspx?_ts=${encodeURIComponent(Date.now())}`;
      console.log(`Posting to URL: ${postURL}`)
      // const stringifiedData = stringifyFormData({
      //     ...formData,
      //     // __OSVSTATE,
      //     __OSVSTATE: '0I3fuhB08F9aWv9knjdPAPi7uTwEs12czgN40+GSff5YnkKR+rsuGMc4vRzsYNprqySZrE8Aw+o5G4A3x6cl6HhP0yl5GF6Tx7LGfrbZgPDF/+VIVkaWhSe2NAWX7Rjr0iBZjsfQ39mA3HxpBWrO5keT+c3QqxxcSDdm81iWlgiWu+g76DUlKtkZUsU1x4gmpm7Fkd3FPpjkgLIxbRYEP81DoQOyLOntmemfogWRoIk6uaQ+wnU552Rc46+wZEUByu/O/Zr+3bfzC47yAaamJoRgJM9GQtFqOaA2ranHbw+40rpseRt/bwTkxNdAhhJ4AWK67wYGRr6GmvZVMFkrpAFuU3Ds8uo25aK+tRKyrncBUB8An6W2b6UwBqzf3BfgiK40rDX1gjhwLMzWcwnYvue0Bj3nYL7+lM6AvVmImRR+cYwNmpfXZeO15NHrcnyH66upKAw40sXr+2plZeXlpjOys+0d4z4CyO1VmSfh7pcsngvCIQW5Gd648ii0iuYzfsXd0pvBt0xhohsAtagNJGmjBejydV8SBhyormyWbiYfPZc2DqDPOj9foPh/ZYSbNdRXsbl2lnzWy2Trla6MHyQpU+c0AGSwfW/pVEUtbfHQNRM+qxsslxP3NXh4Vj0tIU8ELyo6hU91d8vKzgZs4Bfmy2py5W7BAAyNIl7PQ11E5raVudbnnFTGjaYUVVUauBq58spoZzrTwR/vP3sExbY4FJXjNQkrI1XK6+lI0/Yql/jyHe/6BAze1bJNnnCAXTL0tqNFcj1rPImxu1hr6yDZnZDZv0Bwq06kCf1RSdmJfdIqqXGrbz5hc1QdGdl36zgjCDDqFClOXbB73Wywwdi9b6lkTn2Y2LfyHOccxoCT5KxQ7ltRM//anI0Uf+b3FhwgLbunKVQcOpmSQG+ITmdktI90obUz6OK1+rDGdZGZswvcau9f2Cste6yzrdT/zCJTiAZnta/k7/A8eAzItOXMPiw22g+mpq/2pdkK/IJ9OqIWWSqIvHOnQCWKL6vEHdyD6tYleLDfjjTtrlh4oebmXbh2UO2GZ7+pRB/nzqW7X55uNpG73mVbPVwRIzaFvwOpDRrG1bp9e6jOJNa9F1e46ZY0gonuQfCx1Yo1gjY9qxWY6DtdS6rQk299Bx2XdkKfPZUrabw9lPgQegZuzDenCE1CtyAsdXPDC1Gu3KcYQLgi3NHXzZwx94tvBsPqzajtTjG4tp9bWO5uh8rnUNTp/SjNhKC8A7X/6xv2eaRbGhE1Hq5cXYXqMjuwij+FQJXGqq3OwKEUWpAOc7VAgPi0ntHFShUx2fVJWE97orSfQqqAFUl/q7zTPAbKS779gNvsSI5F42J+XyFRqlIOCATfocEUDEgLbcQYLpm6UrzjWWLVxuX/JpLtqGBd+XimAueEh5EHb7et9vEjZuA6d7DLgco4dFmeAfo1wQ2SsrDrEuTlKZkQNx7B8sgnliTJBjUJd6CPMo4apu9xzAWSNrYm/tRQwXCRhjBkmQOAYWbnqsAAu5Rc0kSQVCiCm7t+8g7v4XkplBSZ2Q0aNLwlLMX+0JahSMHgTElmBY9ORXnoJvbfBo45hi2ek76pJ1f6mBHj8PWoN+lx17tUwFzIvEW4MImqVLWkLMjeHEWF4orE+qIDM9356iUGLZGE+bsmQBPeBIq1SIX7Rp+7vp5jhyzGTeD5wGUQYFaA37l+9glc1cLQbSfPgjF6dzqUYW63',
      //     __VIEWSTATEGENERATOR,
      //     // __EVENTTARGET,
      //     __EVENTTARGET: 'wt51$wtMainContent$wtClassTable$ctl03$wt43',
      //     wt51$wtMainContent$wtDate_Input: "12/04/2021",
      //     wt51$wtMainContent$W_Utils_UI_wt41$block$wtDateInputFrom: "12/04/2021"
      // });

      let formData = constructFormData({
          '__EVENTTARGET': 'wt51$wtMainContent$wtClassTable$ctl03$wt43',
          '__EVENTARGUMENT': '',
          '__OSVSTATE': 'W7gjd2Y1IAOPjYhylnVGYQOE/vuAdFLjgi1MdgVsN4YbCwMFj95ojPU9pBdmOy5B5JdrJjVzUpcoauf4NY2Le+HYlng87MLjg/bfG5KK1PrLIbsDnepUi/wVBcjMolf0MuKgn0+Ko/neTfCY6hPz7sUzP2t/pWSza3iVqEStO1Yjmgau5YaqN+xZNJu8pq1oEFouUfbq2fDpCQLrKaOIZGs2Blm6XBLkUnTmlrINVl75RV4G76caJW3t5z+jAYyhohKx+TaPneRd1Nw8kVvYUpi8Ji0QZkGv4rL7IwYRlgd7L8TCy1wtKIBUpojbEnsrikStjJSJikhRlg26CZahSTQ9oRD4izTsFCAGymope1kAipPz+Oe8Fhai4jRA4qRCeM9tT3xu4ItCjmP5qOF7LBFAUWcIwUQvrxvvSi3jYCPKBtVDjGJ+8IYmt6C8h9O24HjyK1JP3dugIaROwwaSafU49GFdgO0uMguzJU8JrX5zRQTv7Vq/Xweh0UvMseUYmwsfzhr1/2Vz+K7U2RhngR5LGxStd2YPr9+JI+/2qhveDzM0ew8nMhLsvd1D1hXOlzZHPzEk7py87ekh1wW9IXMY0sjXIDdrRonA48RLeiI+v6csSiiovMSzYt7Ndz68ePeGzkvArmY56IRx0fi3+pS8XrD6H0gSOaCNfDCGV9PU2x14/PdLclBKExB3o/jpaoJHkDKZf9hD4Ayqd45OblveIT5gkaGgsVQC7++ZoLaVQ0VA3Hr6AeVd2VRU3wE2mCh/jE4nkVOd28VUvQk9WrvrzgSHz8ZNHQQlL45MsC8dQWRuulzTZXXN10W6gzjwmBUuc2PpZcrPbQOMhkPCbe7UBzbfISBHPEbVXHFHPeV/iAkM7nJGa2N5GCfeAdrNEzBwfEnAmb80Qk0FDnXq08oBV6YYLysbiu6WdFfBTbJKXY50k1qO64/tyQC1SmNwPmtKpPgqY08Z/x+0JrWtBYQ8OJRRl5jLOnQbxY1jUfOhFtuVK5sPesazoTtzGvYM6hD0eF4XCXzJxfir20qPfivkQ/yxgKqy7N2QcFqXiq1a3IJXiYRjMVcUdNUXHhY3Kzq06B7eEPgJMVxy0t/+EBIeAyMzm/yhDX8gLDnjCGVjnd197cPw3m5xaLg7D1pgR0L47y+aGOby7nMfAcLeTlYwwjJ2vHTJ1wJd2Ig2HWLmt5msOulVMKdwkzXNtTYchflcTVFQUL5mZrjbvtSBdmLj2ntesQQoKqJBjBmoM2kkOvKu+o1r4k2Gv1f2ZlZbvzMBjSJ4WNmwFinhRGtKakU5kO0BqEP7mWflZjiaVlPijjATZxOJmbbkAqygpwLNKjgJk6WHRDILXeFsZ/3fRHViWajfJpvBl698VcT8zjLcgdl+bf7CNIXN5w9I54KlP/cjn4FvLluI73ieZJ+sQ78VxKLe13nSmDrQGOOQuX383qrW1EMjjpu49LRpr5LAqKl+gJpx3qL6aNHkNfLDZ1zRDHHjB6hfiHLMgrJHqAu8dnKu3brOVm3EaIqq251yVFp56bhHqL5xpeGXsoaciR0c5UYmgMymBmpdDs+FDKa+gZXuY0l/EK9duanaOl6je6yc8L+Germo4QdWYexERRyIN4/yRi7trFfmzZB2EbI/V5WO3kWiUXwmx3zdPDU85gmPIxH8GoOyJ0zI4N+0b8zrkp3cRctc5FVAtBjwKDWSQcVc3NromDnE3g4kG3sSY/EaMuePrNT4Pawd/Ytu+A==',
          '__VIEWSTATE': '',
          '__VIEWSTATEGENERATOR': 'F25D7ADC',
          'wt51$wtMainContent$wtDate_Input:': '02/15/2021',
          'wt51$wtMainContent$W_Utils_UI_wt41$block$wtDateInputFrom': '02/15/2021',
          'wt51$wtMainContent$wt125': '__ossli_0',
          'wt51$wtMainContent$wt15': '__ossli_0',
          'wt51$Mobile_UI_wt21$block$wt13$wttxtuContent': '',
          'wt51$Mobile_UI_wt21$block$wt13$wttxtOnStart': ''
      });
      const reserveResult = await axios.post(
          'https://app.wodify.com/Mobile/Class_Schedule.aspx?_ts=' + Date.now(),
        formData,
        {
          headers: {
              // 'cache-control': 'no-cache',
              // 'Content-Type': 'multipart/form-data;',
              // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
              // 'Accept': '*/*',
              // 'Accept-Encoding': 'gzip, deflate, br',
              // 'Connection': 'keep-alive',
              'cookie': 'navigatedBack=false; ASP.NET_SessionId=keegzl5ldzen5mjijjyi3tso; osVisitor=4b91f9b2-c7f4-4b0a-ade9-d6ccbb2e1ff3; _gid=GA1.2.2002120777.1644953533; __zlcmid=18Yki22dNDmkgqK; nr1W_Theme_UI=lid%3d0sRCiNXt%2bZ39VtE%2b1BQp7Q%3d%3dHfaj%2fOI%2fxdKUmUW45MHKDQ%3d%3d%3btuu%3d63780554017%3bexp%3d63780555517%3brhs%3dKeLuvmWKLDW%2fTaLyG9g82m0qo%2bk%3d%3bhmc%3dtFOxK2df8oyCbwb%2b28Tl1FtKpAA%3d; nr2W_Theme_UI=crf%3dqc8kOBG%2bH9YjS1oppP7ciRAC9lc%3d%3buid%3d3544249%3bunm%3dt_8642_brennonplee%40gmail.com; CordovaVersion=; osVisit=9740d79e-ea92-4228-a4e0-671d5026c894; AuthenticationToken=c3L6sWI74iudV8s3JpBkfGUNEQrgBSeqtXXR3KCOvvUsyt39s9; _ga_64NZMPNR0G=GS1.1.1644964992.3.0.1644965005.0; _ga=GA1.2.640970088.1644953435; W_Theme_UI.sid=11738364575954256853883203439365191669; pageLoadedFromBrowserCache=true; _gali=wt51_wtMainContent_wtClassTable',
              ...formData.getHeaders(),
            // Cookie: "navigatedBack=false; hubspotutk=7ea5d6c4f17f91a756cf68aabcfbe3ad; osVisitor=37d4e054-f340-4c3e-96f6-367f9c2aa5d7; IsPhoneGapClient=True; DeviceUUID=1eb96512ff049337863ca8e0a1be9ed3aad85b1590dada74a9c4703059761ad1; _gcl_au=1.1.159956912.1636417321; __hstc=3148015.7ea5d6c4f17f91a756cf68aabcfbe3ad.1626905650597.1631493801012.1636417321633.3; __hssrc=1; __zlcmid=16ykT0HBtbLBBU5; AuthenticationToken=LoggedOut; nr1W_Theme_UI=lid%3d4SKEFPohlu0kCodzDxbsdw%3d%3dR0lJnYJOayNnswcjOqG4Zw%3d%3d%3btuu%3d63772020458%3bexp%3d63772021958%3brhs%3dKeLuvmWKLDW%2fTaLyG9g82m0qo%2bk%3d%3bhmc%3dGjhSxZ6B3Weh639J9uuJGDJjelI%3d; nr2W_Theme_UI=crf%3d3tfb%2fg9U5qvEopkDflFVyIQjf%2fE%3d%3buid%3d3544249%3bunm%3dt_8642_brennonplee%40gmail.com; _ga_64NZMPNR0G=GS1.1.1636422165.6.1.1636423366.0; _ga=GA1.2.1071575358.1626905650; osVisit=916b62f9-7d02-49d2-9f96-e0cb93a6ff34; _gid=GA1.2.1589200835.1638655188; ASP.NET_SessionId=v1esikzdabkohuypczj5zwnl; W_Theme_UI.sid=1390831925219806624312909405415684507420; W_Theme_UI=c8ec8fbe-8384-4626-96f1-50cffbe5e60f; pageLoadedFromBrowserCache=true; _gat=1; _gali=wt51_wtMainContent_wtClassTable",
            // "Accept-Encoding": "gzip, deflate, br",
            // cookie: "navigatedBack=false; hubspotutk=7ea5d6c4f17f91a756cf68aabcfbe3ad; osVisitor=37d4e054-f340-4c3e-96f6-367f9c2aa5d7; IsPhoneGapClient=True; DeviceUUID=1eb96512ff049337863ca8e0a1be9ed3aad85b1590dada74a9c4703059761ad1; _gcl_au=1.1.159956912.1636417321; __hstc=3148015.7ea5d6c4f17f91a756cf68aabcfbe3ad.1626905650597.1631493801012.1636417321633.3; __hssrc=1; __zlcmid=16ykT0HBtbLBBU5; AuthenticationToken=LoggedOut; nr1W_Theme_UI=lid%3d4SKEFPohlu0kCodzDxbsdw%3d%3dR0lJnYJOayNnswcjOqG4Zw%3d%3d%3btuu%3d63772020458%3bexp%3d63772021958%3brhs%3dKeLuvmWKLDW%2fTaLyG9g82m0qo%2bk%3d%3bhmc%3dGjhSxZ6B3Weh639J9uuJGDJjelI%3d; nr2W_Theme_UI=crf%3d3tfb%2fg9U5qvEopkDflFVyIQjf%2fE%3d%3buid%3d3544249%3bunm%3dt_8642_brennonplee%40gmail.com; _ga_64NZMPNR0G=GS1.1.1636422165.6.1.1636423366.0; _ga=GA1.2.1071575358.1626905650; osVisit=916b62f9-7d02-49d2-9f96-e0cb93a6ff34; _gid=GA1.2.1589200835.1638655188; ASP.NET_SessionId=v1esikzdabkohuypczj5zwnl; W_Theme_UI.sid=1390831925219806624312909405415684507420; W_Theme_UI=c8ec8fbe-8384-4626-96f1-50cffbe5e60f; pageLoadedFromBrowserCache=true; _gat=1; _gali=wt51_wtMainContent_wtClassTable",
            // "content-type": "application/x-www-form-urlencoded",
            // accept: "text/plain, */*; q=0.01",
            // "user-agent": "PostmanRuntime/7.26.8"
            // // "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
            //   // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36"
          }
        }
      );
      console.log(reserveResult);
      const $result = cheerio.load(reserveResult.data);
      const title = $result("div#wt5_wtTitle");
      if (title.text().trim().toLowerCase().includes('internal error')) {
          console.log('Something went wrong');
          return false;
      }
      if (title.text().trim().toLowerCase().includes('coachboard')) {
          console.log("SUCCESS!");
      }
      const NEW__OSVSTATE = $result("input#__OSVSTATE").val();
      const NEW__VIEWSTATEGENERATOR = $result("input#__VIEWSTATEGENERATOR").val();

      // Persist form values for form submission
      fs.writeFileSync(
        tmpFormValueFilename,
        `{__OSVSTATE: ${NEW__OSVSTATE}, VIEWSTATEGENERATOR: ${NEW__VIEWSTATEGENERATOR}}`,
        "utf8"
      );

      return true;
    } else {
      return false;
    }
};

export default reserveWod;
