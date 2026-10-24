# Ember Course Room — svetainės kūrimo promptas

Sukurk veikiančią svetainę vartotojo projekte. Atlaso ir jo užduočių registro nekeisk.

## Pritaikyk projektui

- Restoranas, auditorija, vieta ir sezono istorija: [ĮRAŠYK ARBA PALIK IŠGALVOTĄ DEMONSTRACIJĄ].
- Tikras degustacinis meniu, trukmė, patiekalų ir gėrimų aprašai: [ĮRAŠYK].
- Patvirtintas salės planas, staliukų talpa, darbo laikas ir rezervavimo taisyklės: [ĮRAŠYK].
- Vaizdai, teisės, technologija ir autorizuota rezervacijos integracija: [ĮRAŠYK].

Be patvirtintos integracijos rezervacija tik vietinė, be tikro siuntimo, mokėjimo, užsakymo ir klientų duomenų saugojimo. Pavyzdžio verslo vardą patikrink paieškoje dėl realių įmonių sutapimų. Nenaudok tikrų restoranų ženklų, išvaizdos ar nepatvirtintų įvertinimų. AI kadrai yra nuotaikos iliustracijos, ne tikro patiekalo, ingredientų ar veikiančio restorano įrodymas.

## Dizaino kryptis

Žvakių šviesos tamsa (~#120d0a), vienas šiltas gintaro akcentas ir kreminis tekstas. Vienas didelis kadras — tamsus stalas, keraminė lėkštė, stiklas, linas ir žvakės šviesos ratas. Pirmas ekranas 70–110 svh, pats vaizdas bent 70 % aukščio ir kompiuteryje apie 60–75 % pločio. Trumpas kvietimas iki 28–36 ch: vardas, sezonas, vienas mygtukas „Rezervuoti vakarą“. Telefone kurk savą aukštą kompoziciją, išlaikydamas matomą lėkštę bei žvakę, ne sumažintą kompiuterio puslapį.

Penki nekintami bruožai: didelis žvakių šviesos stalo kadras; numeruotas vakaro laikrodis; tikras serif kursyvas patiekalams ir mažos didžiosios sans etiketės; slenkant šiltėjanti šviesa; realus vietos pasirinkimas salės plane. Dizaino tapatybė turi likti pakeitus vardą ir akcento spalvą.

Vietiniai OFL WOFF2: elegantiškas serif 300–400 su tikru kursyvu patiekalų pavadinimams, ramus sans 400 tekstui. Iki dviejų šeimų, trijų svorių ir 200 KB; visos lietuviškos raidės, pilnas OFL.txt prie šriftų, jokio CDN. Antraštės 24–56 px, viena kampanijos antraštė iki 80 px, telefone 36–56 px. Tekstas 16–20 px, 1,5–1,7 eilutės aukštis; etiketės 11–14 px ir 1–5 px tarpai. Tarp skyrių 80–160 px kompiuteryje, 48–80 px telefone; paraštės 48–96 ir 20–28 px. Valdiklių plotas bent 44 × 44 px. Vienas pagrindinis CTA matomame ekrane.

## Du skirtingi maketai

A — degustacinio meniu eiga. Didelis stalo kadras, šone trumpas kvietimas. Toliau asimetriška sezono įžanga ir meniu: plati prilipusi fotografijos scena šalia 8–12 numeruotų patiekalų. Kiekvienas turi vakaro laiką, trumpą aprašą, vyno ir nealkoholinį derinimą. Slenkant keičiasi aktyvus patiekalas, scenos nuotrauka, laikas, skyriaus pavadinimas ir šiltos šviesos stiprumas. Veikia ir natyvios ankstesnio / kito patiekalo rodyklės. Deserto kadras palieka pauzę; toliau šviesi rezervacija ir atvykimo pastabos. Fotografijų gali būti mažiau nei patiekalų: tada aiškiai žymėk skyriaus nuotaiką, nevaizduok kiekvieno teksto kaip tikslios nuotraukos.

B — stalo rezervacijos ateljė. Panoraminis vakaro kadras ir platus kvietimas apačioje; po jo erdvus salės planas kairėje, kompaktiškas datos ir laiko žurnalas dešinėje. Vienas bendras patvirtinimo veiksmas. Pasirinkus laiką matosi tikrai laisvi ir reikiamai grupei tinkami stalai. Patvirtinimas pateikia tikslią vietinę santrauką. Toliau trys paspaudžiami vakaro momentai pakeičia vieną fotografiją ir šviesą, pabaigoje praktinės atvykimo pastabos. B yra erdvinis pasirinkimo įrankis, ne perrikiuotas A meniu.

## Signatūra ir judesys

Vakaro laikas, patiekalas, nuotrauka ir šviesa keičiasi kartu. Slinkimas lieka natūralus — jokio užrakinimo ar sekcijų gaudymo. Klaviatūra ir lietimu veikia aiškūs alternatyvūs valdikliai. Turinys turi būti perskaitomas net kai signatūros scenos už ekrano.

Vienas pradinis šviesos epizodas baigiasi per 1,5–2 s. Nėra nuolatinio žvakės mirgėjimo, automatinio karuselės sukimo ar garso. Pauzė sustabdo foninę šviesos kaitą, bet meniu ir rezervacija veikia. Reduced-motion rodo pilnavertį galutinį vaizdą iš karto; pasikeitus pasirinkimui vaizdas atsinaujina be animacijos. Paslėpus langą ar scenai pasitraukus iš ekrano stabdomas planavimas. Pagehide metu atjunk RAF, stebėtojus ir klausytojus; grįžimas iš naršyklės atminties atkuria veikiančius valdiklius. WebGL nereikia; vietinė fotografija yra statinis kelias.

## Veikianti rezervacija

1. Pasirenkama data nuo rytojaus iki 60 dienų į priekį, svečių skaičius 1–6, laikas, konkretus stalas, gėrimų derinimas ir neprivaloma alergijų pastaba iki 300 simbolių.
2. Sukurk aiškų vietinį demonstracinio laisvumo modelį. Pavyzdyje pirmadieniai uždaryti, kai kurios datos ir vėlyviausias laikas užpildyti. Laisvų laikų sąrašas ir stalai priklauso nuo datos bei svečių skaičiaus. Tai nėra tikras laisvumo teiginys.
3. Salės planas turi erdvinę prasmę: langai, įėjimas, virtuvė, šeši skirtingose vietose išdėstyti stalai, matoma jų talpa ir būsenos. Galima rinktis tik tinkamo dydžio ir laisvą stalą. Pasirinkta, laisva, užimta ir per maža vieta žymima tekstu bei forma, ne vien spalva.
4. Pakeitus datą ar svečių skaičių, išvalyk seną laiką ir stalą; pakeitus laiką — seną stalą. Pranešk, ką reikia rinktis iš naujo. Patikrink visus apribojimus dar kartą pateikiant formą, o ne pasitikėk vien pilku mygtuku.
5. Klaidos aiškios, susietos su valdikliais, su matomu pranešimu ir fokusu į pirmą klaidingą pasirinkimą. Datos galiojimą tikrink vietiniu kalendoriumi, be UTC dienos poslinkio. Trukmė skaičiuojama nuo pasirinkto laiko, ne nuo meniu pasakojimo pradžios.
6. Reikalauk aiškaus supratimo, kad tai demonstracija. Santraukoje nurodyk datą, pradžią ir pabaigą, svečius, stalo numerį ir vietą, meniu, gėrimų pasirinkimą ir tikslią pastabą. Užrašas: „Vietinė santrauka. Rezervacija neišsiųsta.“ Alergijų suderinimas nelaikomas patvirtintu.
7. „Redaguoti“ išsaugo pasirinkimus. „Išvalyti“ pašalina santrauką bei pasirinkimus ir leidžia pradėti iš naujo. Nerenk vardo ar el. pašto, jei jų nereikia vietinei demonstracijai. Nenaudok localStorage ar backend. Užrašus rodyk kaip tekstą, ne HTML.
8. Iki JavaScript inicializavimo forma išjungta ir nesukelia netyčinio GET ar kito siuntimo. Noscript paaiškina ribą; meniu ir nuotraukos vis tiek matomi.

## Vaizdų ir šriftų teisės

Naudok 2–4 tikrus CC0 arba viešosios nuosavybės stalo ir maisto kadrus. Jei tinkamo laisvos licencijos kadro nėra, leidžiamos originalios AI iliustracijos pagal įrankio komercinio naudojimo bei platinimo sąlygas. Nenaudok nuotraukų banko su nuosava ribojančia licencija. Kiekvieno failo kilmę, kūrėją, licenciją ir pakeitimus įrašyk assets.json bei RIGHTS.txt. AI atveju nurodyk įrankį / prieinamą versiją, datą, pilną užklausą ir rankinius pakeitimus, licenciją „AI-generated, original, distributed under the repository MIT terms“. Nepaversk AI vaizdo tariama tikra restorano nuotrauka. Nėra prekių ženklų, žmonių, žinomų produktų ar gyvo menininko stiliaus. Vaizdus peržiūrėk dėl netikrų raidžių ir iškraipytų objektų.

Vaizdai vietiniai WebP su išvalytais metaduomenimis, iki 1,5 MB kartu; šriftai iki 200 KB. Šaltinių ir įrankių URL tik teisių įrašuose. Pačiame puslapyje tik vietinės nuorodos. Keturios kanoninės A/B kompiuterio / telefono PNG peržiūros iki 3 MiB, nes kryptis stipriai priklauso nuo fotografijos; kita versijuojama medija turi neviršyti projekto biudžeto.

## Prieinamumas, atskyrimas ir patikra

Vienas h1, aiškūs landmark, skip nuoroda, nuoseklios antraštės, tikros etiketės, matomas fokusas. Klaviatūra, lietimu ir pele įmanoma pereiti meniu, pasirinkti laiką ir stalą, patvirtinti, redaguoti ir išvalyti. Vaizdai turi prasmingus alt tekstus. Tekstas kontrastingas: bent 4,5:1, stambus tekstas ir valdiklių ribos bent 3:1, šviesi rezervacija turi atskirus kontrasto porų įrodymus. Patikrink 360, 390, 768 ir 1440 px, LT raides, teksto didinimą, išjungtą JavaScript, reduced-motion, paslėptą langą ir pagehide.

Artimiausi kaimynai: Editorial Journal ir Art Deco. Pirmasis remiasi literatūriniu masthead, skyriais ir siauru esė su pastabomis; čia didelė prilipusi fotografija, vakaro kursai ir erdvinė paslauga. Antrasis — ornamentinis ašinis vakaro kvietimas, geometrinė navigacija ir renginio programa; čia natūrali medžiaga, tikras kursyvas, tamsus stalas ir talpą tikrinanti rezervacija. Bent trys skirtumai nuo kiekvieno, įskaitant struktūrą, turi likti pritaikius neutralų renginio briefą.

Venk tiksliai šių trijų antišablonų: pristatymo programėlės patiekalų kortelių su krepšeliu; auksinių Art Deco vėduoklių ir laiptuotų rėmų; žurnalo masthead ir ilgų esė su pastabomis paraštėse. Pateik keturis tikrai peržiūrėtus PNG, bent 10/12 rubriką be nulio ir įrodymus visoms dešimčiai prabangos sąlygų. Neatliktų patikrų nežymėk PASS.
