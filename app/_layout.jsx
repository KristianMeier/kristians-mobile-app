import { Stack } from "expo-router"
import { AuthContextProvider } from "../context/AuthContext"
import { Search } from "../components/Search/Search"
import { SearchContextProvider } from "../context/SearchContext"

export default function Layout() {
  return (
    <SearchContextProvider>
      <AuthContextProvider>
        <Stack />
      </AuthContextProvider>
    </SearchContextProvider>
  )
}
