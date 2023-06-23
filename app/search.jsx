import { SearchWrapper } from "../components/Search/SearchWrapper"
import { useSearchContext } from "../context/SearchContext"

export default function App() {
  const { allCompanies } = useSearchContext()

  return <SearchWrapper />
}
