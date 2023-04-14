module.exports = {
  name: "تنزيل مشرف",
  alias: ["dem"],
  desc: "Demote a member",
  category: "اوامـر المجمـوعـة",
  usage: "demote @user",
  react: "🍁",
  start: async (
    Zed,
    m,
    { text, prefix, isBotAdmin, isAdmin, mentionByTag, pushName, groupAdmin }
  ) => {
    if (!isAdmin && !isBotAdmin) return m.reply(`*- عـذراً عـزيـزي هـذا الامـر خـاص بالبـوت والمشرفيـن فقـط ؟!*`);

    if (!text && !m.quoted) {
      return Zed.sendMessage(
        m.from,
        { text: `Please tag an user to *Demote*!` },
        { quoted: m }
      );
    } else if (m.quoted) {
      var mentionedUser = m.quoted.sender;
    } else {
      var mentionedUser = mentionByTag[0];
    }

    let userId = (await mentionedUser) || m.msg.contextInfo.participant;
    if (!groupAdmin.includes(userId)) {
      return Zed.sendMessage(
        m.from,
        {
          text: `@${mentionedUser.split("@")[0]} Senpai is not an *Admin* !`,
          mentions: [mentionedUser],
        },
        { quoted: m }
      );
    }

    try {
      await Zed.groupParticipantsUpdate(m.from, [userId], "demote").then(
        (res) =>
          Zed.sendMessage(
            m.from,
            {
              text: `Sorry @${
                mentionedUser.split("@")[0]
              } Senpai, you have been *Demoted* by *${pushName}* !`,
              mentions: [mentionedUser],
            },
            { quoted: m }
          )
      );
    } catch (error) {
      Zed.sendMessage(m.from, { text: `${mess.botadmin}` }, { quoted: m });
    }
  },
};
