import { getToken } from "@/helper/getuser"
import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'

export const GET = async req => {
    try {
        const token = await getToken(req)
        const data = jwt.verify(token, process.env.DATA_TOKEN)

        return NextResponse.json({data,success:true}, { status: 201 })
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }

}