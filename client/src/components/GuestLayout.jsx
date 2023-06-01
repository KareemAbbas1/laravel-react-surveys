import { Navigate, Outlet } from "react-router-dom"
import { UseStateContext } from "../contexts/ContextProvider"

const GuestLayout = () => {

    const { userToken } = UseStateContext();

    if(userToken) {
        return <Navigate to="/" />
    }

    return (
        <div>
            
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-12 lg:px-8">
                <div>
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                </div>
            </div>

            <Outlet />
        </div>
    )
}

export default GuestLayout