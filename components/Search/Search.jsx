import { useEffect } from "react"
import { SearchCompany } from "./SearchCompany"
import { SearchNoResults } from "./SearchNoResults"
import { filterCompanies } from "../../utils/filterCompanies"
import { convertSearchData } from "../../utils/convertSearchData"
import { useSearchContext } from "../../context/SearchContext"
import { ScrollView } from "react-native"

export const Search = () => {
  const {
    searchField,
    companies,
    setCompanies,
    allCompanies,
    isCompaniesFound,
    isSearchFieldEmpty,
  } = useSearchContext()

  useEffect(() => {
    setCompanies(filterCompanies(searchField, allCompanies))
  }, [searchField])

  if (!isCompaniesFound && !isSearchFieldEmpty) return <SearchNoResults />

  if (isCompaniesFound)
    return (
      <ScrollView>
        {companies.map((company, index) => {
          const convertedData = convertSearchData({ ...company })
          return (
            <SearchCompany
              key={index}
              index={index}
              convertedData={convertedData}
            />
          )
        })}
      </ScrollView>
    )

  return
}
