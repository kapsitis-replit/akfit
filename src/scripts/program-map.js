/* AK Fitness — interactive program map (vanilla port of the React artifact).
   Framework-free so it fits the static site. Renders into #ak-program-map. */
(function () {
  "use strict";
// ---- data extracted verbatim from artifact ----
const RED   = "#d70c32";
const RED_A = "#d70c3233";

const programs = {
  foundations: {
    id:"foundations", tier:0,
    label:"PAMATI", subtitle:"Kustību Mehānika & Tehnika", icon:"⚙️",
    desc:"Neaizstājamais sākumpunkts. Uzzini, kā pareizi izpildīt sešus pamata kustību modeļus ar korektu stāju, locītavu izvietojumu un ķermeņa stabilizāciju.",
    details:[
      "Biežums: 3×/nedēļā, visu ķermeni aptverošas sesijas",
      "Sets & Reps: 3×8–12, tehnikas prioritāte",
      "Squat → Goblet Squat → Back Squat",
      "Hinge → Romanian Deadlift → Conventional",
      "Push & Pull: variācijas no ķermeņa svara līdz stienī",
      "Temps: 3-1-1 ar 360° core stabilizāciju",
      "Mobilitāte: gūžas, krūšu kurvja & potītes plūsma",
    ],
    duration:"4–8 nedēļas",
    connects:["periodization"],
  },
  periodization: {
    id:"periodization", tier:1,
    label:"PERIODIZĀCIJA", subtitle:"Strukturēta Ilgtermiņa Plānošana", icon:"📈",
    desc:"Katra efektīva plāna pamats. Organizē treniņus pa nedēļām, mēnešiem un cikliem — lai progress nekad neapstātos.",
    details:[
      "Microcycle: Iknedēļas struktūra un sesiju secība",
      "Mesocycle: 4–6 nedēļu bloki ar adaptācijas mērķi",
      "Macrocycle: 12–24 nedēļu sezonas plānošana",
      "Progressive Overload: slodzes, apjoma un blīvuma metodes",
      "Deload: plānota noguruma mazināšana ik pēc 4–6 nedēļām",
      "RPE & Autoregulācija: intensitāte pēc gatavības",
      "Apjoma robežvērtības: MRV, MEV & MV katrai grupai",
    ],
    duration:"Pastāvīga koncepcija",
    connects:["hypertrophy","strength","focus","sport"],
  },
  hypertrophy: {
    id:"hypertrophy", tier:2,
    label:"HIPERTROFIJA", subtitle:"Muskuļu Augšana & Apjoms", icon:"💪",
    desc:"Muskuļu veidošanas zinātne. Maksimāls hipertrofisks stimuls ar stratēģisku apjoma uzkrāšanu, mehānisko spriedzi un metabolisko stresu.",
    details:[
      "Biežums: 3–5 dienas, PPL vai augšdaļa/apakšdaļa",
      "Sets & Reps: 3–5 × 8–15 uz vingrojumu",
      "Intensitāte: 60–75% 1RM, 1–3 RIR",
      "Apjoma progresija: sets līdz MRV, tad deload",
      "Compound + isolation līdzsvars",
      "Drop sets, supersets & rest-pause",
      "Kaloriju pārpalikums 200–400 kcal",
    ],
    duration:"8–16 nedēļas",
    connects:["powerlifting","physique"],
  },
  strength: {
    id:"strength", tier:2,
    label:"SPĒKS", subtitle:"Maksimālais Spēks & Neirālā Efektivitāte", icon:"🏋️",
    desc:"Maksimāla svara pārvietošana. Attīsti spēka izlādi caur mazatkārtojumu, augstas intensitātes treniņiem un CNS pārvaldību.",
    details:[
      "Biežums: 3–4 dienas, celšanu rotācija",
      "Sets & Reps: 3–6 × 1–6 pie 80–100% 1RM",
      "Lineārā & viļņveida slodzes progresija",
      "Squat, Bench Press & Deadlift kā virzītāji",
      "Palīgvingrojumi: vājo vietu korekcija 6–10 reps",
      "Peaking bloks: apjoma samazinājums, intensitātes celšana",
      "CNS-jutīgs deload ik pēc 3–4 nedēļām",
    ],
    duration:"8–16 nedēļas",
    connects:["powerlifting"],
  },
  focus: {
    id:"focus", tier:2,
    label:"FOKUSA MUSKUĻGRUPAS", subtitle:"Vājo Muskuļgrupu Uzlabošana", icon:"🎯",
    desc:"Identificē un novērš disbalansu. Mērķtiecīga programma, kas pastiprina atpalikušās muskuļgrupas, uzlabo simetriju un samazina traumu risku.",
    details:[
      "Novērtējums: muskulatūras disbalansa diagnostika",
      "Prioritāte: 2–3 papildu sesijas mērķmuskuļiem nedēļā",
      "Izolācijas vingrojumi: 3–4 × 12–20 reps",
      "Mind-muscle connection tehnikas",
      "Funkcionālie kustību modeļi vājo zonu aktivācijai",
      "Rehabilitācijas principi traumu profilaksei",
      "Progresa mērīšana ar fotogrāfijām un mērījumiem",
    ],
    duration:"6–12 nedēļas",
    connects:["physique","powerlifting"],
  },
  sport: {
    id:"sport", tier:2,
    label:"SPORTA SPECIALIZĀCIJA", subtitle:"Sportam Specifiska Sagatavošana", icon:"🏃",
    desc:"Treniņi veidoti ap tavas sporta disciplīnas prasībām. Spēks, ātrums, izturība un kustību modeļi — viss pakārtots tavai spēlei.",
    details:[
      "Sporta analīze: enerģijas sistēmu un kustību kartēšana",
      "Spēks–ātrums profils: sprinta, lēciena, griešanās tests",
      "Periodizācija ap sacensību sezonu un off-season",
      "Pārejas spēks → sportisks jauda (plyometrics, Olympic lifts)",
      "Biežums: 3–5 dienas atkarībā no sporta slodzes",
      "Traumu profilakse: stabilizācija un kustību korekcija",
      "Atveseļošanās protokoli aktīvai sezonai",
    ],
    duration:"12–24 nedēļas",
    connects:["powerlifting","sportcomp"],
  },
  physique: {
    id:"physique", tier:3,
    label:"BODIBILDINGS SACENSĪBAS", subtitle:"Ķermeņa Kompozīcija & Definīcija", icon:"🔥",
    desc:"Atklāj muskuļus, ko esi uzbūvējis. Cutting fāze, kas saglabā masu, vienlaikus sistemātiski samazinot taukus.",
    details:[
      "4–5 dienas spēka + 3–5 cardio sesijas",
      "3–4 × 10–15 reps, intensitāte netiek samazināta",
      "Slodze ≥70% 1RM muskulatūras saglabāšanai",
      "LISS 30–45 min + 1–2 HIIT nedēļā",
      "Kaloriju deficīts: 300–500 kcal/dienā",
      "Olbaltumvielas: 2,2–2,6 g/kg svara",
      "Aktīvs cut → mini-refeed → pike nedēļa",
    ],
    duration:"8–20 nedēļas",
    connects:[],
  },
  sportcomp: {
    id:"sportcomp", tier:3,
    label:"SPORTA SACENSĪBAS", subtitle:"Sacensību Sagatavošana Sportā", icon:"🥇",
    desc:"Veidots sportistiem, kas tiecas uz sacensību podiju. Pīķa sagatavošana, taktiskie treniņi un mentālā noturība — viss vienā strukturētā programmā.",
    details:[
      "Sacensību kalendāra periodizācija: B → A sacensības",
      "Pīķa bloks: 3–4 nedēļu intensitātes samazinājums pirms starta",
      "Taktisko prasmju integrācija ar fizisko sagatavotību",
      "Spēks, ātrums & jauda — sporta specifiskas proporcijas",
      "Psiholoģiskā sagatavošana: stresa pārvaldība un fokuss",
      "Atveseļošanās protokoli starp sacensībām",
      "Analītika: videoanalīze un snieguma metrika",
    ],
    duration:"16–24 nedēļas",
    connects:[],
  },
  powerlifting: {
    id:"powerlifting", tier:3,
    label:"POWERLIFTING SACENSĪBAS", subtitle:"Sacensību Spēka Sports", icon:"🏆",
    desc:"Augstākais spēka pārbaudījums uz platformas. Sagatavošanās sacensībām ar strukturētu 16 nedēļu ciklu.",
    details:[
      "4 dienas, SBD celšanu rotācija",
      "5×5 → 3×3 → smagi singles peaking blokā",
      "75% → 97%+ 1RM progresija",
      "Sacensību standarta dziļums, pauzes & komandas",
      "Mēģinājumu stratēģija: 90% / 97% / 102%+",
      "Svara cuts: ūdens & nātrija protokoli",
      "Provessacensības 3–4 nedēļas pirms",
    ],
    duration:"12–16 nedēļas",
    connects:[],
  },
};

const TIERS = [
  ["foundations"],
  ["periodization"],
  ["hypertrophy","strength","focus","sport"],
  ["physique","powerlifting","sportcomp"],
];
const TIER_LABELS = ["PAMATI","METODOLOĢIJA","MĒRĶIS","SACENSĪBAS"];

function getRelated(id) {
  const s = new Set([id, ...(programs[id].connects||[])]);
  Object.values(programs).forEach(p => { if(p.connects?.includes(id)) s.add(p.id); });
  return s;
}

  /* ---- helpers ---- */
  function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
  var active = null;
  var highlighted = new Set();

  function tierLabel(label){
    return '<div style="display:flex;align-items:center;gap:12px;margin:6px 0 14px">'
      + '<div style="flex:1;height:1px;background:#52525b"></div>'
      + '<div style="display:flex;align-items:center;gap:8px;padding:6px 16px;border:1px solid #71717a;background:#18181b;border-radius:2px">'
      + '<span style="width:7px;height:7px;background:'+RED+';display:inline-block;flex-shrink:0"></span>'
      + '<span style="font-size:12.6px;letter-spacing:0.3em;font-weight:700;color:#e4e4e7;font-family:\'Courier New\',monospace;text-transform:uppercase">'+esc(label)+'</span>'
      + '</div><div style="flex:1;height:1px;background:#52525b"></div></div>';
  }

  function connectors(fromTier, toTier){
    var W=800,H=52;
    var xOf=function(tier,idx){return (W/(tier.length+1))*(idx+1);};
    var lines=[];
    fromTier.forEach(function(fId){
      (programs[fId].connects||[]).forEach(function(tId){
        if(toTier.indexOf(tId)===-1) return;
        var lit=highlighted.has(fId)&&highlighted.has(tId);
        lines.push({lit:lit,x1:xOf(fromTier,fromTier.indexOf(fId)),x2:xOf(toTier,toTier.indexOf(tId))});
      });
    });
    var svg='<div style="display:flex;justify-content:center;padding:2px 0">'
      +'<svg width="100%" viewBox="0 0 '+W+' '+H+'" style="max-width:920px;overflow:visible;display:block">';
    lines.forEach(function(l){
      var col=l.lit?RED:"#71717a", sw=l.lit?2.5:1.5, dash=l.lit?"none":"5,4", r=l.lit?5:3.5;
      var glow=l.lit?"filter:drop-shadow(0 0 6px "+RED+")":"";
      svg+='<g><line x1="'+l.x1+'" y1="2" x2="'+l.x2+'" y2="'+(H-2)+'" stroke="'+col+'" stroke-width="'+sw+'" stroke-dasharray="'+dash+'" style="transition:all .3s"/>'
        +'<circle cx="'+l.x1+'" cy="2" r="'+r+'" fill="'+col+'" style="transition:all .3s;'+glow+'"/>'
        +'<circle cx="'+l.x2+'" cy="'+(H-2)+'" r="'+r+'" fill="'+col+'" style="transition:all .3s;'+glow+'"/></g>';
    });
    return svg+'</svg></div>';
  }

  function card(id){
    var p=programs[id];
    var isActive=active===id;
    var isRelated=highlighted.has(id)&&!isActive;
    var isDimmed=!!active&&!highlighted.has(id);
    var bd=isActive?RED:(isRelated?"#a1a1aa":"#52525b");
    var s='<div data-card="'+id+'" style="cursor:pointer;flex:1 1 180px;min-width:160px;max-width:220px;'
      +'background:'+(isActive?"#1c1917":"#111113")+';border:1px solid '+bd+';border-top:2px solid '+bd+';'
      +'padding:16px 18px 14px;transition:all .3s cubic-bezier(.4,0,.2,1);opacity:'+(isDimmed?0.22:1)+';'
      +'transform:'+(isActive?"translateY(-4px)":"translateY(0)")+';box-shadow:'+(isActive?"0 6px 32px "+RED_A:"none")+';position:relative">';
    s+='<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">'
      +'<span style="font-size:18px;line-height:1;flex-shrink:0">'+p.icon+'</span>'
      +'<div style="font-size:11.7px;letter-spacing:0.2em;font-weight:700;color:'+(isActive?RED:"#e4e4e7")+';font-family:\'Courier New\',monospace;line-height:1.25;text-transform:uppercase;transition:color .3s">'+esc(p.label)+'</div></div>';
    s+='<div style="font-size:11.7px;color:#a1a1aa;font-style:italic;margin-bottom:7px;line-height:1.35">'+esc(p.subtitle)+'</div>';
    s+='<div style="font-size:12.6px;color:#a1a1aa;line-height:1.55;display:-webkit-box;-webkit-line-clamp:'+(isActive?"unset":"3")+';-webkit-box-orient:vertical;overflow:hidden">'+esc(p.desc)+'</div>';
    if(isActive){
      s+='<div style="margin-top:14px;border-top:1px solid #27272a;padding-top:14px">'
        +'<div style="font-size:10.8px;letter-spacing:0.3em;color:#a1a1aa;font-family:\'Courier New\',monospace;margin-bottom:8px;text-transform:uppercase">Galvenie komponenti</div>';
      p.details.forEach(function(d){
        s+='<div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:5px">'
          +'<span style="color:'+RED+';font-size:8px;flex-shrink:0;margin-top:3px">&#9670;</span>'
          +'<span style="font-size:11.7px;color:#d4d4d8;line-height:1.45">'+esc(d)+'</span></div>';
      });
      s+='<div style="margin-top:12px;padding:7px 12px;background:#0a0a0a;border:1px solid '+RED_A+';display:flex;justify-content:space-between;align-items:center">'
        +'<span style="font-size:10.8px;letter-spacing:0.2em;color:#a1a1aa;font-family:\'Courier New\',monospace;text-transform:uppercase">Ilgums</span>'
        +'<span style="font-size:12.6px;color:'+RED+';font-style:italic">'+esc(p.duration)+'</span></div></div>';
    }
    s+='<div style="margin-top:10px;font-size:9.9px;letter-spacing:0.18em;color:'+(isActive?RED:"#71717a")+';font-family:\'Courier New\',monospace;text-align:right;transition:color .3s;text-transform:uppercase">'
      +(isActive?"Aizvērt &#8593;":"Skatīt &#8594;")+'</div>';
    return s+'</div>';
  }

  function render(){
    var host=document.getElementById("ak-program-map");
    if(!host) return;
    var html='';
    /* header */
    html+='<div style="margin-bottom:36px">'
      +'<div style="font-size:10.8px;letter-spacing:0.45em;color:'+RED+';margin-bottom:10px;font-family:\'Courier New\',monospace;font-weight:700">AK FITNESS</div>'
      +'<div style="border-left:4px solid '+RED+';padding-left:16px">'
      +'<h2 style="font-size:clamp(25px,4.5vw,43px);font-weight:700;letter-spacing:-0.03em;margin:0;line-height:1.05;color:#fafafa;text-transform:uppercase">Programmu Arhitektūra</h2>'
      +'<p style="font-size:11.7px;letter-spacing:0.25em;color:#a1a1aa;font-family:\'Courier New\',monospace;text-transform:uppercase;margin:6px 0 0">Izvēlies savu ceļu — klikšķini uz programmas</p>'
      +'</div></div>';
    /* tiers */
    TIERS.forEach(function(tier,ti){
      html+='<div>'+tierLabel(TIER_LABELS[ti]);
      html+='<div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;padding:0 4px">';
      tier.forEach(function(id){ html+=card(id); });
      html+='</div>';
      if(ti<TIERS.length-1) html+=connectors(tier,TIERS[ti+1]);
      html+='</div>';
    });
    /* trust strip */
    var trust=[["⚡","Zinātnē Balstīts"],["🎓","Sertificēti Treneri"],["🎯","Individuāla Pieeja"],["📊","Garantēts Rezultāts"]];
    html+='<div style="margin-top:40px;border-top:1px solid #3f3f46;padding-top:22px;display:flex;flex-wrap:wrap;gap:18px;justify-content:center">';
    trust.forEach(function(t){
      html+='<span style="display:flex;align-items:center;gap:6px;font-size:11.7px;letter-spacing:0.22em;color:#a1a1aa;font-family:\'Courier New\',monospace;text-transform:uppercase;font-weight:700">'
        +'<span style="color:'+RED+'">'+t[0]+'</span>'+esc(t[1])+'</span>';
    });
    html+='</div>';
    host.innerHTML=html;
  }

  function onClick(e){
    var el=e.target.closest("[data-card]");
    if(!el) return;
    var id=el.getAttribute("data-card");
    if(active===id){ active=null; highlighted=new Set(); }
    else { active=id; highlighted=getRelated(id); }
    render();
  }

  function init(){
    var host=document.getElementById("ak-program-map");
    if(!host) return;
    host.addEventListener("click", onClick);
    render();
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
