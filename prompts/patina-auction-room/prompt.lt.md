# Patina Auction Room — svetainės kūrimo promptas

Sukurk veikiančią svetainę vartotojo projekte. Atlaso ir jo darbų registro nekeisk.

## Pritaikyk projektui

- Verslo vardas, veikla, auditorija: [ĮRAŠYK ARBA PALIK IŠGALVOTĄ DEMONSTRACIJĄ].
- Tikri objektai, kategorijos, įverčiai, kilmė ir teisės: [PATVIRTINTI DUOMENYS].
- Peržiūrų dienos, laikai, vietų skaičius ir statymo žingsniai: [PATVIRTINTI DUOMENYS].
- Technologija, integracijos ir projekto taisyklės: [ĮRAŠYK].

Be patvirtintos integracijos viskas vyksta lokaliai. Mokėjimų, tikrų statymų, rezervacijų ar laiškų nekurk. Aiškiai įvardyk demonstraciją. Muziejaus objektai neparduodami; mokomieji loto numeriai ir įverčiai nesusiję su jų tikra verte.

## Dizaino kryptis

Tamsiai pilka galerijos siena, vienas didelis istorinis objektas su šiltu prožektoriumi. Šiltai baltas tekstas, smulkios didžiosios etiketės, siauras raudonas akcentas tik laikmačiui. Pirmo ekrano scena 70–110 svh; objektui 60–75 % pločio, trumpam tekstui 28–36 ch. Mobiliajame išlaikyk didelę aiškią objekto sceną. Naudok tikrus CC0 arba viešosios nuosavybės muziejinius vaizdus su pilnais kilmės įrašais. Tik vietiniai OFL WOFF2: kontrastingas serif antraštėms ir lygiaplatis sans lotų numeriams, įverčiams bei praktiniam tekstui. Iki dviejų šeimų, trijų svorių, šriftams 200 KB, nuotraukoms 1,5 MB. Lietuviškos raidės privalomos.

Išlaikyk penkis bruožus: tamsi siena; vienas objektas ir valdoma šviesa; serif ir lygiaplatė loto informacija; inventoriaus katalogas prieš vieno objekto bylą; sąžiningai veikianti vietinė paslauga. Venk baltos galerijos plakato, architektūros projektų monografijos ir universalių auksinių kainų kortelių.

Antraštės 300–400 svorio, 24–56 px; viena kampanijos antraštė iki 80 px, telefone 36–56 px. Tekstas 16–20 px, eilutė 1,5–1,7. Etiketės 11–14 px su tarpais tarp raidžių. Tarp skyrių 80–160 px kompiuteryje, 48–80 px telefone. Vienas pagrindinis veiksmas matomame ekrane, valdikliams bent 44 × 44 px.

## Du skirtingi maketai

A — aukciono katalogas: didelė objekto scena, loto numerio, įverčio ir demo laikmačio eilutė; trijų–šešių objektų katalogas; kartu veikiantys kategorijos ir įverčio filtrai, rezultatų skaičius, tuščia būsena ir atkūrimas; peržiūros dienų kalendorius su vietinės registracijos forma; praktinės pastabos.

B — vieno loto byla: didelis priartinamas objektas šalia siauros duomenų skilties; tikras objekto aprašas, kilmė ir muziejaus inventoriaus numeris; būklės pastabų išskleidimas; šviesus vietinio statymo stalas. Katalogo nuorodos turi atverti būtent pasirinktą objektą su jo nuotrauka, kilme, įverčiu ir minimaliu žingsniu. Nežinomas loto parametras grąžina aiškų numatytą objektą. Mobiliajame scena ir priartinimas rodomi prieš loto informaciją.

## Signatūra ir judesys

Šiltas prožektorius seka pelę per objektą. Tą pačią šviesą klaviatūra ir lietimu valdo pažymėtas natyvus range. Priartinimui atskiras 100–180 % slankiklis su tekstine reikšme. Šviesa keičia tikrą sceną, ne vien etiketę. Pradinė ir naudotojo pradėta animacija nusistovi iki 2 s; yra pauzė, gyvas reduced-motion atsakas, nematomos scenos ir paslėpto lango sustabdymas bei pagehide valymas. Be judesio vaizdas lieka pilnavertis. 3D nebūtinas; jei jį pridėsi, reikalingas tikras vietinis atsarginis vaizdas ir išjungto WebGL patikra.

## Vietinės paslaugos

Peržiūra: vardas su bent viena raide, vienas iš aiškių datos ir laiko pasirinkimų, svečių skaičius 1–4 ir demonstracijos patvirtinimas. Klaidos nurodo lauką, gauna fokusą. Rezultatas tiksliai atkuria vardą, datą, laiką ir žmonių skaičių, sako, kad niekas nerezervuota ir neišsiųsta. Redagavimas paslepia seną rezultatą, atkūrimas išvalo duomenis.

Statymas: kiekvienas lotas turi pradinį demo statymą ir minimalų žingsnį. Priimk tik sveiką saugų skaičių bent dabartinis + žingsnis ir tikslų žingsnio kartotinį. Pavykus atnaujink dabartinį statymą ir kito minimalaus statymo lauką. Tikslioje santraukoje vardas, loto numeris, objekto vardas ir suma. Tai vietinis neprivalomas veiksmas. Privalomas demonstracijos patvirtinimas. Įvestį įterpk kaip tekstą, ne HTML.

Trijų minučių demo laikmatis turi pauzę, pratęsimą ir atkūrimą; paslėptame lange laikas sustabdomas. Jam pasibaigus statymas atmetamas su aiškia klaida; pratęsimas atkuria galimybę. Atkūrimas grąžina pradinį konkretaus loto statymą, žingsnį ir laiką. Laikmatis neturi kas sekundę trikdyti ekrano skaitytuvo. Jokio duomenų saugojimo ar siuntimo.

## Baigimo patikra

Abu maketai 360, 390, 768 ir 1440 px. Vienas h1, skip nuoroda, fokusas, klaviatūra ir lietimas, LT raidės, teksto kontrastas bent 4,5:1 ir valdiklių 3:1. Patikrink visus kategorijų ir įverčių derinius, visus lotų atvėrimus, peržiūros laikus ir svečių ribas, statymo žingsnius, tuščius ir netinkamus laukus, laikmačio pabaigą, pauzę, pratęsimą ir atkūrimą. Patikrink judesio nusistovėjimą, tikrą šviesos bei mastelio pokytį, nematomos scenos sustabdymą ir valymą. Konsolėje klaidų ir išorinių užklausų neturi būti. Peržiūrėk visus keturis kompiuterio bei telefono PNG, palygink su šviesia galerija ir architektūros monografija pagal struktūrą, tipografiją ir sąveiką. Pateik veikiančią peržiūrą ir tikrai atliktas patikras.
