import Link from "next/link"
import { useRouter } from "next/router"
import en from '../locales/en'
import pt from '../locales/pt'

type HeaderProps = {
    user: {
        email?: string
        _id?: string
    }
}

export default function Header({ user }: HeaderProps){
    const router = useRouter()
    const translate = router.locale === 'en' ? en : pt

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

            <div className="flex items-center space-x-5">
                {
                    user?._id &&
                    <span className="flex
                    transition-colors duration-300
                    font-semibold text-indigo-600">
                        {translate["Welcome, "]} {user.email}
                    </span>
                }

                {
                    !user._id &&
                    <Link href='/login'>
                        <a className="flex
                        cursor-pointer transition-colors duration-300
                        font-semibold text-indigo-600">
                            Login
                        </a>
                    </Link>
                }
            </div>
        </nav>
    )
}