import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

class EditClient extends Component {
  static propTypes = {
    firestore: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  onSubmit = async e => {
    e.preventDefault();

    const { client, firestore, history } = this.props;

    const { value: balance } = this.balanceInput.current;

    // cliente
    const updated = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      balance: balance.trim() === "" ? 0 : balance
    };

    // firestore
    await firestore.update({ collection: "clients", doc: client.id }, updated);
    history.push("/");
  };

  render() {
    const { client } = this.props;

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link className="btn btn-link" to="/">
                <i className="fas fa-arrow-circle-left" /> Volver al Dashboard
              </Link>
            </div>
          </div>

          <div className="card">
            <div className="card-header">Editar cliente</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">Nombre(s)</label>
                  <input
                    type="text"
                    ref={this.firstNameInput}
                    className="form-control"
                    name="firstName"
                    minLength="2"
                    required
                    defaultValue={client.firstName}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Apellidos</label>
                  <input
                    type="text"
                    ref={this.lastNameInput}
                    className="form-control"
                    name="lastName"
                    minLength="2"
                    required
                    defaultValue={client.lastName}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Correo electrónico</label>
                  <input
                    type="email"
                    ref={this.emailInput}
                    className="form-control"
                    name="email"
                    required
                    defaultValue={client.email}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Teléfono</label>
                  <input
                    type="text"
                    ref={this.phoneInput}
                    className="form-control"
                    name="phone"
                    minLength="8"
                    required
                    defaultValue={client.phone}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="balance">Balance</label>
                  <input
                    type="number"
                    ref={this.balanceInput}
                    className="form-control"
                    name="balance"
                    defaultValue={client.balance}
                  />
                </div>

                <input
                  type="submit"
                  value="Enviar"
                  className="btn btn-success btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

export default compose(
  firestoreConnect(props => [
    {
      collection: "clients",
      storeAs: "client",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(EditClient);
