export default function formatCurrency(number: number , currency: string){
    return new Intl.NumberFormat('en-Uk', {
        style: 'currency',
        currency,
        maximumSignificantDigits: 4
    }).format(number)
}