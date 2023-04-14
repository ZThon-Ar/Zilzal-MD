module.exports = {
  name: "مسح",
  alias: ["del"],
  desc: "لـ مسـح رسـائل شخـص في المجمـوعـة",
  category: "اوامـر المجمـوعـة",
  usage: `باضافة يوزر الشخص لـ الامـر *مسح*`,
  react: "🍁",
  start: async (Zed, m, { isAdmin, isBotAdmin, pushName }) => {
    if (!m.quoted)
      return m.reply(`بالـرد ع رسالة شخص عبر الامر مسح !`);

    if (!isAdmin && !isBotAdmin) return m.reply(`*- عـذراً عـزيـزي هـذا الامـر خـاص بالبـوت والمشرفيـن فقـط ؟!*`);
    
    var { from, fromMe, id } = m.quoted;

    const key = {
      remoteJid: m.from,
      fromMe: false,
      id: m.quoted.id,
      participant: m.quoted.sender,
    };

    await Zed.sendMessage(m.from, { delete: key });
  },
};
