'use strict';
const RACE_TUNING = Object.freeze({pulseCooldown:1.4,pulseRadius:105,paddleHalf:46,paddleSpeed:420,releaseAt:60,exitHalf:70,trackHeight:3600,viewportHeight:650,finishY:3540});
// Each project belongs to exactly one ball. The first actual exit wins immediately.
class AnonymousRace {
  #assignments = new Map();
  #winner = null;
  constructor(projects, random = Math.random) {
    if (!projects.length) throw new Error('A race needs at least one project.');
    this.random = random;
    this.time = 0;
    this.exited = 0;
    this.done = false;
    this.flow = false;
    this.interactions = 0;
    this.pulseCooldown = 0;
    this.pulseRing = null;
    this.cameraY = 0;
    this.leaderY = 50;
    this.paddle = {x:300,y:345,px:300,py:345,targetX:300,targetY:345,half:RACE_TUNING.paddleHalf,r:8};
    const shuffled = [...projects];
    for (let i=shuffled.length-1;i>0;i--) {const j=Math.floor(random()*(i+1));[shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];}
    this.balls = shuffled.map((project,i)=>{
      this.#assignments.set(i,project);
      return {slot:i,x:65+random()*470,y:50+random()*16,vx:(random()-.5)*90,vy:0,r:9,release:i*.1,out:false,stuck:0};
    });
    this.total = this.balls.length;
    this.pins = [];
    [430,550,685,815,1480,1590,2180,2300].forEach((y,row)=>{
      for(let x=row%2?105:55;x<570;x+=110)this.pins.push({x,y,r:9});
    });
  }
  get winner() { return this.done ? this.#winner : null; }
  snapshot() {
    const section=this.section();
    return {remaining:this.total-this.exited,total:this.total,exited:this.exited,done:this.done,time:this.time,flow:this.flow,interactions:this.interactions,
      cameraY:this.cameraY,trackHeight:RACE_TUNING.trackHeight,viewportHeight:RACE_TUNING.viewportHeight,finishY:RACE_TUNING.finishY,
      progress:Math.min(1,this.leaderY/RACE_TUNING.finishY),section,
      trailing:this.balls.filter(b=>!b.out&&b.release<=this.time&&b.y<this.cameraY).length,
      speed:Math.max(0,...this.balls.filter(b=>!b.out).map(b=>b.vy)),
      balls:this.balls.filter(b=>!b.out&&b.release<=this.time).map(b=>({slot:b.slot,x:b.x,y:b.y,r:b.r,vx:b.vx,vy:b.vy})),
      paddle:{x:this.paddle.x,y:this.paddle.y,half:this.paddle.half},pins:this.pins,barriers:this.barriers(),sweepers:this.sweepers(),gate:this.gate(),pulse:this.pulseRing};
  }
  barriers() {
    if(this.flow)return [];
    return [
      {x:160,y:1050,angle:this.time*.95,omega:.95,half:92},
      {x:440,y:1260,angle:-this.time*1.15+.8,omega:-1.15,half:86},
      {x:190,y:1840,angle:-this.time*.8+.6,omega:-.8,half:82},
      {x:410,y:2050,angle:this.time*1.05+.4,omega:1.05,half:80}
    ];
  }
  sweepers(){
    if(this.flow)return [];
    return [{x:300+Math.sin(this.time*1.2)*155,y:940,r:22,vx:Math.cos(this.time*1.2)*186},
      {x:300+Math.sin(this.time*1.45+1.7)*175,y:2420,r:24,vx:Math.cos(this.time*1.45+1.7)*253.75}];
  }
  gate(){
    return this.flow?null:{x:300+Math.sin(this.time*.7)*140,y:2800,outerY:2680,half:65,vx:Math.cos(this.time*.7)*98};
  }
  section(){
    const y=this.leaderY;
    return y<900?0:y<1750?1:y<2550?2:y<3150?3:4;
  }
  updateCamera(dt){
    this.leaderY=Math.max(this.leaderY,...this.balls.filter(b=>b.release<=this.time).map(b=>b.y));
    const target=Math.max(0,Math.min(RACE_TUNING.trackHeight-RACE_TUNING.viewportHeight,this.leaderY-RACE_TUNING.viewportHeight*.38));
    const previous=this.cameraY;
    this.cameraY+=(target-this.cameraY)*(1-Math.exp(-9*dt));
    const travel=this.cameraY-previous;
    // Player's paddle remains in the camera window; world coordinates never reset.
    this.paddle.y+=travel;this.paddle.py+=travel;this.paddle.targetY+=travel;
  }
  movePaddle(x,y) {
    if(this.done||this.flow)return;
    this.paddle.targetX=Math.max(76,Math.min(524,x));
    this.paddle.targetY=Math.max(this.cameraY+100,Math.min(this.cameraY+RACE_TUNING.viewportHeight-90,y));
  }
  countInteraction(){if(!this.done&&!this.flow)this.interactions++;}
  pulse(x=this.paddle.x,y=this.paddle.y) {
    if(this.done||this.flow||this.pulseCooldown>0)return false;
    this.pulseCooldown=RACE_TUNING.pulseCooldown;
    this.pulseRing={x,y,life:.45};
    this.interactions++;
    for(const b of this.balls){
      if(b.out||b.release>this.time)continue;
      const dx=b.x-x,dy=b.y-y,d=Math.hypot(dx,dy);
      if(d<RACE_TUNING.pulseRadius){const k=1-d/RACE_TUNING.pulseRadius;const nx=d>.5?dx/d:(this.random()-.5)*2;const ny=d>.5?dy/d:-1;b.vx+=nx*285*k;b.vy+=ny*285*k-65*k;}
    }
    return true;
  }
  releaseObstacles(){this.flow=true;this.pulseRing=null;}
  circleCollision(b,x,y,r,bounce=.68) {
    const dx=b.x-x,dy=b.y-y,d=Math.hypot(dx,dy),limit=b.r+r;
    if(d>=limit)return;
    const nx=d>.0001?dx/d:1,ny=d>.0001?dy/d:0;
    b.x=x+nx*(limit+.08);b.y=y+ny*(limit+.08);
    const dot=b.vx*nx+b.vy*ny;
    if(dot<0){b.vx-=(1+bounce)*dot*nx;b.vy-=(1+bounce)*dot*ny;}
  }
  segmentCollision(b,ax,ay,bx,by,r=3,surfaceVX=0,surfaceVY=0) {
    const sx=bx-ax,sy=by-ay;
    const t=Math.max(0,Math.min(1,((b.x-ax)*sx+(b.y-ay)*sy)/(sx*sx+sy*sy||1)));
    const x=ax+t*sx,y=ay+t*sy;
    const dx=b.x-x,dy=b.y-y,d=Math.hypot(dx,dy),limit=b.r+r;
    if(d>=limit)return;
    const nx=d>.0001?dx/d:0,ny=d>.0001?dy/d:-1;
    b.x=x+nx*(limit+.08);b.y=y+ny*(limit+.08);
    const relative=(b.vx-surfaceVX)*nx+(b.vy-surfaceVY)*ny;
    if(relative<0){b.vx-=1.6*relative*nx;b.vy-=1.6*relative*ny;}
  }
  step(elapsed) {
    if(this.done||elapsed<=0)return;
    const capped=Math.min(elapsed,.1),steps=Math.ceil(capped/(1/180)),dt=capped/steps;
    for(let s=0;s<steps&&!this.done;s++)this.integrate(dt);
  }
  integrate(dt) {
    this.time+=dt;
    this.pulseCooldown=Math.max(0,this.pulseCooldown-dt);
    if(this.pulseRing){this.pulseRing.life-=dt;if(this.pulseRing.life<=0)this.pulseRing=null;}
    // Long races open their obstacles; they never select a different winner.
    if(this.time>RACE_TUNING.releaseAt)this.releaseObstacles();
    const moveX=this.paddle.targetX-this.paddle.x,moveY=this.paddle.targetY-this.paddle.y,moveDistance=Math.hypot(moveX,moveY);
    if(moveDistance>0){const fraction=Math.min(1,RACE_TUNING.paddleSpeed*dt/moveDistance);this.paddle.x+=moveX*fraction;this.paddle.y+=moveY*fraction;}
    const paddleVX=Math.max(-220,Math.min(220,(this.paddle.x-this.paddle.px)/dt));
    const paddleVY=Math.max(-220,Math.min(220,(this.paddle.y-this.paddle.py)/dt));
    this.paddle.px=this.paddle.x;this.paddle.py=this.paddle.y;
    const crossings=[];
    for(const b of this.balls){
      if(b.out||b.release>this.time)continue;
      const oldX=b.x,oldY=b.y;
      const boost=b.y>2900;
      b.vy+=(this.flow?760:boost?820:550)*dt;b.vx*=Math.exp(-.1*dt);
      if(b.y>1750&&b.y<2550)b.vx+=Math.sin(this.time*2.2+b.y*.004)*60*dt;
      b.vx=Math.max(-420,Math.min(420,b.vx));b.vy=Math.max(-430,Math.min(boost?900:650,b.vy));
      b.x+=b.vx*dt;b.y+=b.vy*dt;
      if(b.x<26+b.r){b.x=26+b.r;b.vx=Math.abs(b.vx)*.65;}
      if(b.x>574-b.r){b.x=574-b.r;b.vx=-Math.abs(b.vx)*.65;}
      if(b.y<27){b.y=27;b.vy=Math.abs(b.vy)*.55;}
      if(!this.flow){
        for(const p of this.pins)this.circleCollision(b,p.x,p.y,p.r);
        for(const bar of this.barriers()){const dx=Math.cos(bar.angle)*bar.half,dy=Math.sin(bar.angle)*bar.half;this.segmentCollision(b,bar.x-dx,bar.y-dy,bar.x+dx,bar.y+dy,7,-bar.omega*(b.y-bar.y),bar.omega*(b.x-bar.x));}
        for(const sweeper of this.sweepers()){
          const oldVX=b.vx;b.vx-=sweeper.vx;this.circleCollision(b,sweeper.x,sweeper.y,sweeper.r,.8);b.vx+=sweeper.vx;
          if(!Number.isFinite(b.vx))b.vx=oldVX;
        }
        const gate=this.gate();
        this.segmentCollision(b,26,gate.outerY,gate.x-gate.half,gate.y,6,gate.vx*.15,0);
        this.segmentCollision(b,gate.x+gate.half,gate.y,574,gate.outerY,6,gate.vx*.15,0);
        this.segmentCollision(b,this.paddle.x-this.paddle.half,this.paddle.y,this.paddle.x+this.paddle.half,this.paddle.y,8,paddleVX,paddleVY);
      }
      this.segmentCollision(b,26,3370,300-RACE_TUNING.exitHalf,3490,4);
      this.segmentCollision(b,574,3370,300+RACE_TUNING.exitHalf,3490,4);
      if(b.y>3490){if(b.x<300-RACE_TUNING.exitHalf+b.r){b.x=300-RACE_TUNING.exitHalf+b.r;b.vx=Math.abs(b.vx)*.4;}if(b.x>300+RACE_TUNING.exitHalf-b.r){b.x=300+RACE_TUNING.exitHalf-b.r;b.vx=-Math.abs(b.vx)*.4;}}
      const moved=Math.hypot(b.x-oldX,b.y-oldY);
      b.stuck=moved<2*dt?b.stuck+dt:Math.max(0,b.stuck-dt*.5);
      if(b.stuck>2.3){b.vx+=(this.random()-.5)*180;b.vy=-105;b.stuck=0;}
      if(b.y>=RACE_TUNING.finishY){crossings.push({ball:b,fraction:(RACE_TUNING.finishY-oldY)/(b.y-oldY||1)});}
    }
    const live=this.balls.filter(b=>!b.out&&b.release<=this.time&&b.y<RACE_TUNING.finishY);
    for(let i=0;i<live.length;i++)for(let j=i+1;j<live.length;j++){
      const a=live[i],b=live[j],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy),sum=a.r+b.r;
      if(d>=sum)continue;
      const nx=d>.0001?dx/d:1,ny=d>.0001?dy/d:0,overlap=(sum-d)/2+.01;
      a.x-=nx*overlap;a.y-=ny*overlap;b.x+=nx*overlap;b.y+=ny*overlap;
      const relative=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;
      if(relative<0){const impulse=-relative*.78;a.vx-=impulse*nx;a.vy-=impulse*ny;b.vx+=impulse*nx;b.vy+=impulse*ny;}
    }
    // Sort fractional crossing times, not array/project order. Exact ties use randomness.
    crossings.forEach(c=>c.tie=this.random());
    crossings.sort((a,b)=>a.fraction-b.fraction||a.tie-b.tie);
    for(const {ball} of crossings)this.exit(ball);
    this.updateCamera(dt);
  }
  exit(ball) {
    if(ball.out||this.done)return;
    ball.out=true;this.exited++;
    this.done=true;
    this.#winner=this.#assignments.get(ball.slot);
  }
}
