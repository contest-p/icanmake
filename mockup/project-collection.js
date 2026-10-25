'use strict';
function projectProgress(projects,items){
  const completed=new Set(items.filter(p=>p.completedAt).map(p=>p.projectId));
  const levels=[...new Set(projects.map(p=>p.level))].sort((a,b)=>a-b).map(level=>{const group=projects.filter(p=>p.level===level);return {level,total:group.length,done:group.filter(p=>completed.has(p.id)).length};});
  const first=levels.findIndex(level=>level.done<level.total),stage=first<0?levels.length:first;
  const pending=items.filter(entry=>!entry.completedAt&&projects.some(p=>p.id===entry.projectId));
  const remaining=projects.filter(p=>p.level===stage&&!completed.has(p.id));
  const candidates=remaining.filter(p=>(p.prerequisites||[]).every(id=>completed.has(id)));
  return {levels,stage,pending,remaining,complete:stage===levels.length,blocked:pending.length>0||stage===levels.length,candidates};
}
// A project collection is independent of the ten most recent race results.
function createProjectCollection(storage,projects,history=[]){
  const key=CURRICULUM.collectionKey,items=[],validId=id=>projects.some(p=>p.id===id);
  const validDate=value=>typeof value==='string'&&!Number.isNaN(Date.parse(value));
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
