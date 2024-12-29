type CurrencyFormatOptions = {
  currency?: string
  locale?: string
}

export const getCurrencySymbol = (
  currency: string = 'BDT',
  locale: string = 'bn-BD'
): string => {
  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      currencyDisplay: 'symbol',
    })

    const symbol = formatter
      .formatToParts(0)
      .find(part => part.type === 'currency')?.value

    if (symbol === currency) {
      const enFormatter = new Intl.NumberFormat('en', {
        style: 'currency',
        currency: currency,
        currencyDisplay: 'symbol',
      })
      return (
        enFormatter.formatToParts(0).find(part => part.type === 'currency')
          ?.value ?? currency
      )
    }

    return symbol ?? currency
  } catch (error: unknown) {
    console.log(error)
    return currency
  }
}

export const formatCurrency = (
  amount: number,
  options: CurrencyFormatOptions = {}
) => {
  const { currency = 'BDT' } = options
  const symbol = getCurrencySymbol(currency)
  return `${symbol} ${amount.toFixed(2)}`
}
