const fs = require('fs')
const path = require('path')

/**
 * @param {string[]} args
 */
function main(args) {
  // Source folders are all but the last argument.
  const srcArgs = args.slice(0, args.length -1)

  // Destination folder is the last argument.
  const destArg = args[args.length - 1]

  // Iterate source folders.
  srcArgs.forEach((folder) => {
    const folderBase = path.basename(folder)
    const fileNames = fs.readdirSync(folder)

    fileNames.forEach((name) => {
      const sourceName = path.join(folder, name)
      const destFolder = path.join(destArg, folderBase)
      const destName = path.join(destArg, folderBase, name)
      const buf = fs.readFileSync(sourceName)
      const module = `module.exports = \`${buf}\``

      fs.mkdir(destFolder, (err) =>  fs.writeFileSync(destName, module))
    })
  })
}

if (!module.parent) {
  main(process.argv.slice(2))
}
