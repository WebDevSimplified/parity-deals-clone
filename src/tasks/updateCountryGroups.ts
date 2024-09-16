import { db } from "@/drizzle/db"
import countriesByDiscount from "@/data/countriesByDiscount.json"
import { CountryGroupTable, CountryTable } from "@/drizzle/schema"
import { sql } from "drizzle-orm"

const groupCount = await updateCountryGroups()
const countryCount = await updateCountries()

console.log(
  `Updated ${groupCount} country groups and ${countryCount} countries`
)

async function updateCountryGroups() {
  const countryGroupInsertData = countriesByDiscount.map(
    ({ name, recommendedDiscountPercentage }) => {
      return { name, recommendedDiscountPercentage }
    }
  )

  const { rowCount } = await db
    .insert(CountryGroupTable)
    .values(countryGroupInsertData)
    .onConflictDoUpdate({
      target: CountryGroupTable.name,
      set: {
        recommendedDiscountPercentage: sql.raw(
          `excluded.${CountryGroupTable.recommendedDiscountPercentage.name}`
        ),
      },
    })

  return rowCount
}

async function updateCountries() {
  const countryGroups = await db.query.CountryGroupTable.findMany({
    columns: { id: true, name: true },
  })

  const countryInsertData = countriesByDiscount.flatMap(
    ({ countries, name }) => {
      const countryGroup = countryGroups.find(group => group.name === name)
      if (countryGroup == null) {
        throw new Error(`Country group "${name}" not found`)
      }

      return countries.map(country => {
        return {
          name: country.countryName,
          code: country.country,
          countryGroupId: countryGroup.id,
        }
      })
    }
  )

  const { rowCount } = await db
    .insert(CountryTable)
    .values(countryInsertData)
    .onConflictDoUpdate({
      target: CountryTable.code,
      set: {
        name: sql.raw(`excluded.${CountryTable.name.name}`),
        countryGroupId: sql.raw(`excluded.${CountryTable.countryGroupId.name}`),
      },
    })

  return rowCount
}
