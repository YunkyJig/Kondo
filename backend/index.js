const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 3001

const { 
  readdir,
  mkdir,
  rename
} = require('node:fs/promises');

app.use(cors())

// logging every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const formatPath = (path) => {
  if(process.platform === "linux") {
      console.log('before path formatting:', path)
      path = `/mnt/c/${path.replaceAll('\\', '/').substring(3,)}`
      console.log('after path formatting:', path)
      return path
  }
}

const getSubfolderNames = async (folderpath) => {
  // console.log('folderpath', folderpath)
  return (await readdir(formatPath(folderpath), { withFileTypes: true }))
                          .filter(dirent => dirent.isDirectory())
                          .map(dirent => dirent.name)
}

// maybe i have to pass in folder path in the body
// use encodeURIComponent() for url e.g encodeURIComponent(subfolders/C:dimit\....)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
app.get('/subfolders/:folderpath', async (req, res) => {
    const folderpath = req.params.folderpath

    try {
        const t1 = performance.now()
        const folderNames = await getSubfolderNames(folderpath)
        const t2 = performance.now()
        
        console.log(`took ${t2 - t1} milliseconds`)
        // for (const folderName of folderNames)
        //   console.log(folderName);
        
        res.json(folderNames)
      } catch (err) {
        console.error(err);
      }
})

// makes new subfolder
app.post('/subfolders/:folderpath', async (req, res) => {
  const folderpath = formatPath(req.params.folderpath)
  console.log(folderpath)
  try {
    await mkdir(folderpath)
    console.log(`${folderpath} created`)
    res.status(201).end()
  }
  catch(err) {
    console.error(err)
    res.status(500).end()
  }
})

app.post('/file/', async (req, res) => {
  let { source, dest } = req.query
  source = formatPath(source)
  dest = formatPath(dest)

  // console.log(source, dest)
   try {
    await rename(source, dest);
    console.log('File moved successfully', dest);
  } catch (err) {
    console.error(err);
  }
  res.status(200).end()
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});