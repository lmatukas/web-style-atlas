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

`npm run distinctiveness` ir `npm run validate` rodo `WARN` eilutes:
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
