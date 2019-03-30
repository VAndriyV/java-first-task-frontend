
export default class FetchApiService{

    _apiBase = "http://127.0.0.1:8888/api/";

    getRequest = async (url) => {
        const authHeader =localStorage.getItem("token")? "Bearer "+localStorage.getItem("token") :""; 
        const res = await fetch(`${this._apiBase}${url}`,{
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": authHeader              
              }
        });        
        if (!res.ok) {                        
            
           var errorMsg = await res.text();
           
           throw errorMsg;

        }
        return await res.json();
    };

    postRequest = async(url,body)=>{
        const authHeader =localStorage.getItem("token")? "Bearer "+localStorage.getItem("token") :""; 
        const res = await fetch(`${this._apiBase}${url}`,{
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              "Authorization": authHeader   
            },
            body: JSON.stringify(body)
          });         
        if (!res.ok) {                        
            
           var errorMsg = await res.text();
           
           throw errorMsg;

        }
        return await res.text();
    };

    checkUserStatusRequest = async (url) => {
        const authHeader =localStorage.getItem("token")? "Bearer "+localStorage.getItem("token") :""; 
        const res = await fetch(`${this._apiBase}${url}`,{
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": authHeader              
              }
        });        
        if (!res.ok) {                        
            
           var errorMsg = await res.text();
           
           throw errorMsg;

        }
        return await res.text();
    };


    loginRequest = async(url,body)=>{
        const authHeader =localStorage.getItem("token")? "Bearer "+localStorage.getItem("token") :""; 
        const res = await fetch(`${this._apiBase}${url}`,{
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              "Authorization": authHeader 
            },
            body: JSON.stringify(body)
          });  

        if (!res.ok) {                        
            
           var errorMsg = await res.text();
           
           throw errorMsg;

        }      
               
        return res.headers.get("authorization")
    }


    getBooksRange = async (limit,offset) => {
       
        const path = `booksRange?limit=${limit}&offset=${offset}`;

        const result = await this.getRequest(path);
        
        return result;
    };

    getAuthors = async()=>{
        const path = 'authors';

        const result = await this.getRequest(path);
        
        return result;
    };

    getBooksByGenre = async(genre,limit,offset)=>{
        const path = `booksByGenre?genre=${genre}&limit=${limit}&offset=${offset}`;

        const result = await this.getRequest(path);

        return result;      
    };

    getBooksByAuthorId = async(authorId,limit,offset)=>{      
        const path = `booksByAuthor?authorId=${authorId}&limit=${limit}&offset=${offset}`;

        const result = await this.getRequest(path);

        return result;      
    };

    login = async(userLoginData)=>{
        const path = 'login';

        const result = await this.loginRequest(path,userLoginData);

        return result;
    };

    registration = async(userRegistrationData)=>{
        const path = 'registration';

        const result = await this.postRequest(path,userRegistrationData);

        return result;
    }

    checkIsLoggedIn = async()=>{
        const path = 'isLoggedIn';

        const result = await this.checkUserStatusRequest(path);

        return result;
    }

}