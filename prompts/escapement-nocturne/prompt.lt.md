# Escapement Nocturne — svetainės kūrimo promptas

Sukurk veikiančią svetainę vartotojo projekte. Tai savarankiškas kūrimo promptas; atlaso ar jo darbų registro nekeisk.

## Pritaikyk projektui

- Prekės ženklas ir veikla: [ĮRAŠYK SAVO ARBA PALIK DEMONSTRACIJĄ].
- Auditorija ir pagrindinis veiksmas: [ĮRAŠYK].
- Patvirtinti modeliai, kalibrų savybės, kainos, salonai ir integracijos: [ĮRAŠYK ARBA PALIK AIŠKIAI IŠGALVOTĄ DEMONSTRACIJĄ].
- Projekto technologija ir aplinkos taisyklės: [ĮRAŠYK ARBA TAIKYK ESAMAS].
- Kompozicija: [A ARBA B; numatytoji A].

Neužpildžius laukų, naudok išgalvotą laikrodžių ateljė „Zevraqelle“ ir originalų koncepcinį laikrodį „Nocturne N.01“. Aiškiai pažymėk išgalvotus skaičius, kainas ir salonus. Nei tikro užsakymo, nei vizito, nei mokėjimo nevykdyk.

## Kryptis ir invariantiški bruožai

Pirmą ekraną valdo vienas tiksliai kodu piešiamas laikrodis giliame juodame fone. Jo korpusas, smulkios rodyklės, krumpliaračiai, tilteliai ir balanso spiralė turi atrodyti kaip vienas suderintas daiktas. Nenaudok jokio realaus laikrodžio modelio ar svetainės kopijos.

Išlaikyk penkis bruožus: vieną didelį laikrodį; A variante tris lėtus pasakojimo skyrius aplink vieną prilipusį objektą; šviesų lengvą serif ir ramų sans; šiltą šviesią pasirinkimo ir paslaugos pabaigą; tikslų pasirinkimo, kainos ir vizito ryšį. Venk dekoratyvinio medalio vietoje mechanizmo, amžino sukimosi su neonais ir netikro pirkimo ar paslėptų priemokų.

Paletė: #0b0b0c, #19191b, kreminis #f0e9dc, aiškūs antriniai tekstai #b3ada2, metalo akcentas #c4a477. Paslaugai #eee7d9 popierius, #28251f tekstas ir #71572f akcentas. Paviršiai plokšti; metalo gradientai tik objekte, ne mygtukuose.

Naudok vietinius OFL Bodoni Moda 400 ir Alegreya Sans 400 arba lygiavertę porą. Ne daugiau kaip dvi šeimos ir trys svoriai, iki 200 KB, lietuviškos raidės ir pilni OFL.txt. Antraštės 24–56 px, viena produkto antraštė gali būti iki 80 px. Etiketės 11–14 px, didžiosios raidės su 1–3 px tarpais. Skaičiams tabular numerals. Jokių išorinių šriftų CDN.

## Maketai ir tikras veikimas

A: trumpi redakciniai tekstai kairėje, 75 svh laikrodžio scena dešinėje. Pirmas skyrius — ramus ciferblatas; antras — slenkant permatomas ciferblatas ir atviras krumpliaračių traukinys; trečias — balanso detalė. Tada keturi skaičiai (40 mm, 72 val., 168 dalys, 8,6 mm; visi koncepciniai), artimas mechanizmo fragmentas su trimis amato žingsniais ir šviesi vizito paslauga. Vienas pagrindinis veiksmas matomame ekrane.

B: laikrodis kairėje, atskiras šviesus pasirinkimo stalas dešinėje. Korpusas: šiltas auksas +1600 €, poliruotas plienas +0 €, bronza +600 €. Ciferblatas: juodas +0 €, nakties mėlynas +250 €, dramblio kaulo +350 €. Dirželis: juoda oda +0 €, tabako oda +180 €, plieno pynė +480 €. Bazė 6800 €. Suma visada bazė + trys priemokos. Pradžia: auksas, juoda, juoda oda — 8400 €. Kiekvienas pasirinkimas keičia objektą, kainą, santrauką ir vizito derinį. Atstatymas grąžina pradinį derinį. Po stalu — visa pasirinkimo suvestinė su bazės, priedų ir galutine suma, specifikacijos, vizitas.

Piešk originalų native WebGL objektą be išorinių bibliotekų ir pateik tikrą vietinį SVG pakaitalą. Rodyklės įprastu režimu rodo tikrą įrenginio laiką; pakanka vieno atnaujinimo per sekundę. Ciferblato atvėrimas turi veikti slenkant, pele, horizontaliu lietimo braukimu ir klaviatūra. Pateik ir įprastą range bei mygtuką: niekas neturi priklausyti nuo hover ar tikslaus braukimo. Telefone vertikalūs braukimai turi toliau slinkti puslapį.

Vizito forma: išgalvotas salonas, rytojaus–90 dienų data Europe/Vilnius kalendoriuje, laisvas laikas, vardas bent 2 ženklų, el. paštas, demonstracijos patvirtinimas. Sekmadieniai netinka, 14:00 demonstracijoje užimta. Prie klaidų pateik tekstą ir aria-describedby, bendrą klaidų skaičių bei fokusą pirmame klaidingame lauke. Vietinis patvirtinimas turi pakartoti saloną, datą, laiką, tikslų laikrodžio derinį ir kainą bei aiškiai pasakyti, kad niekas neišsiųsta. Pakeitus pasirinkimą ar formą slėpk pasenusį patvirtinimą, išvalymas turi veikti. Asmeninių duomenų nesaugok.

Judesys: vienas atvykimas iki 1450 ms ir sustojimas. Toliau tik naudotojo veiksmai ir prasmingas 1 Hz laikrodis, be nuolatinio RAF ar sukimosi. Pauzė sustabdo ir laikrodį. Reduced-motion — iškart išsamus statinis SVG, sustabdytas laikas, jokių ciklų; pasirinkimai gali tiesiog perpiešti statinį vaizdą. WebGL neprieinamumas ir konteksto praradimas rodo aiškiai pažymėtą pakaitalą. Paslėptas langas ar scena nestebi laiko ir nepiešia; pagehide išvalo GPU, laikmačius, stebėtojus ir Blob URL.

## Baigimo patikra

Patikrink A ir B 360, 390, 768 ir 1440 px pločiais. Telefone scena bent 72 svh, pirmiausia laikrodis, toliau skaitomi skyriai arba pasirinkimai; jokių uždengtų valdiklių ar horizontalaus slinkimo.

Išbandyk visų 27 derinių kainas ir matomus pokyčius įprastame, reduced-motion ir išjungto WebGL režimuose. Patikrink tikras laikrodžio rodyklių kryptis su užfiksuotu laiku, scroll/reveal, rodykles, braukimą, pauzę, gyvą reduced-motion pokytį, konteksto praradimą ir išteklių išvalymą. Tikras 3D tikrinamas per API ir pikselius, ne vien diagnostinį objektą.

Patikrink kiekvieną formos klaidą, praeitį, sekmadienį, per tolimą datą, užimtą laiką, patvirtinimo tikslumą, redagavimą ir išvalymą. Klaviatūra, matomas fokusas, lietuviškos raidės, kontrastas, prieinamumas ir visų vietinių išteklių įkėlimas turi veikti. Peržiūrėk keturis galutinius A/B kompiuterio/telefono vaizdus. Įrašyk išteklių teises ir tikrai atliktas patikras. Užbaik įgyvendinimą; vien planas nėra rezultatas. Viešai publikuok tik gavęs vartotojo pavedimą.
