const api_key = "020652572c3f4ddd9143de5f002a947e";

const daily_url = "https://devapi.qweather.com/v7/weather/";
const weather_now_url = "https://devapi.qweather.com/v7/weather/now?";
const locatioin_url = "https://geoapi.qweather.com/v2/city/lookup?";
const indice_url = "https://devapi.qweather.com/v7/indices/1d?";

const cache = new Map();

export async function getDailyWeatherForecast(
  location: string,
  days: 3 | 7 = 3
): Promise<IDailyResponseData | undefined> {
  if (cache.get("daily")) {
    return cache.get("daily");
  }
  const resp = await fetch(
    daily_url + days + "d" + "?" + `location=${location}&key=${api_key}`
  );
  if (resp.status == 200) {
    const data = (await resp.json()) as IDailyResponseData;
    cache.set("daily", data);
    return data;
  }
}

/** 实时天气 */
export async function getWeatherNow(location: string) {
  const resp = await fetch(
    weather_now_url + `location=${location}&key=${api_key}`
  );
  if (resp.status == 200) {
    const data = (await resp.json()) as INowResponseData;
    return data;
  }
}

export async function getLocationID(keyword: string) {
  const resp = await fetch(
    locatioin_url + `location=${keyword}&key=${api_key}`
  );
  if (resp.status == 200) {
    const data = (await resp.json()) as ILocationResponseData;
    return data.location;
  }
}

/** 天气指数 */
export async function getWeatherIndices(
  location: string,
  type: string = "1,3,5,12,14"
) {
  const resp = await fetch(
    indice_url + `type=${type}&location=${location}&key=${api_key}`
  );
  if (resp.status == 200) {
    const data = (await resp.json()) as IIndiceResponseData;
    return data;
  }
}
