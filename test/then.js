// then

function searchfile (filepath){
    const linguage = 'utf-8';
    fs.promises
    .readFile(filepath, linguage)
    .then((text)=> console.log(chalk.blue(text)))
    .catch (tratarError)
}

searchfile('./arquivos/texto.md')
