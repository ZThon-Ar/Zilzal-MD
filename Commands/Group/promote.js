module.exports = {
  name: "رفع مشرف",
  alias: ["prom"],
  desc: "Promote a member",
  category: "اوامـر المجمـوعـة",
  usage: "رفع مشرف @user",
  react: "🍁",
  start: async (
    Zed,
    m,
    { text, prefix, isBotAdmin, isAdmin, mentionByTag, pushName,groupAdmin }
  ) => {
    if (!isAdmin) {
      return m.reply(mess.useradmin);
    }
    if (!isBotAdmin) {
      return m.reply(mess.botadmin);
    }

    if (!text && !m.quoted) {
      return m.reply(`Please tag a user to *Promote*!`);
    } else if (m.quoted) {
      var mentionedUser = m.quoted.sender;
    } else {
      var mentionedUser = mentionByTag[0];
    }

    let userId = (await mentionedUser) || m.msg.contextInfo.participant;
    if(groupAdmin.includes(userId)){
      return Zed.sendMessage(
        m.from,
        { text: `@${
          mentionedUser.split("@")[0]
        } Senpai is already an *Admin* !`,mentions: [mentionedUser], },
        { quoted: m }
      );
    }

    try {
      await Zed.groupParticipantsUpdate(m.from, [userId], "promote").then(
        (res) =>
          Zed.sendMessage(
            m.from,
            {
              text: `Congratulations @${
                mentionedUser.split("@")[0]
              } Senpai 🥳, you have been *Promoted* Successfully by *${pushName}* !`,
              mentions: [mentionedUser],
            },
            { quoted: m }
          )
      );
    } catch (error) {
       Zed.sendMessage(
        m.from,
        { text: `${mess.botadmin}` },
        { quoted: m }
      ); 
    }
    
  },
};
