import { getExercises } from "../../../mock-api/data";

export default function handler(req, res) {
  res.status(200).json({ data: getExercises() });
}
