

class Payload {

    constructor(data = {commands: path, events: eventPath, owners: owners, prefix: prefix, client: client}) {
        this.data = data
        
    }
    getPayload() {

        return this.data

    } 

    

    /**
     * 
     * Gets all file directories and puts it into an Array.
     */

    async fileCache() {

        const {join} = require('path')
    
        let commands = this.data.commands
    
         let commandsPath = join(require.main.path, commands)

       
        
      
       const { resolve } = require('path');
       const { readdir } = require('fs').promises;

       //let categories = await readdir(commandsPath, 'utf8')
       async function getFiles(dir) {
         const dirents = await readdir(dir, { withFileTypes: true });
         const files = await Promise.all(dirents.map((dirent) => {
           const res = resolve(dir, dirent.name);
           return dirent.isDirectory() ? getFiles(res) : res;
         }));
         return Array.prototype.concat(...files);
       }


       let allRegisteredFiles = await getFiles(commandsPath)
       
       return allRegisteredFiles


    }



 

}




module.exports.Payload = Payload