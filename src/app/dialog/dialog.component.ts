
import { Component,Inject,OnInit} from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {
freshnessList=["Brand New","SecondHand","Refurbished"]
//reactive Form create

productForm !: FormGroup;

actionBtn:string="Save"

constructor(private formBuilder:FormBuilder ,private api:ApiService ,
  @Inject(MAT_DIALOG_DATA)  public editData:any,
  private dialogRef:MatDialogRef<DialogComponent>){}
   
  ngOnInit():void{
  
this.productForm=this.formBuilder.group({
  productName:["",Validators.required],
  category:["",Validators.required],
  freshness:["",Validators.required],
  price:["",Validators.required],
  comment:["",Validators.required],
  date:["",Validators.required]  
})

//we get the data after click on edit button
console.log(this.editData)
if(this.editData){
  this.actionBtn="Update"
  // after getting the data on my form then i am patching all the data
  this.productForm.controls['productName'].setValue(this.editData.productName)
  this.productForm.controls['category'].setValue(this.editData.category)
  this.productForm.controls['freshness'].setValue(this.editData.freshness)
  this.productForm.controls['price'].setValue(this.editData.price)
  this.productForm.controls['comment'].setValue(this.editData.comment)
  this.productForm.controls['date'].setValue(this.editData.date)
}
}
submitdata(){

if(!this.editData){
  //add function 
  if(this.productForm.valid){
    this.api.postProduct(this.productForm.value).subscribe({
      next:(res)=>{
        alert("Product added Sucessfully")
        this.productForm.reset()
        this.dialogRef.close('save')
      },error:()=>{
        alert("Fill all the detail")
      }
    })
  }
}else{
 this.updateProduct()
}
}

// update function 
updateProduct(){
this.api.putProduct(this.productForm.value,this.editData.id)
.subscribe({
  next:(res)=>{
    alert("Product Update Succesfully")
    this.productForm.reset();
    this.dialogRef.close('update')
  },error:()=>{
    alert("error while updating the record ")
  }
})
}
}
