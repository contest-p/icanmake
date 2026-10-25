// DOM-stub smoke checks and deterministic race simulations, not browser layout QA.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const nodes=new Map(),events=new Map(),values=new Map();
class Element{
 constructor(){this.innerHTML='';this.textContent='';this.dataset={};this.style={};this.hidden=false;this.disabled=false;this.classList={add(){},remove(){},toggle(){}};}
 querySelector(s){return getNode(s);}querySelectorAll(){return [];}addEventListener(){}setAttribute(){}removeAttribute(){}focus(){}contains(){return true;}
}
function getNode(s){if(!nodes.has(s))nodes.set(s,new Element());return nodes.get(s);}
const context=vm.createContext({document:{querySelector:getNode,querySelectorAll:()=>[],hidden:false,activeElement:new Element(),addEventListener:(t,f)=>events.set(t,f)},location:{hash:''},window:{addEventListener(){},scrollTo(){}},localStorage:{getItem:k=>values.get(k)||null,setItem:(k,v)=>values.set(k,v)},performance:{now:()=>1000},crypto:{randomUUID:()=>String(Math.random())},requestAnimationFrame:()=>1,cancelAnimationFrame(){},setTimeout:()=>1,clearTimeout(){},console,Date,Intl,Math,Set});
const run=code=>vm.runInContext(code,context);
for(const file of ['projects.js','quotes.js','race-engine.js','track-view.js','project-collection.js','app.js'])run(fs.readFileSync(path.join(root,file),'utf8'));
assert.equal(run('PROJECTS.length'),24);
assert.equal(JSON.stringify(run('progress().levels.map(l=>l.total)')),'[8,7,6,3]','four curriculum stages');
for(const p of run('PROJECTS')){
 assert.ok(p.completionCriteria.length>=3,'concrete completion criteria');
 for(const required of p.prerequisites){
   assert.ok(run(`PROJECTS.some(p=>p.id==='${required}')`),'prerequisite exists');
   assert.ok(run(`PROJECTS.find(p=>p.id==='${required}').order`)<p.order,'prerequisite graph is acyclic and ordered');
 }
}
assert.equal(run('PROJECTS.every(p=>p.learning.length===2&&p.learning.every(r=>r.feature&&r.technology&&r.knowledge))'),true,'all projects explain features, tools and knowledge');
run("navigate('collection')");
assert.ok(getNode('#main').innerHTML.includes('첫 프로젝트를 모아볼까요?'),'empty collection has no sample projects');
assert.equal(run('quotes.length'),24);
assert.equal(run('new Set(quotes.map(q=>q.name)).size'),24,'24 distinct people');
assert.equal(run('new Set(quotes.map(q=>q.art)).size'),24,'one portrait per person');
assert.equal(run("quotes.filter(q=>q.kind==='anime').length"),21);
assert.equal(run("quotes.filter(q=>q.kind==='fighter').length"),3);
assert.equal(run("quotes.some(q=>q.kind==='fighter'&&q.name==='정찬성')"),true);
assert.equal(run("quotes.some(q=>/DRAGON BALL|FULLMETAL|HAIKYU|SLAM DUNK/.test(q.series))"),false);
assert.equal(run("quotes.every(q=>q.original&&q.sourceTitle&&q.sourceContext&&/^https:\\/\\//.test(q.sourceUrl))"),true,'sourced excerpts');
assert.equal(run('new Set(quotes.map(q=>q.id)).size'),24,'unique quote IDs');
assert.equal(run('new Set(quotes.map(q=>q.text)).size'),24,'unique quote text');
assert.equal(run('new Set(quotes.map(q=>q.topic)).size'),24,'distinct themes');
for(let i=0;i<24;i++){
 run(`state.screen='quote';state.selectedQuote=${i};render()`);
 assert.ok(getNode('#main').innerHTML.includes(run(`quotes[${i}].text`)),`quote ${i+1} renders`);
 assert.ok(getNode('#main').innerHTML.includes(run(`esc(quotes[${i}].sourceUrl)`)),`quote ${i+1} source link`);
 assert.ok(getNode('#main').innerHTML.includes('한국어 자체 번역'));
 assert.ok(getNode('#main').innerHTML.includes('원문과 출처 보기'));
 assert.equal((getNode('#main').innerHTML.match(/data-quote=/g)||[]).length,24,'all choices visible');
 assert.ok(fs.existsSync(path.join(root,'assets',run(`quotes[${i}].art`)+'.png')));
}
for(const id of run('screens.map(s=>s[0])')){
 run(`navigate(${JSON.stringify(id)})`);const html=getNode('#main').innerHTML;
 assert.ok(html.length>400,id);assert.ok(!html.includes('undefined'),id);
 for(const[,asset]of html.matchAll(/src="([^"]+)"/g))assert.ok(fs.existsSync(path.join(root,asset)),asset);
}
run("state.level=0;state.history=[];navigate('home');startGame()");
assert.equal(run('state.race.total'),8);
assert.equal(run('state.project'),null,'no preselected mission');
assert.equal(run('state.race.winner'),null,'no winner before exits');
const snap=run('JSON.stringify(state.race.snapshot())');
assert.ok(!snap.includes('projectId')&&!/p0[1-8]/.test(snap),'snapshot exposes no project identity');
assert.ok(!getNode('#main').innerHTML.includes('data-project='),'board exposes no project labels');
assert.ok(events.has('click')&&events.has('input')&&events.has('pointerdown')&&events.has('pointermove'),'interaction handlers registered');
getNode('#race-svg').getBoundingClientRect=()=>({left:10,top:20,width:600,height:650});
run('state.race.cameraY=1000');
assert.equal(run('boardPoint({clientX:310,clientY:345}).y'),1325,'pointer converts camera window into world coordinates');
assert.equal(run('boardPoint({clientX:310,clientY:345}).x'),300);
run('state.race.cameraY=0');
for(const name of run('PROJECTS.filter(p=>p.level===0).map(p=>p.title)'))assert.ok(!getNode('#main').innerHTML.includes(name),'identity hidden in rendered play view');
run('pause()');assert.equal(run('state.screen'),'paused');run('resume()');assert.equal(run('state.screen'),'playing');
assert.equal(run('finish()'),false,'early finish cannot choose a mission');
run('state.race.exit(state.race.balls[2])');
assert.equal(run('state.race.exited'),1,'first exit ends the race');
assert.equal(run('state.race.snapshot().remaining'),7,'other balls do not need to exit');
const winner=run('state.race.winner.id');
run('state.race.exit(state.race.balls[0]);var stopTime=state.race.time;state.race.step(1)');
assert.equal(run('state.race.winner.id'),winner,'later exit cannot replace winner');
assert.equal(run('state.race.time'),run('stopTime'),'simulation stops after first exit');
assert.equal(run('finish()'),true);assert.equal(run('state.project.id'),winner);
const count=run('state.history.length');run('finish()');assert.equal(run('state.history.length'),count);
assert.equal(run('collection.get(state.project.id).drawCount'),1,'duplicate finish does not duplicate collection draw');
assert.equal(run('new Set(PROJECTS.map(p=>p.quoteId)).size'),24,'unique one-to-one project mapping');
assert.equal(run('PROJECTS.every(p=>quotes.some(q=>q.id===p.quoteId))'),true,'every project has a valid quote');
assert.equal(run("PROJECTS.filter(p=>quotes.find(q=>q.id===p.quoteId).kind==='fighter').length"),3,'all three UFC fighters assigned');
assert.equal(run("quotes.some(q=>['gsp','aldo','tanjiro'].includes(q.art))"),false,'requested people removed');
assert.equal(run('quotes.every(q=>PROJECTS.some(p=>p.quoteId===q.id))'),true,'no unassigned quotes remain');
run("collection.items.splice(0);state.history=[];state.race=null;state.round=null;state.screen='home'");
for(let i=0;i<24;i++){
 run('startGame()');
 run(`state.race=new AnonymousRace([PROJECTS[${i}]])`);
 const selectedId=run(`PROJECTS[${i}].quoteId`);
 run('pause();resume()');
 run('state.race.exit(state.race.balls[0]);finish()');
 assert.equal(run('quotes[state.quote].id'),selectedId,'winner determines its fixed quote');
 assert.equal(run('state.history[0].quoteId'),selectedId,'record stores fixed pairing');
 assert.ok(getNode('#main').innerHTML.includes(run('quotes[state.quote].text')),'selected words rendered');
 assert.ok(getNode('#main').innerHTML.includes(run('`assets/${quotes[state.quote].art}.png`')),'matching portrait rendered');
 assert.ok(getNode('#main').innerHTML.includes(run(`PROJECTS[${i}].learning[0].knowledge`)),'specific learning outcome rendered');
 run('render()');assert.equal(run('quotes[state.quote].id'),selectedId,'rerender does not reroll');
 events.get('click')({target:{closest:selector=>selector==='[data-project]'?{dataset:{project:run(`PROJECTS[${i}].id`)}}:null}});
 assert.equal(run('quotes[state.quote].id'),selectedId,'project detail uses same pairing');
 run(`collection.toggle(PROJECTS[${i}].id)`);
}
run('collection.items.forEach(entry=>entry.completedAt=null)');
const previousRecord=run('JSON.parse(JSON.stringify(state.history[3]))');
events.get('click')({target:{closest:selector=>selector==='[data-history]'?{dataset:{history:'3'}}:null}});
assert.equal(run('quotes[state.quote].id'),previousRecord.quoteId,'history restores its original person');
assert.equal(run('state.project.id'),previousRecord.projectId,'history restores its original mission');
assert.equal(run('state.quoteDate'),previousRecord.quoteDate,'history restores original date');
const collectedId=run('state.project.id');
events.get('change')({target:{dataset:{complete:collectedId}}});
assert.ok(run('collection.get(state.project.id).completedAt'),'result completion checkbox works');
run("navigate('collection')");
assert.equal((getNode('#main').innerHTML.match(/class="collected-project/g)||[]).length,24,'collection outlives ten-result history');
assert.equal(run('state.history.length'),10);
events.get('click')({target:{closest:selector=>selector==='[data-collection-filter]'?{dataset:{collectionFilter:'done'}}:null}});
assert.equal((getNode('#main').innerHTML.match(/class="collected-project/g)||[]).length,1,'completed filter');
events.get('change')({target:{dataset:{complete:collectedId}}});
assert.equal(run(`collection.get('${collectedId}').completedAt`),null,'completion can be undone');
assert.ok(getNode('#main').innerHTML.includes('이 상태의 프로젝트는 아직 없어요.'),'empty filter feedback');
events.get('change')({target:{dataset:{complete:collectedId}}});
const priorRandomRecords=JSON.parse(values.get('project-pinball:curriculum4:history:v1'));
priorRandomRecords[0].quoteId='q24';
values.set('project-pinball:curriculum4:history:v1',JSON.stringify(priorRandomRecords));
const reloadContext=vm.createContext({...context,document:{...context.document,addEventListener(){}},location:{hash:'#result'}});
for(const file of ['projects.js','quotes.js','race-engine.js','track-view.js','project-collection.js','app.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),reloadContext);
const latestRecord=run('state.history[0]');
assert.equal(vm.runInContext('state.project.id',reloadContext),latestRecord.projectId,'reload restores latest result project');
assert.equal(vm.runInContext('quotes[state.quote].id',reloadContext),latestRecord.quoteId,'reload preserves fixed quote and portrait');
assert.equal(vm.runInContext('state.quoteDate',reloadContext),latestRecord.quoteDate,'reload restores result date');
assert.ok(vm.runInContext(`collection.get('${collectedId}').completedAt`,reloadContext),'reload preserves completion');
assert.equal(vm.runInContext('collection.items.length',reloadContext),24,'reload preserves full collection');
run("navigate('admin-quotes')");
assert.equal((getNode('#main').innerHTML.match(/class="character-card"/g)||[]).length,24);
run("navigate('admin-projects')");events.get('input')({target:{id:'project-search',value:'CSV'}});assert.equal((getNode('#projects-body').innerHTML.match(/<tr>/g)||[]).length,1);
run("navigate('no-candidates')");assert.ok(getNode('#main').innerHTML.includes('미완료 프로젝트'),'diagnostic route cannot bypass progression lock');
run('function seeded(seed){return ()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}}');
run('var a=new AnonymousRace(PROJECTS.slice(0,8),seeded(11));var b=new AnonymousRace(PROJECTS.slice(0,8),seeded(11));a.balls.forEach(x=>a.exit(x));[...b.balls].reverse().forEach(x=>b.exit(x))');
assert.notEqual(run('a.winner.id'),run('b.winner.id'),'exit order changes mission');
run('var c=new AnonymousRace(PROJECTS.slice(0,2),seeded(9));var d=new AnonymousRace(PROJECTS.slice(0,2),seeded(9));d.exit(d.balls[1]);d.exit(d.balls[0]);c.balls.forEach(x=>{x.release=0;x.vx=0;});Object.assign(c.balls[0],{x:270,y:RACE_TUNING.finishY-1,vy:100});Object.assign(c.balls[1],{x:330,y:RACE_TUNING.finishY-2,vy:260});c.integrate(.02);');
assert.equal(run('c.winner.id'),run('d.winner.id'),'fractional crossing order');
run('var e=new AnonymousRace(PROJECTS.slice(0,8),seeded(5));e.balls[0].release=0;e.balls[0].x=300;e.balls[0].y=320;var before=e.balls[0].vy;e.pulse(300,345)');
assert.ok(run('e.balls[0].vy<before'),'pulse is physical impulse');
assert.equal(run('e.pulse(300,345)'),false,'pulse cooldown');
let maxDuration=0,changedWinners=0;
const durations=[],passiveDurations=[];
run('var mechanics=new AnonymousRace(PROJECTS.slice(0,8),seeded(4));');
assert.equal(run('mechanics.barriers().length'),4);
assert.equal(run('mechanics.sweepers().length'),2);
assert.equal(run('mechanics.gate().half*2'),130);
const initialGate=run('mechanics.gate().x');
run('mechanics.time=1');
assert.notEqual(run('mechanics.gate().x'),initialGate,'gate moves');
run('var initialPaddleX=mechanics.paddle.x;mechanics.movePaddle(500,400)');
assert.equal(run('mechanics.paddle.x'),run('initialPaddleX'),'paddle cannot teleport');
run('mechanics.step(1/60)');
assert.ok(run('mechanics.paddle.x>initialPaddleX&&mechanics.paddle.x<500'),'paddle moves at limited speed');
assert.equal(run('RACE_TUNING.pulseCooldown'),1.4);
assert.ok(run('RACE_TUNING.trackHeight>RACE_TUNING.viewportHeight*5'),'course exceeds five camera windows');
run('var cameraTest=new AnonymousRace(PROJECTS.slice(0,8),seeded(2));cameraTest.balls[0].y=1400;cameraTest.balls[0].release=0;cameraTest.step(.1)');
assert.ok(run('cameraTest.cameraY>0'),'camera follows the leader');
assert.ok(run('cameraTest.paddle.y>345'),'player paddle follows camera');
assert.ok(run('cameraTest.snapshot().progress>0.3'),'course progress matches world position');
run('cameraTest.balls[0].y=3400;cameraTest.updateCamera(.5)');
assert.ok(run('cameraTest.cameraY<=RACE_TUNING.trackHeight-RACE_TUNING.viewportHeight'),'camera clamped to track');
for(let seed=1;seed<=15;seed++){
 run(`var raceTest=new AnonymousRace(PROJECTS.slice(0,8),seeded(${seed}));var n=0;while(!raceTest.done&&n++<5400){if(n%31===0)raceTest.movePaddle(100+(n*17)%400,raceTest.cameraY+180+(n*7)%300);if(n%100===0)raceTest.pulse();raceTest.step(1/60);}`);
 assert.equal(run('raceTest.done'),true,`seed ${seed} drains`);
 assert.equal(run('raceTest.exited'),1);
 assert.ok(run('PROJECTS.includes(raceTest.winner)'));
 maxDuration=Math.max(maxDuration,run('raceTest.time'));
 durations.push(run('raceTest.time'));
 const controlledWinner=run('raceTest.winner.id');
 run(`var passiveRace=new AnonymousRace(PROJECTS.slice(0,8),seeded(${seed}));var passiveN=0;while(!passiveRace.done&&passiveN++<5400)passiveRace.step(1/60);`);
 assert.equal(run('passiveRace.done'),true,`passive seed ${seed} drains`);
 passiveDurations.push(run('passiveRace.time'));
 if(controlledWinner!==run('passiveRace.winner.id'))changedWinners++;
}
assert.ok(changedWinners>0,'real interference changes the winner under matched initial seeds');
const lockedHistory=run('JSON.stringify(state.history)');
for(let i=0;i<12;i++)assert.equal(run('startGame()'),false,'unfinished projects block repeated starts');
assert.equal(run('JSON.stringify(state.history)'),lockedHistory,'blocked starts do not write race records');
assert.equal(run('state.history.length'),10);
assert.ok(values.has('project-pinball:curriculum4:history:v1'));
assert.ok(!values.has('project-pinball:race-mockup:v1'),'prior creative quotes history left untouched');
assert.ok(!values.has('project-pinball:mvp:v1'));
// Follow the real progression using the engine's actual, anonymous winning ball.
run("collection.items.splice(0);state.history=[];state.race=null;state.round=null;navigate('home')");
assert.equal(run('progress().stage'),0);
events.get('click')({target:{closest:selector=>selector==='[data-level]'?{disabled:false,dataset:{level:'2'}}:null}});
assert.equal(run('state.level'),0,'cannot skip ahead via level controls');
const completedJourney=new Set();
for(let n=0;n<24;n++){
 const boundaries=[8,15,21,24],expectedLevel=boundaries.findIndex(end=>n<end),expectedBalls=run('candidates().length');
 assert.equal(run('progress().stage'),expectedLevel,'stage unlocks after its actual total is complete');
 if(expectedLevel<2)assert.equal(expectedBalls,boundaries[expectedLevel]-n,'independent stages shrink from eight or seven');
 if(expectedLevel===3){assert.equal(expectedBalls,1,'final service missions have a single eligible candidate');assert.equal(run('candidates()[0].id'),['p28','p29','p30'][n-21]);}
 assert.equal(run('startGame()'),true);
 assert.equal(run('state.race.total'),expectedBalls,'only unfinished projects enter race, including final single ball');
 run('state.race.exit(state.race.balls[0]);finish()');
 const wonId=run('state.project.id');
 for(const prerequisite of run('state.project.prerequisites'))assert.ok(completedJourney.has(prerequisite),'winner prerequisites were completed');
 assert.ok(!completedJourney.has(wonId),'completed project cannot be redrawn');
 completedJourney.add(wonId);
 assert.equal(run('state.project.level'),expectedLevel);
 assert.equal(run('canPlay()'),false,'new mission immediately locks next race');
 assert.ok(getNode('#main').innerHTML.includes('미완료 프로젝트를 모두 완료하면 열려요.'));
 assert.equal(run('createRound()'),false,'round creation guard');
 assert.equal(run('startGame(true)'),false,'automatic race guard');
 for(const route of ['playing','paused','finish-line']){
   run(`navigate('${route}')`);
   assert.equal(run('state.screen'),'home','direct route guarded');
   assert.equal(run('state.race'),null,'blocked route creates no race');
 }
 assert.equal(run('resume()'),false,'resume guard');
 assert.equal(run('autoFlow()'),false,'auto flow guard');
 events.get('change')({target:{dataset:{complete:wonId}}});
 assert.ok(run(`collection.get('${wonId}').completedAt`),'manual completion unlocks next mission');
 if(n<23)assert.equal(run('canPlay()'),true);
}
assert.equal(completedJourney.size,24,'all projects completed exactly once');
assert.equal(run('progress().complete'),true);
assert.equal(run('candidates().length'),0);
assert.equal(run('startGame()'),false,'all-complete journey does not create an empty race');
assert.ok(getNode('#main').innerHTML.includes('24 / 24 PROJECTS COMPLETED'));
events.get('change')({target:{dataset:{complete:'p01'}}});
assert.equal(run('progress().stage'),0,'undo completion restores earliest incomplete stage');
assert.equal(run('canPlay()'),false,'undone completion must be finished again');
assert.equal(run("candidates()[0].id"),'p01');
const lockedReload=vm.createContext({...context,document:{...context.document,addEventListener(){}},location:{hash:'#playing'}});
for(const file of ['projects.js','quotes.js','race-engine.js','track-view.js','project-collection.js','app.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),lockedReload);
assert.equal(vm.runInContext('state.screen',lockedReload),'home','reload on playing URL cannot bypass lock');
assert.equal(vm.runInContext('canPlay()',lockedReload),false,'lock survives reload');
const progressFn=run('projectProgress');
assert.equal(progressFn(run('PROJECTS'),[{projectId:'p25',completedAt:null},{projectId:'p03',completedAt:null}]).pending.length,2,'all legacy unfinished projects block the journey');
run('var singleBallRace=new AnonymousRace(PROJECTS.slice(0,1),seeded(7));var singleSteps=0;while(!singleBallRace.done&&singleSteps++<6000)singleBallRace.step(1/60)');
assert.equal(run('singleBallRace.done'),true,'final single ball can physically finish the full course');
assert.equal(run('singleBallRace.winner.id'),'p01');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');for(const[,asset]of html.matchAll(/(?:src|href)="([^"#]+)"/g))assert.ok(fs.existsSync(path.join(root,asset)),asset);
console.log(`PASS: 24 distinct quotes and portraits, fixed one-to-one project pairing, all three UFC fighters assigned, winner-matched quote/portrait, stable detail/history/reload, legacy random record normalization, 17 screens, vertical world, chase camera bounds, camera-relative paddle, hidden identities, FIRST actual finish, immediate stop, fractional exit order, pulse, history, assets. 30 simulated races; controlled vs passive winners differ in ${changedWinners}/15 matched seeds. Slowest controlled race ${maxDuration.toFixed(1)}s.`);
console.log(`Median controlled race: ${durations.sort((a,b)=>a-b)[7].toFixed(1)}s. Median passive race: ${passiveDurations.sort((a,b)=>a-b)[7].toFixed(1)}s.`);
console.log('LIMIT: Browser layout and real pointer/keyboard input have not been verified.');
console.log('PASS: sequential 8+7+6+3 progression, dependency-filtered candidates and ordered final service missions, 24 unique missions, global unfinished lock, manual completion, all entry-point guards, reload, undo, final all-complete screen.');
