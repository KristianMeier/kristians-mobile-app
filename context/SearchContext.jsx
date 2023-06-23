import { createContext, useContext, useState } from "react"
import { contentData } from "../constants/contentData"

const SearchContext = createContext()

export const SearchContextProvider = ({ children }) => {
  const [companies, setCompanies] = useState([])
  const [searchField, setSearchField] = useState("")

  const allCompanies = contentData.searchData.companies

  const isSearchFieldEmpty = searchField === ""
  const isCompaniesFound = !!companies.length

  return (
    <SearchContext.Provider
      value={{
        companies,
        setCompanies,
        searchField,
        setSearchField,
        allCompanies,
        isSearchFieldEmpty,
        isCompaniesFound,
      }}>
      {children}
    </SearchContext.Provider>
  )
}

export const useSearchContext = () => useContext(SearchContext)
