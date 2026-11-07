const window = { nunjucksPrecompiled: {} };
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["about.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "about.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("styles"))(env, context, frame, runtime, function(t_9,t_8) {
if(t_9) { cb(t_9); return; }
output += t_8;
output += "\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 28;
var output = "";
try {
var frame = frame.push(true);
output += "About XPharma";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 72;
var output = "";
try {
var frame = frame.push(true);
output += "\r\n<section class=\"about-hero\"><div class=\"container\"><p class=\"section-kicker\">About XPharma</p><div class=\"row\"><div class=\"col-lg-8\"><h1 class=\"display-font display-4 fw-bold\">Care that supports your everyday routine.</h1><p class=\"lead text-secondary mt-4\">XPharma is a fast-growing Egyptian company in cosmetics, skincare, and dietary supplements, based in Alexandria.</p></div></div></div></section>\r\n<section class=\"py-5\"><div class=\"container\"><div class=\"row g-5 align-items-center\"><div class=\"col-lg-6\"><div class=\"about-art\"><i class=\"fa-solid fa-heart-pulse\"></i><span>Care begins with a thoughtful routine.</span></div></div><div class=\"col-lg-6\"><p class=\"section-kicker\">Our approach</p><h2 class=\"display-font\">Practical products, made with care.</h2><p class=\"text-secondary\">From targeted skincare to body-care products and dietary supplements, XPharma brings together everyday essentials in one focused collection.</p><p class=\"text-secondary\"><span data-ar=\"للاستفسار عن المنتجات أو الطلبات، تواصل مع الفريق. يمكن تأكيد توافر المنتجات وإرشادات الاستخدام مباشرة مع إكس فارما.\">For product enquiries or orders, contact the team. Product availability and use guidance can be confirmed directly with XPharma.</span></p><a href=\"";
output += runtime.suppressValue((lineno = 2, colno = 848, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["browse_products"])), env.opts.autoescape);
output += "\" class=\"btn btn-primary\">Browse products</a></div></div></div></section>\r\n<section class=\"values py-5\"><div class=\"container\"><p class=\"section-kicker text-center\">What guides us</p><div class=\"row mt-2 g-4\"><div class=\"col-md-4\"><div><i class=\"fa-solid fa-wand-magic-sparkles\"></i><h3>Clarity</h3><p>Simple language and an uncomplicated reservation journey.</p></div></div><div class=\"col-md-4\"><div><i class=\"fa-solid fa-hand-holding-heart\"></i><h3>Care</h3><p>Thoughtful reminders around safe medicine collection and use.</p></div></div><div class=\"col-md-4\"><div><i class=\"fa-solid fa-lock\"></i><h3>Respect</h3><p>A focused service that asks only for what it needs to process your reservation.</p></div></div></div></div></section>\r\n<section class=\"py-5\"><div class=\"container\"><div class=\"row g-5\"><div class=\"col-lg-5\"><p class=\"section-kicker\" data-ar=\"رؤيتنا\">Our vision</p><h2 class=\"display-font\" data-ar=\"عناية أفضل تبدأ بعلاقات أقوى.\">Better care starts with stronger relationships.</h2></div><div class=\"col-lg-7\"><p class=\"text-secondary\" data-ar=\"تطمح إكس فارما إلى التميز في مستحضرات التجميل الدوائية والعناية بالبشرة وحلول الجمال والمكملات الغذائية.\">XPharma aspires to be a distinguished provider of cosmeceuticals, skincare, beauty solutions and dietary supplements.</p><p class=\"text-secondary\" data-ar=\"نسعى لبناء علاقات بين الأطباء والصيادلة والمرضى تسهم في تقدم الرعاية الصحية في مجتمعنا، وتقديم مكونات وتقنيات مبتكرة تخدم عملاءنا في مصر وخارجها.\">Our vision is to build relationships among doctors, pharmacists and patients that contribute to healthcare in our community, while introducing innovative ingredients and technologies for customers in Egypt and beyond.</p><p class=\"text-secondary\"><span data-ar=\"تواصل مع الفريق:\">Contact the team:</span> <a href=\"tel:+201007718313\"><bdi>01007718313</bdi></a> · <a href=\"https://wa.me/201141119130\"><bdi>01141119130</bdi></a></p></div></div></div></section>\r\n<style>@media(max-width:767.98px){.about-hero~section .row.g-5{--bs-gutter-x:1.5rem}}</style>\r\n<section class=\"team-section py-5\" aria-labelledby=\"team-heading\"><div class=\"container\"><div class=\"team-intro text-center mx-auto\"><h2 id=\"team-heading\" class=\"display-font\" data-ar=\"تعرف على فريقنا\">Meet the team</h2><p class=\"section-kicker\" data-ar=\"لجنة الإدارة التنفيذية\">CEO committee</p></div><div class=\"row g-4 justify-content-center mt-2\">\r\n<div class=\"col-md-6 col-lg-4\"><article class=\"card team-card h-100 text-center\"><img class=\"team-photo\" src=\"";
output += runtime.suppressValue((lineno = 7, colno = 120, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["static","images/team/mohamed.jpeg"])), env.opts.autoescape);
output += "\" alt=\"Mohamed Araby\" data-ar-alt=\"محمد عربي\" loading=\"lazy\"><div class=\"team-copy\"><h3 class=\"h4\" data-ar=\"محمد عربي\">Mohamed Araby</h3><p class=\"text-secondary\" data-ar=\"خبرة إدارية ٢٦ عاماً، ووصل إلى منصب مدير أول للمناطق في جلاكسو سميث كلاين.\">26 years of managerial experience, reaching a senior territory manager at GlaxoSmithKline.</p><a class=\"team-link\" href=\"https://www.linkedin.com/in/mohamed-araby-35058557/\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Mohamed Araby on LinkedIn\" data-ar-aria-label=\"محمد عربي على لينكد إن\"><i class=\"fa-brands fa-linkedin-in\" aria-hidden=\"true\"></i><span>LinkedIn</span></a></div></article></div>\r\n<div class=\"col-md-6 col-lg-4\"><article class=\"card team-card h-100 text-center\"><img class=\"team-photo\" src=\"";
output += runtime.suppressValue((lineno = 8, colno = 120, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["static","images/team/yasser.jpeg"])), env.opts.autoescape);
output += "\" alt=\"Yasser Araby\" data-ar-alt=\"ياسر عربي\" loading=\"lazy\"><div class=\"team-copy\"><h3 class=\"h4\" data-ar=\"ياسر عربي\">Yasser Araby</h3><p class=\"text-secondary\" data-ar=\"استشاري وعضو هيئة تدريس في تركيبات الأسنان، حاصل على بكالوريوس طب الأسنان والماجستير والدكتوراه في علوم الأسنان.\">Consultant &amp; faculty member in prosthodontics, with a BDS, MSc and PhD in dental sciences.</p><a class=\"team-link\" href=\"https://www.linkedin.com/in/yasseraraby/\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Yasser Araby on LinkedIn\" data-ar-aria-label=\"ياسر عربي على لينكد إن\"><i class=\"fa-brands fa-linkedin-in\" aria-hidden=\"true\"></i><span>LinkedIn</span></a></div></article></div>\r\n<div class=\"col-md-6 col-lg-4\"><article class=\"card team-card h-100 text-center\"><img class=\"team-photo\" src=\"";
output += runtime.suppressValue((lineno = 9, colno = 120, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["static","images/team/morad.jpeg"])), env.opts.autoescape);
output += "\" alt=\"Morad Gaber\" data-ar-alt=\"مراد جابر\" loading=\"lazy\"><div class=\"team-copy\"><h3 class=\"h4\" data-ar=\"مراد جابر\">Morad Gaber</h3><p class=\"text-secondary\" data-ar=\"حاصل على ماجستير إدارة الأعمال في التسويق، وله خبرة في مبيعات الأدوية في مصر والخليج.\">Holds an MBA in marketing, with experience in pharmaceutical sales in Egypt and the Gulf.</p><a class=\"team-link\" href=\"https://www.linkedin.com/in/morad-gaber-07a41a37/\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Morad Gaber on LinkedIn\" data-ar-aria-label=\"مراد جابر على لينكد إن\"><i class=\"fa-brands fa-linkedin-in\" aria-hidden=\"true\"></i><span>LinkedIn</span></a></div></article></div>\r\n</div></div></section>\r\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_styles(env, context, frame, runtime, cb) {
var lineno = 11;
var colno = 17;
var output = "";
try {
var frame = frame.push(true);
output += "<style>.about-hero{padding:6rem 0;background:#eaf7f2}.about-art{min-height:300px;background:linear-gradient(135deg,var(--teal),#0c5861);border-radius:24px;color:white;display:flex;flex-direction:column;justify-content:center;padding:3rem}.about-art i{font-size:4rem;color:#ffd4c8;margin-bottom:1rem}.about-art span{font-family:'Playfair Display',serif;font-size:2rem;max-width:300px}.values{background:#fff}.values i{font-size:1.5rem;color:var(--coral);margin-bottom:1rem}.values h3{font-size:1.15rem;font-weight:700}.values p{color:var(--muted);margin:0}.team-section{background:var(--surface-soft)}.team-intro{max-width:36rem}.team-card{align-items:center;padding:2rem 1.5rem;background:var(--surface)}.team-photo{width:160px;height:160px;object-fit:cover;object-position:center 24%;border-radius:50%;border:5px solid var(--surface);box-shadow:0 0 0 2px #a5d8d0,0 12px 30px rgba(16,42,67,.12)}.team-copy{margin-top:1.5rem}.team-role{color:var(--teal);font-size:.8rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase}.team-link{display:inline-flex;align-items:center;gap:.5rem;color:var(--teal);text-decoration:none;font-weight:700}.team-link i{display:grid;place-items:center;width:2rem;height:2rem;background:var(--teal);color:white;border-radius:.5rem}.team-link:hover{text-decoration:underline}body.dark .team-role,body.dark .team-link{color:#80d8cd}body.dark .team-link i{background:#80d8cd;color:#0b1720}</style>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
b_styles: b_styles,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["admin/account.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "﻿";
env.getTemplate("base.html", true, "admin/account.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "Admin account | XPharma";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"container py-5\"><div class=\"row justify-content-center\"><div class=\"col-lg-7\"><a href=\"/admin/dashboard\" data-ar=\"العودة إلى لوحة الإدارة\">← Back to dashboard</a><h1 class=\"display-font h2 my-4\" data-ar=\"تغيير كلمة مرور الإدارة\">Change admin password</h1><form method=\"post\" class=\"card card-body p-4\"><input type=\"hidden\" name=\"csrf_token\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "csrf_token"), env.opts.autoescape);
output += "\"><div class=\"mb-3\"><label class=\"form-label\" for=\"current_password\" data-ar=\"كلمة المرور الحالية\">Current password</label><input id=\"current_password\" name=\"current_password\" type=\"password\" class=\"form-control\" autocomplete=\"current-password\" required></div><div class=\"mb-3\"><label class=\"form-label\" for=\"new_password\" data-ar=\"كلمة المرور الجديدة\">New password</label><input id=\"new_password\" name=\"new_password\" type=\"password\" class=\"form-control\" autocomplete=\"new-password\" minlength=\"12\" required><small class=\"text-secondary\" data-ar=\"١٢ حرفاً على الأقل، مع حروف كبيرة وصغيرة ورقم ورمز.\">At least 12 characters, including uppercase and lowercase letters, a number and a symbol.</small></div><div class=\"mb-3\"><label class=\"form-label\" for=\"confirm_password\" data-ar=\"تأكيد كلمة المرور الجديدة\">Confirm new password</label><input id=\"confirm_password\" name=\"confirm_password\" type=\"password\" class=\"form-control\" autocomplete=\"new-password\" minlength=\"12\" required></div><p class=\"small text-secondary\" data-ar=\"سيتم تسجيل خروج جميع جلسات الإدارة بعد تغيير كلمة المرور.\">All admin sessions will be signed out after the password is changed.</p><button class=\"btn btn-primary\" data-ar=\"تغيير كلمة المرور\">Change password</button></form></div></div></div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["admin/add_product.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "﻿";
env.getTemplate("base.html", true, "admin/add_product.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "Add product | XPharma";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"container py-5\"><div class=\"row justify-content-center\"><div class=\"col-lg-7\"><a href=\"/admin/products\" data-ar=\"العودة إلى المنتجات\">← Back to products</a><h1 class=\"display-font h2 my-4\" data-ar=\"إضافة منتج\">Add product</h1><form method=\"post\" enctype=\"multipart/form-data\" class=\"card card-body p-4\"><input type=\"hidden\" name=\"csrf_token\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "csrf_token"), env.opts.autoescape);
output += "\"><div class=\"mb-3\"><label class=\"form-label\" for=\"product_id\" data-ar=\"مرجع المنتج\">Product reference</label><input id=\"product_id\" name=\"product_id\" class=\"form-control\" maxlength=\"50\" pattern=\"[A-Za-z0-9_-]+\" required></div><div class=\"mb-3\"><label class=\"form-label\" for=\"product_name\" data-ar=\"اسم المنتج بالإنجليزية\">Product name in English</label><input id=\"product_name\" name=\"product_name\" class=\"form-control\" maxlength=\"200\" required></div><div class=\"mb-3\"><label class=\"form-label\" for=\"product_name_ar\" data-ar=\"اسم المنتج بالعربية\">Product name in Arabic</label><input id=\"product_name_ar\" name=\"product_name_ar\" class=\"form-control\" maxlength=\"200\" dir=\"auto\"></div><div class=\"row g-3 mb-4\"><div class=\"col-md-6\"><label class=\"form-label\" for=\"pack_size\" data-ar=\"حجم العبوة\">Pack size</label><input id=\"pack_size\" name=\"pack_size\" type=\"number\" min=\"1\" max=\"100000\" class=\"form-control\" required></div><div class=\"col-md-6\"><label class=\"form-label\" for=\"unit_price\" data-ar=\"السعر بالجنيه\">Price in EGP</label><input id=\"unit_price\" name=\"unit_price\" type=\"number\" min=\"0\" max=\"1000000\" step=\"0.01\" class=\"form-control\" required></div></div>";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("admin/_product_content_fields.html", false, "admin/add_product.html", false, function(t_9,t_8) {
if(t_9) { cb(t_9); return; }
callback(null,t_8);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_11,t_10) {
if(t_11) { cb(t_11); return; }
callback(null,t_10);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "<button class=\"btn btn-primary\" data-ar=\"إضافة منتج\">Add product</button></form></div></div></div>\n";
cb(null, output);
});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["admin/customers.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "﻿";
env.getTemplate("base.html", true, "admin/customers.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "Customers | XPharma";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"container py-5\"><a href=\"/admin/dashboard\" data-ar=\"العودة إلى لوحة الإدارة\">← Back to dashboard</a><h1 class=\"display-font h2 my-3\" data-ar=\"العملاء\">Customers</h1><p class=\"text-secondary\" data-ar=\"ابحث عن العملاء وبيانات التواصل والطلبات.\">Find customer contact details and their orders.</p><form method=\"get\" class=\"card card-body mb-4\"><div class=\"row g-3 align-items-end\"><div class=\"col-md-6\"><label class=\"form-label\" for=\"q\" data-ar=\"بحث\">Search</label><input id=\"q\" name=\"q\" class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"term"), env.opts.autoescape);
output += "\" placeholder=\"Name, email, phone or city\"></div><div class=\"col-md-3\"><label class=\"form-label\" for=\"verified\" data-ar=\"حالة الحساب\">Account status</label><select id=\"verified\" name=\"verified\" class=\"form-select\"><option value=\"\" data-ar=\"كل الحسابات\">All accounts</option><option value=\"yes\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"state") == "yes") {
output += "selected";
;
}
output += " data-ar=\"تم التحقق\">Verified</option><option value=\"no\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"state") == "no") {
output += "selected";
;
}
output += " data-ar=\"غير موثق\">Unverified</option></select></div><div class=\"col-6 col-md-3\"><button class=\"btn btn-primary w-100\" data-ar=\"بحث\">Search</button></div></div></form><p class=\"text-secondary\"><bdi>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "total"), env.opts.autoescape);
output += "</bdi> <span data-ar=\"عميل\">customers</span></p>\n";
if(runtime.contextOrFrameLookup(context, frame, "customers")) {
output += "<div class=\"row g-3\">";
frame = frame.push();
var t_10 = runtime.contextOrFrameLookup(context, frame, "customers");
if(t_10) {t_10 = runtime.fromIterator(t_10);
var t_9 = t_10.length;
for(var t_8=0; t_8 < t_10.length; t_8++) {
var t_11 = t_10[t_8];
frame.set("customer", t_11);
frame.set("loop.index", t_8 + 1);
frame.set("loop.index0", t_8);
frame.set("loop.revindex", t_9 - t_8);
frame.set("loop.revindex0", t_9 - t_8 - 1);
frame.set("loop.first", t_8 === 0);
frame.set("loop.last", t_8 === t_9 - 1);
frame.set("loop.length", t_9);
output += "<div class=\"col-lg-6\"><article class=\"card h-100\"><div class=\"card-body\"><div class=\"d-flex justify-content-between gap-2\"><h2 class=\"h5\">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"fname"), env.opts.autoescape);
output += " ";
output += runtime.suppressValue(runtime.memberLookup((t_11),"lname"), env.opts.autoescape);
output += "</h2><span data-ar=\"";
output += runtime.suppressValue((runtime.memberLookup((t_11),"is_verified")?"تم التحقق":"غير موثق"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue((runtime.memberLookup((t_11),"is_verified")?"Verified":"Unverified"), env.opts.autoescape);
output += "</span></div><p class=\"mb-1\"><a href=\"mailto:";
output += runtime.suppressValue(runtime.memberLookup((t_11),"email"), env.opts.autoescape);
output += "\"><bdi>";
output += runtime.suppressValue(runtime.memberLookup((t_11),"email"), env.opts.autoescape);
output += "</bdi></a></p><p class=\"mb-1\"><a href=\"tel:";
output += runtime.suppressValue(runtime.memberLookup((t_11),"phone"), env.opts.autoescape);
output += "\"><bdi>";
output += runtime.suppressValue(runtime.memberLookup((t_11),"phone"), env.opts.autoescape);
output += "</bdi></a></p><p class=\"text-secondary small mb-2\"><bdi>";
output += runtime.suppressValue(runtime.memberLookup((t_11),"city") || "—", env.opts.autoescape);
output += "</bdi> · <bdi>";
output += runtime.suppressValue(runtime.memberLookup((t_11),"address") || "—", env.opts.autoescape);
output += "</bdi></p><p class=\"mb-0\"><bdi>";
output += runtime.suppressValue(runtime.memberLookup((t_11),"order_count"), env.opts.autoescape);
output += "</bdi> <span data-ar=\"طلب\">orders</span> · <a href=\"/admin/reports?q=";
output += runtime.suppressValue(env.getFilter("urlencode").call(context, runtime.memberLookup((t_11),"email")), env.opts.autoescape);
output += "\" data-ar=\"عرض الطلبات\">View orders</a></p></div></article></div>";
;
}
}
frame = frame.pop();
output += "</div>";
;
}
else {
output += "<div class=\"card card-body text-secondary\" data-ar=\"لا يوجد عملاء مطابقون.\">No customers match these filters.</div>";
;
}
output += "<nav class=\"d-flex gap-2 mt-4\">";
if(runtime.contextOrFrameLookup(context, frame, "previous_page")) {
output += "<a class=\"btn btn-outline-primary\" href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "previous_page"), env.opts.autoescape);
output += "\" data-ar=\"السابق\">Previous</a>";
;
}
output += "<span class=\"align-self-center\"><span data-ar=\"صفحة\">Page</span> <bdi>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "current_page"), env.opts.autoescape);
output += "</bdi></span>";
if(runtime.contextOrFrameLookup(context, frame, "next_page")) {
output += "<a class=\"btn btn-outline-primary\" href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "next_page"), env.opts.autoescape);
output += "\" data-ar=\"التالي\">Next</a>";
;
}
output += "</nav></div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["admin/dashboard.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "﻿";
env.getTemplate("base.html", true, "admin/dashboard.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "Admin dashboard | XPharma";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"container py-5\">\n  <p class=\"section-kicker\" data-ar=\"لوحة الإدارة\">Administration</p>";
if(runtime.contextOrFrameLookup(context, frame, "account_name")) {
output += "<p class=\"fw-semibold\"><bdi dir=\"auto\" data-account-name>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "account_name"), env.opts.autoescape);
output += "</bdi></p>";
;
}
output += "\n  <h1 class=\"display-font h2 mb-2\" data-ar=\"لوحة إدارة إكس فارما\">XPharma Admin Dashboard</h1>\n  <p class=\"text-secondary mb-4\" data-ar=\"تابع الطلبات والمدفوعات والمنتجات من مكان واحد.\">Keep track of orders, payments and products in one place.</p>\n  <div class=\"row g-3 mb-4\">\n    <div class=\"col-6 col-lg\"><a href=\"/admin/reports?payment=pending_verification\" class=\"card h-100 text-decoration-none\"><div class=\"card-body\"><p class=\"text-secondary\" data-ar=\"مدفوعات بانتظار التحقق\">Payments to review</p><p class=\"h2 mb-0\"><bdi>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"pending_payments") || 0, env.opts.autoescape);
output += "</bdi></p></div></a></div>\n    <div class=\"col-6 col-lg\"><a href=\"/admin/reports?status=active\" class=\"card h-100 text-decoration-none\"><div class=\"card-body\"><p class=\"text-secondary\" data-ar=\"الطلبات النشطة\">Active orders</p><p class=\"h2 mb-0\"><bdi>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"active_reservations") || 0, env.opts.autoescape);
output += "</bdi></p></div></a></div>\n    <div class=\"col-6 col-lg\"><div class=\"card h-100\"><div class=\"card-body\"><p class=\"text-secondary\" data-ar=\"الاستلام اليوم\">Due today</p><p class=\"h2 mb-0\"><bdi>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"due_today") || 0, env.opts.autoescape);
output += "</bdi></p></div></div></div>\n    <div class=\"col-6 col-lg\"><a href=\"/admin/products\" class=\"card h-100 text-decoration-none\"><div class=\"card-body\"><p class=\"text-secondary\" data-ar=\"المنتجات النشطة\">Active products</p><p class=\"h2 mb-0\"><bdi>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "stats")),"active_products") || 0, env.opts.autoescape);
output += "</bdi></p></div></a></div>\n  </div>\n  <div class=\"d-flex flex-wrap gap-2 mb-5\"><a href=\"/admin/reports\" class=\"btn btn-primary\" data-ar=\"إدارة الطلبات\">Manage orders</a><a href=\"/admin/products\" class=\"btn btn-outline-primary\" data-ar=\"إدارة المنتجات\">Manage products</a><a href=\"/admin/products/add\" class=\"btn btn-outline-primary\" data-ar=\"إضافة منتج\">Add product</a><a href=\"/admin/customers\" class=\"btn btn-outline-primary\" data-ar=\"العملاء\">Customers</a><a href=\"/admin/account\" class=\"btn btn-outline-primary\" data-ar=\"كلمة مرور الإدارة\">Admin password</a></div>\n  <div class=\"d-flex justify-content-between align-items-center gap-2 mb-3\"><h2 class=\"h4 mb-0\" data-ar=\"أحدث الطلبات\">Recent orders</h2><a href=\"/admin/reports\" data-ar=\"عرض كل الطلبات\">View all orders</a></div>\n  ";
if(runtime.contextOrFrameLookup(context, frame, "recent")) {
output += "<div class=\"row g-3\">";
frame = frame.push();
var t_10 = runtime.contextOrFrameLookup(context, frame, "recent");
if(t_10) {t_10 = runtime.fromIterator(t_10);
var t_9 = t_10.length;
for(var t_8=0; t_8 < t_10.length; t_8++) {
var t_11 = t_10[t_8];
frame.set("order", t_11);
frame.set("loop.index", t_8 + 1);
frame.set("loop.index0", t_8);
frame.set("loop.revindex", t_9 - t_8);
frame.set("loop.revindex0", t_9 - t_8 - 1);
frame.set("loop.first", t_8 === 0);
frame.set("loop.last", t_8 === t_9 - 1);
frame.set("loop.length", t_9);
output += "<div class=\"col-md-6 col-xl-4\"><a href=\"/admin/orders/";
output += runtime.suppressValue(runtime.memberLookup((t_11),"reservation_id"), env.opts.autoescape);
output += "\" class=\"card h-100 text-decoration-none\"><div class=\"card-body\"><div class=\"d-flex justify-content-between gap-2\"><strong><span data-ar=\"طلب\">Order</span> #<bdi>";
output += runtime.suppressValue(runtime.memberLookup((t_11),"reservation_id"), env.opts.autoescape);
output += "</bdi></strong>";
var t_12;
t_12 = t_11;
frame.set("reservation", t_12, true);
if(frame.topLevel) {
context.setVariable("reservation", t_12);
}
if(frame.topLevel) {
context.addExport("reservation", t_12);
}
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("customer/_order_status.html", false, "admin/dashboard.html", false, function(t_14,t_13) {
if(t_14) { cb(t_14); return; }
callback(null,t_13);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_16,t_15) {
if(t_16) { cb(t_16); return; }
callback(null,t_15);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "</div><p class=\"mb-1 mt-3\"><span data-ar=\"";
output += runtime.suppressValue(runtime.memberLookup((t_11),"product_name_ar") || runtime.memberLookup((t_11),"product_name"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"product_name"), env.opts.autoescape);
output += "</span></p><p class=\"small text-secondary mb-1\">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"fname"), env.opts.autoescape);
output += " ";
output += runtime.suppressValue(runtime.memberLookup((t_11),"lname"), env.opts.autoescape);
output += "</p><small data-ar=\"";
output += runtime.suppressValue(runtime.memberLookup(((lineno = 15, colno = 645, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.contextOrFrameLookup(context, frame, "payment_labels"),runtime.memberLookup((t_11),"payment_status"),[runtime.memberLookup((t_11),"payment_status"),runtime.memberLookup((t_11),"payment_status")]]))),1), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup(((lineno = 15, colno = 745, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.contextOrFrameLookup(context, frame, "payment_labels"),runtime.memberLookup((t_11),"payment_status"),[runtime.memberLookup((t_11),"payment_status"),runtime.memberLookup((t_11),"payment_status")]]))),0), env.opts.autoescape);
output += "</small></div></a></div>";
});
}
}
frame = frame.pop();
output += "</div>";
;
}
else {
output += "<div class=\"card card-body text-secondary\" data-ar=\"لا توجد طلبات حتى الآن.\">No orders yet.</div>";
;
}
output += "\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["admin/login.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "admin/login.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\r\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\r\n<div class=\"container\">\r\n    <div class=\"row justify-content-center\">\r\n        <div class=\"col-md-6\">\r\n            <div class=\"card shadow\">\r\n                <div class=\"card-body\">\r\n                    <h2 class=\"card-title text-center mb-4\">Admin Login</h2>\r\n                    ";
var t_6;
t_6 = (lineno = 8, colno = 58, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "get_flashed_messages"), "get_flashed_messages", context, []));
frame.set("messages", t_6, true);
if(frame.topLevel) {
context.setVariable("messages", t_6);
}
if(frame.topLevel) {
context.addExport("messages", t_6);
}
output += "\r\n                        ";
if(runtime.contextOrFrameLookup(context, frame, "messages")) {
output += "\r\n                            ";
frame = frame.push();
var t_9 = runtime.contextOrFrameLookup(context, frame, "messages");
if(t_9) {t_9 = runtime.fromIterator(t_9);
var t_8 = t_9.length;
for(var t_7=0; t_7 < t_9.length; t_7++) {
var t_10 = t_9[t_7];
frame.set("__pair", t_10);
frame.set("loop.index", t_7 + 1);
frame.set("loop.index0", t_7);
frame.set("loop.revindex", t_8 - t_7);
frame.set("loop.revindex0", t_8 - t_7 - 1);
frame.set("loop.first", t_7 === 0);
frame.set("loop.last", t_7 === t_8 - 1);
frame.set("loop.length", t_8);
var t_11;
t_11 = runtime.memberLookup((t_10),0);
frame.set("category", t_11, true);
if(frame.topLevel) {
context.setVariable("category", t_11);
}
if(frame.topLevel) {
context.addExport("category", t_11);
}
var t_12;
t_12 = runtime.memberLookup((t_10),1);
frame.set("message", t_12, true);
if(frame.topLevel) {
context.setVariable("message", t_12);
}
if(frame.topLevel) {
context.addExport("message", t_12);
}
output += "\r\n                                <div class=\"alert alert-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "category"), env.opts.autoescape);
output += " alert-dismissible fade show\" role=\"alert\">\r\n                                    ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "message"), env.opts.autoescape);
output += "\r\n                                    <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button>\r\n                                </div>\r\n                            ";
;
}
}
frame = frame.pop();
output += "\r\n                        ";
;
}
output += "\r\n                    \r\n                    <form method=\"POST\">\r\n                        <input type=\"hidden\" name=\"csrf_token\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "csrf_token"), env.opts.autoescape);
output += "\">\r\n                        <div class=\"form-group mb-3\">\r\n                            <label for=\"email\">Email</label>\r\n                            <input type=\"email\" id=\"email\" name=\"email\" class=\"form-control\" required>\r\n                        </div>\r\n                        <div class=\"form-group mb-3\">\r\n                            <label for=\"password\">Password</label>\r\n                            <input type=\"password\" id=\"password\" name=\"password\" class=\"form-control\" required>\r\n                        </div>\r\n                        <div class=\"d-grid\">\r\n                            <button type=\"submit\" class=\"btn btn-primary\">Login</button>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["admin/order_detail.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "﻿";
env.getTemplate("base.html", true, "admin/order_detail.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "Manage order | XPharma";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"container py-5\">\n <a href=\"/admin/reports\" class=\"text-decoration-none\" data-ar=\"العودة إلى الطلبات\">← Back to orders</a>\n <div class=\"d-flex flex-wrap justify-content-between gap-3 align-items-center my-3\"><div><p class=\"section-kicker mb-1\" data-ar=\"تفاصيل الطلب\">Order details</p><h1 class=\"display-font h2 mb-0\"><span data-ar=\"طلب\">Order</span> #<bdi>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"reservation_id"), env.opts.autoescape);
output += "</bdi></h1></div>";
var t_8;
t_8 = runtime.contextOrFrameLookup(context, frame, "order");
frame.set("reservation", t_8, true);
if(frame.topLevel) {
context.setVariable("reservation", t_8);
}
if(frame.topLevel) {
context.addExport("reservation", t_8);
}
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("customer/_order_status.html", false, "admin/order_detail.html", false, function(t_10,t_9) {
if(t_10) { cb(t_10); return; }
callback(null,t_9);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_12,t_11) {
if(t_12) { cb(t_12); return; }
callback(null,t_11);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "</div>\n <div class=\"row g-4\"><div class=\"col-lg-7\">\n  <section class=\"card mb-4\"><div class=\"card-body p-4\"><h2 class=\"h5\" data-ar=\"المنتج والاستلام\">Product and collection</h2><p class=\"mb-1\"><strong><span data-ar=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"product_name_ar") || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"product_name"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"product_name"), env.opts.autoescape);
output += "</span></strong> · <bdi>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"pack_size"), env.opts.autoescape);
output += "</bdi> <span data-ar=\"جم\">g</span></p><p class=\"text-secondary small mb-3\"><bdi>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"product_id"), env.opts.autoescape);
output += "</bdi></p><div class=\"row g-3\"><div class=\"col-6\"><span class=\"text-secondary d-block\" data-ar=\"الكمية\">Quantity</span><strong><bdi>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"quantity"), env.opts.autoescape);
output += "</bdi></strong></div><div class=\"col-6\"><span class=\"text-secondary d-block\" data-ar=\"تاريخ الاستلام\">Collection date</span><strong><bdi>";
output += runtime.suppressValue(env.getFilter("date_display").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"pickup_date")), env.opts.autoescape);
output += "</bdi></strong></div>";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"discount_percent")) {
output += "<div class=\"col-6\"><span class=\"text-secondary d-block\" data-ar=\"الخصم\">Discount</span><strong><bdi>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"discount_percent"), env.opts.autoescape);
output += "</bdi>%";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"discount_code")) {
output += " · <small><bdi dir=\"ltr\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"discount_code"), env.opts.autoescape);
output += "</bdi></small>";
;
}
output += "</strong></div><div class=\"col-6\"><span class=\"text-secondary d-block\" data-ar=\"قبل الخصم\">Before discount</span><strong><span data-ar=\"ج.م\">EGP</span> <bdi>";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.2f",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"subtotal")), env.opts.autoescape);
output += "</bdi></strong></div>";
;
}
output += "<div class=\"col-6\"><span class=\"text-secondary d-block\" data-ar=\"الإجمالي\">Total</span><strong><span data-ar=\"ج.م\">EGP</span> <bdi>";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.2f",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"price")), env.opts.autoescape);
output += "</bdi></strong></div><div class=\"col-6\"><span class=\"text-secondary d-block\" data-ar=\"تاريخ الطلب\">Placed on</span><strong><bdi>";
output += runtime.suppressValue(env.getFilter("date_display").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"reservation_date")), env.opts.autoescape);
output += "</bdi></strong></div></div></div></section>\n  <section class=\"card mb-4\"><div class=\"card-body p-4\"><h2 class=\"h5\" data-ar=\"بيانات العميل\">Customer details</h2><p class=\"mb-2\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"fname"), env.opts.autoescape);
output += " ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"lname"), env.opts.autoescape);
output += "</p><p class=\"mb-2\"><a href=\"mailto:";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"email"), env.opts.autoescape);
output += "\"><bdi>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"email"), env.opts.autoescape);
output += "</bdi></a></p><p class=\"mb-2\"><a href=\"tel:";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"phone"), env.opts.autoescape);
output += "\"><bdi>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"phone"), env.opts.autoescape);
output += "</bdi></a></p><p class=\"mb-0\"><bdi>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"city") || "—", env.opts.autoescape);
output += "</bdi> · <bdi>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"address") || "—", env.opts.autoescape);
output += "</bdi></p></div></section>\n  <section class=\"card\"><div class=\"card-body p-4\"><h2 class=\"h5\" data-ar=\"سجل الإجراءات\">Activity history</h2>";
if(runtime.contextOrFrameLookup(context, frame, "activity")) {
output += "<ul class=\"list-unstyled mb-0\">";
frame = frame.push();
var t_15 = runtime.contextOrFrameLookup(context, frame, "activity");
if(t_15) {t_15 = runtime.fromIterator(t_15);
var t_14 = t_15.length;
for(var t_13=0; t_13 < t_15.length; t_13++) {
var t_16 = t_15[t_13];
frame.set("entry", t_16);
frame.set("loop.index", t_13 + 1);
frame.set("loop.index0", t_13);
frame.set("loop.revindex", t_14 - t_13);
frame.set("loop.revindex0", t_14 - t_13 - 1);
frame.set("loop.first", t_13 === 0);
frame.set("loop.last", t_13 === t_14 - 1);
frame.set("loop.length", t_14);
output += "<li class=\"border-top py-3\"><strong data-ar=\"";
output += runtime.suppressValue((runtime.memberLookup((t_16),"action") == "payment_review"?"مراجعة الدفع":"تحديث الطلب"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue((runtime.memberLookup((t_16),"action") == "payment_review"?"Payment review":"Order update"), env.opts.autoescape);
output += "</strong> · <span data-ar=\"";
output += runtime.suppressValue(runtime.memberLookup(((lineno = 9, colno = 418, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.contextOrFrameLookup(context, frame, "payment_labels"),runtime.memberLookup((t_16),"new_value"),(lineno = 9, colno = 456, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.contextOrFrameLookup(context, frame, "order_labels"),runtime.memberLookup((t_16),"new_value"),[runtime.memberLookup((t_16),"new_value"),runtime.memberLookup((t_16),"new_value")]]))]))),1), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup(((lineno = 9, colno = 538, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.contextOrFrameLookup(context, frame, "payment_labels"),runtime.memberLookup((t_16),"new_value"),(lineno = 9, colno = 576, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.contextOrFrameLookup(context, frame, "order_labels"),runtime.memberLookup((t_16),"new_value"),[runtime.memberLookup((t_16),"new_value"),runtime.memberLookup((t_16),"new_value")]]))]))),0), env.opts.autoescape);
output += "</span><br><small class=\"text-secondary\"><bdi>";
output += runtime.suppressValue(runtime.memberLookup((t_16),"created_at"), env.opts.autoescape);
output += "</bdi> · ";
output += runtime.suppressValue(runtime.memberLookup((t_16),"fname"), env.opts.autoescape);
output += " ";
output += runtime.suppressValue(runtime.memberLookup((t_16),"lname"), env.opts.autoescape);
output += "</small>";
if(runtime.memberLookup((t_16),"note")) {
output += "<p class=\"small mb-0 mt-1\">";
output += runtime.suppressValue(runtime.memberLookup((t_16),"note"), env.opts.autoescape);
output += "</p>";
;
}
output += "</li>";
;
}
}
frame = frame.pop();
output += "</ul>";
;
}
else {
output += "<p class=\"text-secondary mb-0\" data-ar=\"لا توجد إجراءات مسجلة بعد.\">No admin actions recorded yet.</p>";
;
}
output += "</div></section>\n </div><div class=\"col-lg-5\">\n  <section class=\"card mb-4\"><div class=\"card-body p-4\"><h2 class=\"h5\" data-ar=\"الدفع\">Payment</h2><p><span data-ar=\"الطريقة\">Method</span>: <strong>";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"payment_method") == "instapay") {
output += "InstaPay";
;
}
else {
output += "<span data-ar=\"نقداً\">Cash</span>";
;
}
output += "</strong><br><span data-ar=\"الحالة\">Status</span>: <strong data-ar=\"";
output += runtime.suppressValue(runtime.memberLookup(((lineno = 11, colno = 329, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.contextOrFrameLookup(context, frame, "payment_labels"),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"payment_status"),[runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"payment_status"),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"payment_status")]]))),1), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup(((lineno = 11, colno = 427, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.contextOrFrameLookup(context, frame, "payment_labels"),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"payment_status"),[runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"payment_status"),runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"payment_status")]]))),0), env.opts.autoescape);
output += "</strong></p>\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"payment_method") == "instapay") {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"payment_proof")) {
output += "<a href=\"/admin/reservations/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"reservation_id"), env.opts.autoescape);
output += "/payment-proof\" class=\"btn btn-outline-primary btn-sm mb-3\" data-ar=\"تنزيل صورة الدفع\">Download proof</a>";
;
}
if(runtime.contextOrFrameLookup(context, frame, "previous_proofs")) {
output += "<details class=\"mb-3\"><summary data-ar=\"صور الدفع السابقة\">Previous payment proofs</summary><ul class=\"mb-0 mt-2\">";
frame = frame.push();
var t_19 = runtime.contextOrFrameLookup(context, frame, "previous_proofs");
if(t_19) {t_19 = runtime.fromIterator(t_19);
var t_18 = t_19.length;
for(var t_17=0; t_17 < t_19.length; t_17++) {
var t_20 = t_19[t_17];
frame.set("proof", t_20);
frame.set("loop.index", t_17 + 1);
frame.set("loop.index0", t_17);
frame.set("loop.revindex", t_18 - t_17);
frame.set("loop.revindex0", t_18 - t_17 - 1);
frame.set("loop.first", t_17 === 0);
frame.set("loop.last", t_17 === t_18 - 1);
frame.set("loop.length", t_18);
output += "<li><a href=\"/admin/reservations/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"reservation_id"), env.opts.autoescape);
output += "/previous-proof/";
output += runtime.suppressValue(runtime.memberLookup((t_20),"proof_id"), env.opts.autoescape);
output += "\"><span data-ar=\"تنزيل الصورة السابقة\">Download previous proof</span> · <bdi>";
output += runtime.suppressValue(runtime.memberLookup((t_20),"replaced_at"), env.opts.autoescape);
output += "</bdi></a></li>";
;
}
}
frame = frame.pop();
output += "</ul></details>";
;
}
output += "<p class=\"small text-secondary\" data-ar=\"تحقق من وصول المبلغ الصحيح إلى حسابك في إنستاباي أو البنك. الصورة وحدها لا تؤكد الدفع.\">Check that the correct amount arrived in your InstaPay or bank account. A screenshot alone does not confirm payment.</p>\n   ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"status") == "active" && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"payment_status") == "pending_verification" && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"payment_proof")) {
output += "<form method=\"post\" action=\"/admin/orders/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"reservation_id"), env.opts.autoescape);
output += "/payment\"><input type=\"hidden\" name=\"csrf_token\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "csrf_token"), env.opts.autoescape);
output += "\"><label class=\"form-label\" for=\"payment-note\" data-ar=\"ملاحظة داخلية اختيارية\">Optional internal note</label><textarea id=\"payment-note\" name=\"note\" maxlength=\"500\" rows=\"2\" class=\"form-control mb-3\"></textarea><div class=\"d-flex flex-wrap gap-2\"><button name=\"action\" value=\"verify\" onclick=\"return confirm(document.documentElement.lang==='ar'?this.dataset.confirmAr:this.dataset.confirmEn)\" data-confirm-en=\"Have you confirmed the correct amount arrived in your InstaPay or bank account?\" data-confirm-ar=\"هل تحققت من وصول المبلغ الصحيح إلى حسابك؟\" class=\"btn btn-primary\" data-ar=\"تأكيد استلام الدفع\">Mark payment verified</button><button name=\"action\" value=\"reject\" onclick=\"return confirm(document.documentElement.lang==='ar'?this.dataset.confirmAr:this.dataset.confirmEn)\" data-confirm-en=\"Reject this payment proof? The customer can upload another screenshot.\" data-confirm-ar=\"هل تريد رفض إثبات الدفع؟\" class=\"btn btn-outline-danger\" data-ar=\"رفض إثبات الدفع\">Reject proof</button></div></form>";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"status") == "active" && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"payment_status") == "rejected") {
output += "<form method=\"post\" action=\"/admin/orders/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"reservation_id"), env.opts.autoescape);
output += "/payment\"><input type=\"hidden\" name=\"csrf_token\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "csrf_token"), env.opts.autoescape);
output += "\"><button name=\"action\" value=\"reopen\" class=\"btn btn-outline-primary\" data-ar=\"إعادة للمراجعة\">Return to review</button></form>";
;
}
;
}
output += "\n  ";
;
}
else {
output += "<p class=\"small text-secondary mb-0\" data-ar=\"أكد استلام النقد عند إتمام الطلب.\">Confirm cash was received when completing the order.</p>";
;
}
output += "</div></section>\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"status") == "active") {
output += "<section class=\"card\"><div class=\"card-body p-4\"><h2 class=\"h5\" data-ar=\"إدارة الطلب\">Manage order</h2><p class=\"small text-secondary\" data-ar=\"أكمل الطلب بعد الاستلام. إلغاء الطلب لا ينفذ استرداداً تلقائياً.\">Complete the order after collection. Cancelling does not issue a refund.</p><form method=\"post\" action=\"/admin/orders/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"reservation_id"), env.opts.autoescape);
output += "/status\"><input type=\"hidden\" name=\"csrf_token\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "csrf_token"), env.opts.autoescape);
output += "\"><label for=\"status-note\" class=\"form-label\" data-ar=\"ملاحظة داخلية اختيارية\">Optional internal note</label><textarea id=\"status-note\" name=\"note\" maxlength=\"500\" rows=\"2\" class=\"form-control mb-3\"></textarea><div class=\"d-flex flex-wrap gap-2\"><button name=\"action\" value=\"complete\" onclick=\"return confirm(document.documentElement.lang==='ar'?this.dataset.confirmAr:this.dataset.confirmEn)\" data-confirm-en=\"Confirm the customer collected the order and any cash payment was received?\" data-confirm-ar=\"هل تؤكد استلام الطلب والمدفوعات؟\" class=\"btn btn-primary\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"payment_method") == "instapay" && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"payment_status") != "verified") {
output += "disabled";
;
}
output += " data-ar=\"تأكيد إتمام الطلب\">Mark completed</button><button name=\"action\" value=\"cancel\" onclick=\"return confirm(document.documentElement.lang==='ar'?this.dataset.confirmAr:this.dataset.confirmEn)\" data-confirm-en=\"Cancel this order? Any refund must be handled separately.\" data-confirm-ar=\"هل تريد إلغاء الطلب؟ يجب معالجة أي استرداد بشكل منفصل.\" class=\"btn btn-outline-danger\" data-ar=\"إلغاء الطلب\">Cancel order</button></div></form>";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"payment_method") == "instapay" && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"payment_status") != "verified") {
output += "<p class=\"small text-secondary mt-3 mb-0\" data-ar=\"تحقق من الدفع قبل إتمام الطلب.\">Verify payment before completing this order.</p>";
;
}
output += "</div></section>";
;
}
output += "\n </div></div>\n</div>\n";
cb(null, output);
});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["admin/products.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "﻿";
env.getTemplate("base.html", true, "admin/products.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "Manage products | XPharma";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"container py-5\"><a href=\"/admin/dashboard\" class=\"text-decoration-none\" data-ar=\"العودة إلى لوحة الإدارة\">← Back to dashboard</a><div class=\"d-flex justify-content-between align-items-center gap-3 my-3\"><h1 class=\"display-font h2 mb-0\" data-ar=\"إدارة المنتجات\">Manage products</h1><a href=\"/admin/products/add\" class=\"btn btn-primary\" data-ar=\"إضافة منتج\">Add product</a></div><p class=\"text-secondary\" data-ar=\"تعديل تفاصيل المنتجات أو إخفاؤها أو حذفها من المتجر. تبقى الطلبات السابقة محفوظة.\">Edit, hide or delete products from the catalogue. Existing orders are preserved.</p><div class=\"row g-3\">";
frame = frame.push();
var t_10 = runtime.contextOrFrameLookup(context, frame, "products");
if(t_10) {t_10 = runtime.fromIterator(t_10);
var t_9 = t_10.length;
for(var t_8=0; t_8 < t_10.length; t_8++) {
var t_11 = t_10[t_8];
frame.set("product", t_11);
frame.set("loop.index", t_8 + 1);
frame.set("loop.index0", t_8);
frame.set("loop.revindex", t_9 - t_8);
frame.set("loop.revindex0", t_9 - t_8 - 1);
frame.set("loop.first", t_8 === 0);
frame.set("loop.last", t_8 === t_9 - 1);
frame.set("loop.length", t_9);
output += "<div class=\"col-md-6 col-lg-4\"><article class=\"card h-100\"><div class=\"card-body\"><div class=\"d-flex justify-content-between gap-2\"><h2 class=\"h5\"><span data-ar=\"";
output += runtime.suppressValue(runtime.memberLookup((t_11),"product_name_ar") || runtime.memberLookup((t_11),"product_name"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_11),"product_name"), env.opts.autoescape);
output += "</span></h2><span data-ar=\"";
output += runtime.suppressValue((runtime.memberLookup((t_11),"status") == "active"?"نشط":"غير نشط"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue((runtime.memberLookup((t_11),"status") == "active"?"Active":"Inactive"), env.opts.autoescape);
output += "</span></div><p class=\"small text-secondary\"><bdi>";
output += runtime.suppressValue(runtime.memberLookup((t_11),"product_id"), env.opts.autoescape);
output += "</bdi> · <bdi>";
output += runtime.suppressValue(runtime.memberLookup((t_11),"pack_size"), env.opts.autoescape);
output += "</bdi> <span data-ar=\"جم\">g</span></p><p><span data-ar=\"ج.م\">EGP</span> <bdi>";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.2f",runtime.memberLookup((t_11),"unit_price")), env.opts.autoescape);
output += "</bdi></p><div class=\"d-flex flex-wrap gap-2\"><a href=\"/admin/products/";
output += runtime.suppressValue(env.getFilter("urlencode").call(context, runtime.memberLookup((t_11),"product_id")), env.opts.autoescape);
output += "/edit\" class=\"btn btn-outline-primary btn-sm\" data-ar=\"تعديل المنتج\">Edit product</a><form method=\"post\" action=\"/admin/products/";
output += runtime.suppressValue(env.getFilter("urlencode").call(context, runtime.memberLookup((t_11),"product_id")), env.opts.autoescape);
output += "/delete\" onsubmit=\"return confirm(document.documentElement.lang==='ar' ? this.dataset.confirmAr : this.dataset.confirmEn)\" data-confirm-en=\"Delete this product from the catalogue? Existing orders will be preserved.\" data-confirm-ar=\"هل تريد حذف هذا المنتج من المتجر؟ ستبقى الطلبات السابقة محفوظة.\"><input type=\"hidden\" name=\"csrf_token\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "csrf_token"), env.opts.autoescape);
output += "\"><button class=\"btn btn-outline-danger btn-sm\" data-ar=\"حذف المنتج\">Delete product</button></form></div></div></article></div>";
;
}
}
frame = frame.pop();
output += "</div>\n";
if(runtime.contextOrFrameLookup(context, frame, "deleted_products")) {
output += "<section class=\"mt-5\"><h2 class=\"h4\" data-ar=\"المنتجات المحذوفة\">Deleted products</h2><p class=\"text-secondary small\" data-ar=\"المنتجات المحذوفة مخفية من المتجر ويمكن استعادتها كمنتجات غير نشطة. تبقى الطلبات السابقة محفوظة.\">Deleted products are hidden from the catalogue and can be restored as inactive. Existing orders are preserved.</p><div class=\"row g-3\">";
frame = frame.push();
var t_14 = runtime.contextOrFrameLookup(context, frame, "deleted_products");
if(t_14) {t_14 = runtime.fromIterator(t_14);
var t_13 = t_14.length;
for(var t_12=0; t_12 < t_14.length; t_12++) {
var t_15 = t_14[t_12];
frame.set("product", t_15);
frame.set("loop.index", t_12 + 1);
frame.set("loop.index0", t_12);
frame.set("loop.revindex", t_13 - t_12);
frame.set("loop.revindex0", t_13 - t_12 - 1);
frame.set("loop.first", t_12 === 0);
frame.set("loop.last", t_12 === t_13 - 1);
frame.set("loop.length", t_13);
output += "<div class=\"col-md-6 col-lg-4\"><article class=\"card h-100\"><div class=\"card-body\"><h3 class=\"h5\" data-ar=\"";
output += runtime.suppressValue(runtime.memberLookup((t_15),"product_name_ar") || runtime.memberLookup((t_15),"product_name"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_15),"product_name"), env.opts.autoescape);
output += "</h3><p class=\"small text-secondary\"><bdi>";
output += runtime.suppressValue(runtime.memberLookup((t_15),"product_id"), env.opts.autoescape);
output += "</bdi></p><form method=\"post\" action=\"/admin/products/";
output += runtime.suppressValue(env.getFilter("urlencode").call(context, runtime.memberLookup((t_15),"product_id")), env.opts.autoescape);
output += "/restore\"><input type=\"hidden\" name=\"csrf_token\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "csrf_token"), env.opts.autoescape);
output += "\"><button class=\"btn btn-outline-primary btn-sm\" data-ar=\"استعادة المنتج\">Restore product</button></form></div></article></div>";
;
}
}
frame = frame.pop();
output += "</div></section>";
;
}
output += "\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["admin/product_edit.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "﻿";
env.getTemplate("base.html", true, "admin/product_edit.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "Edit product | XPharma";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"container py-5\"><div class=\"row justify-content-center\"><div class=\"col-lg-7\"><a href=\"/admin/products\" data-ar=\"العودة إلى المنتجات\">← Back to products</a><h1 class=\"display-font h2 my-4\" data-ar=\"تعديل المنتج\">Edit product</h1><form method=\"post\" enctype=\"multipart/form-data\" class=\"card card-body p-4\"><input type=\"hidden\" name=\"csrf_token\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "csrf_token"), env.opts.autoescape);
output += "\"><p class=\"text-secondary\"><span data-ar=\"المرجع\">Reference</span>: <bdi>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"product_id"), env.opts.autoescape);
output += "</bdi></p><div class=\"mb-3\"><label class=\"form-label\" for=\"product_name\" data-ar=\"اسم المنتج\">Product name</label><input id=\"product_name\" name=\"product_name\" class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"product_name"), env.opts.autoescape);
output += "\" maxlength=\"200\" required></div><div class=\"mb-3\"><label class=\"form-label\" for=\"product_name_ar\" data-ar=\"اسم المنتج بالعربية\">Arabic product name</label><input id=\"product_name_ar\" name=\"product_name_ar\" class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"product_name_ar") || "", env.opts.autoescape);
output += "\" maxlength=\"200\" dir=\"auto\"></div><div class=\"row g-3\"><div class=\"col-md-6\"><label class=\"form-label\" for=\"pack_size\" data-ar=\"حجم العبوة\">Pack size</label><input id=\"pack_size\" name=\"pack_size\" type=\"number\" min=\"1\" max=\"100000\" class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"pack_size"), env.opts.autoescape);
output += "\" required></div><div class=\"col-md-6\"><label class=\"form-label\" for=\"unit_price\" data-ar=\"السعر بالجنيه\">Price in EGP</label><input id=\"unit_price\" name=\"unit_price\" type=\"number\" min=\"0\" max=\"1000000\" step=\"0.01\" class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"unit_price"), env.opts.autoescape);
output += "\" required></div></div><div class=\"my-3\"><label class=\"form-label\" for=\"status\" data-ar=\"حالة المنتج\">Product status</label><select id=\"status\" name=\"status\" class=\"form-select\"><option value=\"active\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"status") == "active") {
output += "selected";
;
}
output += " data-ar=\"نشط\">Active</option><option value=\"inactive\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"status") == "inactive") {
output += "selected";
;
}
output += " data-ar=\"غير نشط\">Inactive</option></select><small class=\"text-secondary\" data-ar=\"المنتجات غير النشطة مخفية من المتجر، مع الاحتفاظ بالطلبات السابقة.\">Inactive products are hidden from the catalogue; existing orders remain.</small></div>";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("admin/_product_content_fields.html", false, "admin/product_edit.html", false, function(t_9,t_8) {
if(t_9) { cb(t_9); return; }
callback(null,t_8);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_11,t_10) {
if(t_11) { cb(t_11); return; }
callback(null,t_10);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "<button class=\"btn btn-primary\" data-ar=\"حفظ التغييرات\">Save changes</button></form></div></div></div>\n";
cb(null, output);
});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["admin/reports.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "﻿";
env.getTemplate("base.html", true, "admin/reports.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "Manage orders | XPharma";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<div class=\"container py-5\">\n  <a href=\"/admin/dashboard\" class=\"text-decoration-none\" data-ar=\"العودة إلى لوحة الإدارة\">← Back to dashboard</a>\n  <h1 class=\"display-font h2 mt-3\" data-ar=\"إدارة الطلبات\">Manage orders</h1>\n  <p class=\"text-secondary\" data-ar=\"ابحث عن الطلبات وراجع المدفوعات وحالة الاستلام.\">Find reservations and review payments and collection status.</p>\n  <form method=\"GET\" class=\"card card-body mb-4\"><div class=\"row g-3 align-items-end\">\n    <div class=\"col-md-6\"><label class=\"form-label\" for=\"q\" data-ar=\"بحث\">Search</label><input id=\"q\" name=\"q\" class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"term"), env.opts.autoescape);
output += "\" placeholder=\"Order number, customer or product\"></div>\n    <div class=\"col-6 col-md-3\"><label class=\"form-label\" for=\"start_date\" data-ar=\"من تاريخ الاستلام\">Collection from</label><input id=\"start_date\" type=\"date\" name=\"start_date\" class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"start"), env.opts.autoescape);
output += "\"></div>\n    <div class=\"col-6 col-md-3\"><label class=\"form-label\" for=\"end_date\" data-ar=\"إلى تاريخ الاستلام\">Collection to</label><input id=\"end_date\" type=\"date\" name=\"end_date\" class=\"form-control\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"end"), env.opts.autoescape);
output += "\"></div>\n    <div class=\"col-md-4\"><label class=\"form-label\" for=\"status\" data-ar=\"حالة الطلب\">Order status</label><select id=\"status\" name=\"status\" class=\"form-select\"><option value=\"\" data-ar=\"كل الحالات\">All statuses</option>";
frame = frame.push();
var t_10 = ["active","pending_verification","rejected","completed","cancelled"];
if(t_10) {t_10 = runtime.fromIterator(t_10);
var t_9 = t_10.length;
for(var t_8=0; t_8 < t_10.length; t_8++) {
var t_11 = t_10[t_8];
frame.set("key", t_11);
frame.set("loop.index", t_8 + 1);
frame.set("loop.index0", t_8);
frame.set("loop.revindex", t_9 - t_8);
frame.set("loop.revindex0", t_9 - t_8 - 1);
frame.set("loop.first", t_8 === 0);
frame.set("loop.last", t_8 === t_9 - 1);
frame.set("loop.length", t_9);
var t_12;
t_12 = (lineno = 11, colno = 323, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.contextOrFrameLookup(context, frame, "order_labels"),t_11]));
frame.set("label", t_12, true);
if(frame.topLevel) {
context.setVariable("label", t_12);
}
if(frame.topLevel) {
context.addExport("label", t_12);
}
output += "<option value=\"";
output += runtime.suppressValue(t_11, env.opts.autoescape);
output += "\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"status") == t_11) {
output += "selected";
;
}
output += " data-ar=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "label")),1), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "label")),0), env.opts.autoescape);
output += "</option>";
;
}
}
frame = frame.pop();
output += "</select></div>\n    <div class=\"col-md-4\"><label class=\"form-label\" for=\"payment\" data-ar=\"حالة الدفع\">Payment status</label><select id=\"payment\" name=\"payment\" class=\"form-select\"><option value=\"\" data-ar=\"كل المدفوعات\">All payments</option>";
frame = frame.push();
var t_15 = ["pending_verification","verified","rejected","cash_on_collection","cash_paid"];
if(t_15) {t_15 = runtime.fromIterator(t_15);
var t_14 = t_15.length;
for(var t_13=0; t_13 < t_15.length; t_13++) {
var t_16 = t_15[t_13];
frame.set("key", t_16);
frame.set("loop.index", t_13 + 1);
frame.set("loop.index0", t_13);
frame.set("loop.revindex", t_14 - t_13);
frame.set("loop.revindex0", t_14 - t_13 - 1);
frame.set("loop.first", t_13 === 0);
frame.set("loop.last", t_13 === t_14 - 1);
frame.set("loop.length", t_14);
var t_17;
t_17 = (lineno = 12, colno = 341, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.contextOrFrameLookup(context, frame, "payment_labels"),t_16]));
frame.set("label", t_17, true);
if(frame.topLevel) {
context.setVariable("label", t_17);
}
if(frame.topLevel) {
context.addExport("label", t_17);
}
output += "<option value=\"";
output += runtime.suppressValue(t_16, env.opts.autoescape);
output += "\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "filters")),"payment") == t_16) {
output += "selected";
;
}
output += " data-ar=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "label")),1), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "label")),0), env.opts.autoescape);
output += "</option>";
;
}
}
frame = frame.pop();
output += "</select></div>\n    <div class=\"col-6 col-md-2\"><button class=\"btn btn-primary w-100\" data-ar=\"تطبيق\">Apply</button></div><div class=\"col-6 col-md-2\"><a href=\"/admin/reports\" class=\"btn btn-outline-primary w-100\" data-ar=\"مسح\">Clear</a></div>\n  </div></form>\n  <p class=\"text-secondary\"><bdi>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "total"), env.opts.autoescape);
output += "</bdi> <span data-ar=\"طلب\">orders</span></p>\n  ";
if(runtime.contextOrFrameLookup(context, frame, "reservations")) {
output += "<div class=\"row g-3\">";
frame = frame.push();
var t_20 = runtime.contextOrFrameLookup(context, frame, "reservations");
if(t_20) {t_20 = runtime.fromIterator(t_20);
var t_19 = t_20.length;
for(var t_18=0; t_18 < t_20.length; t_18++) {
var t_21 = t_20[t_18];
frame.set("res", t_21);
frame.set("loop.index", t_18 + 1);
frame.set("loop.index0", t_18);
frame.set("loop.revindex", t_19 - t_18);
frame.set("loop.revindex0", t_19 - t_18 - 1);
frame.set("loop.first", t_18 === 0);
frame.set("loop.last", t_18 === t_19 - 1);
frame.set("loop.length", t_19);
output += "<div class=\"col-lg-6\"><article class=\"card h-100\"><div class=\"card-body\"><div class=\"d-flex justify-content-between gap-3\"><h2 class=\"h5\"><span data-ar=\"طلب\">Order</span> #<bdi>";
output += runtime.suppressValue(runtime.memberLookup((t_21),"reservation_id"), env.opts.autoescape);
output += "</bdi></h2>";
var t_22;
t_22 = t_21;
frame.set("reservation", t_22, true);
if(frame.topLevel) {
context.setVariable("reservation", t_22);
}
if(frame.topLevel) {
context.addExport("reservation", t_22);
}
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("customer/_order_status.html", false, "admin/reports.html", false, function(t_24,t_23) {
if(t_24) { cb(t_24); return; }
callback(null,t_23);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_26,t_25) {
if(t_26) { cb(t_26); return; }
callback(null,t_25);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "</div><p class=\"mb-1\"><strong><span data-ar=\"";
output += runtime.suppressValue(runtime.memberLookup((t_21),"product_name_ar") || runtime.memberLookup((t_21),"product_name"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_21),"product_name"), env.opts.autoescape);
output += "</span></strong> · <span data-ar=\"الكمية\">Quantity</span> <bdi>";
output += runtime.suppressValue(runtime.memberLookup((t_21),"quantity"), env.opts.autoescape);
output += "</bdi></p><p class=\"mb-1\">";
output += runtime.suppressValue(runtime.memberLookup((t_21),"fname"), env.opts.autoescape);
output += " ";
output += runtime.suppressValue(runtime.memberLookup((t_21),"lname"), env.opts.autoescape);
output += " · <bdi>";
output += runtime.suppressValue(runtime.memberLookup((t_21),"phone"), env.opts.autoescape);
output += "</bdi></p><p class=\"small text-secondary mb-2\"><span data-ar=\"الاستلام\">Collection</span>: <bdi>";
output += runtime.suppressValue(env.getFilter("date_display").call(context, runtime.memberLookup((t_21),"pickup_date")), env.opts.autoescape);
output += "</bdi> · <span data-ar=\"ج.م\">EGP</span> <bdi>";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.2f",runtime.memberLookup((t_21),"price")), env.opts.autoescape);
output += "</bdi></p><p class=\"small mb-3\"><span data-ar=\"الدفع\">Payment</span>: <strong data-ar=\"";
output += runtime.suppressValue(runtime.memberLookup(((lineno = 16, colno = 929, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.contextOrFrameLookup(context, frame, "payment_labels"),runtime.memberLookup((t_21),"payment_status"),[runtime.memberLookup((t_21),"payment_status"),runtime.memberLookup((t_21),"payment_status")]]))),1), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup(((lineno = 16, colno = 1021, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.contextOrFrameLookup(context, frame, "payment_labels"),runtime.memberLookup((t_21),"payment_status"),[runtime.memberLookup((t_21),"payment_status"),runtime.memberLookup((t_21),"payment_status")]]))),0), env.opts.autoescape);
output += "</strong></p><a href=\"/admin/orders/";
output += runtime.suppressValue(runtime.memberLookup((t_21),"reservation_id"), env.opts.autoescape);
output += "\" class=\"btn btn-outline-primary btn-sm\" data-ar=\"عرض وإدارة الطلب\">View and manage order</a></div></article></div>";
});
}
}
frame = frame.pop();
output += "</div>";
;
}
else {
output += "<div class=\"card card-body text-secondary\" data-ar=\"لا توجد طلبات مطابقة.\">No orders match these filters.</div>";
;
}
output += "\n  <nav class=\"d-flex gap-2 mt-4\">";
if(runtime.contextOrFrameLookup(context, frame, "previous_page")) {
output += "<a class=\"btn btn-outline-primary\" href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "previous_page"), env.opts.autoescape);
output += "\" data-ar=\"السابق\">Previous</a>";
;
}
output += "<span class=\"align-self-center\"><span data-ar=\"صفحة\">Page</span> <bdi>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "current_page"), env.opts.autoescape);
output += "</bdi></span>";
if(runtime.contextOrFrameLookup(context, frame, "next_page")) {
output += "<a class=\"btn btn-outline-primary\" href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "next_page"), env.opts.autoescape);
output += "\" data-ar=\"التالي\">Next</a>";
;
}
output += "</nav>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["admin/_product_content_fields.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "﻿";
var t_1;
t_1 = runtime.contextOrFrameLookup(context, frame, "product") || {};
frame.set("content_product", t_1, true);
if(frame.topLevel) {
context.setVariable("content_product", t_1);
}
if(frame.topLevel) {
context.addExport("content_product", t_1);
}
output += "\n<div class=\"mb-3\"><label class=\"form-label\" for=\"purpose_en\" data-ar=\"استخدام المنتج بالإنجليزية\">Product purpose in English</label><input id=\"purpose_en\" name=\"purpose_en\" class=\"form-control\" maxlength=\"120\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "content_product")),"purpose_en") || "", env.opts.autoescape);
output += "\"><small class=\"text-secondary\" data-ar=\"وصف قصير يظهر على بطاقة المنتج.\">A short description shown on the product card.</small></div>\n<div class=\"mb-3\"><label class=\"form-label\" for=\"purpose_ar\" data-ar=\"استخدام المنتج بالعربية\">Product purpose in Arabic</label><input id=\"purpose_ar\" name=\"purpose_ar\" class=\"form-control\" maxlength=\"120\" dir=\"auto\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "content_product")),"purpose_ar") || "", env.opts.autoescape);
output += "\"></div>\n<div class=\"mb-3\"><label class=\"form-label\" for=\"description_en\" data-ar=\"وصف المنتج بالإنجليزية\">Product description in English</label><textarea id=\"description_en\" name=\"description_en\" class=\"form-control\" maxlength=\"4000\" rows=\"3\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "content_product")),"description_en") || "", env.opts.autoescape);
output += "</textarea></div>\n<div class=\"mb-3\"><label class=\"form-label\" for=\"description_ar\" data-ar=\"وصف المنتج بالعربية\">Product description in Arabic</label><textarea id=\"description_ar\" name=\"description_ar\" class=\"form-control\" maxlength=\"4000\" rows=\"3\" dir=\"auto\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "content_product")),"description_ar") || "", env.opts.autoescape);
output += "</textarea></div>\n<div class=\"mb-4\"><label class=\"form-label\" for=\"product_image\" data-ar=\"صورة المنتج\">Product image</label><input id=\"product_image\" name=\"product_image\" type=\"file\" class=\"form-control\" accept=\"image/png,image/jpeg,image/webp\"><small class=\"text-secondary\" data-ar=\"اختياري، صورة PNG أو JPEG أو WEBP بحد أقصى ٥ ميجابايت. اتركها فارغة للاحتفاظ بالصورة الحالية.\">Optional PNG, JPEG or WEBP, maximum 5 MB. Leave empty to keep the current image.</small></div>\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["base.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<!doctype html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0\">\r\n  <title>";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
output += t_1;
output += "</title>\r\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\"><link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\r\n  <link href=\"https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap\" rel=\"stylesheet\">\r\n  <link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css\" rel=\"stylesheet\"><link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css\">\r\n  <style>:root{--ink:#102a43;--muted:#627d98;--teal:#087e8b;--cream:#fcfaf5;--coral:#f28f7b;--surface:#fff;--surface-soft:#eaf7f2}*{box-sizing:border-box}body{font-family:'DM Sans',sans-serif;color:var(--ink);background:var(--cream);transition:background .25s,color .25s}.navbar{background:rgba(255,255,255,.94)!important;backdrop-filter:blur(12px);border-bottom:1px solid #e7edf0}.navbar-brand{color:var(--ink)!important;font-weight:700;letter-spacing:-.6px}.brand-logo{width:42px;height:42px;object-fit:contain;border-radius:50%;margin-right:8px;background:#fff}.brand-mark{background:var(--teal);color:white;width:32px;height:32px;border-radius:10px;display:inline-grid;place-items:center;margin-right:8px}.nav-link{color:var(--ink)!important;font-weight:600}.nav-link:hover{color:var(--teal)!important}.btn-primary{background:var(--teal);border-color:var(--teal);padding:.65rem 1.1rem;font-weight:700}.btn-primary:hover{background:#05636e;border-color:#05636e}.btn-outline-primary{color:var(--teal);border-color:var(--teal);font-weight:700}.btn-outline-primary:hover{background:var(--teal);border-color:var(--teal)}.page-wrap{min-height:calc(100vh - 72px);padding-top:72px}.section-kicker{font-size:.78rem;letter-spacing:.13em;text-transform:uppercase;color:var(--teal);font-weight:700}.display-font{font-family:'Playfair Display',serif}.card{border:0;box-shadow:0 12px 34px rgba(26,57,71,.08);border-radius:18px}.form-control,.form-select{border-radius:10px;padding:.7rem .85rem;border-color:#d6e0e5}.form-control:focus{border-color:var(--teal);box-shadow:0 0 0 .2rem rgba(8,126,139,.13)}footer{background:#102a43;color:#dfe9ed}footer a{color:#dfe9ed;text-decoration:none}footer a:hover{color:#fff}.alert{border-radius:12px}.utility-btn{border:0;background:#eaf7f2;color:var(--ink);border-radius:9px;width:34px;height:34px;font-size:.85rem;font-weight:700}.utility-btn:hover{background:#d4eee5}body.dark{--ink:#e7f1f5;--muted:#b7c9d0;--cream:#0b1720;--surface:#142532;--surface-soft:#10212c;background:#0b1720;color:#e7f1f5}body.dark .navbar{background:#0d1c27!important;border-color:#294655}body.dark .nav-link,body.dark .navbar-brand{color:#e7f1f5!important}body.dark .hero,body.dark .catalogue-head,body.dark .about-hero,body.dark .dash-head,body.dark .how,body.dark .values{background:var(--surface-soft)!important}body.dark .hero-card{background:#0c2634!important;color:#eff9fb!important;box-shadow:0 24px 55px rgba(0,0,0,.32)!important}body.dark .hero-card .section-kicker{color:#70d6c6!important}body.dark .hero-card li{color:#d1e4e8!important}body.dark .hero-card .notice{background:#174354!important;color:#e5f6f7!important;border:1px solid #2a6170}body.dark .card,body.dark .service-card,body.dark .medicine-card,body.dark .filter-card,body.dark .empty-state,body.dark .step{background:var(--surface)!important;color:#e7f1f5!important;box-shadow:0 10px 30px rgba(0,0,0,.22)!important}body.dark .text-secondary,body.dark .service-card p,body.dark .values p,body.dark .trust{color:#b7c9d0!important}body.dark .form-control,body.dark .form-select{background:#0c1b25;color:#e7f1f5;border-color:#3b5968}body.dark .form-control::placeholder{color:#8ea8b3}body.dark .table{color:#e7f1f5}body.dark .table th,body.dark .table td{border-color:#31505f}body.dark .utility-btn{background:#1c3c4a;color:#e7f1f5}body.dark .safety-note,body.dark .notice{background:#1a3844!important;color:#dbeff2!important}body.dark .about-art,body.dark footer{background:#0d1c27!important}body.dark .brand-logo{background:#fff}html[dir=\"rtl\"] body{font-family:Tahoma,'Arial',sans-serif}html[dir=\"rtl\"] .brand-mark,html[dir=\"rtl\"] .brand-logo{margin-right:0;margin-left:8px}html[dir=\"rtl\"] .me-2{margin-right:0!important;margin-left:.5rem!important}</style>";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("styles"))(env, context, frame, runtime, function(t_4,t_3) {
if(t_4) { cb(t_4); return; }
output += t_3;
output += "\r\n<style>.medicine-card{height:100%;display:flex;flex-direction:column;background:var(--surface);border-radius:18px;padding:1.25rem;box-shadow:0 12px 30px rgba(16,42,67,.07)}.medicine-card h3{font-size:1.1rem;font-weight:700;line-height:1.4}.medicine-card h3 a{color:var(--ink);text-decoration:none}.medicine-card h3 small{font-size:.8em;white-space:nowrap}.medicine-product-image{height:190px;display:grid;place-items:center;margin-bottom:1.25rem;border-radius:14px;background:#eaf7f2;overflow:hidden;color:var(--teal);font-size:2rem}.medicine-product-image img{height:180px;width:100%;object-fit:contain;mix-blend-mode:multiply}.medicine-purpose{color:var(--teal);font-size:.82rem;font-weight:700;margin-bottom:.35rem}.medicine-price{font-weight:700;color:var(--teal);margin-top:auto}body.dark .medicine-product-image{background:#0c2634}body.dark .medicine-product-image img{mix-blend-mode:normal}body.dark .medicine-purpose,body.dark .medicine-price{color:#80d8cd}</style>\r\n<style>.product-actions{display:flex;align-items:stretch;justify-content:center;border:1px solid var(--teal);border-radius:10px;overflow:hidden;font-size:clamp(.72rem,1vw,.88rem);font-weight:700;color:var(--teal);white-space:nowrap}.product-actions a{position:relative;isolation:isolate;display:flex;align-items:center;justify-content:center;padding:.7rem .6rem;color:inherit;text-decoration:none;transition:color .2s}.product-actions a::before{content:'';position:absolute;z-index:-1;inset:0 -.12rem;background:var(--teal);transform:skewX(-18deg);opacity:0;transition:opacity .2s}.product-actions span{display:flex;align-items:center}.product-actions a:hover,.product-actions a:focus-visible{color:#fff;text-decoration:none}.product-actions a:hover::before,.product-actions a:focus-visible::before{opacity:1}body.dark .product-actions{color:#80d8cd;border-color:#80d8cd}body.dark .product-actions a::before{background:#80d8cd}body.dark .product-actions a:hover,body.dark .product-actions a:focus-visible{color:#0b1720}.footer-logo{width:48px;height:48px;object-fit:contain;background:#fff;border-radius:50%;margin-inline-end:.65rem}.footer-brand{display:flex;align-items:center;color:#fff}</style>\r\n<style>.product-actions a{flex:1 1 auto}.product-actions a::before{inset-block:-2px;inset-inline:-.4rem}.product-actions a:first-child::before{inset-inline-start:-2rem}.product-actions a:last-child::before{inset-inline-end:-2rem}</style>\r\n<link rel=\"stylesheet\" href=\"";
output += runtime.suppressValue((lineno = 12, colno = 39, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["static","css/mobile.css"])), env.opts.autoescape);
output += "\">\r\n</head><body>\r\n";
if(runtime.contextOrFrameLookup(context, frame, "staging")) {
output += "<div role=\"status\" style=\"position:fixed;bottom:0;left:0;right:0;z-index:1100;background:#7a3500;color:#fff;text-align:center;padding:8px 12px;font-weight:700;font-size:14px\" data-ar=\"موقع تجريبي — يرجى عدم إرسال مدفوعات أو إجراء طلبات حقيقية.\">Test site — please do not send payments or place real orders.</div>";
;
}
output += "\r\n<nav class=\"navbar navbar-expand-lg fixed-top\"><div class=\"container\"><a class=\"navbar-brand d-flex align-items-center\" href=\"";
output += runtime.suppressValue((lineno = 15, colno = 136, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["index"])), env.opts.autoescape);
output += "\"><img class=\"brand-logo\" src=\"";
output += runtime.suppressValue((lineno = 15, colno = 189, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["static","images/brand/xpharma-logo.png"])), env.opts.autoescape);
output += "\" alt=\"XPharma logo\"><span>XPharma</span></a><button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#nav\" aria-controls=\"nav\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"><span class=\"navbar-toggler-icon\"></span></button><div class=\"collapse navbar-collapse xpharma-nav\" id=\"nav\"><ul class=\"navbar-nav nav-pages align-items-lg-center gap-lg-2\"><li class=\"nav-item\"><a class=\"nav-link\" href=\"";
output += runtime.suppressValue((lineno = 15, colno = 676, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["index"])), env.opts.autoescape);
output += "\" data-ar=\"الرئيسية\">Home</a></li><li class=\"nav-item\"><a class=\"nav-link\" href=\"";
output += runtime.suppressValue((lineno = 15, colno = 779, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["browse_products"])), env.opts.autoescape);
output += "\" data-ar=\"المنتجات\">Products</a></li><li class=\"nav-item\"><a class=\"nav-link\" href=\"";
output += runtime.suppressValue((lineno = 15, colno = 896, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["about"])), env.opts.autoescape);
output += "\" data-ar=\"من نحن\">About us</a></li><li class=\"nav-item\"><a class=\"nav-link\" href=\"";
output += runtime.suppressValue((lineno = 15, colno = 1001, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["index"])), env.opts.autoescape);
output += "#contact\" data-ar=\"اتصل بنا\">Contact us</a></li>";
if((lineno = 15, colno = 1073, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.contextOrFrameLookup(context, frame, "session"),"customer_ssn"]))) {
output += "<li class=\"nav-item\"><a class=\"nav-link\" href=\"";
output += runtime.suppressValue((lineno = 15, colno = 1158, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["customer_dashboard"])), env.opts.autoescape);
output += "\" data-ar=\"طلباتي\">My orders</a></li>";
;
}
else {
if((lineno = 15, colno = 1234, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.contextOrFrameLookup(context, frame, "session"),"admin"]))) {
output += "<li class=\"nav-item\"><a class=\"nav-link\" href=\"";
output += runtime.suppressValue((lineno = 15, colno = 1312, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["admin_dashboard"])), env.opts.autoescape);
output += "\" data-ar=\"لوحة الإدارة\">Admin</a></li>";
;
}
;
}
output += "</ul><ul class=\"navbar-nav nav-controls align-items-lg-center\"><li class=\"nav-item nav-utilities\"><button class=\"utility-btn\" id=\"languageToggle\" type=\"button\" aria-label=\"Switch language\">ع</button><button class=\"utility-btn\" id=\"themeToggle\" type=\"button\" aria-label=\"Toggle dark mode\"><i class=\"fa-solid fa-moon\"></i></button></li>";
if((lineno = 15, colno = 1730, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.contextOrFrameLookup(context, frame, "session"),"customer_ssn"])) || (lineno = 15, colno = 1765, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.contextOrFrameLookup(context, frame, "session"),"admin"]))) {
if(runtime.contextOrFrameLookup(context, frame, "account_name")) {
output += "<li class=\"nav-item nav-account\"><i class=\"fa-regular fa-user\" aria-hidden=\"true\"></i><bdi dir=\"auto\" data-account-name>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "account_name"), env.opts.autoescape);
output += "</bdi></li>";
;
}
output += "<li class=\"nav-item\"><a class=\"btn btn-outline-primary btn-sm\" href=\"";
output += runtime.suppressValue(((lineno = 15, colno = 2075, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.contextOrFrameLookup(context, frame, "session"),"customer_ssn"]))?(lineno = 15, colno = 2046, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["customer_logout"])):(lineno = 15, colno = 2113, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["admin_logout"]))), env.opts.autoescape);
output += "\">Sign out</a></li>";
;
}
else {
output += "<li class=\"nav-item\"><a class=\"nav-link\" href=\"";
output += runtime.suppressValue((lineno = 15, colno = 2218, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["customer_login"])), env.opts.autoescape);
output += "\">Sign in</a></li><li class=\"nav-item\"><a class=\"btn btn-primary btn-sm\" href=\"";
output += runtime.suppressValue((lineno = 15, colno = 2328, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["customer_register"])), env.opts.autoescape);
output += "\">Create account</a></li>";
;
}
output += "</ul></div></div></nav>\r\n<main class=\"page-wrap\">";
var t_5;
t_5 = (lineno = 16, colno = 62, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "get_flashed_messages"), "get_flashed_messages", context, []));
frame.set("messages", t_5, true);
if(frame.topLevel) {
context.setVariable("messages", t_5);
}
if(frame.topLevel) {
context.addExport("messages", t_5);
}
if(runtime.contextOrFrameLookup(context, frame, "messages")) {
output += "<div class=\"container pt-3\">";
frame = frame.push();
var t_8 = runtime.contextOrFrameLookup(context, frame, "messages");
if(t_8) {t_8 = runtime.fromIterator(t_8);
var t_7 = t_8.length;
for(var t_6=0; t_6 < t_8.length; t_6++) {
var t_9 = t_8[t_6];
frame.set("__pair", t_9);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
var t_10;
t_10 = runtime.memberLookup((t_9),0);
frame.set("category", t_10, true);
if(frame.topLevel) {
context.setVariable("category", t_10);
}
if(frame.topLevel) {
context.addExport("category", t_10);
}
var t_11;
t_11 = runtime.memberLookup((t_9),1);
frame.set("message", t_11, true);
if(frame.topLevel) {
context.setVariable("message", t_11);
}
if(frame.topLevel) {
context.addExport("message", t_11);
}
output += "<div class=\"alert alert-";
output += runtime.suppressValue((runtime.inOperator(runtime.contextOrFrameLookup(context, frame, "category"),["error","danger"])?"danger":runtime.contextOrFrameLookup(context, frame, "category")), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "message"), env.opts.autoescape);
output += "</div>";
;
}
}
frame = frame.pop();
output += "</div>";
;
}
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_13,t_12) {
if(t_13) { cb(t_13); return; }
output += t_12;
if(runtime.contextOrFrameLookup(context, frame, "assistant_visible")) {
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("customer/_assistant.html", false, "base.html", false, function(t_15,t_14) {
if(t_15) { cb(t_15); return; }
callback(null,t_14);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_17,t_16) {
if(t_17) { cb(t_17); return; }
callback(null,t_16);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
});
}
output += "</main>\r\n<footer id=\"contact\" class=\"pt-5 pb-4\" style=\"scroll-margin-top: 90px\"><div class=\"container\"><div class=\"row gy-4\"><div class=\"col-md-5\"><div class=\"h4 fw-bold footer-brand\"><img class=\"footer-logo\" src=\"";
output += runtime.suppressValue((lineno = 17, colno = 215, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["static","images/brand/xpharma-logo.png"])), env.opts.autoescape);
output += "\" alt=\"XPharma logo\"><span>XPharma</span></div><p class=\"mb-0\">Cosmetics, skincare, and dietary supplements made in Egypt.</p></div><div class=\"col-6 col-md-3\"><h6 class=\"text-white\">Explore</h6><p class=\"mb-2\"><a href=\"";
output += runtime.suppressValue((lineno = 17, colno = 491, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["about"])), env.opts.autoescape);
output += "\">About us</a></p><p><a href=\"";
output += runtime.suppressValue((lineno = 17, colno = 543, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["browse_products"])), env.opts.autoescape);
output += "\">Browse products</a></p></div><div class=\"col-12 col-md-4 footer-contact\"><h6 class=\"text-white\">Contact XPharma</h6><p class=\"mb-2\"><i class=\"fa-solid fa-location-dot me-2\"></i>Alexandria, Egypt</p><p class=\"mb-2\"><a href=\"tel:+201007718313\"><bdi>01007718313</bdi></a> · <a href=\"https://wa.me/201141119130\"><bdi>01141119130</bdi></a></p><p class=\"mb-2\"><a href=\"mailto:Xpharma25@gmail.com\"><i class=\"fa-solid fa-envelope me-2\"></i><bdi>Xpharma25@gmail.com</bdi></a></p><p class=\"mb-2\"><a href=\"https://www.facebook.com/XPharma1\" target=\"_blank\" rel=\"noopener\"><i class=\"fa-brands fa-facebook me-2\"></i><span data-ar=\"تابع إكس فارما على فيسبوك\">Follow XPharma on Facebook</span></a></p><p class=\"mb-0\"><a href=\"https://www.instagram.com/xpharma_eg/\" target=\"_blank\" rel=\"noopener\"><i class=\"fa-brands fa-instagram me-2\"></i><span data-ar=\"تابع إكس فارما على إنستغرام\">Follow XPharma on Instagram</span></a></p></div></div><hr class=\"border-secondary my-4\"><small>© ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "current_year"), env.opts.autoescape);
output += " XPharma. All rights reserved.</small></div></footer>\r\n<script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js\"></script><script>\r\nconst ar={\r\n'Our products':'منتجاتنا','About':'من نحن','Browse products':'تصفح المنتجات','My orders':'طلباتي','Sign out':'تسجيل الخروج','Admin':'الإدارة','Sign in':'تسجيل الدخول','Create account':'إنشاء حساب','Cosmetics, skincare, and dietary supplements made in Egypt.':'مستحضرات تجميل وعناية بالبشرة ومكملات غذائية مصرية.','Explore':'اكتشف','About us':'من نحن','Contact XPharma':'تواصل مع إكس فارما','Alexandria, Egypt':'الإسكندرية، مصر','Follow XPharma on Facebook':'تابع إكس فارما على فيسبوك','All rights reserved.':'جميع الحقوق محفوظة.',\r\n'Made in Egypt · Alexandria':'صُنع في مصر · الإسكندرية','Everyday care, thoughtfully made.':'عناية يومية، صُنعت بعناية.','Discover XPharma cosmetics, skincare, and dietary supplements—then reserve products for collection at a time that works for you.':'اكتشف مستحضرات إكس فارما للعناية بالبشرة والجسم والمكملات الغذائية، ثم احجز منتجاتك للاستلام في الوقت المناسب لك.','Explore products':'استكشف المنتجات','Meet XPharma':'تعرّف على إكس فارما','Egyptian health & beauty brand':'علامة مصرية للصحة والجمال','Skin and body care':'عناية بالبشرة والجسم','Our collection':'مجموعتنا','Care, from head to toe.':'عناية من الرأس إلى القدمين.','Targeted skincare solutions.':'حلول عناية مخصصة بالبشرة.','Soothing skin and body-care products.':'منتجات مهدئة للعناية بالبشرة والجسم.','Dietary supplements for everyday wellness.':'مكملات غذائية لعافية يومية.','Product availability is confirmed after your reservation.':'يتم تأكيد توافر المنتجات بعد الحجز.','XPharma essentials':'أساسيات إكس فارما','Purposeful products for everyday wellbeing':'منتجات مدروسة للعافية اليومية','Skincare':'العناية بالبشرة','Focused formulas developed for skin-care routines, including acne-prone and dry skin needs.':'تركيبات مركزة لروتين العناية بالبشرة، بما فيها البشرة المعرضة للحبوب والجفاف.','Body care':'العناية بالجسم','Topical care products made for moments when your body needs a little extra comfort.':'منتجات عناية موضعية لأوقات يحتاج فيها جسمك إلى راحة إضافية.','Supplements':'المكملات الغذائية','Dietary supplements designed to support a considered everyday wellness routine.':'مكملات غذائية مصممة لدعم روتين عافية يومي مدروس.','A reservation, not a diagnosis.':'حجزٌ وليس تشخيصاً.','XPharma helps you prepare for collection. The pharmacy team remains the right place for product advice, suitability questions, and prescription checks.':'تساعدك إكس فارما في تجهيز طلبك للاستلام. ويبقى فريق الصيدلية أو المختصون المكان المناسب لاستشارات المنتجات وملاءمتها وفحص الوصفات.','Browse':'تصفح','Choose a date':'اختر تاريخاً','Collect':'استلم','Create an account':'أنشئ حساباً','create an account':'أنشئ حساباً',\r\n'About XPharma':'عن إكس فارما','Care that supports your everyday routine.':'عناية تدعم روتينك اليومي.','XPharma is a fast-growing Egyptian company in cosmetics, skincare, and dietary supplements, based in Alexandria.':'إكس فارما شركة مصرية سريعة النمو في مستحضرات التجميل والعناية بالبشرة والمكملات الغذائية، مقرها الإسكندرية.','Our approach':'منهجنا','Practical products, made with care.':'منتجات عملية، صُنعت بعناية.','From targeted skincare to body-care products and dietary supplements, XPharma brings together everyday essentials in one focused collection.':'من العناية المخصصة بالبشرة إلى منتجات الجسم والمكملات الغذائية، تجمع إكس فارما أساسياتك اليومية في مجموعة مركزة.','Browse products':'تصفح المنتجات',\r\n'XPharma product collection':'مجموعة منتجات إكس فارما','Reserve your care essentials.':'احجز أساسيات عنايتك.','Browse skincare, body care, and wellness products. Availability is confirmed after your reservation.':'تصفح منتجات العناية بالبشرة والجسم والعافية. يتم تأكيد التوافر بعد الحجز.','Product name':'اسم المنتج','Maximum price':'أقصى سعر','Search products':'ابحث عن المنتجات','XPharma product':'منتج إكس فارما','Listed product':'منتج مدرج','Reserve for collection':'احجز للاستلام','No products match that search.':'لا توجد منتجات مطابقة للبحث.','Try a shorter product name or remove the price filter.':'جرّب اسم منتج أقصر أو أزل فلتر السعر.','View all products':'عرض كل المنتجات',\r\n'Collection reservation':'حجز للاستلام','Reserve your product':'احجز منتجك','Back to products':'العودة للمنتجات','Collection date':'تاريخ الاستلام','Good to know':'معلومة مهمة','Confirm reservation':'تأكيد الحجز','Your account':'حسابك','My product reservations':'حجوزات منتجاتي','Reserve products':'احجز منتجات','Product':'المنتج','Reference':'المرجع','Status':'الحالة','Reserved value':'قيمة الحجز','Cancel':'إلغاء','Nothing reserved yet.':'لا توجد حجوزات حتى الآن.','Browse the XPharma collection and reserve a product for collection.':'تصفح مجموعة إكس فارما واحجز منتجاً للاستلام.','Select the date you expect to collect reference':'اختر التاريخ المتوقع لاستلام المنتج برقم المرجع','We’ll keep the reservation active for one day.':'سيظل الحجز فعالاً لمدة يوم واحد.','XPharma will confirm product availability after your reservation. For product enquiries, call 010 07718313.':'ستؤكد إكس فارما توافر المنتج بعد الحجز. للاستفسارات اتصل على 010 07718313.','No products match that search.':'لا توجد منتجات مطابقة للبحث.','Try a shorter product name or remove the price filter.':'جرّب اسم منتج أقصر أو أزل فلتر السعر.','Already have an account?':'لديك حساب بالفعل؟','Registration successful':'تم إنشاء الحساب بنجاح','Login successful':'تم تسجيل الدخول بنجاح','Reservation successful':'تم الحجز بنجاح','Reservation cancelled successfully':'تم إلغاء الحجز بنجاح',\r\n'Welcome back':'مرحباً بعودتك','Sign in to XPharma':'سجل دخولك إلى إكس فارما','Email':'البريد الإلكتروني','Password':'كلمة المرور','First Name':'الاسم الأول','Last Name':'اسم العائلة','Phone Number (11 digits)':'رقم الهاتف (11 رقماً)','Already have an account?':'لديك حساب بالفعل؟','Create your XPharma account':'أنشئ حسابك في إكس فارما','Reserve with ease':'احجز بسهولة','XPharma Admin Dashboard':'لوحة إدارة إكس فارما','Listed Medicines':'المنتجات المدرجة','Available Items':'المنتجات المتاحة','Reserved Items':'المنتجات المحجوزة','Quick Actions':'إجراءات سريعة','Add Medicine':'إضافة منتج','View Reports':'عرض التقارير','System Reports':'تقارير النظام'\r\n};\r\nObject.assign(ar,{\n'Choose valid filters.':'اختر عوامل تصفية صالحة.',\r\n'Payment could not be updated. Refresh and check the order status.':'تعذر تحديث الدفع. حدّث الصفحة وتحقق من حالة الطلب.',\r\n'Payment marked as verified.':'تم تأكيد الدفع.',\r\n'Payment marked as rejected.':'تم رفض إثبات الدفع.',\r\n'Payment returned to review.':'تمت إعادة الدفع للمراجعة.',\r\n'Verify the InstaPay payment before completing this order.':'تحقق من دفع إنستاباي قبل إتمام الطلب.',\r\n'Order could not be updated. Refresh and check its status.':'تعذر تحديث الطلب. حدّث الصفحة وتحقق من حالته.',\r\n'Order cancelled. No refund is automatic.':'تم إلغاء الطلب. لا يتم رد المبلغ تلقائياً.',\r\n'Order cancelled, but the cancellation email could not be sent. No refund is automatic.':'تم إلغاء الطلب، لكن تعذر إرسال رسالة الإلغاء. لا يتم رد المبلغ تلقائياً.',\r\n'Order marked as completed.':'تم تأكيد إتمام الطلب.',\r\n'Enter valid product details.':'أدخل بيانات صحيحة للمنتج.',\r\n'A product with that reference already exists.':'يوجد منتج بهذا المرجع بالفعل.',\r\n'Product added successfully':'تمت إضافة المنتج بنجاح.',\r\n'Product updated successfully.':'تم تحديث المنتج بنجاح.',\r\n'Product could not be updated.':'تعذر تحديث المنتج.',\r\n'Current password is incorrect.':'كلمة المرور الحالية غير صحيحة.',\r\n'Password could not be updated. Please try again.':'تعذر تحديث كلمة المرور. حاول مرة أخرى.',\r\n'Password updated. Please sign in again.':'تم تحديث كلمة المرور. سجل الدخول مجدداً.',\r\n'Choose a matching password with at least 12 characters, upper and lowercase letters, a number and a symbol.':'اختر كلمة مرور متطابقة من ١٢ حرفاً على الأقل، تشمل حروفاً كبيرة وصغيرة ورقماً ورمزاً.',\r\n'Order number, customer or product':'رقم الطلب أو العميل أو المنتج',\r\n'Name, email, phone or city':'الاسم أو البريد أو الهاتف أو المدينة',\r\n'Enter valid product details and a PNG, JPEG or WEBP image.':'أدخل بيانات صحيحة للمنتج وصورة بصيغة PNG أو JPEG أو WEBP.',\r\n'Upload a valid PNG, JPEG or WEBP payment screenshot.':'ارفع صورة دفع صالحة بصيغة PNG أو JPEG أو WEBP.',\r\n'The payment proof cannot be replaced for this order.':'لا يمكن استبدال إثبات الدفع لهذا الطلب.',\r\n'Payment proof submitted for review.':'تم إرسال إثبات الدفع للمراجعة.',\r\n'Your proof was saved, but the notification could not be sent. Please contact XPharma.':'تم حفظ إثبات الدفع، لكن تعذر إرسال الإشعار. يرجى التواصل مع إكس فارما.'\r\n,'Choose a valid collection date, quantity and payment option.':'اختر تاريخ استلام وكمية وطريقة دفع صحيحة.'\r\n,'Reservation submitted successfully.':'تم إرسال الطلب بنجاح.'\r\n,'Your reservation was saved, but the notification could not be sent. Please contact XPharma.':'تم حفظ طلبك، لكن تعذر إرسال الإشعار. يرجى التواصل مع إكس فارما.'\r\n,'Product deleted. Existing orders are preserved.':'تم حذف المنتج مع الاحتفاظ بالطلبات السابقة.'\r\n,'Product could not be deleted.':'تعذر حذف المنتج.'\r\n,'Product restored as inactive.':'تمت استعادة المنتج كمنتج غير نشط.'\r\n,'Product could not be restored.':'تعذرت استعادة المنتج.'\r\n});\nconst textOriginals=new WeakMap();const digitMap={'0':'٠','1':'١','2':'٢','3':'٣','4':'٤','5':'٥','6':'٦','7':'٧','8':'٨','9':'٩'};const arabicDigits=value=>value.replace(/[0-9]/g,d=>digitMap[d]).replace(/[٠-٩]+/g,match=>'\\u200E'+match+'\\u200E');\r\nfunction translatePage(lang){const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>(['SCRIPT','STYLE'].includes(n.parentElement?.tagName)||n.parentElement?.closest('[data-preserve-ltr], [data-account-name]'))?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});let n;while(n=walker.nextNode()){if(!textOriginals.has(n))textOriginals.set(n,n.nodeValue);const original=textOriginals.get(n),lead=original.match(/^\\s*/)[0],tail=original.match(/\\s*$/)[0],key=original.trim();const translated=lang==='ar'?(n.parentElement?.dataset.ar||ar[key]||key):key;n.nodeValue=lead+(lang==='ar'?arabicDigits(translated):translated)+tail}document.querySelectorAll('[placeholder]').forEach(el=>{if(!el.dataset.placeholderOriginal)el.dataset.placeholderOriginal=el.placeholder;const original=el.dataset.placeholderOriginal;el.placeholder=lang==='ar'?arabicDigits(ar[original]||original):original});document.querySelectorAll('[data-ar-alt],[data-ar-aria-label]').forEach(el=>{for(const [attr,key] of [['alt','arAlt'],['aria-label','arAriaLabel']]){if(!el.dataset[key])continue;const originalKey=key+'Original';if(el.dataset[originalKey]===undefined)el.dataset[originalKey]=el.getAttribute(attr)||'';el.setAttribute(attr,lang==='ar'?el.dataset[key]:el.dataset[originalKey])}});document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';document.getElementById('languageToggle').textContent=lang==='ar'?'EN':'ع';localStorage.setItem('xpharma-language',lang)}\r\nfunction setTheme(theme){document.body.classList.toggle('dark',theme==='dark');document.getElementById('themeToggle').innerHTML=theme==='dark'?'<i class=\"fa-solid fa-sun\"></i>':'<i class=\"fa-solid fa-moon\"></i>';localStorage.setItem('xpharma-theme',theme)}\r\nfunction addPasswordToggles(){document.querySelectorAll('input[type=\"password\"]').forEach(input=>{if(input.dataset.passwordToggle)return;input.dataset.passwordToggle='true';const wrap=document.createElement('div'),button=document.createElement('button');wrap.className='password-field';input.parentNode.insertBefore(wrap,input);wrap.append(input);button.type='button';button.className='password-toggle';button.setAttribute('aria-label','Show password');button.setAttribute('title','Show password');button.innerHTML='<i class=\"fa-regular fa-eye\" aria-hidden=\"true\"></i>';button.addEventListener('click',()=>{const visible=input.type==='text';input.type=visible?'password':'text';button.setAttribute('aria-label',visible?'Show password':'Hide password');button.setAttribute('title',visible?'Show password':'Hide password');button.innerHTML=visible?'<i class=\"fa-regular fa-eye\" aria-hidden=\"true\"></i>':'<i class=\"fa-regular fa-eye-slash\" aria-hidden=\"true\"></i>'});wrap.append(button)})}\r\naddPasswordToggles();\r\nsetTheme(localStorage.getItem('xpharma-theme')||'light');translatePage(localStorage.getItem('xpharma-language')||'en');document.getElementById('themeToggle').addEventListener('click',()=>setTheme(document.body.classList.contains('dark')?'light':'dark'));document.getElementById('languageToggle').addEventListener('click',()=>translatePage(document.documentElement.lang==='ar'?'en':'ar'));\r\n</script>";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("scripts"))(env, context, frame, runtime, function(t_19,t_18) {
if(t_19) { cb(t_19); return; }
output += t_18;
output += "</body></html>\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 4;
var colno = 12;
var output = "";
try {
var frame = frame.push(true);
output += "XPharma | Care, made simpler";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_styles(env, context, frame, runtime, cb) {
var lineno = 8;
var colno = 3743;
var output = "";
try {
var frame = frame.push(true);
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 16;
var colno = 338;
var output = "";
try {
var frame = frame.push(true);
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_scripts(env, context, frame, runtime, cb) {
var lineno = 68;
var colno = 12;
var output = "";
try {
var frame = frame.push(true);
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_styles: b_styles,
b_content: b_content,
b_scripts: b_scripts,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["customer/dashboard.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "customer/dashboard.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("styles"))(env, context, frame, runtime, function(t_9,t_8) {
if(t_9) { cb(t_9); return; }
output += t_8;
output += "\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 28;
var output = "";
try {
var frame = frame.push(true);
output += "My orders | XPharma";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 78;
var output = "";
try {
var frame = frame.push(true);
output += "\r\n<section class=\"dash-head\"><div class=\"container d-flex flex-wrap align-items-center justify-content-between gap-3\"><div><p class=\"section-kicker mb-2\">Your account</p>";
if(runtime.contextOrFrameLookup(context, frame, "account_name")) {
output += "<p class=\"mb-2 fw-semibold\"><bdi dir=\"auto\" data-account-name>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "account_name"), env.opts.autoescape);
output += "</bdi></p>";
;
}
output += "<h1 class=\"display-font h2 mb-0\">My product reservations</h1></div><a href=\"";
output += runtime.suppressValue((lineno = 1, colno = 376, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["browse_products"])), env.opts.autoescape);
output += "\" class=\"btn btn-primary\"><i class=\"fa-solid fa-plus me-2\"></i>Reserve products</a></div></section><div class=\"container py-5\">";
if(runtime.contextOrFrameLookup(context, frame, "reservations")) {
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("customer/_mobile_orders.html", false, "customer/dashboard.html", false, function(t_11,t_10) {
if(t_11) { cb(t_11); return; }
callback(null,t_10);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_13,t_12) {
if(t_13) { cb(t_13); return; }
callback(null,t_12);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "<div class=\"card d-none d-md-block\"><div class=\"table-responsive\"><table class=\"table align-middle mb-0\"><thead><tr><th>Product</th><th>Quantity</th><th>Collection</th><th>Payment</th><th>Status</th><th>Total</th><th></th></tr></thead><tbody>";
frame = frame.push();
var t_16 = runtime.contextOrFrameLookup(context, frame, "reservations");
if(t_16) {t_16 = runtime.fromIterator(t_16);
var t_15 = t_16.length;
for(var t_14=0; t_14 < t_16.length; t_14++) {
var t_17 = t_16[t_14];
frame.set("reservation", t_17);
frame.set("loop.index", t_14 + 1);
frame.set("loop.index0", t_14);
frame.set("loop.revindex", t_15 - t_14);
frame.set("loop.revindex0", t_15 - t_14 - 1);
frame.set("loop.first", t_14 === 0);
frame.set("loop.last", t_14 === t_15 - 1);
frame.set("loop.length", t_15);
output += "<tr><td class=\"fw-bold\"><span data-ar=\"";
output += runtime.suppressValue(runtime.memberLookup((t_17),"product_name_ar") || runtime.memberLookup((t_17),"product_name"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_17),"product_name"), env.opts.autoescape);
output += "</span><small class=\"d-block text-secondary\">";
output += runtime.suppressValue(runtime.memberLookup((t_17),"product_id"), env.opts.autoescape);
output += "</small></td><td>";
output += runtime.suppressValue(runtime.memberLookup((t_17),"quantity"), env.opts.autoescape);
output += "</td><td>";
output += runtime.suppressValue(env.getFilter("date_display").call(context, runtime.memberLookup((t_17),"pickup_date")), env.opts.autoescape);
output += "</td><td><span class=\"text-capitalize\">";
output += runtime.suppressValue(runtime.memberLookup((t_17),"payment_method"), env.opts.autoescape);
output += "</span><small class=\"d-block text-secondary\"><span data-ar=\"";
output += runtime.suppressValue(runtime.memberLookup(((lineno = 1, colno = 1308, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.contextOrFrameLookup(context, frame, "payment_labels"),runtime.memberLookup((t_17),"payment_status"),[runtime.memberLookup((t_17),"payment_status"),runtime.memberLookup((t_17),"payment_status")]]))),1), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup(((lineno = 1, colno = 1424, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.contextOrFrameLookup(context, frame, "payment_labels"),runtime.memberLookup((t_17),"payment_status"),[runtime.memberLookup((t_17),"payment_status"),runtime.memberLookup((t_17),"payment_status")]]))),0), env.opts.autoescape);
output += "</span></small></td><td>";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("customer/_order_status.html", false, "customer/dashboard.html", false, function(t_19,t_18) {
if(t_19) { cb(t_19); return; }
callback(null,t_18);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_21,t_20) {
if(t_21) { cb(t_21); return; }
callback(null,t_20);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "</td><td>EGP ";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.2f",runtime.memberLookup((t_17),"price")), env.opts.autoescape);
output += "</td><td>";
var t_22;
t_22 = "desktop";
frame.set("proof_suffix", t_22, true);
if(frame.topLevel) {
context.setVariable("proof_suffix", t_22);
}
if(frame.topLevel) {
context.addExport("proof_suffix", t_22);
}
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("customer/_replace_proof.html", false, "customer/dashboard.html", false, function(t_24,t_23) {
if(t_24) { cb(t_24); return; }
callback(null,t_23);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_26,t_25) {
if(t_26) { cb(t_26); return; }
callback(null,t_25);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
if(runtime.memberLookup((t_17),"status") == "active") {
output += "<form method=\"POST\" action=\"";
output += runtime.suppressValue((lineno = 1, colno = 1811, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["cancel_reservation",runtime.memberLookup((t_17),"reservation_id")])), env.opts.autoescape);
output += "\"><input type=\"hidden\" name=\"csrf_token\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "csrf_token"), env.opts.autoescape);
output += "\"><button class=\"btn btn-sm btn-outline-danger\" onclick=\"return confirm('Cancel this product reservation?')\">Cancel</button></form>";
;
}
output += "</td></tr>";
})});
}
}
frame = frame.pop();
output += "</tbody></table></div></div>";
});
}
else {
output += "<div class=\"empty-state text-center\"><i class=\"fa-solid fa-spa\"></i><h2 class=\"display-font h3 mt-3\">Nothing reserved yet.</h2><p class=\"text-secondary\">Browse the XPharma collection and reserve a product for collection.</p><a class=\"btn btn-primary\" href=\"";
output += runtime.suppressValue((lineno = 1, colno = 2397, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["browse_products"])), env.opts.autoescape);
output += "\">Browse products</a></div>";
;
}
output += "</div>\r\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_styles(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 17;
var output = "";
try {
var frame = frame.push(true);
output += "<style>.dash-head{padding:4rem 0 2.5rem;background:#eaf7f2}.table th{font-size:.78rem;text-transform:uppercase;letter-spacing:.06em;color:#627d98}.table td,.table th{padding:1rem}.empty-state{padding:4.5rem 1rem;background:#fff;border-radius:18px;box-shadow:0 12px 34px rgba(26,57,71,.08)}.empty-state>i{font-size:3rem;color:var(--teal)}</style>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
b_styles: b_styles,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["customer/login.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "customer/login.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\r\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\r\n<div class=\"container\">\r\n    <div class=\"row justify-content-center\">\r\n        <div class=\"col-md-6\">\r\n            <div class=\"card shadow\">\r\n                <div class=\"card-body\">\r\n                    <p class=\"section-kicker text-center\">Welcome back</p>\r\n                    <h2 class=\"display-font text-center mb-4\">Sign in to XPharma</h2>\r\n                    ";
var t_6;
t_6 = (lineno = 9, colno = 58, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "get_flashed_messages"), "get_flashed_messages", context, []));
frame.set("messages", t_6, true);
if(frame.topLevel) {
context.setVariable("messages", t_6);
}
if(frame.topLevel) {
context.addExport("messages", t_6);
}
output += "\r\n                        ";
if(runtime.contextOrFrameLookup(context, frame, "messages")) {
output += "\r\n                            ";
frame = frame.push();
var t_9 = runtime.contextOrFrameLookup(context, frame, "messages");
if(t_9) {t_9 = runtime.fromIterator(t_9);
var t_8 = t_9.length;
for(var t_7=0; t_7 < t_9.length; t_7++) {
var t_10 = t_9[t_7];
frame.set("__pair", t_10);
frame.set("loop.index", t_7 + 1);
frame.set("loop.index0", t_7);
frame.set("loop.revindex", t_8 - t_7);
frame.set("loop.revindex0", t_8 - t_7 - 1);
frame.set("loop.first", t_7 === 0);
frame.set("loop.last", t_7 === t_8 - 1);
frame.set("loop.length", t_8);
var t_11;
t_11 = runtime.memberLookup((t_10),0);
frame.set("category", t_11, true);
if(frame.topLevel) {
context.setVariable("category", t_11);
}
if(frame.topLevel) {
context.addExport("category", t_11);
}
var t_12;
t_12 = runtime.memberLookup((t_10),1);
frame.set("message", t_12, true);
if(frame.topLevel) {
context.setVariable("message", t_12);
}
if(frame.topLevel) {
context.addExport("message", t_12);
}
output += "\r\n                                <div class=\"alert alert-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "category"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "message"), env.opts.autoescape);
output += "</div>\r\n                            ";
;
}
}
frame = frame.pop();
output += "\r\n                        ";
;
}
output += "\r\n                    \r\n                    <form method=\"POST\">\r\n                        <input type=\"hidden\" name=\"csrf_token\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "csrf_token"), env.opts.autoescape);
output += "\">\r\n                        <div class=\"form-group mb-3\">\r\n                            <label for=\"email\">Email</label>\r\n                            <input type=\"email\" id=\"email\" name=\"email\" class=\"form-control\" required>\r\n                        </div>\r\n                        <div class=\"form-group mb-3\">\r\n                            <label for=\"password\">Password</label>\r\n                            <input type=\"password\" id=\"password\" name=\"password\" class=\"form-control\" required>\r\n                        </div>\r\n                        <div class=\"d-grid gap-2\">\r\n                            <button type=\"submit\" class=\"btn btn-primary\">Sign in</button>\r\n                            <a href=\"";
output += runtime.suppressValue((lineno = 28, colno = 47, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["customer_register"])), env.opts.autoescape);
output += "\" class=\"btn btn-outline-primary\">Create an account</a>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["customer/product_detail.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "customer/product_detail.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\r\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\r\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\r\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("styles"))(env, context, frame, runtime, function(t_9,t_8) {
if(t_9) { cb(t_9); return; }
output += t_8;
output += "\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"product_name"), env.opts.autoescape);
output += " | XPharma";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\r\n<section class=\"product-detail py-5\"><div class=\"container\">\r\n  <a class=\"back-link\" href=\"";
output += runtime.suppressValue((lineno = 4, colno = 39, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["browse_products"])), env.opts.autoescape);
output += "\"><i class=\"fa-solid fa-arrow-left me-2\"></i><span data-ar=\"العودة للمنتجات\">Back to products</span></a>\r\n  <div class=\"product-layout mt-4\">\r\n    <div class=\"product-visual\">";
if(runtime.contextOrFrameLookup(context, frame, "info") && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "info")),"sheet")) {
output += "<div id=\"productGallery\" class=\"carousel slide product-gallery\" data-bs-touch=\"true\" data-bs-interval=\"false\"><div class=\"carousel-inner\"><div class=\"carousel-item active\"><div class=\"gallery-frame\"><img class=\"gallery-product\" src=\"";
output += runtime.suppressValue((lineno = 6, colno = 303, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["static",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "info")),"image")])), env.opts.autoescape);
output += "\" alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"product_name"), env.opts.autoescape);
output += "\"></div></div><div class=\"carousel-item\"><div class=\"gallery-frame\"><a href=\"";
output += runtime.suppressValue((lineno = 6, colno = 448, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["static",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "info")),"sheet")])), env.opts.autoescape);
output += "\" target=\"_blank\" rel=\"noopener\" aria-label=\"Open ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"product_name"), env.opts.autoescape);
output += " brochure\"><img class=\"gallery-brochure\" src=\"";
output += runtime.suppressValue((lineno = 6, colno = 605, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["static",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "info")),"sheet")])), env.opts.autoescape);
output += "\" alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"product_name"), env.opts.autoescape);
output += " product brochure\"></a></div></div></div><button class=\"gallery-arrow gallery-prev\" type=\"button\" data-bs-target=\"#productGallery\" data-bs-slide=\"prev\" aria-label=\"Previous image\"><i class=\"fa-solid fa-chevron-left\" aria-hidden=\"true\"></i></button><button class=\"gallery-arrow gallery-next\" type=\"button\" data-bs-target=\"#productGallery\" data-bs-slide=\"next\" aria-label=\"Next image\"><i class=\"fa-solid fa-chevron-right\" aria-hidden=\"true\"></i></button><div class=\"gallery-indicators\"><button type=\"button\" data-bs-target=\"#productGallery\" data-bs-slide-to=\"0\" class=\"active\" aria-current=\"true\" aria-label=\"Product image\"></button><button type=\"button\" data-bs-target=\"#productGallery\" data-bs-slide-to=\"1\" aria-label=\"Product brochure\"></button></div></div>";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "info") && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "info")),"image")) {
output += "<img src=\"";
output += runtime.suppressValue((lineno = 6, colno = 1471, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["static",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "info")),"image")])), env.opts.autoescape);
output += "\" alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"product_name"), env.opts.autoescape);
output += "\">";
;
}
else {
output += "<i class=\"fa-solid fa-spa\"></i>";
;
}
;
}
output += "</div>\r\n    <div class=\"product-copy\">\r\n      <p class=\"section-kicker\"";
if(runtime.contextOrFrameLookup(context, frame, "info")) {
output += " data-ar=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "info")),"category")),1), env.opts.autoescape);
output += "\"";
;
}
output += ">";
output += runtime.suppressValue((runtime.contextOrFrameLookup(context, frame, "info")?runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "info")),"category")),0):"XPharma product"), env.opts.autoescape);
output += "</p>\r\n      <h1 class=\"display-font\" data-ar=\"";
output += runtime.suppressValue((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"product_name_ar") || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"product_name")), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"product_name"), env.opts.autoescape);
output += "</h1>\r\n      ";
if(runtime.contextOrFrameLookup(context, frame, "info")) {
output += "<p class=\"product-intro\" data-ar=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "info")),"description")),1), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "info")),"description")),0), env.opts.autoescape);
output += "</p>";
;
}
else {
output += "<p class=\"product-intro\" data-ar=\"تواصل مع إكس فارما للحصول على معلومات المنتج.\">Contact XPharma for information about this product.</p>";
;
}
output += "\r\n      ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"product_id") == "XPH-203") {
output += "<p class=\"small text-secondary\" data-ar=\"الصورة توضح العبوة بحجم ٥٠ جم.\">Image shows the 50 g package.</p>";
;
}
output += "\r\n      <div class=\"product-meta\"><div><span data-ar=\"حجم العبوة\">Package size</span><strong><bdi>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"pack_size"), env.opts.autoescape);
output += "</bdi> <span data-ar=\"جم\">g</span></strong></div><div><span data-ar=\"السعر\">Price</span><strong><span data-ar=\"ج.م\">EGP</span> <bdi>";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.2f",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"unit_price")), env.opts.autoescape);
output += "</bdi></strong></div></div>\r\n      <a class=\"btn btn-primary btn-lg mt-4\" href=\"";
output += runtime.suppressValue((lineno = 13, colno = 61, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["reserve_product",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"product_id")])), env.opts.autoescape);
output += "\" data-ar=\"اطلب الآن\">Order now</a>\r\n    </div>\r\n  </div>\r\n";
if(runtime.contextOrFrameLookup(context, frame, "info") && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "info")),"sections")) {
output += "\r\n<div class=\"formula-section mt-5\">\r\n  <h2 class=\"display-font mb-3\" data-ar=\"تعرّف على التركيبة\">Explore the formula</h2>\r\n  <div class=\"formula-grid\">";
frame = frame.push();
var t_12 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "info")),"sections");
if(t_12) {t_12 = runtime.fromIterator(t_12);
var t_11 = t_12.length;
for(var t_10=0; t_10 < t_12.length; t_10++) {
var t_13 = t_12[t_10];
frame.set("__pair", t_13);
frame.set("loop.index", t_10 + 1);
frame.set("loop.index0", t_10);
frame.set("loop.revindex", t_11 - t_10);
frame.set("loop.revindex0", t_11 - t_10 - 1);
frame.set("loop.first", t_10 === 0);
frame.set("loop.last", t_10 === t_11 - 1);
frame.set("loop.length", t_11);
var t_14;
t_14 = runtime.memberLookup((t_13),0);
frame.set("title", t_14, true);
if(frame.topLevel) {
context.setVariable("title", t_14);
}
if(frame.topLevel) {
context.addExport("title", t_14);
}
var t_15;
t_15 = runtime.memberLookup((t_13),1);
frame.set("points", t_15, true);
if(frame.topLevel) {
context.setVariable("points", t_15);
}
if(frame.topLevel) {
context.addExport("points", t_15);
}
output += "<article class=\"formula-card\"><h3 data-ar=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "title")),1), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "title")),0), env.opts.autoescape);
output += "</h3><ul>";
frame = frame.push();
var t_18 = runtime.contextOrFrameLookup(context, frame, "points");
if(t_18) {t_18 = runtime.fromIterator(t_18);
var t_17 = t_18.length;
for(var t_16=0; t_16 < t_18.length; t_16++) {
var t_19 = t_18[t_16];
frame.set("__pair", t_19);
frame.set("loop.index", t_16 + 1);
frame.set("loop.index0", t_16);
frame.set("loop.revindex", t_17 - t_16);
frame.set("loop.revindex0", t_17 - t_16 - 1);
frame.set("loop.first", t_16 === 0);
frame.set("loop.last", t_16 === t_17 - 1);
frame.set("loop.length", t_17);
var t_20;
t_20 = runtime.memberLookup((t_19),0);
frame.set("english", t_20, true);
if(frame.topLevel) {
context.setVariable("english", t_20);
}
if(frame.topLevel) {
context.addExport("english", t_20);
}
var t_21;
t_21 = runtime.memberLookup((t_19),1);
frame.set("arabic", t_21, true);
if(frame.topLevel) {
context.setVariable("arabic", t_21);
}
if(frame.topLevel) {
context.addExport("arabic", t_21);
}
output += "<li data-ar=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "arabic"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "english"), env.opts.autoescape);
output += "</li>";
;
}
}
frame = frame.pop();
output += "</ul></article>";
;
}
}
frame = frame.pop();
output += "</div>\r\n</div>\r\n";
;
}
output += "\r\n";
if(runtime.contextOrFrameLookup(context, frame, "info")) {
output += "<aside class=\"detail-panel mt-5\"><p class=\"section-kicker\" data-ar=\"إرشادات الاستخدام\">Care guidance</p><h2 class=\"display-font h3\" data-ar=\"قبل الاستخدام\">Before use</h2><p class=\"mb-0\" data-ar=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "info")),"note")),1), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "info")),"note")),0), env.opts.autoescape);
output += "</p></aside>";
;
}
output += "\r\n</div></section>\r\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_styles(env, context, frame, runtime, cb) {
var lineno = 25;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "<style>.back-link{color:var(--teal);text-decoration:none;font-weight:700}.product-layout{display:grid;grid-template-columns:minmax(220px,.85fr) 1.15fr;gap:clamp(2rem,6vw,5rem);align-items:center}.product-visual{min-height:420px;border-radius:28px;background:#e8f6f4;display:grid;place-items:center;overflow:hidden}.product-visual img{height:380px;max-width:90%;object-fit:contain;mix-blend-mode:multiply}.product-visual i{font-size:5rem;color:var(--teal)}.product-copy h1{font-size:clamp(2.4rem,5vw,4rem)}.product-intro{font-size:1.12rem;line-height:1.75;color:var(--muted)}.product-meta{display:flex;gap:2rem;flex-wrap:wrap;padding:1.4rem 0;border-top:1px solid #ccdbdc;border-bottom:1px solid #ccdbdc}.product-meta div{display:flex;flex-direction:column;gap:.35rem}.product-meta div>span{color:var(--muted);font-size:.85rem}.detail-grid{display:grid;grid-template-columns:1.4fr 1fr;gap:1.5rem}.detail-panel{padding:2rem;background:var(--surface);border-radius:20px;box-shadow:0 12px 30px rgba(16,42,67,.07)}.detail-panel li{margin:.8rem 0}.detail-panel p,.detail-panel li{line-height:1.7}.detail-panel ul{padding-inline-start:1.3rem}.brochure-layout{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;align-items:start}.product-brochure img{display:block;width:min(100%,340px);height:auto;border:1px solid #dbe9e6;border-radius:10px}.formula-intro{max-width:760px}.formula-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.25rem}.formula-card{background:var(--surface);border:1px solid #dbe9e6;border-radius:18px;padding:1.5rem 1.7rem}.formula-card h3{font-size:1.15rem;font-weight:700;color:var(--teal);margin-bottom:1rem}.formula-card ul{padding-inline-start:1.25rem;margin:0}.formula-card li{line-height:1.7;margin:.55rem 0}.manufacturer-note{color:var(--muted);font-size:.9rem}.sheet-link{display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;padding:1.5rem;border-radius:18px;background:#eaf7f2}body.dark .product-visual{background:#102d38}body.dark .product-visual img{mix-blend-mode:normal}body.dark .detail-panel,body.dark .formula-card{background:#142532}body.dark .formula-card{border-color:#31505f}body.dark .formula-card h3{color:#80d8cd}body.dark .sheet-link{background:#102d38}body.dark .product-meta{border-color:#31505f}@media(max-width:767px){.product-layout,.detail-grid,.formula-grid,.brochure-layout{grid-template-columns:1fr}.product-visual{min-height:280px}.product-visual img{height:250px}}.product-gallery{width:100%;position:relative}.gallery-frame{height:420px;display:flex;align-items:center;justify-content:center;padding:1.5rem 3.5rem 2.5rem}.product-visual .gallery-brochure{display:block;height:360px;max-width:100%;object-fit:contain;mix-blend-mode:normal;border-radius:8px;box-shadow:0 8px 24px rgba(16,42,67,.16)}.gallery-arrow{position:absolute;top:50%;transform:translateY(-50%);border:0;border-radius:50%;width:38px;height:38px;background:rgba(255,255,255,.9);color:#087e8b;display:grid;place-items:center;z-index:2}.gallery-arrow:hover,.gallery-arrow:focus-visible{background:#087e8b;color:white}.gallery-prev{left:12px}.gallery-next{right:12px}.gallery-indicators{position:absolute;bottom:14px;left:0;right:0;display:flex;justify-content:center;gap:8px;z-index:2}.gallery-indicators button{width:9px;height:9px;padding:0;border:0;border-radius:50%;background:#a9c8c3}.gallery-indicators button.active{background:#087e8b}body.dark .gallery-arrow{background:#1c3c4a;color:#bcece4}body.dark .gallery-arrow:hover,body.dark .gallery-arrow:focus-visible{background:#80d8cd;color:#0b1720}@media(max-width:767px){.gallery-frame{height:280px}.product-visual .gallery-brochure{height:240px}}.product-gallery .gallery-arrow,.product-gallery .gallery-arrow:hover,.product-gallery .gallery-arrow:focus-visible,body.dark .product-gallery .gallery-arrow,body.dark .product-gallery .gallery-arrow:hover,body.dark .product-gallery .gallery-arrow:focus-visible{background:transparent;color:#087e8b;width:28px;height:34px;font-size:.85rem;border-radius:0}.product-gallery .gallery-arrow:hover,.product-gallery .gallery-arrow:focus-visible{color:#045b64}.product-gallery .gallery-arrow:focus-visible{outline:2px solid currentColor;outline-offset:1px}body.dark .product-gallery .gallery-arrow{color:#bcece4}body.dark .product-gallery .gallery-arrow:hover,body.dark .product-gallery .gallery-arrow:focus-visible{color:#fff}.product-gallery .gallery-arrow{width:24px;height:30px;font-size:.7rem}.product-gallery .gallery-prev{left:18px;right:auto}.product-gallery .gallery-next{right:18px;left:auto}.product-visual{min-width:0;grid-template-columns:minmax(0,1fr)}.product-gallery{min-width:0;width:100%;max-width:100%}.product-gallery .carousel-inner,.product-gallery .carousel-item{width:100%;min-width:0}.gallery-frame{min-width:0}.product-gallery .gallery-arrow{z-index:5}.product-gallery .gallery-prev{left:calc(10% - 35px);right:auto}.product-gallery .gallery-next{right:10%;left:auto}</style>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
b_styles: b_styles,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["customer/register.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "customer/register.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("scripts"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 28;
var output = "";
try {
var frame = frame.push(true);
output += "<div class=\"container py-5\"><div class=\"row justify-content-center\"><div class=\"col-md-7\"><div class=\"card shadow\"><div class=\"card-body p-4 p-md-5\"><p class=\"section-kicker text-center\">Reserve with ease</p><h2 class=\"display-font text-center mb-4\">Create your XPharma account</h2><form method=\"POST\" onsubmit=\"return validateForm()\"><input type=\"hidden\" name=\"csrf_token\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "csrf_token"), env.opts.autoescape);
output += "\"><div class=\"row g-3\"><div class=\"col-md-6\"><label class=\"form-label\" for=\"fname\">First Name</label><input type=\"text\" id=\"fname\" name=\"fname\" class=\"form-control\" required></div><div class=\"col-md-6\"><label class=\"form-label\" for=\"lname\">Last Name</label><input type=\"text\" id=\"lname\" name=\"lname\" class=\"form-control\" required></div></div><div class=\"mt-3\"><label class=\"form-label\" for=\"email\">Email</label><input type=\"email\" id=\"email\" name=\"email\" class=\"form-control\" required></div><div class=\"mt-3\"><label class=\"form-label\" for=\"phone\">Phone Number (11 digits)</label><input type=\"tel\" id=\"phone\" name=\"phone\" class=\"form-control\" pattern=\"[0-9]{11}\" maxlength=\"11\" required><small class=\"text-muted\">Phone number must be exactly 11 digits</small></div><div class=\"mt-3\"><label class=\"form-label\" for=\"city\" data-ar=\"المدينة\">City</label><input type=\"text\" id=\"city\" name=\"city\" class=\"form-control\" maxlength=\"100\" autocomplete=\"address-level2\" value=\"";
output += runtime.suppressValue((lineno = 0, colno = 1414, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "request")),"form"),"city",""])), env.opts.autoescape);
output += "\" required></div><div class=\"mt-3\"><label class=\"form-label\" for=\"address\" data-ar=\"العنوان التفصيلي\">Full address</label><textarea id=\"address\" name=\"address\" class=\"form-control\" rows=\"3\" maxlength=\"500\" autocomplete=\"street-address\" required>";
output += runtime.suppressValue((lineno = 0, colno = 1697, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "request")),"form"),"address",""])), env.opts.autoescape);
output += "</textarea><small class=\"text-muted\" data-ar=\"أدخل الشارع ورقم المبنى والشقة وأي تفاصيل تساعد في تحديد موقعك.\">Include the street, building, apartment and any details needed to locate you.</small></div><div class=\"mt-3\"><label class=\"form-label\" for=\"password\">Password</label><input type=\"password\" id=\"password\" name=\"password\" class=\"form-control\" minlength=\"8\" required><small class=\"text-muted\">At least 8 characters, with uppercase, lowercase, and numbers</small></div><p class=\"text-secondary mt-4\" data-ar=\"سنرسل رمز التحقق إلى بريدك الإلكتروني لتفعيل حسابك.\">We’ll send a verification code to your email to activate your account.</p><div class=\"d-grid gap-2 mt-4\"><button type=\"submit\" class=\"btn btn-primary\">Create account and send code</button><a href=\"";
output += runtime.suppressValue((lineno = 0, colno = 2504, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["customer_login"])), env.opts.autoescape);
output += "\" class=\"btn btn-outline-primary\">Already have an account?</a></div></form></div></div></div></div></div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_scripts(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 2647;
var output = "";
try {
var frame = frame.push(true);
output += "<script>function validateForm(){const p=document.getElementById('phone').value,pass=document.getElementById('password').value;if(!/^\\d{11}$/.test(p)){alert('Phone number must be exactly 11 digits');return false}if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$/.test(pass)){alert('Password must contain uppercase, lowercase, and numbers');return false}return true}</script>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
b_scripts: b_scripts,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["customer/reserve.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "﻿";
env.getTemplate("base.html", true, "customer/reserve.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("styles"))(env, context, frame, runtime, function(t_9,t_8) {
if(t_9) { cb(t_9); return; }
output += t_8;
output += "\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("scripts"))(env, context, frame, runtime, function(t_11,t_10) {
if(t_11) { cb(t_11); return; }
output += t_10;
output += "\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "Order ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"product_name"), env.opts.autoescape);
output += " | XPharma";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\n<section class=\"py-5\"><div class=\"container\"><div class=\"row justify-content-center\"><div class=\"col-lg-8\">\n  <a href=\"";
output += runtime.suppressValue((lineno = 4, colno = 21, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["browse_products"])), env.opts.autoescape);
output += "\" class=\"small text-decoration-none text-secondary\"><i class=\"fa-solid fa-arrow-left me-1\"></i><span data-ar=\"العودة إلى المنتجات\">Back to products</span></a>\n  <div class=\"card mt-3\"><div class=\"card-body p-4 p-md-5\">\n    ";
if(runtime.contextOrFrameLookup(context, frame, "info") && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "info")),"image")) {
output += "<div class=\"reservation-product-image\"><img src=\"";
output += runtime.suppressValue((lineno = 6, colno = 91, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["static",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "info")),"image")])), env.opts.autoescape);
output += "\" alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"product_name"), env.opts.autoescape);
output += "\" data-ar-alt=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"product_name_ar") || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"product_name"), env.opts.autoescape);
output += "\"></div>";
;
}
output += "\n    <p class=\"section-kicker\" data-ar=\"طلب للاستلام\">Collection order</p>\n    <h1 class=\"display-font h2\"><span data-ar=\"اطلب\">Order</span> <span data-ar=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"product_name_ar") || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"product_name"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"product_name"), env.opts.autoescape);
output += "</span></h1>\n    <p class=\"text-secondary\"><span data-ar=\"ج.م\">EGP</span> <bdi>";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.2f",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"unit_price")), env.opts.autoescape);
output += "</bdi> <span data-ar=\"للقطعة\">per item</span></p>\n    <form method=\"POST\" enctype=\"multipart/form-data\" class=\"mt-4\"><input type=\"hidden\" name=\"csrf_token\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "csrf_token"), env.opts.autoescape);
output += "\">\n      <div class=\"row g-3\"><div class=\"col-md-6\"><label class=\"form-label\" for=\"pickup_date\" data-ar=\"تاريخ الاستلام\">Collection date</label><input type=\"date\" id=\"pickup_date\" name=\"pickup_date\" class=\"form-control\" min=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "today"), env.opts.autoescape);
output += "\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "today"), env.opts.autoescape);
output += "\" required></div><div class=\"col-md-6\"><label class=\"form-label\" for=\"quantity\" data-ar=\"الكمية\">Quantity</label><input type=\"number\" id=\"quantity\" name=\"quantity\" class=\"form-control\" min=\"1\" value=\"1\" required></div></div>\n      <div class=\"mt-3\"><label class=\"form-label\" for=\"discount_code\" data-ar=\"كود الخصم\">Discount code</label><div class=\"input-group\"><input type=\"text\" id=\"discount_code\" class=\"form-control\" maxlength=\"40\" autocomplete=\"off\" placeholder=\"Enter code\"><input type=\"hidden\" id=\"applied_discount_code\" name=\"discount_code\" value=\"\"><button class=\"btn btn-outline-primary\" id=\"applyDiscount\" type=\"button\" data-ar=\"تطبيق\">Apply</button></div><div id=\"discountMessage\" class=\"form-text\" aria-live=\"polite\"></div></div>\n      <div class=\"total-bar mt-3\"><span data-ar=\"إجمالي الطلب\">Order total</span><strong id=\"orderTotal\"><span data-ar=\"ج.م\">EGP</span> <bdi id=\"orderTotalAmount\">";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.2f",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"unit_price")), env.opts.autoescape);
output += "</bdi></strong></div>\n      <fieldset class=\"mt-4\"><legend class=\"form-label fw-bold\" data-ar=\"طريقة الدفع\">Payment option</legend>\n        <div class=\"payment-option\"><input class=\"form-check-input\" type=\"radio\" name=\"payment_method\" id=\"cash\" value=\"cash\" checked><label for=\"cash\"><strong data-ar=\"الدفع عند الاستلام\">Cash on collection</strong><span data-ar=\"ادفع قيمة طلبك عند استلامه.\">Pay for your order when you collect it.</span></label></div>\n        <div class=\"payment-option\"><input class=\"form-check-input\" type=\"radio\" name=\"payment_method\" id=\"instapay\" value=\"instapay\"><label for=\"instapay\"><strong data-ar=\"تحويل عبر إنستاباي\">InstaPay transfer</strong><span data-ar=\"راجع المبلغ المطلوب في نافذة إنستاباي، ثم ارفع صورة عملية التحويل.\">Review the exact amount in the InstaPay checkout, then upload your transaction screenshot.</span><small class=\"instapay-account\"><bdi dir=\"ltr\" data-preserve-ltr>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "instapay_account"), env.opts.autoescape);
output += "</bdi></small></label></div>\n      </fieldset>\n      <div class=\"mb-4 d-none\" id=\"proofField\"><label class=\"form-label\" for=\"payment_proof\" data-ar=\"صورة تحويل إنستاباي\">InstaPay transaction screenshot</label><input type=\"file\" id=\"payment_proof\" name=\"payment_proof\" class=\"form-control\" accept=\"image/png,image/jpeg,image/webp\"><div class=\"form-text\" data-ar=\"PNG أو JPG أو JPEG أو WEBP · بحد أقصى ٥ ميجابايت\">PNG, JPG, JPEG, or WEBP · maximum 5 MB</div></div>\n      <div class=\"safety-note mb-4\"><i class=\"fa-solid fa-circle-info\"></i><div><strong data-ar=\"تأكيد الطلب\">Order confirmation</strong><br><span data-ar=\"تراجع إكس فارما توافر المنتجات وتحويلات إنستاباي. يُسجَّل الطلب بعد رفع الصورة بانتظار التحقق، ولا يؤكد ذلك الدفع تلقائياً.\">Availability and InstaPay transfers are reviewed by XPharma. Uploading a screenshot marks your order as pending verification; it does not automatically confirm payment.</span></div></div>\n      <button class=\"btn btn-primary w-100\"><span data-ar=\"تأكيد الطلب\">Place reservation</span> <i class=\"fa-solid fa-check ms-1\"></i></button>\n    </form>\n  </div></div>\n</div></div></div></section>\n<div class=\"modal fade\" id=\"instapayModal\" tabindex=\"-1\" aria-hidden=\"true\"><div class=\"modal-dialog modal-dialog-centered\"><div class=\"modal-content\">\n  <div class=\"modal-header\"><div><p class=\"section-kicker mb-1\" data-ar=\"الدفع عبر إنستاباي\">InstaPay checkout</p><h2 class=\"h4 mb-0\" data-ar=\"أكمل التحويل\">Complete your transfer</h2></div><button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\" data-ar-aria-label=\"إغلاق\"></button></div>\n  <div class=\"modal-body text-center\"><img class=\"instapay-qr\" src=\"";
output += runtime.suppressValue((lineno = 26, colno = 78, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["static","images/payments/instapay-mohamed-araby.jpeg"])), env.opts.autoescape);
output += "\" alt=\"XPharma InstaPay QR code\" data-ar-alt=\"رمز إنستاباي لإكس فارما\"><p class=\"text-secondary mt-3\" data-ar=\"امسح رمز الاستجابة السريع في إنستاباي، ثم أرسل المبلغ المحدد أدناه.\">Scan this QR code in InstaPay, then send the exact amount below.</p><div class=\"payment-total\" id=\"modalTotal\"><span data-ar=\"ج.م\">EGP</span> <bdi id=\"modalTotalAmount\">";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.2f",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"unit_price")), env.opts.autoescape);
output += "</bdi></div><div class=\"account-card\"><small data-ar=\"حساب إنستاباي\">InstaPay account</small><strong><bdi dir=\"ltr\" data-preserve-ltr>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "instapay_account"), env.opts.autoescape);
output += "</bdi></strong></div><p class=\"small text-secondary mb-0\" data-ar=\"بعد الدفع، أغلق هذه النافذة وارفع صورة عملية التحويل.\">After payment, close this window and upload your transaction screenshot.</p></div>\n  <div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-primary w-100\" data-bs-dismiss=\"modal\" data-ar=\"لقد أتممت التحويل\">I've made the transfer</button></div>\n</div></div></div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_styles(env, context, frame, runtime, cb) {
var lineno = 30;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "<style>.reservation-product-image{height:165px;display:grid;place-items:center;margin:0 0 1rem;border-radius:14px;background:linear-gradient(135deg,#f4fbf8,#e8f6f4);overflow:hidden}.reservation-product-image img{height:155px;max-width:100%;object-fit:contain;mix-blend-mode:multiply}.safety-note{display:flex;gap:.8rem;padding:1rem;background:#eaf7f2;border-radius:12px;color:#31566b;font-size:.9rem}.payment-option{display:flex;gap:.75rem;padding:1rem;border:1px solid #d6e0e5;border-radius:12px;margin-bottom:.75rem}.payment-option:has(input:checked){border-color:var(--teal);background:#f0fbf8}.payment-option label{display:flex;flex-direction:column;gap:.2rem;cursor:pointer}.payment-option span{color:#627d98;font-size:.9rem}.instapay-account{margin-top:.35rem;color:#087e8b;font-weight:700}.total-bar{display:flex;justify-content:space-between;padding:1rem;border-radius:12px;background:#102a43;color:#fff}.instapay-qr{width:min(100%,285px);border-radius:12px;border:1px solid #e1e7e8}.payment-total{font-size:2rem;font-weight:800;color:#087e8b;margin:1rem 0}.account-card{background:#f1f7f6;padding:1rem;border-radius:12px;margin:1rem 0;display:flex;flex-direction:column;gap:.3rem}.account-card small{color:#627d98}body.dark .reservation-product-image{background:#0c2634}body.dark .reservation-product-image img{mix-blend-mode:normal}body.dark .modal-content{background:#142532;color:#e7f1f5}body.dark .modal-header,body.dark .modal-footer{border-color:#31505f}body.dark .account-card{background:#0c2634}body.dark .btn-close{filter:invert(1)}</style>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_scripts(env, context, frame, runtime, cb) {
var lineno = 31;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "<script>\nconst instapay=document.getElementById('instapay'),cash=document.getElementById('cash'),proof=document.getElementById('proofField'),file=document.getElementById('payment_proof'),quantity=document.getElementById('quantity'),discountCode=document.getElementById('discount_code'),appliedCode=document.getElementById('applied_discount_code'),discountMessage=document.getElementById('discountMessage'),applyDiscount=document.getElementById('applyDiscount'),orderTotalAmount=document.getElementById('orderTotalAmount'),modalTotalAmount=document.getElementById('modalTotalAmount'),modal=new bootstrap.Modal(document.getElementById('instapayModal')),unitPrice=";
output += runtime.suppressValue(env.getFilter("tojson").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"unit_price")), env.opts.autoescape);
output += ",csrfToken=";
output += runtime.suppressValue(env.getFilter("tojson").call(context, runtime.contextOrFrameLookup(context, frame, "csrf_token")), env.opts.autoescape);
output += ",productId=";
output += runtime.suppressValue(env.getFilter("tojson").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"product_id")), env.opts.autoescape);
output += ";let discountPercent=0,discountState='',discountRequest=0,discountPending=false;\nconst orderNameEn=";
output += runtime.suppressValue(env.getFilter("tojson").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"product_name")), env.opts.autoescape);
output += ",orderNameAr=";
output += runtime.suppressValue(env.getFilter("tojson").call(context, (runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"product_name_ar") || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "product")),"product_name"))), env.opts.autoescape);
output += ";\nfunction showDiscountMessage(){const arabic=document.documentElement.lang==='ar';discountMessage.className='form-text '+(discountState==='applied'?'text-success':discountState?'text-danger':'');const messages={applied:arabic?`تم تطبيق خصم ${discountPercent}%.`:`${discountPercent}% discount applied.`,invalid:arabic?'كود الخصم غير صالح.':'This discount code is not valid.',error:arabic?'تعذر التحقق من كود الخصم.':'Could not validate the discount code.',apply:arabic?'يرجى تطبيق كود الخصم أولاً.':'Please apply the discount code first.'};discountMessage.textContent=messages[discountState]||''}\nfunction updateTotal(){const cents=Math.round(unitPrice*100)*Math.max(1,Number(quantity.value)||1),amount=((cents-Math.round(cents*discountPercent/100))/100).toFixed(2);orderTotalAmount.textContent=amount;modalTotalAmount.textContent=amount;translatePage(document.documentElement.lang);showDiscountMessage()}\nasync function applyCode(){const code=discountCode.value.trim().toUpperCase(),request=++discountRequest;appliedCode.value='';discountPercent=0;if(!code){discountState='';updateTotal();return}discountPending=true;applyDiscount.disabled=true;const form=new URLSearchParams({csrf_token:csrfToken,quantity:String(Math.max(1,Number(quantity.value)||1)),discount_code:code});try{const r=await fetch(`/customer/reserve/${encodeURIComponent(productId)}/discount`,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:form});const data=await r.json();if(request!==discountRequest)return;if(!r.ok)throw new Error('Discount check failed');discountPercent=data.valid?Number(data.percent):0;appliedCode.value=data.valid?code:'';discountState=data.valid?'applied':'invalid'}catch{if(request!==discountRequest)return;discountState='error'}finally{if(request===discountRequest){discountPending=false;applyDiscount.disabled=false;updateTotal()}}}\nfunction discountReady(){if(discountPending||(discountCode.value.trim()&&!appliedCode.value)){discountState='apply';showDiscountMessage();discountCode.focus();return false}return true}\nfunction toggleProof(){const show=instapay.checked;if(show&&!discountReady()){cash.checked=true;proof.classList.add('d-none');file.required=false;return}proof.classList.toggle('d-none',!show);file.required=show;if(show)modal.show()}\nfunction updateOrderTitle(){document.title=document.documentElement.lang==='ar'?'اطلب '+orderNameAr+' | XPharma':'Order '+orderNameEn+' | XPharma'}\nquantity.addEventListener('input',updateTotal);discountCode.addEventListener('input',()=>{discountRequest++;discountPending=false;applyDiscount.disabled=false;appliedCode.value='';discountPercent=0;discountState='';updateTotal()});applyDiscount.addEventListener('click',applyCode);discountCode.closest('form').addEventListener('submit',event=>{if(!discountReady())event.preventDefault()});instapay.addEventListener('change',toggleProof);cash.addEventListener('change',toggleProof);document.getElementById('languageToggle').addEventListener('click',()=>{updateOrderTitle();showDiscountMessage()});updateTotal();toggleProof();updateOrderTitle();\n</script>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
b_styles: b_styles,
b_scripts: b_scripts,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["customer/search.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "customer/search.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
output += "\r\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
output += "\r\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\r\n";
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("styles"))(env, context, frame, runtime, function(t_9,t_8) {
if(t_9) { cb(t_9); return; }
output += t_8;
output += "\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 1;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "Browse medicines | XPharma";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 2;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "\r\n";
var t_10;
t_10 = {"XPH-101": "images/products/blemease.png","XPH-203": "images/products/plantain.png","XPH-204": "images/products/plantain.png","XPH-312": "images/products/bronex.png"};
frame.set("product_images", t_10, true);
if(frame.topLevel) {
context.setVariable("product_images", t_10);
}
if(frame.topLevel) {
context.addExport("product_images", t_10);
}
output += "\r\n<section class=\"catalogue-head\"><div class=\"container\"><p class=\"section-kicker\">XPharma product collection</p><h1 class=\"display-font display-6\">Reserve your care essentials.</h1><p class=\"text-secondary mb-0\" data-ar=\"تصفح منتجات العناية بالبشرة والجسم والعافية.\">Browse skincare, body care, and wellness products.</p></div></section>\r\n<div class=\"container py-5\"><form class=\"filter-card row g-3 align-items-end mb-5\" method=\"GET\"><div class=\"col-md-6\"><label class=\"form-label\">Product name</label><input class=\"form-control\" name=\"product_name\" placeholder=\"e.g. Blemease Cream\" value=\"";
output += runtime.suppressValue((lineno = 5, colno = 262, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "request")),"args"),"product_name",""])), env.opts.autoescape);
output += "\"></div><div class=\"col-md-3\"><label class=\"form-label\">Maximum price</label><input type=\"number\" step=\"0.01\" min=\"0\" class=\"form-control\" name=\"max_price\" value=\"";
output += runtime.suppressValue((lineno = 5, colno = 471, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "request")),"args"),"max_price",""])), env.opts.autoescape);
output += "\"></div><div class=\"col-md-3\"><button class=\"btn btn-primary w-100\"><i class=\"fa-solid fa-magnifying-glass me-2\"></i>Search products</button></div></form>\r\n";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("customer/_product_cards.html", false, "customer/search.html", false, function(t_12,t_11) {
if(t_12) { cb(t_12); return; }
callback(null,t_11);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_14,t_13) {
if(t_14) { cb(t_14); return; }
callback(null,t_13);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
if(!runtime.contextOrFrameLookup(context, frame, "products")) {
output += "<div class=\"text-center empty py-5\"><i class=\"fa-solid fa-box-open\"></i><h2 class=\"h4 mt-3\">No products match that search.</h2><p class=\"text-secondary\">Try a shorter product name or remove the price filter.</p><a class=\"btn btn-primary\" href=\"";
output += runtime.suppressValue((lineno = 6, colno = 319, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["browse_products"])), env.opts.autoescape);
output += "\">View all products</a></div>";
;
}
output += "</div>\r\n";
cb(null, output);
});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_styles(env, context, frame, runtime, cb) {
var lineno = 8;
var colno = 3;
var output = "";
try {
var frame = frame.push(true);
output += "<style>.catalogue-head{padding:4rem 0 3rem;background:#eaf7f2}.filter-card{background:#fff;padding:1.25rem;border-radius:18px;box-shadow:0 12px 30px rgba(16,42,67,.07)}.medicine-card{height:100%;background:#fff;border-radius:18px;padding:1.5rem;box-shadow:0 12px 30px rgba(16,42,67,.07)}.medicine-card h2{font-size:1.25rem;font-weight:700}.medicine-icon{width:46px;height:46px;background:#eaf7f2;border-radius:12px;color:var(--teal);display:grid;place-items:center;margin-bottom:2rem}.medicine-product-image{height:150px;display:grid;place-items:center;margin:-.5rem 0 1.25rem;border-radius:14px;background:linear-gradient(135deg,#f4fbf8,#e8f6f4);overflow:hidden}.medicine-product-image img{height:142px;width:100%;object-fit:contain;mix-blend-mode:multiply}.price{color:var(--teal);font-weight:700;font-size:1.1rem}.availability{font-size:.85rem;color:#087e8b;font-weight:700}.empty i{font-size:3rem;color:#9ab0bb}body.dark .catalogue-head,body.dark .medicine-product-image{background:#0c2634}body.dark .filter-card,body.dark .medicine-card{background:#142532}body.dark .medicine-product-image img{mix-blend-mode:normal}</style>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
b_styles: b_styles,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["customer/verify.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "customer/verify.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("title"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_title(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 28;
var output = "";
try {
var frame = frame.push(true);
output += "Verify account | XPharma";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 83;
var output = "";
try {
var frame = frame.push(true);
output += "<div class=\"container py-5\"><div class=\"row justify-content-center\"><div class=\"col-md-6\"><div class=\"card shadow\"><div class=\"card-body p-4 p-md-5\"><p class=\"section-kicker text-center\">One last step</p><h1 class=\"display-font h2 text-center\">Verify your account</h1><p class=\"text-secondary text-center\"><span data-ar=\"أدخل الرمز المكون من ستة أرقام المرسل إلى\">Enter the six-digit code sent to</span> <bdi>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "email"), env.opts.autoescape);
output += "</bdi>. <span data-ar=\"تنتهي صلاحية الرمز بعد ١٠ دقائق.\">Codes expire after 10 minutes.</span></p><form method=\"POST\"><input type=\"hidden\" name=\"csrf_token\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "csrf_token"), env.opts.autoescape);
output += "\"><label class=\"form-label\" for=\"code\">Verification code</label><input class=\"form-control form-control-lg text-center\" id=\"code\" name=\"code\" inputmode=\"numeric\" pattern=\"[0-9]{6}\" maxlength=\"6\" required><button class=\"btn btn-primary w-100 mt-4\">Verify account</button></form><form method=\"POST\" action=\"";
output += runtime.suppressValue((lineno = 0, colno = 1014, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["resend_verification"])), env.opts.autoescape);
output += "\" class=\"mt-3\"><input type=\"hidden\" name=\"csrf_token\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "csrf_token"), env.opts.autoescape);
output += "\"><button class=\"btn btn-link w-100\" type=\"submit\"><span data-ar=\"إعادة إرسال الرمز\">Resend code</span></button></form></div></div></div></div></div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_title: b_title,
b_content: b_content,
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["customer/_assistant.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"xp-assistant\" id=\"xpAssistant\">\n  <section class=\"xp-chat\" id=\"xpChat\" aria-labelledby=\"xpChatTitle\" hidden>\n    <header class=\"xp-chat-header\">\n      <span class=\"xp-robot xp-robot-small\" aria-hidden=\"true\"><span class=\"xp-robot-face\"><i></i><i></i></span></span>\n      <div><h2 id=\"xpChatTitle\" data-ar=\"مساعد إكس فارما\">XPharma assistant</h2><p data-ar=\"معلومات عن منتجاتنا والموقع\">Here to help with our products and site</p></div>\n      <button type=\"button\" id=\"xpChatClose\" class=\"xp-chat-close\" aria-label=\"Close assistant\" data-ar-aria-label=\"إغلاق المساعد\"><i class=\"fa-solid fa-xmark\" aria-hidden=\"true\"></i></button>\n    </header>\n    <div class=\"xp-chat-body\">\n      <div class=\"xp-chat-message xp-chat-welcome\" data-ar=\"أهلاً! اسألني عن إكس فارما، منتجاتنا أو كيفية الطلب.\">Hello! Ask me about XPharma, our products or how to order.</div>\n      <p class=\"xp-chat-note\" data-ar=\"مساعد يعمل بالذكاء الاصطناعي، وليس بديلاً عن الصيدلي. تجنب مشاركة المعلومات الشخصية أو الصحية.\">AI assistant, not a substitute for a pharmacist. Avoid sharing personal or health details.</p>\n      <div class=\"xp-chat-suggestions\" aria-label=\"Suggested questions\" data-ar-aria-label=\"أسئلة مقترحة\">\n        <button type=\"button\" data-question-en=\"How do I order products?\" data-question-ar=\"كيف أطلب المنتجات؟\" data-ar=\"كيف أطلب؟\">How do I order?</button>\n        <button type=\"button\" data-question-en=\"What is Blemease?\" data-question-ar=\"ما هو بليمييز؟\" data-ar=\"ما هو بليمييز؟\">What is Blemease?</button>\n      </div>\n      <div id=\"xpChatMessages\" class=\"xp-chat-messages\" aria-live=\"polite\" data-preserve-ltr></div>\n    </div>\n    <form id=\"xpChatForm\" class=\"xp-chat-form\"><input type=\"hidden\" name=\"csrf_token\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "csrf_token"), env.opts.autoescape);
output += "\"><label class=\"visually-hidden\" for=\"xpChatInput\" data-ar=\"رسالتك\">Your message</label><input id=\"xpChatInput\" type=\"text\" maxlength=\"600\" autocomplete=\"off\" placeholder=\"Ask a question...\" data-chat-placeholder required><button type=\"submit\" id=\"xpChatSend\" aria-label=\"Send message\" data-ar-aria-label=\"إرسال الرسالة\"><i class=\"fa-solid fa-arrow-up\" aria-hidden=\"true\"></i></button></form>\n  </section>\n  <button type=\"button\" class=\"xp-chat-launch\" id=\"xpChatLaunch\" aria-expanded=\"false\" aria-controls=\"xpChat\" aria-label=\"Open XPharma assistant\" data-ar-aria-label=\"افتح مساعد إكس فارما\"><span class=\"xp-robot\" aria-hidden=\"true\"><span class=\"xp-robot-face\"><i></i><i></i></span></span><span class=\"xp-launch-text\" data-ar=\"اسأل إكس فارما\">Ask XPharma</span><span class=\"xp-launch-status\" aria-hidden=\"true\"></span></button>\n</div>\n<link rel=\"stylesheet\" href=\"";
output += runtime.suppressValue((lineno = 20, colno = 39, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["static","css/assistant.css"])), env.opts.autoescape);
output += "\">\n<script defer src=\"";
output += runtime.suppressValue((lineno = 21, colno = 29, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["static","js/assistant.js"])), env.opts.autoescape);
output += "\"></script>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["customer/_mobile_orders.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"d-md-none\">\r\n  ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "reservations");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("reservation", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\r\n  <article class=\"card order-card mb-3\">\r\n    <div class=\"d-flex justify-content-between align-items-start gap-2\">\r\n      <h2 class=\"h5 mb-0\"><span data-ar=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"product_name_ar") || runtime.memberLookup((t_4),"product_name"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"product_name"), env.opts.autoescape);
output += "</span></h2>\r\n      ";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("customer/_order_status.html", false, "customer/_mobile_orders.html", false, function(t_6,t_5) {
if(t_6) { cb(t_6); return; }
callback(null,t_5);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_8,t_7) {
if(t_8) { cb(t_8); return; }
callback(null,t_7);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\r\n    </div>\r\n    <dl>\r\n      <dt data-ar=\"الكمية\">Quantity</dt><dd><bdi>";
output += runtime.suppressValue(runtime.memberLookup((t_4),"quantity"), env.opts.autoescape);
output += "</bdi></dd>\r\n      <dt data-ar=\"الاستلام\">Collection</dt><dd><bdi>";
output += runtime.suppressValue(env.getFilter("date_display").call(context, runtime.memberLookup((t_4),"pickup_date")), env.opts.autoescape);
output += "</bdi></dd>\r\n      <dt data-ar=\"الدفع\">Payment</dt><dd><span class=\"text-capitalize\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"payment_method"), env.opts.autoescape);
output += "</span><small class=\"d-block text-secondary\"><span data-ar=\"";
output += runtime.suppressValue(runtime.memberLookup(((lineno = 10, colno = 173, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.contextOrFrameLookup(context, frame, "payment_labels"),runtime.memberLookup((t_4),"payment_status"),[runtime.memberLookup((t_4),"payment_status"),runtime.memberLookup((t_4),"payment_status")]]))),1), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup(((lineno = 10, colno = 289, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.contextOrFrameLookup(context, frame, "payment_labels"),runtime.memberLookup((t_4),"payment_status"),[runtime.memberLookup((t_4),"payment_status"),runtime.memberLookup((t_4),"payment_status")]]))),0), env.opts.autoescape);
output += "</span></small></dd>\r\n      <dt data-ar=\"الإجمالي\">Total</dt><dd><span data-ar=\"ج.م\">EGP</span> <bdi>";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.2f",runtime.memberLookup((t_4),"price")), env.opts.autoescape);
output += "</bdi></dd>\r\n    </dl>\r\n    ";
var t_9;
t_9 = "mobile";
frame.set("proof_suffix", t_9, true);
if(frame.topLevel) {
context.setVariable("proof_suffix", t_9);
}
if(frame.topLevel) {
context.addExport("proof_suffix", t_9);
}
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("customer/_replace_proof.html", false, "customer/_mobile_orders.html", false, function(t_11,t_10) {
if(t_11) { cb(t_11); return; }
callback(null,t_10);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_13,t_12) {
if(t_13) { cb(t_13); return; }
callback(null,t_12);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "\n    ";
if(runtime.memberLookup((t_4),"status") == "active") {
output += "<form method=\"POST\" action=\"";
output += runtime.suppressValue((lineno = 14, colno = 81, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["cancel_reservation",runtime.memberLookup((t_4),"reservation_id")])), env.opts.autoescape);
output += "\"><input type=\"hidden\" name=\"csrf_token\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "csrf_token"), env.opts.autoescape);
output += "\"><button class=\"btn btn-outline-danger w-100\" onclick=\"return confirm('Cancel this product reservation?')\" data-ar=\"إلغاء الحجز\">Cancel reservation</button></form>";
;
}
output += "\r\n  </article>\r\n  ";
})});
}
}
frame = frame.pop();
output += "\r\n</div>\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["customer/_order_status.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "﻿";
var t_1;
t_1 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "reservation")),"status");
frame.set("display_status", t_1, true);
if(frame.topLevel) {
context.setVariable("display_status", t_1);
}
if(frame.topLevel) {
context.addExport("display_status", t_1);
}
output += "\n";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "reservation")),"status") == "active" && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "reservation")),"payment_method") == "instapay") {
output += "\n  ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "reservation")),"payment_status") == "pending_verification") {
var t_2;
t_2 = "pending_verification";
frame.set("display_status", t_2, true);
if(frame.topLevel) {
context.setVariable("display_status", t_2);
}
if(frame.topLevel) {
context.addExport("display_status", t_2);
}
output += "\n  ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "reservation")),"payment_status") == "rejected") {
var t_3;
t_3 = "rejected";
frame.set("display_status", t_3, true);
if(frame.topLevel) {
context.setVariable("display_status", t_3);
}
if(frame.topLevel) {
context.addExport("display_status", t_3);
}
;
}
;
}
output += "\n";
;
}
output += "\n<span class=\"badge ";
if(runtime.contextOrFrameLookup(context, frame, "display_status") == "active") {
output += "text-bg-success";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "display_status") == "pending_verification") {
output += "text-bg-warning text-dark";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "display_status") == "rejected") {
output += "text-bg-danger";
;
}
else {
output += "text-bg-secondary";
;
}
;
}
;
}
output += "\"><span data-ar=\"";
output += runtime.suppressValue(runtime.memberLookup(((lineno = 5, colno = 262, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.contextOrFrameLookup(context, frame, "order_labels"),runtime.contextOrFrameLookup(context, frame, "display_status"),[runtime.contextOrFrameLookup(context, frame, "display_status"),runtime.contextOrFrameLookup(context, frame, "display_status")]]))),1), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup(((lineno = 5, colno = 340, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.contextOrFrameLookup(context, frame, "order_labels"),runtime.contextOrFrameLookup(context, frame, "display_status"),[runtime.contextOrFrameLookup(context, frame, "display_status"),runtime.contextOrFrameLookup(context, frame, "display_status")]]))),0), env.opts.autoescape);
output += "</span></span>\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["customer/_product_cards.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
var t_1;
t_1 = {"XPH-101": "بليمييز كريم","XPH-203": "بلانتين كريم","XPH-204": "بلانتين كريم","XPH-312": "برونكس جل للمساج"};
frame.set("product_names", t_1, true);
if(frame.topLevel) {
context.setVariable("product_names", t_1);
}
if(frame.topLevel) {
context.addExport("product_names", t_1);
}
output += "\r\n";
var t_2;
t_2 = {"XPH-101": ["Acne-prone skin","للبشرة المعرضة للحبوب"],"XPH-203": ["Dry skin care","للبشرة الجافة"],"XPH-204": ["Dry skin care","للبشرة الجافة"],"XPH-312": ["Muscle and joint care","للعناية بالعضلات والمفاصل"]};
frame.set("purposes", t_2, true);
if(frame.topLevel) {
context.setVariable("purposes", t_2);
}
if(frame.topLevel) {
context.addExport("purposes", t_2);
}
output += "\r\n<div class=\"row g-4\">";
frame = frame.push();
var t_5 = runtime.contextOrFrameLookup(context, frame, "products");
if(t_5) {t_5 = runtime.fromIterator(t_5);
var t_4 = t_5.length;
for(var t_3=0; t_3 < t_5.length; t_3++) {
var t_6 = t_5[t_3];
frame.set("product", t_6);
frame.set("loop.index", t_3 + 1);
frame.set("loop.index0", t_3);
frame.set("loop.revindex", t_4 - t_3);
frame.set("loop.revindex0", t_4 - t_3 - 1);
frame.set("loop.first", t_3 === 0);
frame.set("loop.last", t_3 === t_4 - 1);
frame.set("loop.length", t_4);
var t_7;
t_7 = (lineno = 2, colno = 70, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.contextOrFrameLookup(context, frame, "product_info"),runtime.memberLookup((t_6),"product_id")]));
frame.set("info", t_7, true);
if(frame.topLevel) {
context.setVariable("info", t_7);
}
if(frame.topLevel) {
context.addExport("info", t_7);
}
output += "<div class=\"col-sm-6 col-lg-3\"><article class=\"medicine-card\">\r\n  <a class=\"medicine-product-image\" href=\"";
output += runtime.suppressValue((lineno = 3, colno = 52, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["product_detail",runtime.memberLookup((t_6),"product_id")])), env.opts.autoescape);
output += "\">";
if(runtime.contextOrFrameLookup(context, frame, "info") && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "info")),"image")) {
output += "<img src=\"";
output += runtime.suppressValue((lineno = 3, colno = 143, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["static",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "info")),"image")])), env.opts.autoescape);
output += "\" alt=\"";
output += runtime.suppressValue(runtime.memberLookup((t_6),"product_name"), env.opts.autoescape);
output += "\">";
;
}
else {
output += "<i class=\"fa-solid fa-spa\" aria-hidden=\"true\"></i>";
;
}
output += "</a>\r\n  <p class=\"medicine-purpose\" data-ar=\"";
output += runtime.suppressValue(runtime.memberLookup((t_6),"purpose_ar") || runtime.memberLookup((t_6),"purpose_en") || runtime.memberLookup(((lineno = 4, colno = 92, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.contextOrFrameLookup(context, frame, "purposes"),runtime.memberLookup((t_6),"product_id"),["Skin care","للعناية بالبشرة"]]))),1), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_6),"purpose_en") || runtime.memberLookup((t_6),"purpose_ar") || runtime.memberLookup(((lineno = 4, colno = 217, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "lookup"), "lookup", context, [runtime.contextOrFrameLookup(context, frame, "purposes"),runtime.memberLookup((t_6),"product_id"),["Skin care","للعناية بالبشرة"]]))),0), env.opts.autoescape);
output += "</p>\r\n  <h3><a href=\"";
output += runtime.suppressValue((lineno = 5, colno = 25, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["product_detail",runtime.memberLookup((t_6),"product_id")])), env.opts.autoescape);
output += "\"><span data-ar=\"";
output += runtime.suppressValue((runtime.memberLookup((t_6),"product_name_ar") || runtime.memberLookup((t_6),"product_name")), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_6),"product_name"), env.opts.autoescape);
output += "</span> <small><bdi>";
output += runtime.suppressValue(runtime.memberLookup((t_6),"pack_size"), env.opts.autoescape);
output += "</bdi> <span data-ar=\"جم\">g</span></small></a></h3>\r\n  <p class=\"medicine-price\"><span data-ar=\"ج.م\">EGP</span> <bdi>";
output += runtime.suppressValue(env.getFilter("format").call(context, "%.2f",runtime.memberLookup((t_6),"unit_price")), env.opts.autoescape);
output += "</bdi></p>\r\n  <div class=\"product-actions\"><a href=\"";
output += runtime.suppressValue((lineno = 7, colno = 50, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["product_detail",runtime.memberLookup((t_6),"product_id")])), env.opts.autoescape);
output += "\" data-ar=\"تفاصيل المنتج\">View product details</a><span aria-hidden=\"true\">/</span><a href=\"";
output += runtime.suppressValue((lineno = 7, colno = 193, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "url_for"), "url_for", context, ["reserve_product",runtime.memberLookup((t_6),"product_id")])), env.opts.autoescape);
output += "\" data-ar=\"اطلب الآن\">Order</a></div>\r\n</article></div>";
;
}
}
frame = frame.pop();
output += "</div>\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["customer/_replace_proof.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "﻿";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "reservation")),"status") == "active" && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "reservation")),"payment_method") == "instapay" && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "reservation")),"payment_status") == "rejected") {
output += "\n<form method=\"post\" enctype=\"multipart/form-data\" action=\"/customer/reservation/";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "reservation")),"reservation_id"), env.opts.autoescape);
output += "/payment-proof\" class=\"mt-3\">\n  <input type=\"hidden\" name=\"csrf_token\" value=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "csrf_token"), env.opts.autoescape);
output += "\">\n  <label for=\"proof-";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "reservation")),"reservation_id"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "proof_suffix"), env.opts.autoescape);
output += "\" class=\"form-label small\" data-ar=\"ارفع صورة جديدة لإثبات الدفع\">Upload a new payment screenshot</label>\n  <input id=\"proof-";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "reservation")),"reservation_id"), env.opts.autoescape);
output += "-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "proof_suffix"), env.opts.autoescape);
output += "\" type=\"file\" name=\"payment_proof\" class=\"form-control form-control-sm mb-2\" accept=\"image/png,image/jpeg,image/webp\" required>\n  <button class=\"btn btn-outline-primary btn-sm\" data-ar=\"إرسال للمراجعة\">Submit for review</button>\n</form>\n";
;
}
output += "\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["index.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
env.getTemplate("base.html", true, "index.html", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
parentTemplate = t_2
for(var t_1 in parentTemplate.blocks) {
context.addBlock(t_1, parentTemplate.blocks[t_1]);
}
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("content"))(env, context, frame, runtime, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
output += t_4;
(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : context.getBlock("styles"))(env, context, frame, runtime, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
output += t_6;
output += "\r\n";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_content(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 28;
var output = "";
try {
var frame = frame.push(true);
output += "\r\n<section class=\"hero\"><div class=\"container\"><div class=\"row align-items-center g-5\"><div class=\"col-lg-7\"><p class=\"section-kicker\">Made in Egypt · Alexandria</p><h1 class=\"display-font display-3 fw-bold\">Everyday care, thoughtfully made.</h1><p class=\"lead text-secondary my-4\">Discover XPharma cosmetics, skincare, and dietary supplements—then reserve products for collection at a time that works for you.</p><div class=\"d-flex flex-wrap gap-4 mt-5 trust\"><span><i class=\"fa-solid fa-circle-check\"></i> Egyptian health & beauty brand</span><span><i class=\"fa-solid fa-spa\"></i> Skin and body care</span></div></div><div class=\"col-lg-5\"><div class=\"hero-card\"><div class=\"hero-icon\"><i class=\"fa-solid fa-spa\"></i></div><p class=\"section-kicker\">Our collection</p><h2 class=\"display-font h1\">Care, from head to toe.</h2><ol><li>Targeted skincare solutions.</li><li>Soothing skin and body-care products.</li><li>Dietary supplements for everyday wellness.</li></ol></div></div></div></div></section>\r\n<section id=\"products\" class=\"py-5\"><div class=\"container py-lg-4\"><p class=\"section-kicker\" data-ar=\"مجموعة إكس فارما\">The XPharma collection</p><h2 class=\"display-font mb-4\" data-ar=\"تسوق منتجاتنا\">Shop our products</h2>";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("customer/_product_cards.html", false, "index.html", false, function(t_9,t_8) {
if(t_9) { cb(t_9); return; }
callback(null,t_8);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_11,t_10) {
if(t_11) { cb(t_11); return; }
callback(null,t_10);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
output += "</div></section>\r\n<section id=\"services\" class=\"py-5\"><div class=\"container py-lg-4\"><p class=\"section-kicker text-center\">XPharma essentials</p><h2 class=\"display-font text-center mb-5\">Purposeful products for everyday wellbeing</h2><div class=\"row g-4\"><div class=\"col-md-4\"><article class=\"service-card\"><i class=\"fa-solid fa-droplet\"></i><h3>Skincare</h3><p>Focused formulas developed for skin-care routines, including acne-prone and dry skin needs.</p></article></div><div class=\"col-md-4\"><article class=\"service-card\"><i class=\"fa-solid fa-person-walking\"></i><h3>Body care</h3><p>Topical care products made for moments when your body needs a little extra comfort.</p></article></div><div class=\"col-md-4\"><article class=\"service-card\"><i class=\"fa-solid fa-leaf\"></i><h3>Supplements</h3><p>Dietary supplements designed to support a considered everyday wellness routine.</p></article></div></div></div></section>\r\n";
cb(null, output);
});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
function b_styles(env, context, frame, runtime, cb) {
var lineno = 4;
var colno = 17;
var output = "";
try {
var frame = frame.push(true);
output += "<style>.hero{padding:6.5rem 0 5rem;background:radial-gradient(circle at 88% 18%,#c9f2e8 0,transparent 29%),linear-gradient(135deg,#fff 0%,#f3fbf8 100%)}.hero h1{max-width:650px}.trust{font-size:.9rem;font-weight:600;color:#466270}.trust i{color:var(--teal)}.hero-card{background:var(--ink);color:white;padding:2.5rem;border-radius:28px;box-shadow:0 24px 55px rgba(16,42,67,.24)}.hero-card ol{padding-left:1.2rem}.hero-card li{padding:.3rem 0;color:#d5e4e6}.hero-icon{width:62px;height:62px;border-radius:18px;display:grid;place-items:center;background:var(--coral);font-size:1.6rem;margin-bottom:2rem}.notice{background:rgba(255,255,255,.1);padding:.8rem;border-radius:10px;font-size:.85rem}.service-card{height:100%;padding:2rem;background:#fff;border-radius:18px;box-shadow:0 12px 30px rgba(16,42,67,.07)}.service-card>i{color:var(--teal);font-size:1.6rem;margin-bottom:1.4rem}.service-card h3{font-size:1.2rem;font-weight:700}.service-card p{color:var(--muted);margin:0}.how{background:#eaf7f2}.step{padding:1.25rem;border-radius:16px;background:#fff;display:flex;flex-direction:column;gap:1rem;height:100%;font-weight:700}.step b{font-size:1.8rem;color:var(--coral);font-family:'Playfair Display',serif}</style>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
b_content: b_content,
b_styles: b_styles,
root: root
};

})();
})();

export default window.nunjucksPrecompiled;
