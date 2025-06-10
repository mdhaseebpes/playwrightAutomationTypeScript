let message: string = 'Hello';
message = 'bye';
console.log(message);

let age1: number = 20;
let isActive: boolean = false;
console.log(age1);

let numArray: number[] = [33, 424, 2213];
console.log(numArray);

//if are we unsure about dataType we can use 'any' keyword
let data: any = 'Data any';
let dataArray: any[] = [33, 424, 2213, 'efqfe', false];
console.log(dataArray);

//functions
function add(a: number, b: number): number {
  return a + b;
}

console.log(add(3, 4));

//objects
let user: { name: string; age: number } = { name: 'Haseeb', age: 30 };
console.log(user.name, user.age);
