const axios = require("axios");
module.exports = {
  name: "كيثاب",
  alias: ["gh"],
  desc: "لـ البحث وجلب معلومـان عن مستودعـات وسـورسـات من كيثـاب",
  category: "اوامـر البحث",
  usage: `gh <github username>`,
  react: "🍁",
  start: async (Zed, m, { text, prefix, pushName, args,mime }) => {
    if (!args[0])
      return Zed.sendMessage(
        m.from,
        { text: `Please provide a GitHub username !` },
        { quoted: m }
      );
    var newGCdesc = args.join(" ");

    var GHuserInfo = await axios
      .get(`https://api.github.com/users/${newGCdesc}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
    let GhUserPP = GHuserInfo.avatar_url;
    let resText = `        *🏮 GitHub User Info 🏮*\n\n_🎀 Username:_ *${GHuserInfo.login}*\n_🧩 Name:_ *${GHuserInfo.name}*\n\n_🧣 Bio:_ *${GHuserInfo.bio}*\n\n_🍁 Total Followers:_ *${GHuserInfo.followers}*\n_🔖 Total Public Repos:_ *${GHuserInfo.public_repos}*\n_📌 Website:_ ${GHuserInfo.blog}\n`;

    await Zed.sendMessage(
      m.from,
      {
        image: { url: GhUserPP, mimetype: "image/jpeg" },
        caption: resText,
      },
      { quoted: m }
    );
  },
};
