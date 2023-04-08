const response = require('../../utils/response')
const order = require('../../models/order')
const user=require('../../models/user')
const table=require('../../models/Table')
const getOrderReport = async (req, res) => {
    const { restaurantId, startDate, endDate} = req.query
    const userDetails = req.userDetails
    try {
        let findUser = await user.find({ restaurantLinked: { $in: userDetails.restaurantLinked } });
        if(findUser)
        {
            const data=await order.find({restaurantId,$and:[{ createdAt: { $gte:new Date(new Date(startDate).setUTCHours(0, 0, 0, 0)) } }, { createdAt: { $lte: new Date(endDate) } }]}).populate('Table')
            if(data)
            {
                var report=[]
                var totalCollection=0
                var totalGST=0
                data.map((ele)=>{
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
                    totalCollection = totalCollection + ele.orderAmount.total
                    totalGST=totalGST+ele.orderAmount.orderGst
                    report.push(obj)
                })

                wholeData={}
                wholeData.totalCollection=totalCollection
                wholeData.totalGST=totalGST
                wholeData.report=report
                response(res, 200, true, 'Fetched Successfully',wholeData)
            }
            else
            {
                response(res, 200, true, 'No data found',null)
            }
        }
        else{
            respponse(res, 500, false, 'Restricted Access', { err: err.message })
        }

  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Internal Server Error', { err: err.message })
  }
}

module.exports = getOrderReport