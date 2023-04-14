const axios = require("axios");

module.exports = {
  name: "انستا",
  alias: ["instagram2", "instadl2", "instagramdl2", "igvid2", "igdl"],
  desc: "لـ تحميـل الستوريـات والفيديوهـات من انستجـرام",
  category: "اوامـر التحميـل",
  usage: `igdl2 <video link>`,
  react: "🍁",
  start: async (Zed, m, { text, prefix, args }) => {
    if (!args[0])
      return Zed.sendMessage(
        m.from,
        { text: `Please provide a Instagram Video link !` },
        { quoted: m }
      );
    if (!args[0].includes("instagram.com"))
      return Zed.sendMessage(
        m.from,
        { text: `Please provide a valid Instagram Video link !` },
        { quoted: m }
      );
    

      var queryURL = args.join(" ");
      m.reply("*Please wait, I'm downloading your video...*")
      let res = await axios.get("https://fantox001-scrappy-api.vercel.app/instadl?url=" + queryURL)
      const scrappedURL = res.data.videoUrl
      
      return Zed.sendMessage(m.from, { video: { url: scrappedURL }, caption: `Downloaded by: *${botName}* \n\n_*Powered by:*_ *Scrappy API - by FantoX*\n\n_*Url:*_ https://github.com/FantoX001/Scrappy-API \n`},{ quoted: m } );
  },
};
