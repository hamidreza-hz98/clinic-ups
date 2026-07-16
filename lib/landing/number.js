export const toPersianNumber = (number) => {
  if (number == null) return "";
  if(typeof number === "number")  number = number.toString()

  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return number.replace(/\d/g, (digit) => persianDigits[digit]);
};

export const toEnglishNumber = (number) => {
  const persianToEnglish = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
  };

  return number.replace(/[۰-۹]/g, (match) => persianToEnglish[match] || match);
}

export const formatPrice = (number) => {
  if (number == null) return "";
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
