function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let sum = 0;
  books.filter((match) => {
      if (match.borrows.some((borrow) => borrow.returned === false)) sum++;
  });
  return sum;
}

function getMostCommonGenres(books) {
  const bookGenres = books.map((book) => book.genre);
  const temp = [];
  
  bookGenres.map((genre) => {
   
    const genreLocation = temp.findIndex((element) => element.name === genre);
   
    if (genreLocation >= 0) {
      temp[genreLocation].count = temp[genreLocation].count + 1;
    } else {
      temp.push({ name: genre, count: 1 });
    }
  });
  return temp.sort((a, b) => b.count - a.count)
               .slice(0, 5);
}

function getMostPopularBooks(books, count=5) {
    const borrows = books.map(book=>({name:book.title, count:book.borrows.length}));
    borrows.sort((a,b) => b.count - a.count);
    return borrows.slice(0,count);
}


function getMostPopularAuthors(books, authors) {
  const topAuthors = authors
      .map((a) => ({ ...a, bookCount: books.filter((b) => b.authorId === a.id).length, borrowCount: books.filter((b) => b.authorId === a.id).reduce((acc, cur) => acc + cur.borrows.length, 0) }))
      .sort((b, a) => a.borrowCount - b.borrowCount);
  topAuthors.length = 5;
  return topAuthors.map((ta) => {
      return { count: ta.borrowCount, name: ta.name.first + " " + ta.name.last };
  });
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
