module.exports = {
  name: "تغيير الرابط",
  alias: ["resetlink", "resetgclink", "resetlinkgroup", "resetlinkgc"],
  desc: "Reset group link",
  category: "اوامـر المجمـوعـة",
  usage: "revoke",
  react: "🍁",
  start: async (Zed, m, { prefix, isBotAdmin, isAdmin }) => {
    if (m.from == "120363040838753957@g.us")
      return m.reply(
        "Sorry, this command is not allowed in *Atlas Support Group* !\n\nYou are not allowed to change support group link !"
      );

      if (!isAdmin && !isBotAdmin) return m.reply(`*- عـذراً عـزيـزي هـذا الامـر خـاص بالبـوت والمشرفيـن فقـط ؟!*`);

    try {
      await Zed.groupRevokeInvite(m.from).then((res) =>
        Zed.sendMessage(
          m.from,
          { text: `Group link has been *Updated* Successfully!` },
          { quoted: m }
        )
      );
    } catch (err) {
      Zed.sendMessage(m.from, { text: `${mess.botadmin}` }, { quoted: m });
    }
  },
};
