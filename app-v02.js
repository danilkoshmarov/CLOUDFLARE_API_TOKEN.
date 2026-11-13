
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
 const b=document.createElement("button");b.dataset.page="calendar";b.textContent="Календарь";nav.insertBefore(b,nav.querySelector('[data-page="data"]'));b.onclick=()=>{document.querySelectorAll("[data-page]").forEach(x=>x.classList.toggle("active",x===b));document.querySelectorAll(".page").forEach(x=>x.classList.toggle("active",x.id==="calendar"));renderCalendar();renderCompare();renderFactorInsights();renderSkinLab()};
}
if(!byId("calendar")){
 const sec=document.createElement("section");sec.className="page";sec.id="calendar";
 sec.innerHTML=`
 <div class="v2-shell">
  <div class="v2-card"><div class="eyebrow">PANACEA SKIN · V0.2</div><h2 style="margin-top:7px">Карта лица и календарь</h2><p class="v2-muted">Отмечай количество активных воспалений по зонам. Это помогает отслеживать распределение, а не только общую оценку.</p>
   <div class="v2-face-wrap">
    <svg class="v2-face" viewBox="0 0 300 360" role="img" aria-label="Интерактивная карта лица с зонами кожи">
 <defs>
  <linearGradient id="skinBase" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6d9c4"/><stop offset=".48" stop-color="#dcae91"/><stop offset="1" stop-color="#b77f69"/></linearGradient>
  <radialGradient id="skinLight" cx=".38" cy=".28" r=".72"><stop offset="0" stop-color="#fff0df" stop-opacity=".8"/><stop offset=".58" stop-color="#f0c9ad" stop-opacity=".12"/><stop offset="1" stop-color="#73483f" stop-opacity=".25"/></radialGradient>
  <linearGradient id="hair" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#30251f"/><stop offset=".48" stop-color="#594033"/><stop offset="1" stop-color="#211b19"/></linearGradient>
  <linearGradient id="neck" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#a86e5b"/><stop offset=".5" stop-color="#d7a58b"/><stop offset="1" stop-color="#9c6253"/></linearGradient>
  <filter id="faceShadow" x="-30%" y="-20%" width="160%" height="160%"><feGaussianBlur stdDeviation="8"/></filter>
  <filter id="zoneGlow" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="5"/></filter>
  <clipPath id="faceClip"><path d="M150 57 C91 57 66 105 72 176 C78 252 111 301 150 309 C189 301 222 252 228 176 C234 105 209 57 150 57Z"/></clipPath>
 </defs>
 <ellipse cx="150" cy="326" rx="75" ry="13" fill="#000" opacity=".15" filter="url(#faceShadow)"/>
 <path d="M113 271 L110 329 Q150 350 190 329 L187 271Z" fill="url(#neck)"/>
 <path d="M65 354 Q74 316 119 310 L150 329 L181 310 Q226 316 235 354Z" fill="#29352f"/>
 <path d="M61 151 Q42 35 150 26 Q258 35 239 151 L224 211 Q212 116 187 92 Q151 119 83 100 Q74 151 76 211Z" fill="url(#hair)"/>
 <path d="M72 154 Q55 145 54 174 Q56 207 78 211 M228 154 Q245 145 246 174 Q244 207 222 211" fill="url(#skinBase)" stroke="#9d6c5c" stroke-width="2"/>
 <path d="M150 57 C91 57 66 105 72 176 C78 252 111 301 150 309 C189 301 222 252 228 176 C234 105 209 57 150 57Z" fill="url(#skinBase)" stroke="#9c6b5c" stroke-width="1.5"/>
 <path d="M150 57 C91 57 66 105 72 176 C78 252 111 301 150 309 C189 301 222 252 228 176 C234 105 209 57 150 57Z" fill="url(#skinLight)"/>
 <g clip-path="url(#faceClip)">
  <path d="M74 90 Q150 117 226 90" fill="none" stroke="#fff1df" stroke-opacity=".24" stroke-width="16"/>
  <path d="M83 181 Q110 192 131 182 M169 182 Q190 192 217 181" fill="none" stroke="#8c5c50" stroke-opacity=".12" stroke-width="10"/>
  <path d="M83 231 Q103 264 133 267 M217 231 Q197 264 167 267" fill="none" stroke="#8c5c50" stroke-opacity=".12" stroke-width="8"/>
 </g>
 <!-- Interactive skin zones -->
 <g class="v2-face-zones">
  <path class="v2-zone" data-zone="forehead" d="M91 83 Q150 55 209 83 L211 139 Q150 151 89 139Z"/>
  <path class="v2-zone" data-zone="leftCheek" d="M78 157 Q102 143 137 157 L132 224 Q105 237 80 207Z"/>
  <path class="v2-zone" data-zone="rightCheek" d="M163 157 Q198 143 222 157 L220 207 Q195 237 168 224Z"/>
  <path class="v2-zone" data-zone="nose" d="M137 143 Q150 136 163 143 L170 222 Q150 237 130 222Z"/>
  <path class="v2-zone" data-zone="chin" d="M111 251 Q150 237 189 251 Q181 296 150 301 Q119 296 111 251Z"/>
  <path class="v2-zone" data-zone="leftJaw" d="M78 211 Q101 232 132 226 L126 273 Q97 268 78 211Z"/>
  <path class="v2-zone" data-zone="rightJaw" d="M222 211 Q199 232 168 226 L174 273 Q203 268 222 211Z"/>
 </g>
 <!-- Facial details -->
 <g class="v2-face-details" fill="none" stroke="#69483f" stroke-linecap="round" stroke-linejoin="round">
  <path d="M91 159 Q111 146 132 158" stroke-width="4"/><path d="M168 158 Q189 146 209 159" stroke-width="4"/>
  <path d="M94 177 Q112 164 130 177 Q113 190 94 177Z" fill="#fff0df" stroke-width="1.4"/><path d="M170 177 Q188 164 206 177 Q188 190 170 177Z" fill="#fff0df" stroke-width="1.4"/>
  <ellipse cx="112" cy="177" rx="5" ry="7" fill="#594238" stroke="none"/><ellipse cx="188" cy="177" rx="5" ry="7" fill="#594238" stroke="none"/>
  <circle cx="113" cy="175" r="1.8" fill="#fff" stroke="none"/><circle cx="189" cy="175" r="1.8" fill="#fff" stroke="none"/>
  <path d="M150 174 Q144 205 137 218 Q150 229 164 218" stroke-width="2" opacity=".65"/>
  <path d="M130 257 Q150 246 170 257 Q150 273 130 257Z" fill="#a65e5b" stroke-width="1.5"/>
  <path d="M136 257 Q150 262 164 257" stroke="#f0b6a7" stroke-width="1.2"/>
 </g>
 <path d="M76 106 Q79 59 124 47 Q177 28 215 78" fill="none" stroke="#8a6650" stroke-opacity=".35" stroke-width="3"/>
 <g id="v2FaceMarkers"></g>
 <text x="150" y="344" text-anchor="middle" class="v2-face-caption">SKIN MAP · FRONT VIEW</text>
</svg>
    <div><div class="v2-section-title"><b id="v2SelectedZone">Лоб</b><span class="v2-pill">Количество</span></div><div class="v2-field"><label>Активные воспаления в выбранной зоне</label><input id="v2ZoneCount" type="number" min="0" max="99" step="1" value="0"></div><div class="v2-zone-list" id="v2ZoneList"></div><p class="v2-muted">Считай активные элементы, а не следы постакне. Значения сохраняются в новой записи дневника.</p></div>
   </div>
  </div>
  <div class="v2-card"><div class="v2-section-title"><h2>Календарь состояния</h2><div class="v2-btnrow"><button id="v2PrevMonth" aria-label="Предыдущий месяц">‹</button><button id="v2NextMonth" aria-label="Следующий месяц">›</button></div></div><h3 id="v2MonthLabel"></h3><div class="v2-calendar" id="v2Calendar"></div><div class="v2-muted" style="margin-top:10px">Цвета показывают ориентировочную динамику по оценке воспалений: зелёный — ниже, жёлтый — средняя, красный — выше. Сравнение относительно твоих собственных записей.</div><div id="v2CalendarDetail" class="v2-tip" style="margin-top:12px">Выбери день, чтобы посмотреть запись.</div></div>
  <div class="v2-card"><h2>Факторы и динамика</h2><p class="v2-muted">Сравнение средних оценок воспалений в твоих записях. Это наблюдаемые совпадения, не доказательство причины.</p><div id="v2FactorInsights" class="v2-shell"><div class="v2-empty">Добавь несколько записей с факторами.</div></div></div>
  <div class="v2-card"><h2>Сравнение фотографий</h2><p class="v2-muted">Выбери две даты с фотографиями. Для честного сравнения снимай лицо при одинаковом освещении, расстоянии и ракурсе.</p><div class="v2-grid"><div class="v2-field"><label>Первое фото</label><select id="v2PhotoA"></select></div><div class="v2-field"><label>Второе фото</label><select id="v2PhotoB"></select></div></div><div id="v2CompareArea" class="v2-empty">Добавь фотографии в дневник, чтобы сравнить их.</div><div id="v2SliderControl" class="v2-field hidden"><label>Наложение фотографий</label><input id="v2CompareSlider" type="range" min="0" max="100" value="50"></div></div>
  <div class="v2-card" id="skinLabCard"><div class="v2-section-title"><div><div class="eyebrow">PANACEA SKIN · SKIN LAB</div><h2 style="margin:5px 0 0">Разметка фотографии</h2></div><span class="v2-pill">Локально</span></div><p class="v2-muted">Отмечай видимые элементы прямо на снимке. Метки сохраняются на устройстве и помогают сравнивать одни и те же зоны со временем.</p><div class="v2-field"><label>Фотография из дневника</label><select id="skinLabPhoto"></select></div><div class="v2-skin-stage" id="skinLabStage"><div class="v2-empty">Добавь фотографию в дневник, чтобы начать разметку.</div></div><div class="v2-lab-auto v2-ai-panel"><div class="v2-section-title"><b>AI-детектор акне</b><span class="v2-pill">ONNX · локально</span></div><p class="v2-muted">Модель ищет комедоны, папулы, пустулы и узлы. При первом запуске загружается файл модели около 45 МБ. Фото обрабатывается только в браузере.</p><div class="v2-ai-progress hidden" id="skinLabAiProgress"><div id="skinLabAiProgressBar"></div></div><div class="v2-field"><label for="skinLabAiThreshold">Порог уверенности: <b id="skinLabAiThresholdValue">35%</b></label><input id="skinLabAiThreshold" type="range" min="5" max="80" step="5" value="35"></div><div class="v2-btnrow"><button class="primary" id="skinLabScan" type="button">Запустить AI-анализ</button><button id="skinLabAccept" type="button" disabled>Добавить найденное в метки</button><button id="skinLabToJournal" type="button" disabled>Заполнить дневник</button></div><p class="v2-muted" id="skinLabAutoStatus">Готов к запуску. Для первого анализа потребуется интернет, чтобы загрузить модель и движок.</p><p class="v2-muted">Важно: экспериментальный исследовательский детектор. Возможны пропуски и ложные срабатывания; результат не является диагнозом.</p></div><div class="v2-grid"><div class="v2-field"><label>Тип элемента</label><select id="skinLabType"><option value="inflamed">Воспаление</option><option value="comedone">Комедон</option><option value="redness">Покраснение</option><option value="mark">След постакне</option></select></div><div class="v2-field"><label>Инструменты</label><div class="v2-btnrow"><button id="skinLabUndo" type="button">Отменить метку</button><button id="skinLabClear" type="button">Очистить фото</button></div></div></div><div class="v2-lab-stats" id="skinLabStats"></div><p class="v2-muted" id="skinLabStatus">Выбери фотографию и нажимай на неё, чтобы поставить метки.</p><div class="v2-tip">Это ручная разметка, а не автоматическая диагностика. Настоящий AI-анализ потребует отдельной модели компьютерного зрения; мы не будем выдавать приблизительные алгоритмы за медицински точный AI. Фотографии и метки остаются в локальном хранилище.</div></div>
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
  <h3>Карта лица для этой записи</h3><p class="v2-muted">Количество активных воспалений в каждой зоне.</p><div class="v2-grid" id="v2JournalZones"></div><h3 style="margin-top:14px">AI-анализ фотографии</h3><div class="v2-tip" id="v2AiJournalSummary">Результат AI-анализа пока не перенесён.</div>
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
 const markerLayer=byId("v2FaceMarkers");
 if(markerLayer){
  const coords={forehead:[112,108],leftCheek:[101,190],rightCheek:[199,190],nose:[150,204],chin:[150,276],leftJaw:[101,246],rightJaw:[199,246]};
  markerLayer.innerHTML=zoneKeys.map(k=>{const n=Math.max(0,Number(byId("v2z_"+k)?.value||0));if(!n)return "";const [x,y]=coords[k];return '<g class="v2-count-marker '+(k===selectedZone?"selected":"")+'" transform="translate('+x+' '+y+')"><circle r="13" class="marker-halo"/><circle r="10" class="marker-core"/><text y="3.5" text-anchor="middle">'+(n>99?"99+":n)+'</text></g>'}).join("");
 }
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
function renderFactorInsights(){
 const el=byId("v2FactorInsights");if(!el)return;
 const entries=state.entries||[];
 const groups=[
  {name:"Сон менее 6 часов",rows:entries.filter(e=>e.factors?.sleep!==null&&e.factors?.sleep!==undefined&&e.factors?.sleep!==""&&Number(e.factors.sleep)<6)},
  {name:"Сон 6–8 часов",rows:entries.filter(e=>e.factors?.sleep!==null&&e.factors?.sleep!==undefined&&e.factors?.sleep!==""&&Number(e.factors.sleep)>=6&&Number(e.factors.sleep)<=8)},
  {name:"Сон более 8 часов",rows:entries.filter(e=>e.factors?.sleep!==null&&e.factors?.sleep!==undefined&&e.factors?.sleep!==""&&Number(e.factors.sleep)>8)},
  {name:"Стресс 0–1",rows:entries.filter(e=>e.factors?.stress!==null&&e.factors?.stress!==undefined&&e.factors?.stress!==""&&Number(e.factors.stress)<=1)},
  {name:"Стресс 2–4",rows:entries.filter(e=>e.factors?.stress!==null&&e.factors?.stress!==undefined&&e.factors.stress!==""&&Number(e.factors.stress)>=2)}
 ];
 const avg=rows=>rows.length?(rows.reduce((sum,e)=>sum+Number(e.inflam||0),0)/rows.length).toFixed(1):"—";
 let html=groups.map(g=>'<div class="item"><div><b>'+g.name+'</b><p>Записей: '+g.rows.length+'</p></div><span class="pill">Среднее: '+avg(g.rows)+'</span></div>').join("");
 if(state.products?.length){
  html+='<h3 style="margin-top:14px">По используемым средствам</h3>';
  html+=state.products.map(p=>{
   const used=entries.filter(e=>(e.usedProducts||[]).includes(p.id));
   const not=entries.filter(e=>!(e.usedProducts||[]).includes(p.id));
   const enough=used.length>=3&&not.length>=3;
   return '<div class="item"><div><b>'+safe(p.name)+'</b><p>С использованием: '+used.length+' · без отметки: '+not.length+'</p></div><span class="pill">'+(enough?(avg(used)+' / '+avg(not)):'Мало данных')+'</span></div>';
  }).join("");
 }
 el.innerHTML=html||'<div class="v2-empty">Пока недостаточно данных для сравнения.</div>';
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
 byId("v2Reaction").value=e.reactionLevel??"";byId("v2ReactionWhen").value=e.reactionWhen??"";byId("v2ReactionNote").value=e.reactionNote??"";document.querySelectorAll("[data-v2-product]").forEach(x=>x.checked=(e.usedProducts||[]).includes(x.value));
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
   if(pendingAiJournalReport){entry.aiAnalysis={...pendingAiJournalReport,recordedAt:Date.now()};pendingAiJournalReport=null;byId("v2AiJournalSummary").textContent="AI-анализ сохранён вместе с записью.";}
   entry.factors={sleep:byId("v2Sleep").value===""?null:Number(byId("v2Sleep").value),stress:byId("v2Stress").value===""?null:Number(byId("v2Stress").value),food:byId("v2Food").value.trim(),other:byId("v2Other").value.trim()};
   entry.usedProducts=[...document.querySelectorAll("[data-v2-product]:checked")].map(x=>x.value);
   entry.reactionLevel=byId("v2Reaction").value===""?null:Number(byId("v2Reaction").value);
   entry.reactionWhen=byId("v2ReactionWhen").value;entry.reactionNote=byId("v2ReactionNote").value.trim();
   state.reactions.push({entryId:entry.id,date:entry.date,productIds:entry.usedProducts,level:entry.reactionLevel,when:entry.reactionWhen,note:entry.reactionNote});
   save();renderCalendar();renderUsedProducts();renderFactorInsights();renderSkinLab();
   zoneKeys.forEach(k=>byId("v2z_"+k).value=0);updateZoneMap();byId("v2Sleep").value="";byId("v2Stress").value="";byId("v2Food").value="";byId("v2Other").value="";byId("v2Reaction").value="";byId("v2ReactionWhen").value="";byId("v2ReactionNote").value="";
  };
 }
}

let skinLabUrl="";
function labPhotoEntries(){return state.entries.filter(e=>e.photo).sort((a,b)=>a.date.localeCompare(b.date))}
async function renderSkinLab(){
 const sel=byId("skinLabPhoto");if(!sel)return;
 const photos=labPhotoEntries(),previous=sel.value;
 sel.innerHTML=photos.map(e=>'<option value="'+safe(e.id)+'">'+dateLabel(e.date)+'</option>').join("");
 if(previous&&photos.some(e=>e.id===previous))sel.value=previous;else if(photos.length)sel.selectedIndex=photos.length-1;
 if(!photos.length){byId("skinLabStage").innerHTML='<div class="v2-empty">Пока нет фотографий. Добавь снимок в разделе «Дневник».</div>';byId("skinLabStats").innerHTML="";return}
 await showSkinLabPhoto();
}
async function showSkinLabPhoto(){
 const id=byId("skinLabPhoto")?.value,entry=state.entries.find(e=>e.id===id);if(!entry)return;
 if(skinLabUrl)URL.revokeObjectURL(skinLabUrl);
 try{
  const blob=await photoGet(id);if(!blob)throw Error("Фото не найдено");
  skinLabUrl=URL.createObjectURL(blob);
  byId("skinLabStage").innerHTML='<div class="v2-lab-image"><img id="skinLabImage" src="'+skinLabUrl+'" alt="Фото для разметки"><svg id="skinLabOverlay" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-label="Метки на фотографии"></svg></div>';
  const img=byId("skinLabImage");
  img.onload=()=>drawSkinLabMarks();
  drawSkinLabMarks();
  byId("skinLabStatus").textContent="Фото от "+dateLabel(entry.date)+". Нажми на элемент, чтобы отметить его.";
 }catch(err){byId("skinLabStage").textContent="Не удалось открыть фото: "+err.message}
}
const labTypeNames={inflamed:"Воспаления",comedone:"Комедоны",redness:"Покраснения",mark:"Следы постакне"};
const labColors={inflamed:"#ff786e",comedone:"#e8c77c",redness:"#d995b8",mark:"#8eb7ed"};
function drawSkinLabMarks(){
 const svg=byId("skinLabOverlay"),id=byId("skinLabPhoto")?.value;if(!svg||!id)return;
 const e=state.entries.find(x=>x.id===id);e.skinMarks??=[];
 svg.innerHTML=skinLabCandidates.map(c=>`<rect x="${c.x*1000}" y="${c.y*1000}" width="${c.w*1000}" height="${c.h*1000}" rx="10" fill="#e8c77c" fill-opacity=".10" stroke="#e8c77c" stroke-width="4" stroke-dasharray="9 6" pointer-events="none"/><text x="${c.x*1000}" y="${Math.max(18,c.y*1000-7)}" fill="#f3d58e" font-size="24" font-weight="700" pointer-events="none">${safe(c.label)} · ${Math.round(c.conf*100)}%</text>`).join("")+e.skinMarks.map((m,i)=>'<g class="v2-lab-mark" data-mark="'+i+'"><circle cx="'+(m.x*1000)+'" cy="'+(m.y*1000)+'" r="18" fill="'+(labColors[m.type]||"#fff")+'" fill-opacity=".28" stroke="'+(labColors[m.type]||"#fff")+'" stroke-width="5"/><circle cx="'+(m.x*1000)+'" cy="'+(m.y*1000)+'" r="5" fill="'+(labColors[m.type]||"#fff")+'"/></g>').join("");
 const counts={};Object.keys(labTypeNames).forEach(k=>counts[k]=e.skinMarks.filter(m=>m.type===k).length);
 byId("skinLabStats").innerHTML=Object.keys(labTypeNames).map(k=>'<span class="v2-lab-stat"><i style="background:'+labColors[k]+'"></i>'+labTypeNames[k]+': <b>'+counts[k]+'</b></span>').join("");
 svg.onclick=ev=>{
  const rect=svg.getBoundingClientRect(),x=Math.max(0,Math.min(1,(ev.clientX-rect.left)/rect.width)),y=Math.max(0,Math.min(1,(ev.clientY-rect.top)/rect.height));
  e.skinMarks.push({x,y,type:byId("skinLabType").value,createdAt:Date.now()});save();drawSkinLabMarks();
 };
}

let skinLabCandidates=[];
let pendingAiJournalReport=null;
let acneModelSession=null,acneModelPromise=null;
const ACNE_MODEL_URL="https://huggingface.co/mufasabrownie/glowlytics-skin-models/resolve/main/acne_detector.onnx";
const ACNE_RUNTIME_URL="https://cdn.jsdelivr.net/npm/onnxruntime-web@1.20.1/dist/ort.min.js";
const ACNE_WASM_PATH="https://cdn.jsdelivr.net/npm/onnxruntime-web@1.20.1/dist/";
let acneClasses=["Класс 1","Класс 2","Класс 3","Класс 4"];
function setAiStatus(message,progress){
 const el=byId("skinLabAutoStatus");if(el)el.textContent=message;
 const wrap=byId("skinLabAiProgress"),bar=byId("skinLabAiProgressBar");
 if(wrap)wrap.classList.toggle("hidden",progress==null);
 if(bar&&progress!=null)bar.style.width=Math.max(0,Math.min(100,progress))+"%";
}
function loadAcneRuntime(){
 if(window.ort)return Promise.resolve(window.ort);
 if(window.__panaceaOrtPromise)return window.__panaceaOrtPromise;
 window.__panaceaOrtPromise=new Promise((resolve,reject)=>{
  const script=document.createElement("script");script.src=ACNE_RUNTIME_URL;script.async=true;
  script.onload=()=>window.ort?resolve(window.ort):reject(Error("ONNX Runtime загрузился некорректно"));
  script.onerror=()=>reject(Error("Не удалось загрузить ONNX Runtime"));
  document.head.appendChild(script);
 });
 return window.__panaceaOrtPromise;
}
async function fetchAcneModel(){
 const cacheName="panacea-acne-model-v1";
 let cache=null;
 try{if("caches"in window)cache=await caches.open(cacheName)}catch(e){}
 if(cache){try{const cached=await cache.match(ACNE_MODEL_URL);if(cached){setAiStatus("Модель найдена в локальном кэше. Загружаю в память…",100);return await cached.arrayBuffer()}}catch(e){}}
 setAiStatus("Загружаю модель акне (около 45 МБ)…",0);
 const response=await fetch(ACNE_MODEL_URL,{mode:"cors",cache:"default"});
 if(!response.ok)throw Error("Не удалось скачать модель: HTTP "+response.status);
 const total=Number(response.headers.get("content-length"))||0;
 let buffer;
 if(response.body&&response.body.getReader){
  const reader=response.body.getReader(),chunks=[];let loaded=0;
  while(true){const part=await reader.read();if(part.done)break;chunks.push(part.value);loaded+=part.value.length;setAiStatus("Загружаю модель: "+(loaded/1048576).toFixed(1)+" МБ"+(total?" из "+(total/1048576).toFixed(1)+" МБ":""),total?loaded/total*100:null)}
  const bytes=new Uint8Array(loaded);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length}buffer=bytes.buffer;
 }else buffer=await response.arrayBuffer();
 if(cache){try{await cache.put(ACNE_MODEL_URL,new Response(buffer.slice(0),{headers:{"Content-Type":"application/octet-stream"}}))}catch(e){}}
 return buffer;
}
async function getAcneSession(){
 if(acneModelSession)return acneModelSession;
 if(acneModelPromise)return acneModelPromise;
 acneModelPromise=(async()=>{
  const ort=await loadAcneRuntime();ort.env.wasm.numThreads=1;ort.env.wasm.wasmPaths=ACNE_WASM_PATH;
  const model=await fetchAcneModel();
  setAiStatus("Инициализирую нейросеть…",100);
  acneModelSession=await ort.InferenceSession.create(model,{executionProviders:["wasm"],graphOptimizationLevel:"all"});
  try{const raw=acneModelSession.metadata?.customMetadataMap?.names;if(raw){const parsed=JSON.parse(raw);acneClasses=Array.isArray(parsed)?parsed.map(String):Object.keys(parsed).sort((a,b)=>Number(a)-Number(b)).map(k=>String(parsed[k]))}}catch(e){}
  return acneModelSession;
 })();
 try{return await acneModelPromise}catch(err){acneModelPromise=null;throw err}
}
function letterboxImage(img,size){
 const scale=Math.min(size/img.naturalWidth,size/img.naturalHeight),rw=Math.round(img.naturalWidth*scale),rh=Math.round(img.naturalHeight*scale);
 const left=Math.floor((size-rw)/2),top=Math.floor((size-rh)/2),canvas=document.createElement("canvas");canvas.width=size;canvas.height=size;
 const ctx=canvas.getContext("2d",{willReadFrequently:true});ctx.fillStyle="rgb(114,114,114)";ctx.fillRect(0,0,size,size);ctx.drawImage(img,left,top,rw,rh);
 const pixels=ctx.getImageData(0,0,size,size).data,chw=new Float32Array(3*size*size),plane=size*size;
 for(let p=0;p<plane;p++){const q=p*4;chw[p]=pixels[q]/255;chw[plane+p]=pixels[q+1]/255;chw[plane*2+p]=pixels[q+2]/255}
 return {tensor:chw,scale,left,top,width:img.naturalWidth,height:img.naturalHeight};
}
function boxIou(a,b){
 const xx1=Math.max(a.x,b.x),yy1=Math.max(a.y,b.y),xx2=Math.min(a.x+a.w,b.x+b.w),yy2=Math.min(a.y+a.h,b.y+b.h);
 const inter=Math.max(0,xx2-xx1)*Math.max(0,yy2-yy1),union=a.w*a.h+b.w*b.h-inter;return union>0?inter/union:0;
}
function decodeAcneOutput(tensor,meta){
 const dims=tensor.dims,data=tensor.data;
 if(!dims||dims.length<2)throw Error("Неизвестная форма выхода модели");
 let anchors,features,at;
 if(dims.length===3&&dims[1]<=32&&dims[2]>dims[1]){features=dims[1];anchors=dims[2];at=(n,k)=>data[k*anchors+n]}
 else if(dims.length===3&&dims[2]<=32){anchors=dims[1];features=dims[2];at=(n,k)=>data[n*features+k]}
 else if(dims.length===2&&dims[0]<=32){features=dims[0];anchors=dims[1];at=(n,k)=>data[k*anchors+n]}
 else throw Error("Формат выхода модели не распознан: "+dims.join("×"));
 if(features<5)throw Error("У модели недостаточно выходных классов");
 const raw=[],classCount=features-4,threshold=Number(byId("skinLabAiThreshold")?.value||35)/100;
 for(let n=0;n<anchors;n++){
  let cls=0,conf=0;for(let k=0;k<classCount;k++){const v=at(n,k+4);if(v>conf){conf=v;cls=k}}
  if(conf<threshold)continue;
  const cx=at(n,0),cy=at(n,1),bw=at(n,2),bh=at(n,3);
  const x=Math.max(0,(cx-bw/2-meta.left)/meta.scale),y=Math.max(0,(cy-bh/2-meta.top)/meta.scale);
  const x2=Math.min(meta.width,(cx+bw/2-meta.left)/meta.scale),y2=Math.min(meta.height,(cy+bh/2-meta.top)/meta.scale);
  if(x2<=x||y2<=y)continue;
  raw.push({x:x/meta.width,y:y/meta.height,w:(x2-x)/meta.width,h:(y2-y)/meta.height,conf,label:acneClasses[cls]||("Класс "+cls),classId:cls});
 }
 raw.sort((a,b)=>b.conf-a.conf);const kept=[];
 for(const box of raw){if(kept.every(k=>k.classId!==box.classId||boxIou(k,box)<.45))kept.push(box);if(kept.length>=100)break}
 return kept;
}
async function scanSkinLab(){
 const img=byId("skinLabImage");
 if(!img||!img.complete||!img.naturalWidth){setAiStatus("Сначала выбери фотографию.");return}
 const button=byId("skinLabScan");button.disabled=true;byId("skinLabAccept").disabled=true;skinLabCandidates=[];
 try{
  const session=await getAcneSession();
  setAiStatus("Анализирую фотографию на устройстве…",100);
  const input=letterboxImage(img,640),ort=window.ort,inputName=session.inputNames[0];
  const tensor=new ort.Tensor("float32",input.tensor,[1,3,640,640]);
  const output=await session.run({[inputName]:tensor});
  const outputTensor=output[session.outputNames[0]];
  skinLabCandidates=decodeAcneOutput(outputTensor,input);
  drawSkinLabMarks();
  byId("skinLabAccept").disabled=!skinLabCandidates.length;byId("skinLabToJournal").disabled=!skinLabCandidates.length;
  setAiStatus(skinLabCandidates.length
   ?"Найдено объектов: "+skinLabCandidates.length+". Рамки показывают прогноз модели — проверь каждый объект перед сохранением."
   :"Модель не обнаружила объектов выше порога уверенности. Это не означает, что высыпаний нет.",null);
 }catch(err){
  console.error("PANACEA acne detector:",err);
  setAiStatus("Ошибка AI-анализа: "+(err?.message||String(err))+". Попробуй ещё раз или проверь интернет.",null);
 }finally{button.disabled=false}
}
function fillJournalFromAi(){
 const photoEntry=state.entries.find(x=>x.id===byId("skinLabPhoto")?.value);
 if(!photoEntry||!skinLabCandidates.length)return;
 const classCounts={};
 skinLabCandidates.forEach(c=>{const name=String(c.label||("Класс "+c.classId));classCounts[name]=(classCounts[name]||0)+1});
 const avgConfidence=skinLabCandidates.reduce((sum,c)=>sum+Number(c.conf||0),0)/skinLabCandidates.length;
 pendingAiJournalReport={source:"onnx-acne-detector",photoDate:photoEntry.date,count:skinLabCandidates.length,classes:classCounts,averageConfidence:Number(avgConfidence.toFixed(4)),threshold:Number(byId("skinLabAiThreshold").value)/100};
 byId("entryDate").value=photoEntry.date;
 const summary="AI-анализ: "+skinLabCandidates.length+" обнаружений; "+Object.entries(classCounts).map(([k,v])=>k+": "+v).join(", ")+". Средняя уверенность: "+Math.round(avgConfidence*100)+"%. Порог: "+byId("skinLabAiThreshold").value+"%.";
 const notes=byId("entryNotes");notes.value=notes.value.trim()?notes.value.trim()+"\n"+summary:summary;
 const box=byId("v2AiJournalSummary");
 if(box)box.textContent="Подготовлено для записи от "+dateLabel(photoEntry.date)+": "+summary+" Проверь заметку и остальные поля, затем сохрани запись. AI не оценивает тяжесть акне и не определяет зоны лица.";
 document.querySelector('[data-page="journal"]')?.click();
 byId("saveEntry").scrollIntoView({behavior:"smooth",block:"center"});
}
function acceptSkinLabCandidates(){
 const e=state.entries.find(x=>x.id===byId("skinLabPhoto")?.value);if(!e||!skinLabCandidates.length)return;
 e.skinMarks??=[];
 skinLabCandidates.forEach(c=>e.skinMarks.push({x:c.x+c.w/2,y:c.y+c.h/2,type:"inflamed",createdAt:Date.now(),source:"onnx-acne-detector",modelClass:c.label,confidence:c.conf,box:{x:c.x,y:c.y,w:c.w,h:c.h}}));
 const count=skinLabCandidates.length;skinLabCandidates=[];save();drawSkinLabMarks();
 byId("skinLabAccept").disabled=true;byId("skinLabToJournal").disabled=true;setAiStatus("Добавлено меток: "+count+". Результаты можно исправлять вручную.",null);
}
function undoSkinLabMark(){
 const e=state.entries.find(x=>x.id===byId("skinLabPhoto")?.value);if(!e?.skinMarks?.length)return;
 e.skinMarks.pop();save();drawSkinLabMarks();
}
function clearSkinLabMarks(){
 const e=state.entries.find(x=>x.id===byId("skinLabPhoto")?.value);if(!e?.skinMarks?.length)return;
 if(!confirm("Удалить все метки с этой фотографии?"))return;
 e.skinMarks=[];save();drawSkinLabMarks();
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
 byId("v2PhotoA").onchange=updateCompare;byId("v2PhotoB").onchange=updateCompare;byId("skinLabPhoto").onchange=()=>{skinLabCandidates=[];showSkinLabPhoto()};byId("skinLabScan").onclick=scanSkinLab;byId("skinLabAccept").onclick=acceptSkinLabCandidates;byId("skinLabToJournal").onclick=fillJournalFromAi;const aiThreshold=byId("skinLabAiThreshold");if(aiThreshold)aiThreshold.oninput=()=>byId("skinLabAiThresholdValue").textContent=aiThreshold.value+"%";byId("skinLabUndo").onclick=undoSkinLabMark;byId("skinLabClear").onclick=clearSkinLabMarks;
 byId("v2CompareSlider").oninput=e=>{const overlay=byId("v2Overlay");if(overlay)overlay.style.width=e.target.value+"%"};
 attachJournal();renderCalendar();renderFactorInsights();renderSkinLab();setupPwa();
 // Existing backups already serialize the full state object, so v0.2 fields are included automatically.
 save();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
