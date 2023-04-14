const { mk } = require("../../Database/dataschema.js");

module.exports = {
  name: "الرد التلقائي",
  alias: ["autochat", "autoreply", "chatbotgroup"],
  desc: "Enable or disable the autoreply feature in a group",
  category: "اوامـر المجمـوعـة",
  usage: "الرد التلقائي [تفعيل/تعطيل]",
  react: "🎀",
  start: async (
    Zed,
    m,
    { args, isBotAdmin, isAdmin, isCreator, reply, prefix, pushName }
  ) => {
    if (!isAdmin)
      return Zed.sendMessage(
        m.from,
        {
          text: `*- عـذراً عـزيـزي هـذا الامـر خـاص بالبـوت والمشرفيـن فقـط ؟!*`,
        },
        { quoted: m }
      );

    let checkdata = await mk.findOne({ id: m.from });
    var groupe = await Zed.groupMetadata(m.from);
    var members = groupe["participants"];
    var mems = [];
    members.map(async (adm) => {
      mems.push(adm.id.replace("c.us", "s.whatsapp.net"));
    });

    if (args[0] === "تفعيل") {
      if (!checkdata) {
        await new mk({ id: m.from, chatBot: "true" }).save();
        Zed.sendMessage(
          m.from,
          {
            text: `*Group Chatbot Activated! *\n\nTo use it mention bot's message with your message.`,
            contextInfo: { mentionedJid: mems },
          },
          { quoted: m }
        );
        return Zed.sendMessage(
          m.from,
          {
            text: `*Group Chatbot Activated !*\n\nTo use it mention bot's message with your message.`,
          },
          { quoted: m }
        );
      } else {
        if (checkdata.chatBot == "true")
          return Zed.sendMessage(
            m.from,
            {
              text: `*Already activated.*\n\nTo use it mention bot's message with your message.`,
            },
            { quoted: m }
          );
        await mk.updateOne({ id: m.from }, { chatBot: "true" });
        return Zed.sendMessage(
          m.from,
          { text: `*Group Chatbot Activated !*` },
          { quoted: m }
        );
      }
    } else if (args[0] === "تعطيل") {
      if (!checkdata) {
        await new mk({ id: m.from, chatBot: "false" }).save();
        return Zed.sendMessage(
          m.from,
          { text: `*Group Chatbot De-Activated!*` },
          { quoted: m }
        );
      } else {
        if (checkdata.chatBot == "false")
          return Zed.sendMessage(
            m.from,
            { text: `*Already deactivated.*` },
            { quoted: m }
          );
        await mk.updateOne({ id: m.from }, { chatBot: "false" });
        return Zed.sendMessage(
          m.from,
          { text: `*Group Chatbot De-Activated !*` },
          { quoted: m }
        );
      }
    } else {
      
      await Zed.sendMessage(m.from, {image: { url: botImage4 },caption: `\n *「  Group Chatbot configuration  」*\n\nNote: This will enable chatbot in this group. Bot will reply to a message in this group if someone mentions bot's message.\n\n*_Usage:_*\n\n*${prefix}chatbotgc on*\n*${prefix}chatbotgc off*\n\n*Current Status:* ${checkdata.chatBot == "true" ? "On" : "Off"}`,}, { quoted: m });
    }
  },
};
