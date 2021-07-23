import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { DataApiService } from '../../services/data-api.service';
import { employeeModel } from '../../viewModels/employee';
import { EditComponent } from '../edit/edit.component';

declare var $: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  dataList: any = [];
  data: employeeModel[] = [];
  private subscription: Subscription[] = [];

POSTS: any;
  page = 1;
  count = 0;
  tableSize = 10;

  issueForm: FormGroup;
  closeResult='';
  constructor(private allData: DataApiService, private router: Router, private httpClient: HttpClient,
              private activeRoute: ActivatedRoute,private modalService: NgbModal,public fb: FormBuilder) { }

  ngOnInit(): void {
    //Checkbox in table
    $(document).ready(function () {
      $('#select-all').click(function () {
        var checked = this.checked;
        $('input[type="checkbox"]').each(function () {
          this.checked = checked;
        });
      });
    });

    // getalldataofemployee
    this.subscription.push(this.allData.getallEmployee().subscribe(
      (response: any) => {
        this.data = response;
        console.log(this.data);
      },
      (err) => {
        console.log(err);
      }
    ));
    this.addEmp();
  }

  //Delete Employee
  deleteData(emp_id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'this action cannot undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',

    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
        this.allData.deleteEmployee(emp_id).subscribe(
          res => {

            this.ngOnInit();
          },
          err => {
            console.log(err);
          });
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    });

  };

  //Edit Employee
  editItem(userModel: employeeModel) {
    const ref = this.modalService.open(EditComponent, { centered: true ,size:'sm' });
    ref.componentInstance.selectedData = userModel;
    ref.result.then((yes) => {
      console.log('Yes Click');
      this.ngOnInit();
    },
      (cancel) => {
        console.log('Cancel Click');

      });
  }

  //Pagination
   onTableDataChange(event){
    this.page = event;
    this.subscription.push(this.allData.getallEmployee().subscribe(
      (response: any) => {
        this.data = response;
        
        console.log(this.data);
      },
      (err) => {
        console.log(err);
      }
    ));
  }  

  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.subscription.push(this.allData.getallEmployee().subscribe(
      (response: any) => {
        this.data = response;
       
        console.log(this.data);
      },
      (err) => {
        console.log(err);
      }
    ));
  } 

  // Add Employee
   open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  addEmp() {
    this.issueForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }
  onSubmit() {
    this.allData.addEmployess(this.issueForm.value).subscribe(res => {
      console.log('Issue added!');
      this.ngOnInit();
    });
    this.modalService.dismissAll(); //dismiss the modal
  }

}


