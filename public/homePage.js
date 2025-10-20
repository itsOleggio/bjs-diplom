"use strict";

const exit = new LogoutButton();
const currentRate = new RatesBoard();
const moneyManage = new MoneyManager();
const favorites = new FavoritesWidget();

exit.action = () => {
    ApiConnector.logout((response) => {
        if (response.success === true) {
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
            moneyManage.setMessage("true", "Деньги успешно добавлены");
        }
        else{
            moneyManage.setMessage("false", "Ошибка добавления денег");
        }
    })
};

moneyManage.conversionMoneyCallback = (data) =>
{
    ApiConnector.convertMoney(data,(response) => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManage.setMessage("true", "Конвертация успешно выполнена");
        }
        else{
            moneyManage.setMessage("false", "Ошибка конвертации");
        }
    })
};

moneyManage.sendMoneyCallback = (data) =>{
    ApiConnector.transferMoney(data, response => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManage.setMessage(true, "Перевод успешно выполнен");
        }
        else{
            moneyManage.setMessage(false, response.error || "Ошибка перевода");
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
            favorites.setMessage("true", "Пользователь добавлен в избранное");
        }else{
            favorites.setMessage("false", "Пользователь не добавлен в избранное");
        }
    })
}

favorites.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if(response.success){
            favorites.clearTable();
            favorites.fillTable(response.data);
            favorites.setMessage("true", "Пользователь удален из избранного");
        }
        else{
            favorites.setMessage("false", "Пользователь не удален из избранного");
        }
    })
}

