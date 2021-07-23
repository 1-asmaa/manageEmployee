"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DataApiService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var DataApiService = /** @class */ (function () {
    function DataApiService(http) {
        this.http = http;
        this.BaseURI = 'https://60f89f46ee56ef00179759fe.mockapi.io';
    }
    //getallEmployee
    DataApiService.prototype.getallEmployee = function () {
        var newLocal = this.http.get(this.BaseURI + "/employees");
        return newLocal;
    };
    //addEmployee
    DataApiService.prototype.addEmployess = function (emp) {
        return this.http.post(this.BaseURI + "/employees", emp);
    };
    //editEmp
    DataApiService.prototype.updateEmployee = function (id, data) {
        var httpoptions = { headers: new http_1.HttpHeaders({
                'Content-Typpe': 'application/json'
            }) };
        return this.http.put(this.BaseURI + "/employees/" + id, data, httpoptions);
    };
    //deleteEmp
    DataApiService.prototype.deleteEmployee = function (Emp_id) {
        var httpoptions = { headers: new http_1.HttpHeaders({
                'Content-Typpe': 'application/json'
            }) };
        var delData = this.http["delete"](this.BaseURI + "/employees/" + Emp_id, httpoptions);
        return delData;
    };
    DataApiService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DataApiService);
    return DataApiService;
}());
exports.DataApiService = DataApiService;
