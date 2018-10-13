import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import classnames from "classnames";

class ClientDetails extends Component {
  state = {
    showBalanceForm: false,
    balanceUpdate: ""
  };

  static propTypes = {
    firestore: PropTypes.object.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  balanceSubmit = e => {
    e.preventDefault();

    const { client, firestore } = this.props;
    const { balanceUpdate } = this.state;

    const update = {
      balance: parseFloat(balanceUpdate)
    };

    // Enviar a firestore
    firestore.update({ collection: "clients", doc: client.id }, update);
  };

  onDelete = async () => {
    const { firestore, client, history } = this.props;

    await firestore.delete({ collection: "clients", doc: client.id });

    history.push("/");
  };

  render() {
    const { client } = this.props;

    const { showBalanceForm, balanceUpdate } = this.state;

    let balanceForm = "";

    // Si debería mostrar
    if (showBalanceForm) {
      balanceForm = (
        <form onSubmit={this.balanceSubmit}>
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              name="balanceUpdate"
              placeholder="Nuevo balance"
              value={balanceUpdate}
              onChange={this.onChange}
            />
            <div className="input-group-append">
              <input
                type="submit"
                value="Actualizar"
                className="btn btn-outline-dark"
              />
            </div>
          </div>
        </form>
      );
    } else {
      balanceForm = null;
    }

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" /> Volver al Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link className="btn btn-dark" to={`/client/edit/${client.id}`}>
                  Editar
                </Link>
                <button onClick={this.onDelete} className="btn btn-danger">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <h3 className="card-header">
              {client.firstName} {client.lastName}
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    ID de Cliente:{" "}
                    <span className="text-secondary">{client.id}</span>
                  </h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h3 className="pull-right">
                    Balance:{" "}
                    <span
                      className={classnames({
                        "text-danger": client.balance > 0,
                        "text-success": client.balance <= 0
                      })}
                    >
                      ${parseFloat(client.balance).toFixed(2) + " "}
                    </span>
                    <small>
                      <a
                        href="javascript:void(0)"
                        onClick={() =>
                          this.setState({
                            showBalanceForm: !this.state.showBalanceForm
                          })
                        }
                      >
                        <i className="fas fa-pencil-alt" />
                      </a>
                    </small>
                  </h3>
                  {balanceForm}
                </div>
              </div>
              <hr />
              <ul className="list-group">
                <li className="list-group-item">
                  Email Contacto: {client.email}
                </li>
                <li className="list-group-item">
                  Teléfono Contacto: {client.phone}
                </li>
              </ul>
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
)(ClientDetails);
