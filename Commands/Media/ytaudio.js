const YT = require("../../lib/ytdl-core.js");
const fs = require("fs");
const yts = require("youtube-yts");

module.exports = {
  name: "تحميل صوت",
  alias: ["mp3", "ytmp3", "ytmusic"],
  desc: "لـ تحميـل المقاطـع الصوتيـه من يوتيـوب عبـر الرابـط",
  cool: 30,
  category: "اوامـر التحميـل",
  usage: `ytad <song link>`,
  react: "🍁",
  start: async (Zed, m, { text, prefix, args, mime }) => {
    if (!args[0])
      return Zed.sendMessage(
        m.from,
        { text: `Please provide a YouTube Video link !` },
        { quoted: m }
      );
    let videoUrl = text;
    let videoId = videoUrl.split("v=")[1];
    

    yts({ videoId }).then((result) => {
      const length = result.seconds;

      if (length >= 1800) {
        return m.reply(
          "Command Rejected! The audio is more than 30 minutes long BAKA! "
        );
      } else {
        const ytaud =  YT.mp3(text).then((file) => {
          Zed.sendMessage(
            m.from,
            {
              audio: fs.readFileSync(file.path),
              mimetype: "audio/mpeg",
            },
            { quoted: m }
          );
          fs.unlinkSync(file.path);
        });
        
      }
    });
  },
};
