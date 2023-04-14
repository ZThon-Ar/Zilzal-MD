const yts = require("youtube-yts");

module.exports = {
  name: "يوتيوب",
  alias: ["yts"],
  desc: "لـ البحث وجلب الروابـط من يوتيـوب",
  category: "اوامـر البحث",
  usage: `yts <search term>`,
  react: "🍁",
  start: async (Zed, m, { text, prefix, args }) => {
    if (!args[0])
      return Zed.sendMessage(
        m.from,
        { text: `Please provide a search term !` },
        { quoted: m }
      );
    let search = await yts(text);
    let thumbnail = search.all[0].thumbnail;
    let num = 1;


    var txt = `*🏮 YouTube Search Engine 🏮*\n\n_🧩 Search Term:_ *${args.join(" ")}*\n\n*📌 Total Results:* *${search.all.length}*\n`;

    for(let i of search.all){
      txt += `\n_Result:_ *${num++}*\n_🎀 Title:_ *${i.title}*\n_🔶 Duration:_ *${i.timestamp}*\n_🔷 Link:_ ${i.url}\n\n`
    }

    /*let sections = [];
    for (let i of search.all) {
      const list = {
        title: `Result: ${num++}`,
        rows: [
          {
            title: `${i.title}`,
            rowId: `${prefix}play ${i.title}`,
            description: `Duration: ${i.timestamp}`,
          },
        ],
      };
      sections.push(list);
    }
    var txt = `*🏮 YouTube Search Engine 🏮*\n\n_🧩 Search Term:_ *${args.join(
      " "
    )}*\n\n*📌 Total Results:* *${search.all.length}*\n`;*/

    let buttonMessage = {
      image: { url: thumbnail },
      caption: txt,
    };

    Zed.sendMessage(m.from, buttonMessage, { quoted: m });
  },
};
