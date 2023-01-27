import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postProduct(data:any){
   return this.http.post<any>("https://products-cpy2.onrender.com/allProductsList/",data) 
  //  return this.http.post<any>("http://localhost:4500/todo/add",data) 
  
  }

  getdata(){
 return this.http.get<any>("https://products-cpy2.onrender.com/allProductsList/") 
//  return this.http.get<any>("http://localhost:4500/todo/") 
  }


  putProduct(data:any,id:number){
    return this.http.put<any>("https://products-cpy2.onrender.com/allProductsList/"+id,data) 
    // return this.http.put<any>("http://localhost:4500/todo/edit/"+_id,data)
  }

  
  deleteProduct(id:number){
    return this.http.delete<any>("https://products-cpy2.onrender.com/allProductsList/"+id) 
    // return this.http.delete<any>("http://localhost:4500/todo/delete/"+_id)
  }
}
