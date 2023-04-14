const axios = require("axios");

module.exports = {
  name: "متحركه",
  alias: ["gif", "getgif"],
  desc: "لـ البحث وتحميـل الصـور المتحركـه",
  category: "اوامـر البحث",
  usage: `gif <search term>`,
  react: "🍁",
  start: async (Zed, m, { text, prefix, args }) => {
    if (!args[0])
      return Zed.sendMessage(
        m.from,
        { text: `Please provide a Search Term !` },
        { quoted: m }
      );
    var gifSearchTerm = args.join(" ");
    const gif = await axios.get(
      `https://tenor.googleapis.com/v2/search?q=${gifSearchTerm}&key=${tenorApiKey}&client_key=my_project&limit=12&media_filter=mp4`
    );

    let result = Math.floor(Math.random() * 12);
    let gifUrl = gif.data.results[result].media_formats.mp4.url;

    let buttons = [
      {
        buttonId: `${prefix}gifsearch ${gifSearchTerm}`,
        buttonText: { displayText: ">>" },
        type: 1,
      },
    ];
    let buttonMessage = {
      video: { url: gifUrl },
      gifPlayback: true,
      caption: `Gif serach result for: *${gifSearchTerm}*\n`,
      footer: `*${botName}*`,
      buttons: buttons,
      headerType: 4,
    };
    await Zed.sendMessage(m.from, buttonMessage, { quoted: m });
  },
};
