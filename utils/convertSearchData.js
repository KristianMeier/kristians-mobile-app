export const convertSearchData = ({
  cvrNumber,
  companyName,
  address,
  status,
  companyType,
  postNoCity,
}) => [
  { title: companyName, paragraphOne: address, paragraphTwo: postNoCity },
  { title: "Cvr-number", paragraphOne: cvrNumber },
  { title: "Status", paragraphOne: status },
  { title: "Company Type", paragraphOne: companyType },
]
