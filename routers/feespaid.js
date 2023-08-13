const express = require("express");
const app = express();
require("../connection/conn");
const Student = require("../modelsdb/schemastudent");
const router = new express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
app.use(express.json());

router.post("/feespaid", async(req, res) => {
    const data = await Student.findOne({ RollNo: req.body.RollNo });
    const { purpose } = req.body;
    if (data == null) {
        res.send("false");
    } else {
        const session = await stripe.checkout.sessions.create({
            line_items: [{
                price_data: {
                    currency: "INR",
                    product_data: {
                        name: purpose,
                    },
                    unit_amount: Number(req.body.Fees) * 100,
                },
                quantity: 1,
            }, ],
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });

        const upd = await Student.updateOne({ RollNo: req.body.RollNo }, { $set: { Fees: true } });
        if (upd) {
            console.log(session.url);
            res.redirect(303, session.url);
        } else {
            res.status(400).send("error")
        }
    }
});

module.exports = router;