const React = require('react');

class VegetablesIndex extends React.Component {
    render() {
        const { vegetables } = this.props;
        return (
            <div>
                <h1>Vegetables Index Page</h1>
                <ul>
                    {vegetables.map((vegetable, index) => (
                        <li key={index}>
                            <a href={`/vegetables/${index}`}>{vegetable.name}</a> is {vegetable.color}
                            {vegetable.readyToEat ? ' It is ready to eat!' : ' It is not ready to eat!'}
                        </li>
                    ))}
                </ul>
                <nav>
                    <a href="/vegetables/new">Create a New Vegetable</a>
                </nav>
            </div>
        );
    }
}

module.exports = VegetablesIndex;