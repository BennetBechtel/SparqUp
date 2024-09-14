function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validateDate(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  if (age < 18) {
    return false;
  }

  const pattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  return pattern.test(dateString);
}

function validateGenderIdentity(genderIdentity) {
  const options = ["male", "female", "diverse"];
  return options.includes(genderIdentity);
}

function validateGenderInterest(genderInterest) {
  const options = ["male", "female", "everyone"];
  return options.includes(genderInterest);
}

const isUserValid = (user) => {
  if (!user.email || !validateEmail(user.email)) {
    return false;
  }
  if (!user.password) {
    return false;
  }
  if (!user.firstName || user.firstName.length < 1) {
    return false;
  }
  if (!user.lastName || user.lastName.length < 1) {
    return false;
  }
  if (!user.birthDate || !validateDate(user.birthDate)) {
    return false;
  }
  if (!user.genderIdentity || !validateGenderIdentity(user.genderIdentity)) {
    return false;
  }
  if (!user.genderInterest || !validateGenderInterest(user.genderInterest)) {
    return false;
  }
  if (!user.profilePictureUrl || user.profilePictureUrl.length < 1) {
    return false;
  }
  if (!user.about || user.about.length < 1) {
    return false;
  }

  return true;
};

export default isUserValid;
