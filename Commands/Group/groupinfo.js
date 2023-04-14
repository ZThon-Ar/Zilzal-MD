const moment = require('moment-timezone')

module.exports = {
    name: "المجموعة",
    alias: ["groupinfo"],
    desc: "لـ عـرض معلومـات المجمـوعـة",
    category: "اوامـر المجمـوعـة",
    usage: `setdesc <New group description>`,
    react: "🍁",
    start: async (
      Zed,
      m,
      { text, prefix, isBotAdmin, isAdmin, pushName, metadata, args,mime }
    ) => {
        try {
            ppgc = await Zed.profilePictureUrl(m.from, "image");
          } catch {
            ppgc = botImage1;
          }
          const participants = m.isGroup ? await metadata.participants : ''
          const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
          const groupOwner = m.isGroup ? metadata.owner : ''    
          desc = metadata.desc ? metadata.desc : 'لايوجـد وصـف'
          let txt = `                 *『 معلومـات المجمـوعـة 』*\n\n_🎀 الاسـم :_ *${metadata.subject}*\n\n_🧩 الوصـف :_\n${desc}\n\n_👑 المـالك :_ @${metadata.owner.split('@')[0]}\n_💫 تاريـخ الانشـاء :_ *${moment(`${metadata.creation}` * 1000).tz('Asia/Baghdad').format('DD/MM/YYYY')}*\n_📛 عـدد المشـرفيـن :_ *${groupAdmins.length}*\n_🎈 عـدد الاعضـاء :_ *${metadata.participants.length}*\n`;
        
          await Zed.sendMessage(
            m.from,
        {
          image: { url: ppgc, mimetype: "image/jpeg" },
          caption: txt,
          mentions: [metadata.owner]
        },
        { quoted: m }
      );
    }
  }