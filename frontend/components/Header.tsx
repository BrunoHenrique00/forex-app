export default function Header(){
    return(
        <nav className="flex justify-around py-4 bg-white/80
            backdrop-blur-md shadow-md w-full">

            <div className="flex items-center">
                <a className="cursor-pointer">
                    <h3 className="text-2xl font-medium text-indigo-600">
                        Forex App
                    </h3>
                </a>
            </div>

            <div className="items-center hidden space-x-8 lg:flex">
                <a className="flex text-gray-600 hover:text-indigo-600
                    cursor-pointer transition-colors duration-300">
                    My Trades
                </a>
            </div>

            <div className="flex items-center space-x-5">
                <a className="flex
                    cursor-pointer transition-colors duration-300
                    font-semibold text-indigo-600">
                    Login
                </a>
            </div>
        </nav>
    )
}