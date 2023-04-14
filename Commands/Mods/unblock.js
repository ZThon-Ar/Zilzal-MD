module.exports = {
  name: "الغاء بلوك",
  alias: ["unblockuser"],
  desc: "To unblock an user from bot's account",
  category: "اوامـر البـوت",
  usage: "unblock @user",
  react: "🎀",
  start: async (
    Zed,
    m,
    { args, text, prefix, isCreator, pushName, modStatus }
  ) => {
    if (modStatus == "false" && !isCreator)
      return Zed.sendMessage(
        m.from,
        { text: "Sorry, only my *Owner* and *Mods* can use this command !" },
        { quoted: m }
      );

    if (!text && !m.quoted) {
      return Zed.sendMessage(
        m.from,
        { text: `Please tag a user to *Un-Block*!` },
        { quoted: m }
      );
    } else if (m.quoted) {
      var mentionedUser = m.quoted.sender;
    } else {
      var mentionedUser = mentionByTag[0];
    }

    await Zed.updateBlockStatus(mentionedUser, "unblock")
      .then(async (res) => {
        Zed.sendMessage(
          m.from,
          {
            text: `Successfully *Un-Blocked* @${
              mentionedUser.split("@")[0]
            } Senpai !`,
            mentions: [mentionedUser],
          },
          { quoted: m }
        ).catch((e) => {
          Zed.sendMessage(
            m.from,
            {
              text: `Failed to Un-block @${
                mentionedUser.split("@")[0]
              } Senpai ! Maybe he is not blocked !`,
              mentions: [mentionedUser],
            },
            { quoted: m }
          );
        });
      })
      .catch((e) => {
        Zed.sendMessage(
          m.from,
          {
            text: `Failed to Un-block @${
              mentionedUser.split("@")[0]
            } Senpai ! Maybe he is already blocked !`,
            mentions: [mentionedUser],
          },
          { quoted: m }
        );
      });
  },
};
