const fs = require("fs");
const Jimp = require("jimp");

module.exports = {
  name: "ضع صوره",
  alias: ["setgcpp", "setppgroup"],
  desc: "Set a group profile picture.",
  category: "اوامـر المجمـوعـة",
  usage: `Tag an Image and type -setppgc}`,
  react: "🍁",
  start: async (
    Zed,
    m,
    { text, prefix, isBotAdmin, isAdmin, mentionByTag, pushName, mime, quoted }
  ) => {
    if (!isAdmin && !isBotAdmin) return m.reply(`*- عـذراً عـزيـزي هـذا الامـر خـاص بالبـوت والمشرفيـن فقـط ؟!*`);

    if (!/image/.test(mime))
      return Zed.sendMessage(
        m.from,
        {
          text: `Send/Reply Image With Caption ${
            prefix + "setgcpp"
          } to change the Profile Pic of this group.`,
        },
        { quoted: m }
      );
    if (/webp/.test(mime))
      return Zed.sendMessage(
        m.from,
        {
          text: `Send/Reply Image With Caption ${
            prefix + "setgcpp"
          } to change the Profile Pic of this group.`,
        },
        { quoted: m }
      );

    let quotedimage = await Zed.downloadAndSaveMediaMessage(quoted);
    var { preview } = await generatePP(quotedimage);

    await Zed.query({
      tag: "iq",
      attrs: {
        to: m.from,
        type: "set",
        xmlns: "w:profile:picture",
      },
      content: [
        {
          tag: "picture",
          attrs: { type: "image" },
          content: preview,
        },
      ],
    });
    fs.unlinkSync(quotedimage);

    ppgc = await Zed.profilePictureUrl(m.from, "image");

    Zed.sendMessage(
      m.from,
      {
        image: { url: ppgc },
        caption: `\nGroup Profile Picture has been updated Successfully by *${pushName}* !`,
      },
      { quoted: m }
    );
  },
};

async function generatePP(buffer) {
  const jimp = await Jimp.read(buffer);
  const min = jimp.getWidth();
  const max = jimp.getHeight();
  const cropped = jimp.crop(0, 0, min, max);
  return {
    img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
    preview: await cropped.normalize().getBufferAsync(Jimp.MIME_JPEG),
  };
}
