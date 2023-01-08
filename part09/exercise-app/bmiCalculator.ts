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
