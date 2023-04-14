const { mk, mku } = require("../../Database/dataschema.js");

module.exports = {
  name: "الغاء حظر مجموعة",
  alias: ["unbangc"],
  desc: "Un Ban a group",
  category: "اوامـر البـوت",
  usage: "unbangroup",
  react: "🎀",
  start: async (
    Zed,
    m,
    {
      text,
      prefix,
      isBotAdmin,
      isAdmin,
      mentionByTag,
      pushName,
      isCreator,
      groupName,
      modStatus,
    }
  ) => {
    if (modStatus == "false" && !isCreator)
      return Zed.sendMessage(
        m.from,
        { text: "Sorry, only my *Devs* and *Mods* can use this command !" },
        { quoted: m }
      );
    let checkdata = await mk.findOne({ id: m.from });
    mku
      .findOne({ id: m.sender })
      .then(async (user) => {
        if (user.addedMods == "false" && !isCreator) {
          return m.reply(
            "Sorry, only my *Devs* and *Mods* can use this command !"
          );
        } else {
          if (!checkdata) {
            try {
              await new mk({ id: m.from, bangroup: "false" }).save();
              return m.reply(
                `*${global.botName}* is *Un Banned* on *${groupName}*`
              );
            } catch (err) {
              return m.reply(`An error occurred: ${err.message}`);
            }
          } else {
            if (checkdata.bangroup == "false")
              return m.reply(
                `This Group is *Not Banned* from using *${global.botName}*`
              );
            try {
              await mk.updateOne({ id: m.from }, { bangroup: "false" });
              return m.reply(
                `*${global.botName}* is *Un Banned* on *${groupName}*`
              );
            } catch (err) {
              return m.reply(`An error occurred: ${err.message}`);
            }
          }
        }
      })
      .catch((err) => m.reply(`An error occurred: ${err.message}`));
  },
};
