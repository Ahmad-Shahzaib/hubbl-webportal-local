/**
 * Can be used to save data for a defined amount of time
 * @param {String} name
 * @param {Any} value
 * @param {Number} hours
 *
 */
export const setCookie = (name, value, hours) => {
  var expires = "";
  if (hours) {
    var date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie =
    name + "=" + (value || "") + expires + "; path=/" + "; max-age=999999";
};

/**
 *
 * @returns The value of the defined name
 * @param {String} name
 */
export const getCookie = (name) => {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

/**
 * Removes the value of the defined name
 * @param {String} name
 */
export function removeCookie(name) {
  document.cookie = name + "=; path=/; expires=Thu, 01 feb 1990 00:00:00 GMT";
}
 