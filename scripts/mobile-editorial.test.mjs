import test from 'node:test';
import assert from 'node:assert/strict';
import {readingProgress,wordOpacity} from '../public/assets/motion/mobile-editorial.js';

test('scroll reveal starts at entry and is fully readable by the reading position',()=>{
  assert.equal(readingProgress(900,180,800),0);
  assert.equal(readingProgress(200,180,800),1);
  assert.ok(readingProgress(500,180,800)>0 && readingProgress(500,180,800)<1);
  assert.equal(readingProgress(200,600,800),1);
});
test('word order, readable baseline and full reveal',()=>{
  assert.equal(wordOpacity(0,0,20),.24);
  assert.ok(wordOpacity(.4,0,20)>wordOpacity(.4,19,20));
  for(let i=0;i<100;i++) assert.ok(Math.abs(wordOpacity(1,i,100)-1)<1e-10);
});
test('scroll progress never decreases when scrolling down',()=>{
  let prev=0;
  for(let top=900;top>=-100;top-=10){const p=readingProgress(top,300,800);assert.ok(p>=prev);prev=p;}
});
