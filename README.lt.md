# Web Style Atlas — kaip išbandyti

**1.4.0 versija:** 50 dizaino krypčių, kiekviena su dviem veikiančiais maketo
variantais (A ir B), ir 200 aktualių kompiuterio bei telefono peržiūrų.
Visų krypčių puslapiai ir kūrimo promptai dabar yra anglų kalba;
žr. [leidimo aprašą](docs/releases/1.4.0.md).
[Darbų būsena](docs/STATUS.md) saugo tikrus patikrų rezultatus.

**[Atidaryk viešą galeriją](https://lmatukas.github.io/web-style-atlas/).**
Publikavimo paleidimas ir gyvos svetainės patikros įrašomi
[1.4.0 leidimo apraše](docs/releases/1.4.0.md). Ankstesnė
[1.3.0](docs/releases/1.3.0.md), [1.2.0](docs/releases/1.2.0.md), [1.1.0](docs/releases/1.1.0.md) ir [1.0.0](docs/releases/1.0.0.md) istorija išsaugota.

Visas 50 krypčių jau galima naudoti iš [katalogo](catalog/index.md) arba
paleisti vietinę galeriją. [Tikra kompiuterio peržiūra](styles/swiss-grid/preview.png)
ir [telefono peržiūra](styles/swiss-grid/preview-mobile.png).

## Pilni kūrimo promptai

[50 pilni kūrimo promptai](prompts/README.md) turi veikiančius krypčių
pavyzdžius. Galerijoje pasirink kryptį ir A/B variantą, spausk
**Copy full creation prompt**, įrašyk savo projekto duomenis ir perduok visą
tekstą agentui. Išlieka objekto, sąveikų, judesio ir vykdymo reikalavimai;
neveikiant iškarpinei galima nukopijuoti ranka. Kitos kryptys išlaiko trumpą
pasirinkimo promptą.

## Paprasčiausias praktinis bandymas

Atidaryk atskirą naujos svetainės projektą savo programavimo agente ir įklijuok
šį promptą, pakeitęs laužtiniuose skliaustuose esančius duomenis:

```text
Šiame projekte sukurk [svetainės paskirtis] svetainę su [technologija / platforma].
Auditorija, turinys, esamas prekės ženklas ir turimos nuotraukos: [trumpas briefas].
Dizaino krypčių ieškok https://github.com/lmatukas/web-style-atlas.
Perskaityk START_HERE.md vartotojo kelią ir catalog/index.json viename repo commit.
Parodyk iki trijų tinkamų, vizualiai skirtingų paruoštų krypčių su tikromis
peržiūromis, trumpu pagrindimu ir vienu kompromisu. Man pasirinkus perskaityk tik
pasirinktos krypties instrukcijas bei pavyzdžius. Išlaikyk jos 3–5 skiriamuosius
bruožus, pritaikyk mano turinį ir esamą prekės ženklą. Įrašyk design-decision.md
su repo commit, stiliaus ID, A/B variantu, pakeitimais ir naudojamų failų teisėmis.
Sukurk veikiančią svetainę šiame projekte. Patikrink nuorodas, valdiklius,
kompiuterio ir telefono vaizdą. Atlaso nekeisk ir jo užduoties neregistruok.
```

Jei nenori rinktis, pasirinkimo sakinį pakeisk į „Pats pasirink tinkamiausią
paruoštą kryptį ir iškart įgyvendink.“ Galima nurodyti ir konkretų katalogo ID bei
A/B variantą. Agentui reikia prieigos prie repo arba atitinkamų failų;
viena nuoroda automatiškai neįdiegia įgūdžio.

Pirmam bandymui pakanka mažos vieno puslapio paslaugų svetainės be nuotraukų.
Patikrink, ar agentas pasiūlė tikras kryptis, ar pasirinkti bruožai matomi
rezultate, ar veikia nuorodos ir ar telefonas gauna patogų išdėstymą.

## Galerija savo kompiuteryje

Reikia Node.js 24 ir npm:

```sh
git clone https://github.com/lmatukas/web-style-atlas.git
cd web-style-atlas
npm ci
npm run build
npm run dev
```

Atidaryk **http://127.0.0.1:4173/**. Galima filtruoti, perjungti A/B ir
Desktop/Mobile, palyginti iki trijų krypčių ir pasirinkus spausti
**Copy selection prompt**. Į kopiją pridėk savo briefą ir perduok agentui.
Paleidimas naudoja esamas peržiūras; Chromium galerijai nereikalingas.

## Kas patikrinta ir kokios ribos

[P10 bandyme](docs/benchmarks/p10/RESULTS.md) tikras mažesnis agentas sukūrė
šešias atskiras svetaines: tris fiksuotus briefus, vieną briefą trimis kryptimis
ir React adaptaciją. Galutiniai rezultatai patikrinti 360, 768 ir 1440 px
pločiuose. Išsaugoti tikslūs promptai, šaltiniai, aptikti trūkumai ir pataisymai.
Tai ne visų modelių ar jų vietinių programų suderinamumo garantija; tikslų lygį
rodo [suderinamumo lentelė](docs/compatibility.md).

[P17 audite](docs/benchmarks/p17/README.md) trys atskiri pervadinti projektai
praktiškai patikrino WebGL šviestuvą, HTML dienos planuoklį ir vartotojo
paleidžiamą sintezuotą garsą. Išsaugoti tikslūs pilni promptai ir failų maišos.
Tai to paties autoriaus pakartojimai, o ne nauji nepriklausomo modelio bandymai.

Automatinės prieinamumo patikros nepakeičia pilnos WCAG peržiūros. Pavyzdžių
įmonės ir duomenys išgalvoti; realias formas, mokėjimus ir kitas integracijas
reikia įgyvendinti savo projekte. Originalumui ar tinkamumui visiems prekės
ženklams garantijos nėra.

Nuosavas kodas ir tekstai licencijuoti [MIT](LICENSE). Nuotraukoms galioja jų
atskiros teisės: perskaityk pasirinkto stiliaus `assets.json`, teisių failą ir
[pranešimus](THIRD_PARTY_NOTICES.md). Šrifto failų nepridedame.

[English README ir patikrų komandos](README.md) ·
[Naujo stiliaus papildymo eiga](CONTRIBUTING.md).
