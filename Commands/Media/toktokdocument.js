module.exports = {
    name: "تيك ملف",
    alias: ["tiktokdoc"],
    desc: "To download a tiktok audio as document",
    category: "اوامـر التحميـل",
    usage: `tiktokdoc <link>`,
    react: "🍁",
    start: async (Zed, m, { text, prefix, args, mime }) => {
      if (!args[0])
        return Zed.sendMessage(
          m.from,
          { text: `Please provide a Tiktok Video link !` },
          { quoted: m }
        );

        if(!args[0].includes("tiktok")){
          return m.reply("Please provide a valid Tiktok link!")
        }

        require('../../lib/tiktokScrapper').Tiktok(args[0]).then( data => {
        Zed.sendMessage(m.from, { document: { url: data.audio },mimetype: "audio/mpeg",fileName: `Downloaded by ${botName}.mp3`,},{ quoted: m })
        })
        },
    }