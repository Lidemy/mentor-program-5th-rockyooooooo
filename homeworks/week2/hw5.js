function join(arr, concatStr) {
  let str = "";
  arr.forEach((el, idx) => {
    str += el;
    if (idx !== arr.length - 1) str += concatStr;
  });
  return str;
}

function repeat(str, times) {
  let newStr = "";
  for (let i = 0; i < times; i++) {
    newStr += str;
  }
  return newStr;
}

console.log(join([1, 2, 3], ""));
console.log(repeat("yoyo", 2));
