export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return "Email cannot be empty.";
  if (!re.test(email)) return "Ooops! We need a valid email address.";
  if (email.match(/sarvika.com/g) == null) return "Ooops! We need a sarvika email address.";

  return "";
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return "Password cannot be empty.";

  return "";
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return "Name cannot be empty.";

  return "";
};

export const fnameValidator = fname => {
  if (!fname || fname.length <= 0) return "First Name cannot be empty.";

  return "";
};

export const lnameValidator = lname => {
  if (!lname || lname.length <= 0) return "Last Name cannot be empty.";

  return "";
};

export const phoneValidator = phone => {
  if (!phone || phone.length <= 0) return "Phone number cannot be empty.";
  const reg = /^[7-9][0-9]{9}$/; // /^[0]?[789]\d{9}$/;
  if (reg.test(phone) === false) return "Phone numeric and can be 10 digit only";

  return "";
};

export const ephoneValidator = ephone => {
  if (!ephone || ephone.length <= 0) return "Emergency Phone number cannot be empty.";
  const reg = /^[7-9][0-9]{9}$/; // /^[0]?[789]\d{9}$/;
  if (reg.test(ephone) === false) return "Emergency numeric and can be 10 digit only";

  return "";
};

export const panValidator = pan => {
  if (!pan || pan.length <= 0) return "PAN number cannot be empty.";
  // const reg = /^[A-Z0-9]{10}$/;
  const reg = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  if (reg.test(pan) === false) return "PAN number alpha-numeric with 10 digit length";

  return "";
};

export const passportNoValidator = passportno => {
  if (!passportno || passportno.length <= 0) return "Passport number cannot be empty.";
  const reg = /^[A-Z]{1}[0-9]{7}$/;
  if (reg.test(passportno) === false) return "Passport number 1 alphabate with 7 digit length";

  return "";
};

