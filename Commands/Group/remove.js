require("../../config.js");
require("../../Core.js");

module.exports = {
  name: "طرد",
  alias: ["rem"],
  desc: "Remove a member from group",
  category: "اوامـر المجمـوعـة",
  usage: "طرد @user",
  react: "🍁",
  start: async (
    Zed,
    m,
    { text, prefix, isBotAdmin, isAdmin, mentionByTag,pushName}
  ) => {
    if (!isAdmin) return m.reply(`*- عـذراً عـزيـزي هـذا الامـر خـاص بالبـوت والمشرفيـن فقـط ؟!*`);
    if (!text && !m.quoted) return m.reply(`*- قم باضافة تاك يوزر الشخص لـ الامـر لـ طـرده*`)

    if (!text && !m.quoted) {
      return Zed.sendMessage(
        m.from,
        { text: `*- قم باضافة تاك يوزر الشخص لـ الامـر لـ طـرده*` },
        { quoted: m }
      );
    } else if (m.quoted) {
      var mentionedUser = m.quoted.sender;
    } else {
      var mentionedUser = mentionByTag[0];
    }

    let users = (await mentionedUser) || m.msg.contextInfo.participant;

    try {
      await Zed.groupParticipantsUpdate(m.from, [users], "remove").then(
        (res) =>
          Zed.sendMessage(
            m.from,
            { text: `*- العضـو* @${mentionedUser.split("@")[0]} *تم طـرده .. بنجـاح*` },
            { quoted: m }
          )
      );
    } catch (err) {
      Zed.sendMessage(m.from, { text: `${mess.botadmin}` }, { quoted: m });
    }
  },
};
