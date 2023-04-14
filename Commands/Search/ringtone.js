const { ringtone } = require("../../lib/scrapper.js");

module.exports = {
  name: "نغم",
  alias: ["searchringtone", "rt"],
  desc: "لـ البحث وتحميـل النغمـات",
  category: "اوامـر البحث",
  usage: `ringtone <search term>`,
  react: "🍁",
  start: async (Zed, m, { text, prefix, args, mime }) => {
    if (!args[0])
      return Zed.sendMessage(
        m.from,
        { text: `Please provide a Search Term !` },
        { quoted: m }
      );
    var RTsearchTerm = args.join(" ");
    const resultRT = await ringtone(RTsearchTerm);
    let result = resultRT[Math.floor(Math.random() * resultRT.length)];
    -Zed.sendMessage(
      m.from,
      {
        audio: { url: result.audio },
        fileName: RTsearchTerm + ".mp3",
        mimetype: "audio/mpeg",
      },
      { quoted: m }
    );
  },
};
