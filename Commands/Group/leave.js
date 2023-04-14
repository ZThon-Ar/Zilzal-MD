const { mku } = require("../../Database/dataschema.js");

module.exports = {
  name: "غادر",
  alias: ["leavegc"],
  desc: "ask bot to leave a group",
  category: "اوامـر المجمـوعـة",
  usage: "غادر",
  react: "👋",
  start: async (
    Zed,
    m,
    {isCreator, isAdmin, participants }
  ) => {
    var modStatus = await mku
      .findOne({ id: m.sender })
      .then(async (user) => {
        if (user.addedMods == "true") {
          return "true";
        } else {
          return "false";
        }
      })
      .catch((error) => {
        console.log(error);
      });

    if (modStatus == "false" && !isCreator && !isAdmin)
      return m.reply("Sorry, only *Group Admins* and *Mods* can use this command !");

    await Zed.sendMessage(m.from, {
      image: { url: "https://wallpapercave.com/wp/wp9667218.png" },
      caption: `I'm Leaving this group on request... \n\nTake care everyone :)`,
      mentions: participants.map((a) => a.id),
      quoted: m,
    }).then(async () => {
      Zed.groupLeave(m.from).catch((e) => {
        Zed.sendMessage(m.from, { text: `An error Occurd !` }, { quoted: m });
      });
    });
  },
};
