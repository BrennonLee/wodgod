import { NowRequest, NowResponse } from "@now/node";

import getTodaysWod from "./_utils/getTodaysWod";
import formatTodaysWodResponse from "./_utils/formatTodaysWodResponse";

// export default async (req: NowRequest, res: NowResponse) => {
//   console.log('hello')
//   const todaysWod = await getTodaysWod();
//   console.log(todaysWod)
//   const response = formatTodaysWodResponse(todaysWod);
//   console.log(response);
//   res.json(response);
// };

export async function fetchTodaysWod () {
  const todaysWod = await getTodaysWod();
  console.log(todaysWod)
  const response = formatTodaysWodResponse(todaysWod);
  console.log(response);
};

fetchTodaysWod();
