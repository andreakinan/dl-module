var helper = require("../../../helper");
var Manager = require("../../../../src/etl/sales/fact-deal-tracking-deal-etl-manager");
var instanceManager = null;
var should = require("should");
var sqlHelper = require("../../../sql-helper");

before("#00. connect db", function (done) {
    Promise.all([helper, sqlHelper])
        .then((result) => {
            var db = result[0];
            var sql = result[1];
            db.getDb().then((db) => {
                instanceManager = new Manager(db, {
                    username: "unit-test"
                }, sql);
                done();
            })
                .catch((e) => {
                    done(e);
                })
        });
});

it("#01. should success when create etl fact deal tracking deal", function (done) {
    instanceManager.run()
        .then(() => {
            done();
        })
        .catch((e) => {
            console.log(e);
            done(e);
        });
});

it("#02. should success when transforming data for fact-deal-tracking-deal", function (done) {
    var data = [
        {
            deleted: false,
            id: "012345",
            code: "X123456",
            createdDate: new Date(),
            createdBy: "Unit Test",
            name: "Name",
            amount: "10000",
            companyCode: "X123456",
            companyName: "Company Name",
            contactCode: "X123456",
            contactName: "Contact Name",
            closeDate: new Date(),
            description: "Description"
        }
    ];
    instanceManager.transform(data)
        .then(() => {
            done();
        })
        .catch((e) => {
            done(e);
        });
});

it("#03. should error when insert empty data", function (done) {
    instanceManager.insertQuery(this.sql, "")
        .then((id) => {
            done("should error when create with empty data");
        })
        .catch((e) => {
            try {                
                done();
            }
            catch (ex) {
                done(ex);
            }
        });
});