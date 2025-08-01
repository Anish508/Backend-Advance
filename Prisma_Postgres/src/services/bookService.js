const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function AddBook(title, publishedDate, authorId) {
      try {
            const newlyCreatedBook = await prisma.book.create({
                  data: {
                        title,
                        publishedDate,
                        author: {
                              connect: { id: authorId }
                        }
                  }, include: { author: true }
            })
            return newlyCreatedBook
      } catch (error) {
            console.log("Error:", error);
            throw error
      }
}

async function getAllBooks() {
      try {
            const books = await prisma.book.findMany({
                  include: { author: true }
            })
            return books
      } catch (error) {
            console.log("error:", error);
            throw error
      }
}

async function getBookById(id) {
      try {
            const singleBook = await prisma.book.findUnique({
                  where: { id },
                  include: { author: true }
            })
            if (!singleBook) {
                  throw new Error(`Book with ${id} not found`)
            }
            return singleBook
      } catch (error) {
            console.log("Error", error);

      }
}

async function updateBook(id, newTitle) {
      try {
            /* const singleBook = await prisma.book.findUnique({
                 where: {id},
                 include :{author: true}
           })

            if(!singleBook){
                 throw new Error(`Book with ${id} not found`)
           }
           
           const updatedBook = await prisma.book.update({
                 where: {id},
                 data: {
                       title: newTitle
                 },
                 include:{
                       author: true
                 }
           }) 
            
           return updatedBook */

            //using transaction
            const updatedBook = await prisma.$transaction(async (prisma) => {
                  const book = await prisma.book.findUnique({
                        where: { id },

                  })
                  if(!book){
                        throw new Error(`Book with ${id} not found`)
                  }
                  return prisma.book.update({
                        where : {id},
                        data:{
                              title: newTitle
                        },
                        include: {author: true}
                  })
            })
          return updatedBook
      } catch (error) {
            throw error
      }
}
async function deleteBook(params) {
      try {
           const deletedBook= await prisma.book.delete({
            where : {id},
            include : {author: true}
           }) 
           return deleteBook
      } catch (error) {
          throw error  
      }
}
module.exports = { AddBook, getAllBooks, getBookById, deleteBook, updateBook }