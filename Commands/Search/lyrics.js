const axios = require("axios");

module.exports = {
  name: "لاريكس",
  alias: ["songlysics"],
  desc: "To get any song lyrics",
  category: "اوامـر البحث",
  usage: `lyrics <song name>`,
  react: "🍁",
  start: async (Zed, m, { text, prefix, args }) => {
    if (!args[0])
      return Zed.sendMessage(
        m.from,
        { text: `Please provide a Search Term !` },
        { quoted: m }
      );
    var searchQuery = args.join(" ");

    const result = await axios.get("https://fantox001-scrappy-api.vercel.app/lyrics?search=" + searchQuery)
    const lyrics = result.data.lyrics
    const thumbnail = result.data.thumbnail

    let resText = `  *『  ⚡️ Lyrics Search Engine ⚡️  』*\n\n\n_Search Term:_ *${searchQuery}*\n\n\n*📍 Lyrics:* \n\n${lyrics}\n\n\n_*Powered by:*_ *Scrappy API - by FantoX*\n\n_*Url:*_ https://github.com/FantoX001/Scrappy-API \n`;

    await Zed.sendMessage(
      m.from,
      {
        image: {
          url: thumbnail,
        },
        caption: resText,
      },
      { quoted: m }
    );
  },
};
