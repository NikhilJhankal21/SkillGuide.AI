import { useContext, useEffect } from "react"
import { AuthContext } from "../auth.context"
import {login,register,logout,getMe} from "../services/auth.api"

export const useAuth = () => {

    const context = useContext(AuthContext)

    const {user,setUser,loading,setloading} = context

    const handleLogin = async ({ email, password }) => {

        setloading(true)

        try {

            const data = await login({
                email,
                password
            })

            setUser(data.user)

            return {
                success: true
            }

        } catch (err) {

            console.log(err)

            return {
                success: false,
                message:
                    err.response?.data?.message ||
                    "Invalid email or password"
            }

        } finally {

            setloading(false)

        }
    }


    const handleRegister = async ({username,email,password}) => {
        setloading(true)
        try {

            const data = await register({username,email,password})
            setUser(data.user)
            return {
                success: true
            }
        } catch (err) {

            console.log(err)

            return {
                success: false,
                message:
                    err.response?.data?.message ||
                    "Registration failed"
            }

        } finally {

            setloading(false)

        }
    }


    const handleLogout = async () => {

        setloading(true)
        try {
            await logout()
            setUser(null)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe()
                setUser(data.user)
            } catch (err) {
                setUser(null)
            } finally {
                setloading(false)
            }
        }
        getAndSetUser()

    }, [])

    return {user,loading,handleRegister,handleLogin,handleLogout}
}