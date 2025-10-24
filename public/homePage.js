"use strict";

const exit = new LogoutButton();
const currentRate = new RatesBoard();
const moneyManage = new MoneyManager();
const favorites = new FavoritesWidget();

exit.action = () => {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        } else {
            console.error(response.error);
        }
    });
};


ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    } else {
        console.error(response.error);
    }
})


ApiConnector.getStocks((response) => {
    if (response.success) {
        currentRate.clearTable();
        currentRate.fillTable(response.data);
    } else {
        console.error(response.error);
    }
});


moneyManage.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data,(response) => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManage.setMessage(true, response.error);
        }
        else{
            moneyManage.setMessage(false, response.error);
        }
    })
};

moneyManage.conversionMoneyCallback = (data) =>
{
    ApiConnector.convertMoney(data,(response) => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManage.setMessage(true, response.error);
        }
        else{
            moneyManage.setMessage(false, response.error);
        }
    })
};

moneyManage.sendMoneyCallback = (data) =>{
    ApiConnector.transferMoney(data, response => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManage.setMessage(true, response.error);
        }
        else{
            moneyManage.setMessage(false, response.error);
        }
    })
}

ApiConnector.getFavorites((response) => {
   if(response.success){
       favorites.clearTable()
       favorites.fillTable(response.data);
       moneyManage.updateUsersList(response.data)
   }else{
       console.error(response.error)
   }
});


favorites.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites (data, (response) => {
        if(response.success){
            favorites.clearTable();
            favorites.fillTable(response.data);
            favorites.setMessage(true, response.error);
        }else{
            favorites.setMessage(false, response.error);
        }
    })
}

favorites.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if(response.success){
            favorites.clearTable();
            favorites.fillTable(response.data);
            favorites.setMessage(true, response.error);
        }
        else{
            favorites.setMessage(false, response.error);
        }
    })
}

