"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var EditComponent = /** @class */ (function () {
    function EditComponent(modal, modalService, editService, formBuilder) {
        this.modal = modal;
        this.modalService = modalService;
        this.editService = editService;
        this.formBuilder = formBuilder;
        this.isLoading = false;
        this.closeResult = '';
    }
    EditComponent.prototype.ngOnInit = function () {
        this.setForm();
    };
    EditComponent.prototype.open = function (content) {
        var _this = this;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    EditComponent.prototype.getDismissReason = function (reason) {
        if (reason === ng_bootstrap_1.ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ng_bootstrap_1.ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    EditComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.editForm.invalid || this.isLoading) {
            return;
        }
        this.isLoading = true;
        var id;
        this.editService.updateEmployee(this.editForm.value.id, this.editForm.value).subscribe(function (x) {
            _this.isLoading = false;
            _this.modal.close('Yes');
        }, function (error) {
            _this.isLoading = false;
        });
    };
    Object.defineProperty(EditComponent.prototype, "editFormData", {
        get: function () { return this.editForm.controls; },
        enumerable: false,
        configurable: true
    });
    EditComponent.prototype.setForm = function () {
        console.log(this.selectedData);
        this.editForm = this.formBuilder.group({
            id: [this.selectedData.id, forms_1.Validators.required],
            name: [this.selectedData.name, forms_1.Validators.required],
            address: [this.selectedData.address, forms_1.Validators.required],
            phone: [this.selectedData.phone, forms_1.Validators.required],
            email: [this.selectedData.email, forms_1.Validators.required]
        });
    };
    EditComponent = __decorate([
        core_1.Component({
            selector: 'app-edit',
            templateUrl: './edit.component.html',
            styleUrls: ['./edit.component.css']
        })
    ], EditComponent);
    return EditComponent;
}());
exports.EditComponent = EditComponent;
