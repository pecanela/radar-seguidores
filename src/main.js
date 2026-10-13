/* Radar Seguidores - multi-browser. Integracao nao oficial com o Instagram. */
(() => {
  "use strict";
  if (window.top !== window || document.getElementById("radar-seguidores-host")) return;
  const LOGIC = globalThis.RadarLogic;
  const ext = typeof browser !== "undefined" ? browser : (typeof chrome !== "undefined" ? chrome : null);
  if (!LOGIC || !ext?.storage?.local) return;
  const APP_ID = "936619743392459";
  const WAIT_MS = 1400;
  const MIN_SCAN_INTERVAL_MS = 30 * 60 * 1000;
  const LIMIT_PAGES = 5000;
  const css = `
    *{box-sizing:border-box} button,input{font:inherit} button{cursor:pointer}
    .radar-trigger{position:fixed;right:19px;bottom:20px;border:1px solid #38bdf8;color:#ebfaff;background:linear-gradient(135deg,#0f5072,#172353);padding:13px 18px;border-radius:99px;z-index:2147483646;box-shadow:0 12px 35px #0008;font:700 14px system-ui}
    .backdrop{position:fixed;inset:0;z-index:2147483647;background:#020611a8;display:flex;align-items:center;justify-content:center;padding:14px;font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#f0f5ff}
    .panel{width:min(900px,100%);height:min(760px,94vh);display:flex;flex-direction:column;overflow:hidden;border:1px solid #344566;border-radius:22px;background:#101829;box-shadow:0 22px 85px #000c}
    .top{padding:18px 21px 15px;background:linear-gradient(115deg,#132b47,#171d35 65%,#261d46);border-bottom:1px solid #34405a;display:flex;justify-content:space-between;gap:14px;align-items:flex-start}
    h1{font-size:22px;line-height:1.2;margin:0;color:#fff;font-weight:800} .small{font-size:12px;color:#a4b3cc} .subtitle{font-size:13px;color:#b5c6e1;margin:6px 0 0}
    .close{background:transparent;color:#b5c6e1;border:0;border-radius:8px;font-size:27px;padding:0 8px;line-height:1}
    .area{padding:15px 19px;overflow:auto;flex:1} .tools{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:12px}
    .primary{color:#041321;background:linear-gradient(120deg,#38bdf8,#5eead4);border:0;border-radius:11px;padding:11px 16px;font-weight:800} .primary:disabled{opacity:.5;cursor:wait}
    .outline{background:#192439;color:#e6efff;border:1px solid #405475;border-radius:10px;padding:10px 14px}
    .status{background:#172238;border:1px solid #293b59;padding:12px 14px;border-radius:11px;font-size:13px;color:#c4d2e9;margin:0 0 14px;line-height:1.55}
    .warn{border-color:#8d6839;background:#302416;color:#ffdfa8} .error{border-color:#914653;background:#371c2a;color:#ffc7d0}
    .meter{height:5px;background:#26314c;overflow:hidden;border-radius:20px;margin-top:9px}.meter>div{height:100%;background:#38bdf8;transition:width .2s}
    .stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-bottom:15px}
    .stat{border:1px solid #2e4160;border-radius:12px;background:#172238;padding:12px}.stat strong{display:block;color:#f5fbff;font-size:25px;font-variant-numeric:tabular-nums}.stat span{font-size:12px;color:#a5b5ce}
    .tabs{display:flex;gap:7px;overflow:auto;padding-bottom:9px;border-bottom:1px solid #35435a;margin-bottom:12px}
    .tab{background:#172338;border:1px solid #2c405c;color:#b8c7e2;border-radius:9px;padding:10px 11px;font-size:13px;white-space:nowrap}
    .tab[aria-selected=true]{border-color:#38bdf8;color:#e8fbff;background:#154466}
    .search{width:100%;border:1px solid #394c6a;border-radius:10px;background:#131e31;color:#f1f6ff;outline:0;padding:12px 13px;margin-bottom:10px}
    .accounts{display:flex;flex-direction:column;gap:7px}.account{border:1px solid #263854;border-radius:12px;background:#141f32;padding:11px;display:flex;align-items:center;gap:10px}
    .avatar{width:39px;height:39px;border-radius:50%;display:grid;place-items:center;background:#19415d;font-size:16px;font-weight:800;flex-shrink:0;color:#66e5f7}
    .identity{min-width:0;flex:1}.username{font-weight:700;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;font-size:14px}.name{font-size:11px;color:#9dacc7;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}
    .actions{display:flex;gap:6px;flex-wrap:wrap}.action{font-size:12px;padding:8px 10px;color:#d5e8ff;background:#23344d;border:1px solid #466080;border-radius:9px;text-decoration:none;white-space:nowrap}
    .action.danger{color:#ffced5;background:#432431;border-color:#7c4056}.action:disabled{opacity:.5}
    .empty{text-align:center;color:#b3c2db;border:1px dashed #374761;border-radius:14px;padding:26px 18px;margin-top:8px;font-size:14px}
    .muted{font-size:12px;color:#97a7c1;margin:9px 0}.bottom{padding:10px 18px;border-top:1px solid #2e3f5d;color:#8d9cb7;font-size:11px;display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
    .link{color:#82d9ff;text-decoration:none}.load{width:100%;margin-top:9px} @media(max-width:600px){.top{padding:14px}.area{padding:10px}.stats{gap:6px}.stat{padding:9px}.stat strong{font-size:21px}.account{gap:6px}.action{padding:7px;font-size:11px}}
  `;
  const host = document.createElement("div");
  host.id = "radar-seguidores-host";
  const root = host.attachShadow({mode:"open"});
  const style = document.createElement("style"); style.textContent = css; root.append(style);
  const launch = document.createElement("button"); launch.className="radar-trigger"; launch.type="button"; launch.textContent="◎ Radar Seguidores";
  root.append(launch);
  document.documentElement.append(host);
  const state = {open:false,busy:false,abort:null,userId:null,current:null,history:[],view:"no",search:"",visible:150,status:"Faça login no Instagram e toque em Analisar agora.",statusKind:"normal",progress:null,lastScan:null};
  const storageKey = () => `radar_instagram_${state.userId}`;
  let backdrop, area, statusEl, scanButton;

  const cookie = key => {
    const entry = document.cookie.split("; ").find(c=>c.startsWith(key+"="));
    return entry ? decodeURIComponent(entry.slice(key.length+1)) : "";
  };
  const wait = (ms,signal) => new Promise((resolve,reject)=>{
    const t=setTimeout(()=>{signal?.removeEventListener("abort",onAbort);resolve();},ms);
    const onAbort=()=>{clearTimeout(t);reject(new Error("Análise cancelada."));};
    if(signal?.aborted){onAbort();return;}
    signal?.addEventListener("abort",onAbort,{once:true});
  });
  const authId = ()=>cookie("ds_user_id");
  const storageGet = async key => (await ext.storage.local.get(key))[key];
  const storagePut = async (key,v) => { await ext.storage.local.set({[key]:v}); };
  const storageRemove = async key => { await ext.storage.local.remove(key); };
  function setStatus(s,kind="normal",progress=null){state.status=s;state.statusKind=kind;state.progress=progress;paintStatus();}
  function paintStatus(){if(!statusEl)return;statusEl.className=`status ${state.statusKind==="normal"?"":state.statusKind}`;statusEl.textContent=state.status;if(state.progress!=null){const meter=document.createElement("div");meter.className="meter";const bar=document.createElement("div");bar.style.width=`${state.progress}%`;meter.append(bar);statusEl.append(meter);}}
  async function requestList(id,type,cursor,signal){
    const q=new URLSearchParams();
    if(type==="following")q.set("order","date_followed_latest");
    else q.set("count","25");
    if(cursor)q.set("max_id",cursor);
    const u=`https://www.instagram.com/api/v1/friendships/${encodeURIComponent(id)}/${type}/?${q}`;
    const response=await fetch(u,{method:"GET",credentials:"include",signal,headers:{"x-ig-app-id":APP_ID,"x-requested-with":"XMLHttpRequest"}});
    if(response.redirected||response.status===401||response.status===403)throw Error("O Instagram pediu nova autenticação ou bloqueou esta consulta. Abra o Instagram, confira sua sessão e tente mais tarde.");
    if(response.status===429)throw Error("O Instagram limitou as consultas (429). Aguarde antes de tentar novamente.");
    if(!response.ok)throw Error(`O Instagram recusou a consulta (${response.status}). A interface não oficial pode ter mudado.`);
    const ct=response.headers.get("content-type")||"";
    if(!ct.includes("json"))throw Error("Resposta inesperada do Instagram. Nenhum resultado parcial foi salvo.");
    const body=await response.json();
    if(!Array.isArray(body.users)||body.status!=="ok")throw Error("Formato de resposta não reconhecido. A análise foi interrompida.");
    return body;
  }
  async function fetchList(id,type,signal){
    let cursor="";const seen=new Map();const cursors=new Set();
    for(let page=0;page<LIMIT_PAGES;page++){
      if(signal.aborted)throw Error("Análise cancelada.");
      setStatus(`Lendo ${type==="following"?"quem você segue":"seus seguidores"}: ${seen.size.toLocaleString("pt-BR")} contas encontradas · página ${page+1}. Pode levar alguns minutos para contas grandes.`,"normal",type==="following"?15:55);
      const data=await requestList(id,type,cursor,signal);
      for(const raw of data.users){const users=LOGIC.normalizeUsers([raw]);if(users[0])seen.set(users[0].id,users[0]);}
      const next=data.next_max_id?String(data.next_max_id):"";
      if(!next) return [...seen.values()];
      if(cursors.has(next)||next===cursor)throw Error("A paginação do Instagram repetiu uma página. A análise foi interrompida para evitar resultados incorretos.");
      cursors.add(next);cursor=next;
      await wait(page>0 && page%25===0 ? 6000 : WAIT_MS + Math.round(Math.random()*600),signal);
    }
    throw Error("Limite de páginas atingido. A análise foi interrompida para evitar dados incompletos.");
  }
  async function readStored(){
    state.userId=authId();
    if(!state.userId){state.current=null;state.history=[];state.lastScan=null;setStatus("Entre em instagram.com com sua conta. Depois reabra este painel.","warn");paint();return;}
    const saved=await storageGet(storageKey());
    if(state.userId!==authId())return;
    state.current=saved?.current||null;state.history=saved?.history||[];state.lastScan=saved?.current?.capturedAt||null;
    setStatus(state.current?`Última análise completa: ${new Date(state.lastScan).toLocaleString("pt-BR")}. Clique em Analisar agora para atualizar.`:"Nenhuma análise realizada. Clique em Analisar agora. A primeira análise não revela quem deixou de seguir no passado.");paint();
  }
  async function scan(){
    const id=authId();if(!id){setStatus("Entre na sua conta do Instagram e atualize esta página.","warn");return;}
    if(state.busy)return;
    // An Instagram login can change while the panel stays open. Never compare
    // the new account against another account's in-memory baseline.
    if(id !== state.userId){await readStored();return;}
    if(state.lastScan && Number.isFinite(state.lastScan)){
      const elapsed = Date.now() - state.lastScan;
      if(elapsed >= 0 && elapsed < MIN_SCAN_INTERVAL_MS){
        const minutes = Math.ceil((MIN_SCAN_INTERVAL_MS-elapsed)/60000);
        setStatus(`Para evitar consultas excessivas, aguarde ${minutes} min para outra análise completa. Os resultados anteriores continuam disponíveis.`,"warn");
        return;
      }
    }
    state.busy=true;state.userId=id;state.abort=new AbortController();paint();
    try{
      const following=await fetchList(id,"following",state.abort.signal);
      const followers=await fetchList(id,"followers",state.abort.signal);
      // A sudden large drop can be a silently incomplete Instagram reply.
      // Never turn that into hundreds of false "unfollowers".
      if(state.current?.followers?.length >= 100 && followers.length < state.current.followers.length * 0.75){
        throw Error("A lista atual retornou mais de 25% menos seguidores que a última análise. Por segurança, não salvamos nem marcamos perdas: confira a conta e tente novamente mais tarde.");
      }
      if(authId()!==id)throw Error("A conta do Instagram mudou durante a consulta. Nada foi salvo.");
      const previous=state.current;const current={following,followers,capturedAt:Date.now()};
      const result=LOGIC.compare(current,previous,state.history);
      await storagePut(storageKey(),{current,history:result.history});
      state.current=current;state.history=result.history;state.lastScan=current.capturedAt;state.view="no";
      setStatus(`Análise concluída! ${following.length.toLocaleString("pt-BR")} seguindo e ${followers.length.toLocaleString("pt-BR")} seguidores.`,"normal",100);
    }catch(err){setStatus(String(err?.message||err),"error");}
    finally{state.busy=false;state.abort=null;paint();}
  }
  async function doUnfollow(person,btn){
    if(state.busy)return;
    if(!state.userId || authId()!==state.userId){
      setStatus("Você mudou de conta do Instagram. Feche e reabra o painel antes de deixar de seguir alguém.","error");
      return;
    }
    if(!state.current?.following?.some(x=>x.id===person.id)){
      setStatus("Este perfil não consta mais na sua lista de seguidos. Atualize a análise.","warn");
      return;
    }
    if(!window.confirm(`Deixar de seguir @${person.username}?\n\nEsta ação modifica sua conta real do Instagram.`))return;
    btn.disabled=true;btn.textContent="Aguarde…";
    try{
      const token=cookie("csrftoken");
      if(!token)throw Error("Não foi encontrado o token de sessão do Instagram. Recarregue a página.");
      if(authId()!==state.userId)throw Error("A conta do Instagram mudou. A operação foi cancelada.");
      const res=await fetch(`https://www.instagram.com/web/friendships/${encodeURIComponent(person.id)}/unfollow/`,{method:"POST",credentials:"include",headers:{"content-type":"application/x-www-form-urlencoded","x-csrftoken":token,"x-ig-app-id":APP_ID,"x-requested-with":"XMLHttpRequest"},body:""});
      if(res.redirected || !res.ok)throw Error(`Instagram recusou o unfollow (${res.status}).`);
      if(!(res.headers.get("content-type")||"").includes("json"))throw Error("O Instagram não confirmou a ação com uma resposta JSON.");
      const response=await res.json();
      if(response?.status !== "ok")throw Error("O Instagram não confirmou o unfollow.");
      state.current.following=state.current.following.filter(x=>x.id!==person.id);
      await storagePut(storageKey(),{current:state.current,history:state.history});
      setStatus(`Você deixou de seguir @${person.username}.`,"normal");paint();
    }catch(err){setStatus(`Não foi possível deixar de seguir @${person.username}: ${err?.message||err}. Abra o perfil e faça manualmente se necessário.`,"error");btn.disabled=false;btn.textContent="Deixar de seguir";}
  }
  async function clearHistory(){
    if(state.busy)return;
    if(!state.userId || authId()!==state.userId){setStatus("Reabra o painel após trocar de conta.","error");return;}
    if(!window.confirm("Apagar todas as análises e histórico DESTA conta salvos neste navegador? Esta ação não pode ser desfeita."))return;
    await storageRemove(storageKey());
    state.current=null;state.history=[];state.lastScan=null;state.view="no";
    setStatus("Histórico local apagado. Uma nova análise criará uma nova referência.","normal");paint();
  }
  function el(tag,cls,text){const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node;}
  function paint(){if(!area)return;area.replaceChildren();
    const tools=el("div","tools");scanButton=el("button","primary",state.busy?"Analisando…":"↻ Analisar agora");scanButton.type="button";scanButton.disabled=state.busy||!state.userId;scanButton.addEventListener("click",scan);tools.append(scanButton);
    if(state.busy){const cancel=el("button","outline","Cancelar");cancel.addEventListener("click",()=>state.abort?.abort());tools.append(cancel);}
    if(state.current && !state.busy){
      const clear=el("button","outline","Apagar histórico");clear.type="button";
      clear.addEventListener("click",()=>clearHistory().catch(e=>setStatus(`Erro ao apagar histórico: ${e?.message||e}`,"error")));
      tools.append(clear);
    }
    area.append(tools);statusEl=el("div","status");area.append(statusEl);paintStatus();
    if(!state.current){area.append(el("div","empty","Nenhum dado de demonstração. Os perfis aparecerão aqui depois da primeira análise da SUA conta real."));return;}
    const c=LOGIC.compare(state.current,null,state.history);
    const stats=el("div","stats");for(const [count,label] of [[state.current.followers.length,"Seguidores"],[state.current.following.length,"Seguindo"],[c.notFollowingBack.length,"Não me seguem"]]){const box=el("div","stat");box.append(el("strong","",count.toLocaleString("pt-BR")),el("span","",label));stats.append(box);}area.append(stats);
    const tabs=el("div","tabs");for(const [key,label,count] of [["no","Não me seguem",c.notFollowingBack.length],["lost","Pararam de seguir",c.lostFollowers.length],["fans","Me seguem, não sigo",c.fans.length]]){const tab=el("button","tab",`${label} (${count})`);tab.setAttribute("aria-selected",String(state.view===key));tab.addEventListener("click",()=>{state.view=key;state.visible=150;paint();});tabs.append(tab);}area.append(tabs);
    const input=el("input","search");input.type="search";input.placeholder="Buscar @usuário ou nome…";input.value=state.search;input.addEventListener("input",()=>{state.search=input.value;state.visible=150;paintAccounts();});area.append(input);
    const list=el("div","accounts");list.id="accounts";area.append(list);paintAccounts();
    function paintAccounts(){list.replaceChildren();const all=state.view==="no"?c.notFollowingBack:state.view==="lost"?c.lostFollowers:c.fans;const filtered=all.filter(u=>(u.username+" "+u.fullName).toLocaleLowerCase("pt-BR").includes(state.search.toLocaleLowerCase("pt-BR")));
      list.append(el("div","muted",`${filtered.length.toLocaleString("pt-BR")} perfis · Clique em abrir ou deixar de seguir`));
      if(!filtered.length){list.append(el("div","empty",state.view==="lost"&&!state.history.length?"Para identificar quem realmente deixou de seguir, faça uma nova análise no futuro. A primeira é a referência.":"Nenhum perfil encontrado neste filtro."));return;}
      for(const u of filtered.slice(0,state.visible)){
        const card=el("div","account");card.append(el("div","avatar",u.username[0].toUpperCase()));
        const identity=el("div","identity");identity.append(el("div","username",`@${u.username}`),el("div","name",u.fullName||"Conta do Instagram"));card.append(identity);
        const buttons=el("div","actions");const profile=el("a","action","Abrir");profile.href=`https://www.instagram.com/${encodeURIComponent(u.username)}/`;profile.target="_blank";profile.rel="noopener noreferrer";buttons.append(profile);
        if(state.view!=="fans"){
          const unfollow=el("button","action danger","Deixar de seguir");unfollow.type="button";unfollow.disabled=state.busy;unfollow.addEventListener("click",()=>doUnfollow(u,unfollow));buttons.append(unfollow);
        }
        card.append(buttons);list.append(card);
      }
      if(filtered.length>state.visible){const more=el("button","outline load","Mostrar mais perfis");more.addEventListener("click",()=>{state.visible+=150;paintAccounts();});list.append(more);}
    }
  }
  const open=async()=>{
    if(state.open)return;state.open=true;backdrop=el("div","backdrop");const panel=el("section","panel");const top=el("div","top");
    const heading=el("div");heading.append(el("h1","","◎ Radar Seguidores"),el("p","subtitle","Dados da sua conta real · gratuito · sem anúncios"));
    const close=el("button","close","×");close.setAttribute("aria-label","Fechar");close.addEventListener("click",hide);top.append(heading,close);panel.append(top);
    area=el("div","area");panel.append(area);
    const footer=el("div","bottom");
    footer.append(el("span","","Dados salvos somente no navegador · Instagram não oficial · botão de unfollow com confirmação"));
    panel.append(footer);backdrop.append(panel);root.append(backdrop);
    backdrop.addEventListener("click",e=>{if(e.target===backdrop)hide();});
    try{await readStored();}catch(e){setStatus(`Falha ao ler histórico local: ${e?.message||e}`,"error");}

  };
  function hide(){state.open=false;backdrop?.remove();backdrop=null;area=null;statusEl=null;}
  launch.addEventListener("click",open);
})();
