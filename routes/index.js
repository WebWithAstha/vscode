var express = require('express');
var router = express.Router();
const fs = require('fs')
const folder = "UplodFolder"


/* GET home page. */

router.get('/', function (req, res, next) {
  fs.readdir(`./${folder}`, { withFileTypes: true }, function (err, files) {
    res.render('index', { folder, files });
  })
});

// refresh route

router.get('/refresh', function (req, res, next) {
  res.redirect('back')
});

// opening file

router.get('/file/:filename', function (req, res, next) {
  fs.readdir(`./${folder}`, { withFileTypes: true }, function (err, files) {
    fs.readFile(`./${folder}/${req.params.filename}`, { withFileTypes: true }, function (err2, filedata) {
      res.render('fileOpen', { folder, files, filedata, fileopen: req.params.filename });
    })
  })
});

// saving file

router.get('/savefile/:filename', function (req, res, next) {
  fs.writeFile(`./${folder}/${req.params.filename}`, `${req.query.filecontent}`, function (err) {
    res.redirect(`/file/${req.params.filename}`)
  })
});

//opening folder

router.get('/folder/:foldername', function (req, res, next) {
  fs.readdir(`./${folder}`, { withFileTypes: true }, function (err, files) {
    fs.readdir(`./${folder}/${req.params.foldername}`, { withFileTypes: true }, function (err,nestedfiles) {
      res.render('folderOpen', { folder,files ,nestedfiles,openedfolder:req.params.foldername});
      console.log(nestedfiles)
    })
  })
});

// creating file

router.get('/createfile', function (req, res, next) {
  fs.writeFile(`./${folder}/${req.query.newfile}`, "", function (err) {
    res.redirect('back')
  })
});

// creating folder

router.get('/createfolder', function (req, res, next) {
  fs.mkdir(`./${folder}/${req.query.newfolder}`, function (err) {
    res.redirect('back')
  })
});

// deleting file

router.get('/delete/file/:filename', function (req, res, next) {
  fs.unlink(`./${folder}/${req.params.filename}`, function (err) {
    res.redirect('back')
  })
});

// deleting folder

router.get('/delete/folder/:foldername', function (req, res, next) {
  fs.rmdir(`./${folder}/${req.params.foldername}`, function (err) {
    res.redirect('back')
  })
});

// updating file/folder name

router.get('/update/:filename', function (req, res, next) {
  fs.rename(`./${folder}/${req.params.filename}`, `./${folder}/${req.query.updatedfile}`, function (err) {
    res.redirect('/')
  })
});


module.exports = router;
