// const os = require('os');
// const path = require('path');
// const fs = require('fs');

// // Crea un directorio temporal único para el perfil de Firefox
// const tempProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'firefox-profile-'));

// module.exports = {
//   browsers: [
//     {
//       browserName: 'firefox',
//       'moz:firefoxOptions': {
//         args: [
//           '--headless',
//           `--profile=${tempProfile}`, // Asigna un perfil temporal único
//           '--no-remote'  // Asegura que no se intente usar sesiones previas
//         ]
//       }
//     }
//   ]
// };
