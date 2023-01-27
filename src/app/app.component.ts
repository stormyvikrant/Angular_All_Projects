import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'angulartodo';
  displayedColumns: string[] = ['productName', 'category', 'freshness', 'date','price','comments','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog ,private getapi:ApiService) {}
  ngOnInit(): void {
    this.getAllData();
  }
  //open dialog box
  openDialog() {
    this.dialog.open(DialogComponent,{
    
      panelClass:'dialog-panel'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllData()
      }
    })
 
  }

// get all data

getAllData(){
  this.getapi.getdata().subscribe({
    next:(res)=>{
      this.dataSource=new MatTableDataSource(res)
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort
    }
    ,error(err){
      alert("Error while fetching the Records")
    }
  })
}

//filter function

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


//edit function
editProduct(row:any){
  this.dialog.open(DialogComponent,{
    panelClass:'dialog-panel',

    data:row
  }).afterClosed().subscribe(val=>{
    if(val==='update'){
      this.getAllData()
    }
  })
}
//delete function

deleteProduct(id:number){
  console.log(this.getapi.deleteProduct(id))
  this.getapi.deleteProduct(id).subscribe({
    next:(res)=>{
      alert("Product Deleted Succesfully")
      this.getAllData()
    },error:()=>{
      alert("Error while deleting the record")
    }
  })
}
}
