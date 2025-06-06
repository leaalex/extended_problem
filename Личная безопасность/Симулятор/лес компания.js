let messages = {

    msg_1: {
        type: "choice",
        text: "Вы не можете определить, какое расстояние до лагеря ваших друзей или до ближайшего населенного пункта. Смеркается. Что вы будете делать?",
        choices: [
            {
                text: "Пойду искать хоть кого-нибудь в лесу. Вдруг встречу",
                next_id: "msg_2",
            },
            {
                text: "Начну громко звать на помощь",
                next_id: "msg_3"
            },
            {
                text: "Немедленно остановлюсь, осмотрюсь, оценю ситуацию",
                next_id: "msg_4"
            },
        ],
        image: "les_tuman_derevia.png"
    },
    msg_2:{
        type: "text",
        text: "Вот так быстро вы сыграли в этот тренажер. Начиная хаотичное движение в поисках кого-либо, вы еще больше теряетесь в пространстве, теряете время, не подготавливаете себя к ночлегу.",
        final: true,
        success: false,
        image: "les_tuman_derevia.png"
    },
    msg_3: {
        type: "choice",
        text: "Будет здорово, если вам это поможет! Но задача тренажера - научить вас помогать себе самим. Никто не откликнулся на ваш крик. Что дальше? ",
        choices: [
            {
                text: "Пойду искать хоть кого-нибудь в лесу. Вдруг встречу",
                next_id: "msg_2",
            },
            {
                text: "Пойду добывать себе еду",
                next_id: "msg_10"
            },
            {
                text: "Я залезу на дерево",
                next_id: "msg_6"
            },
        ],
        image: "les_tuman_derevia.png"
    },
    msg_4: {
        type: "choice",
        text: "Пока вы мирились с мыслями, стемнело. Рядом с вами высокое крепкое дерево. Что будете делать?",
        choices: [
            {
                text: "Пойду добывать себе еду",
                next_id: "msg_5",
            },
            {
                text: "Начну громко звать на помощь",
                next_id: "msg_3"
            },
            {
                text: "Я залезу на дерево",
                next_id: "msg_6"
            },
        ],
        image: "les_tuman_derevia.png"
    },
    msg_5: {
        type: "choice",
        text: "Подкрепиться - это прекрасно! Но не в условии, что вы один в лесу и темнеет. Даем вам еще один шанс. Что дальше?",
        choices: [
            {
                text: "Я залезу на дерево",
                next_id: "msg_6"
            },
        ],
        image: "les_tuman_derevia.png"
    },
    msg_6: {
        type: "choice",
        text: "Что будете делать на дереве?",
        choices: [
            {
                text: "Я просто размялся. Спущусь с дерева",
                next_id: "msg_8"
            },
            {
                text: "Останусь на дереве ночевать",
                next_id: "msg_9"
            },
            {
                text: "Осмотрюсь с дерева, вдруг увижу людей или какие-то признаки лагеря моих друзей",
                next_id: "msg_7"
            }
        ],
        image: "les_tuman_derevia.png"
    },
    msg_7: {
        type: "choice",
        text: "Вариант! Но вы осмотрелись и ничего не увидели. Что будете делать дальше?",
        choices: [
            {
                text: "Я просто размялся. Спущусь с дерева",
                next_id: "msg_8"
            },
            {
                text: "Останусь на дереве ночевать",
                next_id: "msg_9"
            }
        ],
        image: "les_tuman_derevia.png"
    },
    msg_8: {
        type: "choice",
        text: "Отлично, спортсмен! Что дальше?",
        choices: [
            {
                text: "Попробую развести огонь",
                next_id: {
                    condition: ["matches"],
                    yes: "msg_15",
                    no: "msg_16"
                }
            },
            {
                text: "Сделаю настил из веток, чтоб было мягче спать",
                next_id: "msg_22"
            }
        ],
        image: "les_tuman_derevia.png"
    },
    msg_9: {
        type: "choice",
        text: "Это вариант. У тебя есть ремень. Ты будешь его как-то использовать?",
        choices: [
            {
                text: "Зафиксирую себя ремнем к стволу дерева. Это поможет мне удержаться во сне на дереве",
                next_id: "msg_23"
            },
            {
                text: "Никак не использую. Попробую отдохнуть на дереве, просто обняв его. А внизу могут быть дикие звери",
                next_id: "msg_21"
            }
        ],
        image: "les_tuman_derevia.png"
    },
    msg_10: {
        type: "choice",
        text: "Вы встретили куст с привлекательными ягодами. Скушаете или нет?",
        choices: [
            {
                text: "Съем, я очень голоден",
                next_id: "msg_11"
            },
            {
                text: "Не съем",
                next_id: "msg_14"
            }
        ],
        image: "les_tuman_derevia.png"
    },
    msg_11: {
        type: "choice",
        text: "Не стоило есть незнакомые ягоды. Вас стало подташнивать и начала кружиться голова. Вы слышите шум машин. Что будете делать?",
        choices: [
            {
                text: "Присяду отдохнуть. Меня же тошнит",
                next_id: "msg_12"
            },
            {
                text: "Пойду на шум машин",
                next_id: "msg_13"
            }
        ],
        image: "les_tuman_derevia.png"
    },
    msg_12:{
        type: "text",
        text: "Плохой вариант. Если только вы слышите хоть какие-то звуки, двигайтесь на шум. Не можете идти, ползите на шум. В случае, если вы съели смертельно-ядовитую ягоду, двигаться на шум - единственный шанс выйти на людей, которые помогут с оказанием квалифицированной медицинской помощи.",
        final: true,
        success: false,
        image: "les_tuman_derevia.png"
    },
    msg_13:{
        type: "text",
        text: "Молодец! В случае, если вы съели смертельно-ядовитую ягоду, двигаться на шум - единственный шанс выйти на людей, которые помогут с оказанием квалифицированной медицинской помощи.",
        final: true,
        success: true,
        image: "les_tuman_derevia.png"
    },
    msg_14:{
        type: "text",
        text: "Вы молодец, что не стали есть незнакомую ягоду. Но вы долго блуждали. Сил почти нет. Стало очень темно. Вы уснули на земле. Простыли. О, ужас!",
        final: true,
        success: false,
        image: "les_tuman_derevia.png"
    },
    msg_15: {
        type: "choice",
        text: "Я молодец, ведь я взял с собой зажигалку/спички! Развел огонь!",
        choices: [
            {
                text: "Греться у костра",
                next_id: "msg_17"
            }
        ],
        image: "les_tuman_derevia.png"
    },
    msg_16: {
        type: "choice",
        text: "У меня нет спичек/зажигалки. Не получилось развести огонь",
        choices: [
            {
                text: "Далее",
                next_id: "msg_18"
            }
        ],
        image: "les_tuman_derevia.png"
    },
    msg_17: {
        type: "choice",
        text: "Вы погрелись и отдохнули. Но вы потеряли драгоценное время светового дня. Темнеет. Что будете делать?",
        choices: [
            {
                text: "Я залезу на дерево",
                next_id: "msg_6"
            },
            {
                text: "Сделаю настил из веток, чтоб было мягче спать",
                next_id: "msg_22"
            },
        ],
        image: "les_tuman_derevia.png"
    },
    msg_18: {
        type: "choice",
        text: "Есть способы разведения огня и без спичек. Каким воспользуетесь вы?",
        choices: [
            {
                text: "Выкопаю в земле небольшую ямку, чтобы обеспечить приток воздуха. Возьму сухую плоскую деревяшку и просверлю в ней небольшое углубление. Найду длинную тонкую палку в качестве сверла. Заострю один из ее кончиков. Соберу немного трута. Помещу трут в выемку, прижму его деревяшкой и руками. И начну вращать сверло острым концом. Затем раздую угольки и помещу их в заготовленную растопку.",
                next_id: "msg_19"
            },
            {
                text: "Современное огниво состоит из кресала, кремня и трута. Принцип работы огнива предельно прост: при ударе о кресало кремень снимает тонкую стружку, которая в процессе разогревается и воспламеняется. Это явление сродни шлифовальному камню, который высекает искры во время заточки. Так что мне потребуется кусок обычного кремня, железная поверхность и немного сноровки. Рано или поздно сухой трут обязательно загорится. Для розжига подойдут сухая трава и растения с высохшими метелками.",
                next_id: "msg_20"
            },
        ],
        image: "les_tuman_derevia.png"
    },
    msg_19:{
        type: "text",
        text: "Эх, как так! Вы не усвоили способы разведения огня. Изучите материал заново.",
        final: true,
        success: false,
        image: "les_tuman_derevia.png"
    },
    msg_20: {
        type: "choice",
        text: "Вы большой молодец! Вы согрелись, а что дальше?",
        choices: [
            {
                text: "Я залезу на дерево",
                next_id: "msg_6"
            },
            {
                text: "Сделаю настил из веток, чтоб было мягче спать",
                next_id: "msg_22"
            },
        ],
        image: "les_tuman_derevia.png"
    },
    msg_21:{
        type: "text",
        text: "Очень опасный вариант. Если вы задремлете, то рискуете упасть с дерева и повредиться. Вы усложните себе задачу в сто раз.",
        final: true,
        success: false,
        image: "les_tuman_derevia.png"
    },
    msg_22: {
        type: "choice",
        text: "Вы смогли поспать и даже немного набраться сил. Наступило утро. Что будем делать?",
        choices: [
            {
                text: "Пойду добывать себе еду",
                next_id: "msg_25"
            },
            {
                text: "Я залезу на дерево",
                next_id: "msg_6"
            },
        ],
        image: "les_tuman_derevia.png"
    },
    msg_23: {
        type: "choice",
        text: "Вы смогли поспать и даже немного набраться сил. Наступило утро. Что будем делать?",
        choices: [
            {
                text: "Осмотрюсь с дерева, вдруг увижу людей или какие-то признаки лагеря моих друзей",
                next_id: "msg_24"
            },
            {
                text: "Пойду добывать себе еду",
                next_id: "msg_25"
            },
        ],
        image: "les_tuman_derevia.png"
    },
    msg_24:{
        type: "text",
        text: "На рассвете намного больше шансов увидеть/услышать, что лагерь ваших друзей разбит в 3 км от вас. Вы увидите лагерь и сможете пойти в его направлении",
        final: true,
        success: true,
        image: "les_tuman_derevia.png"
    },
    msg_25: {
        type: "choice",
        text: "Вы встретили куст с привлекательными, но незнакомыми ягодами. Скушаете или нет?",
        choices: [
            {
                text: "Съем, я очень голоден.",
                next_id: "msg_26"
            },
            {
                text: "Не съем. Пойду искать знакомые ягоды",
                next_id: "msg_27"
            },
        ],
        image: "les_tuman_derevia.png"
    },
    msg_26:{
        type: "text",
        text: "Не стоит есть незнакомые ягоды. Вы отравились.",
        final: true,
        success: false,
        image: "les_tuman_derevia.png"
    },
    msg_27: {
        type: "choice",
        text: "Молодец! Но если знакомых ягод не находится, как долго ты планируешь искать еду?",
        choices: [
            {
                text: "Пока не найду",
                next_id: "msg_28"
            },
            {
                text: "Не более 30 минут",
                next_id: "msg_29"
            },
        ],
        image: "les_tuman_derevia.png"
    },
    msg_28:{
        type: "text",
        text: "Плохой вариант. Нельзя тратить световой день на поиск еды. Вы потеряете драгоценное время и силы.",
        final: true,
        success: false,
        image: "les_tuman_derevia.png"
    },
    msg_29: {
        type: "choice",
        text: "Верно! Нельзя тратить световой день на поиск еды. Надо действовать! Что дальше?",
        choices: [
            {
                text: "Залезу на дерево, осмотрюсь, вдруг увижу людей или какие-то признаки лагеря моих друзей",
                next_id: "msg_24"
            },
            {
                text: "Сделаю настил из веток, чтоб было мягче лежать..Отдохну",
                next_id: "msg_30"
            },
        ],
        image: "les_tuman_derevia.png"
    },
    msg_30:{
        type: "text",
        text: "Плохой вариант. Нельзя тратить световой день на отдых. Вы потеряете драгоценное время и силы.",
        final: true,
        success: false,
        image: "les_tuman_derevia.png"
    },
};
