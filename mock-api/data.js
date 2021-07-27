const exercises = [
  {
    id: "hello-world",
    slug: "hello-world",
    title: "Hello Python",
    desc: `
# Hello world 
write a program that prints Hello Python!!!
`,
    placeholder: `class Solution:
    
    def main(self):
        #your code here
    `,
    test_run_code: `
s = Solution()
s.main()
`,
    expectedOutput: "Hello Python!!!",
  },
  {
    id: "reverse-string",
    slug: "reverse-string",
    title: "Reverse a string",
    desc: `
# Reverse string
write a program that reverses given string
`,
    placeholder: `class Solution:
    
    def main(self, user_input:str):
        #your code here
    `,
    test_run_code: `
s = Solution()
s.main("Hello Python!!!")
`,
    expectedOutput: "!!!nohtyP olleH",
  },
];

module.exports.getExercises = () => {
  return exercises;
};

module.exports.getExercise = (slug) => {
  console.log(`slug:::: ${slug} `);
  return exercises.find((ex) => ex.id === slug);
};
