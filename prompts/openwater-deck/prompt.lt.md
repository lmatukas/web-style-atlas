# Openwater Deck — svetainės kūrimo promptas

Sukurk veikiančią svetainę vartotojo projekte. Atlaso ir jo darbų registro nekeisk.

## Pritaikyk projektui

- Verslo vardas, auditorija, laivas arba rezidencija: [ĮRAŠYK ARBA PALIK IŠGALVOTĄ DEMONSTRACIJĄ].
- Tikri denio matmenys, kajutės, įgula ir techniniai duomenys: [PATVIRTINTI DUOMENYS].
- Patvirtinti maršrutai, savaitės, svečių ribos, kainodara ir integracijos: [ĮRAŠYK].
- Technologija ir esamo projekto taisyklės: [ĮRAŠYK].

Be patvirtintos integracijos viskas vyksta lokaliai. Jokio tikro užimtumo, siuntimo, rezervacijos ar mokėjimo. Naudok išgalvotą vardą, demonstracines savaites ir aiškią vietinės demonstracijos žymą. Scheminis žemėlapis netinka navigacijai.

## Dizaino kryptis

Balta ir šiltas smėlis, gili jūrinė mėlyna tekstui bei plonoms linijoms, labai santūrus žalvario akcentas. Pirmame ekrane didelė tikra CC0 arba viešosios nuosavybės jūros horizonto nuotrauka ir originalus kodu piešiamas ilgas balto laivo siluetas. Viena antraštė ir vienas mygtukas. Scena 70–110 svh, objektui 60–75 % kompiuterio pločio, tekstui iki 28–36 ch. Telefonas turi savą pilnavertę horizonto kompoziciją.

Penki išlaikomi bruožai: ilgas baltas laivas horizonte; mėlynos jūrinės linijos ant šilto popieriaus; ramus lengvas serif ir techninis sans su lygiapločiais skaičiais; denio atlasas prieš maršruto planavimo stalą; sąžininga vietinė nuomos užklausa. Venk tankaus pramoninės įrangos skydelio, sausumos žygio kontrolinio sąrašo ir universalių mėlynų kurorto rezervavimo kortelių.

Tik vietiniai OFL WOFF2, iki dviejų šeimų ir trijų svorių; 200 KB šriftų, 1,5 MB nuotraukų. Lietuviškos raidės būtinos. Antraštės 300–400 svorio, 24–56 px, viena kampanijos antraštė iki 80 px; telefone 36–56 px. Tekstas 16–20 px, eilutės aukštis 1,5–1,7. Mažos didžiosios etiketės 11–14 px su 1–5 px tarpais. Tarp skyrių 80–160 px kompiuteryje ir 48–80 px telefone. Valdikliai bent 44 × 44 px. Matomame ekrane vienas pagrindinis CTA.

## Du skirtingi maketai

A — laivo pristatymas: didelė horizonto scena; interaktyvus denio planas su keturiomis aiškiomis zonomis; kajučių įrašai; semantinė specifikacijų lentelė; įgulos vaidmenų ir paslaugos pabaiga. Plane galima pasirinkti saulės terasą, saloną, savininko kajutę ir maudynių platformą. Paspaudimas pakeičia tikrą SVG zonos paryškinimą, aprašą, matmenis, plotą ir paskirtį. Numeriai yra natyvūs mygtukai su aria-pressed, veikiantys pele, Enter/Space ir lietimu. Pažymėk, jei planas jungia kelių denių informaciją; neapsimesk, kad tai statybos brėžinys.

B — nuomos užklausa: platus scheminis salų žemėlapis prie asmeninio kvietimo; du septynių naktų maršrutai; savaitės ir svečių forma; tiksli vietinė santrauka ir praktinės pastabos. Pasirinkus maršrutą keičiasi SVG kelio geometrija, sustojimų koordinatės, keturi pavadinimai, antraštė ir pasirinkimas prie formos. Mobiliajame žemėlapis gauna savo aukštą pirmą ekraną, kvietimas eina po juo. Nevienodink A ir B vien spalvų pakeitimu.

## Paslauga

Siūlyk tris aiškias demonstracines savaitės pradžios ir pabaigos datas, 1–8 svečius, vardą ir privalomą demonstracijos patvirtinimą. Be kainos ar tikro užimtumo, kol jų nepatvirtino savininkas. Vardas turi bent vieną raidę; svečių skaičius tik sveikas ir ribose; savaitė turi būti leidžiamame sąraše. Klaidos suprantamos, pranešamos ir nukreipia fokusą į lauką.

Patvirtinimas tiksliai atkartoja vardą, maršrutą, visus sustojimus, savaitės datas, septynias naktis ir svečių skaičių. Įterpk įvestį kaip tekstą, ne HTML. Aiškiai pasakyk, kad tai vietinė demonstracija: laivas nerezervuotas, duomenys neišsiųsti, mokėjimas nevyksta. Pakeitus maršrutą ar įvestį senas patvirtinimas dingsta. „Taisyti“ išsaugo įvestį ir grąžina fokusą savaitei; „Pradėti iš naujo“ grąžina pirmą maršrutą, tuščią savaitę bei vardą, du svečius ir nepažymėtą patvirtinimą. Duomenų nesaugok.

## Judesys ir prieinamumas

Viena baigtinė 1,5–2 s laivo/bangos arba maršruto atsiradimo scena. Pasirinkus maršrutą galima viena nauja baigtinė animacija. Pauzė, gyvas reduced-motion pakeitimas, nematomos scenos ir paslėpto lango sustabdymas, pagehide valymas. Jokio nuolatinio autoplay ar slinkimo perėmimo. Be judesio iškart matomas pilnas laivas ar žemėlapis. WebGL nereikalingas; pridėjus 3D būtinas informatyvus statinis vietinis atsarginis vaizdas ir užblokuoto WebGL patikra.

Skip nuoroda, vienas h1, teisingi SVG aprašai, semantinė lentelė, matomas fokusas ir vietinės nuorodos. Teksto kontrastas bent 4,5:1, valdiklių 3:1. Maži skaičiai turi likti aiškūs. Nuotraukos šaltinio, autoriaus, licencijos ir pakeitimų įrašai RIGHTS faile. Nevaizduok tikrų žmonių ar realaus operatoriaus patvirtinimo.

## Baigimo patikra

Abu maketai 360, 390, 768 ir 1440 px; visi keturi galutiniai PNG peržiūrėti. Išbandyk keturias zonas pele, klaviatūra ir lietimu; tikrą SVG paryškinimą ir tikslius matmenis; abu maršrutus ir jų kelio bei sustojimų pokytį; visas tris savaites ir svečių ribas, klaidas, tikslią santrauką, redagavimą, patvirtinimo paslėpimą ir atkūrimą. Patikrink judesio nusistovėjimą, pauzę, reduced-motion, paslėptą langą ir valymą. Konsolėje klaidų bei išorinių užklausų neturi būti. Palygink su technine pramonine kryptimi ir sausumos kelionės planu bent pagal struktūrą, tipografiją ir sąveiką. Pateik veikiančią peržiūrą ir tikrai atliktas patikras.
