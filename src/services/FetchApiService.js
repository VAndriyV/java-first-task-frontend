export default class FetchApiService {
  _apiBase = "http://127.0.0.1:8888/api/";

  getRequest = async url => {

    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Accept','application/json');

    const authHeader = localStorage.getItem("token")
      ? "Bearer " + localStorage.getItem("token")
      : "";

    if(authHeader!==""){
      headers.append('Authorization',authHeader);
    }
    const res = await fetch(`${this._apiBase}${url}`, {
      method: "GET",
      credentials: "same-origin",
      headers: headers
    });
    if (!res.ok) {
      var errorMsg = await res.json();

      throw errorMsg;
    }
    return await res.json();
  };

  postRequest = async (url, body) => {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Accept','application/json');
    
    const authHeader = localStorage.getItem("token")
      ? "Bearer " + localStorage.getItem("token")
      : "";

    if(authHeader!==""){
      headers.append('Authorization',authHeader);
    }
    const res = await fetch(`${this._apiBase}${url}`, {
      method: "POST",
      credentials: "same-origin",
      headers: headers        ,
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      var errorMsg = await res.json();

      throw errorMsg;
    }

    return await res.json();
  };

  putRequest = async (url, body) => {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Accept','application/json');
    
    const authHeader = localStorage.getItem("token")
      ? "Bearer " + localStorage.getItem("token")
      : "";

    if(authHeader!==""){
      headers.append('Authorization',authHeader);
    }
    const res = await fetch(`${this._apiBase}${url}`, {
      method: "PUT",
      credentials: "same-origin",
      headers: headers,
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      var errorMsg = await res.json();

      throw errorMsg;
    }

    return await res.json();
  };

  checkUserStatusRequest = async url => {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Accept','application/json');
    
    const authHeader = localStorage.getItem("token")
      ? "Bearer " + localStorage.getItem("token")
      : "";

    if(authHeader!==""){
      headers.append('Authorization',authHeader);
    }
    const res = await fetch(`${this._apiBase}${url}`, {
      method: "GET",
      credentials: "same-origin",
      headers:headers
    });
    if (!res.ok) {
      throw new Error("Not authorized");
    }

    return await res.json();
  };

  loginRequest = async (url, body) => {

    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('Accept','application/json');
    
    const authHeader = localStorage.getItem("token")
      ? "Bearer " + localStorage.getItem("token")
      : "";

    if(authHeader!==""){
      headers.append('Authorization',authHeader);
    }

    const res = await fetch(`${this._apiBase}${url}`, {
      method: "POST",
      credentials: "same-origin",
      headers: headers,
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      var errorMsg = await res.json();

      throw errorMsg;
    }

    return res.headers.get("authorization");
  };

  getBooksRange = async (limit, offset) => {
    const path = `books?limit=${limit}&offset=${offset}`;

    const result = await this.getRequest(path);

    return result;
  };

  getAuthors = async () => {
    const path = "authors";

    const result = await this.getRequest(path);

    return result;
  };

  getBooksByGenre = async (genre, limit, offset) => {
    const path = `booksByGenre?genre=${genre}&limit=${limit}&offset=${offset}`;

    const result = await this.getRequest(path);

    return result;
  };

  getBooksByAuthorId = async (authorId, limit, offset) => {
    const path = `booksByAuthor?authorId=${authorId}&limit=${limit}&offset=${offset}`;

    const result = await this.getRequest(path);

    return result;
  };

  getBooksByTitle = async (title,limit,offset)=>{
    const path = `booksByTitle?title=${title}&limit=${limit}&offset=${offset}`;

    const result = await this.getRequest(path);

    return result;
  };

  login = async userLoginData => {
    const path = "login";

    const result = await this.loginRequest(path, userLoginData);

    return result;
  };

  registration = async userRegistrationData => {
    const path = "registration";

    const result = await this.postRequest(path, userRegistrationData);

    return result;
  };

  checkIsLoggedIn = async () => {
    const path = "isLoggedIn";

    const result = await this.checkUserStatusRequest(path);

    return result;
  };

  makeOrder = async orderData => {
    const path = "makeOrder";

    const result = await this.postRequest(path, orderData);

    return result;
  };

  getAvailability = async cartItems => {
    const path = "getAvailability";

    const result = await this.postRequest(path, cartItems);

    return result;
  };

  addAuthor = async author => {
    const path = "addAuthor";

    const result = await this.postRequest(path, author);

    return result;
  };

  updateAuthor = async author=>{
    const path = "updateAuthor";

    const result = await this.putRequest(path,author);
    
    return result;
  };

  addBook = async book => {
    const path = "addBook";

    const result = await this.postRequest(path, book);

    return result;
  };

  updateBook = async book=>{
    const path = "updateBook";

    const result = await this.putRequest(path,book);
    
    return result;
  };

  getUserBooksByEmail = async email=>{
    const path = `userBooks?email=${email}`;

    const result = await this.getRequest(path);

    return result;
  };

  updateUserBook = async userBook=>{
    const path = 'updateUserBook';

    const result = await this.putRequest(path,userBook);

    return result;

  };
}
