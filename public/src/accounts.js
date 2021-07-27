function findAccountById(accounts, id) {
  let results = accounts.filter((match) => match.id == id);
  return results[0];
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) => accountB["name"]["last"].toLowerCase() > accountA["name"]["last"].toLowerCase() ? -1 : 1);
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  let sum = 0;
  books.filter((match) => {
      if (match.borrows.some((borrow) => borrow.id === account.id)) sum++;
  });
  return sum;
}

function getBooksPossessedByAccount(account, books, authors) {
  let results = [];
  books.filter(book =>
    book.borrows.some((borrow) => {
      if (borrow.id === account.id && borrow.returned === false) {
        const author = authors.filter(author => author.id === book.authorId)
        const tempObject = {
          author: author[0],
          ...book
        }
        results.push(tempObject)
      }
    }
   )
  )
  return results
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
