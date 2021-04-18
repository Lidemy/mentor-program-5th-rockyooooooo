function capitalize(str) {
  const regex = /[a-zA-Z]/;
  if (regex.test(str[0])) {
    return str[0].toUpperCase().concat(str.slice(1));
  } else {
    return str;
  }
}

console.log(capitalize(",hello"));
