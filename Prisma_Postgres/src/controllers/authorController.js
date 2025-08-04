const authorService = require("../services/authorService")

exports.addAuthor = async (req, res) => {
      try {
            const { name } = req.body
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

exports.deleteAuthor = async (req, res) => {
      try {
            const deletedAuthorData = await authorService.deleteAuthor(parseInt(req.params.id))
            res.status(201).json({
                  message: "Author deleted successfully",
                  date: deletedAuthorData
            })
      } catch (error) {
            console.log("Error while deleting author", error);

      }


}