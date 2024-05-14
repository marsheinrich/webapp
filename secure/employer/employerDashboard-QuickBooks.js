//TODO: Figure out what to do with this older code...

// var QBOIntegrationDialog = function() {
//     ezApi.ez('_EZW_EmployerEzclockerQuickBoxDialog').dialog({
//         autoOpen: false,
//         closeOnEscape: true,
//         height: 265,
//         width: 375,
//         modal: true,
//         show: 'blind',
//         showOpt: {
//             direction: 'down'
//         },
//         position: 'center',
//         buttons: {
//             'Connect': function() {
//                 submitQuickBooksTransaction();
//                 waitForSubmittedQBOBeProcessed('PENDING');
//             },
//             Cancel: this.closeQuickBooksDialog
//         },
//         close: this.closeQuickBooksDialog
//     });

//     this.start = new Date();
//     this.elapsed = new Date() - this.start;
// };

// QBOIntegrationDialog.prototype.openQuickBooksDialog = function() {
//     ezApi.ez('_EZW_EmployerEzclockerQuickBoxDialog').dialog('open');
// };

// QBOIntegrationDialog.prototype.closeQuickBooksDialog = function() {
//     ezApi.ez('_EZW_EmployerEzclockerQuickBoxDialog').dialog('close');
// };

// /**
//  * Submits QuickBooks request.
//  * @param event
//  */
// QBOIntegrationDialog.prototype.submitQuickBooksTransaction = function() {
//     window.open(getQuickBooksConnectUrlForGetAllEmployees('..', selectedEmployer.id), '_blank');
// };

// QBOIntegrationDialog.prototype.waitForSubmittedQBOBeProcessed = function(status) {
//     var url = getQuickBooksConnectUrl('..', selectedEmployer);
//     this.start = new Date();
//     this.elapsed = new Date() - this.start;
//     while (status == 'PENDING' || elapsed <= 30000) {
//         httpHelper.httpGETPost(url, null, this.successQboProcessed, this.failedQboProcessed);
//     }
// };

// QBOIntegrationDialog.prototype.successQboProcessed = function(response) {
//     if (response === undefined || response.errorCode !== 0) {
//         this.elapsed = new Date() - start;
//         return;
//     }
//     if (response.status === 'COMPELTE') {
//         status = 'COMPLETE';
//     }
//     this.elapsed = new Date() - start;
// };

// QBOIntegrationDialog.prototype.failedQboProcessed = function(errorResponse) {
//     ezLogger.error('Failed to connect to quickbooks: ' + errorResponse);
//     if (!failure) {
//         return false;
//     }
// //failure(errorResponse, jqXHR);
// };

// // var qboIntegrationDialog = null;
// // document.addEventListener('onEzApiReady', function() {
// //     qboIntegrationDialog = new QBOIntegrationDialog();
// //     if (typeof ezApi !== 'undefined' && ezApi) {
// //         ezApi.s['qboIntegrationDialog'] = qboIntegrationDialog;
// //     }
// // });
