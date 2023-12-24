import nodemailer from "nodemailer";

// 创建邮件发送器
const transporter = nodemailer.createTransport({
  host: "smtp.qq.com",
  secure: true,
  port: 465,
  auth: {
    user: "jqiue@foxmail.com", // 账号：域名邮箱账号
    pass: process.env.EMAIL_PASS, // 密码：SMPT 获取的密码
  },
});

transporter.verify((err, success) => {
  if (err) return console.log(err);
  if (success) {
    console.log("SMTP can use!");
  }
});

/**
 * @description 发送邮件通知
 * @param {string} subject 主题
 * @param {string} html The HTML version of the message
 */
export const sendAdminEmail = async (subject: string, html: string) => {
  transporter.sendMail(
    {
      from: '"先知"<jqiue@foxmail.com>',
      to: "861947542@qq.com",
      subject,
      html,
    },
    (err, info) => {
      if (err) console.error(err);
      console.log(info);
    }
  );
};
