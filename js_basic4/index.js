
// function decleartion
// function run(){
//     console.log('Piyush');
// }
// function call or invoke
// run();
//  named function assignment
// let piyu = function(){
//     console.log('Piyush Jha');
// }
// piyu();

// function sum(a,b){
//     return a+b;
// }
// console.log(sum(1,2));
// argunments
// function sum(a, b) {
//     console.log(arguments);
//     return a + b;
// }
// let ans = sum(1, 2, 3, 4);
// Rest operator
// function sum(num,val, ...arg){
//     console.log(arg);
// }
// sum(1,2,3,4,5)
function si(p,r,t=5){
    return p*r*t/100;
}
console.log(si(100,49,));

let person = {
    fName:"",
    lName:"",
    get fullName() {
        return `${this.fName} ${this.lName}`;
    },
    set fullName(value){
        let parts = value.split(' ');
        this.fName = parts[0];
        this.lName = parts[1];
        // console.log(person);
    },
};
// console.log(person.fullName());
person.fullName='piyush jha';
// try{
// person.fullName='piyush jha';
// }
// catch(e){
//     alert('You are set a wrong parameter');
// }



console.log(person.fName);


let arr = [1,2,3,4,5,6,7];
 let total = arr.reduce( (accumulator,currentvalue)=>accumulator+currentvalue);
console.log(total);