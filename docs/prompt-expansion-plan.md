# 15 kūrimo promptų ir galerijos plėtros planas

## Rezultatas

Svetainės kūrimo promptas yra katalogo turinys: lankytojas pamato realų rezultatą,
pasirenka kryptį ir A/B, pritaiko ją savo projektui ir kopijuoja pilną kūrimo
užduotį. Pagal visus 15 promptų bus kuriami ir viešoje galerijoje publikuojami
veikiantys vizualūs pavyzdžiai, įskaitant nurodytą judesį ir tikras funkcijas.

Dabar patikrinta ir paskelbta 1.0.0: **24 kryptys / 48 puslapiai / 96 PNG**.
Šis planavimo pakeitimas paruošia **15 pilnų viešų promptų ir 19 naujų užduočių**.
Jis dar nesukuria naujų reference puslapių ir nekeičia dabartinio ready skaičiaus.
Priėmus visą etapą bus **39 kryptys / 78 A/B puslapiai / 156 PNG**. PNG padeda
pasirinkti kryptį, o judesys išbandomas veikiančiame puslapyje.

## Kas paruošta šiame pakeitime

- 15 koreguotų savarankiškų LT promptų `prompts/<style-id>/prompt.lt.md`.
- Projekto pritaikymo laukai: prekės ženklas, veikla, auditorija, turinys,
  technologija ir A/B. Palikti konkretūs objektai, paletės, keturi judesio
  epizodai ir pilnos funkcijos. Pradinė demonstracija lieka naudotina iš karto.
- Kiekvienam promptui numatytas B su kita struktūra bei naudojimo eiga.
- Vienas [promptų registras](../prompts/index.json), 19 tikrų kortelių ir
  atnaujintas canonical darbų registras. Pradiniai 38 priimti darbai išsaugoti.
- Registro schema praplečiama vėlesniems etapams; tikslus 38 užduočių maksimumas
  panaikinamas, išsaugant per-task kontraktą, originalius ID ir priklausomybes.

## Vieša ir privati medžiaga

Vieši yra šie sutvarkyti kūrimo promptai, jų nauji krypties pavadinimai,
įgyvendinimo kortelės, galutiniai stiliai ir jų veikiantys pavyzdžiai. Vartotojas
gaus patį pilną promptą, o ne nuorodą į pradinį dokumentą.

Pradinis pateiktas failas, jo pavadinimas ir jo įkvėpimo šaltinių atitikmenys
lieka už viešo repo ribų. Jie nekopijuojami į repo, Git istoriją, dist ar galeriją.
Viešoms versijoms pašalinti šaltinių vardai, URL, palyginimo su tais vardais
instrukcijos ir priklausomybė nuo jų pasiekiamumo. Būsimas vykdytojas gali dirbti
vien su repo esančiu parengtu promptu; jam nereikia privataus failo.

Tai nepanaikina pareigos nurodyti tikrų naudojamų nuotraukų, modelių, šriftų ir
garsų teises. Jei toks išteklius naudojamas, jo kilmę užrašyti įprastoje teisių
apskaitoje. Demonstraciniai pavadinimai nėra tikrų įmonių, klientų ar pažadų įrodymai.

## Failų vietos

| Medžiaga | Canonical vieta | Kada naudojama |
|---|---|---|
| Pilnas viešas kūrimo promptas | `prompts/<id>/prompt.lt.md` | Galima skaityti ir naudoti dabar |
| 15 briefų ryšys su taskais | `prompts/index.json` | Planavimo ir būsimam build ryšiui; nėra ready katalogas |
| Reali darbų eiga | `docs/progress.json`, generated `docs/STATUS.md` | Viena aktyvi užduotis, tikras PR ir merge įrodymas |
| Vienos krypties užduotis | `docs/tasks/S25.md` … `S39.md` | Įgyvendinant atitinkamą promptą |
| Užbaigtas stiliaus paketas | `styles/<id>/` | Sukuriamas tik atitinkamame S darbe |
| A/B pavyzdžiai | `styles/<id>/reference/index.html`, `alternate.html` | Du skirtingi veikiantys maketai |
| Kompiuterio ir telefono PNG | Keturi įprasti `preview*.png` kiekvienam stiliui | Tik po realaus render ir vaizdų peržiūros |
| Paruošti pasirinkimai | Generated `catalog/index.json` | Tik priimti ready stiliai; planned briefų nepridėti |

S užduotyje pilnas promptas skaitomas kaip kuriamo pavyzdžio kūrybinis briefas.
Jo nurodymai „kurk vartotojo projekte“ ir „atlaso nekeisk“ skirti galutiniam
promptą kopijuojančiam vartotojui. Atlaso vykdytojas pavyzdžius kuria savo S kortelės
`Allowed changes` ribose, t. y. `styles/<id>/reference/`; tai nėra leidimas keisti
nesusijusį atlaso kodą. Promptų vartotojas savo tikslinę svetainę kuria atskirai.

P15 turi aiškiai apibrėžti, kaip ready stilius nurodo savo pilną promptą ir kaip
build jį pateikia dist. Esamų 24 stilių nereikia pervadinti ar perkurti; jų dabartinė
pasirinkimo instrukcija lieka veikianti. Visos 15 naujų krypčių gauna pilną promptą.

## 19 užduočių eiga

| Etapas | Užduotis | Rezultatas |
|---|---|---|
| 1 | [P15](tasks/P15.md) — pilni promptai | Kontraktas, saugus failo ryšys, dist, peržiūrėjimas ir pilno teksto kopijavimas |
| 2 | [P16](tasks/P16.md) — judesio pagrindas | Tikro 3D/audio, normal/reduced/fallback ir stabilių PNG patikrų eiga |
| 3 | S25–S39 po vieną | 15 originalių krypčių, kiekvienai po A/B, keturi PNG ir tikros funkcijų/judesio patikros |
| 4 | [P17](tasks/P17.md) — auditas | Įvairovė, artimos poros, pilnų promptų kopijos ir trys realūs pritaikymo scenarijai |
| 5 | [P18](tasks/P18.md) — leidimas | Švarus klonas, viso katalogo vartai, 39/78/156 ir patikrintas viešas diegimas |

Canonical seka: **P15 → P16 → S25 → … → S39 → P17 → P18**.
Kiekvienam darbui — atskiras nedidelis PR ir tikri įrodymai; po sujungimo
registruojamas priėmimas. Vien planavimo pakeitimas nei paleidžia, nei publikuoja
15 svetainių. Būsimas prašymas „atlik kitą užduotį“ turi atrinkti P15.

## 15 krypčių

| [S25](tasks/S25.md) | Acoustic Sculpture — Vėjo archyvas | Septynių vario plokštelių instrumentas ir erdvių istorija | Garso charakterio dirbtuvė su scenarijų palyginimu |
| [S26](tasks/S26.md) | Seasonal Terrain — Dirvos ratas | Dirvos pjūvis ir sezoninis pasakojimas | Sezonų kalendorius su krepšelio surinkimo eiga |
| [S27](tasks/S27.md) | Resonant Ribbon — Garso juosta | Vienos medinės juostos gamybos pasakojimas | Trijų instrumentų makrogalerija ir charakterio parinkiklis |
| [S28](tasks/S28.md) | Modular Light — Kinta | Modulinio šviestuvo katalogo atvartas | Surinkimo darbastalis su numeruota išklotine |
| [S29](tasks/S29.md) | Twilight Expedition — Aukščio linija | Panorama nuo sutemų iki nakties ir trys atvykimo skyriai | Reljefo maršrutų atlasas su laiko ir sustojimų planu |
| [S30](tasks/S30.md) | Light Environments — Rūko salė | Trijų skirtingų erdvių parodos pasakojimas | Asmeninio parodos maršruto sudarymo stalas |
| [S31](tasks/S31.md) | Discovery Cabinet — Sėklų kabinetas | Radialus šešių sėklų indelių stalas | Vertikalus atradimų stalčius ir kolekcijos padėklas |
| [S32](tasks/S32.md) | Woven Field — Pluošto ritmas | Kūrybinis audimo sąsiuvinis su siūlų lauku | Rašto kūrimo studija ir dideli kolekcijos mėginiai |
| [S33](tasks/S33.md) | Choreographic Stage — Šuolio studija | Asimetrinė judesio scena ir trys pasirodymų skyriai | Formato ir patirties vedama užsiėmimų programa |
| [S34](tasks/S34.md) | Repair Atlas — Rytojaus daiktai | Surinkimo ir išardymo krėslo istorija | Šešių objektų medžiagų katalogas ir remonto maršrutas |
| [S35](tasks/S35.md) | Balcony Builder — Želmuo | Ryškus sodinimo dėžės pasiūlymas ir auginimo eiga | Trijų žingsnių balkono rinkinio parinkimo dirbtuvė |
| [S36](tasks/S36.md) | Rhythm Planner — Taktas | Tipografinis laikrodis ir produkto demonstracija | Laiko juostos darbastalis su trijų užduočių redaktoriumi |
| [S37](tasks/S37.md) | Spine Editions — Raštmė | Knygos nugarėlės viršelis ir trys teminės lentynos | Ištraukų skaityklė su leidinių indeksu ir skaitymo sąrašu |
| [S38](tasks/S38.md) | Trail Composer — Keliata | Vertikali tako schema ir išvykos nuotaikos | Dienos plano lentelė su susietais sustojimais ir pasiruošimu |
| [S39](tasks/S39.md) | Membrane Score — Tarpsnis | Horizontali trijų šviesos membranų partitūra | Nuotaikų receptų indeksas ir trijų vertikalių kanalų instrumentas |

## Ką matys galerijos lankytojas

Patikrintai krypčiai pateikti pavadinimą, trumpą naudą, tikrą peržiūrą, A/B ir
Desktop/Mobile pasirinkimą. Veiksmas „Atverti pavyzdį“ atidaro tikrą puslapį su
animacijomis ir valdikliais. „Kopijuoti kūrimo promptą“ kopijuoja pilną konkrečios
krypties tekstą su pasirinktu A/B ir projekto pritaikymo laukais. Pilną tekstą
reikia galėti peržiūrėti prieš kopijuojant ir pasiekti klaviatūra.

Kortelių tinklelis lieka lengvas: ten nesisuka 39 WebGL scenos ir nepasileidžia
garsas. Animacija veikia pasirinkto pavyzdžio puslapyje. Pradinis failų rinkinys,
privatūs šaltinių vardai ir vidinė darbo istorija į vartotojo kelią nepatenka.

## Vienos krypties priėmimas

1. **Tikras vizualus rezultatas.** Konkretus originalus objektas, aiški tipografija
   ir kompozicija; A/B skiriasi struktūra, turinio ritmu ar naudotojo eiga.
   Artimiausių esamų ir jau paruoštų naujų krypčių palyginimas apima bent tris
   dimensijas, bent viena struktūrinė. Esama rubrika: ≥10/12, nė vieno nulio,
   atpažįstamumas ir skirtumas nuo artimiausio po 2.
2. **Tikras judesys.** Išbandyti prompte nurodytus epizodus įprastu režimu,
   po veiksmo nusistovinčią būseną ir sustabdymą. Vien statinis kadras neįrodo
   animacijos. Privalomo WebGL negalima pakeisti vien CSS imitacija ir užrašyti
   PASS; nepasiekiamą būtiną patikrą užrašyti kaip blokatorių.
3. **Tikra funkcija.** Valdikliai keičia modelį, laikus, maršrutą, receptą ar
   užklausą; eksportas turi realų turinį, klaidos aiškios. Viskas, kas be backend,
   sąžiningai pristatoma kaip vietinė demonstracija. Garso start/pause/mute tikri,
   garsas prasideda tik vartotojo veiksmu.
4. **Prieinamumas ir telefonas.** 360, 390, 768 ir 1440 px, klaviatūra ir fokusas,
   lietuviški ženklai, reduced-motion. Be būtinos grafinės ar garso API išlieka
   HTML turinys ir pagrindinės funkcijos; pakaitalas aiškiai įvardytas.
5. **Aktualūs failai.** Visi privalomi aprašai, tokenai, A/B, assetų teisės,
   keturi tikrai peržiūrėti ir aktualūs PNG bei pilnas kūrimo promptas. Tik tada
   ready įrašas ir scope galerijos integracija.

## Kaip taupyti resursus

Taikyti esamą COST_POLICY. Pavyzdžiai ir eksportuojami pasirinkimai turi veikti
statiškai, be naujo backend, AI API ar mokamo renderinimo serviso. Pasirinkti SVG,
Canvas, CSS ar WebGL pagal konkretų sumanymą; tikro 3D prašančioms kryptims jo
kokybės nesumažinti dėl bendro šablono. Būtinas bibliotekas pateikti lokaliai,
užrakinti jų versijas ir licencijas; runtime CDN nereikalingas.

Kurti ir renderinti po vieną stilių. Keturi PNG po ≤1 MiB, vienas assetas ≤5 MiB,
visa versioned media ≤100 MiB. Necommitinti test video, traces, archyvų, dist ar
node_modules. Bendri pakeitimai turi išlaikyti provenance; reikalingo hash
atnaujinimo neapeiti. Pilną katalogo patikrą vykdyti realiame bendro pakeitimo ar
leidimo varte; žalios patikros be priežasties nekartoti.

## Publikavimo riba

Paruošti 15 promptų ir 19 todo kortelių nereiškia, kad galerijoje yra 39 kryptys.
Šiandien lieka tikri 24 ready. Priimti nauji pavyzdžiai kaupiami main, o naujas
viešas leidimas ruošiamas P18 po audito. Atnaujinti esamą rankinę release eigą;
tracking ir planavimo commitai neturi diegti svetainės. Jei vykdytojo įrankis
negali paleisti publish, P18 pateikia savininkui vieną konkretų veiksmą ir lieka
neužbaigtas iki realaus deploy bei gyvos galerijos patikros.
