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
            { pattern: 'Оценщик', title: 'Ревью макета «в стиле бренда»', desc: 'Даёшь агенту макет и brandbook — он проверяет консистентность и возвращает список расхождений с координатами слоёв.', tool: 'Claude Code', time: '15 мин' },
            { pattern: 'Параллель', title: 'Пять тритментов одной идеи', desc: 'Одна концепция — параллельно пять текстово-визуальных направлений с разной эмоциональной температурой и типом кадра.', tool: 'Codex', time: '20 мин' },
            { pattern: 'Цепочка', title: 'Мастер-макет в 8 форматов', desc: 'Один master → сториз, посты, баннеры, email — через workflow с точкой контроля перед экспортом.', tool: 'Claude Code', time: '30 мин' },
            { pattern: 'Роутер', title: 'Обтравки — быстрой, арт-дирекшн — сильной', desc: 'Агент маршрутизирует рутинную работу на дешёвую модель, а сложные визуальные решения — на сильную.', tool: 'Claude Code', time: '15 мин' },
            { pattern: 'Оркестратор', title: 'Пресеты Figma в сеты', desc: 'Агент собирает сложные наборы из компонентов по одному запросу — типовые обложки, посты, email-templates.', tool: 'Cursor', time: '25 мин' },
            { pattern: 'Оценщик', title: 'Проверка визуальной иерархии', desc: 'Агент разбирает макет и говорит, где потерян главный focal point и что мешает считыванию за 3 секунды.', tool: 'Claude Code', time: '15 мин' },
            { pattern: 'Цепочка', title: 'Айдентика в 5 форматов', desc: 'Логотип → бейдж → фавикон → печать → анимация — единый workflow с проверкой на каждой ступени.', tool: 'Claude Code', time: '45 мин' },
            { pattern: 'Параллель', title: 'Пять палитр под концепцию', desc: 'Один настрой — пять цветовых сетов: spring, luxury, tech, warm, edgy. С контрастами и AA-проверкой.', tool: 'Codex', time: '20 мин' }
        ],
        '3d': [
            { pattern: 'Параллель', title: 'Ресёрч референсов', desc: 'Агент собирает 20 моделей и рефов по теме, группирует по стилю, материалам и настроению.', tool: 'Cursor', time: '15 мин' },
            { pattern: 'Оркестратор', title: 'Разложить сложную сцену', desc: 'Финальный кадр раскладывается на управляемые slots — фон, персонаж, продукт, свет — каждый правится отдельно.', tool: 'Claude Code', time: '30 мин' },
            { pattern: 'Цепочка', title: 'Бриф → детальный prompt', desc: 'Простой бриф превращается в подробный prompt-скрипт с параметрами, референсами и негативами.', tool: 'Codex', time: '20 мин' },
            { pattern: 'Оценщик', title: 'Проверка топологии', desc: 'Агент читает mesh и говорит, где будут проблемы с деформацией, свет или UV-развёрткой.', tool: 'Claude Code', time: '20 мин' },
            { pattern: 'Цепочка', title: 'Персонаж под три формата', desc: 'Model → rig → три позы → рендер → упаковка. Одна модель едет в приложение, соцсети и печать.', tool: 'Claude Code', time: '45 мин' },
            { pattern: 'Роутер', title: 'Ассет по сложности', desc: 'Мелкие декоры — быстрая модель, ключевые формы — сильная. Экономит время и качество на важном.', tool: 'Codex', time: '15 мин' },
            { pattern: 'Параллель', title: 'Пять материалов на форму', desc: 'Одна форма — пять шейдеров: glass, metal, velvet, paper, ceramic. С блик-тестами.', tool: 'Codex', time: '20 мин' },
            { pattern: 'Оркестратор', title: 'Шот на слои для AE', desc: 'Агент готовит все слои сцены для комбинации в After Effects: маски, глубина, свет, отражения — отдельно.', tool: 'Claude Code', time: '30 мин' }
        ],
        ux: [
            { pattern: 'Оценщик', title: 'Ревью на ToV', desc: 'Агент читает тексты интерфейса, сверяет с редполитикой, находит канцелярит и AI-следы, показывает где именно.', tool: 'Claude Code', time: '15 мин' },
            { pattern: 'Цепочка', title: 'Фича → все состояния', desc: 'Бриф на фичу разворачивается в иерархию и все текстовые состояния: empty, loading, error, success, edge-cases.', tool: 'Claude Code', time: '30 мин' },
            { pattern: 'Параллель', title: 'Десять вариантов кнопки', desc: 'Одна CTA — десять микротекстов, отсортированных по краткости и тону, с пометкой рисков и семантики.', tool: 'Cursor', time: '10 мин' },
            { pattern: 'Оркестратор', title: 'Флоу по экранам', desc: 'Агент раскладывает пользовательский путь на карту всех текстов: заголовки, подписи, ошибки, тосты.', tool: 'Claude Code', time: '30 мин' },
            { pattern: 'Роутер', title: 'Правки простые и стилистические', desc: 'Агент сортирует поток задач: типовые формулировки — быстрой моделью, стилистические — сильной.', tool: 'Claude Code', time: '15 мин' },
            { pattern: 'Оценщик', title: 'Проверка на инклюзивность', desc: 'Агент ищет гендерные, возрастные и культурные предположения в тексте. Помечает, предлагает нейтральные.', tool: 'Claude Code', time: '20 мин' },
            { pattern: 'Цепочка', title: 'Ошибки в единый паттерн', desc: 'Разрозненные error-тексты приводятся к единому tone-and-structure. На выходе — гид с примерами.', tool: 'Claude Code', time: '30 мин' },
            { pattern: 'Параллель', title: 'Три версии onboarding', desc: 'Короткая, развёрнутая, игровая — три голоса одного онбординга. С метриками ожидаемого прочтения.', tool: 'Codex', time: '25 мин' }
        ],
        editor: [
            { pattern: 'Оценщик', title: 'Второй редактор', desc: 'Финальная вычитка: логические дыры, канцелярит, юр-риски, повторы. Возвращает diff и объяснение каждой правки.', tool: 'Claude Code', time: '20 мин' },
            { pattern: 'Цепочка', title: 'Адаптация под форматы', desc: 'Длинный текст → пост → сториз → email → пуш. Один workflow, суть и голос сохранены.', tool: 'Codex', time: '30 мин' },
            { pattern: 'Роутер', title: 'Классификация правок', desc: 'Простые фактические правки — быстрой моделью, стилистические — сильной. Экономит время и токены.', tool: 'Claude Code', time: '15 мин' },
            { pattern: 'Параллель', title: 'Пять заголовков на одну новость', desc: 'Разный угол, эмоция, длина — на один и тот же ключевой факт. Отсортированы по риску и вниманию.', tool: 'Codex', time: '15 мин' },
            { pattern: 'Оркестратор', title: 'Календарь публикаций', desc: 'Из брифа кампании — карта постов по каналам и датам, с гипотезами по тону и приоритету.', tool: 'Claude Code', time: '30 мин' },
            { pattern: 'Цепочка', title: 'Пресс-релиз → пост → сториз', desc: 'Ключевое сообщение проходит все этапы адаптации: длинная форма → короткая → визуальная.', tool: 'Codex', time: '25 мин' },
            { pattern: 'Оценщик', title: 'Факт-чек по источнику', desc: 'Агент сверяет цифры и утверждения текста с указанным источником. Помечает несоответствия.', tool: 'Claude Code', time: '20 мин' },
            { pattern: 'Роутер', title: 'Куда идти с правкой', desc: 'Агент решает: это дизайнеру, копирайтеру или юристам. Формирует короткий бриф с сутью проблемы.', tool: 'Claude Code', time: '10 мин' }
        ],
        copy: [
            { pattern: 'Параллель', title: '20 рабочих направлений', desc: 'Одна идея — двадцать разных углов. Агент сам себя критикует и оставляет пять, к которым стоит вернуться.', tool: 'Codex', time: '30 мин' },
            { pattern: 'Оркестратор', title: 'Драматургия сценария', desc: 'Агент раскладывает сюжет на структуру (setup / conflict / resolution) и предлагает варианты каждого блока.', tool: 'Claude Code', time: '45 мин' },
            { pattern: 'Цепочка', title: 'Zero Draft за час', desc: 'Бриф → референсы → skeleton → черновики → три отобранных. Полный проход от постановки до готового драфта.', tool: 'Claude Code', time: '60 мин' },
            { pattern: 'Роутер', title: 'Слоганы — быстрой, стратегия — сильной', desc: 'Массовая генерация коротких формулировок — экономной моделью. Стратегические ставки — топовой.', tool: 'Codex', time: '15 мин' },
            { pattern: 'Оценщик', title: 'Второе мнение по концепции', desc: 'Агент играет скептического арт-директора: находит слабые места, задаёт неудобные вопросы.', tool: 'Claude Code', time: '20 мин' },
            { pattern: 'Параллель', title: 'Три ToV одной идеи', desc: 'Одна концепция звучит по-разному: sober, edgy, warm. С парой примеров реплик для каждого голоса.', tool: 'Codex', time: '15 мин' },
            { pattern: 'Цепочка', title: 'Storyboard за час', desc: 'Логлайн → beat-sheet → сцены → диалоги. Единый workflow от идеи до раскадровки.', tool: 'Claude Code', time: '60 мин' },
            { pattern: 'Оркестратор', title: 'Кампания по слотам', desc: 'KV + видео + сериал — агент разбивает большую идею на компоненты и предлагает варианты каждого.', tool: 'Claude Code', time: '45 мин' }
        ],
        producer: [
            { pattern: 'Цепочка', title: 'Разбор входящего брифа', desc: 'Агент вытаскивает риски, дыры и недостающие поля. Возвращает заказчику с конкретными вопросами, а не «пришлите ещё раз».', tool: 'Claude Code', time: '15 мин' },
            { pattern: 'Оркестратор', title: 'План проекта из брифа', desc: 'Бриф раскладывается на задачи по шести направлениям студии, оценка срока и загрузки, чек-лист рисков.', tool: 'Codex', time: '30 мин' },
            { pattern: 'Оценщик', title: 'Мониторинг очереди', desc: 'Агент читает Трекер FINTECHPICS и рапортует: где отставание, где риск дедлайна, что решать сейчас.', tool: 'Cursor', time: '10 мин' },
            { pattern: 'Параллель', title: 'Три способа спасти дедлайн', desc: 'Агент предлагает три сценария распределения работы под сжатые сроки — с рисками и стоимостью.', tool: 'Claude Code', time: '20 мин' },
            { pattern: 'Роутер', title: 'Задачи по уровню', desc: 'Простые — джуну, сложные — сеньору, стратегические — лиду. Агент помогает раскидать очередь.', tool: 'Claude Code', time: '15 мин' },
            { pattern: 'Оценщик', title: 'Ретро по проекту', desc: 'Агент читает материалы и переписки, предлагает пять наблюдений для ретро — что сработало, что нет.', tool: 'Claude Code', time: '25 мин' },
            { pattern: 'Цепочка', title: 'Онбординг подрядчика', desc: 'Бриф + FAQ + примеры + чек-лист приёмки — в один документ, готовый к отправке за 15 минут.', tool: 'Codex', time: '20 мин' },
            { pattern: 'Оркестратор', title: 'Спринт по 6 направлениям', desc: 'Агент собирает единый статус из тредов направлений: где узкое место, где помощь, где готово.', tool: 'Claude Code', time: '20 мин' }
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
        container.innerHTML = '<div class="try__empty">Нажми кнопку — покажу идею, привязанную к одной из пяти схем.</div>';
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
        el.innerHTML = `
            <span class="try__pattern">${escapeHtml(idea.pattern)}</span>
            <h3 class="try__title">${escapeHtml(idea.title)}</h3>
            <p class="try__desc">${escapeHtml(idea.desc)}</p>
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
