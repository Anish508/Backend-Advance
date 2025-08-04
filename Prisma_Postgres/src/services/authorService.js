const { PrismaClient } = require("@prisma/client")


const prisma = new PrismaClient()

async function addAuthor(name) {
      try {
            const newlyCreatedAuthor = await prisma.author.create({
                  data: {
                        name,
                  }
            })
            return newlyCreatedAuthor
      } catch (error) {
            console.log("Author creation error:", error);

      }
}
async function deleteAuthor(id) {
      const existedAuthor = await prisma.author.findUnique({
            where : {id: parseInt(id)}
      })

      if(!existedAuthor){
             throw new Error(`Author with ID ${id} not found.`);
      }

      const deletedAuthor = await prisma.author.delete({
            where : {id : parseInt(id)},
            include: {books: true}
      })
      return deletedAuthor
}
module.exports = {addAuthor, deleteAuthor}