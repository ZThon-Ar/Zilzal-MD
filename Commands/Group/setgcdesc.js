module.exports = {
  name: "ضع وصف",
  alias: ["setdescgc", "setdesc", "setgroupdesc", "setgroupdescription"],
  desc: "Change the group description",
  category: "اوامـر المجمـوعـة",
  usage: `setdesc <New group description>`,
  react: "🍁",
  start: async (
    Zed,
    m,
    { text, prefix, isBotAdmin, isAdmin, pushName, metadata, args, mime }
  ) => {
    if (!isAdmin && !isBotAdmin) return m.reply(`*- عـذراً عـزيـزي هـذا الامـر خـاص بالبـوت والمشرفيـن فقـط ؟!*`);
    if (!args[0])
      return Zed.sendMessage(
        m.from,
        { text: `Please provide a new group description !` },
        { quoted: m }
      );

    var newGCdesc = args.join(" ");

    try {
      ppgc = await Zed.profilePictureUrl(m.from, "image");
    } catch {
      ppgc = botImage1;
    }

    await Zed.groupUpdateDescription(m.from, newGCdesc)
      .then((res) =>
        Zed.sendMessage(
          m.from,
          {
            image: { url: ppgc, mimetype: "image/jpeg" },
            caption: `*『 Group Description Changed 』*\n\n_🧩 New Description:_\n*${args.join(
              " "
            )}*`,
          },
          { quoted: m }
        )
      )
      .catch((err) => replay(jsonformat(err)));
  },
};
