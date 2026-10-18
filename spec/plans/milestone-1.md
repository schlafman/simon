# תוכנית – Milestone 1: בסיס אפליקציה ושני מסכים מעוצבים

> מקורות: `PRD.md`, `ARCHITECTURE.md`, `DESIGN.md` (+ `wireframes.png`, `mockups.png`, `style-guide.png`), `MILESTONES.md`.
> מטרה: פרויקט React + TypeScript + Vite עובד, עם שני מסכים (**בית**, **אודות**) מעוצבים ב-Theme הכהה של ה-Mockups. **אין עדיין לוגיקת משחק** – הלוח והכפתור "התחל" הם תצוגה בלבד.

## 0. דרישת קדם – Node.js

Node.js ו-npm **אינם מותקנים** כרגע במחשב (נבדק). לפני הבנייה המשתמש יתקין Node.js LTS (גרסה 22 או 24) מ-https://nodejs.org (Windows Installer), בהדרכה צעד-אחר-צעד. ללא זה אי אפשר להריץ `npm`.

## 1. מה נכלל ומה לא

**נכלל:**
- הקמת פרויקט Vite (React + TS) בשורש ה-Repository, עם CSS רגיל ו-CSS Variables.
- `@fontsource/heebo` (משקלים 400, 600, 700) – גופן מקומי, בלי CDN.
- Vitest + React Testing Library + jsdom – בדיקת Render/Navigation בסיסית.
- סקריפטים: `dev`, `build`, `typecheck`, `test`, `preview`.
- `base: "/simon/"` כבר עכשיו ב-`vite.config.ts` (לפי ARCHITECTURE 2.9), כדי שנתיבי ה-Assets יתאימו ל-GitHub Pages מההתחלה.
- App Shell: שני מסכים פנימיים, החלפה ב-State בלבד (ללא Router, ללא טעינת דף).
- מסך בית: כותרת "סיימון", חיווי "שלב 1 מתוך 10", לוח עגול בעל 4 רבעים, כפתור "התחל" (ללא פעולה).
- מסך אודות: כותרת "אודות", כרטיס "על המשחק", כותרת "10 המשחקים האחרונים", חיווי היסטוריה ריקה.
- פס ניווט תחתון "בית" / "אודות" עם מצב פעיל.

**לא נכלל (Milestones הבאים):** Reducer ומצבי משחק, אודיו, קונפטי, השהיה, `localStorage`, כפתור "מחק היסטוריה" ו-Dialog המחיקה (Milestone 4 – אין היסטוריה למחוק עדיין), PWA/Manifest/Service Worker, GitHub Actions.
- `canvas-confetti` ו-`vite-plugin-pwa` **לא** יותקנו עכשיו – רק כשנדרשים.
- אין קובץ `.env` – האפליקציה לא צריכה מפתחות או הגדרות.

## 2. מבנה קבצים

```text
/
├── index.html                 # <html lang="he" dir="rtl">, viewport, theme-color, <title>סיימון</title>
├── package.json               # scripts + dependencies
├── package-lock.json          # נוצר ע"י npm
├── tsconfig.json              # references ל-app ול-node (תבנית Vite)
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts             # react plugin, base "/simon/", הגדרות Vitest (jsdom, setupFiles)
├── public/                    # ריק כרגע (אייקונים יתווספו ב-Milestone 5)
└── src/
    ├── main.tsx               # createRoot + StrictMode, ייבוא Heebo ו-CSS גלובלי
    ├── App.tsx                # מצב screen: 'home' | 'about'; מציג מסך + NavBar
    ├── styles/
    │   └── global.css         # CSS Variables, reset, טיפוגרפיה, layout בסיסי
    ├── components/
    │   ├── NavBar.tsx         # שני כפתורי טאב "בית" / "אודות"
    │   ├── NavBar.css
    │   ├── SimonBoard.tsx     # לוח עגול: 4 <button> + דיסק מרכזי
    │   ├── SimonBoard.css
    │   └── icons.tsx          # אייקוני SVG פשוטים: בית, מידע (inline, בלי ספרייה)
    ├── screens/
    │   ├── HomeScreen.tsx
    │   ├── HomeScreen.css
    │   ├── AboutScreen.tsx
    │   └── AboutScreen.css
    ├── game/
    │   └── colors.ts          # type Color = 'green'|'red'|'yellow'|'blue' + תוויות עבריות + סדר בלוח
    └── test/
        ├── setup.ts           # @testing-library/jest-dom
        └── App.test.tsx       # בדיקות Render/Navigation
```

הקבצים שתבנית Vite יוצרת ואינם נחוצים (לוגו React/Vite, `App.css` לדוגמה, `assets/`) יוסרו. `.gitignore` הקיים כבר מכסה `node_modules/`, `dist/`, `coverage/` – אין צורך להוסיף שורות.

## 3. Dependencies

| חבילה | סוג | למה |
|---|---|---|
| `react`, `react-dom` | dep | UI |
| `@fontsource/heebo` | dep | גופן מקומי |
| `vite`, `@vitejs/plugin-react` | dev | Build ושרת פיתוח |
| `typescript`, `@types/react`, `@types/react-dom` | dev | TypeScript |
| `vitest`, `jsdom` | dev | הרצת בדיקות |
| `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event` | dev | בדיקות רכיבים |

ESLint של התבנית – לא נדרש ב-spec; לא יותקן כדי לשמור על פשטות.

**Scripts:**
```json
"dev": "vite",
"build": "tsc -b && vite build",
"typecheck": "tsc -b --noEmit",
"test": "vitest run",
"preview": "vite preview"
```
(אם `tsc -b --noEmit` מתנגש עם project references – להשתמש ב-`tsc -b` ולתעד.)

## 4. Design Tokens (`global.css`)

```css
:root {
  /* Style Guide */
  --green: #00D26A;  --red: #FF3B30;  --yellow: #FFD600;  --blue: #00A3FF;
  --charcoal: #0F0F0F;  --soft-gray: #E5E5E5;  --white: #FFFFFF;
  /* Dark theme surfaces – approximated from the mockups (no exact HEX in the Style Guide) */
  --bg: #07142a;  --surface: #0f2340;  --outline: rgba(0,163,255,.25);
  --text: var(--white);  --text-muted: #9fb2c8;
  /* Spacing scale */
  --s-8: 8px; --s-12: 12px; --s-16: 16px; --s-24: 24px;
  --radius: 16px;
  --font: 'Heebo', Arial, sans-serif;
}
```
- DESIGN מציין שאין HEX רשמי לרקע הכחול-כהה; הערכים `--bg` / `--surface` הם קירוב חזותי ל-Mockups, ייכתבו כהערה בקוד ככאלה, וקל לשנותם במקום אחד.
- טיפוגרפיה: H1 32/700 (מותג "סיימון"), H2 24/700 (כותרות אזור), H3 20/600 (חיווי שלב), Body 16/400, Caption 14/400, Button 16/600.
- `body`: רקע `--bg`, `direction: rtl`, `overflow-x: hidden`, `-webkit-tap-highlight-color: transparent`, `user-select: none` על הלוח והכפתורים, `touch-action: manipulation` (מניעת Double-tap zoom).

## 5. Layout כללי (Mobile-First)

- קונטיינר מרכזי ברוחב `100%` עם `max-width: 480px` וממורכז (במחשב ייראה כטלפון; אין התאמה ייעודית ל-Desktop).
- גובה `100dvh`, `display: flex; flex-direction: column`: אזור תוכן (`flex: 1`, גלילה אנכית אם צריך) + NavBar בתחתית (sticky/fixed בתוך הקונטיינר), עם `padding-bottom: env(safe-area-inset-bottom)`.
- `viewport`: `width=device-width, initial-scale=1, viewport-fit=cover`.
- אין גלילה אופקית ב-360px ומעלה (נבדק ב-360×640 וב-390×844).
- קשת עדינה ברקע העליון (כמו ב-Mockups) – פסאודו-אלמנט CSS עם `border` בגוון `--outline`; קישוט בלבד, ללא תמונה.

## 6. רכיבים

### 6.1 `App.tsx`
- `const [screen, setScreen] = useState<'home' | 'about'>('home')`.
- מציג `<HomeScreen />` או `<AboutScreen />` + `<NavBar active={screen} onChange={setScreen} />`.
- ה-State יישאר ב-`App` גם בהמשך (מקום מצב המשחק ב-Milestone 2), כך ש-Unmount של מסך הבית לא יאפס משחק.

### 6.2 `NavBar`
- `<nav aria-label="ניווט ראשי">` עם שני `<button type="button">`: "בית" (אייקון בית) ו"אודות" (אייקון מידע).
- בסדר RTL: "בית" מימין, "אודות" משמאל (כמו ב-Wireframes/Mockups) – נובע טבעית מ-`dir="rtl"`.
- טאב פעיל: `aria-current="page"`, טקסט לבן מודגש ורקע מודגש; לא פעיל – `--text-muted`.
- פס כהה (`--surface`), פינות מעוגלות, קו הפרדה דק בין הטאבים.

### 6.3 `HomeScreen`
סדר אנכי:
1. כותרת H1 "סיימון" + קו הפרדה דק מתחתיה.
2. H3 "שלב 1 מתוך 10" (מספרים עטופים ב-`<bdi>` לפי DESIGN 2.5).
3. שורת סטטוס (שמורה במקום קבוע, ריקה במצב התחלה) – כדי שבהמשך הלוח לא "יקפוץ".
4. `<SimonBoard />` (במצב מלא/מואר, לא אינטראקטיבי בשלב זה).
5. כפתור ראשי כחול "התחל" – `type="button"`, ללא handler (או handler ריק). רחב, מעוגל, טקסט לבן 16/600, צל רך.

### 6.4 `SimonBoard`
- **סידור (מרחבי, לא מתהפך ב-RTL):** ירוק למעלה-שמאל, אדום למעלה-ימין, צהוב למטה-שמאל, כחול למטה-ימין.
  - מימוש: עטיפה עם `direction: ltr` + CSS Grid 2×2 בסדר `green, red, yellow, blue`, כך ש-RTL לא יהפוך את המיקום.
- גודל: `width: min(80vw, 320px)`, `aspect-ratio: 1`.
- המעגל: מסגרת חיצונית כהה (`--charcoal`) עם קו מתאר עדין; 4 רבעים כ-`<button>` עם `border-radius` רק בפינה החיצונית של כל רבע (`100% 0 0 0` וכו'), ו-`gap` כהה ועבה ביניהם (פסי הפרדה).
- דיסק מרכזי כהה (`position: absolute`, ~32% מהקוטר, עיגול, `--charcoal` עם קו מתאר) – ללא תוכן וללא פונקציה (DESIGN 2.3).
- כל `<button>`: `aria-label` בעברית ("ירוק", "אדום", "צהוב", "כחול"), `type="button"`, `disabled` בשלב זה (אין משחק). העיצוב ב-disabled נשאר בצבע מלא כמו ב-Mockup "התחלה" (לא מעומעם) – העמעום יתווסף במצבי הצגה/השהיה בהמשך.
- הכנה ל-Milestone 2 (ללא שימוש עכשיו): מחלקת CSS `.is-lit` עם `filter: brightness` + `box-shadow` Glow, ו-`.is-dim` – רק CSS, בלי לוגיקה. **אופציונלי** – אם מסבך, לדחות.
- אין טקסט שמות צבעים על הלוח (ה-Wireframes מציגים אותם רק כהמחשה; ה-Mockups ללא טקסט).

### 6.5 `AboutScreen`
1. H1 "אודות" (לפי DESIGN 1.2 ו-Wireframes; ה-Mockup שמציג "סיימון" גובר עליו ה-DESIGN).
2. כרטיס "על המשחק" (H2 + Body), נוסח מוצע:
   > סיימון הוא משחק זיכרון של צבעים וצלילים.
   > צפה ברצף הצבעים שהמשחק מציג, ואז הקש על הצבעים באותו הסדר.
   > בכל שלב נוסף צבע אחד לרצף. טעות אחת מסיימת את המשחק.
   > השלם את כל 10 השלבים כדי לנצח!
3. H2 "10 המשחקים האחרונים".
4. חיווי ריק בכרטיס/טקסט מאופק: "עדיין אין משחקים שמורים."
5. **ללא** כפתור "מחק היסטוריה" ב-Milestone זה (אין מה למחוק; נוסף ב-Milestone 4).

כרטיסים: רקע `--surface`, גבול `1px solid var(--outline)`, `border-radius: var(--radius)`, ריפוד 16px.

## 7. בדיקות אוטומטיות (`src/test/App.test.tsx`)

1. **Render בית:** מופיעים "סיימון", "שלב 1 מתוך 10", כפתור "התחל", וארבעה כפתורי לוח עם השמות "ירוק", "אדום", "צהוב", "כחול".
2. **סדר הלוח:** סדר ה-DOM של כפתורי הלוח הוא ירוק, אדום, צהוב, כחול (שמבטיח את המיקום ב-Grid ה-LTR).
3. **ניווט לאודות:** לחיצה על "אודות" מציגה "על המשחק" ו"עדיין אין משחקים שמורים", והלוח כבר לא מוצג; לטאב "אודות" יש `aria-current="page"`.
4. **חזרה לבית:** לחיצה על "בית" מחזירה את מסך הבית.
5. **`index.html`:** (בדיקה פשוטה בקריאת הקובץ) מכיל `lang="he"` ו-`dir="rtl"`.

## 8. אימות בבנייה (מול Definition of Done)

| תנאי DoD | איך ייבדק |
|---|---|
| build + typecheck + בדיקה בסיסית | `npm run typecheck`, `npm run build`, `npm run test` – כולם ירוקים |
| שני מסכים, מעבר ללא רענון, אין מסך שלישי | בדיקה 3–4 + בדפדפן: מעבר לא משנה URL ולא טוען דף (Network) |
| 4 אזורים במקום הנכון, חיווי שלב, "התחל", אודות עם הסבר והיסטוריה ריקה | בדיקות 1–3 + צילום מסך בדפדפן המובנה |
| עברית, RTL, נוח ב-Smartphone אנכי, ללא גלילה אופקית | `npm run dev`, Viewport נייד (375×812 ו-360×640), בדיקת `scrollWidth <= clientWidth` |
| אין יכולות מעבר ל-PRD, אין Backend/DB | סקירת קבצים ו-`package.json` |

לאחר הבדיקה – לסגור את שרת הפיתוח, לסמן 🟡 ליד Milestone 1 ב-`MILESTONES.md`, ולמלא ב-`CLAUDE.md` את **פקודות הרצה** (`npm run dev`, `npm run test`). ללא commit.

## 9. החלטות לתיעוד כ-ADR ב-ARCHITECTURE.md (בזמן הבנייה)

- **ADR-1: ניווט פנימי ב-State ללא Router** – כבר נובע מ-ARCHITECTURE 2.1; לתעד בקצרה.
- **ADR-2: לוח מבוסס CSS Grid עם `direction: ltr` מקומי** – הבטחת סידור מרחבי קבוע תחת RTL.
- **ADR-3: גווני רקע כהים מקורבים מה-Mockups** – אין HEX רשמי ב-Style Guide; מוגדרים כ-CSS Variables להחלפה קלה.

## 10. נקודות פתוחות / הכרעות שנעשו

- **מרכז הלוח:** ב-Mockups מופיע טקסט כלשהו (לא קריא) בדיסק המרכזי; DESIGN 2.3 קובע "במרכז דיסק כהה; אין בו פיצ'ר נוסף" → דיסק ריק.
- **כותרת מסך אודות:** "אודות" (DESIGN + Wireframes) ולא "סיימון" כמו ב-Mockup.
- **כפתור "מחק היסטוריה":** נדחה ל-Milestone 4, כי Milestone 1 מגדיר רק "אזור היסטוריה ריק וחיווי היעדר תוצאות".
- **GitHub:** ה-Repository כבר מחובר ל-`https://github.com/schlafman/simon.git`; ה-push יתבצע רק בשלב "דחיפה" לפי בקשה.
