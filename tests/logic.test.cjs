const { test } = require('node:test');
const assert = require('node:assert/strict');
const {normalizeUsers, compare} = require('../src/logic.js');
const u = (id,username) => ({id:String(id),username,fullName:username});

test('compara nao reciprocos e fans por ID', () => {
 const res=compare({following:[u(1,'ana'),u(2,'beto')],followers:[u(2,'beto'),u(3,'carla')],capturedAt:1},null,[]);
 assert.deepEqual(res.notFollowingBack.map(x=>x.id), ['1']);
 assert.deepEqual(res.fans.map(x=>x.id),['3']);
 assert.equal(res.lostFollowers.length,0);
});

test('detecta perda real na segunda analise e preserva historico', () => {
 const old={following:[u(1,'ana'),u(2,'beto')],followers:[u(1,'ana'),u(2,'beto')],capturedAt:100};
 const cur={following:[u(1,'ana'),u(2,'beto')],followers:[u(2,'beto')],capturedAt:200};
 const res=compare(cur,old,[]);
 assert.deepEqual(res.lostFollowers.map(x=>x.id),['1']);
 assert.equal(res.lostFollowers[0].firstDetectedAt,200);
 assert.equal(compare(cur,null,res.history).lostFollowers.length,1);
});

test('nao acusa quem nunca seguia', () => {
 const old={following:[u(1,'ana')],followers:[u(2,'beto')],capturedAt:100};
 const cur={following:[u(1,'ana')],followers:[u(2,'beto')],capturedAt:200};
 assert.deepEqual(compare(cur,old,[]).lostFollowers,[]);
});

test('nao lista ex-seguidor apos usuario deixar de seguir', () => {
 const previous={following:[u(1,'ana')],followers:[u(1,'ana')]};
 const cur={following:[],followers:[],capturedAt:200};
 const res=compare(cur,previous,[]);
 assert.equal(res.lostFollowers.length,0);
 assert.equal(res.history.length,1);
});

test('normaliza e valida; evita duplicatas e username falso', () => {
 const list=normalizeUsers([{pk_id:123,username:'ana'},{pk:'123',username:'ana_2'},{id:'bad',username:'xx'}, {id:'45',username:'../../x'}]);
 assert.deepEqual(list.map(x=>x.username),['ana_2']);
});

test('renomeacao da conta nao rompe comparacao por ID',()=>{
 const res=compare({following:[u(1,'ana_nova')],followers:[],capturedAt:300},{following:[u(1,'ana_antiga')],followers:[u(1,'ana_antiga')]},[]);
 assert.deepEqual(res.lostFollowers.map(x=>x.username),['ana_nova']);
});
