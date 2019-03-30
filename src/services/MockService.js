
export default class MockService {

    books = [
            {
              "id": 1,
              "title": "1984",
              "author": {
                "id": 3,
                "firstName": "George",
                "lastName": "Orwell"
              },
              "genre": {
                "id": 1,
                "name": "Dyspotia"
              },
              "year": 1949,
              "totalCount": 23,
              "availableCount": 12
            },
            {
              "id": 2,
              "title": "The Adventures of Tom Sawyer",
              "author": {
                "id": 4,
                "firstName": "Mark",
                "lastName": "Twain"
              },
              "genre": {
                "id": 2,
                "name": "Novel"
              },
              "year": 1876,
              "totalCount": 5,
              "availableCount": 0
            },
            {
              "id": 5,
              "title": "Life on the Mississippi",
              "author": {
                "id": 4,
                "firstName": "Mark",
                "lastName": "Twain"
              },
              "genre": {
                "id": 3,
                "name": "Memoir"
              },
              "year": 1883,
              "totalCount": 4,
              "availableCount": 2
            },
            {
              "id": 6,
              "title": "Adventures of Huckleberry Finn",
              "author": {
                "id": 4,
                "firstName": "Mark",
                "lastName": "Twain"
              },
              "genre": {
                "id": 2,
                "name": "Novel"
              },
              "year": 1884,
              "totalCount": 30,
              "availableCount": 30
            }
            ,
            {
              "id": 2,
              "title": "The Adventures of Tom Sawyer",
              "author": {
                "id": 4,
                "firstName": "Mark",
                "lastName": "Twain"
              },
              "genre": {
                "id": 2,
                "name": "Novel"
              },
              "year": 1876,
              "totalCount": 5,
              "availableCount": 0
            },
            {
              "id": 5,
              "title": "Life on the Mississippi",
              "author": {
                "id": 4,
                "firstName": "Mark",
                "lastName": "Twain"
              },
              "genre": {
                "id": 3,
                "name": "Memoir"
              },
              "year": 1883,
              "totalCount": 4,
              "availableCount": 2
            },
            {
              "id": 6,
              "title": "Adventures of Huckleberry Finn",
              "author": {
                "id": 4,
                "firstName": "Mark",
                "lastName": "Twain"
              },
              "genre": {
                "id": 2,
                "name": "Novel"
              },
              "year": 1884,
              "totalCount": 30,
              "availableCount": 30
            }
            ,
            {
              "id": 2,
              "title": "The Adventures of Tom Sawyer",
              "author": {
                "id": 4,
                "firstName": "Mark",
                "lastName": "Twain"
              },
              "genre": {
                "id": 2,
                "name": "Novel"
              },
              "year": 1876,
              "totalCount": 5,
              "availableCount": 0
            }           
          ];

    authors = [
            {
              "id": 2,
              "firstName": "Ernest",
              "lastName": "Hemingway"
            },
            {
              "id": 3,
              "firstName": "George",
              "lastName": "Orwell"
            },
            {
              "id": 4,
              "firstName": "Mark",
              "lastName": "Twain"
            },
            {
              "id": 5,
              "firstName": "Ernest",
              "lastName": "Hemingway"
            },
            {
              "id": 6,
              "firstName": "George",
              "lastName": "Orwell"
            },
            {
              "id": 7,
              "firstName": "Mark",
              "lastName": "Twain"
            }
          ];

          getBooks() {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                if (Math.random() < 0) {
                  reject(new Error('Something bad happened'));
                } else {
                  resolve(this.books);
                }
              }, 700);
            });
          }
    
          getAuthors() {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                if (Math.random() < 0) {
                  reject(new Error('Something bad happened'));
                } else {
                  resolve(this.authors);
                }
              }, 700);
            });
          }
}