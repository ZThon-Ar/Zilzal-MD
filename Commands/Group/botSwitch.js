const { mk } = require("../../Database/dataschema.js");

module.exports = {
  name: "البوت",
  alias: ["bot", "botswitch"],
  desc: "Enable or disable bot in a group",
  category: "اوامـر المجمـوعـة",
  usage: "البوت [تفعيل/تعطيل]",
  react: "🎀",
  start: async (
    Zed,
    m,
    {
      args,
      isBotAdmin,
      isAdmin,
      isCreator,
      reply,
      prefix,
      pushName,
      participants,
    }
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
        await new mk({ id: m.from, botSwitch: "true" }).save();
        Zed.sendMessage(
          m.from,
          {
            text: `*${botName}* has been Re-Activated in this group!`,
            contextInfo: { mentionedJid: mems },
          },
          { quoted: m }
        );
        return Zed.sendMessage(
          m.from,
          { text: `*${botName}* has been Re-Activated in this group!` },
          { quoted: m }
        );
      } else {
        if (checkdata.botSwitch == "true")
          return Zed.sendMessage(
            m.from,
            { text: `*${botName}* is already Activated in this group !` },
            { quoted: m }
          );
        await mk.updateOne({ id: m.from }, { botSwitch: "true" });
        return Zed.sendMessage(
          m.from,
          { text: `*${botName}* has been Activated in this group! Now everyone here can use bot.` },
          { quoted: m }
        );
      }
    } else if (args[0] === "تعطيل") {
      if (!checkdata) {
        await new mk({ id: m.from, botSwitch: "false" }).save();
        return Zed.sendMessage(
          m.from,
          {
            text: `*${botName}* has been De-Activated in this group !\n\nNow only *Admins* can use bot`,
          },
          { quoted: m }
        );
      } else {
        if (checkdata.botSwitch == "false")
          return Zed.sendMessage(
            m.from,
            { text: `*${botName}* is already De-Activated in this group !\n\nNow only *Admins* can use bot` },
            { quoted: m }
          );
        await mk.updateOne({ id: m.from }, { botSwitch: "false" });
        return Zed.sendMessage(
          m.from,
          {
            text: `${botName} has been De-Activated in this group !\n\nNow only *Admins* can use bot`,
          },
          { quoted: m }
        );
      }
    } else {
    
      await Zed.sendMessage(m.from, {image: { url: botImage2 },
        caption: `\n *「  Admin Only Mode  」*\n\nNote: This feature will only make bot useable for admins only.\n\n*_Usage:_*\n\n*${prefix}bot on*\n*${prefix}bot off*\n\n*Current Status:* ${checkdata.botSwitch == "true" ? "On" : "Off"}`,}, { quoted: m });
    }
  },
};
