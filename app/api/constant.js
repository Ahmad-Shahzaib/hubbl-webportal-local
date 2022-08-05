export function nullToEmptyValues(data = new Object()) {
  let _data = {};

  for (const property in data) {
    if (
      data[property] == null ||
      (typeof data[property] == "string" &&
        data[property].toLowerCase() == "null")
    ) {
      _data = { ..._data, [property]: "" };
    } else {
      _data = { ..._data, [property]: data[property] };
    }
  }

  return _data;
}
