import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Clients extends Component {
  render() {
    const clients = [
      {
        id: "123123",
        firstName: "Kevin",
        lastName: "Martinez",
        email: "kev@gmail.com",
        phone: "123123",
        balance: "200"
      },
      {
        id: "123133",
        firstName: "Pedro",
        lastName: "López",
        email: "pedro@gmail.com",
        phone: "99999",
        balance: "2000"
      }
    ];

    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fas fa-users" /> Clientes
              </h2>
            </div>
            <div className="col-md-6" />
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
    } else return <h1>Cargando...</h1>;
  }
}
