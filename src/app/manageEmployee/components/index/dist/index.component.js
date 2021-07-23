"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IndexComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var sweetalert2_1 = require("sweetalert2");
var edit_component_1 = require("../edit/edit.component");
var IndexComponent = /** @class */ (function () {
    function IndexComponent(allData, router, httpClient, activeRoute, modalService, fb) {
        this.allData = allData;
        this.router = router;
        this.httpClient = httpClient;
        this.activeRoute = activeRoute;
        this.modalService = modalService;
        this.fb = fb;
        this.dataList = [];
        this.data = [];
        this.subscription = [];
        this.page = 1;
        this.count = 0;
        this.tableSize = 10;
        this.closeResult = '';
    }
    IndexComponent.prototype.ngOnInit = function () {
        var _this = this;
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
        this.subscription.push(this.allData.getallEmployee().subscribe(function (response) {
            _this.data = response;
            console.log(_this.data);
        }, function (err) {
            console.log(err);
        }));
        this.addEmp();
    };
    //Delete Employee
    IndexComponent.prototype.deleteData = function (emp_id) {
        var _this = this;
        sweetalert2_1["default"].fire({
            title: 'Are you sure?',
            text: 'this action cannot undone',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(function (result) {
            if (result.isConfirmed) {
                sweetalert2_1["default"].fire('Deleted!', 'Your imaginary file has been deleted.', 'success');
                _this.allData.deleteEmployee(emp_id).subscribe(function (res) {
                    _this.ngOnInit();
                }, function (err) {
                    console.log(err);
                });
                // For more information about handling dismissals please visit
                // https://sweetalert2.github.io/#handling-dismissals
            }
            else if (result.dismiss === sweetalert2_1["default"].DismissReason.cancel) {
                sweetalert2_1["default"].fire('Cancelled', 'Your imaginary file is safe :)', 'error');
            }
        });
    };
    ;
    //Edit Employee
    IndexComponent.prototype.editItem = function (userModel) {
        var _this = this;
        var ref = this.modalService.open(edit_component_1.EditComponent, { centered: true, size: 'sm' });
        ref.componentInstance.selectedData = userModel;
        ref.result.then(function (yes) {
            console.log('Yes Click');
            _this.ngOnInit();
        }, function (cancel) {
            console.log('Cancel Click');
        });
    };
    //Pagination
    IndexComponent.prototype.onTableDataChange = function (event) {
        var _this = this;
        this.page = event;
        this.subscription.push(this.allData.getallEmployee().subscribe(function (response) {
            _this.data = response;
            console.log(_this.data);
        }, function (err) {
            console.log(err);
        }));
    };
    IndexComponent.prototype.onTableSizeChange = function (event) {
        var _this = this;
        this.tableSize = event.target.value;
        this.page = 1;
        this.subscription.push(this.allData.getallEmployee().subscribe(function (response) {
            _this.data = response;
            console.log(_this.data);
        }, function (err) {
            console.log(err);
        }));
    };
    // Add Employee
    IndexComponent.prototype.open = function (content) {
        var _this = this;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    IndexComponent.prototype.getDismissReason = function (reason) {
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
    IndexComponent.prototype.addEmp = function () {
        this.issueForm = this.fb.group({
            name: ['', forms_1.Validators.required],
            address: ['', forms_1.Validators.required],
            email: ['', forms_1.Validators.required],
            phone: ['', forms_1.Validators.required]
        });
    };
    IndexComponent.prototype.onSubmit = function () {
        var _this = this;
        this.allData.addEmployess(this.issueForm.value).subscribe(function (res) {
            console.log('Issue added!');
            _this.ngOnInit();
        });
        this.modalService.dismissAll(); //dismiss the modal
    };
    IndexComponent = __decorate([
        core_1.Component({
            selector: 'app-index',
            templateUrl: './index.component.html',
            styleUrls: ['./index.component.css']
        })
    ], IndexComponent);
    return IndexComponent;
}());
exports.IndexComponent = IndexComponent;
