import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataApiService } from '../../services/data-api.service';
import { employeeModel } from '../../viewModels/employee';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  selectedData: employeeModel;
  editForm: FormGroup;
  isLoading = false;
  closeResult = '';

  constructor(public modal: NgbActiveModal, private modalService: NgbModal,
              private editService: DataApiService ,
              private formBuilder: FormBuilder ) {  }

  ngOnInit(): void {
    this.setForm();
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  onSubmit() {
    if (this.editForm.invalid || this.isLoading) {
      return;
    }
    this.isLoading = true;
    let id:number;
    this.editService.updateEmployee(this.editForm.value.id,this.editForm.value).subscribe(x => {
      this.isLoading = false;
      this.modal.close('Yes');

    },
      error => {
        this.isLoading = false;
      });
  }
  get editFormData() { return this.editForm.controls; }
  private setForm() {
    console.log(this.selectedData);
    this.editForm = this.formBuilder.group({
      id: [this.selectedData.id, Validators.required],
      name: [this.selectedData.name, Validators.required],
      address: [this.selectedData.address, Validators.required],
      phone: [this.selectedData.phone, Validators.required],
      email: [this.selectedData.email, Validators.required],

    });

  }


}
