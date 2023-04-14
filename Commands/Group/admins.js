module.exports = {
  name: "المشرفين",
  alias: ["tagadmins", "admin"],
  desc: "Tag all group Admins.",
  category: "اوامـر المجمـوعـة",
  usage: "المشرفين + رسـالتك",
  react: "🍁",
  start: async (
    Zed,
    m,
    { text, prefix, isAdmin, participants, args, groupAdmin }
  ) => {
    let message = "       『 *Attention Admins* 』";

    if (m.quoted) {
      message = "       『 *Attention Admins* 』";
    } else if (!text && m.quoted) {
      message = `${m.quoted ? m.quoted.msg : ""}`;
    } else if (args[0]) {
      message = `       『 *المشـرفيـن* 』\n\n_🎀 الرسـالة :_ *${args.join(
        " "
      )}*`;
    } else if (text === "") {
      message = "       『 *Attention Admins* 』";
    } else {
      message = "       『 *Attention Admins* 』";
    }

    Zed.sendMessage(
      m.from,
      { text: message, mentions: groupAdmin },
      { quoted: m }
    );
  },
};
