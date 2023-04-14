module.exports = {
  name: "الاوامر",
  alias: ["menu", "الاوامر", "مساعده", "helpmenu"],
  desc: "لـ عـرض لوحـة بـ كـل اوامـر البـوت",
  react: "✨",
  category: "اوامـر عامـه",
  start: async (
    Zed,
    m,
    { prefix, pushName, NSFWstatus, args, commands, text }
  ) => {
    if (args[0]) {
      let data = [];
      let name = args[0].toLowerCase();
      let cmd =
        commands.get(name) ||
        Array.from(commands.values()).find((v) => v.alias.includes(name));
      if (!cmd || cmd.type == "hide") return m.reply("لايوجـد امـر بهـذا الاسـم");
      else
        data.push(
          `🍁الامـر : ${cmd.name.replace(/^\w/, (c) => c.toUpperCase())}`
        );
      if (cmd.alias) data.push(`👾Alias : ${cmd.alias.join(", ")}`);
      if (cmd.cool) data.push(`⏱️Cooldown: ${cmd.cool}`);
      if (cmd.desc) data.push(`🧾Description : ${cmd.desc}`);
      if (cmd.usage)
        data.push(
          `💡مثــال : ${cmd.usage
            .replace(/%prefix/gi, prefix)
            .replace(/%command/gi, cmd.name)
            .replace(/%text/gi, text)}`
        );
      var buttonss = [
        {
          buttonId: `${prefix}الاوامر`,
          buttonText: { displayText: `الاوامر` },
          type: 1,
        },
      ];
      let buth = {
        text: `ℹ️معلومـات الامـر\n\n${data.join("\n")}`,
        footer: `${botName}`,
        buttons: buttonss,
        headerType: 1,
      };
      return Zed.sendMessage(m.from, buth, { quoted: m });
    } else {
      const pad = (s) => (s < 10 ? "0" : "") + s;
        const formatTime = (seconds) => {
        const hours = Math.floor(seconds / (60 * 60));
        const minutes = Math.floor((seconds % (60 * 60)) / 60);
        const secs = Math.floor(seconds % 60);
        return time = `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
        };
        const uptime = () => formatTime(process.uptime());

const now = new Date();
        const hour = now.getHours();
       let greeting;

        if (hour >= 0 && hour < 12) {
          greeting = "صباح الخير"; //good morning
        } else if (hour >= 12 && hour < 18) {
          greeting = "مساء الخيرات"; //good afternoon
        } else {
          greeting = "مساء الخير"; //good evening
        }
      let textHelpMenu = `${greeting} *${pushName}* Senpai,

انا بـوت اسمـي *${botName}*,

تم تنصيب البوت بواسطـة سورس واتسـاب يـوزربـوت

*اول سـورس بـوت عـربي علـى واتسـاب¹*

🎀 يجب استخدام هذا الرمز قبل كل امر : *${prefix}*

🧩 وقت التشغيـل : *${uptime()}*

اليـك عـزيـزي لوحـة اوامـر البـوت الرئيسيـة \n
           
╭──────ꕥ اوامـر عامـه ꕥ─────╮
├
├・🎐 الاوامر
├・🎐 فحص
├・🎐 المالك 
├・🎐 السورس
├
╰──────────────────╯
╭─────ꕥ اوامـر المجمـوعـة ꕥ─────╮
├
├・🏮 المشرفين
├・🏮 البوت تفعيل/تعطيل
├・🏮 الروابط تفعيل/تعطيل
├・🏮 الترحيب تفعيل/تعطيل
├・🏮 الدردشة فتح/قفل
├・🏮 الرد التلقائي تفعيل/تعطيل
├・🏮 رفع/تنزيل مشرف
├・🏮 مسح
├・🏮 الرابط
├・🏮 تغيير الرابط
├・🏮 المجموعة
├・🏮 تاك/منشن
├・🏮 طرد
├・🏮 ضع اسم
├・🏮 ضع وصف
├・🏮 ضع صوره
├
╰──────────────────╯
╭──────ꕥ اوامـر البـوت ꕥ──────╮
├
├・🎀 رفع/تنزيل متحكم
├・🎀 حظر/الغاء حظر
├・🎀 المحظورين
├・🎀 بلوك/الغاء بلوك
├・🎀 احظر/الغاء حظر مجموعة
├・🎀 اذاعه
├・🎀 التحكم
├・🎀 رد الخاص تفعيل/تعطيل
├・🎀 انضم
├
╰──────────────────╯          
╭──────ꕥ اوامـر التحميـل ꕥ─────╮
├
├・💫 انستا + رابـط
├・💫 بنترست + رابـط
├・💫 صوره + كلمـه
├・💫 متحركه + كلمـه
├・💫 ملصق + كلمـه
├・💫 نغم + كلمـه
├・💫 خلفيات + كلمـه
├・💫 لاريكس + اسـم الاغنيـه
├・💫 بحث + اسـم الاغنيـه
├・💫 فيديو + اسـم فيـديـو
├・💫 تحميل صوت + رابـط
├・💫 تحميل فيديو + رابـط
├・💫 تحميل ملف + رابـط
├・💫 ميديافاير + رابـط
├・💫 تيك توك + رابـط
├・💫 تيك صوت + رابـط
├・💫 تيك فيديو + رابـط
├・💫 تيك ملف + رابـط
├
╰──────────────────╯
╭─────ꕥ اوامـر البحث ꕥ─────╮
├
├・🔎 جوجل + كلمـه
├・🔎 يوتيوب + كلمـه
├・🔎 كيثاب + اليـوزر
├・🔎 طقس + اسـم مدينـة او منطقـه
├
╰──────────────────╯
╭────ꕥ اوامـر الصيـغ ꕥ────╮
├
├・🎗 لملصق
├・🎗 لصوره
├・🎗 لمتحركه
├・🎗 لصوت
├・🎗 لبصمه
├・🎗 لفيديو
├・🎗 ميكس
├
╰──────────────────╯\n\n`;

      textHelpMenu += `*🔰  ${botName}  🔰*
 *- السـورس تابـع لـ مجموعـة سـورسـات : زدثــون تيليجـرام*

🎀 لـ استخـدام الاوامـر اكتب نقطـه بدايـة كـل امـر " *${prefix}اسم الامر* ".

🏮 لـ عـرض قنـاة السـورس الرسميـة ارسـل " *${prefix}الدعم* ".\n`;

      await Zed.sendMessage(m.from, {video: { url: botVideo }, gifPlayback: true, caption: textHelpMenu,}, { quoted: m });
    }
  },
};
