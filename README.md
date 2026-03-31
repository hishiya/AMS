# AMS (Anime & Movie System) - Personal Media Tracker

**AMS** (Anime & Movie & Series) — це повноцінний Full-Stack (PERN) веб-додаток для зручного списку та відстеження переглянутих аніме, фільмів та серіалів. Проєкт дозволяє користувачеві додавати нові тайтли, завантажувати постери, виставляти рейтинги та гнучко керувати своєю медіатекою.

---

## Головні можливості (Features)

- **Повний CRUD (Create, Read, Update, Delete):** Можливість створювати, переглядати, редагувати та видаляти картки контенту в режимі реального часу.
- **Робота з медіафайлами (File Uploads):** Завантаження та збереження постерів за допомогою `Multer` (`multipart/form-data`) та їх роздача через статичну папку Express.
- **Динамічний інтерфейс:** Універсальні модальні вікна (Edit Modal) для редагування з автоматичним підтягуванням існуючих даних.
- **Адаптивний дизайн (Responsive UI):** Картки контенту пропорційно масштабуються (`aspect-ratio`) та мають кастомні скролбари для зручного читання на мобільних пристроях.
- **Сортування та фільтрація:** Автоматичне виведення найкращого контенту (за рейтингом) на головній сторінці.

---

## Технологічний стек (Tech Stack)

### Фронтенд (Client)
- **React 18** (з використанням React Hooks: `useState`, `useEffect`)
- **TypeScript** (строга типізація пропсів, стейтів та API відповідей)
- **Vite** (швидка збірка та HMR)
- **Axios** (для відправки REST HTTP запитів)
- **CSS Modules** (ізольована стилізація компонентів)

### Бекенд (Server)
- **Node.js & Express.js** (побудова RESTful API)
- **PostgreSQL** (через бібліотеку `pg`, написання сирих (raw) SQL запитів)
- **Multer** ( middleware для обробки та збереження файлів)
- **CORS** (налаштування політики доступу)
- **TypeScript** (типізація контролерів та маршрутів)

---

## Структура проєкту

Проєкт організований у вигляді монорепозиторію:

```text
AMS/
├── client/         # React SPA (Vite)
│   ├── src/
│   │   ├── api/          # Функції для запитів до бекенду (Axios)
│   │   ├── components/   # UI компоненти (Картки, Модалки)
│   │   ├── pages/        # Сторінки (Home, Anime, Films, Dashboard)
│   │   └── types/        # Інтерфейси TypeScript
│   └── ...
├── server/         # Express API
│   ├── src/
│   │   ├── controllers/  # Логіка обробки запитів та звернення до БД
│   │   ├── db/           # Підключення до PostgreSQL
│   │   ├── middleware/   # Налаштування Multer
│   │   └── routes/       # API endpoints
│   └── uploads/          # Збережені зображення постерів
```

---

## Як запустити проєкт локально

### Передумови (Prerequisites)
- [Node.js](https://nodejs.org/) (v16 або вище)
- [PostgreSQL](https://www.postgresql.org/)

### 1. Налаштування Бази Даних
Авторизуйтесь в PostgreSQL та виконайте наступні SQL-команди для створення структури:

```sql
CREATE DATABASE ams_db;

CREATE TABLE anime (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    release_date DATE,
    rating NUMERIC(3, 1),
    poster_url VARCHAR(255)
);

CREATE TABLE films (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    release_date DATE,
    rating NUMERIC(3, 1),
    poster_url VARCHAR(255)
);

CREATE TABLE series (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    release_date DATE,
    rating NUMERIC(3, 1),
    poster_url VARCHAR(255)
);
```

### 2. Запуск Бекенду (Server)
```bash
cd server
npm install
```
Створіть файл `.env` у папці `/server` та додайте ваші дані для БД (за потреби переробіть під ваш `pool` в коді):
```env
PORT=5000
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ams_db
```
Запустіть сервер:
```bash
npm run dev
```

### 3. Запуск Фронтенду (Client)
В іншому терміналі:
```bash
cd client
npm install
```
Переконайтесь, що у файлі `/client/.env` налаштовано шлях до API:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```
Запустіть клієнт:
```bash
npm run dev
```

---

## Плани на майбутнє (Future Roadmap)
- [ ] Контейнеризація за допомогою **Docker** & **Docker Compose**.
- [ ] Додавання системи авторизації (JWT Tokens).
- [ ] Реалізація пагінації для великих списків.
- [ ] Пошук контенту за назвою.
- [ ] Можливість ділитися нещодавно переглянутим аніме/фільмов/серіалом.

---
