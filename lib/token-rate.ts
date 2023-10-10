const ratingMap = {
  1: "AAA",
  2: "AA",
  3: "A",
  4: "BBB",
  5: "BB",
  6: "B",
  7: "CCC",
  8: "CC",
  9: "C",
};

export function getTokenRating(rating?: string) {
  if (!rating) return null;

  const value = Number(rating);
  if (value >= 848) {
    return 1;
  } else if (value >= 680 && value < 848) {
    return 2;
  } else if (value >= 600 && value < 680) {
    return 3;
  } else if (value >= 420 && value < 600) {
    return 4;
  } else if (value >= 350 && value < 420) {
    return 5;
  } else if (value >= 300 && value < 350) {
    return 6;
  } else if (value >= 180 && value < 300) {
    return 7;
  } else if (value >= 120 && value < 180) {
    return 8;
  } else if (value < 100) {
    return 9;
  }
}

export function getTokenRatingText(rating: string) {
  const ratingKey = getTokenRating(rating);
  if (!ratingKey) return "";
  return ratingMap[ratingKey];
}
