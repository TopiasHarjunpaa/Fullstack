// const parseBmiArguments = (
//   args: Array<string>
// ): { height: number; weight: number } => {
//   if (args.length < 4) throw new Error("Not enough arguments");
//   if (args.length > 4) throw new Error("Too many arguments");

//   if (Number(args[2]) === 0) {
//     throw new Error("Can not divide by zero!");
//   } else if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//     return {
//       height: Number(args[2]),
//       weight: Number(args[3]),
//     };
//   } else {
//     throw new Error("Provided values were not numbers!");
//   }
// };

interface Result {
  weight: number;
  height: number;
  bmiMessage: string;
}

export const calculateBmi = (height: number, weight: number): Result => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  console.log(bmi);
  let bmiMessage = "overweight";

  if (bmi < 18.5) {
    bmiMessage = "underweight";
  } else if (bmi < 25) {
    bmiMessage = "normal weight";
  }

  return {
    weight,
    height,
    bmiMessage,
  };
};
