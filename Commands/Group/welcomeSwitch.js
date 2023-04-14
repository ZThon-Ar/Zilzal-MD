const { mk } = require("../../Database/dataschema.js");

module.exports = {
  name: "الترحيب",
  alias: ["welcomemess", "welcomeswitch"],
  desc: "Enable or disable Welcome/Goodbye messages in a group",
  category: "اوامـر المجمـوعـة",
  usage: "الترحيب [تفعيل/تعطيل]",
  react: "🎀",
  start: async (
    Zed,
    m,
    { args, isBotAdmin, isAdmin, isCreator, reply, prefix, pushName }
  ) => {
    if (!isAdmin)
      return m.reply(mess.useradmin)

    let checkdata = await mk.findOne({ id: m.from });
    var groupe = await Zed.groupMetadata(m.from);
    var members = groupe["participants"];
    var mems = [];
    members.map(async (adm) => {
      mems.push(adm.id.replace("c.us", "s.whatsapp.net"));
    });

    if (args[0] === "تفعيل") {
      if (!checkdata) {
        await new mk({ id: m.from, switchWelcome: "true" }).save();
        Zed.sendMessage(
          m.from,
          {
            text: `*تم تفعيل الترحيب/التوديع هنا .. بنجـاح*`,
            contextInfo: { mentionedJid: mems },
          },
          { quoted: m }
        );
        return Zed.sendMessage(
          m.from,
          {
            text: `*تم تفعيل الترحيب/التوديع هنا .. بنجـاح*`,
          },
          { quoted: m }
        );
      } else {
        if (checkdata.switchWelcome == "true")
          return Zed.sendMessage(
            m.from,
            {
              text: `*تم تفعيل الترحيب/التوديع هنا .. مسبقـاً*`,
            },
            { quoted: m }
          );
        await mk.updateOne({ id: m.from }, { switchWelcome: "true" });
        return Zed.sendMessage(
          m.from,
          {
            text: `*تم تفعيل الترحيب/التوديع هنا .. بنجـاح*`,
          },
          { quoted: m }
        );
      }
    } else if (args[0] === "تعطيل") {
      if (!checkdata) {
        await new mk({ id: m.from, switchWelcome: "false" }).save();
        return Zed.sendMessage(
          m.from,
          {
            text: `*تم تعطيل الترحيب/التوديع هنا .. بنجـاح*`,
          },
          { quoted: m }
        );
      } else {
        if (checkdata.switchWelcome == "false")
          return Zed.sendMessage(
            m.from,
            { text: `*الترحيب/التوديع ليس مفعـل .. اصـلاً هنـا*` },
            { quoted: m }
          );
        await mk.updateOne({ id: m.from }, { switchWelcome: "false" });
        return Zed.sendMessage(
          m.from,
          {
            text: `*تم تعطيل الترحيب/التوديع هنا .. بنجـاح*`,
          },
          { quoted: m }
        );
      }
    } else {
      
      await Zed.sendMessage(m.from, {image: { url: botImage2 },caption: `\n*「 Welcome Configuration 」*\n\nNote: *Welcome/Goodbye* messages will be sent when someone joins or leaves the group.\n\n*_Usage:_* \n\n${prefix}welcome on\n${prefix}welcome off\n\n*Current Status:* ${checkdata.switchWelcome == "true" ? "تفعيل" : "تعطيل"}`,}, { quoted: m });
    }
  },
};
