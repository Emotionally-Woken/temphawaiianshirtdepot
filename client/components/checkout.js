import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchItems, updateItem } from '../store/item';

class CheckoutForm extends Component {
    constructor() {
        super();
        this.state = {
            coupon: '',

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentWillMount() {
        this.props.fetchItems();
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState({
            [event.target.price]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.history.push(`/order/${id}`);

    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="checkoutInputCoupon">Coupon</label>
                        <input
                            name="coupon"
                            type="text"
                            className="form-control"
                            value={this.state.coupon}
                            onChange={this.handleChange} />
                    </div>
                    <button
                        type="submit">
                        Enter a coupon
                    </button>
                </form>
                {orderList && orderList.map((item) => {
                    return (
                        <li className="item" key={item.id} style={{ paddingBottom: '10px' }}>
                            <span className="pull-right pagado" style={{ paddingRight: '40%' }}>
                                <button
                                    type="button"
                                    onClick={() => { this.updateItem(item.id) }} />
                            </span>
                            <div className="media">
                                <div className="media-body">
                                    <h4 className="title">
                                        {item.name}
                                    </h4>
                                    <p className="summary">
                                        Id: {item.id}
                                        <br />
                                        Quantity: {item.quantity}
                                    </p>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    orderList: state.item
});

const mapDispatchToProps = (dispatch) => ({
    fetchItems: () => dispatch(fetchItems())
});
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
