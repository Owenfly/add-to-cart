import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from 
"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shopinglists-3a254-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListsEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value.trim()

    if (inputValue === '') {
       alert("请先输入内容");
    } else {
        push(shoppingListInDB, inputValue)
    }
    
    clearInputEl();
})


onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingListsEl();
    
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
    
            appendItemToShoppingListEl(currentItem)
    
        }
    } else {
        shoppingListsEl.innerHTML = "待添加物品..."
    }
    
    

})

function clearShoppingListsEl() {
    shoppingListsEl.innerHTML = ""
}

function clearInputEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue;
    
    newEl.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)

        remove(exactLocationOfItemInDB)
    })

    shoppingListsEl.append(newEl)
}




