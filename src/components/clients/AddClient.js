import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { compose } from "redux";
// import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

class AddClient extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: ""
  };

  static propTypes = {
    firestore: PropTypes.object.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();

    const newClient = this.state;

    const { firestore, history } = this.props;

    // Si no hay balance, hacer cero
    if (newClient.balance.trim() === "") {
      newClient.balance = 0;
    }

    await firestore.add({ collection: "clients" }, newClient);

    history.push("/");
  };

  render() {
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
          <div className="card-header">Agregar cliente</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">Nombre(s)</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.firstName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Apellidos</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.lastName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  required
                  onChange={this.onChange}
                  value={this.state.email}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  minLength="8"
                  required
                  onChange={this.onChange}
                  value={this.state.phone}
                />
              </div>

              <div className="form-group">
                <label htmlFor="balance">Balance</label>
                <input
                  type="number"
                  className="form-control"
                  name="balance"
                  onChange={this.onChange}
                  value={this.state.balance}
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
  }
}

export default firestoreConnect()(AddClient);
