// app/api/auth/signup/route.ts (App Router)
import { pool } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import axios from "axios";
// import {kickbox} from 'kickbox';


// const kickbo = kickbox.client('live_3a0cbca73006944fd2454d767850baa7b73563d8b9a53f69700189d07b6e3e87').kickbox();

export async function POST(req: Request) {

    const { name, email, password } = await req.json();
    const saltRounds = 10;

    const KICKBOX_URL = `https://api.kickbox.com/v2/verify?email=${email}&apikey=${process.env.KICKBOX_API}`

    if (!name || !email || !password) {
        return NextResponse.json({ message: "Missing fields", status: 400 });
    }


    const res = await axios.get(KICKBOX_URL);
    // console.log(res)
    const { result, reason } = res.data;

    if ((result !== "deliverable" && reason != "accepted_email")||(result !== "risky" && reason != "low_quality") ) return NextResponse.json({ message: reason, status: 401 })
    

    try {
        const isUserPresent = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        const exists = isUserPresent.rows;
        if (exists.length != 0) { //user exist
            return NextResponse.json({ message: "User already exists", status: 400 });

        } else { //not exist
            const hash = await bcrypt.hash(password, saltRounds);
            try {
                const result = await pool.query(`INSERT INTO users \
                    (email, password_hash, name, user_image)
                    VALUES ($1, $2, $3, $4)
                    RETURNING *`,
                    [email, hash, name, "/user.svg"]
                );
                const newUser = result.rows[0];
                return NextResponse.json({ message: "User created", user: newUser, status: 201 });
            } catch (error) {
                return NextResponse.json({ message: "Error registering user!!", status: 500 });
            }
        }
    } catch (err) {
        return NextResponse.json({ message: "Error checking user!!", status: 500 });
    }

}
