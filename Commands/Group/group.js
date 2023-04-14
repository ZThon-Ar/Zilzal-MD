module.exports = {
  name: "الدردشة",
  alias: ["gc"],
  desc: "Open / Close Group",
  category: "اوامـر المجمـوعـة",
  usage: `group open/close`,
  react: "🍁",
  start: async (
    Zed,
    m,
    {
      text,
      prefix,
      isBotAdmin,
      isAdmin,
      args,
      pushName,
    }
  ) => {
    if (!isAdmin && !isBotAdmin) return m.reply(`*- عـذراً عـزيـزي هـذا الامـر خـاص بالبـوت والمشرفيـن فقـط ؟!*`);
    
    if (args[0] === "قفل") {
      await Zed.groupSettingUpdate(m.from, "announcement").then((res) =>
        m.reply(`Group has been closed!`)
      );
    } else if (args[0] === "فتح") {
      await Zed.groupSettingUpdate(m.from, "not_announcement").then((res) =>
        m.reply(`Group has been opened!`)
      );
    } else {
      
      await Zed.sendMessage(m.from, {image: { url: botImage2}, caption: `\n*「 Group Message Settings 」*\n\nSelect an option below.\n\n*_Usage:_*\n\n*${prefix}group open*\n*${prefix}group close*\n`,}, { quoted: m });
    }
  },
};
