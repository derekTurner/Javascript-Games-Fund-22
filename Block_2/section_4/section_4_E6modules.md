## Modules

Modules provide a way to separate code into separate files.  The internal variables and function in each file are independant.  Two files could use the same counter `itemCounter` and there would be no clash.  

To make functions or variables useable between files there is an export an import process.

### Export

Exports can either be performed on individual properties and methods from a file, or they can be gathered into a single export statement.

```javascript
// characters1.js
export const name = "Flash";
export const age = 2000;
export const ability= "generate a ligntening stike";
```
This can then be imported for use in a seperate module file. 

<div
  data-runkit
  data-runkit-evaluate-on-load="true"
  data-runkit-gutter-style="none"
  data-runkit-node-version="18"
>

```javascript
import { name, age, ability } from "./characters1.js";

listcharacter = (name, age, ability)=> { return  `imported values ${name} is ${age} years old and has the ability to ${ability}`};

document.getElementById("output"). innerHTML = listcharacter(name, age, ability);
```
</div>






Usage inside a function;

<div
  data-runkit
  data-runkit-evaluate-on-load="true"
  data-runkit-gutter-style="none"
  data-runkit-node-version="18"
>

```javascript
var hero = { name: "Flash", age: 2000, ability: "generate a ligntening stike" };
var villain = { name: "Nemesis", age: 2001, ability: "absorb energy from lightening" };

//Templated String
function showPlayerDetails (player) { 
    var string = `${player.name} is ${player.age} years old and has the ability to ${player.ability}`;
    return string;
}
console.log(showPlayerDetails(hero));
console.log(showPlayerDetails(villain));
```

</div>

Template strings can include html elements and can print multiple lines as whitespace, newlines and indentation are reproduced. ( The console log cannot fully render this, but a document.write element would.)

<div
  data-runkit
  data-runkit-evaluate-on-load="true"
  data-runkit-gutter-style="none"
  data-runkit-node-version="18"
>

```javascript
var hero = { name: "Flash", age: 2000, ability: "generate a ligntening stike" };
var villain = { name: "Nemesis", age: 2001, ability: "absorb energy from lightening" };

//Templated String
function showPlayerDetails (player) { 
    var string = `<h1>${player.name} </h1>is ${player.age} years old 
        and has the ability to <em>${player.ability}</em>`;
    return string;
}
console.log(showPlayerDetails(hero));
console.log(showPlayerDetails(villain));
```

</div>