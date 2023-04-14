const { mk } = require("../../Database/dataschema.js");

module.exports = {
    name: "الروابط",
    alias: ["alinkgc","antilink"],
    desc: "Enable or disable the antilink feature in a group",
    category: "اوامـر المجمـوعـة",
    usage: "منع الروابط [تفعيل/تعطيل]",
    react: "🔒",
    start: async (
      Zed,
      m,
      { args, isBotAdmin, isAdmin, isCreator, reply,prefix,pushName }
    ) => {
        if (!isAdmin) {
          return m.reply(mess.useradmin);
        }
        if (!isBotAdmin) {
          return m.reply(mess.botadmin);
        }
  
      let checkdata = await mk.findOne({ id: m.from });
      var groupe = await Zed.groupMetadata(m.from);
      var members = groupe["participants"];
      var mems = [];
      members.map(async (adm) => {
        mems.push(adm.id.replace("c.us", "s.whatsapp.net"));
      });
  
      if (args[0] === "تفعيل") {
        if (!checkdata) {
          await new mk({ id: m.from, antilink: "true" }).save();
          Zed.sendMessage(
            m.from,
            {
              text: `\`\`\`「 Warning 」\`\`\`\n\nAntilink System Activated!`,
              contextInfo: { mentionedJid: mems },
            },
            { quoted: m }
          );
          return Zed.sendMessage(
            m.from,
            { text: `*Successfully activated antilink*` },
            { quoted: m }
          );
        } else {
          if (checkdata.antilink == "true")
            return Zed.sendMessage(
                m.from,
                { text: `*Already activated.*` },
                { quoted: m }
              );
          await mk.updateOne({ id: m.from }, { antilink: "true" });
          return Zed.sendMessage(
            m.from,
            { text: `*Antilink is enabled in this group*` },
            { quoted: m }
          );
        }
      } else if (args[0] === "تعطيل") {
        if (!checkdata) {
          await new mk({ id: m.from, antilink: "false" }).save();
          return Zed.sendMessage(
            m.from,
            { text: `*Successfully deactivated antilink*` },
            { quoted: m }
          );
        } else {
          if (checkdata.antilink == "false") return Zed.sendMessage(
            m.from,
            { text: `*Already deactivated.*` },
            { quoted: m }
          );
          await mk.updateOne({ id: m.from }, { antilink: "false" });
          return Zed.sendMessage(
            m.from,
            { text: `*Antilink is disabled in this group*` },
            { quoted: m }
          );
        }
      } else {
        await Zed.sendMessage(m.from, {image: {url : botImage6} ,caption: `\n*「  Group Antilink configuration  」*\n\nNote: This will *delete* all links from groups and *remove* someone if they send any other *WhatsApp Group's Link*.\n\n*_Usage:_*\n\n*${prefix}antilink on*\n*${prefix}antilink off*\n\n*Current Status:* ${checkdata.antilink == "true" ? "On" : "Off"}`,}, { quoted: m });
    }
  },
};