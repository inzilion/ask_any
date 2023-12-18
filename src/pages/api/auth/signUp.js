import client from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const hash = await bcrypt.hash(req.body.password, 10);
        req.body.password = hash;
        req.body.memo = "열심히 공부하세";
        req.body.image = "";
        req.body.problems = {};

        let db = (await client).db('ASK_ANY');
        await db.collection('USERS').insertOne(req.body);
        res.status(200).json('성공');
    }
}; 