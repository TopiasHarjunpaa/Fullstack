import { connect } from "react-redux";

const Notification = (props) => {
  const notification = props.notifications;

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return notification ? <div style={style}>{notification}</div> : <div />;
};

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  };
};

export default connect(mapStateToProps)(Notification);
