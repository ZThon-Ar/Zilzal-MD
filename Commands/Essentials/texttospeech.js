const ttt = require("google-tts-api");

module.exports = {
  name: "انطق",
  alias: ["speak", "texttospeech", "tts"],
  desc: "Say somethong using bot.",
  usage: "انطق + نـص",
  react: "🍁",
  category: "Essentials",
  start: async (Zed, m, { pushName, prefix, args, text, mime }) => {
    if (!text && m.quoted) {
      message = `${m.quoted ? m.quoted.msg : ""}`;
    } else if (args[0]) {
      message = args.join(" ");
    } else {
      message = `Please provide me a text to say ${pushName} senpai !`;
    }

    const texttospeechurl = ttt.getAudioUrl(message, {
      lang: "ar",
      slow: false,
      host: "https://translate.google.com",
    });

    Zed.sendMessage(
      m.from,
      { audio: { url: texttospeechurl }, mimetype: "audio/mpeg" },
      { quoted: m }
    ).catch((e) => {
      m.reply(`An error Occurd !`);
    });
  },
};
