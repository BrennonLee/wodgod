
async function fetchTodaysSchedule() {
  const axios = require('axios');

  return axios.get('https://app.wodify.com/Mobile/Class_Schedule.aspx', {
    headers: {
      Cookie: 'hubspotutk=7ea5d6c4f17f91a756cf68aabcfbe3ad; osVisitor=37d4e054-f340-4c3e-96f6-367f9c2aa5d7; IsPhoneGapClient=True; DeviceUUID=1eb96512ff049337863ca8e0a1be9ed3aad85b1590dada74a9c4703059761ad1; __zlcmid=16ykT0HBtbLBBU5; AuthenticationToken=LoggedOut; _gcl_au=1.1.740848671.1644952620; _fbp=fb.1.1644952620048.1374924557; DEVICE_TYPE=desktop; _gid=GA1.2.1392516694.1645129232; __hstc=3148015.7ea5d6c4f17f91a756cf68aabcfbe3ad.1626905650597.1644952620263.1645129231785.5; __hssrc=1; __hssc=3148015.1.1645129231785; nr1W_Theme_UI=lid%3dmhYwq7pZYkUpg8wel%2bP31g%3d%3dz2YTKZsCR1RZTgtJaiveDw%3d%3d%3btuu%3d63780726336%3bexp%3d63780727836%3brhs%3dKeLuvmWKLDW%2fTaLyG9g82m0qo%2bk%3d%3bhmc%3dSg4luVOMzDnSQn1WvMSANHw71AE%3d; nr2W_Theme_UI=crf%3ddzhoUQb803NaUzw0Sye6BeozsPA%3d%3buid%3d3544249%3bunm%3dt_8642_brennonplee%40gmail.com; ASP.NET_SessionId=xr3usnmgd1w2olgnvtnd03uv; osVisit=add57ab7-9b2e-4721-80a3-7a807f69402b; W_Theme_UI.sid=25585255626132829057172403258882820448; _ga=GA1.2.1071575358.1626905650; _ga_64NZMPNR0G=GS1.1.1645129233.10.1.1645129262.0; _gat=1; pageLoadedFromBrowserCache=true; _gali=wt51_wtMainContent_wtClassTable_ctl04_wt115',
    },
    withCredentials: true
  });
}

async function fetchOVSForDateFrom(wodDate, osvState, wodTime) {
  const axios = require('axios');
  const FormData = require('form-data');
  const cheerio = require('cheerio');

  const data = new FormData();
  data.append('__EVENTTARGET', 'wt51$wtMainContent$W_Utils_UI_wt41$block$wtDateInputFrom');
  data.append('__EVENTARGUMENT', '');
  // state determines the date
  data.append('__OSVSTATE', osvState);
  data.append('__VIEWSTATE', '');
  data.append('__VIEWSTATEGENERATOR', 'F25D7ADC');
  data.append('wt51$wtMainContent$wtDate_Input:', wodDate);
  data.append('wt51$wtMainContent$W_Utils_UI_wt41$block$wtDateInputFrom', wodDate);
  data.append('wt51$wtMainContent$wt125', '__ossli_0');
  data.append('wt51$wtMainContent$wt15', '__ossli_0');
  data.append('wt51$Mobile_UI_wt21$block$wt13$wttxtuContent', '');
  data.append('wt51$Mobile_UI_wt21$block$wt13$wttxtOnStart', '');

  const config = {
    method: 'post',
    url: 'https://app.wodify.com/Mobile/Class_Schedule.aspx?_ts=' + Date.now(),
    headers: {
      'cookie': 'hubspotutk=7ea5d6c4f17f91a756cf68aabcfbe3ad; osVisitor=37d4e054-f340-4c3e-96f6-367f9c2aa5d7; IsPhoneGapClient=True; DeviceUUID=1eb96512ff049337863ca8e0a1be9ed3aad85b1590dada74a9c4703059761ad1; __zlcmid=16ykT0HBtbLBBU5; AuthenticationToken=LoggedOut; _gcl_au=1.1.740848671.1644952620; _fbp=fb.1.1644952620048.1374924557; DEVICE_TYPE=desktop; _gid=GA1.2.1392516694.1645129232; __hstc=3148015.7ea5d6c4f17f91a756cf68aabcfbe3ad.1626905650597.1644952620263.1645129231785.5; __hssrc=1; __hssc=3148015.1.1645129231785; nr1W_Theme_UI=lid%3dmhYwq7pZYkUpg8wel%2bP31g%3d%3dz2YTKZsCR1RZTgtJaiveDw%3d%3d%3btuu%3d63780726336%3bexp%3d63780727836%3brhs%3dKeLuvmWKLDW%2fTaLyG9g82m0qo%2bk%3d%3bhmc%3dSg4luVOMzDnSQn1WvMSANHw71AE%3d; nr2W_Theme_UI=crf%3ddzhoUQb803NaUzw0Sye6BeozsPA%3d%3buid%3d3544249%3bunm%3dt_8642_brennonplee%40gmail.com; ASP.NET_SessionId=xr3usnmgd1w2olgnvtnd03uv; osVisit=add57ab7-9b2e-4721-80a3-7a807f69402b; W_Theme_UI.sid=25585255626132829057172403258882820448; _ga=GA1.2.1071575358.1626905650; _ga_64NZMPNR0G=GS1.1.1645129233.10.1.1645129262.0; _gat=1; pageLoadedFromBrowserCache=true; _gali=wt51_wtMainContent_wtClassTable_ctl04_wt115',
      ...data.getHeaders()
    },
    data: data
  };

  return axios(config)
    .then(function (response) {
      const $result = cheerio.load(response.data);
      return $result("input#__OSVSTATE").val();
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function fetchOVSForDate(wodDate, ovsstate, wodTime) {
  const axios = require('axios');
  const FormData = require('form-data');
  const cheerio = require('cheerio');

  const data = new FormData();
  data.append('__EVENTTARGET', 'wt51$wtMainContent$wtDate_Input');
  data.append('__EVENTARGUMENT', '');
  // state determines the date
  data.append('__OSVSTATE', ovsstate);
  data.append('__VIEWSTATE', '');
  data.append('__VIEWSTATEGENERATOR', 'F25D7ADC');
  data.append('wt51$wtMainContent$wtDate_Input:', wodDate);
  data.append('wt51$wtMainContent$W_Utils_UI_wt41$block$wtDateInputFrom', wodDate);
  data.append('wt51$wtMainContent$wt125', '__ossli_0');
  data.append('wt51$wtMainContent$wt15', '__ossli_0');
  data.append('wt51$Mobile_UI_wt21$block$wt13$wttxtuContent', '');
  data.append('wt51$Mobile_UI_wt21$block$wt13$wttxtOnStart', '');

  const config = {
    method: 'post',
    url: 'https://app.wodify.com/Mobile/Class_Schedule.aspx?_ts=' + Date.now(),
    headers: {
      'cookie': 'hubspotutk=7ea5d6c4f17f91a756cf68aabcfbe3ad; osVisitor=37d4e054-f340-4c3e-96f6-367f9c2aa5d7; IsPhoneGapClient=True; DeviceUUID=1eb96512ff049337863ca8e0a1be9ed3aad85b1590dada74a9c4703059761ad1; __zlcmid=16ykT0HBtbLBBU5; AuthenticationToken=LoggedOut; _gcl_au=1.1.740848671.1644952620; _fbp=fb.1.1644952620048.1374924557; DEVICE_TYPE=desktop; _gid=GA1.2.1392516694.1645129232; __hstc=3148015.7ea5d6c4f17f91a756cf68aabcfbe3ad.1626905650597.1644952620263.1645129231785.5; __hssrc=1; __hssc=3148015.1.1645129231785; nr1W_Theme_UI=lid%3dmhYwq7pZYkUpg8wel%2bP31g%3d%3dz2YTKZsCR1RZTgtJaiveDw%3d%3d%3btuu%3d63780726336%3bexp%3d63780727836%3brhs%3dKeLuvmWKLDW%2fTaLyG9g82m0qo%2bk%3d%3bhmc%3dSg4luVOMzDnSQn1WvMSANHw71AE%3d; nr2W_Theme_UI=crf%3ddzhoUQb803NaUzw0Sye6BeozsPA%3d%3buid%3d3544249%3bunm%3dt_8642_brennonplee%40gmail.com; ASP.NET_SessionId=xr3usnmgd1w2olgnvtnd03uv; osVisit=add57ab7-9b2e-4721-80a3-7a807f69402b; W_Theme_UI.sid=25585255626132829057172403258882820448; _ga=GA1.2.1071575358.1626905650; _ga_64NZMPNR0G=GS1.1.1645129233.10.1.1645129262.0; _gat=1; pageLoadedFromBrowserCache=true; _gali=wt51_wtMainContent_wtClassTable_ctl04_wt115',
      ...data.getHeaders()
    },
    data: data
  };

  return axios(config)
    .then(function (response) {
      const $result = cheerio.load(response.data);

      // const wodSchedule = $result("tr");
      // const rmaSchedule = wodSchedule.filter(function () {
      //   return (
      //     $result(this)
      //       .find("span.Text_Note")
      //       .first()
      //       .text() === "Rocky Mtn Athletics"
      //   );
      // });
      //
      // const wodToSchedule = rmaSchedule.filter(function () {
      //   return (
      //     $result(this)
      //       .find("span")
      //       .first()
      //       .text() === wodTime
      //   );
      // });
      //
      // console.log('WHOO')
      // console.log(wodToSchedule)
      //
      // const __EVENTTARGET = wodToSchedule
      //   .find("input[value='Reserve']")
      //   .attr("name");
      //
      // console.log('__EVENTTARGET')
      // console.log(__EVENTTARGET)

      return $result("input#__OSVSTATE").val();
    }).catch(function (error) {
      console.log(error);
    });
}

/*
 * TODO
 * add parameter for DATE (format mm/dd/yyyy)
 * add parameter for class time?
 * parse __EVENTTARGET from schedule page
 * parse __OSVSTATE
 * figure out cookie situation...
 * extract constants
 */

async function fetchReserveWod(wodDate, wodTime, wodType) {
  const axios = require('axios');
  const FormData = require('form-data');
  const cheerio = require('cheerio');

  // Get todays schedule, grab OVS and then fetch given wod date to update OVS?
  const todaysSchedule = await fetchTodaysSchedule();
  const today$ = cheerio.load(todaysSchedule.data);
  const initialOSVState =  today$("input#__OSVSTATE").val();
  console.log(initialOSVState)

  // Get OVS state value for given date
  const OVSforDateFrom = await fetchOVSForDateFrom(wodDate, initialOSVState, wodTime);
  console.log(OVSforDateFrom)
  console.log("\n")

  const OVSforDate = await fetchOVSForDate(wodDate, OVSforDateFrom, wodTime);
  console.log(OVSforDate)
  console.log("\n")

  if (OVSforDate) {
    // Below works!

    var data = new FormData();
    data.append('__EVENTTARGET', 'wt51$wtMainContent$wtClassTable$ctl04$wt115');
    // data.append('__EVENTTARGET', 'wt51$wtMainContent$wtClassTable$ctl03$wt43'); outside of class sign in button
    data.append('__EVENTARGUMENT', '');
    // state determines the date
    data.append('__OSVSTATE', OVSforDate);
    data.append('__VIEWSTATE', '');
    data.append('__VIEWSTATEGENERATOR', 'F25D7ADC');
    data.append('wt51$wtMainContent$wtDate_Input:', wodDate);
    data.append('wt51$wtMainContent$W_Utils_UI_wt41$block$wtDateInputFrom', wodDate);
    data.append('wt51$wtMainContent$wt125', '__ossli_0');
    data.append('wt51$wtMainContent$wt15', '__ossli_0');
    data.append('wt51$Mobile_UI_wt21$block$wt13$wttxtuContent', '');
    data.append('wt51$Mobile_UI_wt21$block$wt13$wttxtOnStart', '');

    var config = {
      method: 'post',
      url: 'https://app.wodify.com/Mobile/Class_Schedule.aspx?_ts=' + Date.now(),
      headers: {
        'cookie': 'hubspotutk=7ea5d6c4f17f91a756cf68aabcfbe3ad; osVisitor=37d4e054-f340-4c3e-96f6-367f9c2aa5d7; IsPhoneGapClient=True; DeviceUUID=1eb96512ff049337863ca8e0a1be9ed3aad85b1590dada74a9c4703059761ad1; __zlcmid=16ykT0HBtbLBBU5; AuthenticationToken=LoggedOut; _gcl_au=1.1.740848671.1644952620; _fbp=fb.1.1644952620048.1374924557; DEVICE_TYPE=desktop; _gid=GA1.2.1392516694.1645129232; __hstc=3148015.7ea5d6c4f17f91a756cf68aabcfbe3ad.1626905650597.1644952620263.1645129231785.5; __hssrc=1; __hssc=3148015.1.1645129231785; nr1W_Theme_UI=lid%3dmhYwq7pZYkUpg8wel%2bP31g%3d%3dz2YTKZsCR1RZTgtJaiveDw%3d%3d%3btuu%3d63780726336%3bexp%3d63780727836%3brhs%3dKeLuvmWKLDW%2fTaLyG9g82m0qo%2bk%3d%3bhmc%3dSg4luVOMzDnSQn1WvMSANHw71AE%3d; nr2W_Theme_UI=crf%3ddzhoUQb803NaUzw0Sye6BeozsPA%3d%3buid%3d3544249%3bunm%3dt_8642_brennonplee%40gmail.com; ASP.NET_SessionId=xr3usnmgd1w2olgnvtnd03uv; osVisit=add57ab7-9b2e-4721-80a3-7a807f69402b; W_Theme_UI.sid=25585255626132829057172403258882820448; _ga=GA1.2.1071575358.1626905650; _ga_64NZMPNR0G=GS1.1.1645129233.10.1.1645129262.0; _gat=1; pageLoadedFromBrowserCache=true; _gali=wt51_wtMainContent_wtClassTable_ctl04_wt115',
        // 'cookie': 'navigatedBack=false; ASP.NET_SessionId=keegzl5ldzen5mjijjyi3tso; osVisitor=4b91f9b2-c7f4-4b0a-ade9-d6ccbb2e1ff3; _gid=GA1.2.2002120777.1644953533; __zlcmid=18Yki22dNDmkgqK; nr1W_Theme_UI=lid%3d0sRCiNXt%2bZ39VtE%2b1BQp7Q%3d%3dHfaj%2fOI%2fxdKUmUW45MHKDQ%3d%3d%3btuu%3d63780554017%3bexp%3d63780555517%3brhs%3dKeLuvmWKLDW%2fTaLyG9g82m0qo%2bk%3d%3bhmc%3dtFOxK2df8oyCbwb%2b28Tl1FtKpAA%3d; nr2W_Theme_UI=crf%3dqc8kOBG%2bH9YjS1oppP7ciRAC9lc%3d%3buid%3d3544249%3bunm%3dt_8642_brennonplee%40gmail.com; CordovaVersion=; osVisit=9740d79e-ea92-4228-a4e0-671d5026c894; AuthenticationToken=c3L6sWI74iudV8s3JpBkfGUNEQrgBSeqtXXR3KCOvvUsyt39s9; _ga_64NZMPNR0G=GS1.1.1644964992.3.0.1644965005.0; _ga=GA1.2.640970088.1644953435; W_Theme_UI.sid=11738364575954256853883203439365191669; pageLoadedFromBrowserCache=true; _gat=1',
        ...data.getHeaders()
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        const $result = cheerio.load(response.data);
        const title = $result("title").first();
        if (title && title.text().trim().toLowerCase().includes('coachboard')) {
          console.log("SUCCESS!");
        } else {
          const responseText = JSON.stringify(response.data);
          if (responseText.includes('Reservation Confirmed')) {
            console.log("SUCCESS!");
          } else if (responseText.includes('You are already reserved for this class')) {
            console.log("You are already registered for this class.")
          } else {
            console.log(JSON.stringify(response.data));
            console.log("Something may have gone wrong...");
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    console.log('done')
    return false;
  }
}

  fetchReserveWod('02/18/2021', '6:00', 'Open Gym');
  // fetchReserveWod('02/17/2021', '6:00', 'Open Gym');
