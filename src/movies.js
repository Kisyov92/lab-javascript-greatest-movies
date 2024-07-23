// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  return moviesArray.map((movie) => movie.director);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  return moviesArray.reduce((acc, curr) => {
    if (curr.director === "Steven Spielberg" && curr.genre.includes("Drama")) {
      acc++;
    }
    return acc;
  }, 0);
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  return +moviesArray
    .reduce((acc, curr) => {
      if (!curr.score) return acc;

      return acc + curr.score / moviesArray.length;
    }, 0)
    .toFixed(2);
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter((movie) =>
    movie.genre.includes("Drama")
  );
  return scoresAverage(dramaMovies);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  const moviesArrayClone = [...moviesArray];

  return moviesArrayClone.sort((a, b) => {
    if (a.year === b.year) {
      return a.title.localeCompare(b.title);
    }

    return a.year - b.year;
  });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  return moviesArray
    .map((movie) => movie.title)
    .sort((a, b) => a.localeCompare(b))
    .filter((_, i) => i < 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  return moviesArray.map((movie) => {
    const durrationArr = movie.duration.split(" ");
    let hours = 0;
    let minutes = 0;

    for (const el of durrationArr) {
      if (el.includes("h")) {
        hours = parseInt(el);
      } else if (el.includes("min")) {
        minutes = parseInt(el);
      }
    }

    const timeInMin = hours * 60 + minutes;

    return { ...movie, duration: timeInMin };
  });
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (moviesArray.length === 0) return null;
  const yearAvgScores = [];

  for (const movie of moviesArray) {
    const addedYears = yearAvgScores.map((obj) => obj.year);

    if (addedYears.includes(movie.year)) {
      const index = yearAvgScores.findIndex((el) => el.year === movie.year);
      const score = (yearAvgScores[index].score + movie.score) / 2;
      yearAvgScores[index] = { ...yearAvgScores[index], score };
    } else {
      yearAvgScores.push({
        year: movie.year,
        score: movie.score,
      });
    }
  }

  const bestYearData = yearAvgScores.reduce(
    (acc, curr) => {
      if (curr.score === acc.score) {
        return curr.year > acc.year ? acc : curr;
      }

      return curr.score > acc.score ? curr : acc;
    },
    {
      score: -Infinity,
    }
  );

  return `The best year was ${bestYearData.year} with an average score of ${bestYearData.score}`;
}
