import React, { Component } from 'react';
import axios from 'axios';

import '../css/Notifications.css';

class Notifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5400/api/notifications')
      .then((res) => {
        const notifications = res.data;
        this.setState({ notifications });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { notifications } = this.state;

    return (
      <div className="Notifications">
        <div className="NotificationsWrapper">
          {notifications.length > 0 ? (
            notifications.map((noti) => (
              <div className="Notification">
                <p>{noti.content}</p>
              </div>
            ))
          ) : (
            <p className="NoNoti">You do not have notifications.</p>
          )}
        </div>
      </div>
    );
  }
}

export default Notifications;
