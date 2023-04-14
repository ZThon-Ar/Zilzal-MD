const { mku } = require("../../Database/dataschema.js");

module.exports = {
  name: "المالك",
  desc: "To view the list of current Mods",
  alias: ["modlist", "mods", "mod"],
  category: "اوامـر عامـه",
  usage: "المالك",
  react: "🏅",
  start: async (Zed, m, { text, prefix }) => {
    try {
      var modlist = await mku.find({ addedMods: "true" });
      var modlistString = "";
      var ownerList = global.owner;
      modlist.forEach((mod) => {
        modlistString += `\n@${mod.id.split("@")[0]}\n`;
      });
      var mention = await modlist.map((mod) => mod.id);
      let xy = modlist.map((mod) => mod.id);
      let yz = ownerList.map((owner) => owner + "@s.whatsapp.net");
      let xyz = xy.concat(yz);

      ment = [ownerList.map((owner) => owner + "@s.whatsapp.net"), mention];
      let textM = `    🧣  *${botName} Mods*  🧣\n\n`;

      if (ownerList.length == 0) {
        textM = "*No Mods Added !*";
      }

      for (var i = 0; i < ownerList.length; i++) {
        textM += `\n〽️ @${ownerList[i]}\n`;
      }

      if (modlistString != "") {
        for (var i = 0; i < modlist.length; i++) {
          textM += `\n🎀 @${modlist[i].id.split("@")[0]}\n`;
        }
      }

      if (modlistString != "" || ownerList.length != 0) {
        textM += `\n\n📛 *Don't Spam them to avoid Blocking !*\n\n🎀 For any help, type *${prefix}support* and ask in group.\n\n*💫 Thanks for using ${botName}. 💫*\n`;
      }

      return Zed.sendMessage(
        m.from,
        { video: { url: botVideo },
        gifPlayback: true,
        caption: textM, 
        mentions: xyz },
        { quoted: m }
      );
    } catch (err) {
      console.log(err);
      return Zed.sendMessage(
        m.from,
        { text: `An internal error occurred while fetching the mod list.` },
        { quoted: m }
      );
    }
  },
};
