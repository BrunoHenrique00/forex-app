import { useRouter } from 'next/router'
import en from '../locales/en'
import pt from '../locales/pt'

export default function getTranslate(){
    const router = useRouter()
    const translate = router.locale === 'en' ? en : pt
    return translate;
}