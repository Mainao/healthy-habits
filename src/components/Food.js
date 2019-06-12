import React, {Component} from 'react';
import FoodData from '../data/data.json';
import FoodDetails from './FoodDetails';
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
		if(foodDetails.length === 0) {
			return null;
		}
		return(
			<FoodDetails foodDetails={foodDetails} />
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