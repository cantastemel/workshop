class ProductList extends React.Component {

    constructor(props) {
        super(props); // always call this first

        this.state = {
            products: []
        };

        // Cutom method bindings here
        this.handleProductUpVote = this.handleProductUpVote.bind(this);
    }

    componentDidMount() {
        this.setState({ products: Seed.products });
    }

    handleProductUpVote(productId) {
        const nextProducts = this.state.products.map((product) => {
            if (product.id === productId) {
                // Create a new empty object and with the same basing of the current `product` object
                // and modify its `votes` property by adding +1
                return Object.assign({}, product, {
                    votes: product.votes + 1,
                });
            } else {
                return product;
            }
        });
        this.setState({
            products: nextProducts,
        });
    }

    render() {
        // Sort the producst based on the vote value and store them in products variable
        const products = this.state.products.sort((a, b) => (
            b.votes - a.votes
        ));

        // Create and store an array of products in productComponents and map the values in the component
        const productComponents = products.map((product) => (
            <Product 
				key={'product-' + product.id}
				id = {product.id}
				title = {product.title}
				description = {product.description}
				url = {product.url}
				votes = {product.votes}
				submitterAvatarUrl = {product.submitterAvatarUrl}
				productImageUrl = {product.productImageUrl}
				onVote = {this.handleProductUpVote}
			/>
        ));

        return (
            <div className='ui unstackable items'>
				{productComponents}
			</div>
        );
    }
}

class Product extends React.Component {
    // Inside `render()` React will bind the `this` variable to the component automatically.
    // We want `this` inside `handleUpVote()` to reference the component too, just like it does inside render().
    // So, any time we define our own custom component methods (eg. `handleUpVote`), 
    // we have to manually bind this to the component ourselves in the `constructor()`
    constructor(props) {
        super(props); // always call this first

        // custom method bindings here
        this.handleUpVote = this.handleUpVote.bind(this);
    }

    handleUpVote() {
        this.props.onVote(this.props.id);
    }

    render() {
        return (
            <div className='item'>
				<div className='image'>
					<img src={this.props.productImageUrl} />
				</div>
				<div className='middle aligned content'>
					<div className='header'>
						<a onClick={this.handleUpVote} ><i className='large caret up icon' /></a> {this.props.votes}
					</div>
					<div className='description'>
						<a href={this.props.url} >{this.props.title}</a>
						<p>{this.props.description}</p>
					</div>
					<div className='extra'>
						<span>Submitted by:</span>
						<img className='ui avatar image' src={this.props.submitterAvatarUrl} />
					</div>
				</div>
			</div>
        );
    }
}

ReactDOM.render(
    <ProductList />,
    document.getElementById('content')
);
