require("../../config.js");
require("../../Core.js");

module.exports = {
  name: "رابط المجموعة",
  alias: ["الرابط"],
  desc: "لـ جلب رابـط المجمـوعـة.",
  category: "اوامـر المجمـوعـة",
  usage: "الرابط",
  react: "🍁",
  start: async (Zed, m, { prefix, isBotAdmin, isAdmin, metadata, mime }) => {

    if (!isBotAdmin) return m.reply(mess.botadmin);

    var link = await Zed.groupInviteCode(m.from);
    var linkcode = `https://chat.whatsapp.com/${link}`;

    try {
      ppgc = await Zed.profilePictureUrl(m.from, "image");
    } catch {
      ppgc = botImage1;
    }

    try {
      await Zed.sendMessage(
        m.from,
        {
          image: { url: ppgc, mimetype: "image/jpeg" },
          caption: `\n_🎀 اسـم المجمـوعـة :_ *${metadata.subject}*\n\n_🔷 رابـط المجمـوعـة :_\n${linkcode}\n`,
        },
        { quoted: m }
      );
    } catch (err) {
      Zed.sendMessage(m.from, { text: `${mess.botadmin}` }, { quoted: m });
    }
  },
};
