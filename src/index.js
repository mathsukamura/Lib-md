import fs from 'fs';
import chalk from 'chalk';

function tratarError(erro){
    throw new Error(chalk.red(erro.code,"the object is not a file, please return a file!"));
}
//extractlinks

function extractLink (text){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capth = [...text.matchAll(regex)];
    const result = capth.map(capth => ({[capth[1]]:capth[2]}));
    return result.length !== 0 ? result: "not link";
}


//async/await

async function searchFile(filePath){
    try{
    const linguage = 'utf-8'
    const text = await fs.promises
    .readFile(filePath, linguage)
    return (extractLink(text));
    } catch(erro){
        tratarError(erro)
    }
}


export default searchFile