import {timer,fromEvent, of, from, interval} from "rxjs";
import{filter, map, reduce, take, scan, tap , exhaustMap, mergeMap, concatMap, switchMap} from 'rxjs/operators'
import {ajax} from 'rxjs/ajax'

// const observable = timer(0, 1000)  // after interval give output
// const observable1 =fromEvent(document, "click")    // after click give output
// const observable2 = of(1,2,3,4,5)  // synchronus output
// const observable3 = from('lusa') // it give seprate letter in string , it also return promises , this operator is very popular 

// //operator caall here we have to change in the place of observable 
// const subscription = observable.subscribe(
//  console.log('lk')
// )




// pipeable operator  is used when we use multiple operator at a time 
//syntax
// const observable = new Observable()
// observable.pipe(firstOperator(config), secondOperator(config)).subscribe( )



//  *** Marbal  
//map(value=>`$${value}`)   // it conver output with $ sign 

// pluck Operator 

// in/ {v:1}
//pluck()
// o/p 1


// const observable = fromEvent(
//     document, 'keydown'   // document and event name 
// ).pipe(
//     map(event =>{
//         return event.code === 'Space'? event.code: null  // filter the element 
//     } ),
 
//    // filter(code => code.code === 'Space')


//     )
//  ** Of operator with pipe **
    // const observable = of(1,2,3,9,4,5,6).pipe(
    //     reduce(
    //         (acc,val)=> acc +val, 
    //         0
    //     )
    // )

// *** Take operator  *** 
// const observable = interval(500).pipe(
//     take(5) ,   //it set the limit 
//     reduce(
// (acc,val) =>acc+val, 0
//     )
// )


//  ** scan 
// const observable = interval(500).pipe(
//     take(5) ,   //it set the limit 
//     scan (                        // it work as reduce but doesnt wait for acc value , it show value in console 
// (acc,val) =>acc+val, 0
//     )
// )

// ***tap  // It use for debuging***

// const observable = interval(500).pipe(
//     take(5) ,  //it set the limit 
//     tap(console.log),             //it show the data like scan operator
//     reduce (                       
//     )
// )

// ***  ajax use for make a request ***
// const button = document.querySelector('#btn')
// const observable = fromEvent(
//    button, 'click'                      
//     ).pipe(
//         map(() =>{
//             return ajax.getJSON(
//                 'localhost:1337/api/manage-vedio'
//             )
//         })
//     )
// value.subscribe(console.log)   this line is subscribe function


// *** mergeMap Operator  || flatting operator

// const button = document.querySelector('#btn')
// const observable = fromEvent(
//    button, 'click'                      
//     ).pipe(
//         mergeMap(() =>{
//             return interval(1000).pipe(
//                 tap(console.log),
//                 take (5)   // never go to complete function 
//             // ajax.getJSON(
//             //     'localhost:1337/api/manage-vedio'        
//             //)
//     )})           
//       //  take (5)   it go the complete function but function is call only one time
//     )

//** switchMap Operatore  || flatting Operator */


// const button = document.querySelector('#btn')
// const observable = fromEvent(
//    button, 'click'                      
//     ).pipe(
//         switchMap(() =>{
//             return interval(1000).pipe(                      ///we use ajax in the place of interval
//                 take(5),
//                 tap({
//                     complete(){
//                         console.log('inner observable complete ')
//                     }
//                 })
//                  // never go to complete function 
//             // ajax.getJSON(
//             //     'localhost:1337/api/manage-vedio'        
//             //)
//     )})           
//        //  take (5)   it go the complete function but function is call only one time
//     )

// ** concatMap || Flatting Operator // Method it use to wait the request it not show both request in console


// const button = document.querySelector('#btn')
// const observable = fromEvent(
//    button, 'click'                      
//     ).pipe(
//         concatMap(() =>{
//             return interval(1000).pipe(                      ///we use ajax in the place of interval
//                 take(5),
//                 tap({
//                     complete(){
//                         console.log('inner observable complete ')
//                     }
//                 })
//                  // never go to complete function 
//             // ajax.getJSON(
//             //     'localhost:1337/api/manage-vedio'        
//             //)
//     )})           
//        //  take (5)   it go the complete function but function is call only one time
//     )
 
// ** exhaustMap Operator || flatting Operator        // it ingore our second reqest
const button = document.querySelector('#btn')
const observable = fromEvent(
   button, 'click'                      
    ).pipe(
        exhaustMap(() =>{
           
            //interval(1000).pipe(                      ///we use ajax in the place of interval
                // take(5),
                // tap({
                //     complete(){
                //         console.log('inner observable complete ')
                //     }
                // })
                 // never go to complete function 
         return   ajax.getJSON(
                'localhost:1337/api/manage-vedio'        
            ),
            take(5),
                tap({
                    complete(){
                        console.log('inner observable complete ')
                    }
                })
    })           
       //  take (5)   it go the complete function but function is call only one time
    )
const subscription = observable.subscribe({

    next(value){
      console.log(value)
    },
    complete(){
        console.log('complete')
    }
})
console.log("hello")