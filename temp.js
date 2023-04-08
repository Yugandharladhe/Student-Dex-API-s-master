// [
//       {
//         menuId:"k2j4gk4j3g4k34g2k4h",
//         quantity:545,
//         specialInstruction:"hot",
//         cost:546,
//         selected:[],
//         variationPrice:56
//       }
// ]

// const mongoose=require("mongoose")
// const Schema = mongoose.Schema
// mongoose.connect("mongodb://cosmodemo:zgICwEeopY1CocWRbAuMZpSbTGrYOUlhq1erzAMx9AefkefNXA7wtldxgsxAcx81eyanlwKQvwYpACDbeuokNA==@cosmodemo.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@cosmodemo@").then(()=>{
//     console.log("successfull")
// }).catch((err)=>{
//     console.log("failed")
// })

const data=require("./orders.json")
// console.log(typeof(data[0].order))

var d1=data[0].order[0]
// console.log(d1)
// for(var j=0;j<6;j++)
// {
//     for(var i=0;i<7;i++)
//     {
//         console.log(data[j]?.order[i])
//     }
// }

const fun=async()=>{
    var arr=[]
    var count=0
    Promise.all(data.map(async(element)=>{
        element.order.forEach((ele)=>{
            newItem={
                itemName:ele.menuId.itemName
            }
            count++;
            arr.push(newItem)
        })
    }))

    console.log(arr)
    console.log(count)


    const uniqueObj = arr.reduce((obj, item) => {
        const key = `${item.itemName}`;
        obj[key] = obj[key] ? { ...item, count: obj[key].count + 1 } : { ...item, count: 1 };
        return obj;
    }, {});
    
    const uniqueArr = Object.values(uniqueObj);

    Promise.all(await uniqueArr.sort((a, b) => {
        return b.count - a.count;
    }));
    console.log(uniqueArr)
}

fun()


