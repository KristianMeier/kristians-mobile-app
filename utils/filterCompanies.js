export const filterCompanies = (searchField, allCompanies) => {
  const filteredCompanies = allCompanies.filter(
    (company) =>
      company.companyName.toLowerCase().includes(searchField.toLowerCase()) ||
      company.address.toLowerCase().includes(searchField.toLowerCase())
  )

  return searchField ? filteredCompanies : []
}
