/*
 ===================
 * # Author: Alireza
 * # myTelegram: @DarkRise
 * # Repo: github.com/Enekaas
 ===================
*/

// # import libs
const { createInterface } = require("readline");
const { createWriteStream } = require("fs");

// # create interFace
const rl = createInterface(process.stdin, process.stdout);

// # create information Object
var person = {
  name: "",
  title: "",
  repo: "",
  runCommand: "",
  keywords: [],
};

// # ask questions
rl.question(" 👤 | > Enter Your Name: ", (name) => {
  let stream = createWriteStream(`./${name}.md`);
  person.name = name;
  rl.question(
    ` ☕ | - Dear(${name}), Please Enter Your App Title: `,
    (appName) => {
      person.title = appName;
      rl.question(
        ` ✨ | > Please Enter Repository for (${appName}): `,
        (repo) => {
          person.repo = repo;
          rl.question(
            " 🔸 | - Enter Run Command For Your Project (ex: 'npm start'): ",
            (run) => {
              person.runCommand = run;
              rl.question(
                " 💫 | > Enter Keywords: ",
                (keywords) => {
                  for (let i of keywords.split(" ")) {
                    person.keywords.push(i);
                  }
                  stream.write(`👋 Im ${name}\n===========\n\n## Welcome To ${appName}!\n\n > Hi my name is ${name} and i developer of ${appName} :)\nRepo of This Project: ${repo}\n* # For Run:\n\`\`\`bash\ngit clone ${repo}\ncd ${repo.split('/').splice(-1)}\n${run}\n\`\`\`\n\n\n* Keywords:\n#${person.keywords}\n\n### - Made With ❤ By [Readme-Generator](https://github.com/Enekaas/readme-generator)`);
                  stream.close();
                  rl.close();
                }
              );
            }
          );
        }
      );
    }
  );
});

// # handle close readline
rl.on("close", () => {
  console.log(` 🎉 | File Saved With Above Informations:\n${JSON.stringify(person, null, 2)}`);
});

// # handle Ctrl+C
process.on("SIGUSR1", () => {
  console.log(" ❌ | - Unhandled Exit!");
  process.exit();
});
