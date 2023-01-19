import chalk from "chalk";

function extractlinks (arrlinks){
    return arrlinks.map((Objectlink) => Object.values(Objectlink).join())
}
async function checkStatus (listURLs){
    const arrStatus = await Promise
    .all(
        listURLs.map(async(url)=>{
            try{
                const response = await fetch (url)
                return response.status
            }catch(erro){
                return handleErrors(erro);
            }
        })
    )
    return arrStatus;
}

function handleErrors (erro){
    if(erro.cause.code === 'ENOTFOUND'){
        return 'link not found'
    }else{
        return'some error occurred'
    }
}

export default async function validatedList (listlinks){
    const links = extractlinks(listlinks);
    const status = await checkStatus(links);
    return listlinks.map((Object, indice) =>({
        ...Object,
        status: status[indice]
    }))
}
