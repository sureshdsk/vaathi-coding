import { getExercise } from "../../../mock-api/data";

export default function handler({ query: { slug } }, res) {
  console.log("getExercise: ", slug, getExercise(slug));
  res.status(200).json({ data: getExercise(slug) });
}
