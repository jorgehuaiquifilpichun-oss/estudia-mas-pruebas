
/* Estudia+ · Química · Tabla periódica interactiva. Datos locales; se aísla en Shadow DOM dentro de #tp-host. */
(function(){
(function(){
"use strict";
var host=document.getElementById("tp-host");if(!host||!host.attachShadow)return;
var root=host.attachShadow({mode:"open"});
root.innerHTML='<link rel="stylesheet" href="materias/tabla-periodica.css"><div class="tp">'+'<header><h1>Tabla periódica interactiva</h1><p>Explora, compara y practica los 118 elementos.</p></header>\n<nav class="tabs" aria-label="Modo"><button class="on" data-v="explorar">Explorar</button><button data-v="comparar">Comparar</button><button data-v="muda">Tabla muda</button><button data-v="adivina">Adivina</button><button data-v="practicar">Practicar</button></nav>\n\n<section id="v-tabla" class="view on2">\n  <div class="bar"><input type="search" id="q" placeholder="Nombre, símbolo o número…" aria-label="Buscar elemento" autocomplete="off">\n    <select id="trend" aria-label="Colorear por"><option value="fam">Color: familia</option><option value="mass">Color: masa</option><option value="per">Color: período</option><option value="grp">Color: grupo</option></select><div class="zoom"><button class="btn" id="zm" aria-label="Alejar">−</button><button class="btn" id="zp" aria-label="Acercar">+</button></div></div>\n  <div class="chips" id="chips" role="group" aria-label="Filtrar por familia"></div>\n  <p class="hint" id="hint">Toca un elemento para ver su ficha. Desliza la tabla para moverte.</p>\n  <p class="hint" id="legend"></p><div class="chips" id="mutebar" style="display:none"></div><div class="wrap"><div class="grid" id="grid" role="grid" aria-label="Tabla periódica"></div></div>\n</section>\n\n<section id="v-practicar" class="view">\n  <div class="quiz">\n    <div class="chips" style="padding:6px 0" id="qmodes"></div>\n    <div class="q"><div class="score"><span><b id="sOk">0</b>Aciertos</span><span><b id="sRacha">0</b>Racha</span><span><b id="sTot">0</b>Intentos</span><span><b id="sDom">0</b>Dominados</span></div>\n      <div style="color:var(--mu);font-size:13px" id="qtype"></div><h2 id="qtxt"></h2><div class="opts" id="opts"></div>\n      <p id="fb" style="min-height:22px;margin:12px 0 0;font-weight:600"></p></div>\n  </div>\n</section>\n\n<section id="v-adivina" class="view"><div class="quiz"><div class="q"><div class="score"><span><b id="gPts">0</b>Puntos</span><span><b id="gN">0</b>Resueltos</span></div><div style="color:var(--mu);font-size:13px">¿Qué elemento soy?</div><ul id="gh" style="text-align:left;padding-left:20px;margin:12px 0"></ul><div style="display:flex;gap:8px"><input type="search" id="ga" placeholder="Nombre o símbolo" autocomplete="off"><button class="btn on" id="gok">Probar</button></div><div style="display:flex;gap:8px;margin-top:8px"><button class="btn" id="gh2" style="flex:1">Otra pista</button><button class="btn" id="gg" style="flex:1">Rendirme</button></div><p id="gfb" style="min-height:22px;margin:12px 0 0;font-weight:600"></p><p style="color:var(--mu);font-size:12px;margin:0">Menos pistas = más puntos (6 a 1).</p></div></div></section>\n<aside class="panel off" id="panel" aria-live="polite"><button class="x" id="px" aria-label="Cerrar">×</button><div id="pc"></div></aside>'+'</div>';
var SYM="H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og".split(" ");
var NAM="Hidrógeno,Helio,Litio,Berilio,Boro,Carbono,Nitrógeno,Oxígeno,Flúor,Neón,Sodio,Magnesio,Aluminio,Silicio,Fósforo,Azufre,Cloro,Argón,Potasio,Calcio,Escandio,Titanio,Vanadio,Cromo,Manganeso,Hierro,Cobalto,Níquel,Cobre,Zinc,Galio,Germanio,Arsénico,Selenio,Bromo,Kriptón,Rubidio,Estroncio,Itrio,Circonio,Niobio,Molibdeno,Tecnecio,Rutenio,Rodio,Paladio,Plata,Cadmio,Indio,Estaño,Antimonio,Telurio,Yodo,Xenón,Cesio,Bario,Lantano,Cerio,Praseodimio,Neodimio,Prometio,Samario,Europio,Gadolinio,Terbio,Disprosio,Holmio,Erbio,Tulio,Iterbio,Lutecio,Hafnio,Tántalo,Wolframio,Renio,Osmio,Iridio,Platino,Oro,Mercurio,Talio,Plomo,Bismuto,Polonio,Astato,Radón,Francio,Radio,Actinio,Torio,Protactinio,Uranio,Neptunio,Plutonio,Americio,Curio,Berkelio,Californio,Einstenio,Fermio,Mendelevio,Nobelio,Lawrencio,Rutherfordio,Dubnio,Seaborgio,Bohrio,Hassio,Meitnerio,Darmstadtio,Roentgenio,Copernicio,Nihonio,Flerovio,Moscovio,Livermorio,Teneso,Oganesón".split(",");
var MAS="1.008 4.0026 6.94 9.0122 10.81 12.011 14.007 15.999 18.998 20.180 22.990 24.305 26.982 28.085 30.974 32.06 35.45 39.948 39.098 40.078 44.956 47.867 50.942 51.996 54.938 55.845 58.933 58.693 63.546 65.38 69.723 72.630 74.922 78.971 79.904 83.798 85.468 87.62 88.906 91.224 92.906 95.95 [98] 101.07 102.91 106.42 107.87 112.41 114.82 118.71 121.76 127.60 126.90 131.29 132.91 137.33 138.91 140.12 140.91 144.24 [145] 150.36 151.96 157.25 158.93 162.50 164.93 167.26 168.93 173.05 174.97 178.49 180.95 183.84 186.21 190.23 192.22 195.08 196.97 200.59 204.38 207.2 208.98 [209] [210] [222] [223] [226] [227] 232.04 231.04 238.03 [237] [244] [243] [247] [247] [251] [252] [257] [258] [259] [266] [267] [268] [269] [270] [277] [278] [281] [282] [285] [286] [289] [290] [293] [294] [294]".split(" ");
if(SYM.length!==118||NAM.length!==118||MAS.length!==118){host.insertAdjacentHTML("afterbegin","<p style='color:red;padding:14px'>Error de datos: se esperaban 118 elementos.</p>");return}
var CATS={am:["Metal alcalino","#ffb199"],at:["Alcalinotérreo","#ffd08a"],tr:["Metal de transición","#ffe98a"],pt:["Metal postransición","#b7e3a1"],md:["Metaloide","#8fe0c8"],nm:["No metal","#8fd3f4"],hl:["Halógeno","#a9b7ff"],ng:["Gas noble","#d4a5f5"],ln:["Lantánido","#f9a8d4"],ac:["Actínido","#fda4af"],un:["Sin clasificar (sin confirmar)","#cfd4de"]};
function has(a,z){return a.indexOf(z)>-1}
function catOf(z){if(has([3,11,19,37,55,87],z))return"am";if(has([4,12,20,38,56,88],z))return"at";if(has([2,10,18,36,54,86],z))return"ng";if(has([9,17,35,53,85],z))return"hl";if(has([5,14,32,33,51,52],z))return"md";if(has([1,6,7,8,15,16,34],z))return"nm";if(z>=57&&z<=71)return"ln";if(z>=89&&z<=103)return"ac";if(z>=109)return"un";if(has([13,31,49,50,81,82,83,84],z))return"pt";return"tr"}
function posOf(z){var p,g,r,c;
 if(z===1)return{p:1,g:1,r:1,c:1};if(z===2)return{p:1,g:18,r:1,c:18};
 if(z<=4)return{p:2,g:z-2,r:2,c:z-2};if(z<=10)return{p:2,g:z+8,r:2,c:z+8};
 if(z<=12)return{p:3,g:z-10,r:3,c:z-10};if(z<=18)return{p:3,g:z,r:3,c:z};
 if(z<=36)return{p:4,g:z-18,r:4,c:z-18};if(z<=54)return{p:5,g:z-36,r:5,c:z-36};
 if(z<=56)return{p:6,g:z-54,r:6,c:z-54};if(z<=71)return{p:6,g:null,r:9,c:z-57+3};
 if(z<=86)return{p:6,g:z-68,r:6,c:z-68};if(z<=88)return{p:7,g:z-86,r:7,c:z-86};
 if(z<=103)return{p:7,g:null,r:10,c:z-89+3};return{p:7,g:z-100,r:7,c:z-100}}
var E=SYM.map(function(s,i){var z=i+1,ps=posOf(z);return{z:z,s:s,n:NAM[i],m:MAS[i],k:catOf(z),p:ps.p,g:ps.g,r:ps.r,c:ps.c}});
function norm(t){return String(t).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim()}
var $=function(i){return root.getElementById(i)};
var state={view:"explorar",cat:null,query:"",sel:null,cmpA:null,cmpB:null};
var grid=$("grid"),nodes={};

/* ---- Tabla ---- */
function ph(r,c,t){var d=document.createElement("div");d.className="ph";d.style.gridRow=r;d.style.gridColumn=c;d.textContent=t;grid.appendChild(d)}
E.forEach(function(e){var b=document.createElement("button");b.className="el";b.type="button";b.dataset.z=e.z;
 b.style.gridRow=e.r;b.style.gridColumn=e.c;b.style.background=CATS[e.k][1];
 b.setAttribute("aria-label",e.n+", número atómico "+e.z+", "+CATS[e.k][0]);
 b.innerHTML="<i>"+e.z+"</i><b>"+e.s+"</b><small>"+e.n+"</small>";grid.appendChild(b);nodes[e.z]=b});
ph(6,3,"57–71");ph(7,3,"89–103");
grid.addEventListener("click",function(ev){var b=ev.target.closest(".el");if(b)pick(+b.dataset.z)});

/* ---- Filtros ---- */
var chips=$("chips");
function mkChip(k,t,col){var b=document.createElement("button");b.className="chip";b.type="button";b.dataset.k=k;b.innerHTML=(col?'<span class="dot" style="background:'+col+'"></span>':"")+t;chips.appendChild(b)}
mkChip("","Todos");Object.keys(CATS).forEach(function(k){mkChip(k,CATS[k][0].replace(" (sin confirmar)",""),CATS[k][1])});
chips.firstChild.classList.add("on");
chips.addEventListener("click",function(ev){var b=ev.target.closest(".chip");if(!b)return;state.cat=b.dataset.k||null;
 [].forEach.call(chips.children,function(c){c.classList.toggle("on",c===b)});apply()});
var qi=$("q"),tm;qi.addEventListener("input",function(){clearTimeout(tm);tm=setTimeout(function(){state.query=norm(qi.value);apply()},120)});
qi.addEventListener("keydown",function(ev){if(ev.key==="Enter"){var m=E.filter(match)[0];if(m)pick(m.z)}});
function match(e){if(state.cat&&e.k!==state.cat)return false;var q=state.query;if(!q)return true;
 return norm(e.n).indexOf(q)>-1||norm(e.s)===q||String(e.z)===q||(q.length>1&&norm(e.s).indexOf(q)===0)}
function apply(){var n=0;E.forEach(function(e){var ok=match(e);if(ok)n++;nodes[e.z].classList.toggle("dim",!ok)});
 $("hint").textContent=(state.cat||state.query)?n+" elemento(s) coinciden.":hintText()}
function hintText(){return state.view==="muda"?"Toca la casilla donde va el elemento indicado.":state.view==="comparar"?"Modo comparar: toca dos elementos.":"Toca un elemento para ver su ficha. Desliza la tabla para moverte."}

/* ---- Zoom ---- */
var cs=46;function zoom(d){cs=Math.max(28,Math.min(80,cs+d));host.style.setProperty("--c",cs+"px");
 [].forEach.call(grid.querySelectorAll(".el"),function(b){b.classList.toggle("hide",cs<40)})}
$("zp").onclick=function(){zoom(6)};$("zm").onclick=function(){zoom(-6)};

/* ---- Ficha y comparación ---- */
var panel=$("panel"),pc=$("pc");$("px").onclick=closeP;
function closeP(){panel.classList.add("off");mark()}
function mark(){E.forEach(function(e){var n=nodes[e.z];n.classList.toggle("sel",e.z===(state.view==="comparar"?state.cmpA:state.sel));n.classList.toggle("selB",state.view==="comparar"&&e.z===state.cmpB)})}
function pick(z){if(state.view==="muda"){muteClick(z);return}if(state.view==="comparar"){if(!state.cmpA||(state.cmpA&&state.cmpB)){state.cmpA=z;state.cmpB=null}else if(z!==state.cmpA){state.cmpB=z}
  mark();showCmp();return}
 state.sel=z;mark();showCard(E[z-1])}
function grp(e){return e.g?e.g:"—  (serie "+(e.k==="ln"?"lantánidos":"actínidos")+")"}
function showCard(e){var iso=e.m.charAt(0)==="[";
 pc.innerHTML='<div class="big"><div class="card" style="background:'+CATS[e.k][1]+'"><i>'+e.z+'</i><b>'+e.s+'</b></div><div><h2>'+e.n+'</h2><p>'+CATS[e.k][0]+'</p></div></div>'+
 '<dl><dt>Número atómico</dt><dd>'+e.z+'</dd><dt>Masa atómica</dt><dd>'+e.m+' u'+(iso?' <span style="font-weight:400;color:var(--mu)">(isótopo más estable)</span>':'')+'</dd><dt>Período</dt><dd>'+e.p+'</dd><dt>Grupo</dt><dd>'+grp(e)+'</dd></dl>'+
 (e.k==="un"?'<p style="color:var(--mu);font-size:13px">Elemento superpesado: su clasificación química no está confirmada experimentalmente.</p>':'')+
 '<p style="margin:12px 0 0"><button class="btn" id="goCmp">Comparar con otro</button></p>';
 panel.classList.remove("off");$("goCmp").onclick=function(){setView("comparar");state.cmpA=e.z;state.cmpB=null;mark();showCmp()}}
function num(m){return parseFloat(m.replace(/[\[\]]/g,""))}
function showCmp(){var a=state.cmpA&&E[state.cmpA-1],b=state.cmpB&&E[state.cmpB-1];
 if(!a){pc.innerHTML="<b>Comparar</b><p style='color:var(--mu)'>Toca el primer elemento.</p>"}
 else if(!b){pc.innerHTML="<b>Comparar</b><p style='color:var(--mu)'>Primero: <b style='color:var(--tx)'>"+a.n+"</b>. Toca el segundo elemento.</p>"}
 else{var d=Math.abs(num(a.m)-num(b.m)).toFixed(3).replace(/\.?0+$/,"");
  pc.innerHTML="<table><tr><th></th><th>"+a.s+" · "+a.n+"</th><th>"+b.s+" · "+b.n+"</th></tr>"+
  row("Nº atómico",a.z,b.z)+row("Masa (u)",a.m,b.m)+row("Familia",CATS[a.k][0],CATS[b.k][0])+row("Período",a.p,b.p)+row("Grupo",a.g||"—",b.g||"—")+"</table>"+
  "<p style='margin:10px 0 0;color:var(--mu);font-size:13px'>Diferencia de masa: <b style='color:var(--tx)'>"+d+" u</b>. "+(a.k===b.k?"Pertenecen a la misma familia.":"Son de familias distintas.")+(a.p===b.p?" Mismo período.":"")+(a.g&&a.g===b.g?" Mismo grupo.":"")+"</p>"}
 panel.classList.remove("off")}
function row(t,x,y){return"<tr><th>"+t+"</th><td>"+x+"</td><td>"+y+"</td></tr>"}

/* ---- Vistas ---- */
function setView(v){state.view=v;[].forEach.call(root.querySelectorAll(".tabs button"),function(b){b.classList.toggle("on",b.dataset.v===v)});
 $("v-tabla").classList.toggle("on2",v==="explorar"||v==="comparar"||v==="muda");$("v-practicar").classList.toggle("on2",v==="practicar");$("v-adivina").classList.toggle("on2",v==="adivina");["q","chips","trend"].forEach(function(i){$(i).style.display=v==="muda"?"none":""});$("mutebar").style.display=v==="muda"?"flex":"none";
 closeP();muteOff();if(v==="practicar"){newQ()}if(v==="adivina"){newG()}if(v==="muda"){muteOn()}$("hint").textContent=hintText();mark()}
root.querySelector(".tabs").addEventListener("click",function(ev){var b=ev.target.closest("button");if(b){state.cmpA=state.cmpB=null;setView(b.dataset.v)}});

/* ---- Práctica ---- */
var QM=[["mix","Mixto"],["s2n","Símbolo → nombre"],["n2s","Nombre → símbolo"],["z2n","Número → nombre"],["n2z","Nombre → número"],["fam","Familia"]];
var qmode="mix",cur=null,sc={ok:0,racha:0,tot:0},locked=false;
QM.forEach(function(m){var b=document.createElement("button");b.className="chip"+(m[0]==="mix"?" on":"");b.dataset.m=m[0];b.textContent=m[1];$("qmodes").appendChild(b)});
$("qmodes").addEventListener("click",function(ev){var b=ev.target.closest(".chip");if(!b)return;qmode=b.dataset.m;
 [].forEach.call($("qmodes").children,function(c){c.classList.toggle("on",c===b)});newQ()});
function rnd(n){return Math.floor(Math.random()*n)}
function newQ(){locked=false;$("fb").textContent="";var t=qmode==="mix"?QM[1+rnd(QM.length-1)][0]:qmode,e=pickW(),ds=[e],used={},uk={};used[e.z]=1;uk[e.k]=1;
 while(ds.length<4){var d=E[rnd(118)];if(!used[d.z]&&!(t==="fam"&&uk[d.k])){used[d.z]=1;uk[d.k]=1;ds.push(d)}}
 ds.sort(function(){return Math.random()-.5});
 var Q={s2n:["¿Qué elemento tiene este símbolo?",e.s,function(x){return x.n}],n2s:["¿Cuál es el símbolo de…?",e.n,function(x){return x.s}],
  z2n:["¿Qué elemento tiene este número atómico?",String(e.z),function(x){return x.n}],n2z:["¿Cuál es el número atómico de…?",e.n,function(x){return String(x.z)}],fam:["¿A qué familia pertenece?",e.n+" ("+e.s+")",function(x){return CATS[x.k][0]}]}[t];
 cur={e:e,f:Q[2]};$("qtype").textContent=Q[0];$("qtxt").textContent=Q[1];var o=$("opts");o.innerHTML="";
 ds.forEach(function(d){var b=document.createElement("button");b.className="btn";b.type="button";b.dataset.z=d.z;b.textContent=Q[2](d);o.appendChild(b)});score()}
function score(){$("sOk").textContent=sc.ok;$("sRacha").textContent=sc.racha;$("sTot").textContent=sc.tot;$("sDom").textContent=dom()+"/118"}
$("opts").addEventListener("click",function(ev){var b=ev.target.closest(".btn");if(!b||locked)return;locked=true;sc.tot++;
 var good=+b.dataset.z===cur.e.z;b.classList.add(good?"ok":"bad");rec(cur.e.z,good);
 if(good){sc.ok++;sc.racha++;$("fb").textContent="¡Correcto!"+medal()}else{sc.racha=0;$("fb").textContent="Era: "+cur.f(cur.e);
  [].forEach.call($("opts").children,function(c){if(+c.dataset.z===cur.e.z)c.classList.add("ok")})}
 score();setTimeout(newQ,1300)});
/* ---- Progreso local (repaso inteligente) ---- */
var KEY="estudiaTP",stats={};
try{stats=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){stats={}}
function rec(z,ok){var s=stats[z]||(stats[z]={ok:0,f:0});ok?s.ok++:s.f++;try{localStorage.setItem(KEY,JSON.stringify(stats))}catch(e){}}
function dom(){var n=0;for(var z in stats){var s=stats[z];if(s.ok>=2&&s.ok>s.f)n++}return n}
function pickW(){var w=E.map(function(e){var s=stats[e.z];return s?Math.max(.3,1+3*s.f-.5*s.ok):1.5}),t=w.reduce(function(a,b){return a+b},0)*Math.random();for(var i=0;i<118;i++){t-=w[i];if(t<=0)return E[i]}return E[0]}
function medal(){return sc.racha===20?" 🥇":sc.racha===10?" 🥈":sc.racha===5?" 🥉":""}
/* ---- Tendencias de color ---- */
var tr=$("trend"),placed={};
function bg(e){var m=tr.value;if(m==="mass")return"hsl(265,75%,"+(92-38*Math.min(1,num(e.m)/294))+"%)";if(m==="per")return"hsl("+(e.p*48)+",70%,76%)";if(m==="grp")return e.g?"hsl("+(e.g*19)+",70%,76%)":"#cfd4de";return CATS[e.k][1]}
function paint(){var mu=state.view==="muda";E.forEach(function(e){nodes[e.z].style.background=mu&&!placed[e.z]?"var(--sf)":bg(e)});$("legend").textContent={fam:"",mass:"Más oscuro = mayor masa atómica.",per:"Cada color es un período (fila).",grp:"Cada color es un grupo (columna). Gris: lantánidos y actínidos."}[tr.value]}
tr.addEventListener("change",paint);
/* ---- Tabla muda ---- */
var mq=[],mt=null,mErr=0,mf=false,mL=18,mOn=false,mb=$("mutebar");
[[18,"1–18"],[36,"1–36"],[118,"Los 118"]].forEach(function(o){var b=document.createElement("button");b.className="chip"+(o[0]===18?" on":"");b.dataset.l=o[0];b.textContent=o[1];mb.appendChild(b)});
var ms=document.createElement("b");ms.id="mst";ms.style.cssText="flex:1;min-width:170px;align-self:center";mb.appendChild(ms);
mb.addEventListener("click",function(ev){var b=ev.target.closest(".chip");if(!b)return;mL=+b.dataset.l;[].forEach.call(mb.querySelectorAll(".chip"),function(c){c.classList.toggle("on",c===b)});muteOn()});
function cellHTML(e){return"<i>"+e.z+"</i><b>"+e.s+"</b><small>"+e.n+"</small>"}
function muteOn(){mOn=true;placed={};grid.classList.add("mute");E.forEach(function(e){var n=nodes[e.z];if(e.z>mL){placed[e.z]=1;n.innerHTML=cellHTML(e);n.style.opacity=.55}else{n.innerHTML="";n.style.opacity=""}});mErr=0;mq=E.filter(function(e){return e.z<=mL}).sort(function(){return Math.random()-.5});nextM();paint()}
function muteOff(){if(!mOn)return;mOn=false;placed={};grid.classList.remove("mute");E.forEach(function(e){var n=nodes[e.z];n.innerHTML=cellHTML(e);n.style.opacity=""});paint()}
function nextM(){mt=mq.shift();mf=false;$("mst").innerHTML=mt?"Coloca: <span style='color:var(--ac)'>"+mt.n+" ("+mt.s+")</span> · errores: "+mErr:"🎉 ¡Completada! Errores: "+mErr}
function muteClick(z){if(!mt||placed[z])return;var n=nodes[z];if(z===mt.z){placed[z]=1;n.innerHTML=cellHTML(mt);n.style.background=bg(mt);rec(z,!mf);nextM()}else{mErr++;mf=true;n.classList.add("wrong");setTimeout(function(){n.classList.remove("wrong")},400);$("mst").innerHTML=$("mst").innerHTML.replace(/errores: \d+/,"errores: "+mErr)}}
/* ---- Adivina el elemento ---- */
var gT=null,gH=1,gP=0,gN=0,gLock=false;
function hints(e){return["Estoy en el período "+e.p+".",e.g?"Estoy en el grupo "+e.g+".":"Soy de la serie de los "+(e.k==="ln"?"lantánidos":"actínidos")+".","Mi familia: "+CATS[e.k][0]+".","Mi masa atómica es de unas "+Math.round(num(e.m))+" u.","Mi nombre tiene "+e.n.length+" letras y empieza con «"+e.n.charAt(0)+"».","Mi número atómico es "+e.z+"."]}
function renderG(){$("gh").innerHTML=hints(gT).slice(0,gH).map(function(t){return"<li>"+t+"</li>"}).join("");$("gh2").disabled=gH>=6;$("gPts").textContent=gP;$("gN").textContent=gN}
function newG(){gT=pickW();gH=1;gLock=false;$("gfb").textContent="";$("ga").value="";renderG()}
$("gh2").onclick=function(){if(gH<6&&!gLock){gH++;renderG()}};
function tryG(){if(gLock)return;var a=norm($("ga").value);if(!a)return;
 if(a===norm(gT.n)||a===norm(gT.s)){gLock=true;var p=7-gH;gP+=p;gN++;rec(gT.z,gH<=3);renderG();$("gfb").textContent="¡Correcto! Es "+gT.n+" (+"+p+")";setTimeout(newG,1700)}else{$("gfb").textContent="Todavía no… prueba otra pista."}}
$("gok").onclick=tryG;$("ga").addEventListener("keydown",function(ev){if(ev.key==="Enter")tryG()});
$("gg").onclick=function(){if(gLock)return;gLock=true;rec(gT.z,false);$("gfb").textContent="Era: "+gT.n+" ("+gT.s+", nº "+gT.z+")";setTimeout(newG,2200)};
apply();
})();
})();
