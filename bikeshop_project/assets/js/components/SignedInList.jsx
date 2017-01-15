import _ from 'lodash';
import React, { PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import moment from 'moment';

export default class SignedInList extends React.Component {
  static propTypes = {
    members: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      purpose: PropTypes.string,
      at: PropTypes.instanceOf(moment),
    })),
  }

  constructor(props) {
    super(props);
    this.state = { tick: 0 };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 50);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  sortMembers(members) {
    return _.sortBy(members, m => m.at.valueOf()).reverse();
  }

  tick() {
    this.setState({ tick: this.state.tick += 1 });
  }

  render() {
    const memberRows = this.sortMembers(this.props.members)
        .map(member => (
          <TableRow selectable={false} key={member.id}>
            <TableRowColumn>{member.text}</TableRowColumn>
            <TableRowColumn>{member.purpose}</TableRowColumn>
            <TableRowColumn>{member.at.fromNow()}</TableRowColumn>
            <TableRowColumn><a href={`/members/edit/${member.id}/`}>Profile</a></TableRowColumn>
          </TableRow>
        ));

    return (
      <div className="mdl-cell mdl-cell--12-col">
        <h3>Members signed in</h3>
        <Table selectable={false}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Purpose</TableHeaderColumn>
              <TableHeaderColumn>Signed-in At</TableHeaderColumn>
              <TableHeaderColumn/>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {memberRows.length ?
              memberRows :
              <TableRow>
                <TableRowColumn>{'No members currently signed in.'}</TableRowColumn>
              </TableRow>
            }
          </TableBody>
        </Table>

      </div>
    );
  }
}