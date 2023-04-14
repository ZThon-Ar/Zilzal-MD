const YT = require("../../lib/ytdl-core.js");
const yts = require("youtube-yts");
const fs = require("fs");

module.exports = {
  name: "تحميل ملف",
  alias: ["youtubedoc"],
  desc: "لـ تحميـل المقاطـع الصوتيـه من يوتيـوب عبـر الرابـط على شكـل ملـف",
  cool: 30,
  category: "اوامـر التحميـل",
  usage: `ytdoc <song link>`,
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
    let search = await yts(text);
    let songName = search.all[0].title || "Converted"

    yts({ videoId })
      .then((result) => {
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
                document: fs.readFileSync(file.path),
                fileName: `${songName} by ${botName}.mp3`,
                mimetype: "audio/mpeg",
              },
              { quoted: m },
            );
            fs.unlinkSync(file.path);
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
