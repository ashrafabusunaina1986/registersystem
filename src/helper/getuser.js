

export const getToken= req=>{
    const token= req.cookies.get('token')?.value
    return token
}