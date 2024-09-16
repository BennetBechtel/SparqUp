function generateGenderFilter(reqUser) {
  const { genderIdentity, genderInterest } = reqUser;

  let filter = {};

  // Conditions based on genderIdentity
  if (genderIdentity === "male") {
    filter.genderInterest = { $in: ["male", "everyone"] };
  } else if (genderIdentity === "female") {
    filter.genderInterest = { $in: ["female", "everyone"] };
  } else if (genderIdentity === "diverse") {
    filter.genderInterest = "everyone";
  }

  // Conditions based on genderInterest
  if (genderInterest === "female") {
    filter.genderIdentity = "female";
  } else if (genderInterest === "male") {
    filter.genderIdentity = "male";
  } else if (genderInterest === "diverse") {
    filter.genderIdentity = "everyone";
  }

  return filter;
}

export default generateGenderFilter;
