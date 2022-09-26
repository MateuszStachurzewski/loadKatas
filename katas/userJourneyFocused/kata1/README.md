## Warmup Kata

### App: BooksApp v1

### Description
When designing load tests you may focus on at least two paths:
- either you focus on a single endpoint
- or you're interested in the whole user path

There are numerous traffic patterns that you can test against, but
before you move to the patterns you need a foundation.

### Task
Create an organized test script that would cover the following user path:
1. Go to main page with books listing
2. Search for a book by name
3. Go to book's details
4. Add the book to basket
5. Go to basket
6. Submit order

Try to group paths e.g.:
1. Find book
   1. Go to main page with books listing
   2. Search for a book by name
   3. Go to book's details
2. Add to basket
   4. Add the book to basket
3. Buy
   1. Go to basket
   2. Submit order

### Success Criteria:
- when running a load test script, all endpoints are organized in a user journey
- the user journey is executed orderly
- the user journey can be executed for one thread as well as ten threads

The organization is up to you, just try to organize paths in groups.
Organizing paths in groups may turn out to be handy e.g.:
- it increases transparency
- it enables applying some attributes or conditions in batch
- any other reason that is dictated by the project's needs

### Tips:
- read the repository's `/loadKatas/README.md`
- take a look at swagger endpoint of the booksApp
- I encourage you to extracting some variables 
and passing them to other paths
- basket is assigned either to sessionId or userId




