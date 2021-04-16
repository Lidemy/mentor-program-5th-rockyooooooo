function printStars(n) {
  if (n < 1 || n > 30) {
    console.log("n 需在 1-30 之間");
  } else {
    for (let i = 1; i <= n; i++) {
      i < 10 ? console.log(i, " *") : console.log(i, "*");
    }
  }
}

printStars(0);
