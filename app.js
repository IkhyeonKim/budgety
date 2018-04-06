// Buget Controller
let budgetController = (() => {
	
})();

// UI Controller
let UIController = (() => {
	
	let DOMstrings = {
		inputType : '.add__type',
		inputDescription : '.add__description',
		inputValue : '.add__value',
		inputBtn : '.add__btn'
	}
	
	return {
		
		getInput : function() {
			return {
				type : document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
				descirption : document.querySelector(DOMstrings.inputDescription).value,
				value : document.querySelector(DOMstrings.inputValue).value	
			}
			
		},
		
		getDOMstrings : function() {
			return DOMstrings;
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
				
		// 1. Getting the field input data
		let input = UICtrl.getInput();		
		
		// 2. Add the item to the budget controller
		
		// 3. Add the item to the UI
		
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