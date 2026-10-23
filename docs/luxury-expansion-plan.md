# Prabangos krypčių plėtra: nuo 39 iki 50

Šis planas prideda vienuolika aukščiausios klasės krypčių. Jos skirtos
technologijų produktams, laikrodžiams, juvelyrikai, viešbučiams, kurortams,
paveldo namams, privatiems klubams, aukcionams, jachtoms, parfumerijai ir
restoranams. Planas parengtas pagal šiuolaikinių aukščiausios klasės produktų,
juvelyrikos ir svetingumo svetainių analizę. Repozitorijoje neminimi jokie
prekių ženklai ir nėra nuorodų į tas svetaines; kryptys aprašomos tik savybėmis.

Užduotys: P25, P26, S52–S62, P27, P28. Kiekviena turi savo kortelę
`docs/tasks/<ID>.md`. Vykdyti įprastu būdu pagal `START_HERE.md`.

## Kodėl dabartinės kryptys neatrodo „brangiai“

Prabangų įspūdį kuria trys dalykai: didelis tikras vaizdas, savi šriftai ir
tyla. Atlase 30 iš 39 krypčių beveik nenaudoja vaizdų, tikras nuotraukas turi
dvi, o atskirų šriftų failų neturi nė viena. Todėl naujos kryptys negali būti
daromos vien sisteminiais šriftais ir CSS piešiniais. P25 tam sukuria pamatus.

## Aštuoni principai

1. **Vaizdas yra herojus.** Pirmas ekranas: vienas didelis kadras, video
   pakaitalas arba 3D objektas per visą plotį ir 70–110 % ekrano aukščio.
   Ne koliažas ir ne ikonų eilė.
2. **Produktas kaip skulptūra.** Makro kadras arba objektas su minkšta šviesa,
   tamsiu ar neutraliu fonu. Daiktas užima ekraną, tekstas lieka šalia.
3. **Savi šriftai, lengvas svoris.** Pora: klasikinis serif antraštėms ir ramus
   sans tekstui. Svoris 300–400. Antraštės ramios (24–56 px); vienas
   kampanijos herojus gali būti iki 80 px ir storesnis.
4. **Mažos didžiosios etiketės.** Antraštės virš antraščių didžiosiomis
   raidėmis, 11–14 px, tarpai tarp raidžių 1–5 px.
5. **Vienas veiksmas ekrane.** Vienas pagrindinis mygtukas: permatomas,
   plono rėmo arba „pill“ formos. Niekada trys spalvoti CTA greta.
6. **Lėtas pasakojimas.** Ilgas puslapis skyriais. Produktų kryptyse —
   prilipusios (`position: sticky`) scenos, kur vaizdas keičiasi slenkant.
7. **Paslauga, ne krepšelis.** Konsultacija, vizito rezervacija,
   personalizavimas, konfigūratorius, narystės paraiška. Visi veikia lokaliai
   kaip demonstracija, be tikro siuntimo.
8. **Tamsa — scenai, šviesa — sandoriui.** Tamsus fonas produkto pristatymui ir
   nakties nuotaikai; šviesus — informacijai, kainoms ir pasirinkimui. Šešios
   kryptys tamsios, penkios šviesios.

## Vienuolika krypčių

| Užduotis | ID | Sritis | Fonas | Pagrindinis vaizdas | Signatūra |
| --- | --- | --- | --- | --- | --- |
| S52 | `obsidian-stage` | Technologijų produktas | Juodas → grafitas, pasirinkimas šviesus | Kodu piešiamas 3D įrenginys | Prilipusios scenos: objektas sukasi ir išsiskaido slenkant |
| S53 | `luminous-cut-vitrine` | Aukštoji juvelyrika | Dramblio kaulas | 3D brangakmenis su lūžtančia šviesa | Akmuo sukamas pele ir klaviatūra; vizito rezervacija |
| S54 | `escapement-nocturne` | Laikrodžiai | Gilus juodas, šiltas metalo akcentas | 3D mechanizmas, makro detalės | Konfigūratorius: korpusas, ciferblatas, dirželis, kaina |
| S55 | `midnight-vestibule` | Miesto viešbutis | Naktinė mėlyna / juoda | Laisvos licencijos naktinės architektūros nuotraukos | Rezervacijos stalčius: datos, kambarys, papildymai |
| S56 | `still-sanctuary` | Kurortas, retreat | Šiltas smėlis | Laisvos licencijos gamtos nuotraukos | Kelionės pagal regionus ir dienos ritualų tvarkaraštis |
| S57 | `heirloom-weave-ledger` | Paveldo namai, aksesuarai | Popieriaus kremas, gilios žalios akcentai | Kodu generuojama monograma ir archyvo objektai | Šimtmečio laiko juosta slenkant |
| S58 | `velvet-members-hall` | Privatus narių klubas | Vyšninė / rašalo | Kodu generuojamos aksomo ir šviesos tekstūros | Narystės paraiška ir renginių kalendorius |
| S59 | `patina-auction-room` | Aukcionų namai | Tamsiai pilka galerija | Laisvos licencijos muziejiniai objektai | Lotų katalogas su įverčiais ir laikmačiu |
| S60 | `openwater-deck` | Jachtos ir rezidencijos | Balta ir smėlis, jūrinė mėlyna, žalvaris | Kodu piešiamas denio planas, jūros kadrai | Interaktyvus denio planas ir nuomos užklausa |
| S61 | `scent-ritual` | Parfumerija | Šviesūs skysti gradientai | 3D stiklo buteliukas | Natų piramidė ir mėginių rinkinio sudarymas |
| S62 | `ember-course-room` | Aukščiausios klasės restoranas | Žvakių šviesos tamsa | Laisvos licencijos patiekalų ir stalo kadrai | Degustacinio meniu eiga ir vietos pasirinkimas |

Stiliaus ID yra aprašomasis kaip `quiet-luxury` ar `art-deco`. Pavyzdinio
verslo vardas pavyzdžiuose yra kitas, išgalvotas ir prieš naudojimą patikrintas
dėl sutapimų su realiomis įmonėmis (`AGENTS.md`, „Authorship and references“).

Atskyrimas nuo esamų: Quiet Luxury lieka ramus baldų katalogas, Art Deco —
ornamentinis vakaro kvietimas, Cinematic Photo — kelionių žurnalas, Light
Environments — šviesos instaliacijos. Naujos kryptys yra apie produktą,
paslaugą ir sandorį.

## Vaizdai, šriftai ir teisės

**Kodu piešiami 3D objektai.** Pagrindinis įrankis S52, S53, S54 ir S61.
WebGL be išorinių bibliotekų arba su į repozitoriją įdėta MIT biblioteka, kaip
nustatys P25. Visada su statiniu atsarginiu vaizdu (SVG arba PNG), kai WebGL
nėra arba įjungtas `prefers-reduced-motion`.

**Laisvos licencijos nuotraukos.** Tik CC0 arba viešoji nuosavybė: muziejų
atviros kolekcijos, vyriausybinės nuotraukų bibliotekos, Wikimedia su CC0/PD
žyma. Nuotraukų bankai su savo licencijomis nenaudojami, nes ne visi leidžia
platinti rinkinyje. Kiekvienai nuotraukai pildomi `assets.json` ir `RIGHTS.txt`.
Šaltinio URL lieka tik `RIGHTS.txt`; pavyzdiniuose puslapiuose nuorodų į
išorines svetaines nėra (`tests/neutral-names.test.mjs`).

**AI generuoti vaizdai nenaudojami.** Jų teisinis statusas skirtingose šalyse
nevienodas, o atlasas yra viešas ir MIT licencijos. Sprendimą gali pakeisti tik
savininkas, papildydamas šį skyrių.

**Kodu generuojamos tekstūros.** Aksomas, marmuras, šilkas, metalas, šviesos
dėmės — CSS gradientais ir SVG filtrais, be failų.

**Šriftai.** Tik SIL Open Font License (OFL) šriftai, įdėti į stiliaus
`assets/fonts/` kartu su `OFL.txt`. Ne daugiau kaip 2 šeimos ir 3 svoriai
stiliui, `woff2`, apkarpyti iki lotynų ir lietuvių raidžių. Jokių šriftų iš
išorinių CDN.

**Biudžetas vienam stiliui:** nuotraukos iki 1,5 MB (WebP), šriftai iki 200 KB,
peržiūros PNG iki 1 MiB.

## „Wow“ kartelė

Kryptis priimama tik tada, kai tenkina visus punktus. Juos tikrina S užduoties
PR ir P27 auditas, kartu su įprasta rubrika (bent 10/12, be nulio).

1. Pirmame ekrane vienas didelis vaizdas arba 3D objektas, užimantis bent 70 %
   aukščio.
2. OFL šriftų sistema ir mažos didžiosios etiketės su tarpais tarp raidžių.
   Paprastai serif/sans pora; S52 naudoja vieną sans šeimą 600/400, S54 gali
   rinktis siaurą sans, kaip nurodyta kortelėse.
3. Viena signatūrinė sąveika, veikianti pele, klaviatūra ir lietimu.
4. Ekrane ne daugiau kaip vienas pagrindinis mygtukas.
5. Tikra paslaugos dalis (rezervacija, konsultacija, konfigūratorius ar
   paraiška), veikianti lokaliai be tikro siuntimo.
6. Judesys lėtas ir išjungiamas; su reduced-motion matomas statiškas, bet
   pilnavertis vaizdas.
7. 3D turi atsarginį vaizdą.
8. Telefone pirmas ekranas toks pat stiprus, ne suspaustas kompiuterio vaizdas.
9. Prieinamumo patikra be klaidų, kontrastas tinka ir tamsiame fone.
10. Kryptis atpažįstama iš peržiūros per 3 sekundes ir nesupainiojama su jokia
    kita atlaso kryptimi.

## Galerija ir leidimas

P26 prideda žymą `luxury` ir filtrą „Prabanga“. P28 prideda rikiavimo lauką:
naujos vienuolika krypčių rodomos galerijos pradžioje su žyma „Nauja“, tada
likusios. Leidimas 1.3.0 su 50 krypčių; leidimo patikra skaičius suskaičiuoja
pati (`scripts/release-gate.mjs`), todėl workflow keisti nereikia.

## Tvarka

P25 → P26 → S52 → S53 → S54 → S55 → S56 → S57 → S58 → S59 → S60 → S61 → S62 →
P27 → P28. S52 ir S53 pirmos, nes išbando sunkiausius dalykus: 3D objektą ir
šriftus. Jei jose paaiškėja pamatų trūkumas, jis taisomas P25 tęsinyje, o ne
kiekvienoje kryptyje atskirai.
