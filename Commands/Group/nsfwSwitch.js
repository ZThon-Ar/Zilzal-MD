const { mk } = require("../../Database/dataschema.js");

module.exports = {
    name: "nsfw",
    alias: ["nsfwswitch","nsfwmode"],
    desc: "Enable or disable NSFW commands in a group",
    category: "اوامـر المجمـوعـة",
    usage: "nsfw [on/off]",
    react: "🎀",
    start: async (
      Zed,
      m,
      { args, isBotAdmin, isAdmin, isCreator, reply,prefix,pushName }
    ) => {
      
        if (!isAdmin)
        return m.reply(`*- عـذراً عـزيـزي هـذا الامـر خـاص بالبـوت والمشرفيـن فقـط ؟!*`);
  
      let checkdata = await mk.findOne({ id: m.from });
      var groupe = await Zed.groupMetadata(m.from);
      var members = groupe["participants"];
      var mems = [];
      members.map(async (adm) => {
        mems.push(adm.id.replace("c.us", "s.whatsapp.net"));
      });

      if (args[0] === "on") {
        if (!checkdata) {
          await new mk({ id: m.from, switchNSFW: "true" }).save();
          return Zed.sendMessage(
            m.from,
            { text: `*NSFW* has been *Activated* in this group! \n\nType *${prefix}nsfwmenu* To get full NSFW commands list.` },
            { quoted: m }
          );
        } else {
          if (checkdata.switchNSFW == "true")
            return Zed.sendMessage(
                m.from,
                { text: `*NSFW* is already *Activated* in this group!\n\nType *${prefix}nsfwmenu* To get full NSFW commands list.` },
                { quoted: m }
              );
          await mk.updateOne({ id: m.from }, { switchNSFW: "true" });
          return Zed.sendMessage(
            m.from,
            { text: `*NSFW* has been *Activated* in this group!\n\nType *${prefix}nsfwmenu* To get full NSFW commands list.` },
            { quoted: m }
          );
        }
      } else if (args[0] === "off") {
        if (!checkdata) {
          await new mk({ id: m.from, switchNSFW: "false" }).save();
          return Zed.sendMessage(
            m.from,
            { text: `*NSFW* has been *De-Activated* in this group !` },
            { quoted: m }
          );
        } else {
          if (checkdata.switchNSFW == "false") return Zed.sendMessage(
            m.from,
            { text: `*NSFW* is already *De-Activated* in this group !` },
            { quoted: m }
          );
          await mk.updateOne({ id: m.from }, { switchNSFW: "false" });
          return Zed.sendMessage(
            m.from,
            { text: `*NSFW* has been *De-Activated* in this group !` },
            { quoted: m }
          );
        }
      } else {
    
        await Zed.sendMessage(m.from, {image: {url : botImage5} ,caption: `\n*「 NSFW Configuration 」*\n\nNote: This command will enable all adult(NSFW) commands in this group.\n\n*_Usage:_*\n\n*${prefix}nsfw on*\n*${prefix}nsfw off*\n\n*Current Status:* ${checkdata ? checkdata.switchNSFW == "true" ? "On" : "Off" : "Off"}`,}, { quoted: m });
    }
  },
};
