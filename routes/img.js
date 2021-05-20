const express = require('express');
const multer = require("multer") 
const fs = require('fs')
const path = require('path')

const imgRouter = express.Router();

// 上传文件配置
const upload = multer ({
  // 上传文件的存储目录
  dest: 'D:/project/vueModule/project04/src/assets/upload', 
  // 单个文件大小限制在2M以内
  limits: {
      fileSize: 1024 * 1024 * 2
  }
})
imgRouter.post('/', upload.single('upload'), (req, res) => {
  // 上传成功后的文件对象
  let { file } = req
  if (file) {
      //  file.originalname ==> 文件的原名称
      let extname = path.extname(file.originalname)
      // file.path ==> 上传后的文件路径
      fs.renameSync(file.path, file.path + extname)
      // file.filename ==> 上传后的文件名
      req.uploadUrl = file.filename + extname
  }
  res.send({uploadUrl: req.uploadUrl, file: file})
})

module.exports = imgRouter;
