const YT = require("../../lib/ytdl-core.js");
const fs = require("fs");
const yts = require("youtube-yts");

module.exports = {
  name: "فيديو",
  alias: ["ytvideo"],
  desc: "لـ تحميـل مقاطـع الفيـديـو من يوتيـوب",
  category: "اوامـر التحميـل",
  usage: `video <song name>`,
  react: "🍁",
  start: async (Zed, m, { text, prefix, args }) => {
    try {
      if (!args[0])
        return Zed.sendMessage(
          m.from,
          { text: `Please provide a song name to play !` },
          { quoted: m }
        );
      const songSearchTerm = args.join(" ");
      const songInfo = await yts(songSearchTerm);
      const song = songInfo.videos[0];
      let videoUrl = song.url;
      let videoId = videoUrl.split("v=")[1];

      await Zed.sendMessage(
        m.from,
        {
          image: { url: song.thumbnail },
          caption: `\n*البحث :* _${song.title}_

*المـدة :* _${song.timestamp}_

*الرابـط :* _${song.url}_


_*جـارِ تحميـل الفيديـو...*_\n\n`,
        },
        { quoted: m }
      );

      const result = await yts(videoId);
      const length = result.seconds;

      if (length >= 1800) {
        return m.reply(
          "Command Rejected! The audio is more than 30 minutes long! "
        );
      } else {
        const ytaud = await YT.mp4(videoUrl);
        Zed.sendMessage(
          m.from,
          {
            video: { url: ytaud.videoUrl },
            caption:`${song.title} By: ${botName}`,
          },
          { quoted: m }
        );
      }
    } catch (err) {
      console.error(err);
      Zed.sendMessage(
        m.from,
        { text: `Failed to play the song: ${err.message}` },
        { quoted: m }
      );
    }
  },
};
