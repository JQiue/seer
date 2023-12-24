interface ILocationResponseData {
  code: string;
  location: ILocation[];
}

interface ILocation {
  name: string;
  id: string;
  lat: string;
  lon: string;
  adm2: string;
  adm1: string;
  country: string;
  tz: string;
  utcOffset: string;
  isDst: string;
  type: string;
  rank: string;
  fxLink: string;
}

interface IDailyResponseData {
  code: string;
  updateTime: string;
  cofxLinkde: string;
  daily: IDaily[];
}

interface IDaily {
  /** 预报日期 */
  fxDate: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moonPhase: string;
  moonPhaseIcon: string;
  /** 最高温度 */
  tempMax: string;
  /** 最低温度 */
  tempMin: string;
  iconDay: string;
  textDay: string;
  iconNight: string;
  textNight: string;
  wind360Day: string;
  windDirDay: string;
  windScaleDay: string;
  windSpeedDay: string;
  wind360Night: string;
  windDirNight: string;
  windScaleNight: string;
  windSpeedNight: string;
  humidity: string;
  precip: string;
  pressure: string;
  vis: string;
  cloud: string;
  /** 紫外线强度指数 */
  uvIndex: string;
}

interface INowResponseData {
  code: string;
  updateTime: string;
  fxLink: string;
  now: INow;
}

interface INow {
  /** 观测时间 */
  obsTime: string;
  /** 温度 */
  temp: string;
  /** 体感温度 */
  feelsLike: string;
  icon: string;
  /** 天气状况文字描述 */
  text: string;
  wind360: string;
  windDir: string;
  windScale: string;
  /** 风速 */
  windSpeed: string;
  /** 相对湿度 */
  humidity: string;
  /** 当前小时累计降水量 */
  precip: string;
  /** 大气压强 */
  pressure: string;
  /** 能见度，默认单位：公里 */
  vis: string;
  cloud: string;
  dew: string;
}

interface IIndiceResponseData {
  code: string;
  updateTime: string;
  fxLink: string;
  daily: IIndice[];
}

interface IIndice {
  /** 预报日期 */
  date: string;
  /** 指数类型 */
  type: string;
  /** 指数名称 */
  name: string;
  /** 预报等级 */
  level: string;
  /** 预报级别名称 */
  category: string;
  /** 生活指数预报的详细描述 */
  text: string;
}
