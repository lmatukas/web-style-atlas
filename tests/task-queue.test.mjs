import test from 'node:test';
import assert from 'node:assert/strict';
import { validate, selectNext, render } from '../scripts/tasks.mjs';

const task=(id,depends_on=[])=>({id,title:id,depends_on,status:'todo',checks:[],evidence_paths:[]});
const queue=()=>({schema_version:1,tasks:[task('P01'),task('P02',['P01']),task('P03')]});
const active=t=>Object.assign(t,{status:'in_progress',worker:'test-session',branch:'task/p01',claimed_at:'2026-10-20T00:00:00Z'});
const done=t=>Object.assign(t,{status:'done',merge_commit:'a'.repeat(40),pr_url:'https://github.com/lmatukas/web-style-atlas/pull/1',checks:[{name:'acceptance',status:'pass'}],evidence_paths:['docs/evidence/P01.md']});

test('first task selected and dependencies unlock only after done',()=>{const q=queue();assert.equal(selectNext(q).task,'P01');done(q.tasks[0]);assert.equal(selectNext(q).task,'P02');});
test('active work prevents a second claim',()=>{const q=queue();active(q.tasks[0]);assert.equal(selectNext(q).action,'reconcile');});
test('review is not completion',()=>{const q=queue();active(q.tasks[0]);q.tasks[0].status='review';q.tasks[0].pr_url='https://github.com/lmatukas/web-style-atlas/pull/1';assert.equal(selectNext(q).task,'P01');assert.equal(selectNext(q).action,'reconcile');});
test('blocked prerequisite skipped only for independent work',()=>{const q=queue();Object.assign(q.tasks[0],{status:'blocked',blocker:'access',next_action:'restore access'});assert.equal(selectNext(q).task,'P03');q.tasks.pop();assert.equal(selectNext(q).action,'blocked');});
test('duplicate IDs and cycles rejected',()=>{const q=queue();q.tasks.push(task('P01'));assert.throws(()=>validate(q));const p=queue();p.tasks[0].depends_on=['P02'];assert.throws(()=>validate(p));});
test('cannot claim task before prerequisite completes',()=>{const q=queue();active(q.tasks[1]);assert.throws(()=>validate(q),/prerequisite/);});
test('two concurrent active records rejected',()=>{const q=queue();active(q.tasks[0]);active(q.tasks[2]);assert.throws(()=>validate(q),/one active/);});
test('done needs merge, passing checks and evidence',()=>{const q=queue();q.tasks[0].status='done';assert.throws(()=>validate(q));done(q.tasks[0]);q.tasks[0].checks[0].status='not_run';assert.throws(()=>validate(q));});
test('render deterministic and escapes worker cell delimiters',()=>{const q=queue();active(q.tasks[0]);q.tasks[0].worker='test|worker\nlabel';assert.equal(render(q),render(q));assert.ok(render(q).includes('test\\|worker label'));});
