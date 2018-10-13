import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

class Clients extends Component {
  state = {
    totalDeuda: null
  };

  static propTypes = {
    firestore: PropTypes.object.isRequired,
    clients: PropTypes.array
  };

  static getDerivedStateFromProps(props, state) {
    const { clients } = props;

    if (clients) {
      // Agregar deudas
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);

      return { totalDeuda: total };
    }

    return null;
  }

  render() {
    const { clients } = this.props;
    const { totalDeuda } = this.state;

    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fas fa-users" /> Clientes
              </h2>
            </div>
            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                Deuda Total{" "}
                <span className="text-danger">
                  ${parseFloat(totalDeuda).toFixed(2)}
                </span>
              </h5>
            </div>
          </div>

          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map(c => (
                <tr key={c.id}>
                  <td>
                    {c.firstName} {c.lastName}
                  </td>
                  <td>{c.email}</td>
                  <td>${parseFloat(c.balance).toFixed(2)}</td>
                  <td>
                    <Link
                      to={`/client/${c.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      {" "}
                      <i className="fas fa-arrow-circle-right" /> Detalles
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else return <Spinner />;
  }
}

export default compose(
  firestoreConnect([{ collection: "clients" }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);
