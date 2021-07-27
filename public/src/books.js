function findAuthorById(authors, id) {
  let results = authors.filter((match) => match.id == id);
  return results[0]
}

function findBookById(books, id) {
  let results = books.filter((match) => match.id == id);
  return results[0];
}

function partitionBooksByBorrowedStatus(books) {
  let available = [];
  let unavailable = [];
  
  const bookStatuses = [];
  books.filter((book) => {
    if (book.borrows[0].returned) { // if book is not returned
      unavailable.push(book);
    } else { // if book is returned
      available.push(book);
    }
  });
  bookStatuses.push(available);
  bookStatuses.push(unavailable);
  return bookStatuses;
}

function getBorrowersForBook(book, accounts) {
  const { borrows } = book;
  const borrowers = borrows.map(({ id, returned })=> {
    const account = accounts.find(account => account.id === id);
    return {
      ...account,
      returned,
    };
  });
  return borrowers
    .sort((borrowerA, borrowerB) => {
      const companyA = borrowerA.company;
      const companyB = borrowerB.company;
      return companyA.localeCompare(companyB);
    })
    .slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
