# Scent Ritual — svetainės kūrimo promptas

Sukurk veikiančią svetainę vartotojo projekte. Atlaso ir jo darbų registro nekeisk.

## Pritaikyk projektui

- Pavadinimas, auditorija ir produkto istorija: [ĮRAŠYK ARBA PALIK IŠGALVOTĄ DEMONSTRACIJĄ].
- Patvirtinti kvapai, natos, mėginių tūris ir produktų aprašai: [ĮRAŠYK].
- Paieškos klausimai ir paaiškinama rekomendacijos taisyklė: [ĮRAŠYK].
- Technologija, esamo projekto taisyklės ir autorizuotos integracijos: [ĮRAŠYK].

Be patvirtintos integracijos viskas vyksta lokaliai. Jokio tikro užsakymo, mokėjimo, siuntimo ar klientų duomenų saugojimo. Išgalvotą verslo vardą prieš naudodamas patikrink paieškoje dėl realių įmonių sutapimų. Natų aprašai nėra tikros sudėties, saugumo ar moksliškai parinkto kvapo teiginiai.

## Dizaino kryptis

Šviesi parfumerijos ateljė: baltas pagrindas, grafito tekstas, rožinio, gintarinio ir žalsvo skysčio šviesa. Vienas didelis originalus 3D stiklo buteliukas su lūžtančia šviesa ir judančiu skysčiu valdo pirmą ekraną. Scena 70–110 svh, vaizdui bent 70 % pirmo ekrano aukščio, kompiuteryje 60–75 % pločio; trumpas tekstas iki 28–36 ch. Telefonui sukurk savą aukštą buteliuko kompoziciją, ne sumažintą kompiuterio puslapį.

Penki išlaikomi bruožai: didelis skaidraus stiklo objektas; skysti pasteliniai šviesos laukai; lengvas serif ir mažos didžiosios sans etiketės; trijų lygių natų struktūra; asmeninis mėginių rinkinys. Venk matinių molio burbulų, kaimiškų keramikos istorijų ir universalaus parduotuvės kortelių tinklelio.

Vietiniai OFL WOFF2: plonas 300–400 serif antraštėms ir lengvas aiškus sans tekstui, iki dviejų šeimų ir trijų svorių, iki 200 KB. Visos lietuviškos raidės, šalia pilnas OFL.txt. Jokio CDN. Antraštės 24–56 px, viena kampanijos antraštė iki 80 px, telefone 36–56 px; tekstas 16–20 px su 1,5–1,7 eilutės aukščiu; etiketės 11–14 px ir 1–5 px tarpai. Tarp skyrių 80–160 px kompiuteryje, 48–80 px telefone. Paraštės 48–96 ir 20–28 px. Vienas pagrindinis veiksmas matomame ekrane, valdikliai bent 44 × 44 px.

## Du skirtingi maketai

A — kvapų kolekcija. Siauras tipografinis kvietimas šalia didelio stiklo buteliuko. Toliau keturi numeruoti kvapų įrašai su skirtingais gradientais, mažais kodu pieštais buteliukais ir natų aprašais. Pasirinkus kvapą pasikeičia scenos spalva, buteliuko skystis ir etiketė, visi pavadinimai bei natų lentelė. Natų lentelė turi viršūnę, širdį ir pagrindą. Pabaigoje erdvi mėginių rinkinio studija bei trys pažinties su kvapu žingsniai.

B — savo kvapo radimas. Pirmame ekrane viso pločio buteliuko studija, kvietimas viename kampe. Toliau vienas klausimas vienu metu šalia trijų sluoksnių natų piramidės. Trys klausimai: vieta, dienos laikas ir norimas artumas; po tris pasirinkimus. „Atgal“ išsaugo atsakymus. Užbaigus aiškus pasiūlymas ir paaiškinimas, kaip prisidėjo visi trys atsakymai. Piramidė rodo tikras pasiūlyto demonstracinio kvapo natas. Rinkinį leidžiama pritaikyti nepriklausomai nuo rekomendacijos. A ir B turi skirtis turinio užduotimi ir kompozicija, ne vien spalvomis.

## Originalus buteliukas ir signatūra

Naudok native WebGL be išorinių bibliotekų ir modelių. Originali užapvalinta stiklo geometrija, kaklelis, platus matinis kamštelis, šviesi popierinė etiketė, studijos atspindžiai ir skysčio paviršius. Skystį pakreipia žymeklis; natyvus slankiklis suteikia klaviatūros ir lietimo alternatyvą. Telefono pakrypimą galima pridėti tik su sąmoningu leidimu; jis nėra privalomas, kai patogiai veikia slankiklis. Slinkimas telefonu lieka laisvas.

Iš to paties originalaus kodo sugeneruok vietinį SVG arba PNG atsarginį vaizdą. Jis turi būti informatyvus, su alt tekstu, matomas dar prieš JavaScript. Reduced-motion, WebGL nebuvimo ir konteksto praradimo atvejais slėpk canvas, rodyk atsarginį vaizdą ir sąžiningą būseną. Pradinė scena bei foninės šviesos kitimas baigiasi per 2 s. Tolimesnis judesys tik po naudotojo veiksmų, baigtinis, su pauze. Sustabdyk paslėptą langą ir už ekrano esančią sceną; pagehide metu atlaisvink GPU išteklius, stebėtojus ir klausytojus.

Nuotraukų nereikia. Originalią geometriją, šrifto kilmę, autorius, licencijas ir renderio būdą užrašyk assets.json bei RIGHTS.txt. Šaltinių URL tik teisių įrašuose; pavyzdžiai naudoja vietinius failus ir išgalvotą vardą. Neatkartok konkretaus realaus kvepalų buteliuko.

## Paieška ir mėginių paslauga

Trys klausimai turi iš tikrųjų keisti rezultatą. Naudok aiškią deterministinę taisyklę: vietos svoris 3, laiko 2, artumo 1; keturių kvapų profilius palygink pagal svertinį atstumą. Vienodo atitikimo taisyklė turi būti aiški. Pateik visų trijų atsakymų paaiškinimus; tai pasiūlymas, ne diagnozė. Išbandyk visus 27 derinius. Neatsakius į klausimą rodoma suprantama klaida ir fokusuojamas atsakymas. „Keisti atsakymus“ išsaugo įvestį, „Pradėti paiešką iš naujo“ išvalo atsakymus ir praneša, kad nepriklausomas rinkinys išlieka.

Siūlyk keturis kvapus, bet rinkinyje leisk 1–3 skirtingus mėginius po 2 ml. Tą patį kvapą įdėti du kartus negalima. Ketvirtas kvapas sukelia aiškią klaidą; galima pašalinti ankstesnį. Kolekcijos ir rinkinio pasirinkimo mygtukai keičia tikrą būseną, aria-pressed ir kiekį. Rekomendacijos mygtukas tik prideda, todėl pakartotinis paspaudimas jau pridėto mėginio nepašalina.

Patvirtinimui būtinas bent vienas mėginys ir demonstracijos sąlygos patvirtinimas. Santraukoje kiekvieno kvapo pavadinimas, numeris, visos trys natų grupės, 2 ml ir tikslus bendras tūris. Duomenis įterpk kaip tekstą. Aiškiai pasakyk: tai vietinė demonstracija, nieko neužsakyta, niekas neišsiųsta, mokėjimo nėra. Bet kuris rinkinio ar sąlygos pakeitimas panaikina seną santrauką. „Taisyti“ išsaugo pasirinkimą, „Išvalyti rinkinį“ išvalo mėginius ir patvirtinimą. Jokio saugojimo.

## Baigimo patikra

Patikrink abu maketus 360, 390, 768 ir 1440 px, lietuviškus ženklus, klaviatūrą, pelę, lietimą ir 200 % tekstą. Teksto kontrastas bent 4,5:1, valdiklių bent 3:1. Jokių išorinių užklausų ar konsolės klaidų. Patikrink tikrą 3D piešimą ir pikselių pokytį, visus keturis kvapus, 27 paieškos derinius, 1–3 mėginių santraukas, ketvirto ir pakartotinio mėginio elgesį, tuščią rinkinį, trūkstamą patvirtinimą, taisymą ir atkūrimą.

Patikrink pauzę, nusistovėjimą, gyvą reduced-motion pakeitimą, išjungtą WebGL, konteksto praradimą, nematomą sceną ir išteklių valymą. Sugeneruok ir akimis peržiūrėk keturis galutinius PNG; iki 1 MiB kiekvienam. Palygink su minkšta erdvine ir organiško amato kryptimis bent pagal struktūrą, tipografiją bei medžiagą. Pateik veikiančius pavyzdžius ir tik iš tikrųjų atliktų patikrų rezultatus.
