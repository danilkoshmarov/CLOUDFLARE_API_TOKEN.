
/* PANACEA SKIN v0.2 — local-first feature pack */
(()=>{
"use strict";
const byId=id=>document.getElementById(id);
const safe=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const todayStr=()=>{const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
const dateLabel=s=>new Date(s+"T12:00:00").toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"});
const zoneNames={forehead:"Лоб",nose:"Нос",chin:"Подбородок",leftCheek:"Левая щека",rightCheek:"Правая щека",leftJaw:"Левая челюсть",rightJaw:"Правая челюсть"};
const zoneKeys=Object.keys(zoneNames);
const ensureState=()=>{state.faceMap??={};state.factors??={};state.reactions??=[];state.entries??=[];state.products??=[];state.entries.forEach(e=>{e.zones??={};e.factors??={};e.usedProducts??=[]})};
ensureState();
const nav=document.querySelector('.tabs');
if(nav&&!document.querySelector('[data-page="calendar"]')){
 const b=document.createElement("button");b.dataset.page="calendar";b.textContent="Календарь";nav.insertBefore(b,nav.querySelector('[data-page="data"]'));b.onclick=()=>{document.querySelectorAll("[data-page]").forEach(x=>x.classList.toggle("active",x===b));document.querySelectorAll(".page").forEach(x=>x.classList.toggle("active",x.id==="calendar"));renderCalendar();renderCompare();renderFactorInsights()};
}
if(!byId("calendar")){
 const sec=document.createElement("section");sec.className="page";sec.id="calendar";
 sec.innerHTML=`
 <div class="v2-shell">
  <div class="v2-card"><div class="eyebrow">PANACEA SKIN · V0.2</div><h2 style="margin-top:7px">Карта лица и календарь</h2><p class="v2-muted">Отмечай количество активных воспалений по зонам. Это помогает отслеживать распределение, а не только общую оценку.</p>
   <div class="v2-face-wrap">
    <svg class="v2-face" viewBox="0 0 240 300" role="img" aria-label="Схема лица с зонами">
     <path d="M120 18 C65 18 48 66 55 132 C60 205 86 263 120 276 C154 263 180 205 185 132 C192 66 175 18 120 18Z" fill="none" stroke="var(--muted)" stroke-width="2"/>
     <path d="M55 105 Q33 87 42 130 Q48 152 59 150 M185 105 Q207 87 198 130 Q192 152 181 150" fill="none" stroke="var(--muted)" stroke-width="2"/>
     <path class="v2-zone" data-zone="forehead" d="M78 42 Q120 22 162 42 L166 96 Q120 108 74 96Z"/>
     <path class="v2-zone" data-zone="leftCheek" d="M66 112 Q88 101 111 122 L108 174 Q83 185 64 156Z"/>
     <path class="v2-zone" data-zone="rightCheek" d="M129 122 Q152 101 174 112 L176 156 Q157 185 132 174Z"/>
     <path class="v2-zone" data-zone="nose" d="M111 104 Q120 99 129 104 L135 171 Q120 183 105 171Z"/>
     <path class="v2-zone" data-zone="chin" d="M93 205 Q120 194 147 205 Q143 249 120 258 Q97 249 93 205Z"/>
     <path class="v2-zone" data-zone="leftJaw" d="M62 168 Q79 185 107 183 L98 226 Q76 215 62 168Z"/>
     <path class="v2-zone" data-zone="rightJaw" d="M178 168 Q161 185 133 183 L142 226 Q164 215 178 168Z"/>
     <path d="M89 119 Q99 112 108 119 M132 119 Q141 112 151 119 M105 193 Q120 199 135 193" fill="none" stroke="var(--muted)" stroke-width="2" stroke-linecap="round"/>
     <text class="v2-zone-label" x="120" y="69" text-anchor="middle">Лоб</text><text class="v2-zone-label" x="86" y="145" text-anchor="middle">Левая</text><text class="v2-zone-label" x="86" y="156" text-anchor="middle">щека</text><text class="v2-zone-label" x="154" y="145" text-anchor="middle">Правая</text><text class="v2-zone-label" x="154" y="156" text-anchor="middle">щека</text><text class="v2-zone-label" x="120" y="143" text-anchor="middle">Нос</text><text class="v2-zone-label" x="120" y="229" text-anchor="middle">Подбородок</text>
    </svg>
    <div><div class="v2-section-title"><b id="v2SelectedZone">Лоб</b><span class="v2-pill">Количество</span></div><div class="v2-field"><label>Активные воспаления в выбранной зоне</label><input id="v2ZoneCount" type="number" min="0" max="99" step="1" value="0"></div><div class="v2-zone-list" id="v2ZoneList"></div><p class="v2-muted">Считай активные элементы, а не следы постакне. Значения сохраняются в новой записи дневника.</p></div>
   </div>
  </div>
  <div class="v2-card"><div class="v2-section-title"><h2>Календарь состояния</h2><div class="v2-btnrow"><button id="v2PrevMonth" aria-label="Предыдущий месяц">‹</button><button id="v2NextMonth" aria-label="Следующий месяц">›</button></div></div><h3 id="v2MonthLabel"></h3><div class="v2-calendar" id="v2Calendar"></div><div class="v2-muted" style="margin-top:10px">Цвета показывают ориентировочную динамику по оценке воспалений: зелёный — ниже, жёлтый — средняя, красный — выше. Сравнение относительно твоих собственных записей.</div><div id="v2CalendarDetail" class="v2-tip" style="margin-top:12px">Выбери день, чтобы посмотреть запись.</div></div>
  <div class="v2-card"><h2>Факторы и динамика</h2><p class="v2-muted">Сравнение средних оценок воспалений в твоих записях. Это наблюдаемые совпадения, не доказательство причины.</p><div id="v2FactorInsights" class="v2-shell"><div class="v2-empty">Добавь несколько записей с факторами.</div></div></div>
  <div class="v2-card"><h2>Сравнение фотографий</h2><p class="v2-muted">Выбери две даты с фотографиями. Для честного сравнения снимай лицо при одинаковом освещении, расстоянии и ракурсе.</p><div class="v2-grid"><div class="v2-field"><label>Первое фото</label><select id="v2PhotoA"></select></div><div class="v2-field"><label>Второе фото</label><select id="v2PhotoB"></select></div></div><div id="v2CompareArea" class="v2-empty">Добавь фотографии в дневник, чтобы сравнить их.</div><div id="v2SliderControl" class="v2-field hidden"><label>Наложение фотографий</label><input id="v2CompareSlider" type="range" min="0" max="100" value="50"></div></div>
  <div class="v2-card"><h2>Установка приложения</h2><div class="v2-install"><p class="v2-muted">Установи PANACEA SKIN на главный экран. Данные останутся в локальном хранилище этого браузера.</p><button class="primary" id="v2InstallBtn">Установить приложение</button></div><p id="v2InstallHelp" class="v2-muted" style="margin-top:10px">На iPhone: открой сайт в Safari → «Поделиться» → «На экран Домой» → «Добавить».</p><div class="v2-tip" style="margin-top:10px">Установка не заменяет резервную копию. При очистке данных Safari или удалении сайта локальная история может пропасть.</div></div>
 </div>`;
 const dataPage=byId("data");dataPage?.parentNode.insertBefore(sec,dataPage);
}
const journal=byId("journal");
if(journal&&!byId("v2QuickFill")){
 const card=journal.querySelector(".card");
 const quick=document.createElement("div");quick.className="v2-btnrow";quick.style.margin="10px 0 14px";quick.innerHTML='<button id="v2QuickFill">↺ Повторить вчерашние значения</button><span class="v2-muted" id="v2QuickHint">Переносит показатели и факторы из последней записи.</span>';
 card.querySelector("h2").after(quick);
 const notes=byId("entryNotes").closest(".field");
 const extra=document.createElement("div");extra.className="v2-card";extra.style.margin="12px 0";extra.innerHTML=`
  <h3>Карта лица для этой записи</h3><p class="v2-muted">Количество активных воспалений в каждой зоне.</p><div class="v2-grid" id="v2JournalZones"></div>
  <h3 style="margin-top:14px">Факторы за последние сутки</h3><div class="v2-grid">
   <div class="v2-field"><label>Продолжительность сна, часов</label><input id="v2Sleep" type="number" min="0" max="24" step=".5" placeholder="Например, 8"></div>
   <div class="v2-field"><label>Стресс · 0–4</label><select id="v2Stress"><option value="">Не отмечать</option><option value="0">0 — нет</option><option value="1">1 — низкий</option><option value="2">2 — умеренный</option><option value="3">3 — высокий</option><option value="4">4 — очень высокий</option></select></div>
   <div class="v2-field"><label>Питание / заметки</label><input id="v2Food" placeholder="Например, необычные продукты"></div>
   <div class="v2-field"><label>Другие факторы</label><input id="v2Other" placeholder="Болезнь, цикл, погода и т. п."></div>
  </div>
  <h3 style="margin-top:14px">Использованные средства и реакция</h3><p class="v2-muted">Отметь средства, которые использовал сегодня. Реакцию оценивай как наблюдение, а не доказательство причины.</p><div id="v2UsedProducts" class="v2-reaction-list"></div>
  <div class="v2-grid"><div class="v2-field"><label>Реакция кожи после ухода · 0–4</label><select id="v2Reaction"><option value="">Не отмечать</option><option value="0">0 — реакции нет</option><option value="1">1 — лёгкая</option><option value="2">2 — умеренная</option><option value="3">3 — выраженная</option><option value="4">4 — сильная</option></select></div><div class="v2-field"><label>Когда заметил реакцию</label><select id="v2ReactionWhen"><option value="">Не указано</option><option>Сразу</option><option>Через несколько часов</option><option>На следующий день</option><option>Через несколько дней</option></select></div></div>
  <div class="v2-field"><label>Описание реакции</label><input id="v2ReactionNote" placeholder="Жжение, зуд, сухость, новые высыпания..."></div>`;
 notes.before(extra);
}
let selectedZone="forehead",monthCursor=new Date();monthCursor.setDate(1);
const zoneCounts=()=>{const o={};zoneKeys.forEach(k=>o[k]=Number(byId("v2z_"+k)?.value||0));return o};
function drawZoneList(containerId,prefix,values={}){
 const el=byId(containerId);if(!el)return;
 el.innerHTML=zoneKeys.map(k=>'<div class="v2-field"><label>'+zoneNames[k]+'</label><input id="'+prefix+k+'" type="number" min="0" max="99" value="'+Math.max(0,Number(values[k]||0))+'"></div>').join("");
}
function updateZoneMap(){
 const n=byId("v2ZoneList");if(!n)return;
 n.innerHTML=zoneKeys.map(k=>'<button class="v2-zone-btn '+(k===selectedZone?"active":"")+'" data-v2-zone="'+k+'"><b>'+zoneNames[k]+'</b><small>'+Number(byId("v2z_"+k)?.value||0)+'</small></button>').join("");
 document.querySelectorAll("[data-v2-zone]").forEach(b=>b.onclick=()=>selectZone(b.dataset.v2Zone));
 document.querySelectorAll(".v2-zone").forEach(p=>{p.classList.toggle("active",p.dataset.zone===selectedZone);p.onclick=()=>selectZone(p.dataset.zone)});
 byId("v2SelectedZone").textContent=zoneNames[selectedZone];
 byId("v2ZoneCount").value=byId("v2z_"+selectedZone)?.value||0;
}
function selectZone(k){selectedZone=k;updateZoneMap()}
function renderCalendar(){
 const el=byId("v2Calendar");if(!el)return;
 const y=monthCursor.getFullYear(),m=monthCursor.getMonth(),first=new Date(y,m,1),offset=(first.getDay()+6)%7,last=new Date(y,m+1,0).getDate();
 byId("v2MonthLabel").textContent=first.toLocaleDateString("ru-RU",{month:"long",year:"numeric"});
 const entries=state.entries.slice().sort((a,b)=>a.date.localeCompare(b.date));
 const vals=entries.map(e=>Number(e.inflam||0)),min=vals.length?Math.min(...vals):0,max=vals.length?Math.max(...vals):0;
 let html=["Пн","Вт","Ср","Чт","Пт","Сб","Вс"].map(x=>'<div class="v2-weekday">'+x+'</div>').join("");
 for(let i=0;i<offset;i++)html+='<div class="v2-date empty"></div>';
 for(let d=1;d<=last;d++){
  const date=y+"-"+String(m+1).padStart(2,"0")+"-"+String(d).padStart(2,"0"),e=entries.filter(x=>x.date===date).at(-1);
  let cls="";if(e){const v=Number(e.inflam||0),span=max-min;cls=span===0?"mid":v<=min+span/3?"good":v>=max-span/3?"bad":"mid"}
  html+='<button class="v2-date '+cls+'" data-v2-date="'+date+'">'+d+(e?'<small>'+e.inflam+'/5</small>':'')+'</button>';
 }
 el.innerHTML=html;
 el.querySelectorAll("[data-v2-date]").forEach(b=>b.onclick=()=>showCalendarDay(b.dataset.v2Date));
}
function showCalendarDay(date){
 const matches=state.entries.filter(e=>e.date===date).sort((a,b)=>String(a.id).localeCompare(String(b.id)));
 const el=byId("v2CalendarDetail");if(!matches.length){el.textContent=dateLabel(date)+": записей нет.";return}
 const e=matches[matches.length-1];el.innerHTML='<b>'+dateLabel(date)+'</b><br>Воспаления: '+e.inflam+'/5 · Жирность: '+e.oil+'/5 · Раздражение: '+(e.irritation??0)+'/5<br><button id="v2OpenDay" style="margin-top:8px">Открыть дневник за этот день</button>';
 byId("v2OpenDay").onclick=()=>{document.querySelector('[data-page="journal"]').click();byId("entryDate").value=date;};
}
let compareUrls=[];
async function renderCompare(){
 const photos=state.entries.filter(e=>e.photo).sort((a,b)=>a.date.localeCompare(b.date));
 const a=byId("v2PhotoA"),b=byId("v2PhotoB");if(!a||!b)return;
 const opts=photos.map(e=>'<option value="'+safe(e.id)+'">'+dateLabel(e.date)+'</option>').join("");
 a.innerHTML=opts;b.innerHTML=opts;
 if(photos.length>1){a.selectedIndex=0;b.selectedIndex=photos.length-1}
 await updateCompare();
}
async function updateCompare(){
 compareUrls.forEach(URL.revokeObjectURL);compareUrls=[];
 const area=byId("v2CompareArea"),a=byId("v2PhotoA")?.value,b=byId("v2PhotoB")?.value;
 if(!a||!b||a===b){area.innerHTML='<div class="v2-empty">Нужно минимум две разные фотографии в дневнике.</div>';byId("v2SliderControl").classList.add("hidden");return}
 try{
  const [ea,eb]=[state.entries.find(x=>x.id===a),state.entries.find(x=>x.id===b)];
  const [ba,bb]=await Promise.all([photoGet(a),photoGet(b)]);if(!ba||!bb)throw Error("Фото не найдено в локальной базе");
  const ua=URL.createObjectURL(ba),ub=URL.createObjectURL(bb);compareUrls.push(ua,ub);
  area.innerHTML='<div class="v2-slider-wrap" id="v2SliderWrap"><img src="'+ub+'" alt="Позднее фото"><div class="v2-overlay" id="v2Overlay" style="width:50%"><img src="'+ua+'" alt="Раннее фото"></div></div><div class="v2-photo-compare"><figure><figcaption>Раньше: '+dateLabel(ea.date)+' · '+ea.inflam+'/5 воспалений</figcaption></figure><figure><figcaption>Позже: '+dateLabel(eb.date)+' · '+eb.inflam+'/5 воспалений</figcaption></figure></div><p class="v2-muted">Ползунок показывает более раннее фото поверх позднего. Автоматическая оценка по фото не выполняется.</p>';
  byId("v2SliderControl").classList.remove("hidden");
 }catch(err){area.textContent="Не удалось загрузить фотографии: "+err.message;byId("v2SliderControl").classList.add("hidden")}
}
function renderUsedProducts(){
 const el=byId("v2UsedProducts");if(!el)return;
 const active=state.products.filter(p=>p.active!==false);
 el.innerHTML=active.length?active.map(p=>'<div class="v2-reaction-item"><label><input type="checkbox" value="'+safe(p.id)+'" data-v2-product> <span>'+safe(p.name)+'</span></label></div>').join(""):'<div class="v2-empty">Добавь средства в разделе «Средства».</div>';
}
function quickFill(){
 const e=state.entries.slice().sort((a,b)=>b.date.localeCompare(a.date))[0];if(!e)return alert("Сначала добавь хотя бы одну запись.");
 ["entryInflam","entryOil","entryIrritation","entryComfort"].forEach((id,i)=>byId(id).value=[e.inflam,e.oil,e.irritation??0,e.comfort??3][i]);
 zoneKeys.forEach(k=>{const el=byId("v2z_"+k);if(el)el.value=Number(e.zones?.[k]||0)});
 byId("v2Sleep").value=e.factors?.sleep??"";byId("v2Stress").value=e.factors?.stress??"";byId("v2Food").value=e.factors?.food??"";byId("v2Other").value=e.factors?.other??"";
 byId("v2Reaction").value=e.reactionLevel??"";byId("v2ReactionWhen").value=e.reactionWhen??"";byId("v2ReactionNote").value=e.reactionNote??"";
 updateZoneMap();alert("Значения перенесены. Проверь и измени то, что сегодня отличается.");
}
function attachJournal(){
 drawZoneList("v2JournalZones","v2z_");renderUsedProducts();updateZoneMap();
 byId("v2ZoneCount").onchange=()=>{byId("v2z_"+selectedZone).value=Math.max(0,Number(byId("v2ZoneCount").value||0));updateZoneMap()};
 zoneKeys.forEach(k=>byId("v2z_"+k).addEventListener("input",updateZoneMap));
 byId("v2QuickFill").onclick=quickFill;
 const original=byId("saveEntry").onclick;
 if(!byId("saveEntry").dataset.v2Wrapped){
  byId("saveEntry").dataset.v2Wrapped="1";
  byId("saveEntry").onclick=async function(ev){
   const before=new Set(state.entries.map(e=>e.id));
   await original.call(this,ev);
   const entry=state.entries.find(e=>!before.has(e.id));if(!entry)return;
   entry.zones=zoneCounts();
   entry.factors={sleep:byId("v2Sleep").value===""?null:Number(byId("v2Sleep").value),stress:byId("v2Stress").value===""?null:Number(byId("v2Stress").value),food:byId("v2Food").value.trim(),other:byId("v2Other").value.trim()};
   entry.usedProducts=[...document.querySelectorAll("[data-v2-product]:checked")].map(x=>x.value);
   entry.reactionLevel=byId("v2Reaction").value===""?null:Number(byId("v2Reaction").value);
   entry.reactionWhen=byId("v2ReactionWhen").value;entry.reactionNote=byId("v2ReactionNote").value.trim();
   state.reactions.push({entryId:entry.id,date:entry.date,productIds:entry.usedProducts,level:entry.reactionLevel,when:entry.reactionWhen,note:entry.reactionNote});
   save();renderCalendar();renderUsedProducts();renderCalendar();
   zoneKeys.forEach(k=>byId("v2z_"+k).value=0);byId("v2Sleep").value="";byId("v2Stress").value="";byId("v2Food").value="";byId("v2Other").value="";byId("v2Reaction").value="";byId("v2ReactionWhen").value="";byId("v2ReactionNote").value="";
  };
 }
}
function setupPwa(){
 const link=document.createElement("link");link.rel="manifest";link.href="./manifest.webmanifest";document.head.append(link);
 const apple=document.createElement("meta");apple.name="apple-mobile-web-app-capable";apple.content="yes";document.head.append(apple);
 const status=document.createElement("meta");status.name="apple-mobile-web-app-status-bar-style";status.content="black-translucent";document.head.append(status);
 if("serviceWorker"in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(e=>console.warn("PWA worker:",e)));
 let promptEvent=null;window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();promptEvent=e;byId("v2InstallBtn").classList.remove("hidden")});
 byId("v2InstallBtn").onclick=async()=>{if(promptEvent){promptEvent.prompt();await promptEvent.userChoice;promptEvent=null}else alert("На iPhone открой сайт в Safari, нажми «Поделиться» и выбери «На экран Домой». На Android используй меню браузера → «Установить приложение» или «Добавить на главный экран».");
 };
 if(window.matchMedia("(display-mode: standalone)").matches||navigator.standalone){byId("v2InstallBtn").textContent="Приложение установлено";byId("v2InstallBtn").disabled=true}
}
function init(){
 const cssLink=document.createElement("link");cssLink.rel="stylesheet";cssLink.href="./app-v02.css";document.head.append(cssLink);
 document.querySelectorAll("[data-page]").forEach(b=>b.addEventListener("click",()=>{if(b.dataset.page==="calendar"){renderCalendar();renderCompare()}}));
 byId("v2PrevMonth").onclick=()=>{monthCursor.setMonth(monthCursor.getMonth()-1);renderCalendar()};
 byId("v2NextMonth").onclick=()=>{monthCursor.setMonth(monthCursor.getMonth()+1);renderCalendar()};
 byId("v2PhotoA").onchange=updateCompare;byId("v2PhotoB").onchange=updateCompare;
 byId("v2CompareSlider").oninput=e=>{const overlay=byId("v2Overlay");if(overlay)overlay.style.width=e.target.value+"%"};
 attachJournal();renderCalendar();setupPwa();
 // Existing backups already serialize the full state object, so v0.2 fields are included automatically.
 save();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
