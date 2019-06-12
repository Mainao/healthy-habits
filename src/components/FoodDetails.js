import React from 'react';

const FoodDetails = (props) => {

	const imgDiv = {
		minHeight: '100px',
		minWidth: '100px',
		backgroundColor: '#eee'
	};
	
	return(
		<div className="row justify-content-md-center">
			<div className="col-md-9">
				<div className="mt-4 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250">
					<div className="p-4 d-flex flex-column">
						<h3 className="mb-4">{props.foodDetails[0].name}<span className="text-muted float-right">#{props.foodDetails[0].rank}</span></h3>
						<div className="d-md-flex mb-4">
							<div className="mr-4" style={imgDiv} >
								<img className="h-auto mw-100 d-block" src={props.foodDetails[0].image} alt="food" />
							</div>
							<p>{props.foodDetails[0].description}</p>
						</div>
						<h5>Nutrition Summary</h5>
						<div className="d-md-inline-flex mb-4">
							<div className="mr-4"><div><strong>Amount per</strong></div>
							<small className="text-muted">100 grams</small></div>
							<div className="mr-4"><div><strong>{props.foodDetails[0].calories}Cal</strong></div>
							<small className="text-muted">Calories</small></div>
							<div className="mr-4"><div><strong>{props.foodDetails[0].fat}g</strong></div>
							<small className="text-muted">Total fat</small></div>
							<div className="mr-4"><div><strong>{props.foodDetails[0].carbs}g</strong></div>
							<small className="text-muted">Total carbohydrate</small></div>
							<div className="mr-4"><div><strong>{props.foodDetails[0].protein}g</strong></div>
							<small className="text-muted">Protein</small></div>
						</div>
						<h5>Ingredients</h5>
						<div className="d-flex flex-wrap mb-4 text-muted">
						    {props.foodDetails[0].ingredients.map( (ingredient,i) => (
						   		<div className="mr-4" key={i}>{ingredient}</div>
						   	))}
						</div>
					</div>
				</div>	
			</div>
		</div>
	);
}

export default FoodDetails;