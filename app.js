// Buget Controller
let budgetController = (() => {
	
	/* ES5
	let Expense = function(id, description, value) {
		this.id = id;
		this.descirption = description;
		this.value = value;
	};
	
	let Income = function(id, description, value) {
		this.id = id;
		this.descirption = description;
		this.value = value;
	};
	*/
	
	//ES6
	class Expense {
		constructor(id, description, value) {
			this.id = id;
			this.descirption = description;
			this.value = value;
		}
	}
	
	class Income {
		constructor(id, description, value) {
			this.id = id;
			this.descirption = description;
			this.value = value;
		}
	}
	

	
	//여러개 변수를 설정하는 것 보다 아래처럼 객체 하나 만드는게 더 나음
	let data = {
		allItems : {
			exp : [],
			inc : []
		},
		totals : {
			exp : 0,
			inc : 0
		}
	};
	
	//public methods
	return {
		addItem(type, des, val) {
			
			let newItem, ID;
			
			// Create new ID
			//[][]2차원 배열아님, exp 배열에 그 배열의 맨 마지막 번째의 아이디 + 1, allItems객체 속성안에 type배열이 있으니까 이렇게 접근 해야함
			if(data.allItems[type].length === 0){
				ID = 0;
			}else{
				ID = data.allItems[type][data.allItems[type].length -1].id +1;	
			}
			
			
			//create new item based on 'inc' or 'exp' type
			if(type === 'exp'){
				newItem = new Expense(ID, des, val);
			}else if(type === 'inc'){
				newItem = new Income(ID, des, val);
			}
			
			//Push it into our data structure
			data.allItems[type].push(newItem);
			
			//Return the new element
			return newItem;
		},
		
		testing() {
			console.log(data);
		}
		
		
	}
	
})();



// UI Controller
let UIController = (() => {
	
	let DOMstrings = {
		inputType : '.add__type',
		inputDescription : '.add__description',
		inputValue : '.add__value',
		inputBtn : '.add__btn',
		incomeContainer : '.income__list',
		expensesContainer : '.expenses__list',
	}
	
	return {
		
		getInput() {
			return {
				type : document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
				descirption : document.querySelector(DOMstrings.inputDescription).value,
				value : document.querySelector(DOMstrings.inputValue).value	
			}
			
		},
		
		getDOMstrings() {
			return DOMstrings;
		},
		
		addListItem(obj, type) {
			let html, newHTML, element;
			// Create HTML string with paceholder text
			if(type === 'inc'){
				element = DOMstrings.incomeContainer;
				
				html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}else if(type === 'exp'){
				element = DOMstrings.expensesContainer;
				
				html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}			
			
			// Replace the placeholder text with some actual data
			newHTML = html.replace('%id%', obj.id);
			newHTML = newHTML.replace('%description%',obj.descirption);
			newHTML = newHTML.replace('%value%',obj.value);
			
			// Insert the HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend',newHTML);
		}
	}
	
})();



// Global App Controller
let controller = ((budgetCtrl, UICtrl) => {
	
	let setupEventListener = () => {

		let DOM = UICtrl.getDOMstrings();

		document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);

		document.addEventListener('keypress', (evnet) => {

			const keyName = event.key;

			if(keyName === 'Enter'){
				//keycode : 13
				ctrlAddItem();
			}

		});
		
	}
	
	
	
	let ctrlAddItem = () => {
		let input, newItem;
		// 1. Getting the field input data
		input = UICtrl.getInput();		
		
		// 2. Add the item to the budget controller
		newItem = budgetCtrl.addItem(input.type, input.descirption, input.value);
		
		// 3. Add the item to the UI
		UICtrl.addListItem(newItem, input.type);
		
		// 4. Calculate the budget
		
		// 5. Display the budget
		
	}
	
	return {
		init : function() {
			console.log('Application has started');
			setupEventListener();
		}
	};
	
	
	
})(budgetController, UIController);

controller.init();


