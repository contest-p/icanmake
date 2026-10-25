'use strict';
function validCalendarDate(value){
  if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;
  const time=Date.parse(value+'T00:00:00Z');return Number.isFinite(time)&&new Date(time).toISOString().slice(0,10)===value;
}
function validRecordInstant(value){
  return typeof value==='string'&&/^\d{4}-\d{2}-\d{2}T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,3})?(?:Z|[+-](?:0\d|1[0-4]):[0-5]\d)$/.test(value)&&validCalendarDate(value.slice(0,10))&&Number.isFinite(Date.parse(value));
}
function sanitizeHistory(raw,projects,quotes){
  if(!Array.isArray(raw))return [];
  const seen=new Set(),result=[],knownQuotes=new Set([...quotes.map(q=>q.id),'q17','q24','q25']);
  for(const record of raw){
    if(!record||typeof record!=='object'||Array.isArray(record)||record.sample===true||typeof record.roundId!=='string'||!record.roundId.trim()||record.roundId.length>200||typeof record.projectId!=='string'||typeof record.quoteId!=='string'||!knownQuotes.has(record.quoteId)||!validCalendarDate(record.quoteDate)||!validRecordInstant(record.date))continue;
    const project=projects.find(p=>p.id===record.projectId),roundId=record.roundId.trim();
    if(!project||seen.has(roundId))continue;
    seen.add(roundId);result.push({roundId,projectId:project.id,quoteId:project.quoteId,quoteDate:record.quoteDate,date:record.date});
  }
  return result.sort((a,b)=>Date.parse(b.date)-Date.parse(a.date)).slice(0,10);
}
function projectProgress(projects,items){
  const completed=new Set(items.filter(p=>p.completedAt).map(p=>p.projectId));
  const levels=[...new Set(projects.map(p=>p.level))].sort((a,b)=>a-b).map(level=>{const group=projects.filter(p=>p.level===level);return {level,total:group.length,done:group.filter(p=>completed.has(p.id)).length};});
  const first=levels.findIndex(level=>level.done<level.total),stage=first<0?levels.length:first;
  const unfinished=items.filter(entry=>!entry.completedAt&&projects.some(p=>p.id===entry.projectId));
  const remaining=projects.filter(p=>p.level===stage&&!completed.has(p.id));
  const candidates=remaining.filter(p=>(p.prerequisites||[]).every(id=>completed.has(id)));
  const pending=unfinished.filter(entry=>candidates.some(p=>p.id===entry.projectId));
  const deferred=unfinished.filter(entry=>!pending.includes(entry));
  return {levels,stage,pending,deferred,remaining,complete:stage===levels.length,blocked:pending.length>0||stage===levels.length,candidates};
}
// A project collection is independent of the ten most recent race results.
function createProjectCollection(storage,projects,history=[]){
  const key=CURRICULUM.collectionKey,items=[],validId=id=>projects.some(p=>p.id===id);
  const validDate=validRecordInstant;
  let warning=false,seeded=false;
  try{
    const current=storage.getItem(key),legacy=current===null?storage.getItem(CURRICULUM.legacyCollectionKey):null;
    const raw=JSON.parse(current??legacy??'[]');
    seeded=current===null&&legacy!==null;
    if(!Array.isArray(raw))throw new Error('Invalid collection');
    for(const entry of raw){
      if(!entry||!validId(entry.projectId)||items.some(p=>p.projectId===entry.projectId)||!validDate(entry.firstDrawnAt)||!validDate(entry.lastDrawnAt))continue;
      items.push({projectId:entry.projectId,firstDrawnAt:entry.firstDrawnAt,lastDrawnAt:entry.lastDrawnAt,drawCount:Number.isSafeInteger(entry.drawCount)&&entry.drawCount>0?entry.drawCount:1,completedAt:validDate(entry.completedAt)?entry.completedAt:null});
    }
  }catch{warning=true;}
  for(const project of projects){
    if(items.some(p=>p.projectId===project.id))continue;
    const records=history.filter(r=>r&&!r.sample&&r.projectId===project.id&&validDate(r.date)).sort((a,b)=>Date.parse(a.date)-Date.parse(b.date));
    if(records.length){items.push({projectId:project.id,firstDrawnAt:records[0].date,lastDrawnAt:records[records.length-1].date,drawCount:records.length,completedAt:null});seeded=true;}
  }
  function save(){try{storage.setItem(key,JSON.stringify(items));warning=false;return true;}catch{warning=true;return false;}}
  function get(id){return items.find(p=>p.projectId===id);}
  if(seeded)save();
  return {items,get,get warning(){return warning;},
    draw(projectId,date){
      if(!validId(projectId)||!validDate(date))return false;
      const entry=get(projectId);
      if(entry){entry.lastDrawnAt=date;entry.drawCount++;}
      else items.push({projectId,firstDrawnAt:date,lastDrawnAt:date,drawCount:1,completedAt:null});
      return save();
    },
    toggle(projectId,date=new Date().toISOString()){
      const entry=get(projectId);if(!entry||!validDate(date))return false;
      entry.completedAt=entry.completedAt?null:date;return save();
    }
  };
}
