## A user who just looks for sth nice

### App: BooksApp v1

### Description
Given that the focus of your load tests is to recreate how real users behave on the website, you need to 
take into account some dose of randomness. In some cases, the users will go straight through the process 
to just buy the desired book. At other times, they will look for a nice book by just going through 
the main page. Like looking for a Christmas present, you take a look what's available, you
read some details, you go back and look for another book. Quite often you repeat this process
until you find sth you finally want to buy.

### Task
Create a user journey that would represent the behaviour described above.

1. Go to main page with books listing
2. Go to book's details
3. Go back to main page
4. Go to another book's details
5. Again go back to main page
6. Go to third book's details
7. Add the book to basket
8. Go to basket
9. Submit order

### Success Criteria:
- the user journey is executed in the above order
- some users don't loop between main page and book's details but go straight to the basket
- the user journey can be executed for one thread as well as ten threads
- don't use search book request, try to extract book id from the main page
- make the user always pick a different book when going into the details

### Tips:
- read the repository's `/loadKatas/README.md`
- take a look at swagger endpoint of the booksApp v1
- basket is assigned either to sessionId or userId




