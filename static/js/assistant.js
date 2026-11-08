(()=>{
 const root=document.getElementById('xpAssistant');if(!root)return;
 const panel=document.getElementById('xpChat'),launch=document.getElementById('xpChatLaunch'),close=document.getElementById('xpChatClose'),form=document.getElementById('xpChatForm'),input=document.getElementById('xpChatInput'),send=document.getElementById('xpChatSend'),messages=document.getElementById('xpChatMessages'),body=panel.querySelector('.xp-chat-body');
 const language=()=>document.documentElement.lang==='ar'?'ar':'en';
 function labels(){input.placeholder=language()==='ar'?'اكتب سؤالك...':'Ask a question...'}
 function open(){const nav=document.getElementById('nav');if(nav&&window.bootstrap?.Collapse){const collapse=bootstrap.Collapse.getOrCreateInstance(nav,{toggle:false});if(nav.classList.contains('show'))collapse.hide();else if(nav.classList.contains('collapsing'))nav.addEventListener('shown.bs.collapse',()=>{if(!panel.hidden)collapse.hide()},{once:true})}panel.hidden=false;launch.setAttribute('aria-expanded','true');input.focus()}
 function hide(){panel.hidden=true;launch.setAttribute('aria-expanded','false');launch.focus()}
 function addMessage(text,role){const node=document.createElement('div');node.className='xp-chat-message '+role;node.dir='auto';node.textContent=text;messages.append(node);body.scrollTop=body.scrollHeight;return node}
 function contact(lang){return lang==='ar'?'\n\nللتواصل مباشرةً مع الفريق: 01007718313 · Xpharma25@gmail.com':'\n\nTo contact the team directly: 01007718313 · Xpharma25@gmail.com'}
 launch.addEventListener('click',()=>panel.hidden?open():hide());close.addEventListener('click',hide);
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden){event.preventDefault();hide()}});
 document.getElementById('languageToggle').addEventListener('click',labels);
 root.querySelectorAll('[data-question-en]').forEach(button=>button.addEventListener('click',()=>{input.value=language()==='ar'?button.dataset.questionAr:button.dataset.questionEn;input.focus()}));
 form.addEventListener('submit',async event=>{
  event.preventDefault();const question=input.value.trim();if(!question||send.disabled)return;
  const lang=/\p{Script=Arabic}/u.test(question)?'ar':/[a-z]/i.test(question)?'en':language();addMessage(question,'user');input.value='';send.disabled=true;
  const waiting=addMessage(lang==='ar'?'جاري الرد...':'Thinking...','assistant');
  try{
   const response=await fetch('/api/assistant',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({csrf_token:form.elements.csrf_token.value,message:question,language:lang})});
   const result=await response.json();
   if(!response.ok){const errors={off_topic_locked:['The assistant is paused after three unrelated questions. Please try again in one minute.','تم إيقاف المساعد بعد ثلاثة أسئلة خارج النطاق. يرجى المحاولة مجدداً بعد دقيقة.'],not_configured:['The assistant is not ready yet. Please contact XPharma.','المساعد غير متاح حالياً. يرجى التواصل مع إكس فارما.'],rate_limited:['Too many messages. Please wait up to one minute and try again.','رسائل كثيرة. يرجى الانتظار لمدة تصل إلى دقيقة ثم المحاولة مجدداً.']};const wording=errors[result.error]||['Sorry, the assistant is unavailable right now.','عذراً، المساعد غير متاح حالياً.'];waiting.textContent=wording[lang==='ar'?1:0]+contact(lang)}
   else waiting.textContent=result.reply;
  }catch{waiting.textContent=(lang==='ar'?'تعذر الاتصال بالمساعد. حاول مجدداً.':'Could not reach the assistant. Please try again.')+contact(lang)}
  finally{send.disabled=false;body.scrollTop=body.scrollHeight}
 });
 labels();
})();
