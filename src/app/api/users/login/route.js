import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import connectDB from '../../../../../dbConfig/db'
import Students from '../../../../../models/students'
import { NextResponse } from 'next/server'

connectDB()

export const POST = async req => {
    try {
        const reqbody = await req.json()
        const { email, password } = await reqbody

        const user = await Students.findOne({ email })
        if (!user) return NextResponse.json({
            success: false,
            message: 'email not exist'
        }, { status: 401 })
        const hashPassword = user.password

        const comparePassword = await bcryptjs.compare(password, hashPassword)
        if (!comparePassword) return NextResponse.json({ message: 'password error',success:false },
            { status: 401 })

        const response = NextResponse.json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                id: user._id
            }
        }, { status: 201 })
        const DATA_TOKEN = {
            name: user.name,
            email: user.email,
            id: user._id
        }

        const token = jwt.sign(DATA_TOKEN, process.env.DATA_TOKEN)

        response.cookies.set('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 60 * 60 * 1000)
        })

        return response
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}