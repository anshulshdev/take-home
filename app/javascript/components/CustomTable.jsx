// I tried to keep the component as small as possible -
// Things to update:
// - debounced API call - If we have millions of records, redundant API call can cause some performance issues.
import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import fetchAPI from '../packs/fetchAPI';

const LABELS = ['name', 'address', 'city', 'region', 'country', 'birthday']; // these consts should be inside another const file. But for now, let's just keep simplicity
const URL = '/users/index';

const Loader = () => <div className="loading" />;

export default class CustomTable extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      users: [],
      sortBy: 'id',
      asc: true, // false => Ascending, true => Descending
      total: 0,
      page: 1,
      perPage: 10,
      ellipsis: 1
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    // fetch data
    const { page, perPage, sortBy, asc } = this.state;
    this.setState({ isLoading: true }); // start API call - set loading as true
    try {
      const { users, total } = await fetchAPI(URL, 'POST', {
        page,
        per_page: perPage,
        sort_by: sortBy,
        asc,
        authenticity_token: this.props.csrfToken
      });

      this.setState({ users, total });
    } catch (e) {
      console.log('--> error: ', e);
    } finally {
      this.setState({ isLoading: false }); // set loading as false again
    }
  };

  renderTableHead = () => {
    const { sortBy } = this.state;

    return LABELS.map((label, index) => {
      const defaultClass = `cell100 column${index + 1}`;
      return (
        <th
          key={label}
          className={sortBy === label ? `${defaultClass} active` : defaultClass}
          onClick={() => this.setSortBy(label)}
        >
          {label}
        </th>
      );
    });
  };

  setSortBy = column => {
    const { asc, sortBy } = this.state;
    if (sortBy === column) {
      // update asc
      this.setState({ asc: !asc }, () => {
        this.getUsers();
      });
    } else {
      this.setState({ sortBy: column }, () => {
        this.getUsers();
      });
    }
  };

  setPage = pageNumber => {
    this.setState({ page: pageNumber }, () => {
      this.getUsers();
    });
  };

  render() {
    const { users, isLoading, page, perPage, total } = this.state;
    return (
      <div className="App">
        <div className="limiter">
          <div className="wrap-table100">
            <div className="table100 ver3 m-b-110">
              <div className="table100-head">
                <table>
                  <thead>
                    <tr className="row100 head">{this.renderTableHead()}</tr>
                  </thead>
                </table>
              </div>
              <div className="table100-body">
                <table>
                  <tbody>
                    {users.map((user, key) => {
                      return (
                        <tr className="row100 body" key={key}>
                          {LABELS.map((label, index) => (
                            <td key={index} className={`cell100 column${index + 1}`}>
                              {user[label]}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {isLoading && <Loader />}
              </div>
            </div>
          </div>
          <Pagination
            activePage={page}
            itemsCountPerPage={perPage}
            totalItemsCount={total}
            pageRangeDisplayed={5}
            onChange={this.setPage}
          />
        </div>
      </div>
    );
  }
}
