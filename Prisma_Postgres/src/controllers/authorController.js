const authorService = require("../services/authorService")

exports.addAuthor = async(req, res)=>{
try {
     const {name}  = req.body
     const author = await authorService.addAuthor(name);
     res.status(200).json({
      success: true,
      data: author,
     })
} catch (error) {
      console.log("Error while adding user-server-error");
      throw error
}
}

