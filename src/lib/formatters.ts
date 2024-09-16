const compactNumberFormatter = new Intl.NumberFormat(undefined, {
  notation: "compact",
})

export function formatCompactNumber(number: number) {
  return compactNumberFormatter.format(number)
}
