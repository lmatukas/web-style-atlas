# Web Style Atlas

A visual atlas of distinct web design directions, with working examples and
practical instructions for AI coding agents.

**Status: implementation queue ready; design catalogue not built yet.**
Target: 24 styles, 48 working examples and 96 desktop/mobile previews.

## Darbų eiga

**[Atidaryti darbų lentelę →](docs/STATUS.md)**

Lentelėje matysi, kas padaryta, kas dirba, kokia šaka ir PR, bei kas blokuoja darbą.
Ji atnaujinama agentui užregistravus veiksmą repo; tai nėra gyvas jo ekrano stebėjimas.

Kiekvienam agentui gali duoti tą patį pavedimą:

> Atlik kitą užduotį iš https://github.com/lmatukas/web-style-atlas pagal START_HERE.md.

Agentas pats pasirenka paruoštą užduotį, ją užregistruoja, įgyvendina, patikrina
ir pateikia PR. Peržiūros laukiantis darbas dar nelaikomas baigtu. Įprastai vienu
metu vykdoma viena užduotis; kitas agentas negali tyliai perimti užimto darbo.

## Agent entry points

- [START_HERE.md](START_HERE.md) — choose the next task or use the future catalogue.
- [Shared workflow](docs/WORKFLOW.md) — claims, ownership, review and completion.
- [Implementation plan](docs/implementation-plan.md) — full scope and acceptance criteria.
- [Task cards](docs/tasks/) — 14 infrastructure tasks and 24 style tasks.
- [Pull requests](https://github.com/lmatukas/web-style-atlas/pulls) — implementation reviews.

No dependencies are required for the initial queue helper (use Node.js 22+):

```sh
node scripts/tasks.mjs next
node scripts/tasks.mjs validate
node scripts/tasks.mjs render
node scripts/tasks.mjs check
node --test tests/task-queue.test.mjs
```

The helper is local and does not contact GitHub or claim tasks. Agents follow
the shared workflow to publish changes safely. P01 is the first eligible task;
the bootstrap does not mean P01 is complete.

## License

Original code and documentation: [MIT](LICENSE). Future third-party fonts and
images retain their own licences and must have explicit redistribution rights.
