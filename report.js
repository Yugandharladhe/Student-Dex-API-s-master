const data=require('./data.json');
                var report=[]
                var totalCollection=0
                var totalGST=0
                wholeData={}
                data.map((ele,index,arr)=>{
                    let obj={};
                    obj.billNo=ele._id.slice(-3);
                    obj.table=ele.table.TableName
                    obj.foodBillAmount=ele.orderAmount.finalTotal
                    obj.discount=ele.orderAmount.discount
                    obj.received=ele.orderAmount.total
                    if(ele.paymentStatus==true)
                    {
                        obj.remark="Paid"
                    }else{
                        obj.remark="Unpaid"
                    }
                    totalCollection = totalCollection + arr[index].orderAmount.total
                    totalGST=totalGST+ele.orderAmount.orderGst
                    report.push(obj)
                    wholeData.totalCollection=totalCollection
                    wholeData.totalGST=totalGST
                    wholeData.report=report
                })

                
                

                console.log(wholeData)