import axios from "axios"


// const api = axios.create({
//     baseURL:"http://localhost:3000",
//     withCredentials:true
// })

// export async function register(username, email,password){
//    try {
//     const response = await api.post('/api/auth/register',{
//         username,email,password
//     })
//     return response.data
//     }
//     catch(err){
//        console.log(err)
//     }
// }
// this will shorten your code as you don't have to repeat same code again and again


export async function register(username, email,password){
   try {
    const response = await axios.post('/http://localhost:3000/api/auth/register',{
        username,email,password
    },{
        withCredentials:true
    })
    return response.data
    }
    catch(err){
       console.log(err)
    }
}

export async function login({email,password}){
    try{
        const response = await axios.post("http://localhost:3000/api/auth/login",{
            email, password
        },{withCredentials:true})

        return response.data
    }
    catch(err){
        console.log(err)
    }
}

export async function logout(){
    try{

        const reponse = await axios.get("http://localhost:3000/api/auth/logout",{
            withCredentials:true
        })

        return response.data
    }
    catch(err){
        console.log(err)
    }
}

export async function getMe(){
    try{
        const response = await axios.get("http://localhost:3000/api/auth/get-me",{
            withCredentials:true
        })

        return response.data
    }
    catch(err){
        console.log((err))
    }
}