interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (
  args: Array<string>
): { target: number; exerciseHours: Array<number> } => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const parsedArgs = args.slice(2);
  const argumentsInNumbers = parsedArgs.map((a) => Number(a));

  for (let i = 0; i < argumentsInNumbers.length; i++) {
    if (isNaN(argumentsInNumbers[i])) {
      throw new Error("Provided values were not numbers!");
    }
  }

  return {
    target: argumentsInNumbers[0],
    exerciseHours: argumentsInNumbers.slice(1),
  };
};

const calculateExercise = (
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

try {
  const { target, exerciseHours } = parseExerciseArguments(process.argv);
  console.log(calculateExercise(target, exerciseHours));
} catch (error) {
  if (error instanceof Error) {
    console.log("Something went wrong. Error: " + error.message);
  }
}
