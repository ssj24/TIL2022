function Set() {
  this.dataStore = [];
  this.add = add;
  this.sortedAdd = sortedAdd;
  this.remove = remove;
  this.size = size;
  this.contains = contains;
  this.union = union;
  this.intersect = intersect;
  this.subset = subset;
  this.difference = difference;
  this.show = show;
}

function add(data) {
  if(this.dataStore.indexOf(data) < 0) {
    this.dataStore.push(data);
    return true;
  }
  else {
    return false;
  }
}
function sortedAdd(data) {
  pass
  // if(this.dataStore.indexOf(data) < 0) {
  //   for (let memeber of this.dataStore) {
  //     if (member > data)
  //   }
  //   return true;
  // }
  // else {
  //   return false;
  // }
}

function remove(data) {
  var pos = this.dataStore.indexOf(data);
  if(pos > -1) {
    this.dataStore.splice(pos, 1);
    return true;
  }
  else {
    return false;
  }
}

function contains(data) {
  if (this.dataStore.indexOf(data) > -1) {
    return true;
  } else return false;
}

function union(set) {
  const tempSet = new Set();
  for (let i=0; i<this.dataStore.length; ++i) {
    tempSet.add(this.dataStore[i]);
  }
  for (let i=0; i<set.dataStore.length; ++i) {
    if (!tempSet.contains(set.dataStore[i])) {
      tempSet.dataStore.push(set.dataStore[i]);
    }
  }
  return tempSet;
}

function intersect(set) {
  const tempSet = new Set();
  for (let i=0; i<this.dataStore.length; ++i) {
    if (set.contains(this.dataStore[i])) {
      tempSet.add(this.dataStore[i]);
    }
  }
  return tempSet;
}

function size() {
  return this.dataStore.length;
}

function subset(set) {
  if (this.size() > set.size()) return false;
  else {
    for (let member of this.dataStore) {
      if (!set.contains(member)) {
        return false;
      }
    }
  }
  return true;
}

function difference(set) {
  const tempSet = new Set();
  for (let i=0; i<this.dataStore.length; ++i) {
    if (!set.contains(this.dataStore[i])) {
      tempSet.add(this.dataStore[i]);
    }
  }
  return tempSet;
}

function show() {
  return this.dataStore;
}

const names = new Set();
names.add("Alice");
names.add("Bella");
names.add("Cooper");
names.add("David");
names.add("Earl");
if (names.add("Flyn")) {
  console.log("Flyn added")
} else {
 console.log("Flyn is in set already")
}
console.log(names.show());
let removed = "Cooper";
if (names.remove(removed)) {
  console.log(removed + " removed");
} else {
  console.log("Fail to remove " + removed);
}
names.add("Grace");
console.log(names.show());
removed = "Alice";
if (names.remove("Cooper")) {
  console.log(removed + " removed");
} else {
  console.log("Fail to remove " + removed);
}

const cis = new Set();
cis.add('a');
cis.add('b');
cis.add('c');
cis.add('d');
const dmp = new Set();
dmp.add('d');
dmp.add('e');
dmp.add('f');
let it = new Set();
it = cis.union(dmp);
let inter = cis.intersect(dmp);
console.log(it.show());
console.log(inter.show());
if (inter.subset(it)) {
  console.log("intersection is a subset of union");
} else {
  console.log("intersection is not a subset of union");
}
let diff = new Set();
dmp.add('g');
diff = it.difference(dmp);
console.log(`[${it.show()}] difference [${dmp.show()}] => [${diff.show()}]`);