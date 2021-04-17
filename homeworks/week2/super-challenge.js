function add(a, b) {
  // base case
  if (a == 0 && b == 0) {
    return "0";
  } else if ((a == 1 && b == 0) || (a == 0 && b == 1)) {
    return "1";
  } else if (a == 1 && b == 1) {
    return "10";
  }
  // recursive case
  if (a & 1 && b & 1) {
    return add(a >> 1, parseInt(add(b >> 1, 1), 2)) + "0";
  } else if (a & 1 || b & 1) {
    return add(a >> 1, b >> 1) + "1";
  } else if (~(a & 1) && ~(b & 1)) {
    return add(a >> 1, b >> 1) + "0";
  }
}

console.log(add(5, 3));
