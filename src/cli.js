import chalk from "chalk";
import fs from "fs";
import searchFile from "./index.js";
import validatedList from "./http-valid.js";

const path = process.argv;

async function printList(valid, result, identifier = ''){
    if(valid){
        console.log(
            chalk.yellow('validated list'),
            chalk.black.bgGreen(identifier),
            await validatedList(result));
    }else{
        console.log(
            chalk.yellow('list links'),
            chalk.black.bgGreen(identifier),
            result);
    }
}

async function textProcess(argument){
    const path = argument[2];
    const valid = argument[3] ===  '--valid';

    try{
        fs.lstatSync(path);
    }catch(erro){
        if(erro.code === 'ENOENT'){
            console.log('file or directory does not exist');
            return;
        }
    }

    if(fs.lstatSync(path).isFile()){
    const result = await searchFile(argument[2]);
    printList(valid, result);
    }else if(fs.lstatSync(path).isDirectory()){
        const file= await fs.promises.readdir(path)
        file.forEach(async(nameFile)=>{
            const list = await searchFile(`${path}/${nameFile}`)
            printList(valid, list, nameFile)
        })
    }
}

textProcess(path)