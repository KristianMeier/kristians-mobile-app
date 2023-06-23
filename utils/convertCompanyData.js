export const convertCompanyData = ({
  cvrNumber,
  companyStartDate,
  address,
  postNoCity,
  companyType,
  advertisement,
  status,
}) => [
  { title: "Cvr-number", field: cvrNumber },
  { title: "Address", field: address },
  { title: "Postcode and City", field: postNoCity },
  { title: "Company Start Date", field: companyStartDate },
  { title: "Company Type", field: companyType },
  { title: "Advertisement", field: advertisement },
  { title: "Status", field: status },
]
