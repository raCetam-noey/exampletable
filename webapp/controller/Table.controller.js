sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,
	JSONModel,
	MessageToast,
	MessageBox) {
		"use strict";

		return Controller.extend("exampletable.controller.Table", {
			onInit: function () {
				var oTable = new JSONModel(sap.ui.require.toUrl("exampletable/model/Table.json"));
				this.getView().setModel(oTable);

				var oViewModel = new JSONModel([{}]);
            	this.getView().setModel(oViewModel, "view");

				var oTableData = new JSONModel([{}]);
            	this.getView().setModel(oTableData,"view2")
			},
			
			addRow : function(){
				this.getView().getModel("view").getProperty("/").push({});
            	this.getView().getModel("view").refresh(true);
			},
			
			onReset: function() {
				//	pop 
				this.getView().getModel("view").getProperty("/").splice(0); 
				this.getView().getModel("view").getProperty("/").push({});  

				this.getView().getModel("view2").getProperty("/").splice(0); 
				this.getView().getModel("view2").getProperty("/").push({});  

				
				this.getView().getModel("view").refresh(true);		
				this.getView().getModel("view2").refresh(true);			
			},
			onPrint: function() {

				var that =this;
				var oTable = this.byId("table");
				var iIndex = oTable.getSelectedIndex();
				var iRow = oTable.getSelectedIndices();
				var sMsg;
				var oTableData = that.getView().getModel("view").getProperty("/");
				var oResultData = that.getView().getModel("view2").getProperty("/");
				var iResultLength = oResultData.length;
				
										
				if (iIndex < 0) {
					sMsg = "선택된 내용이 없습니다"; //sMsg에 메세지 담는 방식
					MessageBox.warning(sMsg);
				} else {

					for (var i = 0; i < oTableData.length; i++) {
						if (oTableData[i].ProductName =="") {
							MessageBox.information("값을 제대로 입력해 주세요");

						} else if (oTableData[i].Quantity =="") {
							MessageBox.information("수량을 입력해 주세요"); 

						} else if (oTableData[i].Price =="") {
							MessageBox.information("금액을 입력해 주세요"); 

						} else {

							MessageBox.confirm("상품 내역을 생성 하시겠습니까?", { 
								actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
								onClose: function(oEvent) {
									if (oEvent === sap.m.MessageBox.Action.OK) {
		
										for (var i = 0; i < oTableData.length; i++){				
											oResultData[i] = oTableData[i];
											oResultData[i].TotalPrice = oTableData[i].Quantity * oTableData[i].Price
										
										}
										// for (var i; i < iRow.length; i++) {
										// 	oResultData.push({});
										// 	oResultData[iResultLength + i].ProductName = oTableData[iRow[i]].ProductName;
										// 	oResultData[iResultLength + i].Date = oTableData[iRow[i]].Date;
										// 	oResultData[iResultLength + i].Category = oTableData[iRow[i]].Category;
										// 	oResultData[iResultLength + i].Quantity = oTableData[iRow[i]].Quantity;
										// 	oResultData[iResultLength + i].Price = oTableData[iRow[i]].Price;
										// }
										that.getView().getModel("view").refresh(true);
										that.getView().getModel("view2").refresh(true) ;
										console.log(oTableData[0].ProductName);
										console.log(oResultData[0].ProductName);
									}
								}
							});							
						}				
					}
				};
			}
		});
	});
