const { Telegraf, Markup, Telegram } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const telegram = new Telegram(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(
      ctx.chat.id,
      "Assalomu alaykum!\nЗдравствуйте!",
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "🇺🇿 O`zbekcha", callback_data: "btn_us_0" },
              { text: "🇷🇺 Русский", callback_data: "btn_ru_0" },
            ],
          ],
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
});
// ru
bot.action("btn_ru_0", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русcкий", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "📰Новости", callback_data: "btn_ru_1-1" },
            { text: "💵 Курсы валют", url: "https://cbu.uz" },
          ],
          [
            { text: "📍🗺 Адреса", callback_data: "btn_ru_1" },
            {
              text: "📝 Оставить заявку",
              callback_data: "btn_ru_1-0",
            },
          ],

          [
            { text: "🖥  Связаться ☎️", callback_data: "btn_ru_5" },
            { text: "👷🏻‍♂️ Для Мигрантов", callback_data: "btn_ru_2" },
          ],
          [
            { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            {text: "⚖️❗️ Сообщение о случаях коррупции", callback_data: "btn_ru_cur"}
          ],
          [
            
            { text: "⬅️ Назад", callback_data: "btn_ru_4" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
// uz
bot.action("btn_us_0", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "📰 Yangiliklar", callback_data: "btn_uz_1-1" },
            { text: "💵 Valyutalar kursi", url: "https://cbu.uz" },
          ],
          [
            { text: "📍🗺 Manzillar", callback_data: "btn_uz_1" },
            {
              text: "📝 Murojaat qoldirish",
              callback_data: "btn_uz_1-0",
            },
          ],
          [
            { text: "🖥  Bog`lanish ☎️", callback_data: "btn_uz_5" },
            { text: "👷🏻‍♂️ Mehnat migrantlari uchun", callback_data: "btn_uz_2" },
          ],
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            { text: "⚖️❗️ Korupsiya holatlari haqida xabar berish", callback_data: "btn_ru_cur"}
          ],
          [
            
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_4" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Korupsiya holatlari haqida xabar berish

bot.action("btn_uz_cur", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await ctx.replyWithHTML(`Agar sizda korrupsiya holatlari kuzatilgan bo'lsa, siz pastdagi <b>Xabar berish</b> tugmasini bosish orgali holat yuzasidan xabar berishingiz mumkin.\n\nBunda sizdan\nFISH: ___________________\n\nAdres: __________________\n\nTel: ____________________\nkabi malumotlar berish talab etiladi.`)
    
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            {text: 'Xabar berish', callback_data: 'btn_uz_mes'}
          ],
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_us_0" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Сообщение о случаях коррупции

bot.action("btn_ru_cur", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await ctx.replyWithHTML(`Если у вас есть случай коррупции, вы можете сообщить о нем, нажав кнопку <b> Сообщить </b> ниже.`)
    
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русcкий", {
      reply_markup: {
        inline_keyboard: [
          [
            {text: 'Сообщить', callback_data: 'btn_ru_mes'}
          ],
          [
            { text: "🏠 Главная страница", callback_data: "btn_ru _3" },
            { text: "⬅️ Назад", callback_data: "btn_ru_0" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Xabar berish
bot.action('btn_uz_mes', async (ctx)=>{
  try {
    await ctx.deleteMessage();
    await ctx.reply("Xabar qoldiring....")
  } catch (error) {
    console.error(error);
  }
})

// Сообщить
bot.action('btn_ru_mes', async (ctx)=>{
  try {
    await ctx.deleteMessage();
    await ctx.reply("Оставьте сообщение....")
  } catch (error) {
    console.error(error);
  }
})

// Xabar qoldiring....
bot.on('text', async(ctx)=>{
  try {
    await ctx.deleteMessage();
    await ctx.reply(`${ JSON.stringify(ctx.update.message.text)}`)
    await bot.telegram.sendMessage(ctx.chat.id, `Ariza qabul qilindi, ${ctx.chat.id}`, {
      reply_markup: {
        inline_keyboard: [
            [{ text: "⬅️ Ortga qaytish", callback_data: "btn_uz_cur" },],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
})  

// Murojaat qoldirish
bot.action("btn_uz_1-0", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Migration.uz",
              url: "http://migration.uz/application/create",
            },
            { text: "Birgamiz.com", url: "https://www.birgamiz.com/" },
          ],
          [
            {
              text: "Labor.com",
              url: "https://labormigration.uz/contacts/agency",
            },
            {
              text: "Tashqi ishlar vazirligi",
              url: "https://consulate.mfa.uz/site/index?language=uz",
            },
          ],
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_us_0" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Оставить заявку
bot.action("btn_ru_1-0", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Migration.uz",
              url: "http://migration.uz/application/create",
            },
            { text: "Birgamiz.com", url: "https://www.birgamiz.com/" },
          ],
          [
            {
              text: "Labor.com",
              url: "https://labormigration.uz/contacts/agency",
            },
            {
              text: "МИД",
              url: "https://consulate.mfa.uz/site/index?language=ru",
            },
          ],
          [
            { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            { text: "⬅️ Назад", callback_data: "btn_ru_0" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

bot.action("telru", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await ctx.reply("1282");
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            { text: "⬅️ Назад", callback_data: "btn_ru_1-0" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
bot.action("tel", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await ctx.reply("1282");
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_1-0" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Yangiliklar
bot.action("btn_uz_1-1", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "IIV.uz", url: "https://iiv.uz/" },
            { text: "MFA.uz", url: "https://mfa.uz/uz" },
          ],
          [
            { text: "TMMA uz", url: "https://t.me/migratsiyaagentligi" },
            {
              text: "Uzbekistan Airways",
              url: "https://t.me/uzbekistanairways",
            },
          ],
          [
            { text: "O`zbekiston yangiliklari", url: "https://t.me/NuzUzru" },
            { text: "Huquqiy axborot", url: "https://t.me/huquqiyaxborot" },
          ],
          [
            {
              text: "O`zbekiston temir yollari",
              url: "https://t.me/uzrailwaypress",
            },
           
          ],
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_us_0" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
// Новости
bot.action("btn_ru_1-1", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "МВД.уз", url: "https://iiv.uz/ru" },
            { text: "МИД.уз", url: "https://mfa.uz/ru" },
          ],
          [
            { text: "АВТМ уз", url: "https://t.me/migratsiyaagentligi" },
            {
              text: "Узбекские авиалинии",
              url: "https://t.me/uzbekistanairways",
            },
          ],
          [
            { text: "Новости Узбекистана", url: "https://t.me/NuzUzru" },
            { text: "Легальная информация", url: "https://t.me/pravoinf" },
          ],
          [
            { text: "ЖД Узбекистана", url: "https://t.me/uzrailwaypress" },
          ],
          [
            { text: "🏠 Главная страница", callback_data: "btn_uz_3" },
            { text: "⬅️ Назад", callback_data: "btn_us_0" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Mehnat migrantlari uchun
bot.action("btn_uz_2", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "🗂 Qonunchilik hujjatlari 🗂", callback_data: "btn_uz_120" }],
          [
            {
              text: "🇺🇿 🇰🇷 Janubiy Koreyada ishlash 🇰🇷 🇺🇿",
              callback_data: "btn_uz_121",
            },
          ],
          [
            {
              text: "🌏 💼 Xorijda ishlash 💼 🌏",
              callback_data: "btn_uz_122",
            },
          ],
          [
            {
              text: "❌ Xorijga chiqish taqiqi va qarzdorlikni tekshirish ❌",
              url: "https://mib.uz/home;jsessionid=3C820B4277E286E00DE23E6876788014.mib.uz1_1",
            },
          ],          
          [
            {
              text: "🤝 Hamkorlik shartnomalari 🤝",
              url: "https://labormigration.uz/all-jobs/tmma-employers",
            },
          ],
          [
            {
              text: "🌎🇺🇿 Xorijiy ishchi kuchini jalb etish jarayonini tartibga solish meyorlari",
              callback_data: "btn_uz_a1",
            },
          ],
          [
            {
              text: "🎓 Mehnat migrantlariga huquqiy yordam 🎓",
              callback_data: "btn_uz_125",
            },
          ],
          
          [
            {
              text: "🛬 🇺🇿 Mehnat migrantlari reintegratsiyasi 🛬 🇺🇿",
              callback_data: "btn_uz_126",
            },
          ],
          [
            {
              text: "💵🏡 Mehnat migrantlariga moddiy va ishtimoiy yordam 💵🏡",
              callback_data: "btn_uz_127",
            },
          ],
          

          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_us_0" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

//O‘zResga Xorijiy ishchi kuchini jalb etish jarayonini tartibga solish meyorlari
bot.action("btn_uz_a1", async (ctx)=>{
  try {
    await ctx.deleteMessage();
    await ctx.reply(`
    a) ariza.
    Arizada quyidagilar ko‘rsatiladi:
    chet el fuqarosining F.I.Sh., telefon raqami, elektron pochta manzili, O‘zbekiston Respublikasida yashash manzili;
    maʼlumoti, mutaxassisligi;
    ish beruvchining F.I.Sh yoki nomi, faoliyat turi, STIR (JSH SHIR);
    taxmin qilingan ish haqqi, muntazamligi, lavozimi;
    migratsiya va fuqarolikni rasmiylashtirish bo‘limlarida ro‘yxatdan o‘tish muddatlari (bor bo‘lsa);
    b) chet el fuqarosi pasportining elektron nusxasi;
    v) chet el fuqarosini O‘zbekiston Respublikasiga jalb qilish istagi va shartlari to‘g‘risida ish beruvchi bilan ish haqqi (mukofot puli) hajmi ko‘rsatilgan dastlabki kelishuvni tasdiqlovchi mehnat shartnomasining loyihasi;
    g) chet el fuqarosining 3x4 sm hajmli elektron fotosurati;
    d) chet el fuqarosining malakasini tasdiqlovchi hujjatlar;
    e) viza rejimi o‘rnatilgan xorijiy davlatlar fuqarolari kirish vizasining nusxasi («E» mehnat vizasi, «B-1» va «B-2» biznes vizasi, “S-3” xizmat vizasi yoki vatandoshlar uchun nazarda tutilgan boshqa turdagi vizalar).
    `)
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_2" },
          ],
        ]
      }
    })
    
  } catch (error) {
    console.error(error);
  }
})
//O‘zResga Xorijiy ishchi kuchini jalb etish jarayonini tartibga solish meyorlari
bot.action("btn_uz_a1", async (ctx)=>{
  try {
    await ctx.deleteMessage();
    await ctx.reply(`
    a) ariza.
    Arizada quyidagilar ko‘rsatiladi:
    chet el fuqarosining F.I.Sh., telefon raqami, elektron pochta manzili, O‘zbekiston Respublikasida yashash manzili;
    maʼlumoti, mutaxassisligi;
    ish beruvchining F.I.Sh yoki nomi, faoliyat turi, STIR (JSH SHIR);
    taxmin qilingan ish haqqi, muntazamligi, lavozimi;
    migratsiya va fuqarolikni rasmiylashtirish bo‘limlarida ro‘yxatdan o‘tish muddatlari (bor bo‘lsa);
    b) chet el fuqarosi pasportining elektron nusxasi;
    v) chet el fuqarosini O‘zbekiston Respublikasiga jalb qilish istagi va shartlari to‘g‘risida ish beruvchi bilan ish haqqi (mukofot puli) hajmi ko‘rsatilgan dastlabki kelishuvni tasdiqlovchi mehnat shartnomasining loyihasi;
    g) chet el fuqarosining 3x4 sm hajmli elektron fotosurati;
    d) chet el fuqarosining malakasini tasdiqlovchi hujjatlar;
    e) viza rejimi o‘rnatilgan xorijiy davlatlar fuqarolari kirish vizasining nusxasi («E» mehnat vizasi, «B-1» va «B-2» biznes vizasi, “S-3” xizmat vizasi yoki vatandoshlar uchun nazarda tutilgan boshqa turdagi vizalar).
    `)
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_2" },
          ],
        ]
      }
    })
    
  } catch (error) {
    console.error(error);
  }
})

// Xorijdan qaytganlarni mehnat va kasbiy reintegratsiya qilish
bot.action("btn_uz_126", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await ctx.reply(`
      Хориждан қайтганларни меҳнат ва касбий реинтеграция қилиш бошқармаси 

      Хориждан қайтиб келган меҳнат мигрантларига кўрсатиладиган 
      молиявий ёрдам ва ҳизматлар 
      1.Тадбиркорлик ўқув курсларига йўналтириш;
      2.Имтиёзли кредит олишда кўмак кўрсатиш;
      3.Субсидия бериш орқали бандлигини таъминлаш;
      4.АБКМ томонидан бўш (вакант) иш ўринларига шартнома асосида ишга жойлаштириш;
      5.Касб-хунарга ўқитиш;
      6.Танлов жараёнларига жалб қилиш;
      Меҳнат мигрантларининг оила аъзоларини ижтимоий ҳимоя қилиш йўналишида
      1.Боқувчиси хорижга меҳнат миграциясига чиқиб кетган ва “Ижтимоий ҳимоя ягона реестри” ахборот тизимида рўйхатда бўлган оилаларга бир марталик моддий ёрдам кўрсатиш.
      2.Меҳнат миграциясига чиқиб кетган фуқароларнинг ногиронлиги бўлган оила аъзоларига дори-дармон, ногиронлик аравачалари, эшитиш аппаратлари ва ортопедик маҳсулотлар харид қилиш учун бир марталик моддий ёрдам ажратиш
      3.Меҳнат миграциясига чиқиб кетган фуқароларнинг болаларига оромгохларга бепул йўлланмалар бериш.
      4.Меҳнат миграциясига чиқиб кетган фуқароларнинг пенсия ёшидаги ва I ва II гуруҳ ногиронлиги бўлган оила аъзоларига санаторий ва профилактик даволаниш муассасаларига йўлланма бериш.
      `);
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_2" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
// Трудовая и профессиональная реинтеграция репатриантов
bot.action("btn_ru_126", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await ctx.reply(`
      Управление труда и профессиональной реинтеграции
        Оказываемые финансовая помощь и услуги вернувшим мигрантов из за границей:
        1.	Направление на бизнес обучающие курсы.
        2.	Помощь в получении льготных кредитов.
        3.	Обеспечение занятости за счет субсидий.
        4.	Трудоустройство по контракту на вакантные (вакантные) рабочие места со стороны АБКМ.
        5.	Обучение Профессиям.
        6.	Участие в процессе отбора.
        Социальная защита членов семей трудовых мигрантов:
        1.	Единовременная материальная помошь в однокртаном размере семьям, кормильцам которых выехали в трудовую миграцию зарегестрированных в информационной системе “Единый реестр социальной защиты”.
        2.	Единовременная материальная помошь в однокртаном размере для приобретения медикоментов, инвалидных колясок, слуховых аппаратов и ортопедических изделий семьям, кормильцам которых выехали в трудовую миграцию.
        3.	Выдача бесплатных путёвок в сезонные лагеря детям граждан выехавшиз в трудовую мигпацию.
        4.	Выдача бесплатных путёвок в санатории и лечебно-профилактические учреждения достигшим пенсионного возраста или имеющим инвалидность I и II группы лицам членам семей граждан, ввыехавших в трудовую миграцию.

      `);
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🏠 Главная сраница", callback_data: "btn_ru_3" },
            { text: "⬅️ Назад", callback_data: "btn_ru_2" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
// Xorijdagi mehnat migrantlarini ijtimoiy himoya qilish va moddiy yordam korsatish
bot.action("btn_uz_127", async (ctx) => {
  try {
    await ctx.deleteMessage();
    ctx.reply(`
    Xorijdagi mehnat migrantlarini ijtimoiy himoya qilish va moddiy yordam ko‘rsatish boshqarmasi
    Boshqarma o‘z faoliyatini bir necha yo‘nalishda olib boradi:
    1)	Xorijda mehnat faoliyatini amalga oshirish davrida vafot etgan fuqarolar jasadini O‘zbekistonga olib kelish;
    2)	Xorijda murakkab moliyaviy holatda qolgan, og‘ir tan-jarohati olgan, majburiy mehnat qurboni bo‘lgan, hujjatlarini yo‘qotgan fuqarolarni O‘zbekistonga qaytarishda avia va temiryo‘l chiptalari haqini to‘lash;
    3)	Xorijda yashash uchun mablag‘siz va boshpanasiz qolgan fuqarolarni vaqtinchalik turar-joy (hostel 30 sutkagacha) bilan ta’minlash;
    4)	Xorijda ishsiz, yashash uchun mablag‘siz, moliyaviy murakkab holda qolgan fuqarolarga moddiy yordam ko‘rsatish;
    5)	Xorijda mehnat faoliyatini amalga oshirish davrida o‘tkir yoki og‘ir kasallikka chalingan fuqarolarning tabbiy xizmat xarajatlarini to‘liq yoki qisman qoplab berish (1,5 ming AQSh dollarigacha)
    6)	Xorijda ishsiz qolgan fuqarolarga bo‘sh ish o‘rinlarini taklif qilish.
    
    Fuqarolar tomonidan taqdim qilinishi lozim bo‘lgan hujjatlar:
    1)	Agentlik boshlig‘i nomiga ariza;
    2)	Fuqarolik pasporti nusxasi;
    3)	Fuqaroning mehnat migrant ekanligini tasdiqlovchi hujjat;
    4)	Fuqaroning murakkab holatdaligini tasdiqlovchi xulosa (Agentlik vakolatxonasi, O‘zbekistonning xorijdagi Bosh konsulxonalari tomonidan);
    5)	Fuqaroning salomatligi bo‘yicha shifokor xulosasi;
    6)	Vafot etgan fuqaroning o‘lim guvohnomasi;
    7)	Fuqaroning majburiy mehnat qurboni bo‘lganligini tasdiqlovchi vakolatli organ tasdiqnomasi.
    
    
    `);
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_2" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
// Социальная защита и финансовая помощь трудящимся-мигрантам за рубежом
bot.action("btn_ru_127", async (ctx) => {
  try {
    await ctx.deleteMessage();
    ctx.reply(`
    Управление социальной защиты и материальной помощи трудовым мигрантам за рубежом 

      Основные направления:
      1.	Репатриации тел граждан Республики Узбекистан, умерших в период нахождения в трудовой миграции;
      2.	Оплата авиа и железнодорожных билетов  для возвращения в Узбекистан граждан Республики Узбекистан, подвергшим насилию, принудительному труду и дискриминации, нарушению трудовых и иных прав, попавших в сложное финансовое положение и оставших без документов, подверждающих личность, без средств к существованию в период осуществления трудовой деятельности за рубежом , а также получивших увечье или тяжелые травмы во время трудовой деятельности за рубежом;
      3.	Предоставление временного жилья  (хостел на срок до 30 суток) гражданам, оставшиеся без средств и жилья для проживания в период осуществления трудовой деятельности за рубежом;
      4.	Оказание социальной и материальной помощи гражданам, попавших в сложное финансовое положение, без жилья и работы в период осуществления трудовой деятельности за рубежом;
      5.	Полное или частичное возмещение медицинских расходов граждан Республики Узбекистан, перенесших острое или тяжелое заболевание в период осуществления трудовой деятельности за рубежом (до 1500 тыс долларов США);
      6.	Оказания содействия трудоустройства безработным гражданам РУз  в период осуществления трудовой деятельности за рубежом;

      Требуемые документы, которые должны быть предоставлены гражданами РУз:

      1.	Заявление на имя начальника АВТМ;
      2.	Копия паспорта гражданина РУз;
      3.	Подтверждающий документ об осуществлении трудовой деятельности за рубежом;
      4.	Заключение, подтверждающее сложное положение гражданина (Представителя Агентства, Генеральных консульств РУз за рубежом )
      5.	Медицинское заключение гражданина РУз;
      6.	Справка о смерти умершего гражданина РУз в период осуществления трудовой деятельности за рубежом;
      7.	Подтверждающий документ уполномоченного органа о том, что лицо подверглось к принудительному труду и дискриминации, нарушению трудовых и иных прав в период осуществления трудовой деятельности за рубежом;

    `);
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            { text: "⬅️ Назад", callback_data: "btn_ru_2" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Xorijdagi mehnat migrantlariga huquqiy yordam qilish
bot.action("btn_uz_125", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await ctx.reply(`Xorijdagi mehnat migrantlarini huquqiy himoya qilish boshqarmasi.

    Boshqarma oʻz faoliyatini bir necha yoʻnalishda olib boradi.
    1. Ish beruvchidan ish haqini undirish;
    2. Ish beruvchidan fuqarolik pasportini qaytarishda yordam berish;
    3. Ish paytida sog'likka etkazilgan zarar uchun tovon undirish;
    4. Ish paytida baxtsiz hodisa tufayli tovonni undirish;
    5. Fuqarolarga huquqiy maslahatlar;
    
    TMMA xodimlari tomonidan yuridik yordam ko‘rsatish uchun fuqarolar quyidagi hujjatlarni taqdim etishlari kerak.
    1. Yuqorida kursatilgan yordam turlari  uchun ariza;
    2. Fuqarolik pasporti nusxasi;
    3. Mehnat shartnomasining nusxasi;
    4. Migratsiya kartasi nusxasi;
    5. Patent nusxasi;`);

    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_2" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
// Управление по правовой защите трудовых мигрантов за рубежом
bot.action("btn_ru_125", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await ctx.reply(`Управление по правовой защите трудовых мигрантов за рубежом.\n 
    Управление осуществляет свою деятельность в нескольких направлениях.\n
    1.  Взыскание заработной платы от работодателя;n\
    2.  Помощь в возвращение гражданского паспорта от работодателя;\n 
    3.  Взыскание компенсации за причиненный ущерб здоровью во время работы;\n
    4.  Взыскание компенсации из-за несчастного случаю во время работы;\n
    5.  Правовое консультирование граждан;\n
    Для предоставления правовой помощи со стороны сотрудников АВТМ гражданам необходимо предоставить следующие документы.\n
    1. Заявление о помощи по вышеуказанным направлениям;\n
    2. Копию гражданского паспорта;\n
    3. Копию трудового договора;\n
    4. Копия миграционной карты;\n
    5. Копия патента;`);
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            { text: "⬅️ Назад", callback_data: "btn_ru_2" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Xorijda ishlash
bot.action("btn_uz_122", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "TMMA tomonidan taqdim etilayotgan xorijdari vakansiyalar",
              url: "https://labormigration.uz/all-jobs/tmma-vacancies",
            },
          ],
          [
            {
              text: "👩🏻‍🦰 Ayollar uchun xorijdagi bo`sh ish o`rinlari 👩🏻‍🦰",
              url: "https://labormigration.uz/all-jobs/womans-vacancies",
            },
          ],
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_2" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
// Работа заграницей
bot.action("btn_ru_122", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Зарубежные вакансии предоставленные со стороны АВТМ",
              url: "https://labormigration.uz/all-jobs/tmma-vacancies",
            },
          ],
          [
            {
              text: "👩🏻‍🦰 Работа за границей для женщин 👩🏻‍🦰",
              url: "https://labormigration.uz/all-jobs/womans-vacancies",
            },
          ],
          [
            { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            { text: "⬅️ Назад", callback_data: "btn_ru_2" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
// Janubiy Koreyada ishlash
bot.action("btn_uz_121", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Ketish tartibi",
              url: "https://mehnat.uz/oz/services/koreyada-ishlash",
            },
            { text: "Test sinovlari haqida", callback_data: "test" },
          ],

          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_2" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
// Работа в Южной Корее
bot.action("btn_ru_121", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Порядок отправления",
              url: "https://mehnat.uz/ru/services/rabota-v-koree",
            },
            { text: "О тестовых запусках", callback_data: "testru" },
          ],

          [
            { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            { text: "⬅️ Назад", callback_data: "btn_ru_2" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Test sinovlari haqida
bot.action("test", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await ctx.telegram.sendChatAction(ctx.chat.id, "upload_document");
    await ctx.telegram.sendDocument(ctx.chat.id, {
      source: "./src/Корея_тест_имтихонлари.docx",
    });
    // await ctx.replyWithHTML(`
    // Корея Республикасида эркин ёллаш тизими бўйича вақтинчалик меҳнат фаолиятини амалга ошириш учун ўтказиладиган тест имтихонлари бўйича

    // МАЪЛУМОТНОМА

    // Ташқи меҳнат миграцияси агентлиги томонидан фуқароларни Корея Республикасига вақтинчалик меҳнат фаолиятини амалга ошириш учун                  (E-9 ишчи виза) жўнатувчи агентлик сифатида тайинланган давлат ташкилоти ҳисобланади.
    // Корея Республикаси томонидан ишга қабул қилувчи ташкилот сифатида Кореянинг Инсон ресурсларини ривожлантириш хизмати масъул ҳисобланади (Human Resources Development Service of  Korea) кейинги матнларда “HRD” деб юритилади.
    // Тест имтихонларини ўтказиш Кореянинг Инсон ресурсларини ривожлантириш хизмати томонидан амалга оширилади. Ташқи меҳнат миграцияси агентлиги фақат ташкилотчи сифатида тестларни ташкиллаштиради кейинги матнда “Агентлик” деб юритилади.
    // Махсус тест (Special eps-topik) имтихони 1-босқичдан иборат ва 1-йилда                  3-маротабагача Корея Республикаси томонидан қўйилган талабларга асосан ўтказилиши мумкин.
    // Махсус тест (Special eps-topik) имтихони Корея Республикасида илгари ишлаб қайтган ва  HRD томонидан берилган рўйхатга асосан ўтказилади.
    // Махсус тест (Special eps-topik) имтихонидан муваффақиятли ўтган фуқароларни фақат ишчини маълумотларини HRDга тақдим қилган корхона танлаши мумкин. Агарда корхона фаолияти тугатилган бўлса ёки корхона рўйхатга киритган ишчисини маълум сабабларга кўра шартнома лойихасини юбормаган (шартнома бермаса) тақдирда, фуқаро умумий танловларда қатнашиш имкониятига эга бўлади.

    // Махсус тест (Special eps-topik) имтихонини ўтказилиш тартиби

    // Махсус тест (Special eps-topik) имтихонида қуйидаги фуқаролар қатнашишлари мумкин:
    // 1.	Корея Республикаси томонидан тақдим қилинган рўйхатда мавжуд бўлган фуқаролар;
    // 2.	Ёш чегараси 18 ёшга тўлган ҳамда 39 ёшга тўлмаган фуқаролар;
    // 3.	Ҳорижга чиқиш учун тақиқи мавжуд бўлмаган фуқаролар (хорижга чиқиш паспорти мавжуд фуқаролар);
    // 4.	Ҳар томонлама соғлом, юқумли касалликка чалинмаган фуқаролар;
    // 5.	Корея Республикаси худудига киришга тақиқи йўқ фуқаролар;
    // 6.	Судланмаган фуқаролар;
    // 7.	Корея Республикасида 5 йилдан ортиқ муддатда ишламаган фуқаролар.

    // HRD томонидан тест ўтказилиши режалаштирилаётган сана бўйича Агентликка маълумот тақдим қилинади.
    // Агентлик томонидан тест имтихони бўлиб ўтадиган манзил, тест имтихонини ўтказиш воситалари сони (компютерлар сони) бўйича  HRDга маълумот тақдим қилинади.
    // HRD тест имтихонида қатнашувчи фуқароларнинг фамилия исми, паспорт маълумотлардан иборат бўлган рўйхатни Агентликка тақдим қилади.
    // Агентлик HRD томонидан тақдим қилинган рўйхатга асосан ўрнатилган тартибда махсус тест имтихони ўтказиладиган сана, манзил ва тест имтихонига кириш учун онлайн рўйхатдан ўтиш тартиби, 24 АҚШ доллари миқдоридаги тўловни амалга ошириш усуллари ва ҳисоб рақамини кўрсатган ҳолда раҳбарият билан келишилган ҳолда расмий веб саҳифаси орқали ЭЪЛОН берилади.
    // Онлайн рўйхатдан ўтган ва ўрнатилган тўловларни амалга оширган фуқаролар махсус “Topik agency” сайти орқали махсус тест имтихонига кириш учун HRD томонидан белгиланган муддатларда Агентлик томонидан рухсатномалар расмийлаштирилади.
    // Махсус “Topik agency” сайти орқали махсус тест имтихонига кириш учун рухсатномалари расмийлаштирилган фуқаролар сони бўйича HRDга маълумот берилади.
    // Агентлик томонидан бериган рўйхатга асосан HRD тест имтихон кунини тасдиқлайди ва шу рўйхатга асосан Агентлик тест имтихонларини ташкиллаштирилади.
    // Махсус тест имтихонидан муваффақиятли ўтган фуқаролар танловлар базасига ўрнатилган тартибда киритиладилар.
    // Танловлар базасига кирган фуқароларнинг маълумотлари 2 йил давомида иш берувчилар танловида қатнашади.
    // Ишчиларни танлаш йил давомида хар чоракда ўтказилади.
    // Шартнома лойихаси ва виза тасдиқномаси келган фуқаролар, HRD томонидан берилган рўйхатга асосан Корея Республикасига вақтинчалик меҳнат фаолиятини амалга ошириш учун 4 йил 10 ой муддатга шарнома асосида жўнатиладилар.

    // Eps-topik имтихонини ўтказилиш тартиби

    // Eps-topik тест имтихонида қуйидаги фуқаролар қатнашишлари мумкин:
    // 1.	Ўзбекистон Республикаси фуқаролари;
    // 2.	Ёш чегараси 18 ёшга тўлган ҳамда 39 ёшга тўлмаган фуқаролар;
    // 3.	Корейс тилини билган фуқаролар;
    // 4.	Ҳорижга чиқиш учун тақиқи мавжуд бўлмаган фуқаролар;
    // 5.	Ҳар томонлама соғлом, юқумли касалликка чалинмаган фуқаролар;
    // 6.	Корея Республикаси худудига киришга тақиқи йўқ фуқаролар;
    // 7.	Судланмаган фуқаролар;
    // 8.	Корея Республикасида 5 йилдан ортиқ муддатда ишламаган фуқаролар.

    // - 1-босқич: Eps-Topik тест имтихонидан муваффақиятли ўтган бўлиши;
    // - 2-босқич: малака тест имтихони (Skill test) имтихонидан муваффқиятли ўтган бўлиши:
    // Eps-topik тест имтихони  умумий тартибда ўтказилиб, 1-йилда 1 ёки 2 маротаба Корея Республикаси томонидан қўйилган талабларга асосан ўтказилиши мумкин.
    // HRD томонидан тест ўтказилиши режалаштирилаётган сана бўйича Агентликка маълумот тақдим қилинади.
    // Агентлик томонидан тест имтихони бўлиб ўтадиган манзил, тест имтихонини ўтказиш воситалари сони (компютерлар сони) бўйича  HRDга маълумот тақдим қилинади.
    // Агентлик томонидан ўрнатилган тартибда 1-босқич: ББМ тест имтихонидан камида 100 баллик системада 70 балдан кам бўлмаган натижа кўрсатган ва саралаш натижасига кўра энг юқори балл тўплаган фуқароларнинг рўйхатига асосан Eps-topik тест имтихони ўтказиладиган сана, манзил ва тест имтихонига кириш учун онлайн рўйхатдан ўтиш тартиби, 24 АҚШ доллари миқдоридага тўловни амалга ошириш усуллари ва ҳисоб рақамини кўрсатган ҳолда раҳбарият билан келишилган ҳолда расмий веб саҳифаси орқали ЭЪЛОН берилади.
    // Онлайн рўйхатдан ўтган ва ўрнатилган тўловларни амалга оширган фуқаролар “Topik agency” сайти орқали Eps-topik тест имтихонига кириш учун HRD томонидан белгиланган муддатларда Агентлик томонидан рухсатномалар расмийлаштирилади.
    // “Topik agency” сайти орқали Eps-topik тест имтихонига кириш учун рухсатномалари расмийлаштирилган фуқаролар сони бўйича HRDга маълумот берилади.
    // Агентлик томонидан бериган рўйхатга асосан HRD Eps-topik тест имтихон кунини тасдиқлайди ва шу рўйхатга асосан Агентлик тест имтихонларини ташкиллаштирилади.
    // Eps-topik тест имтихонидан муваффақиятли ўтган фуқаролар кейинги малака тестида қатнашиш ҳуқуқини киритадилар. Малака тест имтихони ўтказилиш тартиби юқорида кўрсатилаган тартибга асосан ўтказилади.
    // Малака тестидан муваффақиятли ўтган фуқаролар танловлар базасига ўрнатилган тартибда киритиладилар.
    // Танловлар базасига кирган фуқароларнинг маълумотлари 2 йил давомида иш берувчилар танловида қатнашади.
    // Ишчиларни танлаш йил давомида хар чоракда ўтказилади.
    // Шартнома лойихаси ва виза тасдиқномаси келган фуқаролар, HRD томонидан берилган рўйхатга асосан Корея Республикасига вақтинчалик меҳнат фаолиятини амалга ошириш учун 4 йил 10 ой муддатга шарнома асосида жўнатиладилар.

    // `)
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_121" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
// О тестовых запусках
bot.action("testru", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await ctx.telegram.sendChatAction(ctx.chat.id, "upload_document");
    await ctx.telegram.sendDocument(ctx.chat.id, {
      source: "./src/Корея_тест_имтихонлари.docx",
    });
    // await ctx.reply(
    //   `
    //   Согласно системе бесплатного найма в Республике Корея
    //   осуществлять временную трудовую деятельность
    //    о проведенных контрольных экзаменах

    //   Справка

    //   Агентство по внешней трудовой миграции – это государственное учреждение, уполномоченное направлять граждан в Республику Корея для временного трудоустройства (рабочая виза E-9).
    //   Служба развития людских ресурсов Кореи отвечает за процесс найма в Республике Корея, именуемой в дальнейшем «HRD».
    //   Тестовые экзамены проводятся Корейской службой развития людских ресурсов. Агентство по внешней трудовой миграции организует тесты только как организатор, следующий текст называется «Агентство».
    //   Специальный экзамен eps-topical состоит из 1 этапа и может проводиться до 3 раз в 1 год в соответствии с требованиями, установленными Республикой Корея.
    //   Экзамен Special eps-Topic основан на списке, ранее разработанном в Республике Корея и опубликованном HRD.
    //   Граждане, успешно прошедшие специальный тест (Special eps-topical), могут быть отобраны только той компанией, которая предоставила информацию о сотруднике в HRD. Если предприятие ликвидируется или предприятие по каким-либо причинам не присылает зарегистрированному работнику зарегистрированный договор (не предоставляет договор), у гражданина появляется возможность участвовать в общем конкурсе.

    //   Порядок проведения специального теста (Special eps-topic)

    //   Пройти специальный тест (Special eps-topic) могут следующие граждане:
    //   1. Граждане из списка, предоставленного Республикой Корея;
    //   2. Граждане в возрасте от 18 лет до 39 лет;
    //   3. Граждане, не имеющие запрета на выезд (граждане, имеющие паспорт для выезда за границу);
    //   4. Граждане, полностью здоровые и свободные от инфекционных заболеваний;
    //   5. Граждане, которым не запрещен въезд на территорию Республики Корея;
    //   6. Несудимые граждане;
    //   7. Граждане, не работавшие в Республике Корея более 5 лет.

    //   Агентство будет проинформировано HRD о дате запланированного испытания.
    //   Агентство предоставляет HRD информацию о месте проведения тестирования, количестве средств тестирования (количество компьютеров).
    //   Правозащитник представляет в Агентство список фамилий и паспортных данных граждан, участвующих в проверке.
    //   Объявление будет сделано через официальный сайт Агентства по согласованию с руководством с указанием даты, адреса и процедуры онлайн-регистрации для допуска к тесту, способов оплаты в размере 24 долларов США и счета, в соответствии с список предоставлен HRD.
    //   Гражданам, которые зарегистрировались онлайн и произвели установленные платежи, будут выданы Агентством разрешения на сдачу специального тестового экзамена через специальный тематический сайт Агентства в сроки, установленные HRD.
    //   Информация о количестве граждан, которым выдано разрешение на сдачу спецтеста, будет проинформирована ОПЧ через специальный сайт агентства «Топик».
    //   На основании списка, предоставленного Агентством, тест HRD утверждает дату экзамена, и Агентство организует тестовые экзамены на основе этого списка.
    //   Граждане, успешно прошедшие специальную проверку, будут включены в базу данных в установленном порядке.
    //   Данные граждан, включенных в базу данных отбора, будут участвовать в отборе работодателей в течение 2 лет.
    //   Подбор сотрудников осуществляется ежеквартально в течение года.
    //   Граждане, получившие проект контракта и визовое подтверждение, будут направлены в Республику Корея на контрактной основе сроком на 4 года и 10 месяцев для выполнения временной трудовой деятельности в соответствии с перечнем, предоставленным HRD.

    //   Порядок проведения эпс-тематической экспертизы

    //   Тест на eps-topical могут пройти следующие граждане:
    //   1. Граждане Республики Узбекистан;
    //   2. Граждане в возрасте от 18 лет до 39 лет;
    //   3. Граждане, владеющие корейским языком;
    //   4. Граждане, которым не запрещен выезд за границу;
    //   5. Граждане во всех отношениях здоровые, свободные от заразных болезней;
    //   6. Граждане, которым не запрещен въезд на территорию Республики Корея;
    //   7. Несудимые граждане;
    //   8. Граждане, не работавшие в Республике Корея более 5 лет.

    //   - Этап 1: Успешное прохождение теста Eps-Topic;
    //   - Этап 2: Успешное прохождение проверки навыков:
    //   Экзамен eps-topic test проводится в соответствии с общей процедурой и может проводиться один или два раза в год в соответствии с требованиями, установленными Республикой Корея.
    //   HRD предоставит Агентству информацию о дате проведения испытания.
    //   Агентство предоставляет HRD информацию о месте проведения тестирования, количестве средств тестирования (количество компьютеров).
    //   Агентская сторона
    //   `
    // )
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            { text: "⬅️ Назад", callback_data: "btn_ru_121" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Для мигрантов
bot.action("btn_ru_2", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🗂 Миграционное законодательство 🗂",
              callback_data: "btn_ru_120",
            },
          ],
          [
            {
              text: "🇺🇿 🇰🇷 Работа в Южной Корее 🇰🇷 🇺🇿",
              callback_data: "btn_ru_121",
            },
          ],
          [
            {
              text: "🌏 💼 Работа заграницей 💼 🌏",
              callback_data: "btn_ru_122",
            },
          ],
          [
            {
              text: "❌ Запрет на выезд и проверка долга ❌",
              url: "https://mib.uz/home;jsessionid=3C820B4277E286E00DE23E6876788014.mib.uz1_1",
            },
          ],
          [
            {
              text: "🤝 Соглашения с иностранными работодателями 🤝",
              url: "https://labormigration.uz/all-jobs/tmma-employers",
            },
          ],
          [
            {
              text: "🌎🇺🇿 Получение подтверждения на право трудовой деятельности на территории РУз",
              callback_data: "btn_ru_a1",
            },
          ],
          [
            {
              text: "🎓 Юридическая помощь трудовым мигрантам за рубежом 🎓",
              callback_data: "btn_ru_125",
            },
          ],
          [
            {
              text: "🛬 🇺🇿 Трудовая и профессиональная реинтеграция репатриантов 🛬 🇺🇿",
              callback_data: "btn_ru_126",
            },
          ],
          [
            {
              text: "💵🏡 Социальная защита и финансовая помощь трудящимся-мигрантам за рубежом 💵🏡",
              callback_data: "btn_ru_127",
            },
          ],
          
          [
            { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            { text: "⬅️ Назад", callback_data: "btn_ru_0" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Получение подтверждения на право трудовой деятельности на территории РУз
bot.action("btn_ru_a1", async (ctx)=>{
  try {
    await ctx.deleteMessage();
    await ctx.reply(`
    а) приложение.
    В заявлении должно быть указано следующее:
    Ф.И.О. иностранного гражданина, номер телефона, адрес электронной почты, адрес проживания в Республике Узбекистан;
    образование, специалность;
    Ф.И.О. работодателя или наименование, вид деятельности, ИНН (ПИНФЛ);
    предполагаемая заработная плата, регулярность, должность;
    сроки регистрации в органах миграции и органах гражданства (при наличии);
    б) отсканированная копия паспорта иностранного гражданина;
    в) проект трудового договора, подтверждающий первоначальное согласование с работодателем о желании и условиях привлечения иностранного гражданина в Республику Узбекистан, с указанием размера заработной платы (премии);
    ж) отсканированная фотография иностранного гражданина размером 3х4 см;
    г) документы, подтверждающие квалификацию иностранного гражданина;
    д) копия въездной визы для граждан иностранных государств с визовым режимом ("E" рабочая виза, "B-1" и "B-2" бизнес виза, служебная виза "S-3" или другие типы виз для граждан).
    
    `)
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            { text: "⬅️ Назад", callback_data: "btn_ru_2" },
          ],
        ]
      }
    })
  } catch (error) {
    console.error(error);
  }
})

// Migratsiyaga oid qonun xujjatlari
bot.action("btn_uz_120", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Prezident hujjatlari",
              callback_data: "btn_uz_3-3",
            },
            {
              text: "Hukumat hujjatlari",
              callback_data: "btn_uz_3-0",
            },
          ],
          [{ text: "Qonun hujjatlari", callback_data: "btn_uz_4-3" }],
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_2" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
// Миграционное законодательство
bot.action("btn_ru_120", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Указы и Постановления Президента",
              callback_data: "btn_ru_3-3",
            },
            {
              text: "Распоряжения и Постановления Кабинета Министров",
              callback_data: "btn_ru_3-0",
            },
          ],
          [
            {
              text: "Законодательство Республики Узбекистан ",
              callback_data: "btn_ru_4-3",
            },
          ],
          [
            { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            { text: "⬅️ Назад", callback_data: "btn_ru_2" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Hukumat qaror va farmoyishlari
bot.action("btn_uz_3-0", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "VMQ - 725", url: "https://lex.uz/docs/-3903307" },
            { text: "VMQ - 713", url: "https://lex.uz/ru/docs/4486611" },
            { text: "VMQ - 1066", url: "https://lex.uz/docs/-4143044" },
          ],
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_120" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
// Распоряжения и Постановления Кабинета Министров
bot.action("btn_ru_3-0", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "ПКМ-725", url: "https://lex.uz/docs/3903309" },
            { text: "ПКМ-713", url: "https://lex.uz/ru/docs/4486615" },
            { text: "ПКМ-1066", url: "https://lex.uz/docs/4143050" },
          ],
          [
            { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            { text: "⬅️ Назад", callback_data: "btn_ru_120" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

//O`z. Res. Qonun hujjatlari
bot.action("btn_uz_4-3", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "№ 642 Qonun", url: "https://lex.uz/docs/-5055690" },
            { text: "№ 501 Qonun", url: "https://lex.uz/docs/-3992869" },
          ],
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_120" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
//Законодательство Республики Узбекистан
bot.action("btn_ru_4-3", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "№ 642 Закон", url: "https://lex.uz/docs/5055696" },
            { text: "№ 501 Закон", url: "https://lex.uz/docs/3992894" },
          ],
          [
            { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            { text: "⬅️ Назад", callback_data: "btn_ru_120" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Prezident qaror va farmonlari
bot.action("btn_uz_3-3", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "PF-5785", url: "https://lex.uz/docs/-4482648" },
            { text: "PQ-5205", url: "https://lex.uz/docs/5544376" },
          ],
          [
            { text: "PQ-4829", url: "https://lex.uz/docs/-4997972" },
            { text: "PQ-149", url: "https://lex.uz/ru/docs/-5893253" },
          ],
          [
            { text: "PQ-3584", url: "https://lex.uz/docs/-3578933" },
            { text: "PQ-3839", url: "https://lex.uz/docs/-3811317" },
          ],
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_120" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Указы и Постановления Президента
bot.action("btn_ru_3-3", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "УП-5785", url: "https://lex.uz/docs/4482657" },
            { text: "ПП-5205", url: "https://lex.uz/docs/5544376" },
          ],
          [
            { text: "ПП-4829", url: "https://lex.uz/docs/4997979" },
            { text: "ПП-149", url: "https://lex.uz/ru/docs/5893255" },
          ],
          [
            { text: "ПП-3584", url: "https://lex.uz/docs/3578931" },
            { text: "ПП-3839", url: "https://lex.uz/docs/3811333" },
          ],
          [
            { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            { text: "⬅️ Назад", callback_data: "btn_ru_120" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// УП-5785
prezident("btn_ru_4-4", "./src/УП-5785 20.08.2019.doc");
// ПП-5205
prezident("btn_ru_4-5", "./src/ПП-5205 30.07.2021.doc");
// ПП-4829
prezident("btn_ru_4-6", "./src/ПП-4829 15.09.2020.doc");
// ПП-149
prezident("btn_ru_4-7", "./src/ПП-149 01.03.2022.doc");
// ПП-3584
prezident("btn_ru_4-8", "./src/ПП-3584 05.03.2018.doc");

function prezident(btn, source) {
  bot.action(btn, async (ctx) => {
    try {
      await ctx.deleteMessage();
      await ctx.telegram.sendDocument(ctx.chat.id, { source: source });
      await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
              { text: "⬅️ Назад", callback_data: "btn_ru_3-3" },
            ],
          ],
        },
      });
    } catch (error) {
      console.error(error);
    }
  });
}

// PF-5785
prezidentUz("btn_uz_4-4", "./src/PF-5785 20.08.2019.doc");
// PQ-5205
prezidentUz("btn_uz_4-5", "./src/PQ-5205 30.07.2021.doc");
// PQ-4829
prezidentUz("btn_uz_4-6", "./src/PQ-4829 15.09.2020.doc");
// PQ-149
prezidentUz("btn_uz_4-7", "./src/PQ-149 01.03.2022.doc");
// PQ-3584
prezidentUz("btn_uz_4-8", "./src/PQ-3584 05.03.2018.doc");

function prezidentUz(btn, source) {
  bot.action(btn, async (ctx) => {
    try {
      await ctx.deleteMessage();
      await ctx.telegram.sendDocument(ctx.chat.id, { source: source });
      await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
              { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_3-3" },
            ],
          ],
        },
      });
    } catch (error) {
      console.error(error);
    }
  });
}

// Manzillar
bot.action("btn_uz_1", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Hududiy filiallar", callback_data: "btn_uz_6" },
            {
              text: "Xorijdagi vakolatxonalar",
              callback_data: "btn_uz_7",
            },
          ],
          [
            { text: "Elchixonalar", callback_data: "btn_uz_8" },
            { text: "Bosh Konsulliklar", callback_data: "btn_uz_9" },
          ],
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_ru_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_11" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
// Адрес
bot.action("btn_ru_1", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Региональные филиалы", callback_data: "btn_ru_6" },
            {
              text: "Представительства за рубежом",
              callback_data: "btn_ru_7",
            },
          ],
          [
            { text: "Посольства РУз за рубежом", callback_data: "btn_ru_8" },
            {
              text: "Генеральные Консульства РУз за рубежом",
              callback_data: "btn_ru_9",
            },
          ],
          [
            { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            { text: "⬅️ Назад", callback_data: "btn_ru_11" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

function consul(btn, type, lat, lan) {
  bot.action(btn, async (ctx) => {
    try {
      await ctx.deleteMessage();
      await bot.telegram.sendLocation(ctx.chat.id, lat, lan);
      await bot.telegram.sendMessage(ctx.chat.id, `${type}`, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
              { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_9" },
            ],
          ],
        },
      });
    } catch (error) {
      console.error(error);
    }
  });
}
function consulRu(btn, type, lat, lan) {
  bot.action(btn, async (ctx) => {
    try {
      await ctx.deleteMessage();
      await bot.telegram.sendLocation(ctx.chat.id, lat, lan);
      await bot.telegram.sendMessage(ctx.chat.id, `${type}`, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
              { text: "⬅️ Назад", callback_data: "btn_ru_9" },
            ],
          ],
        },
      });
    } catch (error) {
      console.error(error);
    }
  });
}
// O'zb Res Aqtau shahridagi Bosh Konsulxonasi
consul(
  "btn_uz_104",
  `Bosh Konsul\nTursinbekov Atabek\n\nManzil:\n130000, Qozog'iston Respublikasi, Aqtau shahri 30-mikrorayon, 83/1-uy\n\n☎️ 729-277-71-17\n☎️ 777-599-00-50\n☎️ 777-599-00-51\n\n🪙 uzconsulate-aktau.kz`,
  43.663686063382556,
  51.198483753293125
);
// Генконсульства РУз  в городе Актау
consulRu(
  "btn_ru_104",
  `Генеральный консул:\nТурсинбеков Aтабек\n\nАдрес:\n130000, Republic of Kazakhstan, Aktau, 30th microdistrict., cottage 83/1\n\n☎️ 729-277-71-17\n\n🪙 uzconsulate-aktau.kz`,
  43.663686063382556,
  51.198483753293125
);

// O'zb Res Bangkok shahridagi Bosh Konsulxonasi
consul(
  "btn_uz_105",
  `Bosh Konsul\nAliyev Aziz Xamratovich\n\nManzil:\n83/4, Soi Vithayu 1, Wireless Road, Lumpini, Pathumwan District, Bangkok 10330, Thailand\n\n☎️ 675-3995\n☎️ 675-3996\n\n🪙 http://www.uzbinbkk.com\n\n📨 ankhor@uzbinbkk.com`,
  13.740564473661856,
  100.54776328721248
);
// Генконсульства РУз  в городе Бангкок
consulRu(
  "btn_ru_105",
  `Генеральный консул:\nСултанов Фахриддин Хайритдинович\n\nАдрес:\n 83/4, Soi Vithayu 1, Wireless Road, Lumpini, Pathumwan District, Bangkok 10330, Thailand\n\n☎️ 675-3995\n☎️ 675-3996\n\n🪙 http://www.uzbinbkk.com\n\n📨 ankhor@uzbinbkk.com`,
  13.740564473661856,
  100.54776328721248
);

// O'zb Res Dubaydagi Bosh Konsulxonasi
consul(
  "btn_uz_106",
  `Bosh Konsul\nSalomov Alisher Samandarovich\n\nManzil:\nP.O.Box:50478, Office building-13, Street №3, Umm Hurair First, Bur Dubai, Dubai UAE.\n\n☎️ 370-60-60\n\n🪙 http://www.uzbinbkk.com\n\n📨 ankhor@uzbinbkk.com`,
  25.244037116457882,
  55.31180434565642
);
// Генконсульства РУз  в Дубае
consulRu(
  "btn_ru_106",
  `Генеральный консул:\nСаломов Aлишер Самандарович\n\nАдрес:\nP.O.Box:50478, Office building-13, Street №3, Umm Hurair First\n\n☎️ 370-60-60\n\n🪙 http://www.uzbinbkk.com\n\n📨 ankhor@uzbinbkk.com`,
  25.244037116457882,
  55.31180434565642
);

// O'zb Res Frankfurt-Mayn shahridagi Bosh Konsulxonasi
consul(
  "btn_uz_107",
  `Bosh Konsul\nOlimjon Abdullayev Suyunovich\n\nManzil:\nZeppelinallee 31, 60325 Frankfurt am Main\n\n☎️ 915-01-11-14\n\n🪙  www.gk-usbekistan.de, frankfurt.mfa.uz\n\n📨 gk.usbekistan@gmail.com`,
  50.12309017472679,
  8.652846855935985
);
// Генконсульства РУз  в городе Франкфурт-на-Майне
consulRu(
  "btn_ru_107",
  `Генеральный консул:\nAбдуллаев Олимжон Суюнович\n\nАдрес:\nZeppelinallee 31, 60325 Frankfurt am Main\n\n☎️ 915-01-11-14\n\n🪙  www.gk-usbekistan.de, frankfurt.mfa.uz\n\n📨 gk.usbekistan@gmail.com`,
  50.12309017472679,
  8.652846855935985
);

// O'zb Res Istanbul shahridagi Bosh Konsulxonasi
consul(
  "btn_uz_108",
  `Bosh Konsul\nAgzamxodjayev Amirsaid Saidazizovich\n\nManzil:\nLevent Mah. Levent Cad. Lale Sk. 8 Beşiktaş-İstanbul\n\n☎️ 212-323-20-37\n☎️ 552-450-91-02\n\n🪙 uzconsulate.org.tr\n\n📨  uzbekconsul@yahoo.com`,
  41.07756111952498,
  29.017328098041975
);
// Генконсульства РУз  в городе Стамбул
consulRu(
  "btn_ru_108",
  `Генеральный консул:\nAгзамходжаев Aмирсаид Саидазизович\n\nАдрес:\nLevent Mah. Levent Cad. Lale Sk. 8 Beşiktaş-İstanbul\n\n☎️ 212-323-20-37\n☎️ 552-450-91-02\n\n🪙 uzconsulate.org.tr\n\n📨  uzbekconsul@yahoo.com`,
  41.07756111952498,
  29.017328098041975
);

// O'zb Res Jidda shahridagi Bosh Konsulxonasi
consul(
  "btn_uz_109",
  `Bosh Konsul\n Turg'unov Nodirjon\n\nManzil:\nAl-Naeem/4 District, Abu Al-Hajjaj Al-Mosali Street, Villa #7. P.O. Box 50036, Jeddah 23621, Saudi Arabia\n\n☎️ 607-72-50\n☎️ +966-56-661-94-96\n\n🪙 jeddah.mfa.uz \n\n📨  jiddah@mfa.uz`,
  21.612195567982305,
  39.13770044888961
);
// Генконсульства РУз  в городе Джидда
consulRu(
  "btn_ru_109",
  `Генеральный консул:\nТургунов Нодиржон\n\nАдрес:\nAl-Naeem/4 District, Abu Al-Hajjaj Al-Mosali Street\n\n☎️ 607-72-50\n☎️ +966-56-661-94-96\n\n🪙 jeddah.mfa.uz \n\n📨  jiddah@mfa.uz`,
  21.612195567982305,
  39.13770044888961
);

// O'zb Res Mozori-Sharif shahridagi Konsulxonasi
consul(
  "btn_uz_110",
  `Konsul\nAbdurazzakov Mirodil Sharipovich\n\nManzil:\nAfghanistan, Mazori Sharif, 3-nohiya, Guzari Khoja Hayroniya 44.\n\n☎️ 200-27-13\n☎️ +99876 - 502-14-02(uyali o'zb.)\n\n🪙 msharif.mfa.uz \n\n📨 uzmazarconsulate@rambler.ru`,
  36.69593103560911,
  67.11685131114201
);
// Консульство Республики Узбекистан в городе Мазари-Шариф
consulRu(
  "btn_ru_110",
  `Консул:\nAбдураззаков Миродил Шарипович\n\nАдрес:\nAfghanistan, Mazori Sharif, 3-nohiya, Guzari Khoja Hayroniya 44\n\n☎️ 200-27-13\n☎️ +99876 - 502-14-02(Дом Узб.)\n\n🪙 msharif.mfa.uz \n\n📨 uzmazarconsulate@rambler.ru`,
  36.69593103560911,
  67.11685131114201
);

// O'zb Res Qozon shahridagi Bosh Konsulxonasi
consul(
  "btn_uz_111",
  `Bosh konsul\nNasriyev Fariddin Badriddinovich\n\nManzil:\nRossiya, Tatariston Respublikasi, Qozon shahri, Spartak ko'chasi, 6\n\n☎️ 526-55-64\n☎️ 526-55-65\n\n🪙  kazan.mfa.uz \n\n📨 kaz.uzconsulate@mfa.uz`,
  55.79534316988579,
  49.1072434078705
);
// Генконсульства РУз  в городе Казань
consulRu(
  "btn_ru_111",
  `Генеральный консул:\nНасриев Фариддин Бадриддинович\n\nАдрес:\nРоссия, Республика Татарстан. г. Казань, ул. Спартака, 6\n\n☎️ 526-55-64\n☎️ 526-55-65\n\n🪙  kazan.mfa.uz \n\n📨 kaz.uzconsulate@mfa.uz`,
  55.79534316988579,
  49.1072434078705
);

// O'zb Res Nyu-York shahridagi Bosh Konsulxonasi
consul(
  "btn_uz_112",
  `Bosh konsul\nIkramov Kamol Ravshanbekovich\n\nManzil:\n801, Second Ave, Floor 20, New York NY 10017 USA\n\n☎️ 754-74-03\n☎️ 217-44-06\n☎️ 539-46-64\n☎️ 859-04-40\n\n🪙 www.uzbekconsulny.org newyork.mfa.uz.\n\n📨 info@uzbekconsulny.org`,
  40.75647368609776,
  -73.97074848407236
);
// Генконсульства РУз  в городе Нью-Йорк
consulRu(
  "btn_ru_112",
  `Генеральный консул:\nИкрамов Камол Равшанбекович\n\nАдрес:\n801, Second Ave, Floor 20, New York NY 10017 USA\n\n☎️ 754-74-03\n☎️ 217-44-06\n☎️ 539-46-64\n☎️ 859-04-40\n\n🪙 www.uzbekconsulny.org newyork.mfa.uz.\n\n📨 info@uzbekconsulny.org`,
  40.75647368609776,
  -73.97074848407236
);

// O'zb Res Novosibirsk shahridagi Bosh Konsulxonasi
consul(
  "btn_uz_113",
  `Bosh konsul\nRaxmanov Timur Yusupovich\n\nManzil:\nLomonosova ko‘chasi 55 B uy, Markaziy tuman, Novosibirsk\n\n☎️ 246-04-85\n\n🪙 novosibirsk.mfa.uz\n\n📨 consul2011@inbox.ru`,
  54.982901005788186,
  82.90133407735956
);
// Генконсульства РУз  в городе Новосибирск
consulRu(
  "btn_ru_113",
  `Генеральный консул:\nРахманов Тимур Юсупович\n\nАдрес:\nг. Новосибирск, Центральный район, ул. Ломоносова, 55 Б\n\n☎️ 246-04-85\n\n🪙 novosibirsk.mfa.uz\n\n📨 consul2011@inbox.ru`,
  54.982901005788186,
  82.90133407735956
);

// O'zb Res Olmaota shahridagi Bosh Konsulxonasi
consul(
  "btn_uz_114",
  `Bosh konsul\nFatxullayev Abrar Djaxangerovich\n\nManzil:\n05000, Olmaota sh., Jarokova ko'chasi 360-uy\n\n☎️ 390-26-16\n☎️ 299-20-70\n\n🪙 almaty.mfa.uz\n\n📨 kz.uzconsulate@mfa.uz`,
  43.201727598537815,
  76.90660664226668
);
// Генконсульства РУз  в городе Алматы
consulRu(
  "btn_ru_114",
  `Генеральный консул:\nФатхуллаев Aбрар Джахангерович\n\nАдрес:\n05000, г. Алматы, ул. Жарокова, 360 (проспект Аль-Фараби)\n\n☎️ 390-26-16\n☎️ 299-20-70\n\n🪙 almaty.mfa.uz\n\n📨 kz.uzconsulate@mfa.uz`,
  43.201727598537815,
  76.90660664226668
);

// O'zb Res Rostov-Don shahridagi Bosh Konsulxonasi
consul(
  "btn_uz_115",
  `Bosh konsul\nKurganbaev Rustam Tukhtardjanovich\n\nManzil:\n344006, Rostov-Don shahri, Suvorova ko'chasi 28-g uy\n\n☎️ 285-50-57\n\n🪙 gkrostov.ru\n\n📨 rostov@mfa.uz`,
  47.2244443288846,
  39.72441793260654
);
// Генконсульства РУз  в городе Ростов-на-Дону
consulRu(
  "btn_ru_115",
  `Генеральный консул:\n Курганбаев Рустам Туҳтарджанович\n\nАдрес:\n344006, г. Ростов-на-Дону, ул. Суворова, дом 28г\n\n☎️ 285-50-57\n\n🪙 gkrostov.ru\n\n📨 rostov@mfa.uz`,
  47.2244443288846,
  39.72441793260654
);

// O'zb Res Sankt-Peterburg shahridagi Bosh Konsulxonasi
consul(
  "btn_uz_116",
  `Bosh konsul\nBabayev Alisher Mamajonovich\n\nManzil:\nSankt-Peterburg shahri, 4-Krasnoarmeyskaya ko‘chasi, 4A-uy.\n\n☎️ 029-41-49\n\n🪙 spetersburg.mfa.uz`,
  59.946307465961986,
  30.361070579499724
);
// Генконсульства РУз  в городе Санкт-Петербург
consulRu(
  "btn_ru_116",
  `Генеральный консул:\nБабаев Aлишер Мамажонович\n\nАдрес:\nСанкт-Петербург, 4-я Красноармейская улица, д. 4а.\n\n☎️ 029-41-49\n\n🪙 spetersburg.mfa.uz`,
  59.946307465961986,
  30.361070579499724
);

// O'zb Res Vladivostok shahridagi Bosh Konsulxonasi
consul(
  "btn_uz_117",
  `Bosh konsul\nIsmailov Rustam Sabirjanovich\n\nManzil:\n690003, Vladivostok shahri, Verxneportovaya ko'chasi, 46-uy\n\n☎️ 260-48-00\n☎️ +79510187007\n\n🪙 gkuzvlv.ru.\n\n📨 gkuzvlv@mail.ru`,
  43.10320717929422,
  131.86941570913237
);
// Генконсульства РУз  в городе Владивосток
consulRu(
  "btn_ru_117",
  `Генеральный консул:\nИсмаилов Рустам Сабиржанович\n\nАдрес:\n69003, г. Владивосток, ул. Верхнепортовая, 46\n\n☎️ 260-48-00\n☎️ +79510187007\n\n🪙 gkuzvlv.ru.\n\n📨 gkuzvlv@mail.ru`,
  43.10320717929422,
  131.86941570913237
);

// O'zb Res Yekaterinburg shahridagi Bosh Konsulxonasi
consul(
  "btn_uz_118",
  `Bosh konsul\nXatamov Abdusalom Kurbonovich\n\nManzil:\n620075, Rossiya, Yekaterinburg, Karl Libknext ko‘chasi, 22, 415-ofis\n\n☎️ 272-31-66\n☎️ 272-31-33\n\n🪙 yekaterinburg.mfa.uz\n\n📨 ru.uzconsulate.yekt@mfa.uz`,
  56.842156045157594,
  60.62241873064973
);
// Генконсульства РУз  в городе Екатеринбург
consulRu(
  "btn_ru_118",
  `Генеральный консул:\nХатамов Aбдусалом Курбонович\n\nАдрес:\n620075, Россия, г. Екатеринбург, ул. Карла Либкнехта, д. 22, оф. 415\n\n☎️ 272-31-66\n☎️ 272-31-33\n\n🪙 yekaterinburg.mfa.uz\n\n📨 ru.uzconsulate.yekt@mfa.uz`,
  56.842156045157594,
  60.62241873064973
);

// O'zb Res Shanxay shahridagi Bosh Konsulxonasi
consul(
  "btn_uz_119",
  `Bosh konsul\nMasutov Aziz Turdaliyevich\n\nManzil:\nRoom 801, Yao Jiang Development Centre, 308 Wusong Road, Hong Kou District, 200080, Shanghai, China\n\n☎️ 630-718-96\n\n🪙 shanghai.mfa.uz\n\n📨 cg_uzbekistan@126.com`,
  56.842156045157594,
  60.62241873064973
);
// Генконсульства РУз  в городе Шанхай
consulRu(
  "btn_ru_119",
  `Генеральный консул:\nМасутов Aзиз Турдалийевич\n\nАдрес:\nRoom 801, Yao Jiang Development Centre, 308 Wusong Road, Hong Kou District, 200080, Shanghai,\n\n☎️ 630-718-96\n\n🪙 shanghai.mfa.uz\n\n📨 cg_uzbekistan@126.com`,
  56.842156045157594,
  60.62241873064973
);

// Генеральные консульства РУз за рубежом
bot.action("btn_ru_9", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Генконсульства РУз  в городе Актау",
              callback_data: "btn_ru_104",
            },
          ],
          [
            {
              text: "Генконсульства РУз  в городе Бангкок",
              callback_data: "btn_ru_105",
            },
          ],
          [
            {
              text: "Генконсульства РУз  в Дубае",
              callback_data: "btn_ru_106",
            },
          ],
          [
            {
              text: "Генконсульства РУз  в городе Франкфурт-на-Майне",
              callback_data: "btn_ru_107",
            },
          ],
          [
            {
              text: "Генконсульства РУз  в городе Стамбул",
              callback_data: "btn_ru_108",
            },
          ],
          [
            {
              text: "Генконсульства РУз  в городе Джидда",
              callback_data: "btn_ru_109",
            },
          ],
          [
            {
              text: "Консульство    РУз в городе Мазари-Шариф",
              callback_data: "btn_ru_110",
            },
          ],
          [
            {
              text: "Генконсульства РУз  в городе Казань",
              callback_data: "btn_ru_111",
            },
          ],
          [
            {
              text: "Генконсульства РУз  в городе Нью-Йорк",
              callback_data: "btn_ru_112",
            },
          ],
          [
            {
              text: "Генконсульства РУз  в городе Новосибирск",
              callback_data: "btn_ru_113",
            },
          ],
          [
            {
              text: "Генконсульства РУз  в городе Алматы",
              callback_data: "btn_ru_114",
            },
          ],
          [
            {
              text: "Генконсульства РУз  в городе Ростов-на-Дону",
              callback_data: "btn_ru_115",
            },
          ],
          [
            {
              text: "Генконсульства РУз  в городе Санкт-Петербург",
              callback_data: "btn_ru_116",
            },
          ],
          [
            {
              text: "Генконсульства РУз  в городе Владивосток",
              callback_data: "btn_ru_117",
            },
          ],
          [
            {
              text: "Генконсульства РУз  в городе Екатеринбург",
              callback_data: "btn_ru_118",
            },
          ],
          [
            {
              text: "Генконсульства РУз  в городе Шанхай",
              callback_data: "btn_ru_119",
            },
          ],

          [
            { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            { text: "⬅️ Назад", callback_data: "btn_ru_1" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Bosh Konsulliklar
bot.action("btn_uz_9", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "O'zb Res Aqtau shahridagi Bosh Konsulxonasi",
              callback_data: "btn_uz_104",
            },
          ],
          [
            {
              text: "O'zb Res Bangkok shahridagi Bosh Konsulxonasi",
              callback_data: "btn_uz_105",
            },
          ],
          [
            {
              text: "O'zb Res Dubaydagi Bosh Konsulxonasi",
              callback_data: "btn_uz_106",
            },
          ],
          [
            {
              text: "O'zb Res Frankfurt-Mayn shahridagi Bosh Konsulxonasi",
              callback_data: "btn_uz_107",
            },
          ],
          [
            {
              text: "O'zb Res Istanbul shahridagi Bosh Konsulxonasi",
              callback_data: "btn_uz_108",
            },
          ],
          [
            {
              text: "O'zb Res Jidda shahridagi Bosh Konsulxonasi",
              callback_data: "btn_uz_109",
            },
          ],
          [
            {
              text: "O'zb Res Mozori-Sharif shahridagi Konsulxonasi",
              callback_data: "btn_uz_110",
            },
          ],
          [
            {
              text: "O'zb Res Qozon shahridagi Bosh Konsulxonasi",
              callback_data: "btn_uz_111",
            },
          ],
          [
            {
              text: "O'zb Res Nyu-York shahridagi Bosh Konsulxonasi",
              callback_data: "btn_uz_112",
            },
          ],
          [
            {
              text: "O'zb Res Novosibirsk shahridagi Bosh Konsulxonasi",
              callback_data: "btn_uz_113",
            },
          ],
          [
            {
              text: "O'zb Res Olmaota shahridagi Bosh Konsulxonasi",
              callback_data: "btn_uz_114",
            },
          ],
          [
            {
              text: "O'zb Res Rostov-Don shahridagi Bosh Konsulxonasi",
              callback_data: "btn_uz_115",
            },
          ],
          [
            {
              text: "O'zb Res Sankt-Peterburg shahridagi Bosh Konsulxonasi",
              callback_data: "btn_uz_116",
            },
          ],
          [
            {
              text: "O'zb Res Vladivostok shahridagi Bosh Konsulxonasi",
              callback_data: "btn_uz_117",
            },
          ],
          [
            {
              text: "O'zb Res Yekaterinburg shahridagi Bosh Konsulxonasi",
              callback_data: "btn_uz_118",
            },
          ],
          [
            {
              text: "O'zb Res Shanxay shahridagi Bosh Konsulxonasi",
              callback_data: "btn_uz_119",
            },
          ],

          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_1" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

function elchi(btn, type, lat, lan) {
  bot.action(btn, async (ctx) => {
    try {
      await ctx.deleteMessage();
      await bot.telegram.sendLocation(ctx.chat.id, lat, lan);
      await bot.telegram.sendMessage(ctx.chat.id, `${type}`, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_8" },
              { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            ],
          ],
        },
      });
    } catch (error) {
      console.error(error);
    }
  });
}
function elchiRu(btn, type, lat, lan) {
  bot.action(btn, async (ctx) => {
    try {
      await ctx.deleteMessage();
      await bot.telegram.sendLocation(ctx.chat.id, lat, lan);
      await bot.telegram.sendMessage(ctx.chat.id, `${type}`, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "⬅️ Назад", callback_data: "btn_ru_8" },
              { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            ],
          ],
        },
      });
    } catch (error) {
      console.error(error);
    }
  });
}
//O'zb Res Avstriya Respublikasidagi elchixonasi
elchi(
  "btn_uz_69",
  `Favqulodda va Muxtor Elchi:\nFayzullayev Abat Azatovich\n\nManzil:\nPoetzleinsdorferstrasse 49, A-1180, Wien\n\n☎️ 315-39-94\n☎️ 315-39-95\n\n🪙 www.usbekistan.at, austria.mfa.uz\n\n📨embassy@usbekistan.at`,
  48.24042034387942,
  16.312963926402904
);

//Посольство Республики Узбекистан в Австрийской Республике
elchiRu(
  "btn_ru_69",
  `Чрезвычайный и Полномочный Посол:\nФайзуллаев Абат Азатович\n\nАдрес:\nPötzleinsdorfer Straße 49A-1180, Вена\n\n☎️ 315-39-94\n☎️ 315-39-95\n\n🪙 www.usbekistan.at, austria.mfa.uz\n\n📨embassy@usbekistan.at`,
  48.24042034387942,
  16.312963926402904
);

//O'zb Res Ozarbayjon Respublikasidagi elchixonasi
elchi(
  "btn_uz_70",
  `Favqulodda va Muxtor Elchi:\nAshrafxanov Bahrom Baxordirovich\n\nManzil:\nBaku, Patamdar, 1st highway, passage 9, 437 apartmet\n\n☎️ 497-25-49\n☎️ 497-25-52\n\n🪙 www.uzembassy.az, azerbaijan.mfa.uz\n\n📨 office@uzembassy.az`,
  40.35129867707628,
  49.804822174569225
);
//Посольство Республики Узбекистан в Азербайджанской Республике
elchiRu(
  "btn_ru_70",
  `Чрезвычайный и Полномочный Посол:\nАшрафханов Бахром Баходирович\n\nАдрес:\nБаку, Патамдар, 1-е шоссе, проезд 9, 437 квартира\n\n☎️ 497-25-49\n☎️ 497-25-52\n\n🪙 www.uzembassy.az, azerbaijan.mfa.uz\n\n📨 office@uzembassy.az`,
  40.35129867707628,
  49.804822174569225
);

//O'zb Res Afg‘onistondagi elchixonasi
elchi(
  "btn_uz_71",
  `Favqulodda va Muxtor Elchi:\nShadmanov Yadgarxoja Maxamatovich\n\nManzil:\nKarta-i-seh, Khaji Mulla Watt, Kabul\n\n☎️ 20-250-04-31\n\n🪙 www.afghanistan.mfa.uz`,
  34.53979727628865,
  69.1826342323586
);
//Посольство Республики Узбекистан в Афганистане
elchiRu(
  "btn_ru_71",
  `Чрезвычайный и Полномочный Посол:\nШадманов Ядгархожа Махаматович\n\nАдрес:\nКарта-и-сех, Хаджи Мулла Ватт, Кабул\n\n☎️ 20-250-04-31\n\n🪙 www.afghanistan.mfa.uz`,
  34.53979727628865,
  69.1826342323586
);

//O'zb Res Belarus Respublikasidagi Elchixonasi
elchi(
  "btn_uz_72",
  `Favqulodda va Muxtor Elchi:\nVakant\n\nManzil:\nMinsk sh, Pokrovskaya ko’chasi, 24 uy\n\n☎️ 235-72-08\n\n🪙  www.uzembassy.by, belorussia.mfa.uz\n\n📨 uzembassy.by@gmail.com`,
  53.939271184180775,
  27.49223602716975
);
//Посольство Республики Узбекистан в Республике Беларусь
elchiRu(
  "btn_ru_72",
  `Чрезвычайный и Полномочный Посол:\nВакант\n\nАдрес:\nг.Минск, ул. Покровская, д.24\n\n☎️ 235-72-08\n\n🪙  www.uzembassy.by, belorussia.mfa.uz\n\n📨 uzembassy.by@gmail.com`,
  53.939271184180775,
  27.49223602716975
);

//O'zb Res Belgiya Qirolligidagi elchixonasi
elchi(
  "btn_uz_73",
  `Favqulodda va Muxtor Elchi:\nXakimov Dilyor Zafarovich\n\nManzil:\nAv.F.Roosevelt, 99 B-1050 Brussels\n\n☎️ 672-88-44\n☎️ 488-41-48-06\n\n🪙 http://belgium.mfa.uz\n\n📨 embassy@uzbekistan.be `,
  50.80305823116729,
  4.3881604958097
);
//Посольство Республики Узбекистан в Королевстве Бельгия
elchiRu(
  "btn_ru_73",
  `Чрезвычайный и Полномочный Посол:\nХакимов Дильёр Зафарович\n\nАдрес:\nAv.F.Roosevelt, 99 B-1050 Брюссель\n\n☎️ 672-88-44\n☎️ 488-41-48-06\n\n🪙 http://belgium.mfa.uz\n\n📨 embassy@uzbekistan.be`,
  50.80305823116729,
  4.3881604958097
);

//O'zb Res Buyuk Britaniya va Shimoliy Irlandiya Birlashgan Qirolligidagi elchixonasi
elchi(
  "btn_uz_74",
  `Favqulodda va Muxtor Elchi:\nRustamov Said Xurshedovich\n\nManzil:\n41 Holland Park, London W11 3RP\n\n☎️ 207-229-7679\n☎️ 871-468-1100\n\n🪙  www.uzbekembassy.org, uk.mfa.uz\n\n📨  info@uzembassy.uk, consul@uzbekembassy.org `,
  51.50664268170274,
  -0.20515924409555078
);
//Посольство Республики Узбекистан в Соединенном Королевстве Великобритании и Северной Ирландии
elchiRu(
  "btn_ru_74",
  `Чрезвычайный и Полномочный Посол:\nРустамов Саид Хуршедович\n\nАдрес:\n41 Holland Park, London W11 3RP\n\n☎️ 207-229-7679\n☎️ 871-468-1100\n\n🪙  www.uzbekembassy.org, uk.mfa.uz\n\n📨  info@uzembassy.uk, consul@uzbekembassy.org `,
  51.50664268170274,
  -0.20515924409555078
);

//O'zb Res Misr Arab Respublikasidagi elchixonasi
elchi(
  "btn_uz_75",
  `Favqulodda va Muxtor Elchi:\nKilichev Mansurbek Baxtiyarovich \n\nManzil:\n18, Sad El-Aali Street, Dokki, Cairo, Egypt. Postal Code: 12311\n\n☎️ 3336-1723\n\n🪙   www.uzembegypt.com, egypt.mfa.uz\n\n📨  uzembegypt@gmail.com`,
  30.042451025212017,
  31.214712055259547
);
//Посольство Республики Узбекистан в Арабской Республике Египет
elchiRu(
  "btn_ru_75",
  `Чрезвычайный и Полномочный Посол:\nКиличев Мансурбек Бахтиярович \n\nАдрес:\n18, Sad El-Aali Street, Dokki, Cairo, Egypt. Postal Code: 12311\n\n☎️ 3336-1723\n\n🪙   www.uzembegypt.com, egypt.mfa.uz\n\n📨  uzembegypt@gmail.com`,
  30.042451025212017,
  31.214712055259547
);

//O'zb Res Ispaniya Qirolligidagi elchixonasi
elchi(
  "btn_uz_76",
  `Favqulodda va Muxtor Elchi:\nGaniev Jahongir Dunanovich \n\nManzil:\nPlaza de la Lealtad 3, entreplanta derecha, 28014 Madrid\n\n☎️ 310-16-39\n\n🪙 www.uzbekembassy.es, spain.mfa.uz\n\n📨  secretaria@uzbekembassy.es, consulado@uzbekembassy.es`,
  40.435752362402454,
  -3.6897059598015853
);
//Посольство Республики Узбекистан в Королевстве Испания
elchiRu(
  "btn_ru_76",
  `Чрезвычайный и Полномочный Посол:\nГаниев Жахонгир Дунанович\n\nАдрес:\nPlaza de la Lealtad 3, entreplanta derecha, 28014 Madrid\n\n☎️ 310-16-39\n\n🪙 www.uzbekembassy.es, spain.mfa.uz\n\n📨  secretaria@uzbekembassy.es, consulado@uzbekembassy.es`,
  40.435752362402454,
  -3.6897059598015853
);

//O'zb Res Italiya Respublikasidagi elchixonasi
elchi(
  "btn_uz_77",
  `Favqulodda va Muxtor Elchi:\nAkbarov Otabek Hamidullayevich \n\nManzil:\nVia Pompeo Magno 1, 00192 Roma, Italy\n\n☎️ 87860-310\n\n🪙 italia.mfa.uz\n\n📨 ambasciata@uzbekistanitalia.org`,
  41.909750408926016,
  12.470312340244002
);
//Посольство Республики Узбекистан в Итальянской Республике
elchiRu(
  "btn_ru_77",
  `Чрезвычайный и Полномочный Посол:\nАкбаров Отабек Хамидуллаевич\n\nАдрес:\nVia Pompeo Magno 1, 00192 Roma, Italia\n\n☎️ 87860-310\n\n🪙 italia.mfa.uz\n\n📨 ambasciata@uzbekistanitalia.org`,
  41.909750408926016,
  12.470312340244002
);

//O'zb Res Isroil Davlatidagi elchixonasi
elchi(
  "btn_uz_78",
  `Favqulodda va Muxtor Elchi:\nMahmudova Feruza Yuldashevna\n\nManzil:\nRamat Gan c., 52413, 31 Moshe Sharet Str.\n\n☎️ 672-23-71\n\n🪙 www.uzbembassy.org.il, israel.mfa.uz.\n\n📨 admindep@uzbembassy.org.il`,
  32.08754611599336,
  34.81746869763784
);
//Посольство Республики Узбекистан в Государстве Израиль
elchiRu(
  "btn_ru_78",
  `Чрезвычайный и Полномочный Посол:\nМахмудова Феруза Юлдашевна\n\nАдрес:\nRamat Gan c., 52413, 31 Moshe Sharet Str.\n\n☎️ 672-23-71\n\n🪙 www.uzbembassy.org.il, israel.mfa.uz.\n\n📨 admindep@uzbembassy.org.il`,
  32.08754611599336,
  34.81746869763784
);

//O'zb Res Hindiston Respublikasidagi elchixonasi
elchi(
  "btn_uz_79",
  `Favqulodda va Muxtor Elchi:\nAxatov Dilshod Xamidovich\n\nManzil:\nEP-40, Dr. Radhakrishnan Marg, Chanakyapuri, New Delhi-110021.\n\n☎️ 2467-0774\n☎️ 2467-0775\n☎️ 24105-640\n\n🪙 www.uzbekembassy.in, india.mfa.uz\n\n📨 in.uzembassy@mfa.uz`,
  28.590722793936884,
  77.17780408535243
);
//Посольство Республики Узбекистан в Республике Индия
elchiRu(
  "btn_ru_79",
  `Чрезвычайный и Полномочный Посол:\nАхатов Дилшод Хамидович\n\nАдрес:\nEP-40, Dr. Radhakrishnan Marg, Chanakyapuri, New Delhi-110021.\n\n☎️ 2467-0774\n☎️ 2467-0775\n☎️ 24105-640\n\n🪙 www.uzbekembassy.in, india.mfa.uz\n\n📨 in.uzembassy@mfa.uz`,
  28.590722793936884,
  77.17780408535243
);

//O'zb Res Indoneziya Respublikasidagi elchixonasi
elchi(
  "btn_uz_80",
  `Favqulodda va Muxtor Elchi:\nRozukulov Ulugbek Ubaydullayevich\n\nManzil:\nJl. Sriwijaya Raya 30, Kebayoran Baru, South Jakarta, 12110 (Janubiy Jakarta, Keboyaran Baru tumani, Srivijaya Raya ko‘ch., 30-uy, 12110)\n\n☎️ 722-99-18\n☎️ 722-99-19\n\n🪙 uzembassy.or.id, indonesia.mfa.uz \n\n📨 id.uzembassy@mfa.uz, embassyuzbekistan@gmail.com`,
  -6.217212721435194,
  106.81861809317282
);
//Посольство Республики Узбекистан в Республике Индонезия
elchiRu(
  "btn_ru_80",
  `Чрезвычайный и Полномочный Посол:\nРозукулов Улугбек Убайдуллаевич\n\nАдрес:\nJl. Sriwijaya Raya 30, Kebayoran Baru, South Jakarta, 12110)\n\n☎️ 722-99-18\n☎️ 722-99-19\n\n🪙 uzembassy.or.id, indonesia.mfa.uz \n\n📨 id.uzembassy@mfa.uz, embassyuzbekistan@gmail.com`,
  -6.217212721435194,
  106.81861809317282
);

//O'zb Res Eron Islom Respublikasidagi elchixonasi
elchi(
  "btn_uz_81",
  `Favqulodda va Muxtor Elchi:\nAbdullayev Baxodir Baratovich\n\nManzil:\n №21, Nastaran St. Boostan St., Aqdasieh, Tehran Konsullik manzili: №2, St. Alikhane, St. Aqdasieh, Tehran\n\n☎️ 228-320-71\n☎️ 222-997-80\n☎️ 228-320-25\n\n🪙  www.uzbekembassy.ir, iran.mfa.uz\n\n📨 ir.uzembassy@mfa.uz`,
  35.804237034744176,
  51.475708497735454
);
//Посольство Республики Узбекистан в Исламской Республике Иран
elchiRu(
  "btn_ru_81",
  `Чрезвычайный и Полномочный Посол:\nАбдуллаев Баходир Баратович\n\nАдрес:\n№21, Nastaran St. Boostan St., Aqdasieh, Tehran\n\n☎️ 228-320-71\n☎️ 222-997-80\n☎️ 228-320-25\n\n🪙  www.uzbekembassy.ir, iran.mfa.uz\n\n📨 ir.uzembassy@mfa.uz`,
  35.804237034744176,
  51.475708497735454
);

//O'zb Res Qozog‘iston Respublikasidagi elchixonasi
elchi(
  "btn_uz_82",
  `Favqulodda va Muxtor Elchi:\nNiyazxodjayev Saidikram Parxatovich\n\nManzil:\nOstona shahri, Layli-Majnun ko‘chasi, 7-uy\n\n☎️ 295-42-52\n\n🪙 www.uzembassy.kz, kazakhstan.mfa.uz\n\n📨 kz.uzembassy@mfa.uz`,
  51.14753574638868,
  71.40046743916801
);
//Посольство Республики Узбекистан в Республике Казахстан
elchiRu(
  "btn_ru_82",
  `Чрезвычайный и Полномочный Посол:\nНиязходжаев Саидикрам Пархатович\n\nАдрес:\n010000, г.Астана, ул.Лайли-Мажнун, д.7\n\n☎️ 295-42-52\n\n🪙 www.uzembassy.kz, kazakhstan.mfa.uz\n\n📨 kz.uzembassy@mfa.uz`,
  51.14753574638868,
  71.40046743916801
);

//O'zb Res Xitoy Xalq Respublikasidagi elchixonasi
elchi(
  "btn_uz_83",
  `Favqulodda va Muxtor Elchi:\nArziev Farhod Nuriddinovich\n\nManzil:\n11 Bei Xiao Jie San Li Tun Beijing \n\n☎️ 653-263-05\n☎️ 653-225-51\n\n🪙 http://china.mfa.uz\n\n📨 presscenter@uzembchina.com`,
  39.94287144608594,
  116.45153499785474
);
//Посольство Республики Узбекистан в Китайской Народной Республике
elchiRu(
  "btn_ru_83",
  `Чрезвычайный и Полномочный Посол:\nАрзиев Фарход Нуриддинович\n\nАдрес:\n11 Bei Xiao Jie San Li Tun Beijing, 100600, China\n\n☎️ 653-263-05\n☎️ 653-225-51\n\n🪙 http://china.mfa.uz\n\n📨 presscenter@uzembchina.com`,
  39.94287144608594,
  116.45153499785474
);

//O'zb Res Koreya Respublikasidagi elchixonasi
elchi(
  "btn_uz_84",
  `Favqulodda va Muxtor Elchi:\nFen Vitaliy Vasilevich\n\nManzil:\n27, Daesagwan-ro 11-gil, Yongsan-gu, Seoul, Republic of Korea \n\n☎️ 574-65-54\n☎️ 577-36-60\n\n🪙 www.uzbekistan.or.kr, korea.mfa.uz\n\n📨 info@uzbekistan.or.kr`,
  37.53488972591446,
  127.00167499778397
);
//Посольство Республики Узбекистан в Республике Корея
elchiRu(
  "btn_ru_84",
  `Чрезвычайный и Полномочный Посол:\nФен Виталий Васильевич\n\nАдрес:\n27, Daesagwan-ro 11-gil, Yongsan-gu, Seoul, Republic of Korea\n\n☎️ 574-65-54\n☎️ 577-36-60\n\n🪙 www.uzbekistan.or.kr, korea.mfa.uz\n\n📨 info@uzbekistan.or.kr`,
  37.53488972591446,
  127.00167499778397
);

//O'zb Res Kuvayt Davlatidagi elchixonasi
elchi(
  "btn_uz_85",
  `Favqulodda va Muxtor Elchi:\nA’loyev Bahromjon Juraboyevich\n\nManzil:\nKuwait, Mishref, Block 1, Street 7, Villa №4.\n\n☎️ 2539-65-15\n\n🪙 http://kuwait.mfa.uz/ \n\n📨 kw.uzembassy@mfa.uz`,
  29.2869839459442,
  48.072332168735
);
//Посольство Республики Узбекистан в Государстве Кувейт
elchiRu(
  "btn_ru_85",
  `Чрезвычайный и Полномочный Посол:\nАълоев Бахромжон Журабоевич\n\nАдрес:\nЭль-Кувейт, Мишреф, блок-1, улица- 7, дом № 4 .\n\n☎️ 2539-65-15\n\n🪙 http://kuwait.mfa.uz/ \n\n📨 kw.uzembassy@mfa.uz`,
  29.2869839459442,
  48.072332168735
);

//O'zb Res Qirg‘iziston Respublikasidagi elchixonasi
elchi(
  "btn_uz_86",
  `Favqulodda va Muxtor Elchi:\nMirzoxidov Xurshid Mirsobirovich\n\nManzil:\nBishkek sh., Chingiz Aytmatov ko'chasi, 177-uy.\n\n☎️ 98-62-95\n\n🪙 kyrgyzstan.mfa.uz \n\n📨 uzbembish@elcat.kg`,
  42.83321853615102,
  74.58426898019441
);
//Посольство Республики Узбекистан в Кыргызской Республике
elchiRu(
  "btn_ru_86",
  `Чрезвычайный и Полномочный Посол:\nМирзахидов Хуршид Мирсобирович\n\nАдрес:\n720044, г.Бишкек, ул.Чингиза Айтматова, 177.\n\n☎️ 98-62-95\n\n🪙 kyrgyzstan.mfa.uz \n\n📨 uzbembish@elcat.kg`,
  42.83321853615102,
  74.58426898019441
);

//O'zb Res Latviya Respublikasidagi elchixonasi
elchi(
  "btn_uz_87",
  `Favqulodda va Muxtor Elchi:\nSultanov Qadambay Sharipovich\n\nManzil:\nLV-1010. 11-11 Elizabetes Str., Riga, Latvia.\n\n☎️ 67322424\n☎️ 67322306\n\n🪙 www.uzbekistan.lv, latvia.mfa.uz \n\n📨 embassy@uzbekistan.lv, consulate@uzbekistan.lv.`,
  56.95594598795114,
  24.115083456267758
);
//Посольство Республики Узбекистан в Латвийской Республике
elchiRu(
  "btn_ru_87",
  `Чрезвычайный и Полномочный Посол:\nСултанов Кадамбай Шарипович\n\nАдрес:\nRiga, LV-1010. 11-11 Elizabetes Str.\n\n☎️ 67322424\n☎️ 67322306\n\n🪙 www.uzbekistan.lv, latvia.mfa.uz \n\n📨 embassy@uzbekistan.lv, consulate@uzbekistan.lv.`,
  56.95594598795114,
  24.115083456267758
);

//O'zb Res Malayziyadagi elchixonasi
elchi(
  "btn_uz_88",
  `Favqulodda va Muxtor Elchi:\nUsmanov Ravshan Abrorovich\n\nManzil:\n№.7, Jalan 6, Ampang Utama, 68000 Ampang, Selangor, Malaysia\n\n☎️ 4253-2406\n☎️ 4253-3406\n\n🪙 malaysia.mfa.uz \n\n📨 secretary@uzbekembassy.com.my, consul@uzbekembassy.com.my`,
  3.1544418360886914,
  101.75415867153502
);
//Посольство Республики Узбекистан в Малайзии
elchiRu(
  "btn_ru_88",
  `Чрезвычайный и Полномочный Посол:\nУсманов Равшан Аброрович\n\nАдрес:\nNo.7, Jalan 6, Ampang Utama, 68000 Ampang, Selangor, Malaysia\n\n☎️ 4253-2406\n☎️ 4253-3406\n\n🪙 malaysia.mfa.uz \n\n📨 secretary@uzbekembassy.com.my, consul@uzbekembassy.com.my`,
  3.1544418360886914,
  101.75415867153502
);

//O'zb Res Birlashgan Arab Amirliklaridagi elchixonasi
elchi(
  "btn_uz_89",
  `Favqulodda va Muxtor Elchi:\nVakant\n\nManzil:\nP.O.Box 111446, Zone Est 38/1, Plot#10/Villa 37, Abu Dhabi\n\n☎️ 448-82-15\n☎️ 448-82-17\n\n🪙 uae.mfa.uz\n\n📨 uzbekembassy@uzbekembassy.ae`,
  24.444278994513944,
  54.41455238211567
);
//Посольство Республики Узбекистан в Объединённых Арабских Эмиратах
elchiRu(
  "btn_ru_89",
  `Чрезвычайный и Полномочный Посол:\nВакант\n\nАдрес:\nP.O.Box 111446,  Zone Est 38/1, Muroor Area, Plot #10/Villa 37, Abu-Dhabi\n\n☎️ 448-82-15\n☎️ 448-82-17\n\n🪙 uae.mfa.uz\n\n📨 uzbekembassy@uzbekembassy.ae`,
  24.444278994513944,
  54.41455238211567
);

//O'zbekiston Respublikasining Pokiston Islom Respublikasidagi elchixonasi
elchi(
  "btn_uz_90",
  `Favqulodda va Muxtor Elchi:\nUsmanov Oybek Arifbekovich\n\nManzil:\nHouse №40, Street Khayaban-e-Iqbal, Sector F-8/3, Islamabad, Pakistan\n\n☎️ 226-47-46\n☎️ 285-27-68\n\n🪙 pakistan.mfa.uz\n\n📨 uzbekembassy@gmail.com`,
  33.71875988797603,
  73.03812025664149
);
//Посольство Республики Узбекистан в Исламской Республике Пакистан
elchiRu(
  "btn_ru_90",
  `Чрезвычайный и Полномочный Посол:\nУсманов Ойбек Арифбекович\n\nАдрес:\nHouse №40, Street Khayaban-e-Iqbal, Sector F-8/3, Islamabad\n\n☎️ 226-47-46\n☎️ 285-27-68\n\n🪙 pakistan.mfa.uz\n\n📨 uzbekembassy@gmail.com`,
  33.71875988797603,
  73.03812025664149
);

//O'zb Res Polsha Respublikasidagi elchixonasi
elchi(
  "btn_uz_91",
  `Favqulodda va Muxtor Elchi:\nBabayev Baxrom Jalalovich\n\nManzil:\n21, Kraski Str., Warsaw.\n\n☎️ 894-62-30\n\n🪙 www.uzbekistan.pl, poland.mfa.uz\n\n📨 uzembassy@gmail.com`,
  52.150767691925665,
  21.024463453530476
);
//Посольство Республики Узбекистан в Республике Польша
elchiRu(
  "btn_ru_91",
  `Чрезвычайный и Полномочный Посол:\nБабаев Бахром Джалалович\n\n Адрес: \n21, Kraski Str., Warsaw\n\n☎️ 894-62-30\n\n🪙 www.uzbekistan.pl, poland.mfa.uz\n\n📨 uzembassy@gmail.com`,
  52.150767691925665,
  21.024463453530476
);

//O'zb Res Rossiya Federatsiyasidagi elchixonasi
elchi(
  "btn_uz_92",
  `Favqulodda va Muxtor Elchi:\nAsadov Botirjon Zakirovich\n\nManzil:\n12 Pogorelskiy tor ko‘chasi, Moskva, Rossiya\n\n☎️ 230-00-78\n☎️ 230-00-76 \n☎️ 755-89-46\n☎️ 296-07-26\n\n🪙 www.uzembassy.ru\n\n📨 info@uzembassy.ru`,
  55.73268098285613,
  37.62100169840296
);
//Посольство Республики Узбекистан в Российской Федерации
elchiRu(
  "btn_ru_92",
  `Чрезвычайный и Полномочный Посол:\nАсадов Ботиржон Закирович\n\nАдрес:\n119017, г. Москва, Погорельский переулок, д.12.\n\n☎️ 230-00-78\n☎️ 230-00-76 \n☎️ 755-89-46\n☎️ 296-07-26\n\n🪙 www.uzembassy.ru\n\n📨 info@uzembassy.ru`,
  55.73268098285613,
  37.62100169840296
);

//O'zb Res Saudiya Arabistoni Podshohligidagi elchixonasi
elchi(
  "btn_uz_93",
  `Favqulodda va Muxtor Elchi:\nMaksudov Ulugbek Xamidjanovich\n\nManzil:\nP.O. Box 94008 Riyadh 11693, Riyadh city, area Sulaimania, Talha bin Al Barra str. Villa №17, Saudi Arabia\n\n☎️ 263-52-23\n\n🪙 uzbekistan.sa, ksa.mfa.uz.\n\n📨 uzbembriyadh@gmail.com`,
  24.708759276381418,
  46.70206392630878
);
//Посольство Республики Узбекистан в Королевстве Саудовская Аравия
elchiRu(
  "btn_ru_93",
  `Чрезвычайный и Полномочный Посол:\nМаксудов Улугбек Хамиджанович\n\nАдрес:\nP.O. Box 94008 Riyadh 11693, Riyadh city, area Sulaimania, Talha bin Al Barra str. Villa №17, Saudi Arabia\n\n☎️ 263-52-23\n\n🪙 uzbekistan.sa, ksa.mfa.uz.\n\n📨 uzbembriyadh@gmail.com`,
  24.708759276381418,
  46.70206392630878
);

//O'zb Res Singapurdagi elchixonasi
elchi(
  "btn_uz_94",
  `Favqulodda va Muxtor Elchi:\nShakirov Qaxramon Abduganiyevich\n\nManzil:\n20 Kramat Lane, United House # 04-01/02, Singapore 228773\n\n☎️ 6734-39-42/43  \n\n🪙  singapore.mfa.uz, uzembassy.sg\n\n📨 office@uzembassy.sg`,
  1.3009625881565763,
  103.84276539722717
);
//Посольство Республики Узбекистан в Республике Сингапур
elchiRu(
  "btn_ru_94",
  `Чрезвычайный и Полномочный Посол:\nШакиров Кахрамон Абдуганиевич\n\nАдрес:\n20 Kramat Lane, United House # 04-01/02, Singapore 228773\n\n☎️ 6734-39-42/43  \n\n🪙  singapore.mfa.uz, uzembassy.sg\n\n📨 office@uzembassy.sg`,
  1.3009625881565763,
  103.84276539722717
);

//O'zb Res Amerika Qo‘shma Shtatlaridagi elchixonasi
elchi(
  "btn_uz_95",
  `Favqulodda va Muxtor Elchi:\nVaxabov Javlon Abdujalolovich\n\nManzil:\n1746 Massachusetts Avenue, North West, Washington DC, 20036, USA\n\n☎️ 887-53-00\n☎️ 251-82-98  \n\n🪙  www.uzbekistan.org\n\n📨 info@uzbekistan.org`,
  38.90852735256902,
  -77.0395766934884
);
//Посольство Республики Узбекистан в Соединенных Штатах Америки
elchiRu(
  "btn_ru_95",
  `Чрезвычайный и Полномочный Посол:\nВахабов Жавлон Абдужалолович\n\nАдрес:\n1746 Massachusetts Avenue, North West, Washington DC, 20036, USA\n\n☎️ 887-53-00\n☎️ 251-82-98  \n\n🪙  www.uzbekistan.org\n\n📨 info@uzbekistan.org`,
  38.90852735256902,
  -77.0395766934884
);

//O'zb Res Tojikiston Respublikasidagi elchixonasi
elchi(
  "btn_uz_96",
  `Favqulodda va Muxtor Elchi:\nShaismatov Ergash Raxmatullayevich\n\nManzil:\n734003, Dushanbe shahri, Sanoi ko'chasi, 30-uy\n\n☎️ 224-75-39\n☎️ 224-75-42\n\n🪙 uzbekistan.tj, tajikistan.mfa.uz\n\n📨 ruzintaj@rambler.ru, embasuzbek@gmail.com, uzbekistantj@yandex.ru`,
  38.60130121157151,
  68.78445636049167
);
//Посольство Республики Узбекистан в Республике Таджикистан
elchiRu(
  "btn_ru_96",
  `Чрезвычайный и Полномочный Посол:\nШаисматов Эргаш Рахматуллаевич\n\nАдрес:\n734003, Душанбе, ул. Санои, 30\n\n☎️ 224-75-39\n☎️ 224-75-42\n\n🪙 uzbekistan.tj, tajikistan.mfa.uz\n\n📨 ruzintaj@rambler.ru, embasuzbek@gmail.com, uzbekistantj@yandex.ru`,
  38.60130121157151,
  68.78445636049167
);

//O'zb Res Turkiya Respublikasidagi elchixonasi
elchi(
  "btn_uz_97",
  `Favqulodda va Muxtor Elchi:\nAgzamxodjayev Alisher Anvarovich\n\nManzil:\n06550, Sancak Mah., 549 Sokak, № 3, Yıldız - Çankaya, Ankara,\n\n☎️ 441-38-71\n☎️ 441-17-46\n\n🪙 www.uzembassy.org.tr, turkey.mfa.uz.\n\n📨 uzbekistanemb@gmail.com,  uzconsul.ankara@gmail.com`,
  39.87248206619246,
  32.86392204571917
);
//Посольство Республики Узбекистан в Турецкой Республике
elchiRu(
  "btn_ru_97",
  `Чрезвычайный и Полномочный Посол:\nАгзамходжаев Алишер Анварович\n\nАдрес:\n006550, Sancak Mah., 549 Sokak, № 3, Yıldız - Çankaya, Ankara\n\n☎️ 441-38-71\n☎️ 441-17-46\n\n🪙 www.uzembassy.org.tr, turkey.mfa.uz.\n\n📨 uzbekistanemb@gmail.com,  uzconsul.ankara@gmail.com`,
  39.87248206619246,
  32.86392204571917
);

//O'zb Res Turkmanistondagi elchixonasi
elchi(
  "btn_uz_98",
  `Favqulodda va Muxtor Elchi:\nKuchkarov Akmaljon Artikovich\n\nManzil:\nGurugli ko‘chasi 50 A uy, Ashxobod\n\n☎️ 36-90-55\n\n🪙 turkmenistan.mfa.uz\n\n📨 embashgabat@yahoo.com `,
  37.944395783753,
  58.35945449723727
);
//Посольство Республики Узбекистан в Туркменистане
elchiRu(
  "btn_ru_98",
  `Чрезвычайный и Полномочный Посол:\nКучкаров Акмалжон Артикович\n\nАдрес:\nг. Ашхабод, ул. Героглы, дом 50А\n\n☎️ 36-90-55\n\n🪙 turkmenistan.mfa.uz\n\n📨 embashgabat@yahoo.com `,
  37.944395783753,
  58.35945449723727
);

//O'zb Res Ukrainadagi elchixonasi
elchi(
  "btn_uz_99",
  `Favqulodda va Muxtor Elchi:\nKurmanov Alisher Anvarovich\n\nManzil:\nVladimirskaya ko‘chasi 16 uy, Kiev, Ukraina, 01901\n\n☎️ 501-50-00\n☎️  501-41-82\n☎️ 501-41-83 \n\n🪙 www.uzbekistan.org.ua, ukraine.mfa.uz\n\n📨 embassy@uzbekistan.org.ua `,
  50.454925295726774,
  30.516991797646273
);
//Посольство Республики Узбекистан в Украине
elchiRu(
  "btn_ru_99",
  `Чрезвычайный и Полномочный Посол:\nКурманов Алишер Анварович\n\nАдрес:\nул. Владимирская, 16, г. Киев, Украина, 01901А\n\n☎️ 501-50-00\n☎️  501-41-82\n☎️ 501-41-83 \n\n🪙 www.uzbekistan.org.ua, ukraine.mfa.uz\n\n📨 embassy@uzbekistan.org.ua `,
  50.454925295726774,
  30.516991797646273
);

//O'zb Res Fransiya Respublikasidagi elchixonasi
elchi(
  "btn_uz_100",
  `Favqulodda va Muxtor Elchi:\nRustambaev Sardor Mirzayusupovich\n\nManzil:\n22 rue d’Aguesseau 75008 Paris\n\n☎️ 53-30-03-53 \n\n🪙 www.ouzbekistan.fr, france.mfa.uz\n\n📨 contact@ouzbekistan.fr. `,
  48.8710347216855,
  2.3200317251341303
);
//Посольство Республики Узбекистан во Французской Республике
elchiRu(
  "btn_ru_100",
  `Чрезвычайный и Полномочный Посол:\nРустамбаев Сардор Мирзаюсупович\n\nАдрес:\n22 rue d’Aguesseau 75008 Paris\n\n☎️ 53-30-03-53 \n\n🪙 www.ouzbekistan.fr, france.mfa.uz\n\n📨 contact@ouzbekistan.fr. `,
  48.8710347216855,
  2.3200317251341303
);

//O'zb Res Germaniya Federativ Respublikasidagi elchixonasi
elchi(
  "btn_uz_101",
  `Favqulodda va Muxtor Elchi:\nKasimov Nobijon Sadikdjanovich\n\nManzil:\nPerleberger Strasse 62, Berlin 10559, Germany.\n\n☎️ 394-09-80\n\n🪙 www.uzbekistan.de, germany.mfa.uz.\n\n📨 botschaft@uzbekistan.de`,
  52.53476699810613,
  13.355841434503855
);
//Посольство Республики Узбекистан в Федеративной Республике Германия
elchiRu(
  "btn_ru_101",
  `Чрезвычайный и Полномочный Посол:\nКасимов Набижон Садикджанович\n\nАдрес:\nPerleberger Strasse 62, Berlin 10559\n\n☎️ 394-09-80\n\n🪙 www.uzbekistan.de, germany.mfa.uz.\n\n📨 botschaft@uzbekistan.de`,
  52.53476699810613,
  13.355841434503855
);

//O'zb Res Yaponiyadagi elchixonasi
elchi(
  "btn_uz_102",
  `Favqulodda va Muxtor Elchi:\nAbduraxmonov Muxsinxuja Tursunxujayevich \n\nManzil:\n108-0074 Tokyo, Minato-ku, Takanawa 2-1-52\n\n☎️ 6277-21-66\n☎️ 1273-49-00\n\n🪙 uzbekistan.jp, japan.mfa.uz, \n\n📨 info@uzbekistan.jp`,
  35.639651217065186,
  139.73707066889529
);
//Посольство Республики Узбекистан в Японии
elchiRu(
  "btn_ru_102",
  `Чрезвычайный и Полномочный Посол:\nАбдурахмонов Мухсинхужа Турсунхуджаевич\n\nАдрес:\n108-0074 Tokyo, Minаto-ku, Takanawa 2-1-52\n\n☎️ 6277-21-66\n☎️ 1273-49-00\n\n🪙 uzbekistan.jp, japan.mfa.uz, \n\n📨 info@uzbekistan.jp`,
  35.639651217065186,
  139.73707066889529
);

//O'zb Res O‘mon Sultonligidagi elchixonasi
elchi(
  "btn_uz_103",
  `Favqulodda va Muxtor Elchi:\nVakant\n\nManzil:\nO‘mon Sultonligi, Maskat shahri, Shatti Qurm, 3048-ko‘cha, 3900-villa\n\n☎️ 79-481-814\n☎️ 79-481-815\n\n🪙 oman.mfa.uz \n\n📨 uzembassyinoman@gmail.com`,
  23.607492865600403,
  58.44952401123378
);
//Посольство Республики Узбекистан в Султанате Оман
elchi(
  "btn_ru_103",
  `Чрезвычайный и Полномочный Посол:\nВакант\n\nАдрес:\nг.Маскат, Шатти Курм, улица 3048, вилла 3900\n\n☎️ 79-481-814\n☎️ 79-481-815\n\n🪙 oman.mfa.uz \n\n📨 uzembassyinoman@gmail.com`,
  23.607492865600403,
  58.44952401123378
);

// Elchixonalar
bot.action("btn_uz_8", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "O'zb Res Avstriya Respublikasidagi elchixonasi",
              callback_data: "btn_uz_69",
            },
          ],
          [
            {
              text: "O'zb Res Ozarbayjon Respublikasidagi elchixonasi",
              callback_data: "btn_uz_70",
            },
          ],
          [
            {
              text: "O'zb Res Afg‘onistondagi elchixonasi",
              callback_data: "btn_uz_71",
            },
          ],
          [
            {
              text: "O'zb Res Belarus Respublikasidagi Elchixonasi",
              callback_data: "btn_uz_72",
            },
          ],
          [
            {
              text: "O'zb Res Belgiya Qirolligidagi elchixonasi",
              callback_data: "btn_uz_73",
            },
          ],
          [
            {
              text: "O'zb Res Buyuk Britaniya va Shimoliy Irlandiya Birlashgan Qirolligidagi elchixonasi",
              callback_data: "btn_uz_74",
            },
          ],
          [
            {
              text: "O'zb Res Misr Arab Respublikasidagi elchixonasi",
              callback_data: "btn_uz_75",
            },
          ],
          [
            {
              text: "O'zb Res Ispaniya Qirolligidagi elchixonasi",
              callback_data: "btn_uz_76",
            },
          ],
          [
            {
              text: "O'zb Res Italiya Respublikasidagi elchixonasi",
              callback_data: "btn_uz_77",
            },
          ],
          [
            {
              text: "O'zb Res Isroil Davlatidagi elchixonasi",
              callback_data: "btn_uz_78",
            },
          ],
          [
            {
              text: "O'zb Res Hindiston Respublikasidagi elchixonasi",
              callback_data: "btn_uz_79",
            },
          ],
          [
            {
              text: "O'zb Res Indoneziya Respublikasidagi elchixonasi",
              callback_data: "btn_uz_80",
            },
          ],
          [
            {
              text: "O'zb Res Eron Islom Respublikasidagi elchixonasi",
              callback_data: "btn_uz_81",
            },
          ],
          [
            {
              text: "O'zb Res Qozog‘iston Respublikasidagi elchixonasi",
              callback_data: "btn_uz_82",
            },
          ],
          [
            {
              text: "O'zb Res Xitoy Xalq Respublikasidagi elchixonasi",
              callback_data: "btn_uz_83",
            },
          ],
          [
            {
              text: "O'zb Res Koreya Respublikasidagi elchixonasi",
              callback_data: "btn_uz_84",
            },
          ],
          [
            {
              text: "O'zb Res Kuvayt Davlatidagi elchixonasi",
              callback_data: "btn_uz_85",
            },
          ],
          [
            {
              text: "O'zb Res Qirg‘iziston Respublikasidagi elchixonasi",
              callback_data: "btn_uz_86",
            },
          ],
          [
            {
              text: "O'zb Res Latviya Respublikasidagi elchixonasi",
              callback_data: "btn_uz_87",
            },
          ],
          [
            {
              text: "O'zb Res Malayziyadagi elchixonasi",
              callback_data: "btn_uz_88",
            },
          ],
          [
            {
              text: "O'zb Res Birlashgan Arab Amirliklaridagi elchixonasi",
              callback_data: "btn_uz_89",
            },
          ],
          [
            {
              text: "O'zbekiston Respublikasining Pokiston Islom Respublikasidagi elchixonasi",
              callback_data: "btn_uz_90",
            },
          ],
          [
            {
              text: "O'zb Res Polsha Respublikasidagi elchixonasi",
              callback_data: "btn_uz_91",
            },
          ],
          [
            {
              text: "O'zb Res Rossiya Federatsiyasidagi elchixonasi",
              callback_data: "btn_uz_92",
            },
          ],
          [
            {
              text: "O'zb Res Saudiya Arabistoni Podshohligidagi elchixonasi",
              callback_data: "btn_uz_93",
            },
          ],
          [
            {
              text: "O'zb Res Singapurdagi elchixonasi",
              callback_data: "btn_uz_94",
            },
          ],
          [
            {
              text: "O'zb Res Amerika Qo‘shma Shtatlaridagi elchixonasi",
              callback_data: "btn_uz_95",
            },
          ],
          [
            {
              text: "O'zb Res Tojikiston Respublikasidagi elchixonasi",
              callback_data: "btn_uz_96",
            },
          ],
          [
            {
              text: "O'zb Res Turkiya Respublikasidagi elchixonasi",
              callback_data: "btn_uz_97",
            },
          ],
          [
            {
              text: "O'zb Res Turkmanistondagi elchixonasi",
              callback_data: "btn_uz_98",
            },
          ],
          [
            {
              text: "O'zb Res Ukrainadagi elchixonasi",
              callback_data: "btn_uz_99",
            },
          ],
          [
            {
              text: "O'zb Res Fransiya Respublikasidagi elchixonasi",
              callback_data: "btn_uz_100",
            },
          ],
          [
            {
              text: "O'zb Res Germaniya Federativ Respublikasidagi elchixonasi",
              callback_data: "btn_uz_101",
            },
          ],
          [
            {
              text: "O'zb Res Yaponiyadagi elchixonasi",
              callback_data: "btn_uz_102",
            },
          ],
          [
            {
              text: "O'zb Res O‘mon Sultonligidagi elchixonasi",
              callback_data: "btn_uz_103",
            },
          ],

          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_ru_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_1" },
          ],
        ],
      },
    });

    await ctx.replyWithHTML("Elchixona", {
      disable_web_page_preview: true,
    });
  } catch (error) {
    console.error(error);
  }
});

// Посольства РУз за рубежом
bot.action("btn_ru_8", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Посольство Республики Узбекистан в Австрийской Республике",
              callback_data: "btn_ru_69",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Азербайджанской Республике",
              callback_data: "btn_ru_70",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Афганистане",
              callback_data: "btn_ru_71",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Республике Беларусь",
              callback_data: "btn_ru_72",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Королевстве Бельгия",
              callback_data: "btn_ru_73",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Соединенном Королевстве Великобритании и Северной Ирландии",
              callback_data: "btn_ru_74",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Арабской Республике Египет",
              callback_data: "btn_ru_75",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Королевстве Испания",
              callback_data: "btn_ru_76",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Итальянской Республике",
              callback_data: "btn_ru_77",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Государстве Израиль",
              callback_data: "btn_ru_78",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Республике Индия",
              callback_data: "btn_ru_79",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Республике Индонезия",
              callback_data: "btn_ru_80",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Исламской Республике Иран",
              callback_data: "btn_ru_81",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Республике Казахстан",
              callback_data: "btn_ru_82",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Китайской Народной Республике",
              callback_data: "btn_ru_83",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Республике Корея",
              callback_data: "btn_ru_84",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Государстве Кувейт",
              callback_data: "btn_ru_85",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Кыргызской Республике",
              callback_data: "btn_ru_86",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Латвийской Республике",
              callback_data: "btn_ru_87",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Малайзии",
              callback_data: "btn_ru_88",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Объединённых Арабских Эмиратах",
              callback_data: "btn_ru_89",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Исламской Республике Пакистан",
              callback_data: "btn_ru_90",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Республике Польша",
              callback_data: "btn_ru_91",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Российской Федерации",
              callback_data: "btn_ru_92",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Королевстве Саудовская Аравия",
              callback_data: "btn_ru_93",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Республике Сингапур",
              callback_data: "btn_ru_94",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Соединенных Штатах Америки",
              callback_data: "btn_ru_95",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Республике Таджикистан",
              callback_data: "btn_ru_96",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Турецкой Республике",
              callback_data: "btn_ru_97",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Туркменистане",
              callback_data: "btn_ru_98",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Украине",
              callback_data: "btn_ru_99",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан во Французской Республике",
              callback_data: "btn_ru_100",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Федеративной Республике Германия",
              callback_data: "btn_ru_101",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Японии",
              callback_data: "btn_ru_102",
            },
          ],
          [
            {
              text: "Посольство Республики Узбекистан в Султанате Оман",
              callback_data: "btn_ru_103",
            },
          ],
          [
            { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            { text: "⬅️ Назад", callback_data: "btn_ru_1" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// ТММА нинг хориждаги Ваколатхоналари
bot.action("btn_uz_7", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Rossiya Federatsiyasi", callback_data: "btn_uz_31" },
            { text: "Koreya Respublikasi", callback_data: "btn_uz_32" },
          ],
          [
            { text: "Turkiya Respublikasi", callback_data: "btn_uz_39" },
            { text: "Qozog`iston Respublikasi", callback_data: "btn_uz_40" },
          ],
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_27" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
// Представительства АВТМ за рубежом
bot.action("btn_ru_7", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Российская Федерация", callback_data: "btn_ru_31" },
            { text: "Республика Корея", callback_data: "btn_ru_32" },
          ],
          [
            { text: "Республика Турция", callback_data: "btn_ru_39" },
            { text: "Республика Казахстан", callback_data: "btn_ru_40" },
          ],
          [
            { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            { text: "⬅️ Назад", callback_data: "btn_ru_27" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Turkiya Respublikasi
bot.action("btn_uz_39", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Istanbul shahri", callback_data: "btn_uz_61" },
            { text: "Bursa shahri", callback_data: "btn_uz_62" },
          ],
          [
            { text: "Izmir shahri", callback_data: "btn_uz_63" },
            { text: "Antalya shahri", callback_data: "btn_uz_64" },
          ],
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_7" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
// Республика Турция
bot.action("btn_ru_39", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Город Стамбул", callback_data: "btn_ru_61" },
            { text: "Город Бурса", callback_data: "btn_ru_62" },
          ],
          [
            { text: "Город Измир", callback_data: "btn_ru_63" },
            { text: "Город Анталья", callback_data: "btn_ru_64" },
          ],
          [
            { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            { text: "⬅️ Назад", callback_data: "btn_ru_7" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

function turkiya(btn, type, lat, lan) {
  bot.action(btn, async (ctx) => {
    try {
      await ctx.deleteMessage();
      await bot.telegram.sendLocation(ctx.chat.id, lat, lan);
      await bot.telegram.sendMessage(ctx.chat.id, `${type}`, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_39" },
              { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            ],
          ],
        },
      });
    } catch (error) {
      console.error(error);
    }
  });
}
function turkiyaRu(btn, type, lat, lan) {
  bot.action(btn, async (ctx) => {
    try {
      await ctx.deleteMessage();
      await bot.telegram.sendLocation(ctx.chat.id, lat, lan);
      await bot.telegram.sendMessage(ctx.chat.id, `${type}`, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "⬅️ Назад", callback_data: "btn_ru_39" },
              { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            ],
          ],
        },
      });
    } catch (error) {
      console.error(error);
    }
  });
}

// Qozog`iston Respublikasi
bot.action("btn_uz_40", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Turkiston viloyati", callback_data: "btn_uz_65" },
            { text: "Chimkent shahri", callback_data: "btn_uz_66" },
          ],
          [
            { text: "Jambul viloyati", callback_data: "btn_uz_67" },
            { text: "Qizil-O`rda viloyati", callback_data: "btn_uz_68" },
          ],
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_7" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
// Республика Казахстан
bot.action("btn_ru_40", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Туркестанская область", callback_data: "btn_ru_65" },
            { text: "Город Шымкент", callback_data: "btn_ru_66" },
          ],
          [
            { text: "Джамбульская область", callback_data: "btn_ru_67" },
            { text: "Кизил-Урдинская область", callback_data: "btn_ru_68" },
          ],
          [
            { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            { text: "⬅️ Назад", callback_data: "btn_ru_7" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

//Istanbul shahri
turkiya(
  "btn_uz_61",
  `Vakolatxona raxbari:\nvakant\n\nVakolatxona manzili:\nLevent, Lale ko'chasi №:8, 34460 Levent/Beshiktosh\n\n☎️ +90 (212) 323 2037\n\n📨: uzbekconsul@yahoo.com\n📨: joha772004@mail.ru `,
  41.07742868462765,
  29.017352238066845
);
turkiyaRu(
  "btn_ru_61",
  `Руководитель представительства:\nвакант\n\nАдрес представительства:\nЛевент чарси, улица Лале №:8, 34460 Левент/Бешикташ \n\n☎️ +90 (212) 323 2037\n\n📨: uzbekconsul@yahoo.com\n📨: joha772004@mail.ru`,
  41.07742868462765,
  29.017352238066845
);
// ................................................

// Koreya Respublikasi
bot.action("btn_uz_32", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendLocation(ctx.chat.id, 35.176364, 126.808108);
    await bot.telegram.sendMessage(
      ctx.chat.id,
      `Vakolatxona rahbari:\nG‘oyibnazarov Farrux Rustam o‘g‘li.\n\nVakolatxona manzili:\nKvandju shahrida Gvangsan-gu, Pungeong-ro, 145-82 \n\n☎️+070-4252-2772`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
              { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_7" },
            ],
          ],
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
});
// Республика Корея
bot.action("btn_ru_32", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendLocation(ctx.chat.id, 35.176364, 126.808108);
    await bot.telegram.sendMessage(
      ctx.chat.id,
      `Руководитель представительства:\nГойибназаров Фаррух Рустам угли.\n\nАдрес представительства:\nгород Кванджу, Гвангсан-гу, Пунгеонг-ро, 145-82. \n\n☎️+070-4252-2772`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
              { text: "⬅️ Назад", callback_data: "btn_ru_7" },
            ],
          ],
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
});

// Rossiya Federatsiyasi
bot.action("btn_uz_31", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Moskva shahri", callback_data: "btn_uz_33" },
            { text: "Sankt-Peterburg shahri ", callback_data: "btn_uz_34" },
          ],
          [
            { text: "Ekaterinburg shahri", callback_data: "btn_uz_35" },
            { text: "Novosibirk shahri ", callback_data: "btn_uz_36" },
          ],
          [
            { text: "Samara shahri", callback_data: "btn_uz_37" },
            { text: "Ufa shahri ", callback_data: "btn_uz_38" },
          ],
          [
            {
              text: "⬇️ ⬇️ ⬇️  TEST JARAYONIDA  ⬇️ ⬇️ ⬇️",
              callback_data: "btn_uz_test",
            },
          ],
          [
            { text: "Tula viloyati", callback_data: "btn_uz_41" },
            { text: "Voronej viloyati", callback_data: "btn_uz_42" },
          ],
          [
            { text: "Volgograd viloyati", callback_data: "btn_uz_43" },
            { text: "Nijegorod viloyati", callback_data: "btn_uz_44" },
          ],
          [
            {
              text: "Xanti-Mansiysk avtonom okrugi-Yugra",
              callback_data: "btn_uz_45",
            },
            { text: "Irkutsk viloyati", callback_data: "btn_uz_46" },
          ],
          [
            { text: "Amur viloyati", callback_data: "btn_uz_47" },
            { text: "Krasnoyarsk o`lkasi", callback_data: "btn_uz_48" },
          ],
          [
            { text: "Perm o`lkasi", callback_data: "btn_uz_49" },
            { text: "Lipesk viloyati", callback_data: "btn_uz_50" },
          ],
          [
            { text: "Belgorod viloyati", callback_data: "btn_uz_51" },
            { text: "Stavropol viloyati", callback_data: "btn_uz_52" },
          ],
          [
            { text: "Astraxan viloyati", callback_data: "btn_uz_53" },
            { text: "Kostroma viloyati", callback_data: "btn_uz_54" },
          ],
          [
            { text: "Yamal-Nenesk avtonov okrugi", callback_data: "btn_uz_55" },
            { text: "Buratiya Respublikasi", callback_data: "btn_uz_56" },
          ],
          [
            { text: "Xabarovsk o`lkasi", callback_data: "btn_uz_57" },
            { text: "Kamerov viloyati", callback_data: "btn_uz_58" },
          ],
          [
            { text: "Udmurtiya Respublikasi", callback_data: "btn_uz_59" },
            { text: "Nijegorod viloyati", callback_data: "btn_uz_60" },
          ],
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_7" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
// Rossiya Federatsiyasi
bot.action("btn_ru_31", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Город Москва", callback_data: "btn_ru_33" },
            { text: "Город Санкт-Петербург ", callback_data: "btn_ru_34" },
          ],
          [
            { text: "Город Екатеринбург", callback_data: "btn_ru_35" },
            { text: "Город Новосибирск ", callback_data: "btn_ru_36" },
          ],
          [
            { text: "Город Самара", callback_data: "btn_ru_37" },
            { text: "Город Уфа ", callback_data: "btn_ru_38" },
          ],
          [
            {
              text: "⬇️ ⬇️ ⬇️  В ТЕСТОВОМ РЕЖИМЕ  ⬇️ ⬇️ ⬇️",
              callback_data: "btn_ru_test",
            },
          ],
          [
            { text: "Тульская область", callback_data: "btn_ru_41" },
            { text: "Воронежская область", callback_data: "btn_ru_42" },
          ],
          [
            { text: "Краснодарский край", callback_data: "btn_ru_43" },
            { text: "Волгоградская область ", callback_data: "btn_ru_44" },
          ],
          [
            {
              text: "Ханты-Мансийский автономный округ-Югра",
              callback_data: "btn_ru_45",
            },
            { text: "Иркутская область", callback_data: "btn_ru_46" },
          ],
          [
            { text: "Амурская область", callback_data: "btn_ru_47" },
            { text: "Красноярский край", callback_data: "btn_ru_48" },
          ],
          [
            { text: "Пермский край", callback_data: "btn_ru_49" },
            { text: "Липецкая область", callback_data: "btn_ru_50" },
          ],
          [
            { text: "Белгородская область", callback_data: "btn_ru_51" },
            { text: "Ставропольский край", callback_data: "btn_ru_52" },
          ],
          [
            { text: "Астраханекая область", callback_data: "btn_ru_53" },
            { text: "Костромская область", callback_data: "btn_ru_54" },
          ],
          [
            {
              text: "Ямало-Ненецкий автономный округ",
              callback_data: "btn_ru_55",
            },
            { text: "Республика Бурятия ", callback_data: "btn_ru_56" },
          ],
          [
            { text: "Хабаровский край", callback_data: "btn_ru_57" },
            { text: "Кемеровская область", callback_data: "btn_ru_58" },
          ],
          [
            { text: "Удмуртская Республика", callback_data: "btn_ru_59" },
            { text: "Нижегородская область", callback_data: "btn_ru_60" },
          ],
          [
            { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            { text: "⬅️ Назад", callback_data: "btn_ru_7" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

function rossiyaRu(btn, type, lat, lan) {
  bot.action(btn, async (ctx) => {
    try {
      await ctx.deleteMessage();
      await bot.telegram.sendLocation(ctx.chat.id, lat, lan);
      await bot.telegram.sendMessage(ctx.chat.id, `${type}`, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "⬅️ Назад", callback_data: "btn_ru_31" },
              { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            ],
          ],
        },
      });
    } catch (error) {
      console.error(error);
    }
  });
}
function rossiya(btn, type, lat, lan) {
  bot.action(btn, async (ctx) => {
    try {
      await ctx.deleteMessage();
      await bot.telegram.sendLocation(ctx.chat.id, lat, lan);
      await bot.telegram.sendMessage(ctx.chat.id, `${type}`, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_31" },
              { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            ],
          ],
        },
      });
    } catch (error) {
      console.error(error);
    }
  });
}
// Moskva shahri
rossiya(
  "btn_uz_33",
  `Vakolatxona raxbari: \nMansurov Saidnumon Yo'lbarsxonovich\n\nVakolatxona manzili:\nMoskva shahri, 1-Kazachiy tor ko‘chasi, 11/2 (Metro Polyanka)\n\nPochta indeksi: 119017\n\n☎️ +7 (925) 045 47 44\n\n📨: info.pavtm@mail.ru `,
  55.73481971124438,
  37.62056874267248
);
// город Москва
rossiyaRu(
  "btn_ru_33",
  `Руководитель представительства: \nМансуров Саиднумон Юлбарсхонович\n\nАдрес представительства:\nгород Москва, станция метро «Полянка», Казачий 1-й переулок, 11/2.\n\nПочтовый индекс: 119017\n\n☎️ +7 (925) 045 47 44\n\n📨: info.pavtm@mail.ru `,
  55.73481971124438,
  37.62056874267248
);

// Sankt-Peterburg
rossiya(
  "btn_uz_34",
  `Vakolatxona raxbari:\nvakant\n\nVakolatxona manzili:\nSankt-Peterburg shahri, Vozduxoplavatelnaya ko‘chasi 13-uy \n\n☎️ +7 (951) 680 95 97`,
  59.91390068461683,
  30.315817660011795
);
// город Санкт-Петербург
rossiyaRu(
  "btn_ru_34",
  `Руководитель представительства:\nвакант\n\nАдрес представительства:\nгород Санкт-Петербург, улица Воздухоплавательная, 13. \n\n☎️ +7 (951) 680 95 97`,
  59.91390068461683,
  30.315817660011795
);

// Yekaterinburg shahri
rossiya(
  "btn_uz_35",
  `Vakolatxona raxbari: \nSalomov Sarvar Xabibullayevich\n\nVakolatxona manzili:\nYekaterinburg shahri, Karl Libknext ko‘chasi 22-uy \n\n☎️ +7 (925) 950 89 77`,
  56.84117125160314,
  60.61192053722265
);
// город Екатеринбург
rossiyaRu(
  "btn_ru_35",
  `Руководитель представительства: \nСаломов Сарвар Хабибуллаевич\n\nАдрес представительства:\nгород Екатеринбург, улица Карла Либкнехта, 22. \n\n☎️ +7 (925) 950 89 77`,
  56.84117125160314,
  60.61192053722265
);

// Novosibirsk shahri
rossiya(
  "btn_uz_36",
  `Vakolatxona raxbari: \nPolvonov Sherzodjon Fazlitdinovich\n\nVakolatxona manzili:\nNovosibirsk shahri, Lomonosov ko‘chasi, 55B-uy \n\n☎️+7 (913) 735-07-07\n\n📨: avtmsibir@gmail.com`,
  55.039891128208176,
  82.93589891006276
);
// город Новосибирск
rossiyaRu(
  "btn_ru_36",
  `Руководитель представительства: \nПолвонов Шерзоджон Фазлитдинович\n\nАдрес представительства:\nгород Новосибирск, улица Ломоносова, 55Б \n\n☎️+7 (913) 735-07-07\n\n📨: avtmsibir@gmail.com`,
  55.039891128208176,
  82.93589891006276
);

// Samara  shahri
rossiya(
  "btn_uz_37",
  `Vakolatxona raxbari: \nvakant\n\nVakolatxona manzili:\nSamara shahri, Novo-Sadovaya ko‘chasi, 3-uy\n\n☎️+7 (917) 872-42-26`,
  53.205388574465225,
  50.12635155616218
);
// город Самара
rossiyaRu(
  "btn_ru_37",
  `Руководитель представительства: \nвакант\n\nАдрес представительства:\nгород Самара, улица Ново-Садовая, 3\n\n☎️+7 (917) 872-42-26`,
  53.205388574465225,
  50.12635155616218
);

// Ufa shahri
rossiya(
  "btn_uz_38",
  `Vakolatxona raxbari: \nvakant\n\nVakolatxona manzili:\nUfa shahri, Verxnetorgovaya maydon ko‘chasi, 4-uy, 516-ofis\n\n☎️+7 (917) 469-20-88\n☎️ +7 (347) 216-33-43`,
  54.72384807897076,
  55.94297372729565
);
// город Уфа
rossiyaRu(
  "btn_ru_38",
  `Руководитель представительства: \nвакант\n\nАдрес представительства:\nnгород Уфа, площадь Верхнеторговая, дом 4, офис 516\n\n☎️+7 (917) 469-20-88\n☎️ +7 (347) 216-33-43`,
  54.72384807897076,
  55.94297372729565
);

// ----------<<<<ortga>>>>----------
// Назад
bot.action("btn_ru_4", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(
      ctx.chat.id,
      "Xush kelibsiz!\nДобропожаловать!",
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "🇺🇿 O`zbekcha", callback_data: "btn_us_0" },
              { text: "🇷🇺 Русский", callback_data: "btn_ru_0" },
            ],
          ],
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
});
// Ortga qaytish
bot.action("btn_uz_4", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(
      ctx.chat.id,
      "Xush kelibsiz!\nДобропожаловать!",
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "🇺🇿 O`zbekcha", callback_data: "btn_us_0" },
              { text: "🇷🇺 Русский", callback_data: "btn_ru_0" },
            ],
          ],
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
});
// Главная страница
bot.action("btn_ru_3", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(
      ctx.chat.id,
      "Xush kelibsiz!\nДобропожаловать!",
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "🇺🇿 O`zbekcha", callback_data: "btn_us_0" },
              { text: "🇷🇺 Русский", callback_data: "btn_ru_0" },
            ],
          ],
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
});
// Bosh sahifa
bot.action("btn_uz_3", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(
      ctx.chat.id,
      "Xush kelibsiz!\nДобропожаловать!",
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "🇺🇿 O`zbekcha", callback_data: "btn_us_0" },
              { text: "🇷🇺 Русский", callback_data: "btn_ru_0" },
            ],
          ],
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
});
// Manzildan ortga qaytish
bot.action("btn_uz_11", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "📰 Yangiliklar", callback_data: "btn_uz_1-1" },
            { text: "💵 Valyutalar kursi", url: "https://cbu.uz" },
          ],
          [
            { text: "📍🗺 Manzillar", callback_data: "btn_uz_1" },
            {
              text: "📝 Murojaat qoldirish",
              callback_data: "btn_uz_1-0",
            },
          ],
          [
            { text: "🖥  Bog`lanish ☎️", callback_data: "btn_uz_5" },
            { text: "👷🏻‍♂️ Mehnat migrantlari uchun", callback_data: "btn_uz_2" },
          ],

          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_4" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
// Адрес назад
bot.action("btn_ru_11", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "📰Новости", callback_data: "btn_ru_1-1" },
            { text: "💵 Курсы валют", url: "https://cbu.uz" },
          ],
          [
            { text: "📍🗺 Адреса", callback_data: "btn_ru_1" },
            {
              text: "📝 Оставить заявку",
              callback_data: "btn_ru_1-0",
            },
          ],

          [
            { text: "🖥  Связаться ☎️", callback_data: "btn_ru_5" },
            { text: "👷🏻‍♂️ Для Мигрантов", callback_data: "btn_ru_2" },
          ],
          [
            { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            { text: "⬅️ Назад", callback_data: "btn_ru_4" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
// Bog`lanish
bot.action("btn_uz_5", async (ctx) => {
  try {
    await ctx.deleteMessage();
    // await ctx.telegram.sendContact(ctx.chat.id, +998712023355, "+998712023355")
    await bot.telegram.sendMessage(ctx.chat.id, "🖥  Bog`lanish", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🌍 Web site", url: "http://migration.uz/" },
            {
              text: "Madadkor ",
              url: "https://www.facebook.com/madadkor.madadkorov",
            },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_12" },
          ],
        ],
      },
    });
    await ctx.reply("Biz bilan boglaning:\n+998712023355");
  } catch (error) {
    console.error(error);
  }
});
// Связаться
bot.action("btn_ru_5", async (ctx) => {
  try {
    ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🖥  Связаться", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🌍 Web site", url: "http://migration.uz/" },
            {
              text: "Мададкор",
              url: "https://www.facebook.com/madadkor.madadkorov",
            },
            { text: "⬅️ Назад", callback_data: "btn_ru_12" },
          ],
        ],
      },
    });
    await ctx.reply("📱 +998 71 202 33 55");
  } catch (error) {
    console.error(error);
  }
});
// Boglanishdan ortga qaytish
bot.action("btn_uz_12", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "📰 Yangiliklar", callback_data: "btn_uz_1-1" },
            { text: "💵 Valyutalar kursi", url: "https://cbu.uz" },
          ],
          [
            { text: "📍🗺 Manzillar", callback_data: "btn_uz_1" },
            {
              text: "📝 Murojaat qoldirish",
              callback_data: "btn_uz_1-0",
            },
          ],
          [
            { text: "🖥  Bog`lanish ☎️", callback_data: "btn_uz_5" },
            { text: "👷🏻‍♂️ Mehnat migrantlari uchun", callback_data: "btn_uz_2" },
          ],

          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_4" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
// Связаться вернуться
bot.action("btn_ru_12", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "📰Новости", callback_data: "btn_ru_1-1" },
            { text: "💵 Курсы валют", url: "https://cbu.uz" },
          ],
          [
            { text: "📍🗺 Адреса", callback_data: "btn_ru_1" },
            {
              text: "📝 Оставить заявку",
              callback_data: "btn_ru_1-0",
            },
          ],

          [
            { text: "🖥  Связаться ☎️", callback_data: "btn_ru_5" },
            { text: "👷🏻‍♂️ Для Мигрантов", callback_data: "btn_ru_2" },
          ],
          [
            { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            { text: "⬅️ Назад", callback_data: "btn_ru_4" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// ----------<<<<ortga>>>>----------

// Hududiy filiallar
bot.action("btn_uz_6", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Andijon", callback_data: "btn_uz_13" },
            { text: "Buxoro", callback_data: "btn_uz_14" },
          ],
          [
            { text: "Jizzax", callback_data: "btn_uz_15" },
            { text: "Qashqadaryo", callback_data: "btn_uz_16" },
          ],
          [
            { text: "Navoiy", callback_data: "btn_uz_17" },
            { text: "Namangan", callback_data: "btn_uz_18" },
          ],
          [
            { text: "Samarqand", callback_data: "btn_uz_19" },
            { text: "Surxandaryo", callback_data: "btn_uz_20" },
          ],
          [
            { text: "Sirdaryo", callback_data: "btn_uz_21" },
            { text: "Toshkent viloyati", callback_data: "btn_uz_22" },
          ],
          [
            { text: "Toshkent shahri", callback_data: "btn_uz_23" },
            { text: "Nukus", callback_data: "btn_uz_24" },
          ],
          [
            { text: "Xorazm", callback_data: "btn_uz_25" },
            { text: "Farg'ona", callback_data: "btn_uz_26" },
          ],
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_27" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
// Региональные филиалы
bot.action("btn_ru_6", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Андижан", callback_data: "btn_ru_13" },
            { text: "Бухара", callback_data: "btn_ru_14" },
          ],
          [
            { text: "Жиззах", callback_data: "btn_ru_15" },
            { text: "Кашкадаря", callback_data: "btn_ru_16" },
          ],
          [
            { text: "Наваи", callback_data: "btn_ru_17" },
            { text: "Наманган", callback_data: "btn_ru_18" },
          ],
          [
            { text: "Самарканд", callback_data: "btn_ru_19" },
            { text: "Сурхандаря", callback_data: "btn_ru_20" },
          ],
          [
            { text: "Сырдаря", callback_data: "btn_ru_21" },
            { text: "Ташкентская область", callback_data: "btn_ru_22" },
          ],
          [
            { text: "Город Ташкент", callback_data: "btn_ru_23" },
            { text: "Нукус", callback_data: "btn_ru_24" },
          ],
          [
            { text: "Хоразм", callback_data: "btn_ru_25" },
            { text: "Фергана", callback_data: "btn_ru_26" },
          ],
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_ru_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_ru_27" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Hududiy filiallar
function infoMap(btn, text, lat, lan, name) {
  bot.action(btn, async (ctx) => {
    try {
      await ctx.deleteMessage();
      await bot.telegram.sendLocation(ctx.chat.id, lat, lan);
      await bot.telegram.sendMessage(ctx.chat.id, `${name}${text}`, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_6" },
              { text: "🏠 Bosh sahifa", callback_data: "btn_uz_3" },
            ],
          ],
        },
      });
    } catch (error) {
      console.error(error);
    }
  });
}
function infoMaRu(btn, text, lat, lan, name) {
  bot.action(btn, async (ctx) => {
    try {
      await ctx.deleteMessage();
      await bot.telegram.sendLocation(ctx.chat.id, lat, lan);
      await bot.telegram.sendMessage(ctx.chat.id, `${name}${text}`, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "⬅️ Назад", callback_data: "btn_ru_6" },
              { text: "🏠 Гланая страница", callback_data: "btn_ru_3" },
            ],
          ],
        },
      });
    } catch (error) {
      console.error(error);
    }
  });
}
// Andijon
infoMap(
  "btn_uz_13",
  `\n\nFilial raxbari:\nSattorov Gavhar Adilovich\n\n☎️ +998 (95) 202 33 55 \n☎️ +998 (90) 571 47 77`,
  40.7814378842891,
  72.35021615864449,
  "Tashqi mehnat migratsiyasi agentligining Andijon filiali"
);
// Андижан
infoMaRu(
  "btn_ru_13",
  `\n\nРуководитель филиала :\nСаттаров Гавхар Адилович\n\n☎️ +998 (95) 202 33 55 \n☎️ +998 (90) 571 47 77`,
  40.7814378842891,
  72.35021615864449,
  "Информация об Андижанском филиале"
);
// Buxoro
infoMap(
  "btn_uz_14",
  `\n\nFilial raxbari:\nXamdamov Anvar Normurodovich\n\n☎️ +998 (65) 226-56-99\n☎️ +998 (93) 686 11 78`,
  39.769712780281665,
  64.4076155238242,
  "Tashqi mehnat migratsiyasi agentligining Buxoro filiali"
);
// Бухара
infoMaRu(
  "btn_ru_14",
  `\n\nРуководитель филиала :\nХамдамов Анвар Нормуродович\n\n☎️ +998 (65) 226-56-99\n☎️ +998 (93) 686 11 78`,
  39.769712780281665,
  64.4076155238242,
  "Информация об Бухарском филиале"
);
// Jizzax
infoMap(
  "btn_uz_15",
  `\n\nFilial raxbari:\nAbdusaidov Sunatillo Xusanovich\n\n☎️ +998 (72) 226 91 87\n☎️ +998 (93) 992 95 59`,
  40.159728432534514,
  67.82576239167302,
  "Tashqi mehnat migratsiyasi agentligining Jizzax filiali"
);
// Джиззах
infoMaRu(
  "btn_ru_15",
  `\n\nРуководитель филиала :\nАбдусаидов Сунатулло Хусанович\n\n☎️ +998 (72) 226 91 87\n☎️ +998 (93) 992 95 59`,
  40.159728432534514,
  67.82576239167302,
  "Информация об Джиззахском филиале"
);
// Qashqadaryo
infoMap(
  "btn_uz_16",
  `\n\nFilial raxbari:\nRaximov Tojiddin Uralovich\n\n☎️ +998 (75) 224 05 25\n☎️ +998 (98) 777 34 37`,
  38.83258357412349,
  65.80787180101096,
  "Tashqi mehnat migratsiyasi agentligining Qashqadaryo filiali"
);
// Кашкадаря
infoMaRu(
  "btn_ru_16",
  `\n\nРуководитель филиала :\nРахимов Тожиддин Уралович\n\n☎️ +998 (75) 224 05 25\n☎️ +998 (98) 777 34 37`,
  38.83258357412349,
  65.80787180101096,
  "Информация об Кашкадаринском филиале"
);
// Navoiy
infoMap(
  "btn_uz_17",
  `\n\nFilial raxbari:\nRajabov Qaxramon Razaqovich\n\n☎️ +998 (79) 224 11 60\n☎️ +998 (98) 778 10 17`,
  40.113077394611096,
  65.36002772752512,
  "Tashqi mehnat migratsiyasi agentligining Navoiy filiali"
);
// Наваи
infoMaRu(
  "btn_ru_17",
  `\n\nРуководитель филиала :\nРажабов Кахрамон Разакович\n\n☎️ +998 (79) 224 11 60\n☎️ +998 (98) 778 10 17`,
  40.113077394611096,
  65.36002772752512,
  "Информация об Наваинском филиале"
);
// Namangan
infoMap(
  "btn_uz_18",
  `\n\nFilial raxbari:\nApakov Muhammadayubxon\n\n☎️ +998 (69) 227-94-64\n☎️ +998 (90) 554-22-20`,
  41.00093908208746,
  71.67300472496497,
  "Tashqi mehnat migratsiyasi agentligining Namangan filiali"
);
// Наманган
infoMaRu(
  "btn_ru_18",
  `\n\nРуководитель филиала :\nАпаков Муҳаммадаюбхон\n\n☎️ +998 (69) 227-94-64\n☎️ +998 (90) 554-22-20`,
  41.00093908208746,
  71.67300472496497,
  "Информация об Наманганском филиале"
);
// Samarqand
infoMap(
  "btn_uz_19",
  `\n\nFilial raxbari:\nNormuratov Umid Muxtarovich\n\n☎️ +998 (66) 233-24-00\n☎️ +998 (99) 320-62-12`,
  39.655100723087166,
  66.96653327116424,
  "Tashqi mehnat migratsiyasi agentligining Samarqand filiali"
);
// Самарканд
infoMaRu(
  "btn_ru_19",
  `\n\nРуководитель филиала :\nНормуратов Умид Мухтарович\n\n☎️ +998 (66) 233-24-00\n☎️ +998 (99) 320-62-12`,
  39.655100723087166,
  66.96653327116424,
  "Информация об Самаркандском филиале"
);
// Surxandaryo
infoMap(
  "btn_uz_20",
  `\n\nFilial raxbari:\nXamrayev Rustam Usmanovich\n\n☎️ +998 (76) 222-45-22\n☎️ +998 (99) 715-10-05`,
  37.22032974223839,
  67.27775099999998,
  "Tashqi mehnat migratsiyasi agentligining Surxandaryo filiali"
);
// Сурхандаря
infoMaRu(
  "btn_ru_20",
  `\n\nРуководитель филиала :\nХамраев Рустам Усманович\n\n☎️ +998 (76) 222-45-22\n☎️ +998 (99) 715-10-05`,
  37.22032974223839,
  67.27775099999998,
  "Информация об Сурхандаринском филиале"
);
// Sirdaryo
infoMap(
  "btn_uz_21",
  `\n\nFilial raxbari:\nIsroilov Sirojiddin Mamaraximov\n\n☎️ +998 (67) 225-55-59\n☎️ +998 (94) 407-18-07`,
  40.49791294050947,
  68.77627303008786,
  "Tashqi mehnat migratsiyasi agentligining Sirdaryo filiali"
);
// Сирдаря
infoMaRu(
  "btn_ru_21",
  `\n\nРуководитель филиала :\nИсроилов Сирожиддин Мамарахимович\n\n☎️ +998 (67) 225-55-59\n☎️ +998 (94) 407-18-07`,
  40.49791294050947,
  68.77627303008786,
  "Информация об Сирдаринском филиале"
);
// Toshkent viloyati
infoMap(
  "btn_uz_22",
  `\n\nFilial raxbari:\nBaxromov Nodir Qodirbek o\`g\`li\n\n☎️ +998 (99) 999 96 99`,
  41.067674257003375,
  69.34466988357757,
  "Tashqi mehnat migratsiyasi agentligining Toshkent viloyati filiali"
);
// Ташкентская область
infoMaRu(
  "btn_ru_22",
  `\n\nРуководитель филиала :\nБахромов Нодир Кодирбек угли\n\n☎️ +998 (99) 999 96 99`,
  41.067674257003375,
  69.34466988357757,
  "Информация о Ташкентском областьном филиале"
);
// Toshkent shahri
infoMap(
  "btn_uz_23",
  `\n\nFilial raxbari:\nTeshabayev Ulug\`bek  Yuldashevich\n\n☎️ +998 (71) 236-30-40\n☎️ +998 (71) 236-00-23\n☎️ +998 (98) 007-50-03`,
  41.30307425515684,
  69.2819443979212,
  "Tashqi mehnat migratsiyasi agentligining Toshkent shahri filiali"
);
// Город Ташкента
infoMaRu(
  "btn_ru_23",
  `\n\nРуководитель филиала :\nТешабаев Улуғбек Юлдашевич\n\n☎️ +998 (71) 236-30-40\n☎️ +998 (71) 236-00-23\n☎️ +998 (98) 007-50-03`,
  41.30307425515684,
  69.2819443979212,
  "Информация о Ташкентском городском филиале"
);
// Nukus
infoMap(
  "btn_uz_24",
  `\n\nFilial raxbari:\nAchilov Azamat Tursinbayevich\n\n☎️ +998 (61) 222-53-32\n☎️ +998 (91) 376-07-76`,
  42.44352183521285,
  59.61033841345555,
  "Tashqi mehnat migratsiyasi agentligining Nukus filiali"
);
// Нукус
infoMaRu(
  "btn_ru_24",
  `\n\nРуководитель филиала :\nАчилов Азамат Турсинбаевич\n\n☎️ +998 (61) 222-53-32\n☎️ +998 (91) 376-07-76`,
  42.44352183521285,
  59.61033841345555,
  "Информация о Нукуском филиале"
);
// Xorazm
infoMap(
  "btn_uz_25",
  `\n\nFilial raxbari:\nRamadanov Mixail Sergeyevich\n\n☎️ +998 (62) 224-12-35\n☎️ +998 (91) 376-07-76`,
  41.543709163865586,
  60.6154671327727,
  "Tashqi mehnat migratsiyasi agentligining Xorazm filiali"
);
// Харазм
infoMaRu(
  "btn_ru_25",
  `\n\nРуководитель филиала :\nРамаданов Михаил Сергеевич\n\n☎️ +998 (62) 224-12-35\n☎️ +998 (91) 376-07-76`,
  41.543709163865586,
  60.6154671327727,
  "Информация о Харезеском филиале"
);
// Farg'ona
infoMap(
  "btn_uz_26",
  `\n\nFilial raxbari:\nAtabayev Otabek Ulug\`bekovich\n\n☎️ +998 (91) 661-07-77\n☎️ +998 (73) 244-40-01`,
  40.38805014203129,
  71.77078081349228,
  "Tashqi mehnat migratsiyasi agentligining Farg'ona filiali"
);
// Фергана
infoMaRu(
  "btn_ru_26",
  `\n\nРуководитель филиала :\nАтабаев Отабек Улуғбекович\n\n☎️ +998 (91) 661-07-77\n☎️ +998 (73) 244-40-01`,
  40.38805014203129,
  71.77078081349228,
  "Информация о Ферганском филиале"
);

// ----------<<<<ortga>>>>----------
// Назад Региональные филиалы
bot.action("btn_ru_27", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Региональные филиалы", callback_data: "btn_ru_6" },
            {
              text: "Представительства за рубежом",
              callback_data: "btn_ru_7",
            },
          ],
          [
            { text: "Посольства РУз за рубежом", callback_data: "btn_ru_8" },
            {
              text: "Генеральные консульства РУз за рубежом",
              callback_data: "btn_ru_9",
            },
          ],
          [
            { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            { text: "⬅️ Назад", callback_data: "btn_ru_11" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
// Ortga hududiy filiallardan
bot.action("btn_uz_27", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Hududiy filiallar", callback_data: "btn_uz_6" },
            {
              text: "Xorijdagi vakolatxonalar",
              callback_data: "btn_uz_7",
            },
          ],
          [
            { text: "Elchixonalar", callback_data: "btn_uz_8" },
            { text: "Bosh Konsulliklar", callback_data: "btn_uz_9" },
          ],
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_ru_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_11" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
// ----------<<<<назад>>>>----------

// ТММА нинг хориждаги Ваколатхоналари
bot.action("btn_uz_7", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Vakolatxona", callback_data: "btn_uz_28" },
            { text: "Elchixona", callback_data: "btn_uz_29" },
          ],
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_ru_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_30" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
// Представительства АВТМ за рубежом
bot.action("btn_ru_7", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Представительства", callback_data: "btn_ru_28" },
            { text: "Посольства", callback_data: "btn_ru_29" },
          ],
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_ru_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_ru_30" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// ----------<<<<ortga>>>>----------
// Ortga qaytish ТММА нинг хориждаги Ваколатхоналари
bot.action("btn_uz_30", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇺🇿 O`zbekcha", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Hududiy filiallar", callback_data: "btn_uz_6" },
            {
              text: "Xorijdagi vakolatxonalar",
              callback_data: "btn_uz_7",
            },
          ],
          [
            { text: "Elchixonalar", callback_data: "btn_uz_8" },
            { text: "Bosh Konsulliklar", callback_data: "btn_uz_9" },
          ],
          [
            { text: "🏠 Bosh sahifa", callback_data: "btn_ru_3" },
            { text: "⬅️ Ortga qaytish", callback_data: "btn_uz_11" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
// Назад Представительства АВТМ за рубежом
bot.action("btn_ru_30", async (ctx) => {
  try {
    await ctx.deleteMessage();
    await bot.telegram.sendMessage(ctx.chat.id, "🇷🇺 Русский", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Региональные филиалы", callback_data: "btn_ru_6" },
            {
              text: "Представительства за рубежом",
              callback_data: "btn_ru_7",
            },
          ],
          [
            { text: "Посольства РУз за рубежом", callback_data: "btn_ru_8" },
            {
              text: "Генеральные консульства РУз за рубежом",
              callback_data: "btn_ru_9",
            },
          ],
          [
            { text: "🏠 Главная страница", callback_data: "btn_ru_3" },
            { text: "⬅️ Назад", callback_data: "btn_ru_11" },
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});
// ----------<<<<назад>>>>----------

bot.launch();
// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
