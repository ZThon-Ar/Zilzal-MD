let {toAudio} = require('../../lib/File-Converter.js');

module.exports = {
    name: "لبصمه",
    alias: ["getaudio"],
    desc: "To get audio file from a voice note or video",
    category: "اوامـر الصيـغ",
    usage: "toaudio <reply to audio/video>",
    react: "🍁",
    start: async (Zed, m, { text, prefix, quoted, pushName, mime, body }) => {
        if (!/video/.test(mime) && !/audio/.test(mime)) return m.reply(`Send/Reply Video/Audio You Want To Convert Into Audio With Caption *${prefix}tomp3*`);
        if (!m.quoted) return m.reply(`Send/Reply Video/Audio You Want To Convert Into Audio With Caption ${prefix}tomp3`);
        let media = await quoted.download()
        let audio = await toAudio(media, 'mp4')
        Zed.sendMessage(m.from, {audio: audio, mimetype: 'audio/mpeg'}, { quoted : m })
    }
}