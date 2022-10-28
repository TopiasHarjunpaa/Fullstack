interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercise = (
  target: number,
  exerciseHours: Array<number>
): Result => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((hours) => hours !== 0).length;
  const average = exerciseHours.reduce((a, b) => a + b) / periodLength;
  let rating = 3;
  let ratingDescription = "good job";
  let success = true;
  console.log(exerciseHours);
  console.log(target);
  if (average < target * 0.7) {
    rating = 1;
    ratingDescription = "failure";
    success = false;
  } else if (average < target) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
    success = false;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};
