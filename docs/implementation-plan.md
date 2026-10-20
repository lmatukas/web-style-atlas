# Web Style Atlas įgyvendinimo planas

Versija: 1.0 · 2026-10-20 · Paskirtis: perduoti įgyvendinantiems AI agentams po vieną aiškią užduotį.

## 1. Produktas ir pavadinimas

**Repo pavadinimas: `web-style-atlas`. Viešas pavadinimas: Web Style Atlas.**

GitHub aprašymas anglų kalba:

> A visual atlas of distinct web design directions, with working examples and practical instructions for AI coding agents.

Pavadinimas apibūdina turinį ir nepririša prie vieno AI tiekėjo. Tai pasirinktas darbinis pavadinimas, ne patvirtinimas apie prekės ženklo unikalumą ar konkretaus GitHub adreso prieinamumą. Prieš kuriant repo patikrinti pavadinimą savininko paskyroje. Šis planas pats repo nesukuria.

**Tikslas:** vartotojas duoda agentui svetainės užduotį ir šio repo nuorodą. Agentas randa tinkamas, vizualiai skirtingas kryptis, parodo pasirinkimą ir pagal pasirinktą kryptį sukuria originalią, veikiančią svetainę. Vartotojui nereikia išmanyti stilių terminų.

Svarbiausia sėkmės sąlyga: skirtingų krypčių svetainės atpažįstamai skiriasi kompozicija, tipografija, turinio pateikimu ir vaizdų naudojimu. Vien spalvų pakeitimas nelaikomas nauju stiliumi.

Viešos instrukcijos, kodas ir stilių aprašai – anglų kalba. `README.lt.md` – trumpa lietuviška naudojimo instrukcija. Šis darbo planas – lietuvių kalba.

## 2. Apimtis ir galutinis rezultatas

Pirmas kokybės patikrinimas – 3 stiliai. Pirmas naudotinas leidimas – 12. Pilna šiame plane numatyta versija – **24 stiliai**, kiekvienas su dviem skirtingomis kompozicijomis, desktop ir mobile peržiūromis.

Galutiniai deliverables:

1. Viešam naudojimui parengtas repo su MIT licencijuotais nuosavais kodu ir tekstais.
2. 24 stilių aprašai, žymės, dizaino tokenai, kompozicijos ir licencijų apskaita.
3. 48 veikiantys HTML/CSS pavyzdžiai: kiekvienam stiliui po 2 variantus.
4. 96 sugeneruotos peržiūros: kiekvienam variantui desktop ir mobile.
5. Filtruojama statinė galerija, iki 3 stilių palyginimas ir pasirinkimo prompto kopijavimas.
6. Trumpas mašinai skaitomas indeksas ir universali naudojimo instrukcija.
7. Agentų adapteriai, kurių realus patikrinimo lygis aiškiai nurodytas.
8. Validavimas, peržiūrų generavimas, CI, papildymo instrukcija ir atliktų darbų registras.

Nekurti backend, vartotojų paskyrų, mokėjimų, AI API integracijos, npm leidinio, savo komponentų framework ar automatinio svetainių generatoriaus. Galerija rodo katalogą; tikslines svetaines kuria vartotojo pasirinktas agentas.

GitHub Pages yra šio viešo repo galerijos numatytas publikavimo būdas. Repo sukūrimą, push ir Pages įjungimą vykdyti tada, kai įgyvendinantis agentas turi tam prieigą ir vartotojo pavedimą. Jei prieigos nėra, parengti visus failus ir tiksliai nurodyti likusį veiksmą; neteigti, kad svetainė paskelbta.

## 3. Kaip turi veikti vartotojo patirtis

### 3.1 Pradinis prašymas

Pavyzdys: „Sukurk svetainę architektūros studijai. Dizaino krypčių ieškok šiame repo: <REPO_URL>. Pirmiausia parodyk 3 skirtingus variantus.“

Agentas:

1. Perskaito `START_HERE.md` ir `catalog/index.json`. Neskaito visų 24 pilnų aprašų.
2. Iš turimos užduoties nustato svetainės paskirtį, auditoriją, turinio ir vaizdų kiekį, platformą bei jau nurodytus apribojimus.
3. Jei trūksta esminio konteksto, užduoda vieną trumpą klausimą; nekartoja to, kas jau pasakyta.
4. Atrenka 3 tinkamas kryptis. Pagal nutylėjimą – iš skirtingų šeimų, su skirtingais kompozicijos bruožais.
5. Parodo kiekvienos peržiūrą arba tiesioginę galerijos nuorodą. Prideda vieną sakinį, kodėl tinka, ir vieną svarbų kompromisą, pavyzdžiui, kiek reikės kokybiškų nuotraukų.
6. Paklausia: „Kuri kryptis artimiausia? Gali nurodyti ir patikusias kelių variantų detales.“
7. Pasirinkus perskaito tik pasirinkto stiliaus aprašą, tokenus, abiejų variantų kompozicijas ir reikalingus pavyzdžius.
8. Tiksliniame projekte užrašo trumpą `design-decision.md`: repo revizija, stiliaus ID, variantas, 3–5 išsaugomi bruožai, pritaikymai turiniui, vaizdų planas ir mobili kompozicija.
9. Kuria tikslinėje platformoje, patikrina realų vaizdą ir naudojimą; nepristato vien aprašo kaip svetainės.

Jei vartotojas sako „pasirink pats“, pasirinkti tinkamiausią kryptį ir dirbti nelaukiant papildomo patvirtinimo. Jei nurodytas konkretus stilius, nerengti nereikalingo pasirinkimo rato. Jei prašo kitokių variantų, pateikti naujas kryptis, nekartoti tų pačių.

### 3.2 Mišrūs pageidavimai

Leisti vieną pagrindinį stilių ir vieną papildomą įtaką. Aiškiai užrašyti, kas paimama iš antro stiliaus, pavyzdžiui, tik šrifto kontrastas arba nuotraukų įrėminimas. Negaminti neapibrėžto „visko po truputį“ mišinio. Kompozicijos pagrindas lieka vienas.

### 3.3 Skirtingos agentų galimybės

- Agentas su failų prieiga skaito pasirinktus failus tiesiogiai.
- Agentas su tinklo prieiga gali perskaityti repo failus arba klonuoti atskirą katalogo kopiją.
- Agentas be vaizdų peržiūros pateikia tikras preview/galerijos nuorodas ir remiasi aprašu. Negali teigti, kad vizualiai patikrino.
- Agentas be repo prieigos paprašo reikiamo paketo arba nuorodos turinio, užuot išgalvojęs katalogą.
- Repo nuoroda nėra garantija, kad konkreti aplinka automatiškai įkels `AGENTS.md` ar įdiegs skill. Todėl bazinis kelias visada yra aiškus prašymas perskaityti `START_HERE.md`.

## 4. Kas sudaro atskirą stilių

Kiekvienas stilius turi 8 dimensijų profilį. Žymės padeda ieškoti, tačiau jų skirtumai patys savaime nėra vizualinės kokybės įrodymas.

| Dimensija | Ką aprašyti |
|---|---|
| Kompozicija | Kolonų logika, asimetrija, elementų mastelis, tuštuma, tekstų ir vaizdų santykis |
| Tipografija | Šriftų vaidmenys, hierarchija, eilutės ilgis, antraščių ritmas |
| Navigacija | Viršutinė, šoninė, redakcinė, indeksinė ar kita; mobile elgsena |
| Turinio ritmas | Tankis, sekcijų kaita, sąrašai, lentelės, tekstinės juostos, ne tik kortelės |
| Vaizdai | Fotografijos pobūdis, proporcijos, iškirpimas, iliustracijos, tekstūros |
| Spalvos ir medžiagiškumas | Semantiniai vaidmenys, paviršiai, kontūrai, šešėliai |
| Sąveika | Hover, focus, atskleidimas, galerijos ar filtras; reikalingos būsenos |
| Judesys | Ką animuoti, kodėl, kada sustabdyti ir kaip elgtis su reduced motion |

Stiliaus apraše privalomi **3–5 išsaugomi bruožai** ir **3 nepageidaujami nukrypimai**. Pavyzdys: šveicariško stiliaus esmė yra tinklelis, tipografinė hierarchija ir tikslus lygiavimas; raudonas akcentas nėra privaloma esmė.

Kiekvienas naujas stilius palyginamas su artimiausiu esamu: turi pagrįstai skirtis bent 3 dimensijomis, iš kurių bent viena yra kompozicija, navigacija arba turinio ritmas. Tai redakcinis priėmimo kriterijus, ne matematinis originalumo sertifikatas.

## 5. Stilių katalogas ir gamybos eilė

Visi pavadinimai ir ID žemiau yra galutiniai pradinės versijos darbo identifikatoriai. „A“ ir „B“ – skirtingos to paties stiliaus kompozicijos, ne spalvų variantai.

| ID / užduotis | Kryptis ir šeima | Variantas A | Variantas B | Svarbiausias skirtumas |
|---|---|---|---|---|
| S01 `swiss-grid` | Swiss Grid / typographic | Tipografinis paslaugų indeksas | Asimetrinis darbų katalogas | Tinklelis ir skaičiais žymėta hierarchija |
| S02 `editorial-journal` | Editorial Journal / editorial | Viršelio istorija ir rubrikos | Ilgas tekstas su šoninėmis pastabomis | Redakcinis skaitymo ritmas |
| S03 `neo-brutalist` | Neo Brutalist / expressive | Plakatinis pasiūlymas | Rėmų ir tipografinių juostų renginio programa | Atviri kontūrai, griežtas mastelio kontrastas |
| S04 `cinematic-photo` | Cinematic Photo / photographic | Didelė fotografija ir scenos | Vertikali fotopasakojimo seka | Vaizdai valdo pasakojimą; be privalomo video |
| S05 `organic-craft` | Organic Craft / tactile | Medžiagų ir amato istorija | Asimetrinis dirbinių katalogas | Taktiliškumas ir netobulos formos |
| S06 `terminal-utility` | Terminal Utility / technical | Komandų pobūdžio paslaugų indeksas | Informacijos žurnalas su skydeliais | Monospace, tankis, tekstinė navigacija |
| S07 `quiet-luxury` | Quiet Luxury / restrained | Retas kolekcijos pristatymas | Didelio objekto detalė | Tyla, proporcijos, ribota ornamentika |
| S08 `bauhaus-geometric` | Bauhaus Geometric / expressive | Geometrinis renginio plakatas | Modulinė darbų ekspozicija | Geometrija kuria struktūrą |
| S09 `field-notes` | Field Notes / tactile | Kelionės užrašai su paraštėmis | Maršruto dienoraštis ir nuotraukos | Dokumentavimo, anotacijų logika |
| S10 `institutional-clear` | Institutional Clear / functional | Užduočių ir paslaugų katalogas | Informacinis puslapis su turiniu | Aiški orientacija, skaitomumas, pasitikėjimas |
| S11 `playful-cutout` | Playful Cutout / illustrative | Iškirptų objektų scena | Renginio istorija su lipdukais | Iliustracijos ir persidengiantys objektai |
| S12 `data-observatory` | Data Observatory / technical | Rodiklių ir diagramų apžvalga | Lyginamų duomenų lentelė su filtru | Informacijos tankis ir tikslus kodavimas |
| S13 `gallery-white-cube` | Gallery White Cube / restrained | Meno darbų siena | Vieno darbo ekspozicija su indeksu | Kūriniai pirmi, tekstas kaip etiketė |
| S14 `newspaper-ledger` | Newspaper Ledger / editorial | Daugialypis naujienų pirmas puslapis | Analizė su lentelėmis | Tankios kolonos ir redakcinės linijos |
| S15 `industrial-spec` | Industrial Spec / technical | Techninis produkto lapas | Sprendimų palyginimas ir brėžiniai | Numeracija, specifikacijos, matmenų logika |
| S16 `retro-web` | Retro Web / nostalgic | Asmeninis portalas | Nuorodų ir įrašų archyvas | Ankstyvo interneto informacinė struktūra |
| S17 `y2k-chrome` | Y2K Chrome / nostalgic | Muzikos ar produkto plakatas | Kolekcijos ekspozicija | Metalas, orbitos ir futuristinė popkultūra |
| S18 `art-deco` | Art Deco / ornamental | Kultūros renginio kvietimas | Viešbučio istorija ir pasiūlymai | Simetrija, pakopiniai ornamentai |
| S19 `botanical-engraving` | Botanical Engraving / illustrative | Augalų ir kilmės istorija | Klasifikuotas produktų herbariumas | Linijinė iliustracija ir taksonomija |
| S20 `kinetic-type` | Kinetic Type / typographic | Didžiulių žodžių kampanija | Tipografinis renginių kalendorius | Raidės kuria kompoziciją ir ribotą judesį |
| S21 `soft-spatial` | Soft Spatial / spatial | Vieno erdvinio objekto pristatymas | Sluoksnių paslaugų apžvalga | Gylis ir šviesa, ne privalomas WebGL |
| S22 `architectural-monograph` | Architectural Monograph / photographic | Projekto fotografijos ir planai | Projektų atlasas su indeksu | Vaizdo, brėžinio ir pastabų proporcijos |
| S23 `pop-commerce` | Pop Commerce / commercial | Ryškus vieno produkto pasiūlymas | Kategorijų ir produktų lentyna | Komercinis aiškumas ir mastelio kontrastas |
| S24 `humanist-service` | Humanist Service / functional | Žmogiškos paslaugos ir žmonės | Nuoseklus „kaip tai veikia“ kelias | Šilta tipografija ir aiškus veiksmų vedimas |

Artimos poros, kurias būtinai lyginti: S02/S14; S05/S09/S19; S07/S13; S01/S22; S03/S08; S10/S24; S06/S15. Jei jos vizualiai susilieja, taisyti kompoziciją prieš pridedant dar vieną stilių.

## 6. Repo struktūra

```text
README.md
README.lt.md
START_HERE.md
AGENTS.md                         # generated: trumpas darbo repo įėjimas
CLAUDE.md                         # generated: patikrintas įrankio įėjimas
LICENSE
THIRD_PARTY_NOTICES.md
CONTRIBUTING.md
package.json
package-lock.json
core/
  agent-entry.md                  # šaltinis repo priežiūros instrukcijai
  selection-guide.md              # atranka ir pokalbis su vartotoju
  anti-generic.md
  quality-rubric.md
  skill/SKILL.md                  # universalios naudojimo instrukcijos šaltinis
  vocabularies.json               # šeimos ir paieškos žymės
styles/<style-id>/
  style.md                       # metadata + praktinis aprašas
  tokens.json                    # semantiniai dizaino tokenai
  layouts.json                   # A ir B kompozicijų aprašai
  assets.json                    # teisių ir failų registras; gali būti tuščias
  assets/                        # vietiniai vaizdai, šriftai ir jų licencijos
  reference/index.html           # A variantas
  reference/alternate.html       # B variantas
  reference/style.css
  reference/tokens.css           # generated iš tokens.json
  reference/script.js            # tik jei būtina pavyzdžiui
  preview.png                    # generated A desktop
  preview-mobile.png             # generated A mobile
  preview-alt.png                # generated B desktop
  preview-alt-mobile.png         # generated B mobile
templates/style/                 # šablonas, ne katalogo įrašas
schema/
catalog/index.json               # generated kompaktiškas indeksas
catalog/index.md                 # generated žmogui skaitomas indeksas
catalog/previews-manifest.json   # generated preview kilmės ir hash registras
gallery/                        # statinės galerijos šaltinis
scripts/
tests/
docs/implementation-plan.md
docs/tasks/P01.md ... P14.md
docs/tasks/S01.md ... S24.md
docs/progress.json
docs/decisions.md
docs/compatibility.md
docs/evidence/                   # trumpi patikrų įrodymai
docs/benchmarks/                 # užduotys ir vertinimo rezultatai
.github/workflows/
.github/pull_request_template.md
dist/                           # generated, necommitinti
```

Įrankių skill adapterių direktorijas P09 užduotyje nustatyti pagal oficialią tuo metu galiojančią dokumentaciją. Generuojami adapteriai commitinami, bet rankomis neredaguojami. Pasirinkto stiliaus taikymas kitame projekte turi veikti ir be jų.

Jei ankstesnis agentas jau sukūrė karkasą ar schemas, pirmiausia palyginti su šiuo kontraktu ir migraciją atlikti mažu pakeitimu. Ankstesnio plano žyma „done“ nėra įrodymas apie dabartinio checkout būseną. Neperkurti to, kas jau tinkamai veikia.

## 7. Duomenų kontraktas

### 7.1 `style.md`

YAML frontmatter privalomi laukai: `schema_version`, `id`, `name`, `summary`, `family`, `tags`, `best_for`, `avoid_for`, `density`, `image_dependency`, `motion_level`, `complexity`, `signature`, `status`.

Taisyklės: `schema_version: 1`; ID sutampa su aplanku; `summary` iki 240 simbolių; `status` yra `draft` arba `ready`. `density`: sparse/balanced/dense; `image_dependency`: low/medium/high; `motion_level`: none/subtle/expressive; `complexity`: low/medium/high. Šeimos – 5 skyriaus rinkinys. Žymės ir tinkamumo reikšmės registruojamos vienoje `core/vocabularies.json` vietoje. `signature` – 8 dimensijų objekto trumpos tekstinės reikšmės.

Privalomi turinio skyriai: `Intent`, `Signature`, `Typography`, `Color and surfaces`, `Layout A`, `Layout B`, `Imagery`, `Navigation and interaction`, `Motion`, `Responsive behavior`, `Accessibility`, `Adaptation`, `Avoid`, `Closest styles`.

Apimtis: maždaug 700–1200 angliškų žodžių. Konkretūs nurodymai vertingesni už epitetus. „Make it premium“ netinka; „use a narrow text column beside a full-height image and small, aligned captions“ tinka.

Prieinamumo lauke nerašyti „WCAG certified“ ar besąlyginio „AAA“. Apraše skirti tikslą, atliktas patikras ir apribojimus. Vien tokenų kontrastas neįrodo viso puslapio atitikties.

### 7.2 `tokens.json`

Šaknys: `schema_version`, `color`, `typography`, `spacing`, `radius`, `shadow`, `motion`, `layout`, `contrast_pairs`.

- `color`: background, surface, text, muted, accent, on_accent, border, focus. Papildomi vaidmenys leidžiami pagal schemą. Pirmoje versijoje – nepermatomos šešiaženklės hex spalvos; gradientai aprašomi CSS ir tikrinami renderintame puslapyje.
- `typography`: display/body šeimos, fallback stack, dydžių skalė, weights, line heights, letter spacing. Šrifto failo kelias ir licencijos įrašo ID, kai šriftas vietinis. Bent vienas pasirinktas šriftas turi palaikyti lietuviškus simbolius; atskirai patikrinti ĄČĘĖĮŠŲŪŽ.
- `spacing`, `radius`, `shadow`: ribotos įvardytos skalės, ne dešimtys atsitiktinių reikšmių.
- `motion`: duration, easing ir reduced-motion principas.
- `layout`: content max width, teksto max plotis, breakpoints.
- `contrast_pairs`: foreground, background, paskirtis ir reikalaujamas santykis kiekvienai realiai naudojamai porai.

Generatorius kuria `tokens.css`. Pavyzdžiai naudoja jo CSS custom properties. Leidžiama stiliui būdinga geometrija ir CSS kompozicija; neleidžiama slėpti kitos spalvų sistemos hardcoded CSS reikšmėse. Tokenų pakeitimo testas turi parodyti, kad pavyzdys tikrai jais remiasi.

### 7.3 `layouts.json`

Du variantai `a` ir `b`: id, title, page_type, reference_path, navigation, ordered_sections, mobile_reflow, distinguishing_features. Kiekvienai sekcijai: purpose, pattern, content_requirements. Negalima visoms kryptims sugeneruoti tos pačios hero/features/testimonials/CTA sekos su kitais pavadinimais.

### 7.4 `assets.json`

Kiekvienam trečios šalies ar generuotam assetui: vietinis path, type, origin, source_url arba generated kilmės pastaba, creator kai žinomas, license, license_file kai taikoma, attribution, redistribution_allowed, modifications. Savos CSS formos nėra atskiras assetas.

Tik tokie failai, kuriuos leidžiama viešai platinti repo. Nuoroda į svetainę nėra leidimas kopijuoti jos nuotraukas, kodą ar logotipus. Repo MIT automatiškai nekeičia pridėtų šriftų ar vaizdų licencijų. Neaiškios teisės – assetą pakeisti, nelaukti viso projekto.

### 7.5 Indeksas ir atranka

Indekse laikyti frontmatter santrauką, preview ir reference santykinius kelius, variantų pavadinimus. Nekopijuoti visų aprašų. `draft` įrašai nepatenka į viešą galeriją ir numatytą agento atranką.

Atrankos algoritmas pirmiausia atmeta netinkančias kryptis pagal būtinus apribojimus, paskui vertina paskirtį, nuotaiką, vaizdų poreikį ir įgyvendinimo sudėtingumą. Iš tinkamų atrenka skirtingas šeimas. Jei tinkamų mažiau nei 3, pateikia mažiau ir paaiškina kodėl. Jokios AI API ar vektorinės DB šiai versijai nereikia.

## 8. Pavyzdžiai ir galerija

Kiekvienas variantas turi būti užbaigtas mažas puslapis: navigacija, bent 4 prasmingos turinio sritys ir užbaigimas. Naudoti realistišką išgalvotą turinį, aiškiai demonstracinę paskirtį ir veikiančias vietines nuorodas. Neužpildyti visko lorem ipsum. Demo formos aiškiai nesiunčia duomenų.

Pavyzdžiai – HTML/CSS ir nedaug vanilla JS. Nekurti visiems stiliams vieno layout komponento, keičiančio tik tokenus. Leidžiama dalintis mažu reset ir pagalbiniais įrankiais. Galutinio produkto technologijų pavyzdžiai neapriboja: agentas gali perkelti principus į WordPress, React ar kitą nurodytą platformą.

Minimalūs pločiai QA: 360, 768 ir 1440 CSS px. Preview viewport: desktop 1440×1000, mobile 390×844; screenshot – full page. Peržiūros laukia šriftų ir vaizdų, išjungia animacijas ir fiksuoja deterministinį kadrą. Galerija naudoja apriboto aukščio thumbnail ir leidžia atverti visą vaizdą.

Galerijos funkcijos:

- Paieška pagal pavadinimą, žymes ir paskirtį.
- Filtrai: šeima, paskirtis, tankis, vaizdų poreikis, įgyvendinimo sudėtingumas.
- Desktop/mobile ir A/B perjungimas.
- Iki 3 stilių palyginimas viename vaizde; mobile – vienas po kito.
- Detalės: kada tinka, ko reikia, išsaugomi bruožai, nuorodos į veikiančius pavyzdžius ir šaltinius.
- Mygtukas „Copy prompt“ su pasirinktu ID, variantu ir sukonfigūruotu repo URL. Jei URL nenustatytas, aiškus placeholder, ne išgalvota nuoroda.
- Filtrų ir pasirinkimų būsena URL query parametruose; galima pasidalyti pasirinkimu.
- Klaviatūros valdymas, matomas focus, tuščios paieškos būsena, lazy loaded peržiūros. Paveikslų alt apibūdina kompoziciją, ne vien stiliaus vardą.

Statinę galeriją generuoti į `dist/`, naudojant paprastą Node build ir vanilla JS. Patikrinti veikimą po repo subpath, ne vien domeno šaknyje. Demo keliai ir assetai turi išlikti teisingi nukopijavus į `dist/`. Preview/reference turinys vykdomas izoliuotame iframe, jei įterpiamas, arba atveriamas atskirai.

## 9. Kokybės patikros

### Automatinės

1. JSON Schema ir frontmatter validacija, privalomi skyriai, unikalūs ID, egzistuojantys keliai.
2. Tokenų porų kontrastas: įprastam tekstui bent 4.5:1, dideliam tekstui ir reikiamiems netekstiniams elementams bent 3:1; vien šis testas nelaikomas viso WCAG įvertinimu.
3. Sugeneruotų indeksų, adapterių ir tokenų CSS neatitikimo patikra.
4. Pavyzdžių įkėlimas be JS klaidų ir nerastų vietinių išteklių; jokių būtinų išorinių CDN užklausų.
5. Horizontal overflow ir uždengtų esminių valdiklių patikra nurodytuose pločiuose; pagrindinių valdiklių funkciniai testai.
6. Prieinamumo automatika, pavyzdžiui, axe, ir papildoma klaviatūros bei mobile peržiūra.
7. Preview manifest hash sieja visus screenshot veikiančius šaltinius: HTML, CSS, JS, tokenus, vietinius assetus, bendrus failus, render nustatymus ir įrankio versiją. CI pagauna pasenusias peržiūras.
8. Dvi iš eilės build generacijos nekeičia tekstinių generated failų; laikrodžio datos į juos neįrašomos.

Preview generavimui pasirinkti Playwright ir užfiksuotą Chromium aplinką. Tikslaus pixel diff nereikalauti tarp skirtingų OS. Screenshot kilmės hash rodo šaltinių atitikimą; vaizdo kokybę ir teisingą kadrą dar reikia patikrinti vizualiai.

### Vizualinė rubrika

Kiekvieną kriterijų vertinti 0–2: 0 – neatitinka; 1 – dalinai; 2 – aiškiai atitinka.

| Kriterijus | Kas įrodo 2 balus |
|---|---|
| Krypties atpažįstamumas | Matomi bent 3 deklaruoti skiriamieji bruožai |
| Skirtumas nuo artimiausio stiliaus | Pagrįsti bent 3 dimensijų skirtumai, bent vienas struktūrinis |
| A ir B skirtumas | Keičiasi kompozicija ir turinio pateikimas, ne tik kosmetika |
| Tipografija ir turinio hierarchija | Aiški skaitymo eiga, nėra teksto ir elementų susidūrimų |
| Mobile kokybė | Kompozicija pritaikyta, tekstas ir valdikliai patogūs |
| Praktinis pritaikomumas | Agentas gali iš aprašo ir pavyzdžio sukurti kitą turinį |

Priėmimas: bent 10/12, nė vieno nulio, atpažįstamumas ir skirtumas nuo artimiausio – po 2. Funkcinės, failų ir licencijų klaidos taisomos nepriklausomai nuo balo. Vertintojas nurodo konkrečius pastebėjimus ir peržiūrėtus failus; „atrodo gerai“ nėra įrodymas.

Rubrika yra projekto kokybės taisyklė, ne objektyvus grožio matuoklis. Jei nėra galimybės matyti renderintų vaizdų, vizualinės patikros būsena lieka `not_run`.

## 10. Įgyvendinimo užduotys mažesniems agentams

Iš viso: **14 bendrų užduočių ir 24 vieno stiliaus užduotys**. Vienas agento pavedimas vykdo vieną kortelę. Užduotis baigiama pakeitimu, patikros rezultatu ir trumpu perdavimu. Joks agentas neturi vienu pavedimu „padaryti viso repo“.

Kiekvienoje `docs/tasks/<ID>.md` kortelėje privalomi laukai: Goal, Depends on, Read first, Allowed changes, Steps, Checks, Done when, Out of scope. Žemiau pateiktas turinys yra šių kortelių specifikacija. P01 jas sukuria; vėliau agentai neperrašo viso plano.

### P01 – Esamos būsenos patikra ir sutartas kontraktas

**Priklauso:** nuo pateikto checkout arba leidimo sukurti tuščią projektą.

**Skaityti:** šį planą, esamus repo instrukcijų failus ir `package.json`, jei yra.

**Keisti:** karkasą, `schema/`, `templates/style/`, `core/vocabularies.json`, `docs/implementation-plan.md`, `docs/tasks/`, `docs/progress.json`, `docs/decisions.md`, `.gitignore`, licencijos failus, `package.json`.

**Veiksmai:** užrašyti realų repo, šaką ir HEAD; patikrinti necommitintus vartotojo pakeitimus; išsaugoti šį planą repo; apibrėžti 7 skyriaus schemas; sukurti 38 korteles ir jų priklausomybes. Node versiją parinkti pagal tuo metu palaikomą LTS ir įrašyti repo konfigūracijoje. Esamą teisingą darbą išsaugoti. Savininko vardo ar repo URL neišgalvoti.

**Priimti:** visos kortelės ir ID sutampa su planu, šablono JSON ir YAML parsina, kiekviena privaloma schema egzistuoja, progresas tiksliai atitinka realybę. Dar nekurti 24 stilių ir nebandyti jų pažymėti baigtais.

### P02 – Validavimas ir deterministinis generavimas

**Priklauso:** P01.

**Keisti:** `scripts/validate.mjs`, `scripts/build.mjs`, reikalingus mažus pagalbinius modulius, `tests/`, npm scripts ir lockfile.

**Veiksmai:** naudoti patikimą YAML parserį ir JSON Schema validatorų; nerašyti savo YAML parserio. Generuoti `tokens.css`, JSON ir Markdown indeksus. `build` iškviečia šaltinių validaciją, bet nereikalauja dar neegzistuojančių preview. `check` tikrina ir publikavimui reikalingus generated failus. Šablonas neįtraukiamas į katalogą.

**Patikros:** vienas tinkamas fixture, netinkamas ID, trūkstamas laukas, blogas enum, nežinomas failo kelias, kontrasto klaida; du build paleidimai duoda vienodus tekstinius rezultatus. Keičiant tokeną pasikeičia generated CSS. Testai tikrina kontraktą, ne vien atkartojamą implementacijos detalę.

**Priimti:** aiškios klaidos su failo keliu ir lauku; draft/ready elgsena apibrėžta; nėra nereikalingo framework.

### P03 – Renderinimas ir preview generavimas

**Priklauso:** P02.

**Keisti:** `scripts/previews.mjs`, minimalų vietinį serverį, preview manifest schemą, browser testų konfigūraciją, npm scripts.

**Veiksmai:** priimti `--style <id>` ir `--all`; generuoti 4 konkretaus stiliaus PNG; laukti vietinių išteklių; išjungti animacijas; registruoti turinio hash ir render aplinką. Fixture puslapyje įrodyti, kad PNG atsiranda ir yra skaitomas. Užfiksuoti vieną canonical aplinką CI preview generavimui.

**Priimti:** pakeitus CSS ar assetą senas manifest atmetamas; nepavykęs render nepalieka sėkmės įrašo; šrifto ar paveikslo užkrovimo klaida matoma. Browser nepasiekiamas = aiški `not_run` būsena, ne netikras PASS.

### S01–S03 – Pirmieji trys stiliai

**Priklauso:** P03; kiekvieną kurti atskiru pavedimu pagal bendrą S kortelę ir 5 skyriaus eilutę. Pirmas – S01, tada S02, tada S03.**

Tikslas: anksti gauti 6 veikiančius puslapius ir 12 preview. Stilių šaltinius kurti originaliai; nekopijuoti vieno HTML ir pakeisti klasės pavadinimą. Rengiant S02 ir S03 peržiūrėti jau padarytą ankstesnių stilių vaizdą.

### P04 – Trijų stilių pilotas ir kontrakto užfiksavimas

**Priklauso:** S01, S02, S03.

**Keisti:** tik pilotinių stilių trūkumus, `core/quality-rubric.md`, `core/anti-generic.md`, `docs/evidence/pilot.md`; schemas keisti tik jei pilotas įrodė būtinybę.

**Veiksmai:** greta peržiūrėti 3 desktop ir 3 mobile pagrindines kompozicijas, po to B variantus. Vertinti 9 skyriaus rubrika. Patikrinti stilius ir su vienos neutralios paslaugų svetainės turiniu, kad skirtumą kurtų dizainas, ne vien skirtinga tema ar nuotrauka. Tam užtenka laikinų bandomųjų puslapių ir išvadų; nekurti papildomo generatoriaus.

**Priimti:** visi 3 praeina kokybės kriterijus; aprašyti artimiausių variantų skirtumai; nuo šiol schema v1 fiksuota. Masinė gamyba neprasideda, kol pilotas nepriimtas. Jei nėra vizualinio vertinimo galimybės, galima tęsti nepriklausomas technines korteles, bet ne dauginti nepatikrintą dizaino modelį.

### P05 – Atranka ir universali agento instrukcija

**Priklauso:** P04.

**Keisti:** `START_HERE.md`, `core/selection-guide.md`, `core/skill/SKILL.md`, `core/agent-entry.md`, atrankos fixtures.

**Veiksmai:** įrašyti 3 skyriaus eigą, taupų failų skaitymą, vieno klausimo principą, aiškų pasirinkimo režimą ir autopasirinkimą. Atskirk repo priežiūros instrukciją nuo stiliaus naudojimo kitame projekte. `AGENTS.md` neturi visada liepti pridėti stilių, kai vartotojas tik nori sukurti svetainę.

**Patikros:** bent 6 scenarijai: stilius nenurodytas; konkretus ID; „pasirink pats“; nėra nuotraukų; esamas prekės ženklas; norimas ID neegzistuoja. Pastaruoju atveju agentas nesiūlo išgalvoto katalogo įrašo.

**Priimti:** pasirinkimas remiasi tik egzistuojančiais ready įrašais, pateikia tikras nuorodas ir neteigia matęs neatvertų vaizdų.

### P06 – Galerijos pirmas veikiantis variantas

**Priklauso:** P05.

**Keisti:** `gallery/`, galerijos build, atitinkamus browser testus.

**Veiksmai:** indeksas, paieška, filtrai, stiliaus detalės, A/B ir desktop/mobile perjungimas, tikri pavyzdžių keliai. Pradžiai naudoti 3 pilotinius stilius.

**Priimti:** veikia mobile, klaviatūra ir repo subpath; nėra JS klaidų ar tuščių preview; atidarius bet kurį pavyzdį veikia jo CSS ir assetai. `dist/` pilnai atkuriamas iš repo.

### P07 – Palyginimas ir pasirinkimo perdavimas agentui

**Priklauso:** P06.

**Keisti:** tik galerijos palyginimo, URL būsenos ir prompto kopijavimo funkcijas bei jų testus.

**Veiksmai:** iki 3 stilių palyginimas; pasirinkto ID ir varianto promptas; URL atkuria filtrus ir pasirinkimą; clipboard nesant, rodomas pažymimas tekstas.

**Priimti:** nukopijuotas tekstas tiksliai nurodo realų ID, variantą ir repo nuorodą; neviršijama 3 pasirinkimų riba; mobilus palyginimas lieka skaitomas.

### P08 – CI ir kokybės vartai

**Priklauso:** P07.

**Keisti:** `.github/workflows/`, kokybės skriptus, tikslinius testus ir npm scripts.

**Veiksmai:** šaltinių validacija, generated failų drift, preview freshness, browser smoke, prieinamumo patikra. PR tikrinti pakeistus stilius ir tuos, kuriuos paveikė bendri failai; leidimui – visus. CI nekuria commitų ir neperrašo bazinių vaizdų, kad paslėptų klaidą.

**Priimti:** tyčinis sugadinimas lokaliame fixture sustabdo atitinkamą patikrą; darbiniai šaltiniai praeina; dokumentuota kaip atnaujinti preview canonical aplinkoje. „CI paruoštas“ ir „GitHub CI praėjo“ žymimi atskirai.

### S04–S12 – Pirmas katalogo leidimas

**Priklauso:** P04 ir parengti P08 vartai; vykdyti po vieną pagal 5 skyriaus eilę.**

Po S06, S09 ir S12 atnaujinti bendrą peržiūrų rinkinį ir trumpai patikrinti, ar nauji stiliai nesusiliejo su esamais. Taisyti tik konkretų nustatytą panašumą. Šie patikrinimai įtraukti į atitinkamos S kortelės apimtį.

### P09 – Agentų adapteriai ir suderinamumo matrica

**Priklauso:** P05 ir P08; gali būti atliekama dar nebaigus S04–S12.

**Keisti:** adapterių generatorių, tik patikrintus generuojamų adapterių kelius, `docs/compatibility.md` ir susijusias README instrukcijas.

**Veiksmai:** patikrinti oficialią Claude Code, Codex ir IBM Bob dokumentaciją. Registruoti datą, šaltinio URL, įrankio versiją, projekto ir išorinio katalogo naudojimo skirtumus. Sugeneruoti plonus adapterius iš vieno šaltinio. Išorinį katalogą naudojanti instrukcija turi turėti aiškų repo root nustatymą; nepalikti nutrūkstančių santykinių kelių nukopijavus skill.

**Patikros:** bazinis promptas veikia be adapterio; įrankio adapteris neperrašo tikslinio projekto esamų instrukcijų; generacija deterministinė. Kiekvienam įrankiui atskiri statusai: documented, generated, smoke-tested, not-tested. Nevadinti pilnai palaikomu vien dėl failo buvimo.

**Priimti:** suderinamumo matrica sąžininga; nedubliuojami 24 stilių tekstai kiekvienam adapteriui; nepasiekiamo agento runtime netampa kliūtimi universaliam naudojimui.

### P10 – Realus naudojimo kitame projekte bandymas

**Priklauso:** P09, P07 ir S12.

**Keisti:** `docs/benchmarks/`, konkrečias nustatytas instrukcijų ar stilių klaidas.

**Veiksmai:** parengti 3 fiksuotus briefus: paslaugų įmonė be nuotraukų; fotografijomis paremtas portfolio; informacijos ar produktų katalogas. Su realiai prieinamu tiksliniu mažesniu agentu išbandyti pasirinkimą ir svetainės įgyvendinimą atskirame laikiname projekte. Bent vieną tą patį briefą įgyvendinti 3 skirtingomis katalogo kryptimis. Papildomai išbandyti vieną platformos adaptaciją, kai pakeičiama technologija, bet išlaikomi stiliaus bruožai.

**Priimti:** agentas surado teisingus failus, pasiūlė egzistuojančius stilius, išlaikė pasirinktus bruožus; trijų svetainių kompozicijos skiriasi. Įrašyti agentą, versiją/modelį, repo commit, tikslų promptą, kas iš tikrųjų paleista ir rezultatą. Jei tikslinio agento nėra, parengti bandymo paketą ir pažymėti `blocked` tik realaus bandymo dalį; nesukurti išgalvoto dialogo kaip įrodymo.

### P11 – Vieša dokumentacija ir papildymo eiga

**Priklauso:** P10; neįvykusio bandymo apribojimus galima dokumentuoti, bet neslėpti.

**Keisti:** `README.md`, `README.lt.md`, `CONTRIBUTING.md`, `THIRD_PARTY_NOTICES.md`, PR šabloną.

**Veiksmai:** README pradžioje tikslas, preview galerija ir vienas kopijuojamas naudojimo promptas. Toliau – vietinis paleidimas, patikros, ribos, licencijos. CONTRIBUTING paaiškina naujo stiliaus skiriamumo kriterijus, šaltinių teises ir vieno stiliaus PR eigą.

**Priimti:** naujas vartotojas gali pradėti iš README be viso įgyvendinimo plano skaitymo. Nėra pažadų „garantuotai originalu“, nepagrįstų agentų palaikymo ar WCAG ženklelių.

### P12 – 12 stilių leidimo paruošimas

**Priklauso:** S12 ir P08–P11; realus vartojimo bandymas turi būti atliktas, kad leidimas būtų vadinamas patikrintu.**

**Keisti:** versijos metaduomenis, changelog, Pages build/deploy workflow, reikalingas publikavimo nuostatas.

**Veiksmai:** patikrinti 12 stilių / 24 variantų / 48 preview apskaitą, clean clone veikimą, nuorodas, subpath ir licencijas. Jei įgaliotas ir turi prieigą – sukurti/paskelbti viešą repo bei galeriją. Kitaip pateikti tikslų publikavimo veiksmą su jau paruoštais failais.

**Priimti:** `0.1.0` paketas parengtas, visų realiai vykdytų patikrų įrodymai išsaugoti. Publikavimo atveju atvertas tikras galerijos URL ir bent vienas pavyzdys, ne vien sėkmingas deploy logas.

### S13–S24 – Plėtra iki pilno katalogo

**Priklauso:** priimtas 12 stilių katalogas; repo publikavimo teisių laukimas neturi blokuoti vietinio turinio darbo.**

Vykdyti po vieną. S15, S18, S21 ir S24 užbaigime atlikti artimiausių stilių palyginimą. Kiekvienas naujas įrašas turi aiškų skirtumą nuo jau esančių, ypač 5 skyriuje įvardytų artimų porų.

### P13 – 24 stilių įvairovės ir naudojimo auditas

**Priklauso:** S24, P10.

**Keisti:** `docs/evidence/catalog-review.md`, benchmark rezultatų atnaujinimą ir tik aptiktas stilių problemas.

**Veiksmai:** bendras 24 pagrindinių desktop ir mobile peržiūrų palyginimas; visų artimų porų vertinimas; likusių B variantų patikra. Pakartoti tik tuos P10 scenarijus, kuriuos paveikė turinio ar atrankos pokyčiai. Jei matosi ta pati kompozicija su skirtingomis dekoracijomis, taisyti konkretų įrašą.

**Priimti:** kiekvienas stilius turi artimiausio palyginimo įrodymą, priėmimo balą ir pažymėtą vizualinę peržiūrą. Metaduomenų skirtumai nepakeičia vaizdų patikros.

### P14 – Galutinis leidimas ir perdavimas

**Priklauso:** P13 ir visi taikomi leidimo vartai.

**Veiksmai:** patikrinti 24/48/96 skaičius, pakartojamą build, galerijos paiešką ir prompto kopijavimą; pašalinti netyčia paliktus laikinus failus; atnaujinti README, changelog ir progresą. Prieš viešą push patikrinti, kad nėra privačių projektų duomenų ar raktų. Versija `1.0.0` tik jei visi šio plano kriterijai įvykdyti; kitu atveju aiškiai įvardytas prerelease.

**Priimti:** galutinis trumpas perdavimas nurodo repo, galeriją, versiją, stilių kiekį, tikrai išbandytus agentus ir likusius apribojimus. Nėra nepaaiškintų TODO, neveikiančių nuorodų ar nepagrįstų PASS.

## 11. Bendra vieno stiliaus S kortelė

Šią kortelę P01 išskleidžia į S01–S24, įrašydamas konkretų ID, kryptį, A/B kompozicijas ir artimiausius stilius iš 5 skyriaus.

**Tikslas:** vienas pilnas stilius. **Failų riba:** `styles/<id>/`, jo generated įrašai, jo progreso įrašas ir kokybės įrodymas. Bendrų schemų ar galerijos pertvarkymas į šią užduotį neįeina.

**Skaityti tik:** savo kortelę, duomenų kontraktą, šabloną, rubriką ir iki dviejų artimiausių stilių. Pradžioje nereikia skaityti viso repo.

**Veiksmai:**

1. Užrašyti 3–5 išsaugomus bruožus ir konkretų skirtumą nuo artimiausių stilių.
2. Parengti A ir B kompoziciją bei realistišką turinį. Naudoti skirtingą turinio struktūrą, ne perstumdytas tas pačias korteles.
3. Užpildyti tokenus, aprašą, layouts ir assetų registrą.
4. Sukurti abu veikiančius reference puslapius. Vaizdų reikalaujančiam stiliui naudoti teisėtus kokybiškus assetus; pilki placeholderiai nėra baigtas rezultatas.
5. Paleisti style validation, build ir pasirinkto stiliaus previews.
6. Patikrinti 360/768/1440 pločius, lietuviškus simbolius, focus, reduced motion, vaizdų užkrovimą ir funkcinius valdiklius.
7. Peržiūrėti visus 4 preview, palyginti su artimiausiu stiliumi ir užpildyti rubriką.
8. Pažymėti `ready` tik kai viskas atlikta; perkurti indeksą ir galeriją; užrašyti perdavimą.

**Baigta, kai:** visi privalomi failai egzistuoja, abi kompozicijos užbaigtos, 4 preview aktualūs, teisės aiškios, patikros praeina ir vizualinis balas pakankamas. Nepavykus vienai patikrai – `review` arba `blocked`, ne `done`.

**Nedaryti:** nepridėti kito stiliaus, nekeisti esamų priklausomybių be būtinybės, neperrašyti gallery UI, nekurti papildomų 5–10 variantų, nekopijuoti svetimo prekės ženklo.

## 12. Vykdymo tvarka ir darbų registras

Pagrindinė seka:

1. P01 → P02 → P03.
2. S01 → S02 → S03 → P04: pilotas.
3. P05 → P06 → P07 → P08.
4. S04 → S05 → S06 → S07 → S08 → S09 → S10 → S11 → S12.
5. P09 → P10 → P11 → P12: pirmas naudotinas leidimas.
6. S13 → … → S24.
7. P13 → P14: pilnas leidimas.

Numatytas darbas nuoseklus. Jei vartotojas vėliau nori kelių lygiagrečių vykdytojų, kiekvienam skirti atskirą stiliaus aplanką; bendrus generated failus integruoja vienas vykdytojas. Vienas stilius negali būti vienu metu redaguojamas dviejų agentų.

`docs/progress.json` yra vienintelė užduočių būsenų vieta. Kiekvieno įrašo laukai: `id`, `status`, `depends_on`, `branch`, `base_commit`, `evidence_commit`, `checks`, `evidence_paths`, `blocker`, `next_action`. Būsenos: `todo`, `in_progress`, `review`, `done`, `blocked`. Kiekviena patikra: `pass`, `fail` arba `not_run`. `evidence_commit` gali likti null, kol nėra commit; draudžiama išgalvoti SHA. Baigus commit, jo įrodymas gali būti užregistruotas kitu trumpu dokumentaciniu commit, kad nereikėtų savireferencinio hash.

Vienos užduoties agento atsakymas vartotojui:

```text
P03 — DONE
Pakeista: preview generatorius ir jo manifestas.
Patikra: fixture render ir pasenusių preview aptikimas — PASS.
Commit / PR: <tikras identifikatorius arba „nesukurtas“>.
Toliau: S01.
```

Jei užblokuota: vienas konkretus blokatorius, kas jau paruošta ir koks vienas veiksmas jį pašalins. Neslėpti klaidos ilgoje ataskaitoje. Jei buvo 2 nesėkmingi tos pačios klaidos taisymai, suformuoti mažą diagnostinį perdavimą, užuot pradėjus didelį refaktoringą. Tai ne stabdymas dėl įprastų pasirinkimų: įprastą HTML/CSS sprendimą agentas priima pats.

## 13. Komandų sutartis

P02–P08 įgyvendina šiuos komandų pavadinimus. Iki jų sukūrimo tai specifikacija, ne teiginys apie jau veikiančius skriptus.

| Komanda | Paskirtis |
|---|---|
| `npm ci` | Įdiegti lockfile užfiksuotas priklausomybes |
| `npm run validate` | Tikrinti šaltinių kontraktą ir semantinius ryšius |
| `npm run validate -- --style <id>` | Ribota vieno stiliaus patikra |
| `npm run build` | Tokenų CSS, indeksai, adapteriai ir galerija; be screenshot generavimo |
| `npm run previews -- --style <id>` | Vieno stiliaus 4 peržiūros ir manifest |
| `npm run previews -- --all` | Visų stilių peržiūros canonical aplinkoje |
| `npm run check` | Generated drift, preview freshness ir visas failų kontraktas |
| `npm run test:unit` | Parserių, generatorių ir kontrakto klaidų testai |
| `npm run test:browser -- --style <id>` | Vieno stiliaus browser patikra |
| `npm run test:browser` | Galerija ir visi ready stiliai |
| `npm run dev` | Vietinė galerija ir reference puslapiai |

Naujo stiliaus ciklas: draft šaltiniai → validate → build → previews → browser ir vizualinė peržiūra → ready → build → check. Jei statusas daro įtaką screenshot hash šaltinių rinkiniui, po statuso pakeitimo perkurti atitinkamą manifest/peržiūras; generatorius tai turi aiškiai nurodyti.

Priklausomybės minimalios: Node įrankiai, YAML parseris, JSON Schema validatorius, Playwright, prieinamumo tikrinimo įrankis. Konkrečias suderinamas versijas įgyvendintojas pasirenka ir fiksuoja lockfile; „latest“ nenaudoti kaip nekontroliuojamo CI įėjimo.

## 14. Kopijuojami pavedimai agentams

### Pirmas pavedimas

```text
Įgyvendiname Web Style Atlas – viešą web-style-atlas repo su skirtingomis
svetainių dizaino kryptimis AI agentams. Pridedu įgyvendinimo planą.

Šiame pavedime atlik tik P01. Pirmiausia patikrink tikrą checkout, šaką,
HEAD, esamas instrukcijas ir necommitintus pakeitimus. Jei repo jau turi
karkasą, išsaugok tinkamą darbą ir pritaikyk jį planui.

Išsaugok planą kaip docs/implementation-plan.md. Sukurk P01 nurodytą
kontraktą, šabloną, 38 užduočių korteles ir docs/progress.json.
Nepradėk P02, nekurk visų stilių, nepublikuok repo šiuo pavedimu.
Neklausk patvirtinimų dėl įprastų, grįžtamų įgyvendinimo pasirinkimų.

Baigęs pateik tik būseną, svarbiausią patikrą, tikrą commit/PR jei yra
ir kitą užduotį. Nežymėk neatliktų patikrų kaip PASS.
```

### Kiekvienos kitos užduoties pavedimas

```text
Tęsk web-style-atlas. Atlik tik užduotį <TASK_ID>.
Perskaityk repo instrukcijas, docs/progress.json ir docs/tasks/<TASK_ID>.md.
Iš plano skaityk tik šiai kortelei reikalingus skyrius.

Patikrink, kad priklausomybės baigtos ir checkout atitinka realų darbą.
Laikykis kortelės failų ribų. Nekurk papildomų funkcijų ir nepradėk
kitos užduoties. Įprastus sprendimus priimk pats.

Atlik kortelės patikras. Vizualinę peržiūrą žymėk atlikta tik jei
tikrai matei renderintus vaizdus. Atnaujink tik savo progreso įrašą,
pridėk trumpą įrodymą ir perduok rezultatą iki 5 eilučių.
```

### Tikslinio vartotojo svetainės pavedimas, kai katalogas parengtas

```text
Sukurk man <SVETAINĖS PASKIRTIS> svetainę su <TECHNOLOGIJA AR PLATFORMA>.
Dizaino krypčių ieškok <REPO_URL>.
Pirmiausia perskaityk START_HERE.md ir catalog/index.json.
Parodyk 3 mano užduočiai tinkamas, vizualiai skirtingas kryptis su
tikromis jų peržiūromis arba galerijos nuorodomis ir trumpai paaiškink skirtumus.
Man pasirinkus perskaityk pasirinkto stiliaus instrukcijas ir pavyzdžius,
tada pritaikyk mano turiniui bei patikrink desktop ir mobile vaizdą.
```

Jei vartotojas nenori rinktis, paskutiniame prompte pasirinkimo sakinius pakeisti: „Pats pasirink tinkamiausią kryptį, trumpai nurodyk pasirinkimą ir iškart įgyvendink.“

## 15. Kaip taupyti vykdymo kainą neprarandant kokybės

- Mažesni agentai tinka aiškioms kortelėms: schemos, generatorius, vienas stilius, vienas bugfix. Jiems nepavesti iš naujo spręsti viso produkto architektūros.
- Stipresnio vertinimo labiausiai reikia P04, P10 ir P13: ar stiliai iš tikrųjų skiriasi ir ar pigesnis agentas gali juos pritaikyti. Gali vertinti žmogus arba tinkamą vaizdų peržiūrą turintis agentas; modelio pavadinimas savaime kokybės negarantuoja.
- Vieno stiliaus kūrimo kontekste – jo kortelė, kontraktas ir artimiausi palyginimai, ne 24 pilni aprašai.
- Taisant vieną stilių generuoti tik jo preview. Pilną katalogo render atlikti keičiant bendrus render šaltinius arba leidimo vartams.
- Naudoti vieną schema v1. Schema plėsti tik kai realus stilius netelpa į kontraktą; migraciją vykdyti atskira aiškia užduotimi.
- Kai testas neprieinamas, fiksuoti konkrečią trūkstamą galimybę. Nekartoti nepavykstančio to paties bandymo be naujos informacijos.
- Naują stilių priimti pagal veikiančius pavyzdžius. Ilgesnis aprašas nepakeičia blogos kompozicijos.

## 16. Galutiniai priėmimo kriterijai

Projektas baigtas, kai:

- Yra 24 ready stiliai, 48 reference puslapiai ir 96 aktualūs preview.
- Kiekvienas stilius turi praktinį aprašą, tokenus, A/B kompozicijas ir teisių apskaitą.
- Galerija leidžia rasti, palyginti ir perduoti pasirinktą stilių agentui.
- Vienodų bazinių layout kopijų nepateikiame kaip skirtingų stilių.
- Vieno brief'o 3 skirtingomis kryptimis įgyvendinti puslapiai parodo realią įvairovę.
- Bent vienas realiai naudojamas mažesnis agentas išbandytas kitame projekte; kitų įrankių patikrinimo lygis aiškiai nurodytas.
- Clean clone build, šaltinių validacija, browser patikros ir vizualinės peržiūros turi tikrus įrodymus.
- Vieši failai neturi privačių projektų medžiagos; licencijos atitinka realius assetus.
- README pateikia vieną paprastą pradžios promptą, tikras nuorodas ir aiškų naujo stiliaus pridėjimo kelią.

## 17. Techninių sprendimų šaltiniai ir patikros ribos

Toliau – oficialūs šaltiniai, peržiūrėti rengiant planą 2026-10-20. Jie pagrindžia siaurus techninius principus; 24 stilių pasirinkimas, užduočių struktūra ir priėmimo balai yra šio projekto sprendimai.

- [Claude Code skills](https://code.claude.com/docs/en/skills): skills instrukcijos ir pasirinktinai įkeliami pagalbiniai failai. P09 patikrina konkrečiai naudojamos versijos projekto ir išorinio katalogo elgseną.
- [IBM Bob skills](https://bob.ibm.com/docs/ide/features/skills): skill deklaravimas ir įkėlimas. P09 patikrina adapterio formatą ir bandymo aplinką.
- [Playwright visual comparisons](https://playwright.dev/docs/test-snapshots): render aplinka turi įtakos screenshot rezultatui; dėl to peržiūrų generavimui numatyta fiksuota aplinka.

Codex adapterio aktualus formatas šiame dokumente nepatvirtinamas; jo oficialios dokumentacijos ir realaus įkėlimo patikra yra P09 dalis. Nė vieno įrankio adapteris šiame planavimo etape dar nesukurtas ar neišbandytas.
