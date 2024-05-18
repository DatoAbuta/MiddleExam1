#! /usr/bin/env node

const fs = require("fs/promises");
const { readData } = require("./helpers");

const { Command } = require("commander");

const program = new Command();

program
    .command("show")
    .action(async () => {
    const data = await readData("data.json");
    console.log(data);
});

program
  .command("create")
  .arguments("<name>")
  .arguments("<price>")
  .action(async (name, price) => {
    const data = await readData("data.json");
    const lastId = data[data.length - 1].id;

    const expenseOBJ = {
      id: lastId + 1,

      name,
      price,
      created: new Date().toISOString(),
    };

    data.push(expenseOBJ);

    await fs.writeFile("data.json", JSON.stringify(data));

    console.log("created successfully");
  });

program
  .command("delete")
  .arguments("<id>")
  .action(async (id) => {
    let data = await readData("data.json");
    data = data.filter((el) => el.id !== Number(id));

    await fs.writeFile("data.json", JSON.stringify(data));

    console.log("Deleted Successfully");
  });

program
  .command("get")
  .arguments("<id>")
  .action(async (id) => {
    let data = await readData("data.json");

    const NewData = data.find((el) => el.id === Number(id));

    if (!NewData) {
      return console.log("Expense Not Found");
    }

    console.log(NewData);
  });

program
  .command('update')
  .arguments('<id>')
  .arguments('<name>')
  .arguments('<price>')
  .action(async (id,name,price) => {
    let data = await readData("data.json");
    const index = data.findIndex(el => el.id === Number(id))

    let expense = {
        ...data[index],
        name,
        price
    
    }

    data[index] = expense

    await fs.writeFile('data.json', JSON.stringify(data))

    console.log("Updated Successfully")
  })

program.parse();