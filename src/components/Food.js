import React, {Component} from 'react';
import FoodData from '../data/data.json';
import './Food.css';

class Food extends Component {

	state = {
		suggestions: [],
		foodDetails: [],
		text: ""
	}

	onTextChange = (e) => {
		const value = e.target.value;
		let suggestions = [];
		if(value.length > 0) {
			const regex = new RegExp(`^${value}`, 'i');
			suggestions = FoodData.filter(v => regex.test(v.name));
		}
		this.setState(() => ({ suggestions, text: value }));
	}

	getFoodDetails = (food,value) => {
		let foodDetails = [];
		// get keys from object
		let keyArray = Object.keys(FoodData);
		// sort keys array based on calorie value
		keyArray.sort(function(a, b) {
  			return FoodData[b].calories - FoodData[a].calories;
		});
		// iterate key array and assign rank value to object
		for (let i = 0, rank = 1; i < keyArray.length; i++) {
		  	// assign rank value
			FoodData[keyArray[i]].rank = rank;
		  	// increment rank only if calorie value is changed
		  	if (FoodData[keyArray[i + 1]] && FoodData[keyArray[i]].calories !== FoodData[keyArray[i + 1]].calories)
		    rank++;
		}
		foodDetails = this.state.suggestions.filter( suggestion => suggestion.id === food);
		this.setState(() => ({ 
			foodDetails,
			text: value,
			suggestions: []
		}));
	};

	renderSuggestions() {
		const { suggestions } = this.state;
		if(suggestions.length === 0) {
			return null;
		}
		return(
			<ul>
				{suggestions.map((item) => <li onClick={() => this.getFoodDetails(item.id,item.name)} key={item.id}>{item.name}</li>)}
			</ul>
		);
		
	}

	renderFoodDetails() {
		const { foodDetails } = this.state;
		const imgDiv = {
			minHeight: '100px',
			minWidth: '100px',
			backgroundColor: '#eee'
		};
		if(foodDetails.length === 0) {
			return null;
		}
		return(
			<div className="row justify-content-md-center">
				<div className="col-md-9">
					<div className="mt-4 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250">
						<div className="p-4 d-flex flex-column">
							
							<h3 className="mb-4">{foodDetails[0].name}<span className="text-muted float-right">#{foodDetails[0].rank}</span></h3>
							<div className="d-md-flex mb-4">
								<div className="mr-4" style={imgDiv} >
									<img className="h-auto mw-100 d-block" src={foodDetails[0].image} alt="food" />
								</div>
								<p>{foodDetails[0].description}</p>
							</div>
							<h5>Nutrition Summary</h5>
							
							<div className="d-md-inline-flex mb-4">
								<div className="mr-4"><div><strong>Amount per</strong></div>
								<small className="text-muted">100 grams</small></div>
								<div className="mr-4"><div><strong>{foodDetails[0].calories}Cal</strong></div>
								<small className="text-muted">Calories</small></div>
								<div className="mr-4"><div><strong>{foodDetails[0].fat}g</strong></div>
								<small className="text-muted">Total fat</small></div>
								<div className="mr-4"><div><strong>{foodDetails[0].carbs}g</strong></div>
								<small className="text-muted">Total carbohydrate</small></div>
								<div className="mr-4"><div><strong>{foodDetails[0].protein}g</strong></div>
								<small className="text-muted">Protein</small></div>
							</div>
							<h5>Ingredients</h5>
							<div className="d-flex flex-wrap mb-4 text-muted">
							    {foodDetails[0].ingredients.map( (ingredient,i) => (
							   		<div className="mr-4" key={i}>{ingredient}</div>
							   	))}
							</div>
						</div>
					</div>	
				</div>
			</div>
			
		)
	}

	render() {
		const { text } = this.state;
		
		return(
			<React.Fragment>
				<div className="Food-autocomplete">
					<div className="Food-input">
						<input value={text} onChange={this.onTextChange} type="text" placeholder="Search Junk Food eg: Fries" />
					</div>
					<div className="Food-suggestions">{this.renderSuggestions()}</div>
				</div>
			    {this.renderFoodDetails()}
			</React.Fragment>
		);
	}
}

export default Food;