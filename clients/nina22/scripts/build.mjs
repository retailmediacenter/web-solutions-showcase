// NINA 22 demo generator: no external packages. Node 18+.
// Data source: data/site.json + data/theme.json. Output: root index.html and assets/css/theme.css.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(resolve(root,'data/site.json'),'utf8'));
const theme = JSON.parse(readFileSync(resolve(root,'data/theme.json'),'utf8'));
const template = readFileSync(resolve(root,'template.html'),'utf8');
const esc = (value='') => String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const svg = icon => `<svg aria-hidden="true"><use href="#icon-${esc(icon)}"/></svg>`;
const btn = (name, text, icon, cls) => `<button type="button" class="${cls}" data-modal-title="${esc(name)}" data-modal-description="${esc(text)}" aria-label="Više informacija: ${esc(name)}">${icon}</button>`;
const nav = data.navigation.map(item=>`<a href="${esc(item.href)}">${esc(item.title)}</a>`).join('');
const services = data.services.map((s,i)=>`<button type="button" class="service-card reveal" data-modal-title="${esc(s.title)}" data-modal-description="${esc(s.detail)}" aria-label="Saznajte više: ${esc(s.title)}"><span class="service-card-top"><span class="service-icon">${svg(s.icon)}</span><span class="service-number">${esc(s.number||String(i+1).padStart(2,'0'))}</span></span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p><span class="card-more">Saznajte više ${svg('arrow')}</span></button>`).join('\n');
const highlights = data.highlights.items.map(h=>`<button type="button" class="highlight-card reveal" data-modal-title="${esc(h.title)}" data-modal-description="${esc(h.detail)}" aria-label="Detalji: ${esc(h.title)}"><span class="highlight-icon">${svg(h.icon)}</span><h3>${esc(h.title)}</h3><p>${esc(h.text)}</p><span class="card-more">Detaljnije ${svg('arrow')}</span></button>`).join('\n');
const trust = data.trust.map((t,i)=>`<div class="trust-item"><span class="trust-item-number">${String(i+1).padStart(2,'0')}</span><div><h3>${esc(t.title)}</h3><p>${esc(t.text)}</p></div></div>`).join('\n');
const bullets = data.deepCleaning.bullets.map(b=>`<li>${svg('check')}${esc(b)}</li>`).join('');
const choices = data.contact.serviceChoices.map(o=>`<option value="${esc(o)}">${esc(o)}</option>`).join('');
const title = data.hero.title;
// Keep brand phrase on separate highlighted line when the approved headline uses two sentences.
const dot = title.indexOf('. ');
const heading = dot >= 0 ? `${esc(title.slice(0,dot+1))}<span>${esc(title.slice(dot+2))}</span>` : esc(title);
const dictionary = {
  SEO_TITLE: data.seo.title, SEO_DESCRIPTION: data.seo.description,
  BRAND_NAME:data.brand.name, BRAND_REGION:data.brand.region, BRAND_TAGLINE:data.brand.tagline,
  NAV:nav,NAV_MOBILE:nav,HERO_TITLE:heading,HERO_DESCRIPTION:data.hero.description,HERO_PRIMARY:data.hero.primaryCta,HERO_SECONDARY:data.hero.secondaryCta,HERO_IMAGE:data.hero.image,HERO_IMAGE_ALT:data.hero.imageAlt,
  TRUST:trust,
  SERVICES_LABEL:data.servicesIntro.label,SERVICES_TITLE:data.servicesIntro.title,SERVICES_DESCRIPTION:data.servicesIntro.text,SERVICES:services,
  HIGHLIGHTS_LABEL:data.highlights.label,HIGHLIGHTS_TITLE:data.highlights.title,HIGHLIGHTS_TEXT:data.highlights.text,HIGHLIGHTS:highlights,
  WORK_LABEL:data.work.label,WORK_TITLE:data.work.title,WORK_TEXT:data.work.text,VIDEO_TITLE:data.work.videoTitle,VIDEO_SRC:data.work.video,VIDEO_POSTER:data.work.videoPoster,VIDEO_TEXT:data.work.videoDescription,PROMO_IMAGE:data.work.promoImage,PROMO_ALT:data.work.promoAlt,PROMO_NOTE:data.work.promoNote,
  CLEAN_LABEL:data.deepCleaning.label,CLEAN_TITLE:data.deepCleaning.title,CLEAN_TEXT:data.deepCleaning.text,CLEAN_BULLETS:bullets,CLEAN_CTA:data.deepCleaning.cta,
  ABOUT_LABEL:data.about.label,ABOUT_TITLE:data.about.title,ABOUT_TEXT:data.about.text,ABOUT_PERSON:data.about.person,ABOUT_ROLE:data.about.role,
  CONTACT_LABEL:data.contact.label,CONTACT_TITLE:data.contact.title,CONTACT_TEXT:data.contact.text,CONTACT_PHONE_LINK:data.contact.phoneE164,CONTACT_PHONE_DISPLAY:data.contact.phoneLabel,CONTACT_EMAIL:data.contact.email,CONTACT_INSTAGRAM:data.contact.instagram,CONTACT_LOCATION:data.contact.location,SERVICE_CHOICES:choices,
  FOOTER_NOTE:data.footer.disclaimer,FOOTER_CREDIT:data.footer.credit
};
const trustedHtml = new Set(['NAV','NAV_MOBILE','HERO_TITLE','TRUST','SERVICES','HIGHLIGHTS','CLEAN_BULLETS','SERVICE_CHOICES']);
let html = template.replace(/\{\{([A-Z_]+)\}\}/g,(token,key)=> {
  if(!(key in dictionary)) throw new Error(`Nepoznato polje u template.html: ${key}`);
  return trustedHtml.has(key)?dictionary[key]:esc(dictionary[key]);
});
if(/\{\{[A-Z_]+\}\}/.test(html)) throw new Error('Zaostali token u HTML šablonu');
const themeKeys = {navy:'navy',navyDark:'navyDark',navyMid:'navyMid',gold:'gold',goldLight:'goldLight',body:'body',muted:'muted',paper:'paper',ivory:'ivory',white:'white'};
const vars = Object.entries(themeKeys).map(([cssKey,jsonKey])=>{
 const color=theme[jsonKey]; if(!/^#[0-9a-fA-F]{6}$/.test(color)) throw new Error(`Neispravna HEX boja: ${jsonKey}`);
 return `  --${cssKey}: ${color};`;
}).join('\n');
writeFileSync(resolve(root,'assets/css/theme.css'),`:root {\n${vars}\n}\n`,'utf8');
writeFileSync(resolve(root,'index.html'),html,'utf8');
console.log('NINA22 DEMO BUILD OK – index.html + theme.css');
