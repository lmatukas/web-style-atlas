# Prabangos krypčių kūrimo gairės

Taikoma S52–S62. Pradėk nuo pasirinktos užduoties kortelės: ji nustato
kompoziciją, turinio užduotį, šriftų išimtis ir signatūrinę sąveiką.
`luxury` yra papildoma žyma, o ne nauja šeima ar paruoštos krypties statusas.
Šios gairės nepaverčia esamų ramios estetikos krypčių prabangos kryptimis.

## Aštuoni principai

1. **Vaizdas yra herojus.** Vienas tikras kadras arba originalus 3D objektas
   valdo pirmą ekraną. Scenos aukštis 70–110 svh; pats vaizdas turi likti aiškiai
   matomas bent 70 % pirmo ekrano aukščio ir telefone. Nenaudok ikonų koliažo,
   tuščių paveikslo rėmų ar hero kortelių eilės.
2. **Produktas kaip skulptūra.** Vienas objektas, minkšta kryptinė šviesa,
   aiški medžiaga ir ramus fonas. Kompiuteryje vaizdui skirk 60–75 % pločio,
   tekstui iki 28–36 ch; telefone pirmiausia parodyk objektą ir jo prasmę.
   Puslapiui apie vietą šį vaidmenį atlieka tikra erdvės nuotrauka.
3. **Savi šriftai ir lengvas svoris.** Paprastai rinkis OFL serif antraštėms
   ir ramų OFL sans tekstui, 300–400 svorius. Kortelės išimtis turi pirmenybę:
   S52 naudoja vieną sans šeimą, 600/400, o S54 leidžia siaurą sans vietoj
   serif. Iki 2 šeimų ir 3 svorių; tik vietiniai WOFF2 ir lietuviškos raidės.
4. **Mažos didžiosios etiketės.** 11–14 px, tarpai tarp raidžių 1–5 px,
   virš antraštės arba prie objekto. Nerašyk jomis ilgų pastraipų, kainų
   paaiškinimų ar formos klaidų. Mažas tekstas vis tiek turi būti kontrastingas.
5. **Vienas pagrindinis veiksmas ekrane.** Vienas vizualiai pagrindinis CTA,
   plonas rėmas arba santūri užpildyta forma. Antriniai veiksmai yra nuorodos.
   Formos pasirinkimai ir navigacijos mygtukai gali būti keli, tačiau ne keli
   konkuruojantys pagrindiniai CTA. Paspaudimo plotas bent 44 × 44 px.
6. **Lėtas pasakojimas.** 4–7 prasmingi skyriai, kiekviename viena mintis ir
   aiškus vaizdo vaidmuo. Tarp skyrių 80–160 px kompiuteryje ir 48–80 px
   telefone; paraštės atitinkamai 48–96 px ir 20–28 px. Produktų scenos gali
   būti sticky, bet neleisk užrakinti slinkimo ar klaviatūros fokuso.
7. **Paslauga, ne vien vitrinos vaizdas.** Įgyvendink kortelės užduotį:
   konsultaciją, rezervaciją, konfigūratorių, narystę ar rinkinio sudarymą.
   Pasirinkimai keičia rezultatą, klaidos aiškios, atšaukimas veikia. Patvirtinimas
   aiškiai sako, kad tai vietinė demonstracija; nėra tikro mokėjimo ar siuntimo.
8. **Tamsa scenai, šviesa pasirinkimui.** Tamsios kryptys naudoja juodą,
   grafitą, rašalą ar vyšninį foną ir vieną metalo ar šviesos akcentą.
   Šviesios naudoja kremą, smėlį ar baltą ir vieną gilų akcentą. Nei aukso
   gradientas, nei juodas fonas savaime nėra prabangos įrodymas.

## Tipografijos ir erdvės ribos

| Elementas | Kompiuteris | Telefonas |
| --- | --- | --- |
| Įprasta antraštė | 24–56 px, 300–400 | 24–40 px, 300–400 |
| Viena kampanijos antraštė | Iki 80 px; S52 leidžia 600 | 36–56 px, be nukirstų žodžių |
| Tekstas | 16–20 px, eilutės aukštis 1,5–1,7 | 16–18 px, eilutės aukštis 1,5–1,7 |
| Etiketė | 11–14 px, 1–5 px tarpai | 11–13 px, 1–3 px tarpai |
| Tarpas nuo etiketės iki antraštės | 16–24 px | 12–20 px |
| Tarpas nuo teksto iki CTA | 24–40 px | 20–32 px |
| Pagrindinių CTA matomame ekrane | 1 | 1 |

Naudok `clamp()` ir patikrink 360, 768 ir 1440 px pločius. Dydžiai yra
projektavimo ribos, o ne priežastis slėpti turinį. Tekstas turi veikti didinant
mastelį; ilgoms lietuviškoms etiketėms leisk persikelti į kitą eilutę.

## Tamsios ir šviesios kryptys

Tamsios: S52, S54, S55, S58, S59 ir S62. Šviesios: S53, S56, S57, S60 ir
S61. S52 šviesi pasirinkimo pabaiga nekeičia jo pagrindinės tamsios scenos.

Tamsiame fone rinkis šiltą ar šaltą beveik baltą tekstą; netamsink aprašymų
iki neįskaitomos pilkos. Skaičiai, kainos, pasirenkamos būsenos ir klaidos turi
būti aiškūs. Šviesią paslaugos dalį atskirk erdve ir tipografija, ne ryškia
parduotuvės reklamine juosta. Tamsios rezervacijos gali likti tamsios, jei
jų kontrastas ir aiškumas tokie pat geri.

Šviesiame fone naudok gilią teksto spalvą ir matomas formų ribas. Balta ant
smėlio nėra pakankamas pasirinkimo indikatorius. Medžiaga ir fotografija turi
kurti gylį be didelių pilkų šešėlių, universalių apvalių kortelių ir dekoratyvios
aukso spalvos visur. Abiem režimais: tekstui bent 4,5:1, stambiam tekstui ir
valdiklių riboms bent 3:1; fokusas matomas ir nepridengtas.

## Judesys, teisės ir techninis priėmimas

Judesys lėtas, bet baigtinis: pradinė scena nusistovi per 2 s, vėlesni epizodai
paleidžiami naudotojo veiksmu. Su reduced motion judesio kilpų nėra. Naujas
WebGL deklaruoja `runtime.static_fallback`, rodo tikrą vietinį SVG/PNG su alt
tekstu ir būsena, kai judesys sumažintas arba WebGL neveikia. Pauzė, paslėpto
lango sustabdymas, konteksto praradimas ir išteklių išvalymas būtini.

Vadovaukis `docs/runtime-contract.md` ir `templates/style/README.md`:
200 KB šriftų bei 1,5 MB nuotraukų vienam stiliui, iki 1 MiB vienai peržiūrai;
šalia šrifto pilnas OFL.txt, prie CC0/PD nuotraukų RIGHTS.txt ir inventorius.
Šaltinių URL yra teisių įrašuose. Pavyzdiniai puslapiai naudoja vietinius
failus ir atskirai patikrintus išgalvotus verslo vardus. AI generuoti vaizdai
leidžiami tik pagal `docs/luxury-expansion-plan.md` sąlygas.
Krypties ID yra aprašomasis dizaino pavadinimas, ne verslo pavadinimas.

Peržiūras naujam 3D stiliui kurk
`node scripts/luxury-previews.mjs --style <id>`. Šis žingsnis tikrina A/B,
kompiuterį ir telefoną, reduced motion ir išjungtą WebGL. CI pakartoja
atsarginio vaizdo patikrą ir tikrina tikrą WebGL įprastu režimu. Nepradėk
nuolatinio autoplay vien tam, kad scena atrodytų gyva.

## „Wow“ kartelė

Kiekvieną punktą pagrįsk pastebimu įrodymu S užduoties PR; P27 tikrina iš naujo.
Tai papildoma kartelė prie `core/quality-rubric.md` (bent 10/12, be nulio,
atpažįstamumas ir atskyrimas po 2). Visos sąlygos būtinos:

- Vienas didelis pirmo ekrano vaizdas, bent 70 % aukščio; nėra pakaitinio maketo.
- Vietinė OFL šriftų sistema ir mažos didžiosios etiketės; kortelės išimtys aiškios.
- Viena signatūrinė sąveika veikia pele, klaviatūra ir lietimu.
- Matomame ekrane ne daugiau kaip vienas pagrindinis CTA.
- Paslauga veikia lokaliai, įskaitant pasirinkimą, klaidas ir patvirtinimą.
- Judesys nusistovi, turi pauzę, reduced motion pateikia pilnavertį statinį vaizdą.
- Kiekvienas WebGL objektas turi patikrintą, informatyvų atsarginį vaizdą.
- Telefonas turi savą stiprią kompoziciją ir veikiančius valdiklius.
- Prieinamumo, kontrasto ir išteklių patikros praeina be klaidų.
- Kryptis atpažįstama per 3 s ir nesupainiojama su artimiausia atlaso kryptimi.

Prieš kodą užrašyk 3–5 invariantiškus bruožus ir tiksliai 3 šiai krypčiai
būdingus antišablonus. A ir B turi skirtingą turinio užduotį bei kompoziciją.
Peržiūrėk visus keturis PNG vienoduose ekranuose ir palygink su artimiausiu
paruoštu kaimynu; trys skirtumai turi apimti bent vieną struktūrinį.
Neįvykdyta arba neperžiūrėta sąlyga reiškia taisymą arba `not_run`.
