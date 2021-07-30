// prettier-ignore
const exercises = [
  {
    id: 'hello-world',
    slug: 'hello-world',
    theme: 'info',
    title: 'Hello Python',
    desc: `
# Hello world 
write a program that prints the string \`Hello Python!!!\`

## How to?
python has a print method that takes a string and prints it on the console.

## Example
\`\`\`
print("Hello") # prints Hello
\`\`\`

`,
    placeholder: `
class Solution:
    
    def main(self):
        #your code here
    `,
    test_run_code: `
s = Solution()
s.main()
`,
    expectedOutput: 'Hello Python!!!'
  },
  {
    id: 'reverse-string',
    slug: 'reverse-string',
    theme: 'secondary',
    title: 'Reverse a string',
    desc: `
# Reverse string
write a program that reverses given string

## Problem?
You will be given a string as \`user_input\`, you need implement 
your logic to reverse and print it.

## Example Input and Output
\`\`\`
Hello --> olleH
\`\`\`
`,
    placeholder: `
class Solution:
    def main(self, user_input:str):
        #your code here
    `,
    test_run_code: `
s = Solution()
s.main("Hello Python!!!")
`,
    expectedOutput: '!!!nohtyP olleH'
  },
  {
    id: 'for-loop-1',
    slug: 'for-loop-1',
    theme: 'primary',
    title: 'For loop 1',
    desc: `
# For loop
write a program that prints numbers from 1-10.


## Expected Output
\`\`\`
1
2
3
4
5
6
7
8
9
10
\`\`\`
`,
    placeholder: `
class Solution:
    def main(self):
        #your code here
    `,
    test_run_code: `
s = Solution()
s.main()
`,
    expectedOutput: `1
2
3
4
5
6
7
8
9
10`
  },
  {
    id: 'string-concatenation-1',
    slug: 'string-concatenation-1',
    theme: 'success',
    title: 'String Concatenation - 1',
    desc: `
# String Concatenation
Given a name of the user, welcome the user with a welcome message "Hello, John!".


## Expected Output
\`\`\`
Hello, John!
\`\`\`
`,
    placeholder: `
class Solution:
    def main(self, name):
        #your code here
    `,
    test_run_code: `
s = Solution()
s.main("John")
`,
    expectedOutput: 'Hello, John!'
  },
  {
    id: 'string-concatenation-2',
    slug: 'string-concatenation-2',
    theme: 'primary',
    title: 'String Concatenation - 2',
    desc: `
# String Concatenation
Given a name of the user, welcome the user with a welcome message "Hello, John!" 
using string format method.

## Sample code
\`\`\`
name = "Python
"{} is awesome".format(name)
\`\`\`

## Expected Output
\`\`\`
Hello, John!
\`\`\`
`,
    placeholder: `
class Solution:
    def main(self, name):
        #your code here
    `,
    test_run_code: `
s = Solution()
s.main("John")
`,
    expectedOutput: 'Hello, John!'
  },
  {
    id: 'dictionary-1',
    slug: 'dictionary-1',
    theme: 'info',
    title: 'Dictionary',
    desc: `
# Dictionary
Given a name of the user, skills of the user as dictionary.
Loop through dictionary and print name and skills of the user.

## Sample code
\`\`\`
user = {
  'name': 'John',
  'skills': ['Python', 'Javascript', 'Golang']
}
\`\`\`

## Expected Output
\`\`\`
John knows Python, Javascript, Golang
\`\`\`
`,
    placeholder: `
class Solution:
    def main(self, user):
        #your code here
    `,
    test_run_code: `
s = Solution()
s.main({
  'name': 'John',
  'skills': ['Python', 'Javascript', 'Golang']
})
`,
    expectedOutput: 'John knows Python, Javascript, Golang'
  }
]

module.exports.getExercises = () => {
  return exercises;
};

module.exports.getExercise = (slug) => {
  console.log(`slug:::: ${slug} `);
  return exercises.find((ex) => ex.id === slug);
};
