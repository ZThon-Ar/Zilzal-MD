module.exports = {
  name: "انضم",
  alias: ["joingc"],
  desc: "ask bot to Join a group",
  category: "Mods",
  usage: "join <link>",
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

    if (!text)
      return Zed.sendMessage(
        m.from,
        { text: "Please provide a valid WhatsApp group link !" },
        { quoted: m }
      );
    if (!args[0].includes("whatsapp.com"))
      return Zed.sendMessage(
        m.from,
        { text: "Please provide a valid WhatsApp group link !" },
        { quoted: m }
      );
    let gcJoinCode = args[0].split("https://chat.whatsapp.com/")[1];

    await Zed.groupAcceptInvite(gcJoinCode)
      .then(async (res) => {
        Zed.sendMessage(
          m.from,
          { text: `_Successfully Joined !_` },
          { quoted: m }
        ).catch((e) => {
          Zed.sendMessage(
            m.from,
            {
              text: `_Failed to join group ! Maybe bot was removed from there before !_`,
            },
            { quoted: m }
          );
        });
      })
      .catch((e) => {
        Zed.sendMessage(
          m.from,
          {
            text: `_Failed to join group ! Maybe bot was removed from there before !_`,
          },
          { quoted: m }
        );
      });
  },
};
