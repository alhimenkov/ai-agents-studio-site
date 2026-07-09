(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Enhance section labels: "04 — Workflow" → big number + label
    document.querySelectorAll('.section__label').forEach(el => {
        const text = el.textContent.trim();
        const match = text.match(/^(\d+)\s*[—–\-]\s*(.+)$/);
        if (match) {
            el.innerHTML = `<span class="section__num">${match[1]}</span><span class="section__name">${match[2]}</span>`;
        } else {
            el.classList.add('section__label--nonum');
            el.innerHTML = `<span class="section__name">${text}</span>`;
        }
    });

    // Try — idea generator (infinite pool, 5/day cap)
    const tryIdeas = {
        design: [
            {
                pattern: 'Оценщик', title: 'Ревью макета на соответствие бренду', tool: 'Claude Code', time: '15 мин',
                desc: 'Агент читает brandbook и макет, возвращает список мест, где стиль ломается.',
                howto: [
                    'Заведи папку и положи туда brandbook.pdf и экспорт макета (PDF или PNG-набор).',
                    'Скажи агенту: «прочитай brandbook, потом пройдись по макету и покажи, где нарушены цвета, шрифты и отступы — со ссылкой на страницу».',
                    'Получишь список расхождений с указанием слоя. Правишь глазами, не пересматривая всё.'
                ]
            },
            {
                pattern: 'Параллель', title: 'Пять тритментов одной концепции', tool: 'Codex', time: '20 мин',
                desc: 'Одна идея — пять визуальных направлений с разной температурой.',
                howto: [
                    'Опиши концепцию одной фразой + приложи 2–3 референса.',
                    'Скажи: «дай пять направлений: спокойное, дерзкое, тёплое, техно, ретро — по каждому мудборд-описание, палитра, тип кадра».',
                    'Получишь пять коротких мудбордов. Выбираешь два для развития дальше.'
                ]
            },
            {
                pattern: 'Цепочка', title: 'Мастер-макет в 8 форматов', tool: 'Claude Code', time: '30 мин',
                desc: 'Один master → сториз, посты, баннеры, email через workflow.',
                howto: [
                    'Положи в папку master.fig или PDF-экспорт + список нужных форматов с размерами.',
                    'Скажи: «сначала план: как раскладываешь master в 8 форматов, где рискуем срезать смысл. Ничего не делай, пока не подтвержу».',
                    'После твоего ОК — генерит по одному формату за шаг с проверкой. На выходе — папка с ассетами.'
                ]
            },
            {
                pattern: 'Роутер', title: 'Обтравки — быстрой модели, арт-дирекшн — сильной', tool: 'Claude Code', time: '15 мин',
                desc: 'Простое отдаёшь дешёвой модели, сложное — топовой.',
                howto: [
                    'В CLAUDE.md пропиши: «обтравки, повторяющиеся баннеры — Haiku; арт-дирекшн, ключевые кадры — Opus».',
                    'Скажи: «на эту задачу примени правило из CLAUDE.md, покажи, какую модель выбрал и почему».',
                    'Экономия токенов процентов на 60 на потоке, сильные вложения — только в важное.'
                ]
            },
            {
                pattern: 'Оркестратор', title: 'Наборы Figma-компонентов из одной фразы', tool: 'Cursor', time: '25 мин',
                desc: 'Агент собирает типовые обложки, посты, email-templates.',
                howto: [
                    'Открой Cursor в папке с Figma-плагином и подключи бренд-токены.',
                    'Скажи: «собери набор из 12 обложек для VK/YouTube по этому бренд-токену — три цветовых схемы × четыре типа заголовка».',
                    'На выходе — компоненты с вариантами. Правишь в Figma как обычно.'
                ]
            },
            {
                pattern: 'Оценщик', title: 'Проверка визуальной иерархии', tool: 'Claude Code', time: '15 мин',
                desc: 'Агент говорит, где потерян focal point и что мешает считыванию.',
                howto: [
                    'Положи скриншот макета в папку.',
                    'Скажи: «посмотри как первый зритель — что цепляет за 3 секунды, что тонет, что конкурирует с главным».',
                    'Получишь короткий разбор: что усилить, что убрать. Двух правок обычно хватает.'
                ]
            },
            {
                pattern: 'Цепочка', title: 'Айдентика в 5 форматов', tool: 'Claude Code', time: '45 мин',
                desc: 'Логотип → бейдж → фавикон → печать → анимация с проверкой на каждой ступени.',
                howto: [
                    'Положи финальный SVG-логотип и короткий бренд-бриф.',
                    'Скажи: «раскатай в 5 форматов по шагам. После каждого — покажи и жди ОК».',
                    'В конце — папка с 5 экспортами и превью-страницей. Одно ревью вместо пяти.'
                ]
            },
            {
                pattern: 'Параллель', title: 'Пять палитр под настроение', tool: 'Codex', time: '20 мин',
                desc: 'Один настрой — пять цветовых сетов с AA-проверкой контрастов.',
                howto: [
                    'Опиши настроение одной фразой и приложи 2 фотореференса.',
                    'Скажи: «дай пять палитр по 5 цветов: spring, luxury, tech, warm, edgy. Для каждой — проверь контраст AA для основных пар».',
                    'Получишь пять палитр с HEX и оценкой доступности. Готово к применению.'
                ]
            }
        ],
        '3d': [
            {
                pattern: 'Параллель', title: 'Ресёрч референсов', tool: 'Cursor', time: '15 мин',
                desc: 'Агент собирает 20 моделей и рефов, группирует по стилю.',
                howto: [
                    'Дай агенту тему и требования: «низкополигональный intro-shot для приложения».',
                    'Скажи: «сходи в интернет, собери 20 рефов, дай ссылки на первоисточники и сгруппируй по стилю».',
                    'На выходе — moodboard-документ со ссылками. Тратишь 5 минут на выбор направления.'
                ]
            },
            {
                pattern: 'Оркестратор', title: 'Разложить сложную сцену на слоты', tool: 'Claude Code', time: '30 мин',
                desc: 'Финальный кадр раскладывается на управляемые части: фон, персонаж, продукт, свет.',
                howto: [
                    'Опиши финальный кадр одной фразой + приложи скетч.',
                    'Скажи: «раздели сцену на 4–5 слотов, для каждого — свой prompt и параметры. Каждый правится независимо».',
                    'Получишь набор slot-brief\'ов. Один слой сломался — правишь его, не всю сцену.'
                ]
            },
            {
                pattern: 'Цепочка', title: 'Бриф → детальный prompt-скрипт', tool: 'Codex', time: '20 мин',
                desc: 'Простой бриф превращается в подробный prompt с параметрами и негативами.',
                howto: [
                    'Положи короткий бриф в папку.',
                    'Скажи: «преврати бриф в prompt-скрипт: описание, стиль, ракурс, свет, материалы, негативные теги».',
                    'Получишь готовый prompt под 3D-движок. Копируешь и запускаешь.'
                ]
            },
            {
                pattern: 'Оценщик', title: 'Проверка топологии', tool: 'Claude Code', time: '20 мин',
                desc: 'Агент читает mesh и говорит, где будут проблемы с деформацией.',
                howto: [
                    'Экспортируй mesh в OBJ и положи в папку.',
                    'Скажи: «прочитай геометрию, покажи проблемные зоны для риггинга: n-gons, тонкие треугольники, разъезжающиеся UV».',
                    'Получишь список зон с координатами. Идёшь править точечно.'
                ]
            },
            {
                pattern: 'Цепочка', title: 'Персонаж под три формата', tool: 'Claude Code', time: '45 мин',
                desc: 'Model → rig → три позы → рендер → упаковка. Один пайплайн.',
                howto: [
                    'Положи готовую модель + список поз и форматов вывода.',
                    'Скажи: «пройди по шагам: rig → позы → рендер → упаковка. После каждого — покажи результат и жди ОК».',
                    'На выходе — папки под приложение, соцсети и печать. Один заказ вместо трёх.'
                ]
            },
            {
                pattern: 'Роутер', title: 'Ассет по сложности — разной модели', tool: 'Codex', time: '15 мин',
                desc: 'Мелкие декоры — быстрой модели, ключевые формы — сильной.',
                howto: [
                    'В CLAUDE.md пропиши правило: «декоры и повторяющиеся элементы — быстрая модель; hero-объекты — сильная».',
                    'Скажи: «примени правило к списку ассетов, покажи распределение и оценку токенов».',
                    'Получишь очередь с пометкой модели. Тратишь бюджет туда, где видно.'
                ]
            },
            {
                pattern: 'Параллель', title: 'Пять материалов на одну форму', tool: 'Codex', time: '20 мин',
                desc: 'Одна форма — пять шейдеров: glass, metal, velvet, paper, ceramic.',
                howto: [
                    'Положи форму в OBJ + описание сцены (свет, фон).',
                    'Скажи: «сгенери 5 вариантов материалов параллельно, покажи блики и ощущение на одном референс-кадре».',
                    'Получишь пять превью. Выбираешь одно направление и допиливаешь.'
                ]
            },
            {
                pattern: 'Оркестратор', title: 'Шот на слои для After Effects', tool: 'Claude Code', time: '30 мин',
                desc: 'Агент готовит слои сцены: маски, глубина, свет, отражения — отдельно.',
                howto: [
                    'Опиши финальный шот и список нужных пассов.',
                    'Скажи: «раскладывай на слои по одному, после каждого показывай preview и жди ОК».',
                    'На выходе — папка с EXR/PNG-пассами, готовыми к сборке в AE.'
                ]
            }
        ],
        ux: [
            {
                pattern: 'Оценщик', title: 'Ревью на tone of voice', tool: 'Claude Code', time: '15 мин',
                desc: 'Агент читает тексты интерфейса и сверяет с редполитикой.',
                howto: [
                    'Положи в папку редполитику + экспорт всех текстов экрана (можно скриншотами).',
                    'Скажи: «проверь на канцелярит, AI-следы и расхождения с редполитикой. Покажи, что менять и на что».',
                    'Получишь список «было → стало» с обоснованием. Правишь адресно.'
                ]
            },
            {
                pattern: 'Цепочка', title: 'Фича → все состояния', tool: 'Claude Code', time: '30 мин',
                desc: 'Бриф на фичу разворачивается во все текстовые состояния экрана.',
                howto: [
                    'Положи бриф на фичу + скетч экрана.',
                    'Скажи: «выпиши все состояния: empty, loading, error, success, edge-cases. Для каждого — заголовок, подпись, кнопка».',
                    'Получишь готовый набор текстов под все состояния. Ничего не забыто.'
                ]
            },
            {
                pattern: 'Параллель', title: 'Десять микротекстов CTA', tool: 'Cursor', time: '10 мин',
                desc: 'Одна кнопка — десять формулировок с пометкой рисков.',
                howto: [
                    'Опиши контекст экрана в двух строках.',
                    'Скажи: «дай 10 вариантов CTA: короткие/длинные, действие/выгода. Отсортируй по риску».',
                    'Получишь готовый список. Выбираешь два для A/B.'
                ]
            },
            {
                pattern: 'Оркестратор', title: 'Флоу по экранам — карта текстов', tool: 'Claude Code', time: '30 мин',
                desc: 'Пользовательский путь раскладывается в карту всех текстов.',
                howto: [
                    'Приложи схему пути (Miro/Figma-экспорт) или опиши шаги словами.',
                    'Скажи: «сделай таблицу: экран, заголовок, подпись, ошибки, тосты, пуш. Для каждого экрана — своя строка».',
                    'На выходе — таблица, готовая к раздаче копирайтерам.'
                ]
            },
            {
                pattern: 'Роутер', title: 'Правки простые и стилистические', tool: 'Claude Code', time: '15 мин',
                desc: 'Агент сортирует поток задач по модели.',
                howto: [
                    'В CLAUDE.md пропиши: «типовые исправления → быстрая модель, стилистика → сильная».',
                    'Скажи: «примени правило к моему бэклогу правок».',
                    'Получишь очередь с меткой модели. Дешёвое — быстро, важное — качественно.'
                ]
            },
            {
                pattern: 'Оценщик', title: 'Проверка на инклюзивность', tool: 'Claude Code', time: '20 мин',
                desc: 'Агент ищет гендерные, возрастные, культурные предположения.',
                howto: [
                    'Положи экспорт всех текстов интерфейса.',
                    'Скажи: «найди места с гендерными/возрастными предположениями, предложи нейтральные варианты».',
                    'Получишь список замен с обоснованием. Одобряешь → правишь.'
                ]
            },
            {
                pattern: 'Цепочка', title: 'Error-тексты в единый паттерн', tool: 'Claude Code', time: '30 мин',
                desc: 'Разрозненные ошибки приводятся к единому tone-and-structure.',
                howto: [
                    'Собери все error-тексты в один файл (можно из репо или экспорта).',
                    'Скажи: «выведи общий паттерн, потом переписи каждую ошибку по нему. Покажи «было → стало»».',
                    'На выходе — обновлённый файл + гайд по написанию новых.'
                ]
            },
            {
                pattern: 'Параллель', title: 'Три версии onboarding', tool: 'Codex', time: '25 мин',
                desc: 'Короткая, развёрнутая, игровая — три голоса одного онбординга.',
                howto: [
                    'Опиши цель онбординга + шаги.',
                    'Скажи: «дай три версии: 3 экрана, 5 экранов, 5 экранов с игрой. Для каждой — оценка прочтения».',
                    'Сравниваешь и выбираешь. Собираешь в прототип.'
                ]
            }
        ],
        editor: [
            {
                pattern: 'Оценщик', title: 'Второй редактор', tool: 'Claude Code', time: '20 мин',
                desc: 'Финальная вычитка: логика, канцелярит, юр-риски, повторы.',
                howto: [
                    'Положи текст и правила ToV одним файлом.',
                    'Скажи: «пройдись как редактор: логика, канцелярит, юридические риски, повторы. Верни diff с объяснением каждой правки».',
                    'Получишь diff с комментариями. Принимаешь по одному правому кликом.'
                ]
            },
            {
                pattern: 'Цепочка', title: 'Адаптация под форматы', tool: 'Codex', time: '30 мин',
                desc: 'Длинный текст → пост → сториз → email → пуш.',
                howto: [
                    'Положи исходный текст и список каналов.',
                    'Скажи: «пройди по каналам: для каждого — версия с учётом лимита и стиля. Сохрани ключевую мысль».',
                    'На выходе — папка с версиями по файлам. Один текст, пять каналов.'
                ]
            },
            {
                pattern: 'Роутер', title: 'Классификация правок', tool: 'Claude Code', time: '15 мин',
                desc: 'Простые правки — быстрой модели, стилистика — сильной.',
                howto: [
                    'В CLAUDE.md пропиши правило распределения.',
                    'Скажи: «классифицируй бэклог правок, покажи распределение по моделям».',
                    'Получишь очередь. Экономишь бюджет и время.'
                ]
            },
            {
                pattern: 'Параллель', title: 'Пять заголовков на одну новость', tool: 'Codex', time: '15 мин',
                desc: 'Разный угол, эмоция, длина — на один факт.',
                howto: [
                    'Опиши суть новости в двух строках.',
                    'Скажи: «дай 5 заголовков: сдержанный, эмоциональный, вопросительный, цифровой, провокационный. Отсортируй по риску».',
                    'Выбираешь один основной + один для соцсетей.'
                ]
            },
            {
                pattern: 'Оркестратор', title: 'Календарь публикаций', tool: 'Claude Code', time: '30 мин',
                desc: 'Из брифа кампании — карта постов по каналам и датам.',
                howto: [
                    'Положи бриф кампании + список каналов.',
                    'Скажи: «собери контент-план на 4 недели: день, канал, формат, тема, гипотеза о тоне».',
                    'Получишь таблицу, готовую к согласованию.'
                ]
            },
            {
                pattern: 'Цепочка', title: 'Пресс-релиз → пост → сториз', tool: 'Codex', time: '25 мин',
                desc: 'Ключевое сообщение адаптируется от длинной формы к визуальной.',
                howto: [
                    'Положи пресс-релиз в папку.',
                    'Скажи: «пройди по шагам: тезисы → пост → 5 сториз. После каждого — покажи и жди ОК».',
                    'На выходе — согласованный пакет под три канала.'
                ]
            },
            {
                pattern: 'Оценщик', title: 'Факт-чек по источнику', tool: 'Claude Code', time: '20 мин',
                desc: 'Агент сверяет цифры и утверждения с указанным источником.',
                howto: [
                    'Положи текст + PDF/страницу источника.',
                    'Скажи: «пройдись по цифрам и утверждениям, сверь с источником, помечь несоответствия».',
                    'Получишь список расхождений со ссылкой на страницу. Правишь адресно.'
                ]
            },
            {
                pattern: 'Роутер', title: 'Куда идти с правкой', tool: 'Claude Code', time: '10 мин',
                desc: 'Агент сортирует правку в дизайн/копирайт/юристы.',
                howto: [
                    'Опиши правку двумя строками.',
                    'Скажи: «определи, к кому это идёт: дизайн, копирайт, юрист. Собери короткий бриф для этого адресата».',
                    'Получаешь бриф под нужного человека. Отправляешь.'
                ]
            }
        ],
        copy: [
            {
                pattern: 'Параллель', title: '20 направлений одной идеи', tool: 'Codex', time: '30 мин',
                desc: 'Одна идея — двадцать углов, из которых остаётся 5.',
                howto: [
                    'Опиши концепцию одной фразой + аудиторию.',
                    'Скажи: «дай 20 разных углов, потом сам покритикуй и оставь 5 сильнейших с обоснованием».',
                    'Получаешь короткий список 5 идей. Одну берёшь в развитие.'
                ]
            },
            {
                pattern: 'Оркестратор', title: 'Драматургия сценария', tool: 'Claude Code', time: '45 мин',
                desc: 'Агент раскладывает сюжет на setup / conflict / resolution.',
                howto: [
                    'Опиши идею и жанр.',
                    'Скажи: «раскладывай по классической структуре, для каждого блока — три варианта. Ничего не пишешь целиком».',
                    'Получаешь скелет с вариантами. Собираешь свою комбинацию.'
                ]
            },
            {
                pattern: 'Цепочка', title: 'Zero Draft за час', tool: 'Claude Code', time: '60 мин',
                desc: 'Бриф → рефы → skeleton → три черновика.',
                howto: [
                    'Положи бриф + 2–3 референса в папку.',
                    'Скажи: «пройди по шагам: разбор рефов → skeleton → 3 черновика. После каждого шага — жди ОК».',
                    'На выходе — три черновика. Выбираешь один, дорабатываешь руками.'
                ]
            },
            {
                pattern: 'Роутер', title: 'Слоганы — быстрой, стратегия — сильной', tool: 'Codex', time: '15 мин',
                desc: 'Массовая генерация — экономно, стратегические ставки — топовой.',
                howto: [
                    'В CLAUDE.md пропиши: «массовая генерация — Haiku, стратегические формулировки — Opus».',
                    'Скажи: «сначала 50 слоганов быстро, потом сузь до 5 и переработай их сильной моделью».',
                    'Получаешь 5 сильных вариантов вместо серой массы.'
                ]
            },
            {
                pattern: 'Оценщик', title: 'Второе мнение по концепции', tool: 'Claude Code', time: '20 мин',
                desc: 'Агент играет скептического арт-директора.',
                howto: [
                    'Положи презентацию концепции.',
                    'Скажи: «сыграй арт-директора, который завтра защищает это перед клиентом. Найди слабые места и задай неудобные вопросы».',
                    'Получаешь 5–7 вопросов, к которым готовишь ответы до защиты.'
                ]
            },
            {
                pattern: 'Параллель', title: 'Три ToV одной идеи', tool: 'Codex', time: '15 мин',
                desc: 'Одна концепция звучит по-разному: sober, edgy, warm.',
                howto: [
                    'Опиши концепцию и целевую аудиторию.',
                    'Скажи: «озвучь идею тремя голосами: сдержанный, дерзкий, тёплый. Для каждого — по 3 примера реплик».',
                    'Сравниваешь и выбираешь голос под бренд.'
                ]
            },
            {
                pattern: 'Цепочка', title: 'Storyboard за час', tool: 'Claude Code', time: '60 мин',
                desc: 'Логлайн → beat-sheet → сцены → диалоги.',
                howto: [
                    'Опиши идею одной фразой + жанр и длительность.',
                    'Скажи: «пройди по шагам: логлайн → beat-sheet → сцены → диалоги. После каждого — жди ОК».',
                    'На выходе — раскадровка, готовая к художнику или скетчеру.'
                ]
            },
            {
                pattern: 'Оркестратор', title: 'Кампания по слотам', tool: 'Claude Code', time: '45 мин',
                desc: 'KV + видео + сериал — большая идея на компоненты.',
                howto: [
                    'Опиши идею и список форматов кампании.',
                    'Скажи: «раздели идею на компоненты, для каждого — короткий бриф и 2 варианта».',
                    'Получаешь сет коротких брифов для команды. Дальше собирается параллельно.'
                ]
            }
        ],
        producer: [
            {
                pattern: 'Цепочка', title: 'Разбор входящего брифа', tool: 'Claude Code', time: '15 мин',
                desc: 'Агент вытаскивает риски, дыры и недостающие поля.',
                howto: [
                    'Заведи папку razbor-brifov/ с CLAUDE.md на 5 строк: «правило — не выдумывать, не хватает — пиши уточнить».',
                    'Положи входящий бриф. Скажи: «разбери по 4 шагам: приёмка, противоречия, флаги, сводка на одну страницу».',
                    'Возвращаешь клиенту сводку с конкретными вопросами вместо «пришлите ещё раз».'
                ]
            },
            {
                pattern: 'Оркестратор', title: 'План проекта из брифа', tool: 'Codex', time: '30 мин',
                desc: 'Бриф раскладывается на задачи по 6 направлениям студии.',
                howto: [
                    'Положи бриф + список направлений и загрузку каждого.',
                    'Скажи: «разложи бриф на задачи по направлениям, оцени срок и загрузку, отметь риски».',
                    'На выходе — план проекта с распределением по людям.'
                ]
            },
            {
                pattern: 'Оценщик', title: 'Мониторинг очереди Трекера', tool: 'Cursor', time: '10 мин',
                desc: 'Агент читает Трекер и рапортует о рисках дедлайнов.',
                howto: [
                    'Подключи MCP-сервер Трекера один раз (агент проведёт).',
                    'Скажи: «прочитай очередь FINTECHPICS, покажи задачи с риском дедлайна и что решать сегодня».',
                    'Получаешь короткую сводку. Три пункта — три решения.'
                ]
            },
            {
                pattern: 'Параллель', title: 'Три способа спасти дедлайн', tool: 'Claude Code', time: '20 мин',
                desc: 'Три сценария распределения работы под сжатые сроки.',
                howto: [
                    'Опиши ситуацию: что готово, что нет, сколько дней, ресурсы.',
                    'Скажи: «дай три сценария спасения: минимальный, разумный, максимальный. Для каждого — риски и стоимость».',
                    'Выбираешь сценарий, идёшь к клиенту с обоснованием.'
                ]
            },
            {
                pattern: 'Роутер', title: 'Задачи по уровню исполнителя', tool: 'Claude Code', time: '15 мин',
                desc: 'Простые — джуну, сложные — сеньору, стратегические — лиду.',
                howto: [
                    'Положи бэклог и уровни команды в один файл.',
                    'Скажи: «разложи задачи по уровням, обоснуй каждое распределение».',
                    'Получаешь очередь с адресатами. Раздаёшь одним движением.'
                ]
            },
            {
                pattern: 'Оценщик', title: 'Ретро по проекту', tool: 'Claude Code', time: '25 мин',
                desc: 'Агент читает материалы и предлагает 5 наблюдений.',
                howto: [
                    'Положи ключевые артефакты проекта (брифы, переписки, финальные версии) в папку.',
                    'Скажи: «прочитай, предложи 5 наблюдений для ретро: что сработало, что нет, что менять».',
                    'На выходе — стартовая точка для команды. Обсуждаете живьём.'
                ]
            },
            {
                pattern: 'Цепочка', title: 'Онбординг подрядчика', tool: 'Codex', time: '20 мин',
                desc: 'Бриф + FAQ + примеры + чек-лист приёмки в один документ.',
                howto: [
                    'Собери сырьё: примеры прошлых работ, ToV, чек-лист приёмки.',
                    'Скажи: «собери онбординг-документ: контекст, правила, примеры, что мы точно не примем».',
                    'Отправляешь один PDF. Меньше вопросов от подрядчика.'
                ]
            },
            {
                pattern: 'Оркестратор', title: 'Спринт по 6 направлениям', tool: 'Claude Code', time: '20 мин',
                desc: 'Агент собирает единый статус из тредов направлений.',
                howto: [
                    'Дай агенту доступ к каналам направлений (MCP или экспорт).',
                    'Скажи: «прочитай, собери сводку по каждому направлению: где узкое место, где помощь, где готово».',
                    'Получаешь одну страницу к синку. Идёшь на встречу с готовой картой.'
                ]
            }
        ]
    };

    const STORAGE_KEY = 'ai_studio_ideas_v1';
    const DAILY_LIMIT = 5;

    const todayKey = () => {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    };

    const loadState = () => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return { date: todayKey(), count: 0 };
            const state = JSON.parse(raw);
            if (state.date !== todayKey()) return { date: todayKey(), count: 0 };
            return state;
        } catch { return { date: todayKey(), count: 0 }; }
    };

    const saveState = (state) => {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
    };

    let dailyState = loadState();
    let currentRole = 'design';
    const shownByRole = new Map();

    const pickIdea = (role) => {
        const pool = tryIdeas[role] || [];
        if (!pool.length) return null;
        let shown = shownByRole.get(role);
        if (!shown) { shown = new Set(); shownByRole.set(role, shown); }
        if (shown.size >= pool.length) shown.clear();
        const available = [];
        for (let i = 0; i < pool.length; i++) if (!shown.has(i)) available.push(i);
        const idx = available[Math.floor(Math.random() * available.length)];
        shown.add(idx);
        return pool[idx];
    };

    const escapeHtml = (s) => String(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[ch]));

    const renderEmpty = () => {
        const container = document.getElementById('try-cards');
        if (!container) return;
        container.innerHTML = '<div class="try__empty">Нажми кнопку — покажу идею с пошаговой инструкцией: что сказать агенту и что получишь на выходе.</div>';
    };

    const renderLimitNote = () => {
        const container = document.getElementById('try-cards');
        if (!container) return;
        if (container.querySelector('.try__limit-note')) return;
        const note = document.createElement('div');
        note.className = 'try__limit-note';
        note.innerHTML = '<b>Хватит на сегодня.</b> Счётчик сбросится завтра. Возьми одну идею в работу — этого достаточно, чтобы протестировать паттерн на реальной задаче.';
        container.appendChild(note);
    };

    const renderCard = (idea) => {
        const container = document.getElementById('try-cards');
        if (!container) return;
        const empty = container.querySelector('.try__empty');
        if (empty) empty.remove();
        const el = document.createElement('div');
        el.className = 'try__card';
        const howtoHtml = Array.isArray(idea.howto) && idea.howto.length
            ? `
                <div class="try__howto">
                    <div class="try__howto-label">Как сделать</div>
                    <ol class="try__howto-list">
                        ${idea.howto.map(step => `<li>${escapeHtml(step)}</li>`).join('')}
                    </ol>
                </div>
            `
            : '';
        el.innerHTML = `
            <span class="try__pattern">${escapeHtml(idea.pattern)}</span>
            <h3 class="try__title">${escapeHtml(idea.title)}</h3>
            <p class="try__desc">${escapeHtml(idea.desc)}</p>
            ${howtoHtml}
            <div class="try__meta">
                <span><b>${escapeHtml(idea.tool)}</b></span>
                <span>≈ ${escapeHtml(idea.time)}</span>
            </div>
        `;
        container.prepend(el);
    };

    const updateCounter = () => {
        const num = document.getElementById('try-counter-num');
        const counter = document.getElementById('try-counter');
        const btn = document.getElementById('try-generate');
        if (num) num.textContent = dailyState.count;
        if (counter) counter.classList.toggle('is-full', dailyState.count >= DAILY_LIMIT);
        if (btn) {
            const done = dailyState.count >= DAILY_LIMIT;
            btn.disabled = done;
            const label = btn.querySelector('.try__generate-label');
            if (label) label.textContent = done ? 'Возвращайся завтра' : 'Сгенерировать идею';
        }
    };

    const generateHandler = () => {
        dailyState = loadState();
        if (dailyState.count >= DAILY_LIMIT) { updateCounter(); return; }
        const idea = pickIdea(currentRole);
        if (!idea) return;
        renderCard(idea);
        dailyState.count += 1;
        saveState(dailyState);
        updateCounter();
        if (dailyState.count >= DAILY_LIMIT) renderLimitNote();
    };

    const tryChips = document.querySelectorAll('.try__chip');
    const generateBtn = document.getElementById('try-generate');
    if (tryChips.length && generateBtn) {
        renderEmpty();
        updateCounter();
        tryChips.forEach(chip => {
            chip.addEventListener('click', () => {
                if (chip.dataset.role === currentRole) return;
                tryChips.forEach(c => {
                    c.classList.remove('is-active');
                    c.setAttribute('aria-selected', 'false');
                });
                chip.classList.add('is-active');
                chip.setAttribute('aria-selected', 'true');
                currentRole = chip.dataset.role;
                renderEmpty();
                if (dailyState.count >= DAILY_LIMIT) renderLimitNote();
            });
        });
        generateBtn.addEventListener('click', generateHandler);
    }

    // Mobile nav toggle
    const toggle = document.querySelector('.nav__toggle');
    const links = document.querySelector('.nav__links');
    if (toggle && links) {
        const closeNav = () => {
            links.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Открыть меню');
        };
        toggle.addEventListener('click', () => {
            const open = links.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
        });
        links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeNav();
        });
    }

    // Scroll reveal
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    } else {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    }

    // Active nav section highlight
    const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
    if (navLinks.length && 'IntersectionObserver' in window) {
        const linkById = new Map();
        navLinks.forEach(a => {
            const id = a.getAttribute('href').slice(1);
            if (id) linkById.set(id, a);
        });

        const sectionsToWatch = Array.from(linkById.keys())
            .map(id => document.getElementById(id))
            .filter(Boolean);

        const setActive = (id) => {
            navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));
        };

        const navObserver = new IntersectionObserver((entries) => {
            const visible = entries
                .filter(e => e.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
            if (visible.length) setActive(visible[0].target.id);
        }, { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });

        sectionsToWatch.forEach(s => navObserver.observe(s));
    }
})();
