module.exports = {
  name: "ضع اسم",
  alias: ["setnamegc", "changegcname", "setgroupname", "changegroupname"],
  desc: "Change the group name",
  category: "اوامـر المجمـوعـة",
  usage: `setgcname <New group name>`,
  react: "🍁",
  start: async (
    Zed,
    m,
    { text, prefix, isBotAdmin, isAdmin, pushName, metadata, args, mime }
  ) => {
    if (!isAdmin && !isBotAdmin)
      return m.reply(`*- عـذراً عـزيـزي هـذا الامـر خـاص بالبـوت والمشرفيـن فقـط ؟!*`);

    if (!args[0])
      return m.reply(`Please provide a new group name !`);

    var newGCName = args.join(" ");
    var oldGCName = metadata.subject;

    try {
      ppgc = await Zed.profilePictureUrl(m.from, "image");
    } catch {
      ppgc = "https://wallpapercave.com/wp/wp10524580.jpg";
    }

    await Zed.groupUpdateSubject(m.from, newGCName)
      .then((res) =>
        Zed.sendMessage(
          m.from,
          {
            image: { url: ppgc, mimetype: "image/jpeg" },
            caption: `*『 Group Name Changed 』*\n\n_🔶 Old Name:_\n*${oldGCName}*\n\n_🔷 New Name:_\n*${args.join(
              " "
            )}*\n`,
          },
          { quoted: m }
        )
      )
      .catch((err) => replay(jsonformat(err)));
  },
};
