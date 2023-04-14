module.exports = {
    name: "تيك توك",
    alias: ["tiktokdl"],
    desc: "To download a tiktok video",
    category: "اوامـر التحميـل",
    usage: `tiktok <song link>`,
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

        let buttons = [
            {
              buttonId: `${prefix}tiktokmp3 ${args[0]}`,
              buttonText: { displayText: "♬ Audio" },
              type: 1,
            },
            {
              buttonId: `${prefix}tiktokmp4 ${args[0]}`,
              buttonText: { displayText: "▶ Video" },
              type: 1,
            },
            {
              buttonId: `${prefix}tiktokdoc ${args[0]}`,
              buttonText: { displayText: "∎ Document" },
              type: 1,
            },
          ];

          let buttonMessage = {
            

          };
          Zed.sendMessage(m.from, {image: { url: botImage1 },
            caption: `
            *『 Tiktok Downloader 』*
      
*🧩 Video Url :* _${args[0]}_\n\n

*📌 Select the format*

*${prefix}tiktokmp3 <link>*
*${prefix}tiktokmp4 <link>*
*${prefix}tiktokdoc <link>*`,}, { quoted: m });
        },
    }