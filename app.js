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
	
	/*
	Expense.prototype.calcPercentage = function(totalIncome){
		
		console.log(totalIncome);
		if(totalIncome > 0){
			this.percentage = Math.round((this.value / totalIncome) * 100);		
		}else{
			this.percentage = -1;
		}
		
	};
	
	Expense.prototype.getPercentage = function(){
		return this.percentage;
	};
	*/
	
	//ES6
	class Expense {
		constructor(id, description, value) {
			this.id = id;
			this.descirption = description;
			this.value = value;
			this.percentage = -1;
		}
		
		calcPercentage(totalIncome){
			console.log(totalIncome);
			if(totalIncome > 0){
				this.percentage = Math.round((this.value / totalIncome) * 100);		
			}else{
				this.percentage = -1;
			}
		};
		
		getPercentage(){
			return this.percentage;
		}
		
	};
	
	class Income {
		constructor(id, description, value) {
			this.id = id;
			this.descirption = description;
			this.value = value;
		}
	};


	
	let calculateTotal = (type) => {
		let sum = 0;
		
		data.allItems[type].forEach((current) => {
			sum += current.value;
		});
		
		data.totals[type] = sum;
	};
	
	//여러개 변수를 설정하는 것 보다 아래처럼 객체 하나 만드는게 더 나음
	let data = {
		allItems : {
			exp : [],
			inc : []
		},
		totals : {
			exp : 0,
			inc : 0
		},
		
		budget : 0,
		percentage : -1
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
		},
		
		cacluateBugdet() {
			// Calculate total income and expenses
			calculateTotal('exp');
			calculateTotal('inc');
			
			// Calculate budget 
			data.budget = data.totals.inc - data.totals.exp;
			
			// Calculate percentage of income
			if(data.totals.inc > 0){
				data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);	
			}else{
				data.percentage = -1;
			}
			
		},
		
		calculatePercentages() {
			data.allItems.exp.forEach( (current) => {
				// Caculate for each every expense 
				current.calcPercentage(data.totals.inc);
			});
			
			
		},
		
		getPercentages() {
			let allPercentages = data.allItems.exp.map((current)=>{
				return current.getPercentage();
			});
			
			return allPercentages;
		},
		
		getBudget() {
			return {
				budget : data.budget,
				percentage : data.percentage,
				totalInc : data.totals.inc,
				totalExp : data.totals.exp
			}
		},
		
		deleteBudget(type, id){
			let ids, index;
			
			// map returns a new arry
			ids = data.allItems[type].map( current => {
				return current.id;
			});
			
			index = ids.indexOf(id);
			
			if(index !== -1){
				data.allItems[type].splice(index, 1);
			}
			
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
		budgetLable : '.budget__value',
		incomLable : '.budget__income--value',
		expenseLable : '.budget__expenses--value',
		percentageLable : '.budget__expenses--percentage',
		container : '.container',
		expensePercentageLable : '.item__percentage'
	}
	
	return {
		
		getInput() {
			let type_, description_, value_;
			
			type_ = document.querySelector(DOMstrings.inputType).value;
			description_ = document.querySelector(DOMstrings.inputDescription).value;
			value_ =  parseFloat(document.querySelector(DOMstrings.inputValue).value);
						
			return {
				type : type_, // Will be either inc or exp
				descirption : description_,
				value : value_
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
				
				html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}else if(type === 'exp'){
				element = DOMstrings.expensesContainer;
				
				html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}			
			
			// Replace the placeholder text with some actual data
			newHTML = html.replace('%id%', obj.id);
			newHTML = newHTML.replace('%description%',obj.descirption);
			newHTML = newHTML.replace('%value%',obj.value);
			
			// Insert the HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend',newHTML);
		},
		
		clearFields() {
			let fields, fieldsArr;

			fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
			
			//QuerySelectorAll method returns a list.. needs to convert to an array
			fieldsArr = Array.prototype.slice.call(fields);
			
			fieldsArr.forEach( (current, index, array) => {
				current.value = '';
			});
			
			fieldsArr[0].focus();
				
		},
		
		displaybudget(obj) {
			
			document.querySelector(DOMstrings.budgetLable).textContent = '$  ' + obj.budget;
			document.querySelector(DOMstrings.expenseLable).textContent = '- ' + obj.totalExp;
			document.querySelector(DOMstrings.incomLable).textContent = '+ ' + obj.totalInc;
			
			if( obj.percentage > 0){
				document.querySelector(DOMstrings.percentageLable).textContent = obj.percentage + '%';	
			}else{
				document.querySelector(DOMstrings.percentageLable).textContent = '---';
			}
			
		},
		
		deleteListItem(selectorID) {
			
			let targetChild;
			
			targetChild = document.getElementById(selectorID);
			targetChild.parentNode.removeChild(targetChild);
		},
		
		displayPercentage(percentages){
			let fields;
			
			fields = document.querySelectorAll(DOMstrings.expensePercentageLable);
			
			let nodeListForEach = (list, callback) => {
				
				for(let i=0; i<list.length; i++){
					callback(list[i], i);
				}
			}
			
			nodeListForEach(fields, (current, index) => {
				
				if(percentages[index] > 0){
					current.textContent = percentages[index] + '%';	
				}else{
					current.textContent = '---';
				}
				
			});
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
		
		document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
		
	};	
	
	let updatePercentages = () => {
		
		// 1. Caculate percentages
		budgetCtrl.calculatePercentages();
		// 2. Read percentages from budget controller
		let percentages = budgetCtrl.getPercentages();
		// 3. Update the UI with percentages
		UICtrl.displayPercentage(percentages);
	};
	
	let ctrlAddItem = () => {
		let input, newItem;
		// 1. Getting the field input data
		input = UICtrl.getInput();		
		
		if(input.descirption !== '' && !isNaN(input.value) && input.value > 0){
				// 2. Add the item to the budget controller
			newItem = budgetCtrl.addItem(input.type, input.descirption, input.value);

			// 3. Add the item to the UI
			UICtrl.addListItem(newItem, input.type);

			// 4. Clear the input fields
			UICtrl.clearFields();

			// 5. Calculate and update budget
			updateBudget();
		}else if(input.descirption === ''){
			alert('Fill with description box!');
			document.querySelector(UICtrl.getDOMstrings().inputDescription).focus();
			
		}else if( isNaN(input.value) || input.value <0 ){
			alert('Value is supposed to be greater than zero');
			document.querySelector(UICtrl.getDOMstrings().inputValue).focus();
		}
		
		// 6. Caculate and update percentages
		updatePercentages();
	};
	
	let ctrlDeleteItem = (e) => {
		
		let itemID, splitID, type, id;
		
		itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;
		
		if(itemID){
			
			splitID = itemID.split('-');	
			type = splitID[0];
			id = parseInt(splitID[1]);
			
			// 1. Delete the item from data sturcture
			budgetCtrl.deleteBudget(type, id);
			// 2. Delete the from UI
			UICtrl.deleteListItem(itemID);
			// 3. Update and show the new budget
			updateBudget();
			// 4. Calculate and update percentages
			updatePercentages();
		}
		
	};
	
	let updateBudget = () =>{
		
		// 1. Calculate the budget
		budgetCtrl.cacluateBugdet();
		// 2. Return the budget 
		let budget = budgetCtrl.getBudget();
		// 3. Display the budget
		UICtrl.displaybudget(budget);
	};
	
	return {
		init : function() {
			console.log('Application has started');
			UICtrl.displaybudget({
				budget : 0,
				totalInc : 0,
				totalExp : 0,
				percentage : -1
			});
			setupEventListener();
		}
	};
	
	
	
})(budgetController, UIController);

controller.init();


