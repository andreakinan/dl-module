module.exports = function (purchaseRequest) {

    var items = [].concat.apply([], purchaseRequest.items);

    var iso = "FM-6.00-06-004/R1";
    var number = purchaseRequest.no;

    var locale = 'id-id';
    var dateLocaleOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    var numberLocaleOptions = {
        style: 'decimal',
        maximumFractionDigits: 4
    };

    var header = [{
        columns: [{
            columns: [{
                width: '*',
                stack: [{
                    text: 'PT DAN LIRIS',
                    style: ['size15'],
                    alignment: "center"
                }, {
                        text: 'BANARAN, GROGOL, SUKOHARJO 57193',
                        style: ['size09'],
                        alignment: "center"
                    },
                    {
                        text: 'No. Telp : (0271) 716888   Fax : (0271) 717818',
                        style: ['size09'],
                        alignment: "center"
                    }]
            }]

           }]
    }];

var line = [{
        canvas: [{
    	       type: 'line',
            x1: 0,
            y1: 5,
            x2: 378,
            y2: 5,
            lineWidth: 0.5
        }
        ]
    }, '\n'];

    var subheader= [{
        columns: [{
            columns: [{
                width: '*',
                stack: [{
                        text: iso,
                        style: ['size09', 'bold'],
                        alignment: "right"
                    },
                    {
                        text: 'ORDER PEMESANAN',
                        style: ['size09', 'bold'],
                        alignment: "center",
                        decoration: 'underline'
                    }]
            }]

           }]
    }];

    var subheader2=[{
        columns: [
            {
                width: '40%',
                columns: [{
                    width: '35%',
                    stack: ['BAGIAN', 'Nomor']
                }, {
                        width: '5%',
                        stack: [':', ':']
                    }, {
                        width: '*',
                        stack: [purchaseRequest.unit.division, purchaseRequest.no]
                    }],
                style: ['size08']

            },
            {
                width: '30%',
                text: ''
            },
            {
                width: '30%',
                columns: [{
                    width: '*',
                    stack: [ `Solo, ${new Date(purchaseRequest.date).toLocaleString(locale, dateLocaleOptions)} `],
                    alignment: "right",
                }],
                style: ['size08']
            }
        ]
    }];

    var opening =  {
        text: [
            '\n', {
                text: 'MOHON DIBELIKAN/DIUSAHAKAN BARANG TERSEBUT DIBAWAH INI : '},
            '\n\n'
        ],
        style: ['size09']
    };

    var thead = [{
            text: 'NO',
            style: 'tableHeader'
        }, {
            text: 'KODE',
            style: 'tableHeader'
        }, {
            text: 'BARANG',
            style: 'tableHeader'
        }, {
            text: 'JUMLAH',
            style: 'tableHeader'
        }, {
            text: 'HARGA',
            style: 'tableHeader'
        }];

    var tbody = items.map(function(item, index) {
        return [{
                    text: (index+1).toString() || '',
                    style: ['size07', 'center']
                },{
                    text: item.product.code ,
                    style: ['size07', 'left']
                }, {
                    text: item.product.name,
                    style: ['size07', 'center']
                }, {
                    text:parseFloat(item.deliveredQuantity).toLocaleString(locale, numberLocaleOptions) +" "+ item.uom.unit,
                    style: ['size07', 'center']
                }, {
                    text: '',
                    style: ['size07', 'left']
                }];
    });

    var tfoot = [[{
            text: " ",
            style: ['size08', 'center']
        }, "", "", "", ""]];
    
    tbody = tbody.length > 0 ? tbody : [
        [{
            text: "tidak ada barang",
            style: ['size08', 'center'],
            colSpan: 5
        }, "", "", "", ""]
    ];

    var table = [{
        table: {
            widths: ['5%', '40%', '20%', '10%', '25%'],
            headerRows: 1,
            body: [].concat([thead],tbody,tfoot)
        }
    }];

    var footer = [
        '\n', {
            stack: [{
                    columns: [{
                        width: '60%',
                        columns: [{
                            width: '50%',
                            stack: ['DIMINTA DATANG', 'KETERANGAN', 'KATEGORI']
                        }, {
                            width: '3%',
                            stack: [':', ':', ':']
                        }, {
                            width: '*',
                            stack: [`${new Date(purchaseRequest.expectedDeliveryDate).toLocaleString(locale, dateLocaleOptions)}`,purchaseRequest.remark, purchaseRequest.category.name]
                        }, ]
                    }]
                }
            ],
            style: ['size08']
        }, '\n'
    ];

    var thead2 = [{
            text: 'BAGIAN ANGGARAN',
            style: 'tableHeader'
        }, {
            text: 'ACC MENGETAHUI',
            style: 'tableHeader'
        }, {
            text: 'BAGIAN PEMBELIAN',
            style: 'tableHeader'
        }, {
            text: 'KABAG PRODUKSI',
            style: 'tableHeader'
        }, {
            text: 'YANG MEMERLUKAN',
            style: 'tableHeader'
        }];

    var tbody2 = [[{
            text: " ",
            style: ['size30', 'center']
        }, "", "", "", ""]];

    var table2 = [{
        table: {
            widths: ['20%', '20%', '20%', '20%', '20%'],
            headerRows: 1,
            body: [].concat([thead2],tbody2)
        }
    }];

    var pr = {
        pageSize: 'A5',
        pageOrientation: 'portrait',
        pageMargins: 20,
        content: [].concat(header, line, subheader, subheader2, opening, table, footer,table2),
        styles: {
            size06: {
                fontSize: 6
            },
            size07: {
                fontSize: 7
            },
            size08: {
                fontSize: 8
            },
            size09: {
                fontSize: 9
            },
            size10: {
                fontSize: 10
            },
            size15: {
                fontSize: 15
            },
            size30: {
                fontSize: 30
            },
            bold: {
                bold: true
            },
            center: {
                alignment: 'center'
            },
            left: {
                alignment: 'left'
            },
            right: {
                alignment: 'right'
            },
            justify: {
                alignment: 'justify'
            },
            tableHeader: {
                bold: true,
                fontSize: 8,
                color: 'black',
                alignment: 'center'
            }
        }
    };

    return pr;
}