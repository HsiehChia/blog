/**
 * 文章中间件
 */
 const Article = require('../model/articleModel')
 module.exports = {
     /**
      * 获取文章列表
      * @param {*} req 请求数据
      * @param {string} res 返回数据
      * @param {*} next 下一个
      */
     getArticle: (req, res, next) => {
         Article.getArticle().then(results => {
             req.articleList = results
             next()
         }).catch(err =>{
             next(err)
         })
     },
     /**
      * 获取文章总数
      * @param {*} req 
      * @param {string} res 
      * @param {*} next 
      */
     getArticleTotal: (req, res, next) => {
        let {
            category_id,
            isHot
        } = req.query
         Article.getArticleTotal(category_id, isHot).then(results => {
             req.articleTotal = results
             next()
         }).catch(err =>{
             next(err)
         })
     },
     getHotArticleList: (req, res, next) => {
         Article.getHotArticleList().then(results => {
             req.hotArticleList = results
             next()
         }).catch(err =>{
             next(err)
         })
     },
     /**
      * 获取文章类别列表
      * @param {*} req 
      * @param {object} res 
      * @param {*} next 
      */
     getCategory: (req, res, next) => {
        Article.getCategory().then(results => {
            req.categoryList = results
            next()
        }).catch(err =>{
            next(err)
        })
    },
     /**
      * 获取当前页文章数据
      * @param {*} req 
      * @param {*} res 
      * @param {*} next 
      */
     getArticlePage: (req, res, next) => {
         let { 
             start, 
             size
         } = req
         let {
            category_id,
            isHot
        } = req.query
         Article.getArticlePage(start, size, category_id, isHot).then(results => {
             req.articlePageList = results
             next()
         }).catch(err =>{
             next(err)
         })
     },
     /**
      * 修改当前页面热门
      * @param {*} req 
      * @param {*} res 
      * @param {*} next 
      */
      editArticleHot: (req, res, next) => {
         let {
             isHot,
             id
         } = req.body
         Article.editArticleHot(isHot, id).then(results => {
             req.affectedRows = results
             next()
         }).catch(err => {
             next(err)
         })
     },
     /**
      * 删除文章
      * @param {*} req 
      * @param {*} res 
      * @param {*} next 
      */
     deleteArticle: (req, res, next) => {
        let { id } = req.body
        Article.deleteArticle(id).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 添加文章
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    addArticle: (req, res, next) => {
        let { title, content, isHot, category_id} = req.body
        let thumbnail = req.body.thumbnail ? req.body.thumbnail : null
        let createTime = new Date()
        Article.addArticle(title, content, isHot, category_id, thumbnail, createTime).then(results => {
            req.insertId = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 修改文章
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    editArticle: (req, res, next) => {
        let { title, content, isHot, category_id, thumbnail, id} = req.body
        Article.editArticle(title, content, isHot, category_id, thumbnail, id).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 通过id获得文章信息
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getArticleById: (req, res, next) => {
        let { id } = req.query
        Article.getArticleById(id).then(results => {
            req.articleInfo = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * hits+1
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    addHits: (req, res, next) => {
        let { id } = req.body
        Article.addHits(id).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    /**
     * 获取指定关键词的文章列表
     */
     getListBykeyword: (req, res, next) => {
        let keyword = req.query.keyword
        keyword = '%'+keyword+'%'
        Article.getListBykeyword(keyword).then(results => {
            req.articleList = results
            next()
        }).catch(err => {
            next(err)
        })
    },
 }