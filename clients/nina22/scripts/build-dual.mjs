import {cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const dist=resolve(root,'dist');
const requested=(process.argv[2]||'dual').toLowerCase();
if(!new Set(['dual','showcase','production']).has(requested)) throw new Error('Use dual, showcase or production');
const sourceEntries=['assets','data','scripts','template.html','package.json','README.md','robots.txt','index.html'];
const productionUrl='https://upravnik-zgrada-zlatibor.rs/';
function buildTarget(mode){
  const out=resolve(dist,mode); rmSync(out,{recursive:true,force:true}); mkdirSync(out,{recursive:true});
  for(const entry of sourceEntries){const src=resolve(root,entry);if(existsSync(src))cpSync(src,resolve(out,entry),{recursive:true});}
  const sitePath=resolve(out,'data/site.json'); const site=JSON.parse(readFileSync(sitePath,'utf8'));
  site.seo.productionUrl=productionUrl; site.seo.indexable=mode==='production'; writeFileSync(sitePath,JSON.stringify(site,null,2));
  const run=spawnSync(process.execPath,['scripts/build.mjs'],{cwd:out,encoding:'utf8'});
  if(run.status!==0){process.stderr.write(run.stdout||'');process.stderr.write(run.stderr||'');throw new Error(`${mode} build failed`);}
  for(const disposable of ['data','scripts','template.html','package.json','README.md'])rmSync(resolve(out,disposable),{recursive:true,force:true});
  console.log(`NINA 22 ${mode.toUpperCase()} ready: ${out}`);
}
if(requested==='dual'||requested==='showcase')buildTarget('showcase');
if(requested==='dual'||requested==='production')buildTarget('production');
