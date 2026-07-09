# Changelog

Все существенные изменения в проекте.

Формат — [Keep a Changelog](https://keepachangelog.com/ru/1.1.0/).
Версионирование — [Semantic Versioning](https://semver.org/lang/ru/).

## [Unreleased]

## [0.1.0] — 2026-07-09

Первый релиз: сайт-манифест «AI Agents × Creative Studio» подготовлен к деплою на Render.

### Добавлено
- Одностраничный сайт: hero, 12 нумерованных секций, финал.
- Шрифты Yandex Sans локально: **YS Text** (variable, upright + italic) и **YS Text Display Wide** (variable). Preload на два основных woff2.
- SEO-мета, Open Graph, Twitter Card, favicon `favicon.svg` в бренд-цвете.
- Интерактивный генератор идей для 6 направлений студии (коммуникационный дизайн, 3D, UX-редакция, редакция коммуникаций, копирайтинг, продюсирование). Пул 48 идей, лимит 5 в день, счётчик в `localStorage` со сбросом по дате.
- Marquee-лента продуктов Пэй под hero.
- Редизайн в стилистике area17.com: кремовая палитра `#F3EEE4`, крупные номера секций через JS-парсер, тёмная «пульт-панель» для генератора.
- Микро-анимации: scroll-reveal с `IntersectionObserver`, active-section highlight в nav, hover-lift на карточках.
- Мобильный nav: гамбургер + drawer с CTA внизу, закрытие по Esc.
- Accessibility: `:focus-visible` с accent-обводкой, skip-link, `prefers-reduced-motion`, aria-атрибуты на picker'е.
- Деплой-конфиг Render (`render.yaml`): static site, security-хедеры (X-Frame-Options, Referrer-Policy, Permissions-Policy), кэш-политики (шрифты — год immutable, CSS/JS — неделя, HTML — 5 мин).
- `robots.txt`, `.gitignore`.

### Известные ограничения
- `og.png` пока не сгенерирован — превью при шеринге отсутствует.
- `og:url` и `canonical` не заполнены — будут прописаны после привязки домена.

[Unreleased]: https://github.com/alhimenkov/ai-agents-studio-site/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/alhimenkov/ai-agents-studio-site/releases/tag/v0.1.0
