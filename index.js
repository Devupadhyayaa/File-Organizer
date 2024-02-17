const fs = require("fs/promises");
const dirpath = "yout/path";

async function readdirectory(){
    try {
        const files = await fs.readdir(dirpath);
        return files;
    } 
    catch (err) {
        console.log("Error is", err.message);
        throw err;
    }
}

(async ()=>{
    try{
        const allfiles = await readdirectory();
        // create folders with the name of extensions
        const hash={};
        for(str of allfiles){
            const frequency = str.split('.').length - 1;
            if(frequency==0||frequency>1)continue;
            var sufix = str.split('.').pop();
            if (!hash.hasOwnProperty(sufix)) {
                hash[sufix] = 0;
            }
            hash[sufix]++;
            if(sufix!='json'&&hash[sufix]===1&&sufix!='js'){
                const newpth = `${dirpath}/${sufix}`;
                await fs.mkdir(newpth);
            }
        }
        //  now lets move the files 
        for(str of allfiles){
            const frequency = str.split('.').length - 1;
            if(frequency==0||frequency>1)continue;
            var sufix = str.split('.').pop();
            if(sufix!='json'&&sufix!='js'){
                const oldpth = `${dirpath}/${str}`;
                const newpath = `${dirpath}/${sufix}/${str}`;
                await fs.rename(oldpth,newpath);
            }
        }
    }
    catch (e){
        throw e;
    }
})();
