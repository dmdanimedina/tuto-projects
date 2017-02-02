import { Meteor } from 'meteor/meteor';
import { Tedious } from 'meteor/donaldaverill:tedious';
import Sequelize from 'sequelize';

Meteor.startup(() => {
  // code to run on server at startup

    sequelize = new Sequelize('mssql://usuWEb2s:Smt7$RtvB2@192.168.1.7:1433/BaseGPSF');

     Connection = Tedious.Connection;
     config = {
        userName :'usuWEb2s',
        password : 'Smt7$RtvB2',
        server : '192.168.1.7',
        options:{
            database: 'BaseGPSF'
        }
    };

    connection =  new Connection(config);
/*
    connection.on('connect', function(err){
        executableStatement()
    });
*/
});

function executableStatement(){

        var request = new Tedious.Request('Select * from cliente', function(err,rowCount){
            if(err){
                console.log(err);
            }
            else{
                console.log(rowCount + 'rows');
            }
        })

        request.on('row', function(columns){
            var r = '';
            var r2 = '';
            columns.forEach(function (column){
                r = r + ' ' + column.value;
                r2 = r2 + ' ' + column.value;
            });
           // console.log('\n ', r);
        });

        connection.execSql(request);
}

Meteor.methods({
   'execSql':function(){
       executableStatement()
   },
    dbquery(){
       return JSON.stringify(sequelize.query("Select * from cliente",{type: sequelize.QueryTypes.SELECT}));
    }

});

Meteor.publish('listQuery', function()
{
    /*
    return sequelize.query("Select * from cliente",{type: sequelize.QueryTypes.SELECT}).then(function(rows){
        console.log(JSON.stringify(rows))
    });
    */
/*
     sequelize.query("Select * from cliente",{type: sequelize.QueryTypes.SELECT}).then(function(rows){
         return JSON.stringify(rows);
    });
*/

    sequelize.query("Select * from cliente",{type: sequelize.QueryTypes.SELECT}).then(function(rows){
        return data = [JSON.stringify(rows)];
    });
});

