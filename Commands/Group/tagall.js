module.exports = {
  name: "تاك",
  alias: ["tag", "all"],
  desc: "Tag all group member",
  category: "اوامـر المجمـوعـة",
  usage: "تاك",
  react: "🍁",
  start: async (
    Zed,
    m,
    { text, prefix, isBotAdmin, isAdmin, participants, args }
  ) => {
    if (!isAdmin)
      return m.reply(mess.useradmin);

    let message = args
      ? args.join(" ")
      : m.quoted
      ? m.quoted.msg
      : "لايـوجـد";

    let mess = `               *『 تـاك لـ الكـل 』*
    
*التاك بواسطـة :* @${m.sender.split("@")[0]}
    
*الرسـالة :* ${message}\n\n`;

    for (let mem of participants) {
      mess += `♢ @${mem.id.split("@")[0]}\n`;
    }
    mess += `\n\n                    *شكـراً لك*\n`;

    await Zed.sendMessage(
      m.from,
      { text: mess, mentions: participants.map((a) => a.id) },
      { quoted: m }
    );
  },
};
