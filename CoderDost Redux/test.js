const data = { account:{amount:1} ,bonus:{points : 2}};
const newData = { account:{...data.account} , bonus :{points : data.bonus.points+1}};
data.account.amount = 2;
console.log(newData);