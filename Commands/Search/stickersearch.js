const axios = require("axios");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");

module.exports = {
  name: "ملصق",
  alias: ["getsticker", "searchsticker"],
  desc: "To search any sticker",
  category: "اوامـر البحث",
  usage: `stickersearch <search term>`,
  react: "🍁",
  start: async (Zed, m, { text, prefix, args, pushName }) => {
    if (!args[0])
      return Zed.sendMessage(
        m.from,
        { text: `Please provide a Search Term !` },
        { quoted: m }
      );
    var gifSearchTerm = args.join(" ");
    const gif = await axios.get(
      `https://tenor.googleapis.com/v2/search?q=${gifSearchTerm}&key=${tenorApiKey}&client_key=my_project&limit=8&media_filter=gif`
    );

    let result = Math.floor(Math.random() * 8);
    let gifUrl = gif.data.results[result].media_formats.gif.url;

    const response = await axios.get(gifUrl, {
      responseType: "arraybuffer",
    });
    const buffer = Buffer.from(response.data, "utf-8");

    let stickerMess = new Sticker(buffer, {
      pack: packname,
      author: pushName,
      type: StickerTypes.FULL,
      categories: ["🤩", "🎉"],
      id: "12345",
      quality: 60,
      background: "transparent",
    });
    const stickerBuffer2 = await stickerMess.toBuffer();
    Zed.sendMessage(m.from, { sticker: stickerBuffer2 }, { quoted: m });
  },
};
