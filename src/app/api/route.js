import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export const GET = async req => {
    const token=cookies().get('token')?.value
    return NextResponse.json({token:token })
}