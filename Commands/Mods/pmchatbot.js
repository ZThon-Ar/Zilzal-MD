const { mkchar } = require("../../Database/dataschema.js");

module.exports = {
  name: "رد الخاص",
  alias: ["pmautochat", "autoreplypm", "chatbotgroup", "pmchatbot"],
  desc: "Enable or disable the autoreply feature in a group",
  category: "اوامـر البـوت",
  usage: "الرد الالي [تفعيل/تعطيل]",
  react: "🎀",
  start: async (
    Zed,
    m,
    { args, isBotAdmin, isAdmin, isCreator, reply, prefix, pushName, modStatus }
  ) => {
    if (modStatus == "false" && !isCreator)
      return m.reply("Sorry, only my *Devs* and *Mods* can use this command !");

    let checkdata = await mkchar.findOne({ id: "1" });

    if (args[0] === "تفعيل") {
      if (!checkdata) {
        await new mkchar({ id: "1", PMchatBot: "true" }).save();
        Zed.sendMessage(
          m.from,
          {
            text: `*PM Chatbot Activated! *\n\nBot will reply to all personal messages.`,
          },
          { quoted: m }
        );
        return Zed.sendMessage(
          m.from,
          {
            text: `*PM Chatbot Activated !*\n\nBot will reply to all personal messages.`,
          },
          { quoted: m }
        );
      } else {
        if (checkdata.PMchatBot == "true")
          return Zed.sendMessage(
            m.from,
            {
              text: `*Already activated.*\n\nBot will reply to all personal messages.`,
            },
            { quoted: m }
          );
        await mkchar.updateOne({ id: "1" }, { PMchatBot: "true" });
        return Zed.sendMessage(
          m.from,
          { text: `*PM Chatbot Activated !*` },
          { quoted: m }
        );
      }
    } else if (args[0] === "تعطيل") {
      if (!checkdata) {
        await new mkchar({ id: "1", PMchatBot: "false" }).save();
        return Zed.sendMessage(
          m.from,
          { text: `*PM Group Chatbot De-Activated!*` },
          { quoted: m }
        );
      } else {
        if (checkdata.PMchatBot == "false")
          return Zed.sendMessage(
            m.from,
            { text: `*Already deactivated.*` },
            { quoted: m }
          );
        await mkchar.updateOne({ id: "1" }, { PMchatBot: "false" });
        return Zed.sendMessage(
          m.from,
          { text: `*PM Chatbot De-Activated !*` },
          { quoted: m }
        );
      }
    } else {
      let bmffg = {
        image: { url: botImage6 },
        caption: `\n *「  PM Chatbot configuration  」*\n\n\nNote: This will enable chatbot in bot's PM. Bot will reply to all message in PM.\n\n*_Usage:_*\n\n*${prefix}pmchatbot on*\n*${prefix}pmchatbot off*\n\n*Current Status:* ${checkdata.PMchatBot == "true" ? "On" : "Off"}`,

      };
      await Zed.sendMessage(m.from, bmffg, { quoted: m });
    }
  },
};
