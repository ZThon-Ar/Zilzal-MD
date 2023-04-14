const hxzapi = require("hxz-api");

module.exports = {
  name: "بنترست",
  alias: ["pin"],
  desc: "لـ تحميـل الصـور مـن بنتـرست",
  category: "اوامـر البحث",
  usage: `pin <search term>`,
  react: "🍁",
  start: async (Zed, m, { text, prefix, args }) => {
    if (!args[0])
      return Zed.sendMessage(
        m.from,
        { text: `Please provide a Search Term !` },
        { quoted: m }
      );
    var PinsearchTerm = args.join(" ");
    hxzapi
      .pinterest(PinsearchTerm)
      .then(async (res) => {
        imgnyee = res[Math.floor(Math.random() * res.length)];
        /*let buttons = [
          {
            buttonId: `${prefix}pinterest ${args.join(" ")}`,
            buttonText: { displayText: ">>" },
            type: 1,
          },
        ];*/

        let txt = `\n_🎀 Pinterest Search Term:_ *${PinsearchTerm}*\n\n_🧩 Powered by_ *${botName}*\n`;
        let buttonMessage = {
          image: { url: imgnyee },
          caption: txt,
          //footer: `*${botName}*`,
          //buttons: buttons,
          //headerType: 4,
        };
        Zed.sendMessage(m.from, buttonMessage, { quoted: m });
      })
      .catch((_) => _);
  },
};
