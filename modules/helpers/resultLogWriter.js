export const name = "resultLogWriter";

import fs from 'fs';
import path from 'path';


function initResults( experimentName ){
    var dir = "results/" + experimentName;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    } else {
        fs.readdir(dir, (err, files) => {
            if (err) throw err;
          
            for (const file of files) {
              fs.unlink(path.join(dir, file), (err) => {
                if (err) throw err;
              });
            }
          });
    }
}

async function writeResult(experimentName, trial, content) {
  const resultPath = `results/${experimentName}/${trial}.txt`;

  // Asegurarse de que el contenido sea una cadena
  if (typeof content !== 'string') {
      content = JSON.stringify(content);
  }
  
  fs.appendFile(resultPath, content, (err) => {
      if (err) {
          console.error(err);
      } else {
          //console.log(`Result written successfully to ${resultPath}`);
      }
  });
}


export { writeResult, initResults };
