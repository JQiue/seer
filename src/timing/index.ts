import { scheduleJob } from "node-schedule";
import {
  getDailyWeatherForecast,
  getWeatherIndices,
  getWeatherNow,
} from "../api";
import { StrtoInt } from "../helpers";
import { sendAdminEmail } from "../email";

export default () => {
  // if (process.env.INSTANCE_ID === "0") {
  // 每天 8 点到 20 点，半个小时执行一次
  scheduleJob("0 0/30 8-20 * * ?", async () => {
    const data = await getWeatherNow(process.env.LOCATION);
    if (data) {
      const { temp, text, feelsLike, precip } = data.now;
      const emailTemplate = `
      <div style="background-color:#f2f3f5;">
        <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:624px;">
          <div style="margin:0 16px;max-width:624px;">
            <div style="margin:0px auto;max-width:624px;">
              <div style="font-family:Arial;font-size:14px;font-weight:700;line-height:23px;text-align:left;color:#23263B;">
               温度：${temp}°
              </div>
              <div style="font-family:Arial;font-size:14px;font-weight:700;line-height:23px;text-align:left;color:#23263B;">
              体感温度：${feelsLike}°
              </div>
              <div style="font-family:Arial;font-size:14px;font-weight:700;line-height:23px;text-align:left;color:#23263B;">
              降水量：${precip}
              </div>
              <div style="font-family:Arial;font-size:14px;font-weight:700;line-height:23px;text-align:left;color:#23263B;">
              状况：${text}
              </div>             
            </div>
          </div>
        </div>
      </div>
      `;
      sendAdminEmail("实时先知", emailTemplate);
    }
  });
  scheduleJob("0 0/30 8-20 * * ?", async () => {
    const data = await getWeatherIndices(process.env.LOCATION);
    if (data) {
      const daily = data.daily;
      const emailTemplate = `
      <div style="background-color:#f2f3f5;">
        <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:624px;">
          <div style="margin:0 16px;max-width:624px;">
            <div style="margin:0px auto;max-width:624px;">
               <div style="font-family:Arial;font-size:14px;font-weight:700;line-height:23px;text-align:left;color:#23263B;">
               ${daily[0].name}：${daily[0].category}，${daily[0].text}
               </div>
               <div style="font-family:Arial;font-size:14px;font-weight:700;line-height:23px;text-align:left;color:#23263B;">
               ${daily[1].name}：${daily[1].category}，${daily[1].text}
               </div>
               <div style="font-family:Arial;font-size:14px;font-weight:700;line-height:23px;text-align:left;color:#23263B;">
               ${daily[2].name}：${daily[2].category}，${daily[2].text}
               </div>
               <div style="font-family:Arial;font-size:14px;font-weight:700;line-height:23px;text-align:left;color:#23263B;">
               ${daily[3].name}：${daily[3].category}，${daily[3].text}
               </div>   
               <div style="font-family:Arial;font-size:14px;font-weight:700;line-height:23px;text-align:left;color:#23263B;">
               ${daily[4].name}：${daily[4].category}，${daily[4].text}
               </div>               
            </div>
          </div>
        </div>
      </div>
      `;
      sendAdminEmail("指数先知", emailTemplate);
    }
  });
  // 每天 7:30
  scheduleJob("0 30 7 * * ? *", async () => {
    const data = await getDailyWeatherForecast(process.env.LOCATION);
    if (data) {
      const { tempMin, tempMax, uvIndex } = data.daily[0];
      const tempDiff = StrtoInt(tempMax) - StrtoInt(tempMin);
      let tempDiffText =
        "昼夜温差小，衣物可选择轻便，无需过分昼夜变更，适合户外";
      let uvIndexText = "紫外线强度低";
      if (tempDiff >= 7) {
        tempDiffText = "昼夜温差大，需及时变更衣物，防止着凉";
      }
      if (StrtoInt(uvIndex) >= 3) {
        uvIndexText = "紫外线强度中等，需要遮阳";
      }
      const emailTemplate = `
      <div style="background-color:#f2f3f5;">
        <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:624px;">
          <div style="margin:0 16px;max-width:624px;">
            <div style="margin:0px auto;max-width:624px;">
               <div style="font-family:Arial;font-size:14px;font-weight:700;line-height:23px;text-align:left;color:#23263B;">
               温差：${tempDiff}°
               </div>
               <div style="font-family:Arial;font-size:14px;font-weight:700;line-height:23px;text-align:left;color:#23263B;">
               紫外线指数：${uvIndex}
               </div>
               <div style="font-family:Arial;font-size:18px;font-weight:700;line-height:27px;text-align:left;color:#000000;">结论</div>
               <div style="font-family:Arial;font-size:14px;font-weight:700;line-height:23px;text-align:left;color:#23263B;">
                 <ul>
                   <li>${tempDiffText}</li>
                   <li>${uvIndexText}</li>
                 </ul>
               </div>
            </div>
          </div>
        </div>
      </div>
      `;
      sendAdminEmail("每日先知", emailTemplate);
    }
  });
};
