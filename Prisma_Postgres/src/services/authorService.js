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
module.exports = {addAuthor}