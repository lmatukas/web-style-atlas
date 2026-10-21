# Svetainių kūrimo promptai

Čia laikomi vieši, savarankiški kūrimo promptai su projekto pritaikymo laukais.
Kiekvienas numato A ir B kompoziciją, konkretų judesį, veikiančią funkciją ir patikras.

Tai paruošti kūrimo briefai, o ne jau įgyvendintų pavyzdžių sąrašas. Tikrą
paruoštų stilių būseną rodo [ready katalogas](../catalog/index.json).
[Promptų registras](index.json) sieja promptus su S25–S39 užduotimis; jis nėra
antroji ready būsena ir nesuteikia teisės žymėti neegzistuojančių pavyzdžių paruoštais.

Pasirinkite vieno stiliaus `prompt.lt.md`, užpildykite pradžioje esančius laukus
ir pateikite visą promptą savo programavimo agentui naujos svetainės projekte.
Galima palikti demonstracinę temą. Ready krypties galerijos kortelėje galima
peržiūrėti pilną tekstą ir kopijuoti jį su pasirinktu A/B. Animacijų bei
technologijų patikras parengs P16, pavyzdžius – atitinkamos S užduotys.

## Ryšys su paruoštu stiliumi

Prie `styles/<id>/style.md` YAML metaduomenų pasirinktinai pridėkite:

```yaml
prompt_path: prompts/<id>/prompt.lt.md
```

Kelias turi tiksliai atitikti stiliaus ID ir jo `prompts/index.json` įrašą.
Leidžiamas tik esamas vietinis UTF-8 tekstas iki 64 KiB, be symlinkų ar NUL.
Registro schema ir visų jame nurodytų briefų šaltiniai tikrinami net tada, kai
jų pavyzdžiai dar nesukurti. Registras nėra ready būsenos šaltinis.

Build perkelia šį optional lauką į generated ready indeksą ir į `dist` kopijuoja
tik ready stilių pasirinktus promptus. Visas planavimo registras ir neprijungti
briefai į `dist` nepatenka. Pašalinus ready ryšį, ankstesnė dist kopija pašalinama.
Esamiems stiliams be `prompt_path` lieka ankstesnis selection promptas.

Galerija pateikia pilną tekstą, projekto pritaikymo laukus ir pasirinktą A/B;
kompozicijos laukas užpildomas pasirinkta reikšme. Kitas tekstas išsaugomas.
Markdown ir jame esantis HTML rodomi tik kaip tekstas. Failo pakrovimo klaida
neleidžia vietoje pilno prompto nukopijuoti trumpos instrukcijos: galima kartoti
pakrovimą. Kai clipboard nepasiekiamas ar atsisako leidimo, parenkamas tas pats
pilnas tekstas rankiniam kopijavimui. Svetainė veikia ir projekto subpath iš dist,
be GitHub prieigos. Vartotojas po kopijavimo užpildo laukus savo projekte.

Pradinis savininko pateiktas rinkinys ir jo įkvėpimo šaltinių atitikmenys nėra
šio viešo repo dalis. Viešuose promptuose nėra jų pavadinimų ar nuorodų.
Nuosavi promptų tekstai naudojami pagal repo MIT licenciją; tai nesuteikia
teisių į kitų žmonių vaizdus, modelius, šriftus ar garsus.

[Plėtros planas](../docs/prompt-expansion-plan.md) · [Darbų lentelė](../docs/STATUS.md).
