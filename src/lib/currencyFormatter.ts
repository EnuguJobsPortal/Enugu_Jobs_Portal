export const formatCurrency = (amount: number | string, currencyCode: string = "NGN", locale: string ="en-NG") : string => {
    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
    });
    
    return formatter.format(amount as number);
}

export const formatCurrency2 = (amount: number | string, currencyCode: string = "NGN") : string => {
    const locale = currencyCode === "USD" ? "en-US" : currencyCode === "EUR" ? "fr-FR" : currencyCode === "GBP" ? "en-GB" : "en-NG";

    const formatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
    });
    
    return formatter.format(amount as number);
}