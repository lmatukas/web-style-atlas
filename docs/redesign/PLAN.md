# Stilių pertvarkos planas (S40–S51)

Tikslas: kiekviena kryptis turi turėti aiškų objektą, savo kompoziciją ir
nepasikartoti su kaimynais. Ši pertvarka nekeičia katalogo struktūros ir
nepridėda naujų krypčių.

## Kas jau nustatyta

- Vienas PR – viena užduotis (`docs/WORKFLOW.md`).
- Eilė: `docs/progress.json`. Užduotis imama tik tada, kai visos `depends_on` yra `done`.
- Kiekviena kortelė `docs/tasks/<ID>.md` turi: tikslą, priklausomybes, leidžiamus
  pakeitimus, žingsnius, patikras, „Done when“ ir „Out of scope“.

## Eilės tvarka

1. **P19** – išskirtinumo patikra (įspėjimai, ne klaidos).
2. **P20** – kalbos politika (LT/EN).
3. **P21** – vienodas `style.md` frontmatter.
4. **P24** – teisių ir šaltinių auditas (lygiagrečiai su S40–S51).
5. **S40–S51** – po vieną stilių. Kiekvienas gali eiti tik kai P19 ir P20 yra `done`.
6. **P22** – footer ir kopijos valymas (po visų S40–S51 ir P21).
7. **P23** – galutinė rubrikos ir įrodymų patikra (po P22 ir P24).

## Išskirtinumo įspėjimai (P19)

`node scripts/distinctiveness.mjs` ir `npm run validate` rodo `WARN` eilutes:
- `shared-asset` – tas pats vaizdas (SHA-256) keliuose stiliuose;
- `footer-boilerplate` – tas pats 5 žodžių posakis bent 3 footeruose;
- `shared-heading` – tas pats pirmas `<h1>` tekstas keliuose stiliuose.

Įspėjimai nelaužo `validate`. Jie – sąrašas, ką pertvarkyti.

## Patikros, kurias visi privalo atlikti

- `npm run validate`, `npm run build`, `node --test tests/*.test.mjs`.
- `npm run check` – tik kanoninėje aplinkoje (Ubuntu 24.04, Node 24.19.0). Kitur – `not_run`.
- Visi keturi PNG atidaryti ir įvertinti rubrika (`core/quality-rubric.md`).
- Įrodymai `docs/evidence/<ID>.md` su tikromis komandomis ir rezultatais.

## Ką daryti, kad nepaliktume tarpų

- Nauja sesija visada pradeda nuo `docs/progress.json` (pagrindinis šaltinis)
  ir nuo `npm run tasks:next`.
- Nebaigtos užduoties nepaleisti dar kartą, kol nepatikrintas jos PR.
- Stilio kortelė nurodo kaimyną palyginimui – jo rodyti kaip „nepakankamai atskirą“, jei abu kaimynai pasikartoja.

## Promptas naujam agentui

Kopijuok tiksliai:

> Atlik kitą užduotį iš šio repo: `lmatukas/web-style-atlas`. Pirmiausia
> perskaityk `docs/redesign/PLAN.md`, `docs/WORKFLOW.md` ir `docs/progress.json`
> (pagrindinis šaltinis). Paleisk `node scripts/tasks.mjs next`, paimk tik tą
> užduotį, kurią jis nurodo, ir vykdyk jos kortelę `docs/tasks/<ID>.md`
> pagal WORKFLOW. Baigęs – pateik trumpą atsakymą: ID, būsena, PR nuoroda,
> patikrų rezultatas, kitas veiksmas.

Jei `next` rodo `reconcile` – pirmiausia patikrink nurodytą užduotį ir PR, nepradėk naujos.

## Kaip daryti S41–S51 (pamokos iš S40)

Pavyzdys: S40 (`institutional-clear`), PR #87, įrodymai `docs/evidence/S40.md`.
Vienu metu – viena užduotis. Nedirbti lygiagrečiai su kitu agentu.

### 1. Pradžia

1. `git pull` main. `node scripts/tasks.mjs next` turi rodyti `claim` ir užduotį.
2. Claim **tik main šakoje**: `docs/progress.json` užduočiai nustatyti `in_progress`, `worker`, `claimed_at`, `updated_at`, `branch` (`task/sNN-<style-id>`), `base_commit` (pilnas 40 simbolių SHA), `next_action` (tekstas). `node scripts/tasks.mjs render`, `node scripts/ci.mjs validate`, commit ir push į main.
3. Sukurti šaką. **Kol šaka atvira, į main daugiau nieko nepush'inti** – kitaip PR gaus konfliktą `docs/progress.json`.

### 2. Prieš kodą

1. Perskaityti kortelę `docs/tasks/SNN.md`, `core/quality-rubric.md`, `core/anti-generic.md`, stiliaus `style.md`, `layouts.json`, `tokens.json`, `reference/*`.
2. Atidaryti dabartinius keturis PNG ir abiejų kaimynų (kortelėje) `preview.png`.
3. Užrašyti 3–5 invariantus ir lygiai 3 anti-pattern'us.
4. Patikrinti, kokius ID ir klases naudoja stiliaus `*.js` failai. Juos išlaikyti arba keisti kartu su JS.

### 3. Dizainas

- Vienas signature objektas, susietas su turiniu (S40: pastato planas, kurio raidės sutampa su katalogu). Geriausia originalus inline SVG su `role="img"`, `<title>` ir `<desc>`; visos spalvos per CSS klases iš tokenų (`var(--color-...)`).
- A ir B skiriasi kompozicija ir užduotimi, bet turi tą patį atpažįstamą parašą.
- Nauja spalvos rolė leidžiama `tokens.json` (`color`), bet tik su kontrasto pora `contrast_pairs`.
- Jokių netikrų formų, kainų, kontaktų, mygtukų be veiksmo.

### 4. Lokali iteracija (ne kanoninė)

- Peržiūroms tinka bet kuri Chromium (pvz. `executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell'`). Jei `fc-match Arial` grąžina Liberation Sans, vaizdas bus artimas kanoniniam.
- Naršyklės vartų išankstinė patikra: `inspectPage(page)` iš `scripts/browser-qa.mjs` su `servePreviews(root, [id])` iš `scripts/preview-server.mjs`, pločiai 360/768/1440, abu puslapiai. Lokalūs PNG **necommit'inami**.

### 5. Aprašai

- Atnaujinti `layouts.json` (sekcijos, `mobile_reflow`, `distinguishing_features`) ir `style.md`.
- `style.md`: frontmatter eilutės `raktas: JSON reikšmė` (žr. P21); body 700–1200 žodžių; tie patys skyriai po vieną kartą.
- `npm run validate`, `npm run build`, `node --test tests/*.test.mjs` – visi PASS.

### 6. Kanoniniai PNG

1. Commit ir push šakoje.
2. Paleisti workflow „Regenerate canonical previews“ (`.github/workflows/previews.yml`): `branch` = tavo šaka, `style` = stiliaus ID. REST: `POST /repos/lmatukas/web-style-atlas/actions/workflows/previews.yml/dispatches` su `ref=main`, `inputs[branch]`, `inputs[style]`.
3. **Kol workflow vyksta, į šaką nepush'inti.** Po jo `git pull` – bot'as įrašo PNG, `catalog/previews-manifest.json` ir `catalog/index.*`.
4. Atidaryti visus keturis PNG. Įvertinti rubrika (≥10/12, be nulio, atpažinimas ir skirtumas – 2). Jei nepasiekia – taisyti ir kartoti nuo 6.1.

### 7. PR ir sujungimas

1. Įrodymai `docs/evidence/SNN.md` pagal `docs/evidence/S40.md` šabloną: pakeitimai, komandos, keturi PNG, rubrikos lentelė su priežastimis, invariantai, anti-pattern'ai, apribojimai. Rubrikoje būti sąžiningam.
2. PR atidaryti **po** bot'o commit'o (bot'o commit'as pats CI nepaleidžia).
3. Šakoje: užduočiai `review` su `pr_url`, `evidence_commit` (40 simbolių SHA), `evidence_paths`, `handoff` (tekstas), `checks`. Render, validate, push.
4. Laukti „Atlas validation“: visi trys darbai success. Jei PR `mergeable_state` = `dirty`, sujungti main į šaką ir palikti naujesnį užduoties įrašą.
5. Sujungti PR su `sha` = patikrintas head. Main šakoje: `done`, `merge_commit`, visi `checks` = `pass` (pridėti „Exact-head GitHub CI and actual merge“ su run ID). **Niekada nežymėti `not_run` kaip `pass`.** Render, validate, push.

### 8. Ataskaita

Trumpai: ID, būsena, PR nuoroda, rubrikos balas, patikros, kitas veiksmas.
